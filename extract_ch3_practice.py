import pdfplumber

pdf_path = r"c:\Users\rober\AI Projects\Sikumnik\input_materials\micro-economics\class-exercises\03_תרגול כיתה 3- המשך עקומת תמורה (אבטלה מבנית).pdf"
output_path = r"c:\Users\rober\AI Projects\Sikumnik\ch3_practice_text.txt"

with pdfplumber.open(pdf_path) as pdf:
    # Get total pages
    total_pages = len(pdf.pages)
    print(f"Total pages: {total_pages}")
    
    with open(output_path, "w", encoding="utf-8") as f:
        for i, page in enumerate(pdf.pages):
            f.write(f"--- PAGE {i+1} ---\n")
            text = page.extract_text()
            if text:
                f.write(text)
            f.write("\n\n")

print(f"Extraction complete. Text saved to {output_path}")
