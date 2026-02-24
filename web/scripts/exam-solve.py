"""
exam-solve.py (v2 — Deep Reasoning)

Takes structured questions JSON (from exam-extract.py) and uses Groq
to solve each question with rigorous step-by-step economic reasoning.
No guessing — only true analysis.

Output is ready for the ExamEngine component.

Usage:
    python scripts/exam-solve.py <course-id> <questions-json-filename>
    python scripts/exam-solve.py microeconomics exam-2013-micro-questions.json
"""

import json
import os
import sys
import time
from pathlib import Path

from groq import Groq

# ─── Config ──────────────────────────────────────────────────────────────────

SOLVER_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"
HEBREW_LETTERS = ["א", "ב", "ג", "ד", "ה"]


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


# ─── Solver ──────────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """אתה פרופסור בכיר למיקרו כלכלה עם 30 שנות ניסיון בהוראה אקדמית.
אתה פותר שאלות מבחן ומלמד סטודנטים לחשוב נכון.

כללים מחייבים:
- אין ניחושים. כל תשובה חייבת להתבסס על ניתוח כלכלי מדויק.
- חשוב צעד אחר צעד. פרק את הבעיה לחלקים לפני שאתה מגיע למסקנה.
- אם יש טבלה — חשב כל שורה. אם יש נוסחה — הצב ערכים ופתור.
- הסבר את הלוגיקה הכלכלית, לא רק את התשובה.
- כתוב הכל בעברית."""


def build_solver_prompt(question: dict) -> str:
    """Build a rigorous solver prompt for a single question."""
    table_section = ""
    if question.get("tableData"):
        table_section = f"\n\nנתוני טבלה:\n{question['tableData']}"

    graph_section = ""
    if question.get("graphDescription"):
        graph_section = f"\n\nתיאור גרף/תרשים: {question['graphDescription']}"

    options_str = "\n".join(
        f"  {opt}" for opt in question["options"]
    )

    return f"""שאלה מספר {question['number']}:
{question['questionText']}{table_section}{graph_section}

אפשרויות:
{options_str}

───────────────────────────
הוראות פתרון:

