
import { Calculator, BookOpen, Clock, Target, Award, Zap, Users, Brain, Network } from 'lucide-react';

export const courseData = {
    id: "accounting",
    title: "חשבונאות פיננסית א'",
    subtitle: "השער לעולם העסקים והדיווח הכספי",
    description: "שליטה בשפת הדיווח הכספי, הבנת דוחות, וניתוח המצב הפיננסי של פירמות. קורס יסוד קריטי לכל מי שרוצה להבין איך עסקים באמת עובדים.",

    heroImage: "/images/accounting-hero.jpg",

    stats: [
        { label: "פרקים", value: "12", icon: BookOpen },
        { label: "שעות לימוד", value: "20", icon: Clock },
        { label: "רמת קושי", value: "גבוהה", icon: Target },
    ],

    whatYouWillLearn: [
        "להבין את עקרונות הדיווח הכספי והחשבונאות הפיננסית.",
        "לערוך ולנתח מאזנים ודוחות רווח והפסד.",
        "לרשום פקודות יומן ולבצע התאמות חשבונאיות.",
        "לנהל מלאי ולחשב פחת על רכוש קבוע.",
        "להבין את התהליך החשבונאי המלא משלב העסקה ועד הדוח הכספי."
    ],

    syllabus: [
        {
            title: "חלק א׳: יסודות ודיווח",
            description: "הכרת המושגים הבסיסיים והדוחות המרכזיים.",
            icon: Brain,
            chapters: [
                {
                    id: "chapter-0",
                    number: 1,
                    title: "מבוא ומושגי יסוד",
                    description: "הכרת עולם החשבונאות, המשותף לכל העסקים והגופים.",
                    href: "/courses/accounting/chapter-0"
                },
                {
                    id: "chapter-2",
                    number: 2,
                    title: "עריכת מאזן",
                    description: "הבנת המבנה הפיננסי של הפירמה: נכסים, התחייבויות והון עצמי.",
                    href: "/courses/accounting/chapter-2"
                },
                {
                    id: "chapter-3",
                    number: 3,
                    title: "דוח רווח והפסד",
                    description: "איך מודדים הצלחה? הכנסות, הוצאות והשורה התחתונה.",
                    href: "/courses/accounting/chapter-3"
                },
                {
                    id: "chapter-4",
                    number: 4,
                    title: "פקודות יומן",
                    description: "השפה של המנהלים: רישום כפול ושיטתי של כל עסקה.",
                    href: "/courses/accounting/chapter-4"
                }
            ]
        },
        {
            title: "חלק ב׳: הרישום החשבונאי",
            description: "טכניקות הרישום והתהליך השוטף.",
            icon: Calculator,
            chapters: [
                {
                    id: "chapter-5",
                    number: 5,
                    title: "מאזן בוחן",
                    description: "כלי הבקרה המרכזי לווידוא תקינות הרישום החשבונאי.",
                    href: "/courses/accounting/chapter-5"
                },
                {
                    id: "chapter-6",
                    number: 6,
                    title: "התהליך החשבונאי",
                    description: "סגירת מעגל: מהעסקה הבודדת ועד הדוחות הכספיים.",
                    href: "/courses/accounting/chapter-6"
                },
                {
                    id: "chapter-7",
                    number: 7,
                    title: "כרטיסי חתך",
                    description: "ניהול והשוואת נתונים פיננסיים לאורך זמן.",
                    href: "/courses/accounting/chapter-7"
                }
            ]
        },
        {
            title: "חלק ג׳: נושאים מתקדמים",
            description: "טיפול בנכסים, מלאי וחייבים.",
            icon: Network,
            chapters: [
                {
                    id: "chapter-8",
                    number: 8,
                    title: "חישובי מלאי",
                    description: "איך מעריכים סחורה? הבנת המלאי והשפעתו על הרווח.",
                    href: "/courses/accounting/chapter-8"
                },
                {
                    id: "chapter-9",
                    number: 9,
                    title: "שיטות מלאי (FIFO)",
                    description: "ניהול מלאי מתקדם ושיטות הערכה נפוצות.",
                    href: "/courses/accounting/chapter-9"
                },
                {
                    id: "chapter-10",
                    number: 10,
                    title: "רכוש קבוע",
                    description: "טיפול בנכסים לטווח ארוך, פחת וירידת ערך.",
                    href: "/courses/accounting/chapter-10"
                },
                {
                    id: "chapter-11",
                    number: 11,
                    title: "לקוחות וחומ\"ס",
                    description: "ניהול אשראי והתמודדות עם חובות שלא נגבו.",
                    href: "/courses/accounting/chapter-11"
                },
                {
                    id: "chapter-12",
                    number: 12,
                    title: "גיול חובות",
                    description: "ניתוח ובקרה על חובות לקוחות לפי זמן פיגור.",
                    href: "/courses/accounting/chapter-12"
                }
            ]
        }
    ],

    whyItMatters: {
        title: "למה הקורס הזה קריטי לקריירה שלך?",
        points: [
            {
                title: "שפת העסקים",
                text: "חשבונאות היא השפה שבה עסקים מדברים. בלי להבין אותה, אי אפשר באמת לנהל.",
                icon: Award
            },
            {
                title: "קבלת החלטות",
                text: "היכולת לקרוא דוח כספי מאפשרת לקבל החלטות מבוססות נתונים ולא רק תחושות בטן.",
                icon: Zap
            },
            {
                title: "יזמות וניהול",
                text: "כל יזם או מנהל חייב להבין את הרווחיות ואת תזרים המזומנים של העסק שלו.",
                icon: Calculator
            }
        ]
    }
};
