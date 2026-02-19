import { Lightbulb, Brain, Sparkles, Zap, Rocket, Code, HelpCircle, History, Landmark, Users, Search } from "lucide-react";

export interface TriviaFact {
    fact: string;
    category: string;
    source?: string;
    icon?: any;
}

export const triviaBank: Record<string, TriviaFact[]> = {
    "חשבונאות": [
        {
            "category": "היסטוריה",
            "fact": "החשבונאי האיטלקי לוקה פאצ'ולי (1494) נחשב לאבי החשבונאות המודרנית. הוא היה חבר קרוב של ליאונרדו דה וינצ'י!",
            "icon": History
        },
        {
            "category": "אטימולוגיה",
            "fact": "המונח 'ביקורת' (Audit) מגיע מהמילה הלטינית 'Audire' שמשמעותה 'לשמוע' - בעבר הדיווח נעשה בעל פה.",
            "icon": Brain
        },
        {
            "category": "חדשנות",
            "fact": "המסטיק (Bubble Gum) הומצא על ידי רואה חשבון בשם וולטר דימר בשנת 1928, בזמן שניסה לשפר פורמולה למסטיק רגיל.",
            "icon": Lightbulb
        },
        {
            "category": "בטחון",
            "fact": "ה-FBI מעסיק למעלה מ-2,000 רואי חשבון חקירתיים (Forensic Accountants) שתפקידם 'לעקוב אחרי הכסף'.",
            "icon": Search
        },
        {
            "category": "פילוסופיה",
            "fact": "אוסקר ויילד אמר פעם: 'כיום אנשים יודעים את המחיר של כל דבר, אבל את הערך של שום דבר'.",
            "icon": Sparkles
        },
        {
            "category": "כלכלה",
            "fact": "חברת אפל מחזיקה כ-160 מיליארד דולר במזומנים - יותר מהתל\"ג של 75% ממדינות העולם.",
            "icon": Landmark
        }
    ],
    "התנהגות ארגונית": [
        {
            "category": "פסיכולוגיה",
            "fact": "אפקט הות'ורן גילה שאנשים עובדים טוב יותר פשוט כי הם יודעים שמישהו צופה בהם, בלי קשר לתנאים.",
            "icon": Brain
        },
        {
            "category": "טכנולוגיה",
            "fact": "פרויקט אריסטו של גוגל מצא ש'ביטחון פסיכולוגי' הוא הגורם מספר 1 להצלחת צוותים.",
            "icon": Rocket
        },
        {
            "category": "מיתוס",
            "fact": "אברהם מאסלו מעולם לא צייר פירמה! הפירמידה נוספה מאוחר יותר על ידי יועצי ניהול.",
            "icon": HelpCircle
        },
        {
            "category": "אטימולוגיה",
            "fact": "המונח 'ארגון' מגיע מהמילה היוונית 'אורגנון', שמשמעותה כלי או איבר בגוף.",
            "icon": History
        },
        {
            "category": "חברה",
            "fact": "מחקרים מראים ש'שיחות מסדרון' לא פורמליות אחראיות לעיתים קרובות ליותר העברת ידע מאשר ישיבות.",
            "icon": Users
        }
    ]
};
