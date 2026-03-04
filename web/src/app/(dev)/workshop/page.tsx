"use client";

import React, { useState } from "react";
import { BlockRenderer } from "@/features/core-lessons/renderers/BlockRenderer";
import type { ContentBlock } from "@/types/chapter";
import { Badge } from "@/components/ui/badge";

// ═══════════════════════════════════════════════════════════════════
// STYLE DNA — Extracted Tailwind classes from each component source
// ═══════════════════════════════════════════════════════════════════

interface StyleInfo {
  filePath: string;
  background: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  border: string;
  borderRadius: string;
  padding: string;
  direction: string;
  mathRendering: string;
  notes: string;
}

const STYLE_DNA: Record<string, StyleInfo> = {
  "text": {
    filePath: "features/core-lessons/blocks/TextBlock.tsx",
    background: "transparent (formal) / bg-primary/5 (street narrator)",
    textColor: "text-foreground (formal) / text-foreground/80 (street)",
    fontSize: "text-base (formal) / text-sm (street)",
    fontWeight: "font-normal (implicit)",
    border: "border-r-4 border-primary (street narrator only)",
    borderRadius: "rounded-l-xl (street narrator only)",
    padding: "space-y-4 my-4 / pr-4 py-3 px-4 (street)",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Dual-voice: formalText (academic) + streetNarrator (casual italic)"
  },
  "definition": {
    filePath: "features/core-lessons/blocks/Definition.tsx",
    background: "bg-primary/5 (academic header) / academic-card (simple)",
    textColor: "text-primary (header) / text-foreground/90 (body) / text-muted-foreground (source)",
    fontSize: "text-2xl (academic term) / text-xl (academic body) / text-lg (simple term)",
    fontWeight: "font-bold / font-medium",
    border: "border-2 border-primary/20 (academic) / border-r-4 border-r-primary (simple)",
    borderRadius: "academic-card (via CSS class) / rounded-lg (icon bg)",
    padding: "p-5 / p-6 / my-8 / my-6",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Two variants: 'academic' (full card with Quote watermark) and 'simple' (border-right accent)"
  },
  "explanation": {
    filePath: "features/core-lessons/blocks/Explanation.tsx",
    background: "transparent (body) / academic-card bg-primary/5 (highlight)",
    textColor: "text-primary (highlight) / inherits (body)",
    fontSize: "text-lg (body) / text-sm (highlight)",
    fontWeight: "font-bold italic (highlight)",
    border: "border-r-4 border-r-primary (highlight)",
    borderRadius: "academic-card (via CSS class)",
    padding: "py-6 / mb-6",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Optional highlight callout with primary accent border. Body is plain text-lg."
  },
  "worked-example": {
    filePath: "features/core-lessons/blocks/WorkedExample.tsx",
    background: "academic-card / bg-muted (calculation) / bg-success/10 (answer)",
    textColor: "text-success (title, calc lines) / text-foreground (body)",
    fontSize: "text-sm (title uppercase) / text-lg (body, solution) / text-xl (calc mono)",
    fontWeight: "font-black (title) / font-bold (reveal btn)",
    border: "border-success/20 (card) / border-t border-success/10 (sections)",
    borderRadius: "academic-card p-0 overflow-hidden",
    padding: "p-6 / px-6 py-5 (calc) / px-6 pb-6 pt-2 (solution)",
    direction: "inherits RTL",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Collapsible solution with toggle. Calculator icon. Mono font for calculation lines."
  },
  "guided-exercise": {
    filePath: "features/core-lessons/blocks/GuidedExercise.tsx",
    background: "academic-card / bg-muted (thinking) / bg-primary/5 (step action) / bg-success/10 (final)",
    textColor: "text-primary (header, step nums) / text-success (final answer) / text-foreground",
    fontSize: "text-sm (labels) / text-xl (question) / text-lg (steps) / text-2xl (final)",
    fontWeight: "font-black (labels, final) / font-bold (question, steps)",
    border: "border-primary/20 (icon) / border-r-4 border-primary (thinking) / border-border/60 (steps) / border-2 border-success/30 (final)",
    borderRadius: "rounded-lg / rounded-l-lg / rounded-xl / rounded-2xl",
    padding: "p-6 pb-4 / px-5 py-3 / my-10",
    direction: "dir=\"rtl\" explicit / dir=\"ltr\" for calc blocks",
    mathRendering: "KaTeX via LessonMarkdown + direct imports",
    notes: "Complex interactive: difficulty badge, phases (I-do/We-do/You-do), collapsible steps with AnimatePresence, final answer reveal."
  },
  "checkpoint-quiz": {
    filePath: "features/core-lessons/blocks/CheckpointQuiz.tsx",
    background: "bg-white (card) / bg-slate-50 (header) / bg-emerald-50 (correct) / bg-red-50 (wrong)",
    textColor: "text-slate-700 (header) / text-emerald-800 (correct) / text-red-800 (wrong)",
    fontSize: "text-sm (title, badges) / text-foreground (options)",
    fontWeight: "font-black (title) / font-bold (submit btn) / font-medium (question)",
    border: "border-slate-200 (card, header) / border-emerald-300 (correct) / border-red-300 (wrong) / ring-2 ring-slate-200 (selected)",
    borderRadius: "rounded-2xl (outer) / rounded-xl (questions, options, feedback)",
    padding: "px-6 py-4 (header) / p-6 (body) / px-4 py-3 (options)",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via ReactMarkdown + remarkMath + rehypeKatex (direct)",
    notes: "⚠️ Uses hardcoded bg-white/slate colors instead of theme tokens. Uses Framer Motion AnimatePresence for feedback."
  },
  "formula": {
    filePath: "features/core-lessons/blocks/FormulaCard.tsx",
    background: "linear-gradient(160deg, #12101e, #0e0c1a) (inline style) / rgba(168,140,255,0.07) (formula box)",
    textColor: "text-[#d4c8ff] (title) / text-[#e8e0ff] (formula) / text-[#7c6aaa] (badge, desc)",
    fontSize: "text-base (title) / text-2xl (formula) / text-[0.62rem] (badge) / text-[0.85rem] (desc)",
    fontWeight: "font-bold (title, formula, var symbol) / font-medium (desc)",
    border: "1px solid rgba(168,140,255,0.2) (inline) / border-[rgba(168,140,255,0.1)] (sections)",
    borderRadius: "rounded-[20px] (outer) / rounded-xl (formula box) / rounded-lg (var chips)",
    padding: "px-7 py-[1.2rem] (header) / px-7 pt-7 pb-3 (formula) / px-7 pb-6 pt-4 (vars)",
    direction: "dir=\"rtl\" outer / dir=\"ltr\" formula + var symbols",
    mathRendering: "BlockMath from react-katex (direct)",
    notes: "Dark-themed card with purple gradient. Color-coded variable chips (6 colors). Hover glow via inline styles. Uses LessonMarkdown for description."
  },
  "formula-card": {
    filePath: "features/core-lessons/blocks/FormulaCard.tsx",
    background: "Same as 'formula' — uses FormulaCard component",
    textColor: "Same as 'formula'",
    fontSize: "Same as 'formula'",
    fontWeight: "Same as 'formula'",
    border: "Same as 'formula'",
    borderRadius: "Same as 'formula'",
    padding: "Same as 'formula'",
    direction: "dir=\"rtl\" outer / dir=\"ltr\" formula",
    mathRendering: "BlockMath from react-katex (direct)",
    notes: "Alias for FormulaCard — BlockRenderer maps formula-card → FormulaCard. Same component as 'formula'."
  },
  "hero-formula": {
    filePath: "features/math/components/HeroFormula.tsx",
    background: "linear-gradient(145deg, #0e1628, #0b1220, #0d1530) (inline) / rgba(10,20,50,0.5) (formula box) / #0e1628 (narrator strip)",
    textColor: "text-[#e8f0ff] (title) / text-[#7eb8ff] (badge, toggle) / text-[#c8d8ff] (formula) / text-[#c4b5fd] (narrator) / text-[#6b8fc7] (subtitle)",
    fontSize: "text-3xl (title) / text-2xl md:text-4xl (formula) / text-[0.65rem] (badge) / text-sm (toggle, subtitle) / text-base (narrator)",
    fontWeight: "font-bold (title, formula) / font-semibold (badge, narrator label) / font-normal (narrator body, subtitle)",
    border: "border-[rgba(99,140,255,0.25)] (outer) / border-[rgba(99,140,255,0.2)] (formula box) / border-[rgba(129,140,248,0.6)] (narrator border-r)",
    borderRadius: "rounded-[20px] (outer) / rounded-[14px] (formula box) / rounded-[20px] (badge) / rounded-lg (toggle)",
    padding: "px-8 py-6 pb-5 (header) / py-10 px-8 (formula) / px-8 py-6 (narrator) / my-12",
    direction: "dir=\"rtl\" outer / dir=\"ltr\" formula box",
    mathRendering: "BlockMath from react-katex + renderMathText utility",
    notes: "Premium dark-blue hero card. Math watermark symbols background. Animated narrator toggle with Framer Motion. Hover glow shadows."
  },
  "reference-table": {
    filePath: "features/math/components/ReferenceTable.tsx",
    background: "bg-white dark:bg-gray-950 (card) / bg-gray-50 dark:bg-gray-900/50 (header) / bg-blue-50/50 (general form) / bg-amber-50/50 (numeric)",
    textColor: "text-gray-900 dark:text-gray-100 (header, rule) / text-gray-600 dark:text-gray-300 (table body) / text-indigo-700 dark:text-indigo-400 (street)",
    fontSize: "text-lg (header title, table cells) / text-sm (subtitle, header) / text-base (street explanation)",
    fontWeight: "font-semibold (header, thead) / font-medium (rule name cell)",
    border: "border-gray-200 dark:border-gray-800 (card, dividers) / border-indigo-400 (street explanation border-r-2)",
    borderRadius: "rounded-xl (outer card)",
    padding: "px-6 py-4 (header) / px-6 py-5 (cells) / my-10",
    direction: "dir=\"rtl\" outer / dir=\"ltr\" math cells",
    mathRendering: "InlineMath from react-katex + renderMathText utility",
    notes: "Full table layout with 4 columns. Dark mode support via gray-* tokens. Uses hardcoded gray/blue/amber/indigo instead of theme tokens."
  },
  "alert": {
    filePath: "features/core-lessons/blocks/Alert.tsx",
    background: "bg-secondary/5 (tip) / bg-warning/5 (warning) / bg-muted (prerequisite) / bg-destructive/5 (error) / bg-success/5 (success)",
    textColor: "text-secondary (tip icon+title) / text-warning (warning icon) / text-warning-foreground (warning title) / text-destructive (error) / text-success (success) / text-slate-800 (body)",
    fontSize: "text-lg (title) / text-base (body)",
    fontWeight: "font-bold (title uppercase) / font-medium (body)",
    border: "border-2 border-{variant}/30 (outer) — variant-specific color",
    borderRadius: "rounded-xl",
    padding: "p-5 my-6",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown (when children is string)",
    notes: "5 variants via VARIANTS map (tip/warning/prerequisite/error/success). Hover: shadow-lg, -translate-y-1, variant shadow."
  },
  "callout": {
    filePath: "features/core-lessons/blocks/Callout.tsx",
    background: "Delegates to Alert component (info→tip, warning→warning, tip→tip)",
    textColor: "Inherits from Alert",
    fontSize: "Inherits from Alert",
    fontWeight: "Inherits from Alert",
    border: "Inherits from Alert",
    borderRadius: "Inherits from Alert",
    padding: "Inherits from Alert",
    direction: "Inherits RTL from Alert",
    mathRendering: "KaTeX via LessonMarkdown wrapped in Alert",
    notes: "Thin wrapper around Alert. Maps 'info'→'tip', 'warning'→'warning', 'tip'→'tip' variants."
  },
  "common-mistake": {
    filePath: "features/core-lessons/blocks/CommonMistake.tsx",
    background: "bg-error/5",
    textColor: "text-error (title) / text-foreground (body) / text-success (correction label)",
    fontSize: "text-sm (all content) / text-xs (correction label)",
    fontWeight: "font-black (title) / font-bold (correction label)",
    border: "border-2 border-error/40 (outer) / border-t border-error/20 (divider)",
    borderRadius: "rounded-xl",
    padding: "p-4 my-4 space-y-2 / pt-2 mt-2 (correction)",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Two sections: mistake (error theme) + correction (success label). Compact card."
  },
  "exam-tip": {
    filePath: "features/core-lessons/blocks/ExamTip.tsx",
    background: "bg-warning/10",
    textColor: "text-warning-foreground (title) / text-foreground (body) / text-muted-foreground (source)",
    fontSize: "text-sm (all) / text-xs (source)",
    fontWeight: "font-black (title) / font-normal (source)",
    border: "border-2 border-warning",
    borderRadius: "rounded-xl",
    padding: "p-4 my-4 space-y-1",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Compact warning-themed card with 🎯 emoji. Optional source attribution."
  },
  "hook": {
    filePath: "features/core-lessons/blocks/Hook.tsx",
    background: "bg-linear-to-br from-violet-600 to-indigo-600 (gradient)",
    textColor: "text-white (all) / text-violet-100 (label) / text-violet-50 (context)",
    fontSize: "text-3xl md:text-4xl (question/opener) / text-xl (opener with question) / text-sm (label)",
    fontWeight: "font-black (question, label) / font-medium (opener, context)",
    border: "border border-white/30 (icon bg) / border-white/20 (context card)",
    borderRadius: "rounded-3xl (outer) / rounded-2xl (icon, context card)",
    padding: "p-8 md:p-10 my-8 / p-3 (icon) / p-5 (context)",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Full-bleed violet→indigo gradient. Giant Lightbulb watermark. Hover: shadow-xl, -translate-y-1."
  },
  "analogy": {
    filePath: "features/core-lessons/blocks/Analogy.tsx",
    background: "street-callout (CSS class) / bg-secondary (icon bg)",
    textColor: "text-secondary-foreground (icon) / text-secondary/80 (title) / narrator-voice (CSS class, body)",
    fontSize: "text-sm (title)",
    fontWeight: "font-black (title)",
    border: "none explicit (via street-callout class)",
    borderRadius: "rounded-2xl (icon bg)",
    padding: "p-3 (icon bg)",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "ReactMarkdown + rehypeRaw (no KaTeX)",
    notes: "Uses CSS classes 'street-callout' and 'narrator-voice' for styling. Group hover scales icon."
  },
  "topic-summary": {
    filePath: "features/core-lessons/blocks/TopicSummary.tsx",
    background: "bg-gradient-to-br from-primary/5 to-primary/10 / bg-primary/10 (icon, checkmarks)",
    textColor: "text-sky-800 (icon, title, checkmarks) / text-foreground (body, keypoints)",
    fontSize: "text-sm (title, keypoints) / inherits (body)",
    fontWeight: "font-black (title)",
    border: "border border-primary/20",
    borderRadius: "rounded-2xl (outer) / rounded-lg (icon bg) / rounded-full (checkmark bg)",
    padding: "p-6 my-6 / p-2 (icon)",
    direction: "inherits RTL",
    mathRendering: "ReactMarkdown + rehypeRaw (no KaTeX)",
    notes: "Gradient card with primary accent. Key points rendered as checklist with circular check icons. Hover lift effect."
  },
  "street-smart": {
    filePath: "features/core-lessons/blocks/StreetSmartSketch.tsx",
    background: "bg-white / bg-yellow-400 (icon circle) / bg-yellow-300 (title highlight)",
    textColor: "text-slate-900 (icon) / text-slate-800 (content) / text-slate-400 (toggle)",
    fontSize: "text-xl (title) / inherits (body)",
    fontWeight: "font-black (title) / font-bold (content)",
    border: "border-2 border-slate-800 (outer) / border-b-2 border-slate-800 (title) / border-r-4 border-yellow-300 (content)",
    borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px (hand-drawn via inline style)",
    padding: "p-6 my-8 / pr-4 (content)",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "KaTeX via LessonMarkdown",
    notes: "Unique hand-drawn border style. Retro sketch aesthetic with shadow-[8px_8px_0px] brutal shadow. Yellow accent theme. Collapsible."
  },
  "deep-dive": {
    filePath: "features/core-lessons/blocks/DeepDive.tsx",
    background: "bg-slate-50 (outer) / bg-white (sections) / bg-red-50 (open icon) / bg-slate-100 (closed icon, tags)",
    textColor: "text-red-600 (icon, difficulty badge accent) / text-red-700 (open section title) / text-slate-800 (title) / text-slate-700 (closed title) / text-slate-600 (body)",
    fontSize: "text-lg (title) / text-xs (difficulty badge) / text-sm (section body) / text-base (section title) / text-[10px] (examples label)",
    fontWeight: "font-bold (title, section title) / font-black (difficulty badge) / font-medium (example chips)",
    border: "border-r-4 border-r-red-600 (left accent) / border-y border-l border-slate-200 (outer) / border-red-200 (open) / border-slate-200 (closed, tags)",
    borderRadius: "rounded-xl (outer) / rounded-lg (sections) / rounded-md (icon, tags)",
    padding: "p-5 (header) / px-5 pb-5 (sections) / p-4 (section content) / px-2.5 py-1 (badge)",
    direction: "dir=\"rtl\" explicit",
    mathRendering: "ReactMarkdown + rehypeRaw (no KaTeX)",
    notes: "Accordion sections with red accent. Zap icon. Difficulty badge (advanced/graduate). Example tags as chips."
  },
  "list": {
    filePath: "features/core-lessons/blocks/List.tsx",
    background: "transparent",
    textColor: "inherits (via markdown-content class)",
    fontSize: "inherits",
    fontWeight: "inherits",
    border: "none",
    borderRadius: "none",
    padding: "my-4 space-y-2",
    direction: "inherits RTL",
    mathRendering: "ReactMarkdown + rehypeRaw (no KaTeX)",
    notes: "Minimal list wrapper. Hover lift on entire group. Uses markdown-content class for item styling."
  },
  "example": {
    filePath: "features/core-lessons/blocks/WorkedExample.tsx",
    background: "Same as 'worked-example' — maps to WorkedExample component",
    textColor: "Same as 'worked-example'",
    fontSize: "Same as 'worked-example'",
    fontWeight: "Same as 'worked-example'",
    border: "Same as 'worked-example'",
    borderRadius: "Same as 'worked-example'",
    padding: "Same as 'worked-example'",
    direction: "Same as 'worked-example'",
    mathRendering: "Same as 'worked-example'",
    notes: "Alias for WorkedExample — BlockRenderer maps 'example' → WorkedExample"
  },
  "checkpoint-quiz-alias": {
    filePath: "features/core-lessons/blocks/CheckpointQuiz.tsx",
    background: "Same as 'checkpoint-quiz'",
    textColor: "Same as 'checkpoint-quiz'",
    fontSize: "Same as 'checkpoint-quiz'",
    fontWeight: "Same as 'checkpoint-quiz'",
    border: "Same as 'checkpoint-quiz'",
    borderRadius: "Same as 'checkpoint-quiz'",
    padding: "Same as 'checkpoint-quiz'",
    direction: "Same as 'checkpoint-quiz'",
    mathRendering: "Same as 'checkpoint-quiz'",
    notes: "The 'checkpoint' type maps to the same CheckpointQuiz component."
  },
  "narrative-summary": {
    filePath: "features/core-lessons/blocks/NarrativeSummary.tsx",
    background: "bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 (main) / bg-white/80 (takeaway) / bg-amber-100 (tip icon) / bg-rose-100 (pitfall icon) / bg-primary/5 (badge bg)",
    textColor: "text-foreground/90 (summary) / text-primary (takeaway label) / text-amber-700 (tip title) / text-rose-700 (pitfall title)",
    fontSize: "text-3xl md:text-4xl (heading) / text-xl md:text-2xl (summary) / text-sm (labels) / text-lg (tip/pitfall body) / text-2xl md:text-3xl (next chapter)",
    fontWeight: "font-black (heading, labels, next chapter) / font-bold (tip/pitfall body, takeaway)",
    border: "border-none (main) / border-2 border-primary/20 (takeaway) / border-2 border-amber-200/50 (tip) / border-2 border-rose-200/50 (pitfall)",
    borderRadius: "rounded-3xl (cards) / rounded-2xl (icon bg, takeaway, context card)",
    padding: "p-10 md:p-14 (main) / px-8 py-6 (takeaway) / p-8 (tip/pitfall)",
    direction: "inherits RTL",
    mathRendering: "None (plain text)",
    notes: "Full-page section with blur backgrounds. Tip/Pitfall cards in 2-col grid. Optional next-chapter CTA link."
  },
  "did-you-know": {
    filePath: "features/core-lessons/blocks/DidYouKnow.tsx",
    background: "bg-secondary (collapsed btn) / bg-popover/90 backdrop-blur-xl (expanded)",
    textColor: "text-foreground (btn, fact) / text-sky-800 (icon, label) / text-accent (category) / text-muted-foreground (sub-label)",
    fontSize: "text-sm (btn) / text-[10px] (label) / text-xs (sub-label) / text-lg md:text-xl (fact)",
    fontWeight: "font-bold (btn, category, fact) / font-black (label)",
    border: "border border-primary/30 (collapsed) / border border-secondary (expanded)",
    borderRadius: "rounded-full (collapsed) / rounded-2xl (expanded) / rounded-xl (icon bg)",
    padding: "px-6 py-3 (collapsed) / p-6 md:p-8 (expanded body) / p-2.5 (icon bg)",
    direction: "inherits RTL",
    mathRendering: "None (plain text)",
    notes: "Two-state component: collapsed pulse button ↔ expanded card. IntersectionObserver for entry animation. Category-based icon mapping. Click to cycle facts."
  },
  "real-world-example": {
    filePath: "— rendered inline by BlockRenderer (no dedicated file)",
    background: "inherits from BlockRenderer fallback",
    textColor: "inherits",
    fontSize: "inherits",
    fontWeight: "inherits",
    border: "inherits",
    borderRadius: "inherits",
    padding: "inherits",
    direction: "inherits RTL",
    mathRendering: "None",
    notes: "⚠️ No dedicated component file. Rendered inline by BlockRenderer as a fallback card."
  },
};

