
import os
from pypdf import PdfReader

file_path = r"c:\Users\rober\AI Projects\Sikumnik\input_materials\micro-economics\class-exercises\04_תרגיל כיתה 4 - שיפור טכנולוגי, מענק, מסחר בינלאומי.pdf"

print(f"--- Processing: {os.path.basename(file_path)} ---")
try:
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    print(text)
except Exception as e:
    print(f"Error: {e}")
