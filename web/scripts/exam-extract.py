"""
exam-extract.py (v2 — Vision-First)

Extracts structured exam questions from a PDF using Groq Vision.
Each page is rendered to an image and sent to Groq Vision for OCR,
extracting one question at a time with proper Hebrew text.

Usage:
    python scripts/exam-extract.py <course-id> <pdf-filename>
    python scripts/exam-extract.py microeconomics exam-2013-micro.pdf
"""

import json
import os
import sys
import io
import base64
import time
from pathlib import Path

import pypdfium2 as pdfium
from groq import Groq

# ─── Config ──────────────────────────────────────────────────────────────────

VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"


def load_env():
    """Load .env file, searching upward from script location."""
    current = Path(__file__).resolve().parent
    for _ in range(5):
        env_path = current / ".env"
        if env_path.exists():
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, _, value = line.partition("=")
                        os.environ.setdefault(key.strip(), value.strip())
            return
        current = current.parent


# ─── PDF → Images ────────────────────────────────────────────────────────────

def render_all_pages(pdf_path: str) -> list[bytes]:
    """Render every PDF page to a PNG image buffer."""
    pdf = pdfium.PdfDocument(pdf_path)
    images = []
    for page in pdf:
        bitmap = page.render(scale=2.5)  # High-res for clear OCR
        img = bitmap.to_pil()
        buf = io.BytesIO()
        img.save(buf, format="PNG", optimize=True)
        images.append(buf.getvalue())
    return images


# ─── Vision Extraction (1 page at a time) ────────────────────────────────────

EXTRACT_PROMPT = """אתה מומחה בדיגיטציה של מבחנים אקדמיים בעברית.

קיבלת תמונה של עמוד ממבחן מיקרו כלכלה באוניברסיטה בעברית.

המשימה שלך: חלץ כל שאלה בנפרד מהעמוד הזה.

כל שאלה מתחילה בכותרת מהצורה "שאלה מספר X" (כאשר X הוא מספר בין 1 ל-30).
לאחר הכותרת מגיע גוף השאלה, ואז 4-5 אפשרויות תשובה המסומנות ב: א., ב., ג., ד., ה.

כללים קריטיים:
1. כתוב את כל הטקסט העברי כפי שהוא מופיע, משמאל לימין, בסדר הקריאה הטבעי.
2. אם יש טבלה בשאלה, שחזר אותה כטבלת markdown בשדה "tableData".
3. אם יש גרף, תרשים, או ציור, תאר אותו בפירוט בשדה "graphDescription" — כולל צירים, עקומות, נקודות חיתוך, וערכים מסומנים.
4. שמור על סימון מתמטי כמו Px=100, MC(X), η, Q=f(P).
5. כלול את כל הטענות/הנחות בתוך טקסט השאלה עצמה.
6. כל אפשרות (א., ב., ג., ד., ה.) חייבת לכלול את הטקסט המלא.
7. אם אין שאלות בעמוד הזה (למשל עמוד הוראות), החזר מערך ריק.

החזר JSON בפורמט הבא בלבד:
{
  "questions": [
    {
      "number": 1,
      "questionText": "הטקסט המלא של השאלה כולל כל הנתונים, טענות, והנחות",
      "tableData": null,
      "graphDescription": null,
      "options": ["א. טקסט מלא", "ב. טקסט מלא", "ג. טקסט מלא", "ד. טקסט מלא"]
    }
  ]
}"""


def extract_page(client: Groq, page_image: bytes, page_num: int) -> list[dict]:
    """Extract all questions from a single page image via Groq Vision."""
    b64 = base64.b64encode(page_image).decode("utf-8")

    # Check base64 size (Groq limit: 4MB)
    if len(b64) > 4 * 1024 * 1024:
        print(f"    ⚠️ Page {page_num} image too large ({len(b64) // 1024}KB), skipping")
        return []

    try:
        response = client.chat.completions.create(
            model=VISION_MODEL,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": EXTRACT_PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/png;base64,{b64}"},
                    },
                ],
            }],
            max_tokens=8192,
            temperature=0.1,
            response_format={"type": "json_object"},
        )

        result = json.loads(response.choices[0].message.content)
        return result.get("questions", [])

    except Exception as e:
        print(f"    ⚠️ Vision error on page {page_num}: {e}")
        return []


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 3:
        print("Usage: python scripts/exam-extract.py <course-id> <pdf-filename>")
        print("Example: python scripts/exam-extract.py microeconomics exam-2013-micro.pdf")
        sys.exit(1)

    course_id = sys.argv[1]
    pdf_filename = sys.argv[2]

    load_env()
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        print("❌ GROQ_API_KEY not found. Set it in .env")
        sys.exit(1)

    base_dir = Path(__file__).resolve().parent.parent  # = web/
    raw_dir = base_dir / "src" / "data" / course_id / "exams" / "raw"
    processed_dir = base_dir / "src" / "data" / course_id / "exams" / "processed"
    pdf_path = raw_dir / pdf_filename
    base_name = Path(pdf_filename).stem
    output_path = processed_dir / f"{base_name}-questions.json"

    if not pdf_path.exists():
        print(f"❌ PDF not found: {pdf_path}")
        sys.exit(1)

    processed_dir.mkdir(parents=True, exist_ok=True)
    client = Groq(api_key=api_key)

    print(f"\n🎓 Exam Extractor v2 (Vision-First)")
    print(f"📄 Source: {pdf_filename}")
    print(f"📂 Course: {course_id}")
    print(f"🤖 Model: {VISION_MODEL}\n")

    # Step 1: Render all pages to images
    print("Step 1/2: Rendering PDF pages to images...")
    page_images = render_all_pages(str(pdf_path))
    print(f"  ✅ {len(page_images)} pages rendered\n")

    # Step 2: Extract questions page by page via Vision
    print("Step 2/2: Extracting questions via Groq Vision (page by page)...")
    all_questions = []

    for i, img in enumerate(page_images):
        page_num = i + 1
        img_kb = len(img) // 1024
        sys.stdout.write(f"  📄 Page {page_num}/{len(page_images)} ({img_kb}KB)... ")
        sys.stdout.flush()

        questions = extract_page(client, img, page_num)

        if questions:
            all_questions.extend(questions)
            q_nums = [str(q.get("number", "?")) for q in questions]
            print(f"✅ {len(questions)} question(s): [{', '.join(q_nums)}]")
        else:
            print("— no questions (instructions/header page)")

        # Rate limit pause between pages
        time.sleep(2)

    # Deduplicate by question number (in case a question spans two pages)
    seen = set()
    unique = []
    for q in all_questions:
        num = q.get("number", 0)
        if num not in seen:
            seen.add(num)
            unique.append(q)
    unique.sort(key=lambda q: q.get("number", 0))

    # Build output
    output = {
        "examId": base_name,
        "source": pdf_filename,
        "courseId": course_id,
        "extractedAt": __import__("datetime").datetime.now().isoformat(),
        "totalQuestions": len(unique),
        "questions": [
            {
                "id": f"q{q['number']}",
                "number": q["number"],
                "questionText": q["questionText"],
                "tableData": q.get("tableData"),
                "graphDescription": q.get("graphDescription"),
                "options": q["options"],
            }
            for q in unique
        ],
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Extracted {len(unique)} questions → {output_path.relative_to(base_dir)}")
    print(f"\n💡 Next: python scripts/exam-solve.py {course_id} {base_name}-questions.json")


if __name__ == "__main__":
    main()