// ═══════════════════════════════════════════════════════════════════
// CATEGORY DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

interface CategoryGroup {
  id: string;
  label: string;
  emoji: string;
  color: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  blocks: ContentBlock[];
}

const CATEGORIES: CategoryGroup[] = [
  {
    id: "content",
    label: "Content Blocks",
    emoji: "📄",
    color: "blue",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    accentText: "text-blue-400",
    blocks: [
      { type: "text", formalText: "זהו טקסט פורמלי ארוך עם נוסחאות משובצות. למשל, המשוואה הדיפרנציאלית $\\frac{d^2y}{dx^2} + \\omega^2y = 0$ מתארת מתנד הרמוני.", streetNarrator: "קריינות רחוב: בת'כלס, זה רק אומר שאם תדחוף משהו חזק מדי, הוא יחזור אליכם וינדנד קדימה אחורה." },
      { type: "definition", term: "אנטרופיה ($S$)", content: "מדד לאי-סדר במערכת סגורה. על פי החוק השני של התרמודינמיקה, האנטרופיה תמיד תגדל עם הזמן: $\\Delta S \\ge 0$ מתארת את חץ הזמן מאי-סדר קטן לגדול." },
      { type: "explanation", content: "בלוק הסבר מעמיק בנושא תורת הקוואנטים. משוואת שרדינגר היא $i\\hbar\\frac{\\partial}{\\partial t}\\Psi(\\mathbf{r},t) = \\hat{H}\\Psi(\\mathbf{r},t)$. אל תבהלו מהסמלים, זה רק מפלצת מתמטית שפותרת לנו הכל.", highlight: "עיקרון אי הודאות של הייזנברג $\\Delta x \\Delta p \\ge \\frac{\\hbar}{2}$" },
      { type: "topic-summary", content: "לסיכום, מה שלמדנו היום יהפוך כל משוער דיפרנציאלי למושג שתוכלו ליישם בחיי היומיום.", keyPoints: ["זיהינו את סוג המשוואה מסדר שני", "בחרנו פונקציית מבחן מתאימה $y=e^{rx}$", "זיהינו גורמי מעטפת ושחיקה לפי $c/2m$"] },
      { type: "list", items: ["ניסוח המשוואה הקאנונית", "בידוד הנעלם והצבת מערכת המשוואות בטריצת הליבה", "פתרון במודל מטריצי של גאוס-ז'ורדן לחילוץ משתנים תלויים"] },
    ]
  },
  {
    id: "practice",
    label: "Practice Blocks",
    emoji: "🏋️",
    color: "green",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    accentText: "text-emerald-400",
    blocks: [
      { type: "worked-example", title: "שטח כלוא", scenario: "מצא את השטח הכלוא בין הפרבולה $y = x^2$ והישר $y = x + 2$.", solution: "השטח הוא האינטגרל של ההפרש בין הפונקציה העליונה לתחתונה: $A = \\int_{-1}^{2} (x+2 - x^2) dx$.", calculation: "\\left[ \\frac{x^2}{2} + 2x - \\frac{x^3}{3} \\right]_{-1}^{2} = 4.5" },
      { type: "guided-exercise", difficulty: 5, question: "חשב את האינטגרל של פונקציית צפיפות ההסתברות של התפלגות נורמלית סטנדרטית: $\\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} e^{-x^2/2} dx$", thinkingDirection: "נסה את תעלול פואסון: כפל את האינטגרל בעצמו ועבור לקואורדינטות קוטביות (פולאריות).", steps: [{ title: "העלאה בריבוע והכפלה", action: "נכתוב את האינטגרל פעמיים במשתנים שונים: $I^2 = \\int e^{-x^2} dx \\cdot \\int e^{-y^2} dy$", reasoning: "זה מאפשר לנו לאחד את האינטגרל לאינטגרל כפול מעל כל המישור.", calculation: "I^2 = \\iint e^{-(x^2+y^2)} dx dy", result: "הכנו את הקרקע לקואורדינטות הפולריות." }], finalAnswer: "1.0", phases: [{ type: "we-do", content: "נחשב את האנטגרל בעזרת הקואורדינטות הפולריות $r^2 = x^2+y^2$ ו- $dx dy = r dr d\\theta$." }] },
      { type: "example", title: "דוגמה לחוק השני של ניוטון", scenario: "רכב מסה $1000\\text{ kg}$ מאיץ בקצב של $5\\text{ m/s}^2$.", solution: "נשתמש בחוק השני $F=ma$. נציב את הערכים: $F = 1000 \\cdot 5$.", calculation: "F = 5000\\text{ Newtons}" },
      {
        type: "checkpoint-quiz", questions: [
          { id: "test-q1", question: "מהי המשמעות המעשית של דיסקרימיננטה שלילית במשוואה דיפרנציאלית הומוגנית רגילה?", options: ["הפתרון חייב להיות שווה לאפס", "הפתרון יכלול תנודות הרמוניות עם פונקציות טריגונומטריות", "אין פתרון כלל מסדר שני"], correctIndex: 1, explanation: "כאשר השורש הופך לשלילי הוא מייצר מהירות זוויתית במישור הקומפלקסי ולכן פונקציית הפתרון היא במונחי סינוס וקוסינוס." }
        ]
      },
    ]
  },
  {
    id: "math",
    label: "Math / Specialized",
    emoji: "🧮",
    color: "purple",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30",
    accentText: "text-purple-400",
    blocks: [
      { type: "formula", title: "נוסחת בלמייסטר-שרייבר", formula: "E = \\sum_{i=1}^{n} \\sqrt{\\frac{x_i^2 + y_i^2}{z_i^2}}", variables: [{ symbol: "$E$", name: "אנרגיה כללית", desc: "ג'אול" }, { symbol: "$x_i, y_i, z_i$", name: "ווקטור המרחב", desc: "קואורדינטות פולאריות" }] },
      { type: "hero-formula", title: "משוואת פיינמן", formula: "\\int \\mathcal{D}x \\, e^{\\frac{iS[x]}{\\hbar}}", subtitle: "ניסוח אינטגרלי מסלול למכניקת הקוונטים", streetNarrator: "פיינמן פשוט אמר: החלקיק עובר בכל המסלולים האפשריים בו זמנית! ואז מחברים הכל. מטורף!" },
      { type: "formula-card", title: "משוואת האון", formula: "P = \\frac{W}{t} = F \\cdot v", description: "הספק מייצג כמה מהר עבודה מתבצעת לאורך זמן." },
      {
        type: "reference-table", tableCategory: "כללי הלופ של קירכהוף", rows: [
          { ruleName: "חוק הצמתים", generalForm: "$\\sum I_{in} = \\sum I_{out}$", numericExample: "זורם פנימה 5A ויוצא למספר קווי חשמל. סך היציאות 5A.", streetExplanation: "כמו לזרום במים בצינור, מה שנכנס זה מה שיוצא." },
          { ruleName: "חוק הלולאות", generalForm: "$\\sum \\Delta V = 0$", numericExample: "מעגל סגור. $+12V - 5V - 7V = 0$.", streetExplanation: "ברכבת הרים - אתה עולה עד לראש בגובה אבל תמיד חזור בתוך הלופ מתישהו לנקודת ההתחלה." }
        ]
      },
      { type: "street-smart", content: "חבר'ה, קחו ללב את העצה הזו: במבחן בחדו\"א אף אחד לא בודק אם הייתם גאונים בטריקים באלגברה. העיקר למצוא את האינטגרל המיידי. תזרקו את כל ה- 'dx' בצד ותתחילו להציב $u$. שאר העבודה עושה את עצמה.", title: "טריפל קליק אינטגרציה" },
    ]
  },
  {
    id: "tips",
    label: "Tips & Warnings",
    emoji: "⚠️",
    color: "yellow",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    accentText: "text-amber-400",
    blocks: [
      { type: "alert", variant: "warning", title: "אזהרת חלוקה באפס", content: "לעולם, אבל לעולם, אין לחלק בספר חסר משמעות או לבצע פעולה השואפת ל- $1/0$. התוצאה אינה מוגדרת והיא אסורה בתכלית." },
      { type: "alert", variant: "tip", title: "טריק הכשל המהיר", content: "אם הביטוי במעלה שנייה $ax^2 + bx + c$ נראה מאיים מדי, הפעילו מיד נוסחת שורשים $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$." },
      { type: "alert", variant: "prerequisite", title: "דרישות קדם", content: "לפני שנצלול אל נגזרות, זכור לחזור על אלגברה אקספוננציאלית ולוגריתמים מפרק 2." },
      { type: "callout", variant: "info", title: "הידעת? מושגי מפתח בגאומטריה", content: "היחס של צלע משולש לחלק שממולו ידוע כחוק הסינוסים $\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)}$. זו הדרך המהירה ביותר לפתור משולש לא ישר זווית." },
      { type: "common-mistake", mistake: "שוכחים את מינוס באגף שמאל בעת העברת אגפים ממשוואה מעריכית ללוגריתמית. למשל: $\\ln(1/x) = \\ln(x)$ במקום $\\ln(1/x) = -\\ln(x)$.", correction: "כאשר מעבירים נעלם שהיה במכנה החלק מהבסיס של השבר בתוך הלוג, הוא יוצא החוצה במינוס לפני פונקציית הלוג." },
      { type: "exam-tip", content: "בבחינת הבגרות בפיסיקה, רוב הניקוד על הגדרת משוואות מיוחס אך ורק לשרטוט התרשים. קודם שרטטו את כל הכוחות הפועלים ורק אז תכתבו חוק שני של ניוטון עבור שאר הכוחות.", source: "טיפ למבחן" },
    ]
  },
  {
    id: "engagement",
    label: "Engagement",
    emoji: "🎣",
    color: "orange",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/30",
    accentText: "text-orange-400",
    blocks: [
      { type: "hook", opener: "אי פעם חשבתם מה קורה כאשר אנחנו מנסים למדוד את המסלול המדויק של חלקיק שעובר בחלל תלת ממדי?", question: "מה ההבדל בין מהירות לווקטור התאוצה?", context: "החלקיקים הקטנים ביותר בפיזיקה לא מצייתים לחוקים של רכבים בכביש, וכאן זה נהיה מרתק." },
      { type: "analogy", content: "חשבו על תורת היחסות כמו על טרמפולינה ענקית. אם תניחו כדור באולינג במרכז (שמש), הטרמפולינה תתעקם, ואם תזרקו גולה (כדור הארץ) היא תסתובב סביבו בגלל העיקום. זהו העיקום של מרחב-זמן בגלל מסה $E=mc^2$.", icon: "🌌" },
      { type: "deep-dive", title: "צלילה עמוקה: הפונקציה הלוגריתמית", sections: [{ title: "מדוע דווקא הלאן?", content: "גזירת הפונקציה הלוגריתמית מניבה תכונות מופלאות כאשר הבסיס הוא $e$. השיפוע של הפונקציה $y=e^x$ בנקודה $x$ שווה לפונקציה עצמה." }, { title: "כלל המעבר", content: "ניזכר ש-$\\log_b(a) = \\frac{\\ln(a)}{\\ln(b)}$. תכונה זו מאפשרת חישוב מהיר ושילוב במחשבונים אלקטרוניים העובדים רק עם בסיסי אי ולוג טבעי." }] },
    ]
  },
  {
    id: "lobby",
    label: "Lobby / Structural",
    emoji: "🏛️",
    color: "slate",
    accentBg: "bg-slate-500/10",
    accentBorder: "border-slate-500/30",
    accentText: "text-slate-400",
    blocks: [
      { type: "real-world-example", title: "תאוצה ביומיום", scenario: "כאשר מטוס מאיץ על המסלול.", connection: "נוכל להרגיש את כוח האינרציה (ההתמד) שדוחף אותנו למושב.", source: "מקור: המכניקה של הפיזיקה." },
    ]
  },
];

