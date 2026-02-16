# Hebrew OCR Fix - Agent Update Brief

## Problem Summary
The OCR system was outputting Hebrew text as visually similar Latin characters (א→N, ב→D, ש→W, etc.) instead of actual Hebrew Unicode characters. This happened because Tesseract wasn't using the Hebrew language model.

## What We Fixed
1. ✅ Verified Tesseract is properly installed on Windows
2. ✅ Downloaded and installed `heb.traineddata` (Hebrew language model from tessdata_best)
3. ✅ Confirmed Hebrew is now available (`tesseract --list-langs` shows `heb`)

---

## Required Code Changes in `librarian_process.py`

### OLD CODE (doesn't work properly):
```python
import pytesseract
from pdf2image import convert_from_path

def extract_text_from_pdf(pdf_path):
    images = convert_from_path(pdf_path, dpi=300)
    all_text = []
    
    for image in images:
        # Problem: No language specified, defaults to English only
        text = pytesseract.image_to_string(image)
        all_text.append(text)
    
    return "\n\n".join(all_text)
```

### NEW CODE (forces Hebrew model):
```python
import pytesseract
from pdf2image import convert_from_path

def extract_text_from_pdf(pdf_path):
    """
    Extract text from scanned PDF using Hebrew OCR
    """
    # Convert PDF to images (high DPI for better OCR)
    images = convert_from_path(pdf_path, dpi=300)
    
    all_text = []
    
    for i, image in enumerate(images):
        print(f"Processing page {i+1}/{len(images)}...")
        
        # *** CRITICAL CHANGE ***
        # Force Tesseract to use Hebrew + English models
        custom_config = r'--oem 3 --psm 6 -l heb+eng'
        
        text = pytesseract.image_to_string(
            image,
            lang='heb+eng',  # Hebrew + English
            config=custom_config
        )
        
        all_text.append(text)
    
    return "\n\n".join(all_text)
```

---

## Optional: Add Image Preprocessing (Recommended)

For better OCR accuracy on scanned documents, add preprocessing:

```python
import cv2
import numpy as np
from PIL import Image

def preprocess_for_ocr(pil_image):
    """
    Preprocess image to improve OCR accuracy
    """
    # Convert PIL to numpy array
    img = np.array(pil_image)
    
    # Convert to grayscale
    if len(img.shape) == 3:
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    else:
        gray = img
    
    # Enhance contrast
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    enhanced = clahe.apply(gray)
    
    # Denoise
    denoised = cv2.fastNlMeansDenoising(enhanced, h=10)
    
    # Binarization (black/white)
    _, binary = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    return Image.fromarray(binary)


def extract_text_from_pdf_improved(pdf_path):
    """
    Extract text with preprocessing for better accuracy
    """
    images = convert_from_path(pdf_path, dpi=300)
    
    all_text = []
    
    for i, image in enumerate(images):
        print(f"Processing page {i+1}/{len(images)}...")
        
        # Preprocess image
        processed = preprocess_for_ocr(image)
        
        # OCR with Hebrew
        custom_config = r'--oem 3 --psm 6 -l heb+eng'
        text = pytesseract.image_to_string(
            processed,
            lang='heb+eng',
            config=custom_config
        )
        
        all_text.append(text)
    
    return "\n\n".join(all_text)
```

---

## Key Configuration Parameters

| Parameter | Value | Meaning |
|-----------|-------|---------|
| `--oem 3` | Default | Use LSTM neural net mode (best accuracy) |
| `--psm 6` | Uniform text block | Assumes single block of text |
| `-l heb+eng` | Hebrew + English | Use both language models |
| `dpi=300` | High resolution | Better quality for OCR |

### Other useful PSM modes to try:
- `--psm 3`: Fully automatic (default)
- `--psm 4`: Single column of text
- `--psm 11`: Sparse text
- `--psm 1`: Automatic with OSD (orientation detection)

---

## Expected Results

### Before Fix:
```
NLDWT NWLLT = Ymax - Y
Alternative Cost: YD pDNW7Z7N Ni7Y
```

### After Fix:
```
עלות כוללת = Ymax - Y
Alternative Cost: עד הנקודה הזו
```

---

## Impact on Pipeline

The current pipeline should now work correctly:

```
PDF → librarian_process.py (NOW WITH HEBREW OCR) → librarian-output.md → lecturer_process.py → chapter.json
```

