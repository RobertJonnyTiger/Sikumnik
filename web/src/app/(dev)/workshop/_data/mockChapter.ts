import type { ChapterData, QuizQuestion } from "@/types/chapter";

/**
 * Mock chapter data for workshop simulations.
 * Matches ChapterData interface exactly.
 */
export const MOCK_CHAPTER_DATA: ChapterData = {
    id: "math-chapter-01",
    course: "מתמטיקה א'",
    chapterNumber: 1,
    totalChapters: 12,
    title: "אלגברה בסיסית",

    pageMap: {
        learningObjectives: [
            "הבנת נוסחאות כפל מקוצר",
            "פירוק לגורמים",
            "תחום הגדרה של פונקציה",
            "פתרון משוואות ממעלה שנייה",
        ],
        estimatedTime: "45 דקות",
    },

    introduction: {
        content: "בפרק זה נלמד את יסודות האלגברה שישמשו אותנו לאורך כל הקורס.",
        whyItMatters: "אלגברה היא השפה שבה מתמטיקה מדברת.",
        hook: "אי פעם תהיתם למה $x$ תמיד מסמן את הנעלם? זה מגיע ממילה ערבית שמשמעותה 'הדבר'.",
    },

    topics: [
        { id: "topic-1", title: "נוסחאות כפל מקוצר", blocks: [] },
        { id: "topic-2", title: "פירוק לגורמים", blocks: [] },
        { id: "topic-3", title: "תחום הגדרה", blocks: [] },
    ],

    navigation: {
        previous: { href: "/courses/math", title: "דף הקורס" },
        next: { href: "/courses/math/chapter-02", title: "גבולות ורציפות" },
    },

    trivia: [
        { fact: "אל-ח'וואריזמי המציא את האלגברה במאה ה-9.", source: "היסטוריה" },
        { fact: "המילה 'אלגוריתם' נגזרת מהשם של אל-ח'וואריזמי.", source: "אטימולוגיה" },
    ],

    narrativeSummary: {
        summary: "למדנו את היסודות של האלגברה — כלים שישמשו אותנו בכל פרקי הקורס.",
        keyTakeaway: "כל משוואה ממעלה שנייה ניתנת לפתרון בעזרת נוסחת השורשים.",
        tip: { title: "טריק מהיר", content: "תמיד נסו לפרק לגורמים לפני שמשתמשים בנוסחה." },
        pitfall: { title: "טעות נפוצה", content: "אל תשכחו את הפתרון השני כאשר לוקחים שורש ריבועי." },
    },

    checkpoint: [
        {
            id: "q1",
            question: "מה הוא הפירוק של $x^2 - 9$?",
            options: ["$(x-3)(x+3)$", "$(x-9)(x+1)$", "$(x-3)^2$", "לא ניתן לפירוק"],
            correctIndex: 0,
            explanation: "זוהי נוסחת ההפרש בין ריבועים: $a^2 - b^2 = (a-b)(a+b)$.",
        },
        {
            id: "q2",
            question: "מהו תחום ההגדרה של $f(x) = \\frac{1}{x-3}$?",
            options: ["$\\mathbb{R}$", "$\\mathbb{R} \\setminus \\{3\\}$", "$x > 3$", "$x < 3$"],
            correctIndex: 1,
            explanation: "לא ניתן לחלק באפס, לכן $x \\ne 3$.",
        },
    ],
};

/**
 * Tab structure matching ChapterTemplate's tab construction
 */
export const MOCK_TABS = [
    { id: "topic-1", title: "נוסחאות כפל מקוצר" },
    { id: "topic-2", title: "פירוק לגורמים" },
    { id: "topic-3", title: "תחום הגדרה" },
    { id: "wrap-up", title: "סיכום ותרגול" },
];

/**
 * Style DNA entries for shell/renderer components
 */
