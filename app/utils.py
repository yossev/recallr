import fitz
import re
import asyncio
import json
from app.llm_client import ask_groq

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
        
        flashcards = []
        matches = re.findall(r"Question:\s*(.*?)\s*Answer:\s*(.*?)(?=(?:Question:|$))", text, re.DOTALL)
        for q, a in matches:
            flashcards.append({
                "question": q.strip(),
                "answer": a.strip()
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