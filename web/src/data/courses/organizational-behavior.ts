
import { BookOpen, Users, Brain, Target, Network, Zap, Award } from 'lucide-react';

export const courseData = {
    id: "organizational-behavior",
    title: "התנהגות ארגונית",
    subtitle: "המפתח להבנת ה-DNA של הארגון",
    description: "קורס זה לוקח אותך למסע מרתק אל נבכי הנפש האנושית בתוך הסביבה הארגונית. נלמד מה מניע עובדים, איך קבוצות הופכות לצוותים מנצחים, וכיצד מנהיגים משפיעים על המציאות.",

    heroImage: "/images/ob-hero.jpg", // Placeholder

    stats: [
        { label: "פרקים", value: "7", icon: BookOpen },
        { label: "שעות לימוד", value: "12", icon: Clock }, // Estimated
        { label: "רמת קושי", value: "בינוני", icon: Target },
    ],

    whatYouWillLearn: [
        "להבין את הפסיכולוגיה שמאחורי קבלת החלטות של עובדים ומנהלים.",
        "לזהות את הגורמים למוטיבציה (או חוסר מוטיבציה) בעבודה.",
        "לנתח דינמיקות קבוצתיות ולהפוך קבוצות לצוותים אפקטיביים.",
        "להכיר סגנונות מנהיגות שונים והשפעתם על התרבות הארגונית.",
        "להתמודד עם פוליטיקה, כוח וקונפליקטים בארגון."
    ],

    syllabus: [
        {
            title: "חלק א׳: הפרט בארגון",
            description: "היסודות הפסיכולוגיים של התנהגות העובד הבודד.",
            icon: Brain,
            chapters: [
                {
                    id: "chapter-1",
                    number: 1,
                    title: "מבוא והתנהגות ארגונית",
                    description: "הכרת התחום, מודל ה-IPM, ולמה זה בכלל מעניין אותנו.",
                    href: "/courses/organizational-behavior/chapter-1"
                },
                {
                    id: "chapter-2",
                    number: 2,
                    title: "הפרט בארגון",
                    description: "אישיות, ערכים, והבדלים בין-אישיים שמשפיעים על ביצועים.",
                    href: "/courses/organizational-behavior/chapter-2"
                },
                {
                    id: "chapter-3",
                    number: 3,
                    title: "תפיסה וקבלת החלטות",
                    description: "איך המוח שלנו מעבד מידע ואיך הטיות קוגניטיביות משפיעות עלינו.",
                    href: "/courses/organizational-behavior/chapter-3"
                },
                {
                    id: "chapter-4",
                    number: 4,
                    title: "מוטיבציה",
                    description: "התיאוריות המרכזיות שמסבירות מה באמת גורם לנו לעבוד קשה.",
                    href: "/courses/organizational-behavior/chapter-4"
                }
            ]
        },
        {
            title: "חלק ב׳: הקבוצה",
            description: "הדינמיקה שנוצרת כשאנשים עובדים יחד.",
            icon: Users,
            chapters: [
                {
                    id: "chapter-5",
                    number: 5,
                    title: "התנהגות קבוצתית",
                    description: "נורמות, סטטוס, בטלה חברתית וחשיבת יחד.",
                    href: "/courses/organizational-behavior/chapter-5"
                }
            ]
        },
        {
            title: "חלק ג׳: המערכת הארגונית",
            description: "התמונה הגדולה: מנהיגות, כוח ותרבות.",
            icon: Network,
            chapters: [
                {
                    id: "chapter-6",
                    number: 6,
                    title: "מנהיגות",
                    description: "תיאוריות ומודלים של מנהיגות אפקטיבית.",
                    href: "/courses/organizational-behavior/chapter-6"
                },
                {
                    id: "ob-situational-leadership-tool",
                    number: 6.5,
                    title: "כלי עזר: מנהיגות מצבית",
                    description: "כלי אבחון אינטראקטיבי לזיהוי סגנון הניהול המתאים.",
                    href: "/courses/organizational-behavior/situational-leadership"
                },
                {
                    id: "chapter-7",
                    number: 7,
                    title: "תרבות ארגונית ופוליטיקה",
                    description: "הכללים הלא כתובים והמשחקים הפוליטיים מאחורי הקלעים.",
                    href: "/courses/organizational-behavior/chapter-7"
                }
            ]
        }
    ],

    whyItMatters: {
        title: "למה הקורס הזה קריטי לקריירה שלך?",
        points: [
            {
                title: "ניהול אפקטיבי",
                text: "מנהלים שמבינים אנשים מצליחים יותר ממנהלים שרק מבינים מספרים.",
                icon: Award
            },
            {
                title: "הישרדות ארגונית",
                text: "הבנת הפוליטיקה והתרבות הארגונית היא מפתח להתקדמות ושרידות בארגונים גדולים.",
                icon: Zap
            },
            {
                title: "עבודת צוות",
                text: "היכולת לעבוד בצוות ולהניע אחרים היא המיומנות המבוקשת ביותר בשוק העבודה כיום.",
                icon: Users
            }
        ]
    }
};

// Helper icon import for usage
import { Clock } from 'lucide-react';
