import sys
import os
import json
from jinja2 import Environment, FileSystemLoader

# Get the project root directory
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR = os.path.join(PROJECT_ROOT, 'templates')
OUTPUT_DIR = os.path.join(PROJECT_ROOT, 'output')

def render_report(data, output_filename="report.html"):
    """
    Renders the Sikumnik report using Jinja2 and the HTML template.
    
    data: Dictionary containing:
        - title
        - summary
        - sections: List of dicts {concept_title, academic_text, analogy_text}
    """
    try:
        # creating output directory if it doesn't exist
        if not os.path.exists(OUTPUT_DIR):
            os.makedirs(OUTPUT_DIR)

        env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
        template = env.get_template('report_template.html')
        
        output_html = template.render(
            title=data.get('title', 'Sikumnik Report'),
            summary=data.get('summary', 'No summary provided.'),
            sections=data.get('sections', [])
        )
        
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output_html)
            
        print(f"Success: Report generated at {output_path}")
        return output_path

    except Exception as e:
        print(f"Error generating report: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python render_report.py <json_data_file>")
        # For testing purposes, if no file is provided, use dummy data
        print("Running in TEST mode with dummy data...")
        dummy_data = {
            "title": "בדיקת מערכת: חשבונאות (System Test)",
            "summary": "המסמך הזה הוא בדיקה של המערכת. אם אתם רואים את זה, סימן שהקוד עובד. עכשיו בוא נדבר על למה דוחות כספיים זה כמו הפרופיל טינדר של החברה.",
            "sections": [
                {
                    "concept_title": "מאזן (Balance Sheet)",
                    "academic_text": "דוח המציג את המצב הכספי של ישות ליום מסוים. הוא מפרט את הנכסים, ההתחייבויות וההון העצמי.",
                    "analogy_text": "תחשוב על זה כעל צילום מסך של העו\"ש שלך וכל החובות שלך ב-2 בלילה. זה לא מספר את כל הסיפור (כמו כמה כיף היה בבר), אבל זה מראה בדיוק כמה כסף יש וכמה אתה חייב לביטוח לאומי.",
                },
                {
                    "concept_title": "פחת (Depreciation)",
                    "academic_text": "הקצאה שיטתית של העלות המופחתת של נכס על פני אורך חייו השימושיים.",
                    "analogy_text": "קנית אייפון חדש ב-5,000 שקל? ביום שיצאת מהחנות הוא שווה 4,000. אחרי שנה הוא שווה 2,000. הכסף הזה שנעלם? זה פחת. זה המחיר של להיראות מגניב עם הטלפון הכי חדש שניה לפני שהוא נהיה פח.",
                }
            ]
        }
        render_report(dummy_data, "test_sikumnik_report.html")
    else:
        json_file = sys.argv[1]
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        render_report(data)
