import pdfplumber

pdf_path = r"c:\Users\rober\AI Projects\Sikumnik\input_materials\micro-economics\class-presentations\3 - קשר בין גורמי יצור ובין עקומת התמורה.pdf"
output_path = r"c:\Users\rober\AI Projects\Sikumnik\ch3_text.txt"

with pdfplumber.open(pdf_path) as pdf:
    with open(output_path, "w", encoding="utf-8") as f:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                f.write(text)
                f.write("\n\n--- PAGE BREAK ---\n\n")

print(f"Extraction complete. Text saved to {output_path}")
