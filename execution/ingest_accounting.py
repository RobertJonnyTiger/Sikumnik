import os
import time
import json
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)

# Configuration
INPUT_DIR_NOTEBOOK = Path("input_materials/accounting")
INPUT_DIR_EXERCISE_FOLDER = Path("input_materials/accounting/03 - דוח רווח והפסד")
OUTPUT_DIR = Path("web/src/data/chapters")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# The Schema Prompt - Strictly for Pages 5-10
SCHEMA_PROMPT = """
You are an expert accounting tutor. Your task is to build "Chapter 3: Profit & Loss" (דו"ח רווח והפסד) based on the notebook content.

SOURCES:
1. "Notebook PDF": 
   - **FOCUS ONLY ON PAGES 5, 6, 7, 8, 9, 10.**
   - **Page 5 starts with:** "מדידה חשבונאית" (Measurement) or similar.
   - **Subsequent pages:** likely cover Profit & Loss (רווח והפסד).
   - **EXTRACT EVERYTHING:** Definitions, Structure, Examples, Biurim.
   - **Visual Mode:** The file is handwritten/scanned. Read it visually.
2. "Exercise File": Extract drills if provided.

OUTPUT SCHEMA (JSON):
{
  "id": "chapter-3-pl",
  "title": "פרק 3: מדידה חשבונאית ודוח רווח והפסד",
  "summary": "מדידה חשבונאית (עלות היסטורית) והמעבר לדוח שמספר את הסיפור האמיתי: רווח והפסד.",
  "sections": [
    {
      "type": "concept",
      "title": "Initial Topic (Page 5)",
      "academic_text": "Content from page 5...",
      "analogy_text": "Explanation..."
    },
    {
      "type": "concept",
      "title": "Profit & Loss Concept",
      "academic_text": "Definition...",
      "analogy_text": "Explanation..."
    },
    {
      "type": "calculation",
      "title": "P&L Structure / Examples",
      "formula_visual": "Sales - Expenses = Profit",
      "data": { "rows": [] },
      "analogy_note": "Explanation..."
    }
  ],
  "exercises": [
    {
      "question": "Q",
      "solution": "A",
      "tip": "Hint"
    }
  ]
}
"""

def upload_and_wait(path, mime_type=None):
    print(f"Uploading {path}...")
    file = genai.upload_file(path=path, mime_type=mime_type)
    print(f"Uploaded {file.display_name} ({file.uri})")
    
    while file.state.name == "PROCESSING":
        print(".", end="", flush=True)
        time.sleep(2)
        file = genai.get_file(file.name)
        
    if file.state.name == "FAILED":
        raise ValueError(f"File processing failed: {file.state.name}")
    
    print("Ready.")
    return file

def ingest_chapter_3_v3():
    print("Starting Chapter 3 Ingestion (Pages 5-10)...")
    
    notebook_path = INPUT_DIR_NOTEBOOK / "semester A notebook.pdf"
    
    files_to_send = []
    
    if notebook_path.exists():
        files_to_send.append(upload_and_wait(notebook_path, mime_type="application/pdf"))
    
    exercise_files = list(INPUT_DIR_EXERCISE_FOLDER.glob("*.docx"))
    if exercise_files:
        ex_path = exercise_files[0]
        print(f"Adding Exercise: {ex_path}")
        files_to_send.append(upload_and_wait(ex_path, mime_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
    
    if not files_to_send:
        print("No files to process.")
        return

    # Debug: List available models
    print("Listing available models...")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"- {m.name}")
    except Exception as e:
        print(f"ListModels failed: {e}")

    models_to_try = [
        "gemini-1.5-pro", 
        "gemini-1.5-flash",
        "gemini-2.0-flash-exp"
    ]
    
    print("Generating JSON content...")
    
    for model_name in models_to_try:
        print(f"Trying model: {model_name}...")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(files_to_send + [SCHEMA_PROMPT])
            text = response.text.strip()
            
            if text:
                if text.startswith("```json"): text = text[7:]
                if text.endswith("```"): text = text[:-3]
                
                data = json.loads(text)
                
                output_path = OUTPUT_DIR / "chapter-3.json"
                with open(output_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=4, ensure_ascii=False)
                    
                print(f"Success with {model_name}! Saved to {output_path}")
                return # Exit after success
            else:
                print(f"Model {model_name} returned empty text.")
                
        except Exception as e:
            print(f"Error with {model_name}: {e}")
            continue # Try next model

    print("All models failed.")

if __name__ == "__main__":
    ingest_chapter_3_v3()
