# IMPERATIVE: Explain Academic Paper (Sikumnik Style)

## 🎯 Goal
Take a dry, complex academic PDF and convert it into a **Sikumnik Report**: a standalone HTML file that explains the concepts using the "Tel Avivian" persona (cynical, urban, relatable).

## 📥 Inputs
*   `pdf_path`: Absolute path to the academic paper (PDF).
*   `output_dir`: (Optional) Directory to save the HTML report. Defaults to user's desktop or project output folder.

## 🛠 Tools & Execution Flow

### 1. Ingest: Extract Text from PDF
*   **Tool:** `execution/pdf_extract.py` (To be created)
*   **Action:**
    *   Check if `pdf_path` exists.
    *   Run extraction script to get raw text.
    *   *Self-Annealing:* If standard extraction fails (empty text), try OCR mode (future feature) or ask user for help.

### 2. Analyze & Analogize (The "Brain")
*   **Tool:** `llm` (You) + `SKILLS/tlv-academic-explainer`
*   **Action:**
    *   Read the extracted text.
    *   Identify key concepts (Abstract, Methodology, Results, Conclusion).
    *   **Crucial:** Apply the `tlv-academic-explainer` persona.
        *   *Tone:* 29yo Tel Avivian, cynical but sharp.
        *   *Method:* Connect abstract theory to TLV life (Wolts, electric scooters, dating apps, rent).
        *   **Language Rule:** STRICTLY HEBREW. Do NOT include English terms in parentheses (e.g., no "Separate Entity"). We trust the user knows English or doesn't care.
    *   Draft the content sections in Markdown first.

### 3. Render: Generate HTML Report
*   **Tool:** `execution/render_report.py` (To be created)
*   **Action:**
    *   Pass the structured content (Title, Summary, Sections [Concept + Analogy]) to the renderer.
    *   Use **Tailwind CSS** template.
    *   **Design:**
        *   Dark Mode (`bg-gray-900` / `#121212`)
        *   RTL Layout (`dir="rtl"`)
        *   Neon Accents (Pink/Blue)
        *   Font: Heebo/Assistant
    *   Save as `Sikumnik_Report_[PaperName].html`.

## 📤 Outputs
*   **Primary:** A single `.html` file that opens in any browser.
*   **Secondary:** A brief summary in the chat confirming success and a link to the file.

## ⚠️ Edge Cases
*   **PDF is Scanned/Image-only:** Warn user that text extraction might be garbage.
*   **Paper is too long:** Focus on Abstract + Conclusion + 1 key section.
*   **"Too Scientific":** If the analogy feels weak, REWRITE IT. The analogy is the product.
