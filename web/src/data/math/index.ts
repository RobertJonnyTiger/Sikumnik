import { Calculator, BookOpen, Clock, Target, Award, Zap, Brain, FunctionSquare } from 'lucide-react';

export const courseData = {
    id: "math",
    title: "מתמטיקה קפיצת מדרגה",
    subtitle: "חדו״א ומשוואות דיפרנציאליות",
    description: "קורס מתמטיקה מתקדם המשלב הבנה תיאורטית עמוקה עם אינטואיציה יומיומית ויישומים פרקטיים.",

    heroImage: "/images/math-hero.jpg",

    stats: [
        { label: "פרקים", value: "1", icon: BookOpen },
        { label: "שעות לימוד", value: "5", icon: Clock },
        { label: "רמת קושי", value: "מתקדמת", icon: Target },
    ],

    whatYouWillLearn: [
        "להבין לעומק את מושג הנגזרת והאינטגרל.",
        "לפתור משוואות דיפרנציאליות מורכבות.",
        "לפתח אינטואיציה מתמטית חזקה לפתרון בעיות.",
        "ליישם עקרונות מתמטיים בהקשרים של פיזיקה וכלכלה."
    ],

    syllabus: [
        {
            title: "חלק א׳: חדו״א",
            description: "יסודות החשבון הדיפרנציאלי והאינטגרלי.",
            icon: FunctionSquare,
            chapters: [
                {
                    id: "chapter-01",
                    number: 1,
                    title: "מבוא לנגזרות",
                    description: "הבנת מושג הנגזרת דרך גבולות ויישומים שימושיים.",
                    href: "/courses/math/chapter-01"
                }
            ]
        }
    ],

    whyItMatters: {
        title: "למה מתמטיקה זה חשוב?",
        points: [
            {
                title: "השפה של הטבע",
                text: "מתמטיקה היא השפה שבה היקום מתנהל. בלעדיה אין אלגוריתמים, אין פיזיקה ואין הנדסה.",
                icon: Target
            },
            {
                title: "חשיבה אנליטית",
                text: "פתרון בעיות מתמטיות בונה שריר של מחשבה לוגית ומסודרת.",
                icon: Brain
            },
            {
                title: "בסיס למדעי המחשב",
                text: "כדי להיות מפתח על או חוקר בינה מלאכותית, אתה חייב בסיס מתמטי חזק.",
                icon: Zap
            }
        ]
    }
};