**Important:** You may still need `lecturer_process.py` for:
- Post-processing cleanup
- Handling edge cases where OCR makes mistakes
- But it should receive MUCH BETTER Hebrew text now

---

## Dependencies

Make sure these are installed:

```bash
pip install pytesseract pdf2image opencv-python pillow numpy
```

For Windows, you also need:
- Tesseract-OCR installed (already done ✓)
- poppler for pdf2image (download from: https://github.com/oschwartz10612/poppler-windows/releases/)

---

## Testing Recommendation

Test the updated code with a sample Hebrew PDF and compare:
1. Output quality (should be real Hebrew characters)
2. Accuracy (fewer character recognition errors)
3. Speed (preprocessing adds ~20% overhead but improves accuracy significantly)

---

## Complete Updated librarian_process.py

Here's the complete file with all improvements:

```python
import pytesseract
from pdf2image import convert_from_path
import cv2
import numpy as np
from PIL import Image
import os

# Set Tesseract path (Windows)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def preprocess_for_ocr(pil_image):
    """
    Preprocess image to improve OCR accuracy
    """
    img = np.array(pil_image)
    
    if len(img.shape) == 3:
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    else:
        gray = img
    
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    enhanced = clahe.apply(gray)
    
    denoised = cv2.fastNlMeansDenoising(enhanced, h=10)
    
    _, binary = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    return Image.fromarray(binary)

def extract_text_from_pdf(pdf_path, use_preprocessing=True):
    """
    Extract Hebrew text from scanned PDF
    
    Args:
        pdf_path: Path to PDF file
        use_preprocessing: Whether to preprocess images (default: True)
    
    Returns:
        Extracted text as string
    """
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found: {pdf_path}")
    
    print(f"Converting PDF to images: {pdf_path}")
    images = convert_from_path(pdf_path, dpi=300)
    
    all_text = []
    
    for i, image in enumerate(images):
        print(f"Processing page {i+1}/{len(images)}...")
        
        # Preprocess if enabled
        if use_preprocessing:
            image = preprocess_for_ocr(image)
        
        # OCR with Hebrew + English
        custom_config = r'--oem 3 --psm 6 -l heb+eng'
        
        text = pytesseract.image_to_string(
            image,
            lang='heb+eng',
            config=custom_config
        )
        
        all_text.append(f"--- Page {i+1} ---\n{text}")
    
    result = "\n\n".join(all_text)
    print(f"✓ Extraction complete: {len(result)} characters")
    
    return result

def save_to_markdown(text, output_path="librarian-output.md"):
    """
    Save extracted text to markdown file
    """
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print(f"✓ Saved to: {output_path}")

# Example usage
if __name__ == "__main__":
    pdf_file = "path/to/your/hebrew_document.pdf"
    
    # Extract text
    extracted_text = extract_text_from_pdf(pdf_file)
    
    # Save to file
    save_to_markdown(extracted_text)
```

---

## Quick Start Checklist

- [ ] Install dependencies: `pip install pytesseract pdf2image opencv-python pillow numpy`
- [ ] Verify Hebrew model installed: `tesseract --list-langs` (should show `heb`)
- [ ] Update `librarian_process.py` with new code above
- [ ] Set correct Tesseract path in code (line 9)
- [ ] Test with sample Hebrew PDF
- [ ] Compare output quality with old version
- [ ] Adjust PSM mode if needed (`--psm 3`, `--psm 4`, etc.)

---

## Troubleshooting

### If still getting Latin characters instead of Hebrew:
1. Verify `tesseract --list-langs` shows `heb`
2. Check that `lang='heb+eng'` is specified in code
3. Try different PSM modes: `--psm 3` or `--psm 4`
4. Ensure `heb.traineddata` is in correct tessdata folder

### If accuracy is poor:
1. Enable preprocessing (`use_preprocessing=True`)
2. Increase DPI to 400 or 600
3. Try `tessdata_best` instead of `tessdata_fast`
4. Experiment with different PSM modes

### If it's too slow:
1. Disable preprocessing (`use_preprocessing=False`)
2. Reduce DPI to 200
3. Use `tessdata_fast` instead of `tessdata_best`

---

## Summary

**Main change:** Force Tesseract to use Hebrew model by adding:
```python
lang='heb+eng'
config=r'--oem 3 --psm 6 -l heb+eng'
```

This should fix 90% of the character substitution issues. The rest can be handled by `lecturer_process.py` for edge cases.

Good luck! 🚀