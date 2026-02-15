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

# Ultra-comprehensive schema prompt for Chapter 2: Profit & Loss Statement
# Targeting Pages 5-9 specifically
SCHEMA_PROMPT = """
# YOUR TASK
You are an expert accounting tutor with deep expertise in Israeli GAAP and financial statements.
Your mission is to build a comprehensive, rich, and educational "Chapter 2: Profit & Loss Statement" (דוח רווח והפסד).

# SOURCE MATERIAL
1. **Notebook PDF**: Focus EXCLUSIVELY on Pages 5, 6, 7, 8, and 9.
   - The notebook is handwritten/scanned - use your visual understanding capability to read every detail.
   - EXTRACT EVERYTHING: Every definition, every example, every diagram, every note in the margins.
   - Do NOT skip any content - be thorough and comprehensive.

2. **Exercise File** (if provided): Extract all practice problems and drills.

# EXTRACTION INSTRUCTIONS - BE EXTREMELY THOROUGH

For EACH page (5-9), extract:
1. **Main Topics/Concepts**: What accounting concepts are being taught?
2. **Definitions**: Word-for-word definitions from the notebook.
3. **Formulas**: Any mathematical formulas or calculations shown.
4. **Examples**: Every numerical example with full step-by-step solutions.
5. **Diagrams/Tables**: Describe any visual aids and recreate their structure.
6. **Margin Notes**: Any annotations, tips, or side comments.
7. **Hebrew Terms**: Preserve all Hebrew accounting terminology with translations.

# KEY CONCEPTS TO LOOK FOR IN PAGES 5-9:

## Profit & Loss Statement Fundamentals:
- Definition of Income Statement (דוח רווח והפסד)
- Difference between P&L and Balance Sheet (flow vs. snapshot)
- Accrual basis vs. cash basis (בסיס מצטבר מול בסיס מזומן)
- The matching principle (עקרון ההקבלה)

## P&L Structure (The Waterfall):
- Revenue/Sales (הכנסות/מכירות)
- Cost of Goods Sold (עלות המכר)
- Gross Profit (רווח גולמי)
- Operating Expenses (הוצאות תפעוליות):
  - Selling & Marketing expenses (הוצאות מכירה ושיווק)
  - General & Administrative expenses (הוצאות הנהלה וכלליות)
- Operating Profit (רווח תפעולי)
- Financial Income/Expenses (הכנסות/הוצאות מימון)
- Profit Before Tax (רווח לפני מס)
- Tax Expense (מס הכנסה)
- Net Profit (רווח נקי)

## Important Ratios & Metrics:
- Gross Profit Margin (שיעור רווח גולמי)
- Operating Margin (שיעור רווח תפעולי)
- Net Profit Margin (שיעור רווח נקי)

## Revenue Recognition:
- When is revenue recognized?
- Examples of timing differences

## Expense Recognition:
- The matching principle in practice
- Prepaid expenses (הוצאות מראש)
- Accrued expenses (הוצאות לשלם)

# OUTPUT SCHEMA (JSON)

Return VALID JSON matching this schema exactly:

{
    "id": "chapter-2-pnl",
    "title": "פרק 2: דוח רווח והפסד",
    "summary": "[One paragraph summary of what this chapter covers - make it engaging and descriptive]",
    "sections": [
        {
            "type": "concept",
            "title": "[Hebrew title from notebook]",
            "academic_text": "[Comprehensive academic explanation - at least 3-4 sentences covering the full concept. Include Hebrew terminology with explanations.]",
            "analogy_text": "[Creative, memorable analogy to explain this concept in everyday terms. Make it relatable to students. Be witty.]"
        },
        {
            "type": "calculation",
            "title": "[Title for calculation/example]",
            "formula_visual": "[The formula in readable format, e.g. 'מכירות - עלות המכר = רווח גולמי']",
            "variables": [
                {"name": "[Variable name]", "value": "[Value]", "desc": "[What this variable represents]"}
            ],
            "steps": [
                "Step 1: [Detailed calculation step]",
                "Step 2: [Next step with actual numbers]"
            ],
            "analogy_note": "[Practical tip or analogy for remembering this]",
            "data": {
                "rows": [
                    {"label": "[Line item name]", "amount": [number], "type": "revenue|expense|subtotal|total", "highlight": true/false}
                ]
            }
        }
    ],
    "exercises": [
        {
            "question": "[Full exercise question with all given data]",
            "solution": "[Complete step-by-step solution]",
            "tip": "[Study tip or common mistakes to avoid]"
        }
    ]
}

# QUALITY REQUIREMENTS

1. **DEPTH**: Each section should be substantial. Don't give one-liners. Explain concepts thoroughly.
2. **ACCURACY**: Use exact numbers and terminology from the notebook.
3. **COMPLETENESS**: Include ALL content from pages 5-9. Don't summarize - elaborate!
4. **PRACTICALITY**: Include real numerical examples with complete calculations.
5. **ENGAGEMENT**: Make explanations clear and memorable. Use analogies.
6. **STRUCTURE**: Follow the P&L waterfall structure from top to bottom.

# MINIMUM REQUIREMENTS (Don't be cheap!)

- At least 6-8 concept sections covering all major topics
- At least 2-3 calculation blocks with complete numerical examples
- At least 3-4 exercises with full solutions
- Each academic_text should be 3-5 sentences minimum
- Each analogy should be creative and unique

# LANGUAGE
- Keep all Hebrew text in Hebrew
- Titles should be in Hebrew
- Explanations can mix Hebrew and English technical terms
- Preserve original terminology from the notebook

NOW, carefully read pages 5-9 from the notebook and generate the comprehensive JSON.
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

def ingest_chapter_2_pnl():
    print("=" * 60)
    print("Starting Chapter 2: Profit & Loss Statement Ingestion")
    print("Target: Pages 5-9 from notebook")
    print("=" * 60)
    
    notebook_path = INPUT_DIR_NOTEBOOK / "semester A notebook.pdf"
    
    files_to_send = []
    
    if notebook_path.exists():
        print(f"\n[1/2] Loading notebook: {notebook_path}")
        files_to_send.append(upload_and_wait(notebook_path, mime_type="application/pdf"))
    else:
        print(f"ERROR: Notebook not found at {notebook_path}")
        return
    
    # Check for exercise file
    exercise_files = list(INPUT_DIR_EXERCISE_FOLDER.glob("*.docx"))
    if exercise_files:
        ex_path = exercise_files[0]
        print(f"\n[2/2] Loading exercise file: {ex_path}")
        files_to_send.append(upload_and_wait(ex_path, mime_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
    else:
        print("\n[2/2] No exercise file found, proceeding without it.")
    
    if not files_to_send:
        print("No files to process. Aborting.")
        return

    # Use Gemini to process
    models_to_try = [
        "models/gemini-2.5-flash",
        "models/gemini-2.5-pro", 
        "models/gemini-2.0-flash",
    ]
    
    print("\n" + "=" * 60)
    print("Generating comprehensive Chapter 2 content...")
    print("=" * 60)
    
    for model_name in models_to_try:
        print(f"\nTrying model: {model_name}...")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(
                files_to_send + [SCHEMA_PROMPT],
                generation_config={"max_output_tokens": 8192}
            )
            text = response.text.strip()
            
            if text:
                # Clean markdown code fences if present
                if text.startswith("```json"):
                    text = text[7:]
                if text.startswith("```"):
                    text = text[3:]
                if text.endswith("```"):
                    text = text[:-3]
                text = text.strip()
                
                # Try to parse JSON
                try:
                    data = json.loads(text)
                except json.JSONDecodeError as je:
                    print(f"JSON parse error: {je}")
                    print("Raw response (first 1000 chars):")
                    print(text[:1000])
                    continue
                
                # Validate minimum structure
                if "sections" not in data or len(data.get("sections", [])) < 3:
                    print(f"Warning: Response seems incomplete (only {len(data.get('sections', []))} sections)")
                    continue
                
                output_path = OUTPUT_DIR / "chapter-2.json"
                with open(output_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=4, ensure_ascii=False)
                    
                print(f"\n{'=' * 60}")
                print(f"SUCCESS with {model_name}!")
                print(f"Saved to: {output_path}")
                print(f"Sections: {len(data.get('sections', []))}")
                print(f"Exercises: {len(data.get('exercises', []))}")
                print(f"{'=' * 60}")
                return
            else:
                print(f"Model {model_name} returned empty text.")
                
        except Exception as e:
            print(f"Error with {model_name}: {e}")
            continue

    print("\n" + "=" * 60)
    print("All models failed. Please check API key and quota.")
    print("=" * 60)

if __name__ == "__main__":
    ingest_chapter_2_pnl()
