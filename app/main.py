from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import tempfile
import asyncio
from app.utils import parse_pdf, chunk_text, generate_flashcards_async
from app.utils import create_anki_package

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
    
    temp_apkg = tempfile.NamedTemporaryFile(delete=False, suffix=".apkg")
    create_anki_package(flashcards, temp_apkg.name)
    
    return FileResponse(
        temp_apkg.name,
        filename="recallr_flashcards.apkg",
        media_type="application/apkg"
    )