export const SHELL_STYLE_DNA: Record<string, {
    filePath: string;
    background: string;
    textColor: string;
    fontSize: string;
    fontWeight: string;
    border: string;
    borderRadius: string;
    padding: string;
    direction: string;
    animation: string;
    notes: string;
}> = {
    "ChapterLanding": {
        filePath: "features/core-lessons/renderers/ChapterLanding.tsx",
        background: "bg-background / bg-linear-to-br from-primary/5 to-accent/5 (hook) / bg-card (objectives card)",
        textColor: "text-sky-800 (badges, labels) / text-foreground (title, objectives) / text-muted-foreground (time, subtitle)",
        fontSize: "text-5xl md:text-7xl (title) / text-lg (hook, objectives) / text-sm (badges, labels) / text-xs (CTA subtitle)",
        fontWeight: "font-black (title, labels, CTA) / font-bold (section heads, objectives) / font-medium (body)",
        border: "border-primary/20 (outline badge) / border-primary/10 (hook card) / border-l-4 border-l-primary (whyItMatters) / border-border (objectives card)",
        borderRadius: "rounded-3xl (hook, objectives) / rounded-full (CTA, numbered circles)",
        padding: "py-12 px-4 (outer) / p-6 (hook) / p-8 (objectives) / px-8 py-4 (CTA)",
        direction: "inherits RTL from parent",
        animation: "Framer Motion staggerChildren=0.1 / item: y:20→0, opacity:0→1",
        notes: "Full viewport centered layout (min-h-[80vh]). 2-column grid on md+. Gradient clip text on title. CTA: bg-primary shadow-lg hover:scale-105."
    },
    "ChapterProgressionBar": {
        filePath: "features/core-lessons/renderers/ChapterProgressionBar.tsx",
        background: "bg-background/80 backdrop-blur-2xl (dock) / bg-primary (active) / bg-secondary (completed) / bg-muted (inactive)",
        textColor: "text-primary-foreground (active) / text-secondary-foreground (completed) / text-muted-foreground (inactive)",
        fontSize: "text-xs (step numbers)",
        fontWeight: "font-black (active) / font-medium (inactive)",
        border: "border border-primary/20 (dock) / ring-2 ring-primary/30 (active) / border border-border/50 (inactive)",
        borderRadius: "rounded-full (dock + items)",
        padding: "p-2.5 (dock) / w-10 h-10 (items)",
        direction: "LTR fixed (centered bottom)",
        animation: "Framer Motion: y:100→0, opacity:0→1 / layoutId='dock-glow' (active glow)",
        notes: "Fixed bottom-8 center dock. Intro step (index=-1) shows 'i'. Tooltip on hover. Check icon for completed. Shadow glow on active."
    },
    "CourseBreadcrumb": {
        filePath: "features/core-lessons/renderers/CourseBreadcrumb.tsx",
        background: "glass (CSS class) / bg-background/50 (progress counter) / bg-primary/5 (active tab badge)",
        textColor: "text-muted-foreground (crumbs) / text-foreground (chevrons, on hover) / text-primary (current tab, progress number)",
        fontSize: "text-xs (all) / text-[10px] (PROGRESS label) / text-sm (progress number)",
        fontWeight: "font-medium (crumbs) / font-bold (current tab, progress number) / font-black (PROGRESS label)",
        border: "border-b (outer sticky) / border-border/50 (progress counter bg, divider) / border-primary/10 (tab badge)",
        borderRadius: "rounded-md (tab badge) / rounded-lg (progress counter)",
        padding: "h-12 px-4 (outer) / px-2 py-0.5 (tab badge) / px-2 py-1 (progress counter)",
        direction: "inherits RTL",
        animation: "none (static)",
        notes: "Sticky top-0 z-30 glass bar. Chevron separators between crumbs. Progress counter hidden on mobile (sm:flex). Horizontal overflow with no-scrollbar + mask-gradient-x."
    },
    "LessonFooter": {
        filePath: "features/core-lessons/renderers/LessonFooter.tsx",
        background: "bg-card (prev btn hover) / bg-primary (next btn) / bg-secondary/50 (prev arrow bg) / bg-white/20 (next arrow bg)",
        textColor: "text-muted-foreground (prev) / text-primary-foreground (next) / text-foreground (hover states)",
        fontSize: "text-[10px] (labels) / text-sm (prev title) / text-lg (next title)",
        fontWeight: "font-bold (prev label, title) / font-black (next label, title)",
        border: "border-t border-border/50 (section top) / border-border/50 (prev btn) / none (next btn)",
        borderRadius: "rounded-2xl (prev) / rounded-3xl (next) / rounded-full (arrow bgs)",
        padding: "mt-20 mb-32 px-6 pt-12 (section) / px-6 py-4 (prev) / px-8 py-5 (next) / mb-12 (trivia)",
        direction: "inherits RTL (ArrowRight=prev in RTL, ArrowLeft=next)",
        animation: "CSS shimmer on next button hover (bg-linear-to-r animate-shimmer)",
        notes: "Includes DidYouKnow trivia block above nav buttons. Prev disabled on first tab. Next shows 'סיום הפרק' on last tab. isLastTab renders CheckCircle icon."
    },
    "NarrativeSummary": {
        filePath: "features/core-lessons/blocks/NarrativeSummary.tsx",
        background: "bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 (main) / bg-white/80 (takeaway) / bg-amber-100 (tip icon) / bg-rose-100 (pitfall icon)",
        textColor: "text-foreground/90 (summary) / text-primary (takeaway label) / text-amber-700 (tip) / text-rose-700 (pitfall)",
        fontSize: "text-3xl md:text-4xl (heading) / text-xl md:text-2xl (summary) / text-sm (labels) / text-lg (tip/pitfall body)",
        fontWeight: "font-black (heading, labels) / font-bold (takeaway, body) / font-medium (summary)",
        border: "border-none (main) / border-2 border-primary/20 (takeaway) / border-2 border-amber-200/50 (tip) / border-2 border-rose-200/50 (pitfall)",
        borderRadius: "rounded-3xl (cards) / rounded-2xl (icon, takeaway)",
        padding: "p-10 md:p-14 (main) / px-8 py-6 (takeaway) / p-8 (tip/pitfall)",
        direction: "inherits RTL",
        animation: "none (static) / Framer Motion used for Card",
        notes: "Full-page section with blur backgrounds. Tip/Pitfall cards in 2-col grid. Optional next-chapter CTA link."
    },
    "CheckpointQuiz": {
        filePath: "features/core-lessons/blocks/CheckpointQuiz.tsx",
        background: "bg-white (card) / bg-slate-50 (header) / bg-emerald-50 (correct) / bg-red-50 (wrong)",
        textColor: "text-slate-700 (header) / text-emerald-800 (correct) / text-red-800 (wrong)",
        fontSize: "text-sm (title, badges) / text-foreground (options)",
        fontWeight: "font-black (title) / font-bold (submit) / font-medium (question)",
        border: "border-slate-200 (card) / border-emerald-300 (correct) / border-red-300 (wrong) / ring-2 ring-slate-200 (selected)",
        borderRadius: "rounded-2xl (outer) / rounded-xl (items, feedback)",
        padding: "px-6 py-4 (header) / p-6 (body) / px-4 py-3 (options)",
        direction: "dir=\"rtl\" explicit",
        animation: "Framer Motion AnimatePresence for feedback panel",
        notes: "⚠️ Uses hardcoded bg-white/slate colors—not theme tokens."
    },
};