// ═══════════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════════

const totalBlocks = CATEGORIES.reduce((sum, cat) => sum + cat.blocks.length, 0);
const STATS = {
  total: totalBlocks,
  active: Object.keys(STYLE_DNA).filter(k => !STYLE_DNA[k].notes.includes("Alias") && !k.includes("alias")).length,
  styleDnaEntries: Object.keys(STYLE_DNA).length,
};

// ═══════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function StyleRow({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    bg: "text-blue-400",
    text: "text-green-400",
    size: "text-yellow-400",
    weight: "text-orange-400",
    border: "text-purple-400",
    radius: "text-pink-400",
    spacing: "text-cyan-400",
    dir: "text-red-400",
    math: "text-emerald-400",
  };
  return (
    <div className="flex gap-3">
      <span className="text-zinc-500 w-28 shrink-0">{label}</span>
      <span className={colorMap[color] || "text-zinc-300"}>{value || "—"}</span>
    </div>
  );
}

function StyleInspector({ blockType }: { blockType: string }) {
  const [open, setOpen] = useState(false);
  const dna = STYLE_DNA[blockType];

  if (!dna) {
    return (
      <div className="mt-4 border-t border-border/30 pt-3">
        <span className="text-xs text-muted-foreground font-mono">
          ⚠️ No Style DNA entry for type &quot;{blockType}&quot;
        </span>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-border/30 pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono cursor-pointer"
      >
        <span className="transition-transform duration-200" style={{ display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        <span>🔍 Style DNA</span>
        <span className="ml-2 text-primary/60 truncate max-w-xs">{dna.filePath}</span>
      </button>

      {open && (
        <div className="mt-3 bg-zinc-950 rounded-xl p-4 text-xs font-mono border border-zinc-800 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <StyleRow label="Background" value={dna.background} color="bg" />
          <StyleRow label="Text Color" value={dna.textColor} color="text" />
          <StyleRow label="Font Size" value={dna.fontSize} color="size" />
          <StyleRow label="Font Weight" value={dna.fontWeight} color="weight" />
          <StyleRow label="Border" value={dna.border} color="border" />
          <StyleRow label="Border Radius" value={dna.borderRadius} color="radius" />
          <StyleRow label="Padding" value={dna.padding} color="spacing" />
          <StyleRow label="Direction" value={dna.direction} color="dir" />
          <StyleRow label="Math Rendering" value={dna.mathRendering} color="math" />
          {dna.notes && (
            <div className="mt-2 pt-2 border-t border-zinc-800 text-zinc-400">
              💡 {dna.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════

export default function WorkshopPage() {
  // Flatten for global numbering
  let globalIndex = 0;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <div className="flex w-full">

        {/* Main Content Area */}
        <main className="flex-1 p-8 lg:pr-80 overflow-x-hidden pt-6">
          <div className="max-w-4xl mx-auto space-y-8 pb-32">

            {/* Header */}
            <header className="mb-8 border-b border-border pb-6">
              <h1 className="text-5xl font-black text-foreground">Sikumnik Master Workshop</h1>
              <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                מעבדת לחץ קיצונית לבדיקת רינדור מרכיבי הקורס הויזואליים: רכיבי קוד עברית, טיפוגרפיה צפופה בשילוב
                משוואות <code className="mx-1 px-1 bg-muted rounded-sm text-sm">LaTeX / KaTeX</code>.
              </p>
            </header>

            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-sm">
              <span className="text-zinc-400">📊</span>
              <span className="text-blue-400">Total: <strong className="text-white">{STATS.total}</strong></span>
              <span className="text-zinc-700">|</span>
              <span className="text-emerald-400">Style DNA Entries: <strong className="text-white">{STATS.styleDnaEntries}</strong></span>
              <span className="text-zinc-700">|</span>
              <span className="text-purple-400">Categories: <strong className="text-white">{CATEGORIES.length}</strong></span>
              <span className="text-zinc-700">|</span>
              <span className="text-amber-400">Active Components: <strong className="text-white">{STATS.active}</strong></span>
            </div>

            {/* Category Sections */}
            <div className="space-y-16">
              {CATEGORIES.map((category) => {
                const categoryStartIndex = globalIndex;

                return (
                  <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-24">
                    {/* Category Header Bar */}
                    <div className={`flex items-center justify-between p-4 rounded-xl ${category.accentBg} border ${category.accentBorder} mb-8 sticky top-0 z-30 backdrop-blur-xl bg-background/80`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.emoji}</span>
                        <h2 className={`text-xl font-black uppercase tracking-wider ${category.accentText}`}>
                          {category.label}
                        </h2>
                      </div>
                      <Badge variant="secondary" className="text-sm px-3 py-1 font-mono font-bold">
                        {category.blocks.length} blocks
                      </Badge>
                    </div>

                    {/* Blocks in this category */}
                    <div className="space-y-16">
                      {category.blocks.map((block, localIdx) => {
                        const currentGlobal = globalIndex;
                        globalIndex++;
                        const blockType = block.type;
                        const blockTitle = blockType.replace(/-/g, " ").toUpperCase();

                        return (
                          <div
                            key={`${category.id}-${localIdx}`}
                            id={`block-${currentGlobal}`}
                            className="relative pt-6 border-b border-border/40 pb-12 scroll-mt-24"
                          >
                            {/* Block Header */}
                            <div className="flex items-center gap-4 mb-6">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-lg px-4 py-1.5 font-black rounded-lg">
                                  {currentGlobal + 1}
                                </Badge>
                                <Badge variant="outline" className={`text-xs px-2 py-0.5 font-mono ${category.accentText} border-current`}>
                                  {category.label.split(" ")[0]} #{localIdx + 1}
                                </Badge>
                              </div>
                              <div>
                                <h2 className="text-2xl font-black text-foreground">{blockTitle}</h2>
                                <p className="text-sm text-muted-foreground font-mono mt-1 pr-1">{blockType}</p>
                              </div>
                            </div>

                            {/* Rendered Component */}
                            <div className="bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-2xl backdrop-blur-2xl">
                              <div className="block-renderer-wrapper overflow-x-auto relative z-10 w-full prose prose-stone max-w-none">
                                <BlockRenderer block={block as ContentBlock} />
                              </div>

                              {/* Style Inspector */}
                              <StyleInspector blockType={blockType} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </main>

        {/* Sidebar Navigation (RTL positioned on the right) */}
        <aside className="fixed top-0 right-0 w-80 h-screen z-40 bg-card border-l border-border shadow-xl backdrop-blur-xl hidden lg:block overflow-hidden transition-all duration-300">
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-5 border-b border-border bg-card/80 sticky top-0 z-10">
              <h3 className="text-base font-black tracking-widest text-primary uppercase text-center flex items-center justify-center gap-2">
                <span>מפתח רכיבים</span>
              </h3>
              <p className="text-xs text-center text-muted-foreground mt-2 font-mono">
                {STATS.total} רכיבים • {CATEGORIES.length} קטגוריות
              </p>
            </div>

            {/* Mini Stats */}
            <div className="px-4 py-3 border-b border-border/50 bg-zinc-950/50">
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>DNA: {STATS.styleDnaEntries}</span>
                <span>Active: {STATS.active}</span>
                <span>Cats: {CATEGORIES.length}</span>
              </div>
            </div>

            {/* Category Groups */}
            <div className="flex-1 overflow-y-auto w-full p-3 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40">
              {(() => {
                let sidebarGlobalIdx = 0;
                return CATEGORIES.map((category) => (
                  <div key={category.id}>
                    {/* Category Label */}
                    <button
                      onClick={() => scrollToSection(`cat-${category.id}`)}
                      className={`w-full text-right px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider ${category.accentText} hover:${category.accentBg} transition-colors flex items-center justify-between`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full bg-current`} />
                        <span>{category.emoji} {category.label}</span>
                      </span>
                      <span className="text-[10px] font-mono opacity-60">{category.blocks.length}</span>
                    </button>

                    {/* Block Items */}
                    <div className="mr-4 mt-1 space-y-0.5">
                      {category.blocks.map((block, localIdx) => {
                        const currentIdx = sidebarGlobalIdx;
                        sidebarGlobalIdx++;
                        return (
                          <button
                            key={`sidebar-${currentIdx}`}
                            onClick={() => scrollToSection(`block-${currentIdx}`)}
                            className="w-full text-right py-1.5 px-2.5 rounded-md text-xs hover:bg-muted font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center justify-between group"
                          >
                            <span className="truncate pr-1">
                              {currentIdx + 1}. {block.type.replace(/-/g, " ")}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/20">
              <p className="text-xs text-center text-muted-foreground font-mono opacity-60">
                🔍 Style DNA Inspector v2.0
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
