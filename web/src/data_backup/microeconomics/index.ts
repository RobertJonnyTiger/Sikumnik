
import { TrendingUp, BookOpen, Clock, Target, Award, Zap, Calculator, Brain, Network, Users } from 'lucide-react';

export const courseData = {
    id: "microeconomics",
    title: "מיקרו כלכלה",
    subtitle: "הכלכלה שמאחורי הבחירות היומיומיות שלך",
    description: "מה זו עלות אלטרנטיבית, למה אין ארוחות חינם, ואיך לקבל החלטות כלכליות טובות יותר. קורס מרתק שחושף את המנגנונים שמניעים את השוק ואת הפרטים בתוכו.",

    heroImage: "/images/micro-hero.jpg",

    stats: [
        { label: "פרקים", value: "12", icon: BookOpen },
        { label: "שעות לימוד", value: "15", icon: Clock },
        { label: "רמת קושי", value: "בינוני", icon: Target },
    ],

    whatYouWillLearn: [
        "להבין את מושג המחסור והעלות האלטרנטיבית.",
        "לנתח עקומות תמורה וגורמי ייצור.",
        "לשלוט במודל ההיצע והביקוש ובקביעת שיווי משקל.",
        "להבין את תועלת הצרכן והתנהגות היצרן.",
        "לנתח מצבי שוק שונים: תחרות משוכללת, מונופול והתערבות ממשלתית."
    ],

    syllabus: [
        {
            title: "חלק א׳: מושגי יסוד",
            description: "הבסיס של המחשבה הכלכלית.",
            icon: Brain,
            chapters: [
                {
                    id: "chapter-1",
                    number: 1,
                    title: "מדע הכלכלה",
                    description: "הגדרת המחסור, בחירה תחת אילוצים והנחות יסוד.",
                    href: "/courses/microeconomics/chapter-1"
                },
                {
                    id: "chapter-2",
                    number: 2,
                    title: "עלות אלטרנטיבית",
                    description: "המחיר האמיתי של כל החלטה: על מה אנחנו מוותרים כשאנחנו בוחרים.",
                    href: "/courses/microeconomics/chapter-2"
                },
                {
                    id: "chapter-3",
                    number: 3,
                    title: "גורמי ייצור ועקומת התמורה",
                    description: "מקסום פוטנציאל הייצור תחת מגבלות טכנולוגיות ומשאבים.",
                    href: "/courses/microeconomics/chapter-3"
                }
            ]
        },
        {
            title: "חלק ב׳: כוחות השוק",
            description: "איך נקבעים המחירים והכמויות בעולם.",
            icon: TrendingUp,
            chapters: [
                {
                    id: "chapter-4",
                    number: 4,
                    title: "היצע וביקוש",
                    description: "הלב הפועם של הכלכלה: איך הקונים והמוכרים נפגשים.",
                    href: "/courses/microeconomics/chapter-4"
                },
                {
                    id: "chapter-5",
                    number: 5,
                    title: "שיווי משקל",
                    description: "מתי השוק נרגע? הבנת הנקודה שבה כולם מרוצים (או שלא).",
                    href: "/courses/microeconomics/chapter-5"
                },
                {
                    id: "chapter-8",
                    number: 8,
                    title: "הביקוש (Demand)",
                    description: "הבנת החוקים הנסתרים שמנהלים את הארנק שלנו: רגישות למחיר והתנהגות צרכנים.",
                    href: "/courses/microeconomics/chapter-8"
                }
            ]
        },
        {
            title: "חלק ג׳: הערכה וסימולציה",
            description: "הכנה למבחן האמיתי.",
            icon: Award,
            chapters: [
                {
                    id: "exam-simulation",
                    number: 20,
                    title: "סימולציית מבחן א׳",
                    description: "מבחן מלא של 20 שאלות המכסה את כל חומר הקורס, כולל רמזים ונימוקים מפורטים.",
                    href: "/courses/microeconomics/exam"
                }
            ]
        }
    ],

    whyItMatters: {
        title: "למה הקורס הזה קריטי לקריירה שלך?",
        points: [
            {
                title: "חשיבה אנליטית",
                text: "כלכלה היא שיטה לפתרון בעיות וניתוח מצבים מורכבים.",
                icon: Calculator
            },
            {
                title: "הבנת השוק",
                text: "מפתח להבנה של אינפלציה, ריבית, ושינויים גלובליים שמשפיעים על כולנו.",
                icon: Zap
            },
            {
                title: "קבלת החלטות מושכלת",
                text: "הבנת העלות האלטרנטיבית הופכת אותך למקבל החלטות טוב יותר בכל תחום בחיים.",
                icon: TrendingUp
            }
        ]
    }
};
