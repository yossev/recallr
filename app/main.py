from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import FileResponse, JSONResponse
import tempfile
import asyncio
from app.utils import parse_pdf, chunk_text, generate_flashcards_async
from app.utils import create_anki_package

app = FastAPI()

# Allow CORS 
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- Rate Limiter ----
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded

# ---- Rate Limiting Setup ----
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.get("/")
def read_root():
    return {"message": "Welcome to Recallr API!"}

@app.post("/upload")
@limiter.limit("5/minute")
async def upload_pdf(request: Request, file: UploadFile = File(...)):
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

@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"error": "Too many requests. Please wait a minute and try again."}
    )