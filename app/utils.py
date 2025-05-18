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
        # First extract the actual content from the possible JSON response
        content = response
        try:
            json_data = json.loads(response)
            if isinstance(json_data, dict):
                # Try common LLM API response structures
                if 'choices' in json_data and len(json_data['choices']) > 0:
                    content = json_data['choices'][0].get('message', {}).get('content', response)
                elif 'messages' in json_data and len(json_data['messages']) > 0:
                    content = json_data['messages'][0].get('content', response)
                else:
                    content = response
        except json.JSONDecodeError:
            pass  # Not JSON, use raw response

        # Aggressive cleaning of API metadata artifacts
        content = re.sub(r"'logprobs': None, 'finish_reason': 'stop'}[^\w]*", "", content)
        content = re.sub(r"'usage': \{.*?\},?", "", content)
        content = re.sub(r"'system_fingerprint': '[^']*',?", "", content)
        content = re.sub(r"'x_groq': \{.*?\},?", "", content)
        content = re.sub(r"\{.*?\}", "", content)  # Remove any other JSON fragments
        content = re.sub(r'\n\s*\n', '\n', content)  # Normalize newlines

        # Parse questions and answers
        flashcards = []
        matches = re.finditer(
            r"Question:\s*(.*?)\s*Answer:\s*(.*?)(?=(?:Question:|$))", 
            content, 
            re.DOTALL
        )
        
        for match in matches:
            q = match.group(1).strip()
            a = match.group(2).strip()
            
            # Final cleaning pass for each question/answer
            q = re.sub(r'[\s\n]+', ' ', q)  # Normalize all whitespace
            a = re.sub(r'[\s\n]+', ' ', a)
            
            if q and not q.startswith(('{', "'")) and a:  # Skip JSON-looking entries
                flashcards.append({
                    "question": q,
                    "answer": a
                })
        
        return flashcards if flashcards else [{
            "question": "No valid flashcards found", 
            "answer": f"Original content: {content[:200]}..."
        }]
        
    except Exception as e:
        return [{
            "question": "Parsing error", 
            "answer": f"Error: {str(e)}\nRaw start: {response[:200]}"
        }]

async def generate_flashcards_async(chunks: list[str], batch_size: int = 2) -> list[dict]:
    try:
        if not chunks:
            print("Warning: No chunks to process")
            return []
            
        flashcards = []
        
        async def process_batch(batch: list[str]) -> list[dict]:
            try:
                batch_text = " ".join(f"Paragraph {i}:\n{chunk}" for i, chunk in enumerate(batch))
                prompt = f"""Convert the following content into flashcards using EXACTLY this format:
Question: [question about core academic content]
Answer: [concise factual answer]

STRICT RULES:
1. ONLY create cards for:
   - Key concepts, theories, and definitions
   - Important facts, formulas, and processes
   - Technical terms and their explanations
   - Critical historical events/dates
   - Scientific principles and laws

2. EXCLUDE ALL:
   - Contact info (emails, phone numbers, addresses)
   - Course logistics (office hours, deadlines, policies)
   - Personal names (instructors, authors, unless seminal)
   - Institutional details (building numbers, departments)
   - References (page numbers, citations, ISBNs)
   - Examples containing real-world identifiers

3. FORMAT REQUIREMENTS:
   - No card numbers or headers
   - No extra commentary or explanations
   - Questions must be direct and test understanding
   - Answers should be concise (1-2 sentences max)

Content to convert:
{batch_text}

REMEMBER: If unsure whether content is academic or administrative, discard it."""
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