import fitz
import re
import asyncio
import json
import genanki
from genanki import Deck, Package, Note
from app.llm_client import ask_groq




# Define your Anki note model (customize as needed)
ANKI_MODEL = genanki.Model(
    1607392319,  # Random but consistent model ID
    'Recallr Model',
    fields=[{'name': 'Question'}, {'name': 'Answer'}],
    templates=[{
        'name': 'Card 1',
        'qfmt': '{{Question}}',
        'afmt': '{{FrontSide}}<hr id="answer">{{Answer}}',
    }])

def create_anki_package(flashcards: list[dict], filename: str = "output.apkg"):
    """Generate downloadable .apkg file from flashcards.
    Returns path to generated file."""
    try:
        deck = Deck(
            2059400110,  # Unique deck ID
            "Recallr Flashcards"
        )
        
        for fc in flashcards:
            deck.add_note(Note(
                model=ANKI_MODEL,
                fields=[fc["question"], fc["answer"]]
            ))
        
        Package(deck).write_to_file(filename)
        return filename
        
    except Exception as e:
        print(f"Anki package generation failed: {str(e)}")
        raise




def parse_pdf(pdf_bytes):
    try:
        if not pdf_bytes:
            raise ValueError("Empty PDF bytes received")
        
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
        
    except Exception as e:
        print(f"PDF parsing error: {str(e)}")
        return "PDF processing failed"

def chunk_text(text, max_length=300):
    try:
        if not text:
            return []
            
        sentences = text.split('. ')
        chunks = []
        chunk = ""
        for sentence in sentences:
            if len(chunk) + len(sentence) < max_length:
                chunk += sentence + ". "
            else:
                chunks.append(chunk.strip())
                chunk = sentence + ". "
        if chunk:
            chunks.append(chunk.strip())
        return chunks
        
    except Exception as e:
        print(f"Chunking error: {str(e)}")
        return []


def parse_flashcards_response(response: str) -> list[dict]:
    try:
        try:
            json_data = json.loads(response)
            text = str(json_data) if not isinstance(json_data, str) else json_data
        except json.JSONDecodeError:
            text = response
        
        # Enhanced cleaning for newlines and formatting
        text = re.sub(r'\*\*Card \d+\*\*', '', text)  # Remove card markers
        text = re.sub(r'\n+', '\n', text)  # Replace multiple newlines with single
        text = re.sub(r'(\n\s*){3,}', '\n\n', text)  # Limit consecutive newlines to 2
        text = re.sub(r'^\s+|\s+$', '', text)  # Trim leading/trailing whitespace
        
        flashcards = []
        matches = re.findall(r"Question:\s*(.*?)\s*Answer:\s*(.*?)(?=(?:Question:|$))", text, re.DOTALL)
        
        for q, a in matches:
            # Clean each question and answer
            clean_q = re.sub(r'\n+', ' ', q).strip()  # Replace newlines with space in questions
            clean_a = re.sub(r'\n+', ' ', a).strip()  # Replace newlines with space in answers
            clean_q = re.sub(r'\s{2,}', ' ', clean_q)  # Collapse multiple spaces
            clean_a = re.sub(r'\s{2,}', ' ', clean_a)  # Collapse multiple spaces
            
            if clean_q and clean_a:  # Only add if both fields exist
                flashcards.append({
                    "question": clean_q,
                    "answer": clean_a
                })
        
        return flashcards if flashcards else [{"question": "Failed to parse", "answer": text.strip()}]
        
    except Exception as e:
        print(f"Response parsing error: {str(e)}")
        return [{"question": "Parsing crashed", "answer": str(e)}]  

async def generate_flashcards_async(chunks: list[str], batch_size: int = 2) -> list[dict]:
    try:
        if not chunks:
            print("Warning: No chunks to process")
            return []
            
        flashcards = []
        
        async def process_batch(batch: list[str]) -> list[dict]:
            try:
                batch_text = "\n\n".join(f"Paragraph {i}:\n{chunk}" for i, chunk in enumerate(batch))
                prompt = f"""
Convert these paragraphs into flashcards:
Format:
Question: <question>
Answer: <answer>

{batch_text}"""
                response = await ask_groq(prompt)
                return parse_flashcards_response(response)
            except Exception as e:
                print(f"Batch processing failed: {str(e)}")
                return [{"question": "Batch error", "answer": str(e)}]
        
        tasks = []
        for i in range(0, len(chunks), batch_size):
            batch = chunks[i:i + batch_size]
            tasks.append(process_batch(batch))
        
        results = await asyncio.gather(*tasks)
        for batch_result in results:
            flashcards.extend(batch_result)
        
        return flashcards
        
    except Exception as e:
        print(f"Flashcard generation crashed: {str(e)}")
        return [{"question": "System error", "answer": "Failed to generate flashcards"}]