import { Calculator, BookOpen, Clock, Target, Brain, TrendingUp, Zap } from 'lucide-react';

export const courseData = {
    id: "math",
    title: "מתמטיקה א'",
    subtitle: "יסודות האלגברה, חדו\"א ומה שביניהם",
    description: "מהחישובים הבסיסיים ביותר ועד לניתוח פונקציות מורכבות. קורס מקיף שבונה את התשתית המתמטית הדרושה לכל סטודנט למדעים וכלכלה.",

    heroImage: "/images/math-hero.jpg",

    stats: [
        { label: "פרקים", value: "12", icon: BookOpen },
        { label: "שעות לימוד", value: "20", icon: Clock },
        { label: "רמת קושי", value: "קשה", icon: Target },
    ],

    whatYouWillLearn: [
        "שליטה בנוסחאות כפל מקוצר ופירוק לגורמים.",
        "פתרון משוואות ממעלות שונות ובעיות מילוליות.",
        "הבנה עמוקה של מושג הגבול והרציפות.",
        "חישוב נגזרות ושימושיהן בחיים האמיתיים.",
        "חקירת פונקציות מלאה ומציאת נקודות קיצון."
    ],

    syllabus: [
        {
            title: "חלק א׳: מבוא ואלגברה בסיסית",
            description: "יישור קו וכלים בסיסיים.",
            icon: Brain,
            chapters: [
                {
                    id: "chapter-1",
                    number: 1,
                    title: "אלגברה בסיסית",
                    description: "נוסחאות כפל מקוצר, פירוק לגורמים ותחום הגדרה.",
                    href: "/courses/math/chapter-1"
                }
            ]
        }
    ],

    whyItMatters: {
        title: "למה הקורס הזה קריטי להצלחה שלך?",
        points: [
            {
                title: "שפת המדע",
                text: "מתמטיקה היא השפה שבה מתוארים כל התהליכים בעולם המודרני.",
                icon: Calculator
            },
            {
                title: "חשיבה לוגית",
                text: "פיתוח יכולת פתרון בעיות וניתוח לוגי רב-שלבי.",
                icon: Zap
            },
            {
                title: "בסיס אקדמי",
                text: "קורס חובה שמהווה את המפתח לכל שאר המקצועות הריאליים.",
                icon: TrendingUp
            }
        ]
    }
};
