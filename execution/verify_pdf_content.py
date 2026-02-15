import pdfplumber
from pathlib import Path

def extract_debug_text():
    pdf_path = Path("input_materials/accounting/semester A notebook.pdf")
    output_path = Path("debug_chapter_2_content.txt")
    
    # User said pages 2-4 are Chapter 2, and Page 5 starts a new section.
    # Arrays are 0-indexed, so Page 2 is index 1.
    # We will extract pages 1, 2, 3, 4, 5 (indices 1-5) to be sure we see the boundaries.
    
    print(f"Opening {pdf_path}...")
    
    with pdfplumber.open(pdf_path) as pdf:
        with open(output_path, "w", encoding="utf-8") as f:
            for i in range(1, 6): # Pages 2 to 6
                if i < len(pdf.pages):
                    page = pdf.pages[i]
                    text = page.extract_text()
                    
                    header = f"\n\n--- PAGE {i + 1} START ---\n\n"
                    f.write(header)
                    print(f"Extracting Page {i + 1}...")
                    
                    if text:
                        f.write(text)
                    else:
                        f.write("[NO TEXT EXTRACTED - MIGHT BE IMAGE BASED]")
                        
                    footer = f"\n\n--- PAGE {i + 1} END ---\n"
                    f.write(footer)
                else:
                    print(f"Page {i + 1} out of range.")

    print(f"Debug dump saved to {output_path}")

if __name__ == "__main__":
    extract_debug_text()
