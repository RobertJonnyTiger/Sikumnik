
import os
from pypdf import PdfReader

files = [
    r"c:\Users\rober\AI Projects\Sikumnik\input_materials\micro-economics\class-presentations\4 - מענקים וצמיחה כלכלית.pdf",
    r"c:\Users\rober\AI Projects\Sikumnik\input_materials\micro-economics\class-exercises\04_תרגיל כיתה 4 - שיפור טכנולוגי, מענק, מסחר בינלאומי.pdf"
]

for file_path in files:
    print(f"--- Processing: {os.path.basename(file_path)} ---")
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages[:5]: # First 5 pages for preview
            text += page.extract_text() + "\n"
        print(text)
    except Exception as e:
        print(f"Error: {e}")
    print("\n" + "="*50 + "\n")
