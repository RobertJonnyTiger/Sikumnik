
import { Brain, Users, Network, Target, BookOpen, Clock, Calculator, Zap, TrendingUp } from 'lucide-react';

export const courseData = {
    id: "organizational-behavior",
    title: "התנהגות ארגונית",
    subtitle: "הבנת הדינמיקה האנושית בארגונים מודרניים",
    description: "איך אנשים חושבים, מרגישים ומתנהגים בתוך קבוצות וארגונים. קורס מרתק המשלב פסיכולוגיה, סוציולוגיה וניהול כדי להבין מה באמת מניע הצלחה ארגונית.",

    heroImage: "/images/ob-hero.jpg",

    stats: [
        { label: "פרקים", value: "7", icon: BookOpen },
        { label: "שעות לימוד", value: "12", icon: Clock },
        { label: "רמת קושי", value: "בינוני", icon: Target },
    ],

    whatYouWillLearn: [
        "להבין את מבנה האישיות והתפיסה של העובד.",
        "לנתח תהליכי קבלת החלטות ומוטיבציה.",
        "לשלוט בדינמיקה קבוצתית ובתקשורת פנים-ארגונית.",
        "להבין מנהיגות, כוח ופוליטיקה בארגונים.",
        "לנתח תרבות ארגונית ותהליכי שינוי."
    ],

    syllabus: [
        {
            title: "חלק א׳: עולם הפרט",
            description: "הבנת הגורם האנושי כבסיס לארגון.",
            icon: Brain,
            chapters: [
                {
                    id: "chapter-1",
                    number: 1,
                    title: "מבוא להתנהגות ארגונית",
                    description: "הגדרת הארגון וגישות ניהול שונות.",
                    href: "/courses/organizational-behavior/chapter-1"
                },
                {
                    id: "chapter-2",
                    number: 2,
                    title: "הפרט בארגון",
                    description: "אישיות, ערכים ועמדות המשפיעים על העבודה.",
                    href: "/courses/organizational-behavior/chapter-2"
                },
                {
                    id: "chapter-3",
                    number: 3,
                    title: "תפיסה וקבלת החלטות",
                    description: "איך הפרט מפרש את המציאות ומקבל החלטות תחת לחץ.",
                    href: "/courses/organizational-behavior/chapter-3"
                },
                {
                    id: "chapter-4",
                    number: 4,
                    title: "מוטיבציה",
                    description: "מה מניע אנשים להשקיע מאמץ בארגון?",
                    href: "/courses/organizational-behavior/chapter-4"
                }
            ]
        }
    ],

    whyItMatters: {
        title: "למה הקורס הזה קריטי לקריירה שלך?",
        points: [
            {
                title: "ניהול אנשים",
                text: "מפתח להבנה מה מניע עובדים ואיך ליצור צוות מנצח.",
                icon: Users
            },
            {
                title: "פוליטיקה ארגונית",
                text: "הבנת יחסי כוח והשפעה בארגון לקידום רעיונות ומטרות.",
                icon: Network
            },
            {
                title: "הובלת שינוי",
                text: "כלים להובלת תהליכי שינוי ארגוני בסביבה דינמית.",
                icon: TrendingUp
            }
        ]
    }
};
