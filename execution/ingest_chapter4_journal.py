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
INPUT_DIR = Path("input_materials/accounting")
OUTPUT_DIR = Path("web/src/data/chapters")

PROMPT = """
אתה מומחה לחשבונאות ולהוראה. עליך לחלץ את כל המידע מעמוד 10 של המחברת (נושא: פקודות יומן) ומקובץ התרגיל המצורף.

עליך ליצור פרק מקיף בנושא "פקודות יומן" (Journal Entries) עם המבנה הבא:

1. **הקדמה ורקע**: הסבר מקיף על מהן פקודות יומן והנהלת חשבונות כפולה
2. **עקרונות חובה וזכות**: הסבר מפורט על המושגים חובה (Debit) וזכות (Credit)
3. **כללי הרישום**: מתי לחייב ומתי לזכות בכל סוג חשבון (נכסים, התחייבויות, הון עצמי, הכנסות, הוצאות)
4. **דוגמאות מעשיות מפורטות**: לפחות 8 דוגמאות עם הסבר מלא
5. **תרגיל מודרך מהקובץ**: שלב את התרגיל מהקובץ המצורף כדוגמה מלאה עם פתרון מפורט צעד אחר צעד
6. **תרגול עצמי**: 4-5 תרגילים נוספים עם פתרונות

החזר JSON תקין בלבד (ללא markdown, ללא בלוקים של קוד) עם המבנה הבא:
{
    "id": "chapter-4-journal-entries",
    "title": "פרק 4: פקודות יומן",
    "summary": "[סיכום קצר וקליט]",
    "sections": [
        {
            "type": "concept",
            "title": "[כותרת]",
            "academic_text": "[הסבר אקדמי מלא ומפורט]",
            "analogy_text": "[אנלוגיה מהחיים לביניים]"
        },
        {
            "type": "calculation",
            "title": "[כותרת]",
            "formula_visual": "[נוסחה/כלל]",
            "variables": [{"name": "שם", "value": "ערך", "desc": "תיאור"}],
            "steps": ["צעד 1", "צעד 2", ...],
            "analogy_note": "[הערה],
            "data": {
                "rows": [
                    {"label": "תיאור", "debit": 1000, "credit": 0, "type": "entry"},
                    {"label": "תיאור", "debit": 0, "credit": 1000, "type": "entry"}
                ]
            }
        },
        {
            "type": "journal_entry",
            "title": "[כותרת הפקודה]",
            "description": "[תיאור העסקה]",
            "entries": [
                {"account": "שם החשבון", "debit": 1000, "credit": 0},
                {"account": "שם החשבון", "debit": 0, "credit": 1000}
            ],
            "explanation": "[הסבר מפורט]"
        }
    ],
    "worked_example": {
        "title": "תרגיל מודרך: [כותרת מהקובץ]",
        "scenario": "[תיאור המצב מהתרגיל]",
        "transactions": [
            {
                "description": "[תיאור העסקה]",
                "journal_entry": {
                    "entries": [
                        {"account": "שם", "debit": 0, "credit": 0}
                    ]
                },
                "explanation": "[הסבר למה כך]"
            }
        ]
    },
    "exercises": [
        {
            "question": "[שאלה]",
            "solution": "[פתרון מפורט]",
            "tip": "[טיפ]"
        }
    ]
}

חשוב מאוד:
- הכל בעברית
- הסברים מפורטים ומקיפים
- אנלוגיות יצירתיות וברורות
- דוגמאות מספריות קונקרטיות
- חלץ את כל המידע מעמוד 10 של המחברת
- שלב את התרגיל מהקובץ המצורף כ-worked_example
"""


def upload_files():
    """Upload notebook and exercise files"""
    files = []
    
    # Upload notebook
    notebook_path = INPUT_DIR / "semester A notebook.pdf"
    print(f"Uploading {notebook_path}...")
    uploaded = genai.upload_file(str(notebook_path))
    files.append(uploaded)
    print(f"Uploaded {notebook_path.name}")
    
    # Upload exercise file
    exercise_path = INPUT_DIR / "04 - פקודות יומן" / "תרגיל 4 - פקודות יומן.docx"
    print(f"Uploading {exercise_path}...")
    uploaded = genai.upload_file(str(exercise_path))
    files.append(uploaded)
    print(f"Uploaded {exercise_path.name}")
    
    # Wait for processing
    for f in files:
        while f.state.name == 'PROCESSING':
            print(f"Waiting for {f.name} to process...")
            time.sleep(2)
            f = genai.get_file(f.name)
    
    return files


def generate_chapter(files):
    """Generate chapter content using Gemini"""
    models = [
        "models/gemini-2.5-flash",
        "models/gemini-2.5-pro",
        "models/gemini-2.0-flash",
    ]
    
    for model_name in models:
        try:
            print(f"\nTrying model: {model_name}")
            model = genai.GenerativeModel(model_name)
            
            response = model.generate_content(
                [PROMPT, *files],
                generation_config={
                    "temperature": 0.3,
                    "max_output_tokens": 30000,
                }
            )
            
            # Extract JSON from response
            text = response.text.strip()
            
            # Remove markdown code blocks if present
            if text.startswith("```"):
                lines = text.split("\n")
                text = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])
            
            # Parse JSON
            data = json.loads(text)
            return data
            
        except Exception as e:
            print(f"Error with {model_name}: {e}")
            continue
    
    return None


def main():
    print("=" * 60)
    print("Chapter 4: Journal Entries Ingestion")
    print("=" * 60)
    
    # Upload files
    files = upload_files()
    print(f"\nUploaded {len(files)} files")
    
    # Generate chapter
    print("\nGenerating chapter content...")
    chapter = generate_chapter(files)
    
    if chapter:
        # Ensure output directory exists
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        
        # Save chapter
        output_path = OUTPUT_DIR / "chapter-4.json"
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(chapter, f, ensure_ascii=False, indent=4)
        
        print(f"\n✓ Saved chapter to {output_path}")
        print(f"  - Sections: {len(chapter.get('sections', []))}")
        print(f"  - Exercises: {len(chapter.get('exercises', []))}")
    else:
        print("\n✗ Failed to generate chapter")


if __name__ == "__main__":
    main()
