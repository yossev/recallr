from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import tempfile
import asyncio
from app.utils import parse_pdf, chunk_text, generate_flashcards_async

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to Recallr API!"}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    contents = await file.read()
    text = parse_pdf(contents)
    chunks = chunk_text(text)
    
    flashcards = await generate_flashcards_async(chunks)
    
    anki_txt = "\n".join(f"{fc['question']}\t{fc['answer']}" for fc in flashcards)
    
    with tempfile.NamedTemporaryFile(delete=False, mode='w', encoding='utf-8') as f:
        f.write(anki_txt)
        temp_path = f.name
    
    return FileResponse(temp_path, filename="flashcards.txt", media_type="text/plain")