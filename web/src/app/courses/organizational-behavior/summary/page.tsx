"use client";

import { CourseCompletionDashboard } from "@/components/core/dashboard/CourseCompletionDashboard";
import { Clock, BookOpen, Layers } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CourseSummaryPage() {
    // In a real app, these stats would come from a user progress database.
    // For now, we simulate the completion of the "Organizational Behavior" course.

    const stats = [
        {
            label: "זמן למידה כולל",
            value: "14.5 שעות",
            icon: Clock,
            color: "bg-blue-500"
        },
        {
            label: "פרקים הושלמו",
            value: "8/8",
            icon: BookOpen,
            color: "bg-purple-500"
        },
        {
            label: "מודלים ותיאוריות",
            value: "24",
            icon: Layers,
            color: "bg-pink-500"
        }
    ];

    const concepts = [
        "מודל הקרחון", "תיאוריית הייחוס", "הטיית האישוש",
        "מאסלו", "הרצברג", "מקלילנד", "תיאוריית ההוגנות", "תיאוריית הציפייה",
        "Forming-Storming-Norming", "חיסול חברתי", "בטלה חברתית",
        "קונפורמיות", "חשיבת יחד", "מנהיגות מצבית", "LMX",
        "מנהיגות מעצבת", "מנהיגות מתגמלת", "קבלת החלטות רציונלית"
    ];

    const NarrativeLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
        <Link href={href} className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-400 transition-colors font-semibold">
            {children}
        </Link>
    );

    const narrative = (
        <p>
            המסע שלך התחיל ב<NarrativeLink href="/courses/organizational-behavior/chapter-1">יסודות הארגון</NarrativeLink>,
            שם הבנת שהשלם באמת גדול מסכום חלקיו. צללת לעומק
            ה<NarrativeLink href="/courses/organizational-behavior/chapter-2">פרט בארגון</NarrativeLink> כדי
            להבין עד כמה כולנו שונים, וגילית דרך <NarrativeLink href="/courses/organizational-behavior/chapter-3">מודלי התפיסה</NarrativeLink> שהמציאות
            היא בעיני המתבונן (ושהמוח שלנו עושה לנו טריקים ללא הפסקה).
            <br className="my-4 block content-['']" />
            משם הדרך ל<NarrativeLink href="/courses/organizational-behavior/chapter-4">מוטיבציה</NarrativeLink> הייתה קצרה:
            למדת מה באמת מניע אותנו לקום בבוקר (רמז: זה לא רק כסף), ואיך צדק והוגנות משחקים תפקיד קריטי.
            כשהבנת את היחיד, עברת ל<NarrativeLink href="/courses/organizational-behavior/chapter-5">דינמיקה הקבוצתית</NarrativeLink> -
            המקום שבו קורים הניסים (או האסונות) האמיתיים, ולמדת איך להוביל את כל האופרציה הזו בעזרת <NarrativeLink href="/courses/organizational-behavior/chapter-6">מנהיגות אפקטיבית</NarrativeLink> שמתאימה
            את עצמה למצב.
        </p>
    );

    return (
        <CourseCompletionDashboard
            courseTitle="התנהגות ארגונית"
            stats={stats}
            learnedConcepts={concepts}
            narrative={narrative}
        />
    );
}