1. קרא את השאלה בעיון רב. זהה מה בדיוק נשאל.
2. זהה את הנתונים: מחירים, כמויות, גמישויות, פונקציות עלות, סוג שוק, וכו'.
3. אם יש טבלה — חשב את כל הערכים הרלוונטיים (עלות שולית, תפוקה שולית, רווח, וכו').
4. נתח כל אפשרות בנפרד. לכל אפשרות, הסבר למה היא נכונה או שגויה.
5. קבע את התשובה הנכונה רק אחרי שניתחת את כל האפשרויות.
6. כתוב רמז פדגוגי — משפט אחד שמכוון את הסטודנט לכיוון הנכון בלי לחשוף את התשובה.

חשוב מאוד:
- אל תנחש. אם אתה לא בטוח, חשב שוב.
- זה מבחן קשה. הסטודנטים צריכים הסברים עמוקים ומדויקים, לא תשובות שטחיות.
- ההסבר לתשובה הנכונה צריך להיות מפורט ולכלול את החישוב/הלוגיקה המלאה.
- ההסבר לכל תשובה שגויה צריך להסביר את הטעות הספציפית בטענה.

החזר JSON בפורמט הבא בלבד:
{{
  "correctIndex": <מספר 0-4 — אינדקס האפשרות הנכונה>,
  "reasoning": {{
    "correct": "<הסבר מפורט, כולל חישוב/לוגיקה, למה התשובה הנכונה נכונה>",
    "wrong": {{
      "<אינדקס>": "<הסבר ספציפי למה אפשרות זו שגויה>"
    }}
  }},
  "hint": "<רמז פדגוגי — משפט אחד שמכוון לתשובה בלי לחשוף אותה>"
}}"""


def solve_question(client: Groq, question: dict) -> dict | None:
    """Solve a single question with deep reasoning."""
    prompt = build_solver_prompt(question)

    try:
        response = client.chat.completions.create(
            model=SOLVER_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            max_tokens=4096,
            temperature=0.1,
            response_format={"type": "json_object"},
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"⚠️ Error: {e}")
        return None


# ─── Helpers ─────────────────────────────────────────────────────────────────

# Map course IDs to short names for file naming
COURSE_SHORT_NAMES = {
    "microeconomics": "micro",
    "organizational-behavior": "ob",
    "accounting": "accounting",
}


def derive_simulation_name(course_id: str, base_name: str) -> str:
    """Derive a distinct simulation filename like 'simulation-micro-2013'."""
    short = COURSE_SHORT_NAMES.get(course_id, course_id[:5])
    # Extract meaningful part from base_name (e.g., "exam-2013-micro" → "2013")
    # Try to find a year or number pattern
    import re
    year_match = re.search(r"(\d{4})", base_name)
    tag = year_match.group(1) if year_match else base_name.replace("exam-", "")
    return f"simulation-{short}-{tag}"


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 3:
        print("Usage: python scripts/exam-solve.py <course-id> <questions-json>")
        print("Example: python scripts/exam-solve.py microeconomics exam-2013-micro-questions.json")
        sys.exit(1)

    course_id = sys.argv[1]
    questions_filename = sys.argv[2]

    load_env()
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        print("❌ GROQ_API_KEY not found. Set it in .env")
        sys.exit(1)

    base_dir = Path(__file__).resolve().parent.parent  # = web/
    processed_dir = base_dir / "src" / "data" / course_id / "exams" / "processed"
    chapters_dir = base_dir / "src" / "data" / course_id / "chapters"
    input_path = processed_dir / questions_filename
    base_name = questions_filename.replace("-questions.json", "")

    # Derive distinct simulation name
    sim_name = derive_simulation_name(course_id, base_name)
    final_path = chapters_dir / f"{sim_name}.json"

    if not input_path.exists():
        print(f"❌ Questions file not found: {input_path}")
        sys.exit(1)

    with open(input_path, "r", encoding="utf-8") as f:
        exam_data = json.load(f)

    client = Groq(api_key=api_key)

    print(f"\n🧠 Exam Solver v2 (Deep Reasoning)")
    print(f"📄 Source: {questions_filename}")
    print(f"📂 Course: {course_id}")
    print(f"🤖 Model: {SOLVER_MODEL}")
    print(f"❓ Questions: {len(exam_data['questions'])}")
    print(f"📁 Output: {sim_name}.json\n")

    solved_questions = []
    success_count = 0
    error_count = 0

    for q in exam_data["questions"]:
        sys.stdout.write(f"  🔍 Q{q['number']}... ")
        sys.stdout.flush()

        result = solve_question(client, q)

        if result and "correctIndex" in result:
            correct_idx = result["correctIndex"]
            letter = HEBREW_LETTERS[correct_idx] if 0 <= correct_idx <= 4 else "?"

            question_text = q["questionText"]
            if q.get("tableData"):
                question_text += f"\n\n{q['tableData']}"
            if q.get("graphDescription"):
                question_text += f"\n\n📊 {q['graphDescription']}"

            solved_questions.append({
                "id": q["id"],
                "number": q["number"],
                "type": "multiple-choice",
                "question": question_text,
                "points": 5,
                "options": q["options"],
                "correctIndex": correct_idx,
                "hint": result.get("hint", ""),
                "reasoning": {
                    "correct": result["reasoning"]["correct"],
                    "wrong": result["reasoning"].get("wrong", {}),
                },
            })
            success_count += 1
            print(f"✅ → {letter}")
        else:
            solved_questions.append({
                "id": q["id"],
                "number": q["number"],
                "type": "multiple-choice",
                "question": q["questionText"],
                "points": 5,
                "options": q["options"],
                "correctIndex": -1,
                "hint": "לא נפתרה אוטומטית.",
                "reasoning": {
                    "correct": "שאלה זו דורשת פתרון ידני.",
                    "wrong": {},
                },
            })
            error_count += 1
            print("⚠️ Failed")

        # Rate limit pause
        time.sleep(3)

    # Build final ExamEngine-compatible output
    output = {
        "id": sim_name,
        "title": f"מבחן סימולציה – {base_name}",
        "courseId": course_id,
        "totalQuestions": len(solved_questions),
        "passingScore": 60,
        "questions": solved_questions,
    }

    # Write final JSON to chapters/ directory
    chapters_dir.mkdir(parents=True, exist_ok=True)
    with open(final_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n📊 Results: {success_count} solved, {error_count} errors")
    print(f"✅ Final → {final_path.relative_to(base_dir)}")

    # Clean up intermediate files
    questions_path = input_path  # the -questions.json
    solved_path = processed_dir / f"{base_name}-solved.json"  # if leftover from v1

    cleaned = []
    if questions_path.exists():
        questions_path.unlink()
        cleaned.append(questions_path.name)
    if solved_path.exists():
        solved_path.unlink()
        cleaned.append(solved_path.name)

    if cleaned:
        print(f"🧹 Cleaned up: {', '.join(cleaned)}")

    print(f"\n🎉 Done! Exam is live at: src/data/{course_id}/chapters/{sim_name}.json")


if __name__ == "__main__":
    main()

