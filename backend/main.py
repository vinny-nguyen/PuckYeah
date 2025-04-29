from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000/"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def video_analyze(video: UploadFile = File(...)):
    path = f"../public/videos/{video.filename}"
    with open(path, "wb") as f:
        f.write(await video.read()) # Saves uploaded file
        return {"message": "Video received", "path": path}