import os
import json
import base64
import requests
import zipfile
import re
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Configuration
INPUT_DIR_NOTEBOOK = Path("input_materials/accounting")
INPUT_DIR_EXERCISE_FOLDER = Path("input_materials/accounting/03 - דוח רווח והפסד")
OUTPUT_DIR = Path("web/src/data/chapters")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Schema Prompt Template
PROMPT_TEMPLATE = """
You are an expert accounting tutor. Your task is to build "Chapter 3: Profit & Loss" (דו"ח רווח והפסד) based on the notebook content.

SOURCES:
1. "Notebook PDF" (Visual Input): 
   - **FOCUS ONLY ON PAGES 5, 6, 7, 8, 9, 10.**
   - **Page 5 starts with:** "מדידה חשבונאית" (Measurement) or similar.
   - **Subsequent pages:** likely cover Profit & Loss (רווח והפסד).
   - **EXTRACT EVERYTHING:** Definitions, Structure, Examples, Biurim.
   - **Visual Mode:** The file is handwritten/scanned. Read it visually.

2. "Exercise Text" (Provided below):
   - Extract drills from the text provided below.
   - TEXT CONTENT:
   {exercise_text}

OUTPUT SCHEMA (JSON):
{{
  "id": "chapter-3-pl",
  "title": "פרק 3: מדידה חשבונאית ודוח רווח והפסד",
  "summary": "מדידה חשבונאית (עלות היסטורית) והמעבר לדוח שמספר את הסיפור האמיתי: רווח והפסד.",
  "sections": [
    {{
      "type": "concept",
      "title": "Initial Topic (Page 5)",
      "academic_text": "Content from page 5...",
      "analogy_text": "Explanation..."
    }},
    {{
      "type": "concept",
      "title": "Profit & Loss Concept",
      "academic_text": "Definition...",
      "analogy_text": "Explanation..."
    }},
    {{
      "type": "calculation",
      "title": "P&L Structure (Hebrew)",
      "formula_visual": "Sales - Expenses = Profit",
      "data": {{ 
          "rows": [
              {{ "label": "Mecirot", "amount": 1000, "type": "revenue" }},
              {{ "label": "Cost of Sales", "amount": -600, "type": "expense" }}
          ] 
      }},
      "analogy_note": "Explanation..."
    }}
  ],
  "exercises": [
    {{
      "question": "Q",
      "solution": "A",
      "tip": "Hint"
    }}
  ]
}}
"""

def get_base64_content(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def get_docx_text(path):
    try:
        with zipfile.ZipFile(path) as document:
            xml_content = document.read('word/document.xml').decode('utf-8')
            text = re.sub('<[^<]+?>', '', xml_content)
            return text
    except Exception as e:
        print(f"Error reading DOCX text: {e}")
        return ""

def ingest_chapter_3_http():
    print("Starting Chapter 3 Ingestion (HTTP Inline Loop + Text Extraction)...")
    
    parts = []
    
    # Notebook (Visual)
    notebook_path = INPUT_DIR_NOTEBOOK / "semester A notebook.pdf"
    if notebook_path.exists():
        print(f"Reading PDF {notebook_path}...")
        b64_data = get_base64_content(notebook_path)
        parts.append({
            "inline_data": {
                "mime_type": "application/pdf",
                "data": b64_data
            }
        })
    
    # Exercise (Text Extraction)
    exercise_text = "No exercise file found."
    exercise_files = list(INPUT_DIR_EXERCISE_FOLDER.glob("*.docx"))
    if exercise_files:
        ex_path = exercise_files[0]
        print(f"Extracting text from DOCX: {ex_path}")
        exercise_text = get_docx_text(ex_path)
        # Limit text size just in case
        exercise_text = exercise_text[:10000] 

    # Construct Prompt
    final_prompt = PROMPT_TEMPLATE.format(exercise_text=exercise_text)
    parts.append({"text": final_prompt})
    
    # Models to try
    models = [
        "gemini-2.0-flash-exp",
        "gemini-2.0-flash", 
        "gemini-2.5-flash", 
        "gemini-1.5-pro",
        "gemini-1.5-flash"
    ]

    for model_name in models:
        print(f"Trying model: {model_name}...")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        payload = {
            "contents": [{
                "parts": parts
            }]
        }
        
        try:
            response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
            
            if response.status_code == 200:
                result = response.json()
                try:
                    text = result["candidates"][0]["content"]["parts"][0]["text"]
                    
                    if text.startswith("```json"): text = text[7:]
                    if text.endswith("```"): text = text[:-3]
                    
                    data = json.loads(text)
                    
                    output_path = OUTPUT_DIR / "chapter-3.json"
                    with open(output_path, "w", encoding="utf-8") as f:
                        json.dump(data, f, indent=4, ensure_ascii=False)
                        
                    print(f"Success with {model_name}! Saved to {output_path}")
                    return 
                except (KeyError, IndexError, json.JSONDecodeError) as e:
                    print(f"Failed to parse response from {model_name}: {e}")
            else:
                print(f"Model {model_name} failed with status {response.status_code}: {response.text[:200]}")
                
        except Exception as e:
            print(f"Error with {model_name}: {e}")
            
    print("All models failed.")

if __name__ == "__main__":
    ingest_chapter_3_http()
