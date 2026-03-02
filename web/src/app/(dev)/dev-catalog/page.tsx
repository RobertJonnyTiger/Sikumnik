"use client";

import React, { useState } from "react";
import { Hash, Layout, MessageSquare, GraduationCap, Calculator, MoveRight, Beaker } from "lucide-react";

// --- Components ---

// Core Blocks
import { Hook } from "@/features/core-lessons/blocks/Hook";
import { Explanation } from "@/features/core-lessons/blocks/Explanation";
import { Definition } from "@/features/core-lessons/blocks/Definition";
import { List } from "@/features/core-lessons/blocks/List";
import { ChapterImage } from "@/features/core-lessons/blocks/ChapterImage";

// Narrative & Tone
import { Analogy } from "@/features/core-lessons/blocks/Analogy";
import { StreetSmartSketch } from "@/features/core-lessons/blocks/StreetSmartSketch";
import { DeepDive } from "@/features/core-lessons/blocks/DeepDive";
import { RealWorldExample } from "@/features/core-lessons/blocks/RealWorldExample";
import { ToneBreak } from "@/features/core-lessons/blocks/ToneBreak";

// Interactive & Assessment
import { GuidedExercise } from "@/features/core-lessons/blocks/GuidedExercise";
import { CheckpointQuiz } from "@/features/core-lessons/blocks/CheckpointQuiz";
import { KnowledgeExam } from "@/features/core-lessons/blocks/KnowledgeExam";
import { ExamQuestionBlock } from "@/features/core-lessons/blocks/ExamQuestionBlock";
import { MaslowPyramid } from "@/features/core-lessons/blocks/MaslowPyramid";

// Math & Technical
import { FormulaCard } from "@/features/core-lessons/blocks/FormulaCard";
import { WorkedExample } from "@/features/core-lessons/blocks/WorkedExample";

// Summary & Structure
import DidYouKnow from "@/features/core-lessons/blocks/DidYouKnow";
import { TopicSummary } from "@/features/core-lessons/blocks/TopicSummary";
import { NarrativeSummary } from "@/features/core-lessons/blocks/NarrativeSummary";
import { TopicNavigation } from "@/features/core-lessons/blocks/TopicNavigation";
import { CourseBreadcrumb } from "@/features/core-lessons/renderers/CourseBreadcrumb";
import { ChapterProgressionBar } from "@/features/core-lessons/renderers/ChapterProgressionBar";

// Domain Specific (Org Behavior)
import { AttributionFlowchart } from "@/features/organizational-behavior/components/AttributionFlowchart";
import { DiagnosticCaseStudy } from "@/features/organizational-behavior/components/DiagnosticCaseStudy";
import { SituationalLeadershipGuide } from "@/features/organizational-behavior/components/SituationalLeadershipGuide";

// --- Configuration ---

const CATEGORIES = [
    {
        id: "core",
        name: "Core Content",
        icon: Layout,
        components: [
            { id: "hook", name: "Hook" },
            { id: "explanation", name: "Explanation" },
            { id: "definition", name: "Definition" },
            { id: "list", name: "List" },
            { id: "chapter-image", name: "ChapterImage" },
        ]
    },
    {
        id: "narrative",
        name: "Narrative & Tone",
        icon: MessageSquare,
        components: [
            { id: "analogy", name: "Analogy" },
            { id: "street-smart-sketch", name: "StreetSmartSketch" },
            { id: "deep-dive", name: "DeepDive" },
            { id: "real-world-example", name: "RealWorldExample" },
            { id: "tone-break", name: "ToneBreak" },
        ]
    },
    {
        id: "interactive",
        name: "Assessment",
        icon: GraduationCap,
        components: [
            { id: "guided-exercise", name: "GuidedExercise" },
            { id: "checkpoint-quiz", name: "CheckpointQuiz" },
            { id: "knowledge-exam", name: "KnowledgeExam" },
            { id: "exam-question-block", name: "ExamQuestionBlock" },
            { id: "maslow-pyramid", name: "MaslowPyramid" },
        ]
    },
    {
        id: "math",
        name: "Math & Technical",
        icon: Calculator,
        components: [
            { id: "formula-card", name: "FormulaCard" },
            { id: "worked-example", name: "WorkedExample" },
        ]
    },
    {
        id: "flow",
        name: "Structure",
        icon: MoveRight,
        components: [
            { id: "breadcrumbs", name: "Breadcrumbs" },
            { id: "progression", name: "Progression Bar" },
            { id: "topic-navigation", name: "Topic Navigation" },
            { id: "topic-summary", name: "Topic Summary" },
            { id: "narrative-summary", name: "Narrative Summary" },
        ]
    },
    {
        id: "specialized",
        name: "Specialized",
        icon: Beaker,
        components: [
            { id: "attribution", name: "Attribution Flow" },
            { id: "case-study", name: "Case Study" },
            { id: "leadership", name: "Leadership Guide" },
        ]
    }
];

export default function DevCatalogPage() {
    const [activeId, setActiveId] = useState("hook");

    const scrollTo = (id: string) => {
        setActiveId(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 flex text-foreground font-sans selection:bg-primary/30" dir="rtl">
            {/* Sticky Sidebar Navigation */}
            <aside className="w-80 fixed h-screen top-0 right-0 bg-background border-l border-border/50 shadow-2xl z-50 flex flex-col hidden lg:flex">
                <div className="p-8 border-b border-border/50 bg-background/95 backdrop-blur z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        <h1 className="text-xl font-black tracking-tight uppercase">Sikumnik Catalog</h1>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">Master Component Audit</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="space-y-2">
                            <div className="flex items-center gap-2 px-4 py-2 text-[11px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 rounded-lg">
                                <cat.icon className="w-3 h-3" />
                                {cat.name}
                            </div>
                            <div className="space-y-1">
                                {cat.components.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => scrollTo(c.id)}
                                        className={`w-full text-right px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${activeId === c.id
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                    >
                                        <span>{c.name}</span>
                                        <Hash className={`w-3 h-3 opacity-0 transition-opacity ${activeId === c.id ? "opacity-100" : "group-hover:opacity-50"}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:mr-80 p-6 md:p-12 xl:p-20">
                <div className="max-w-4xl mx-auto space-y-32">

                    {/* --- CORE --- */}
                    <SectionGroup title="Core Content Blocks">
                        <Section id="hook" name="Hook">
                            <Hook
                                question="למה אנחנו תמיד רוצים את מה שאין לנו?"
                                opener="מחסור (Scarcity) הוא המנוע של הכלכלה כולה. ברגע שמשאב מוגבל, מתחילה התחרות."
                                context="בפרק זה נלמד כיצד מחסור מכריח אותנו לבצע בחירות שמובילות לעלות אלטרנטיבית."
                            />
                        </Section>

                        <Section id="explanation" name="Explanation">
                            <Explanation
                                content="**עקומת התמורה (PPF)** מציגה את כל השילובים האפשריים לייצור שני מוצרים, בהינתן כמות משאבים וטכנולוגיה קבועים."
                                highlight="כל בחירה לייצר יותר ממוצר אחד גוררת בהכרח ויתור על ייצור המוצר השני. זהו ביטוי גרפי לעלות האלטרנטיבית השולית."
                            />
                        </Section>

                        <Section id="definition" name="Definition">
                            <Definition
                                variant="academic"
                                term="עלות אלטרנטיבית (Opportunity Cost)"
                                definition="הערך של החלופה הטובה ביותר עליה ויתרנו בעת קבלת החלטה."
                                source="מבוא למיקרו כלכלה"
                                subject="כלכלה"
                            />
                        </Section>

                        <Section id="list" name="List">
                            <List
                                items={[
                                    "**מוצר נורמלי:** ביקוש עולה כשההכנסה עולה.",
                                    "**מוצר נחות:** ביקוש יורד כשההכנסה עולה.",
                                    "**מוצר ניטרלי:** ההכנסה לא משפיעה על הביקוש."
                                ]}
                            />
                        </Section>

                        <Section id="chapter-image" name="ChapterImage">
                            <ChapterImage
                                src="https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=2070&auto=format&fit=crop"
                                alt="לוח גיר"
                                caption="מציאת שורשי המשוואה הריבועית"
                            />
                        </Section>
                    </SectionGroup>

                    {/* --- NARRATIVE --- */}
                    <SectionGroup title="Narrative & Tone">
                        <Section id="analogy" name="Analogy">
                            <Analogy
                                content="**זכרון RAM מול הדיסק הקשיח:** דמיינו שולחן עבודה מול ארון תיוק. הדיסק הקשיח הוא ארון התיוק - גדול, מכיל הכל, אבל לוקח זמן לגשת אליו."
                                icon="🖥️"
                            />
                        </Section>

                        <Section id="street-smart-sketch" name="StreetSmartSketch">
                            <StreetSmartSketch
                                title="דוגרי? עלות שקועה"
                                content="אם קניתם כרטיס לקולנוע ב-50 שקל, ואחרי חצי שעה הסרט גרוע בטירוף. **אל תישארו רק כי שילמתם!**"
                            />
                        </Section>

                        <Section id="deep-dive" name="DeepDive">
                            <DeepDive
                                title="פרדוקס הערך (יהלומים מול מים)"
                                difficulty="graduate"
                                sections={[
                                    { title: "הצגת הבעיה", content: "מים הכרחיים אך זולים. יהלומים לא הכרחיים אך יקרים." },
                                    { title: "הפתרון", content: "ההבחנה בין תועלת כוללת לתועלת שולית." }
                                ]}
                            />
                        </Section>

                        <Section id="real-world-example" name="RealWorldExample">
                            <RealWorldExample
                                title="השפעת הקורונה"
                                scenario="בשנת 2020, סגרים בסין גרמו לעצירה בייצור שבבים."
                                connection="זוהי דוגמה מושלמת למצב בו יש במקביל זעזוע צד היצע וזעזוע צד ביקוש."
                                source="The Wall Street Journal"
                            />
                        </Section>

                        <Section id="tone-break" name="ToneBreak">
                            <ToneBreak
                                opener="קחו שלוק מים, המוח שלכם עבד קשה."
                                content="אנחנו עוברים לדבר על חישובים. אל תיבהלו מה-X, זה רק מספר שמתחבא."
                            />
                        </Section>
                    </SectionGroup>

                    {/* --- ASSESSMENT --- */}
                    <SectionGroup title="Interactive Assessment">
                        <Section id="guided-exercise" name="GuidedExercise">
                            <GuidedExercise
                                difficulty={3}
                                question="מצא את מחיר וכמות שיווי המשקל."
                                thinkingDirection="בשיווי משקל, הכמות המבוקשת שווה לכמות המוצעת."
                                steps={[
                                    { title: "השוואה", action: "נשווה את הביקוש להיצע:", reasoning: "תנאי שיווי משקל", calculation: "120 - 2P = 20 + 3P", result: "P=20" }
                                ]}
                                finalAnswer="P=20, Q=80"
                                phases={[{ type: "i-do", content: "אני מזהה שזו שאלת שיווי משקל." }]}
                            />
                        </Section>

                        <Section id="checkpoint-quiz" name="CheckpointQuiz">
                            <CheckpointQuiz
                                questions={[{
                                    id: "cq1",
                                    question: "אם מחיר מוצר תחליפי עולה, מה יקרה לביקוש?",
                                    options: ["ירד", "יעלה", "לא ישתנה"],
                                    correctIndex: 1,
                                    explanation: "צרכנים יעברו לקנות את המוצר שלנו."
                                }]}
                            />
                        </Section>

                        <Section id="knowledge-exam" name="KnowledgeExam">
                            <KnowledgeExam
                                questions={[{
                                    id: "ke1",
                                    question: "איזו פעולה תגרום לתזוזה ימינה של עקומת הביקוש?",
                                    options: ["ירידת מחיר", "עליית מחיר תחליף", "עליית מחיר גבינה", "ירידת הכנסה"],
                                    correctIndex: 1,
                                    explanation: "עליית מחיר תחליף מגדילה את הביקוש אלינו."
                                }]}
                            />
                        </Section>

                        <Section id="exam-question-block" name="ExamQuestionBlock">
                            <ExamQuestionBlock
                                questions={[
                                    {
                                        id: "eq1",
                                        number: 1,
                                        type: "multiple-choice",
                                        points: 10,
                                        question: "במצב $P < AVC$, מה על הפירמה לעשות?",
                                        options: ["להמשיך", "להגדיל", "לסגור", "להעלות מחיר"],
                                        correctIndex: 2,
                                        modelAnswer: "לסגור. ההפסד גדול מדי."
                                    }
                                ]}
                            />
                        </Section>

                        <Section id="maslow-pyramid" name="MaslowPyramid">
                            <MaslowPyramid />
                        </Section>
                    </SectionGroup>

                    {/* --- MATH --- */}
                    <SectionGroup title="Math & Technical Tools">
                        <Section id="formula-card" name="FormulaCard">
                            <FormulaCard
                                title="גמישות הביקוש"
                                description="מודדת רגישות כמות למחיר."
                                formula="\varepsilon_{p} = \frac{\% \Delta Q}{\% \Delta P}"
                                variables={[{ symbol: "ε_p", name: "גמישות", desc: "התוצאה" }]}
                            />
                        </Section>

                        <Section id="worked-example" name="WorkedExample">
                            <WorkedExample
                                title="חישוב גזירה"
                                scenario="נתונה $f(x) = (3x^2 + 5)^4$."
                                calculation="זיהוי פנימית וחיצונית..."
                                solution="$f'(x) = 24x(3x^2+5)^3$"
                            />
                        </Section>
                    </SectionGroup>

                    {/* --- FLOW --- */}
                    <SectionGroup title="Structural Flow Components">
                        <Section id="breadcrumbs" name="Breadcrumbs">
                            <CourseBreadcrumb
                                courseName="מיקרו כלכלה"
                                chapterTitle="פרק 1: היצע וביקוש"
                                currentTabTitle="שיווי משקל תחרותי"
                                currentTabIndex={3}
                                totalTabs={5}
                            />
                        </Section>

                        <Section id="progression" name="Progression Bar">
                            <div className="h-24 relative">
                                <ChapterProgressionBar
                                    tabs={[
                                        { id: "1", title: "מבוא" },
                                        { id: "2", title: "ביקוש" },
                                        { id: "3", title: "היצע" },
                                        { id: "4", title: "שיווי משקל" }
                                    ]}
                                    activeTab={2}
                                    onTabChange={() => { }}
                                    course="micro"
                                    chapterTitle="היצע וביקוש"
                                />
                            </div>
                        </Section>

                        <Section id="topic-navigation" name="Topic Navigation">
                            <TopicNavigation
                                previousTopic={{ title: "מבוא לחובה", chapter: "פרק 1" }}
                                nextTopic={{ title: "ניהול זמן", chapter: "פרק 3" }}
                            />
                        </Section>

                        <Section id="topic-summary" name="Topic Summary">
                            <TopicSummary
                                content="סיכום קצר של מה שלמדנו על שיווי משקל."
                                keyPoints={["ביקוש (WTP)", "היצע (MC)"]}
                            />
                        </Section>

                        <Section id="narrative-summary" name="Narrative Summary">
                            <NarrativeSummary
                                data={{
                                    summary: "כאן יבוא סיכום הנרטיב של הפרק, המסביר את התמונה הגדולה בצורה פשוטה וברורה.",
                                    keyTakeaway: "הבנת שיווי משקל היא הלב של המיקרו-כלכלה.",
                                    tip: {
                                        title: "טיפ של אלופים",
                                        content: "תמיד כדאי לחזור על המושגים הבסיסיים לפני שצוללים לעומק."
                                    },
                                    pitfall: {
                                        title: "מוקש נפוץ",
                                        content: "אל תתבלבלו בין עלות חשבונאית לעלות כלכלית!"
                                    }
                                }}
                            />
                        </Section>
                    </SectionGroup>

                    {/* --- SPECIALIZED --- */}
                    <SectionGroup title="Specialized Domain Components">
                        <Section id="attribution" name="Attribution Flowchart">
                            <AttributionFlowchart mode="reference" />
                        </Section>

                        <Section id="case-study" name="Case Study">
                            <DiagnosticCaseStudy
                                title="משבר המנהיגות ב'טק-נובה'"
                                subtitle="אבחון בעיות ארגוניות"
                                scenario="חברת סטארטאפ צומחת מהר, המייסד איבד שליטה על התרבות הארגונית."
                                sections={[
                                    {
                                        id: "s1",
                                        title: "תפיסה וייחוס",
                                        theory: "טעות הייחוס הבסיסית",
                                        analysis: "המנהלים מאשימים את אופי העובדים במקום את המערכת.",
                                        evidence: ["תלונות על איחורים", "חוסר אמון"],
                                        questions: [{
                                            question: "מהי טעות הייחוס הבסיסית?",
                                            options: ["האשמת המצב", "האשמת האדם", "התעלמות מהבעיה"],
                                            correctIndex: 1,
                                            explanation: "נטייה לייחס התנהגות לאופי ולא למצב."
                                        }]
                                    }
                                ]}
                                conclusion="יש צורך בשינוי מבני ושיפור התקשורת."
                                keyTakeaways={["תקשורת היא המפתח", "ייחוס נכון מציל צוותים"]}
                            />
                        </Section>

                        <Section id="leadership" name="Situational Leadership Guide">
                            <SituationalLeadershipGuide />
                        </Section>
                    </SectionGroup>

                </div>
            </main>
        </div>
    );
}

// Group Layout
function SectionGroup({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-12">
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-muted/30 px-6 text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">
                        {title}
                    </span>
                </div>
            </div>
            {children}
        </div>
    );
}

// Wrapper utility for visual presentation
function Section({ id, name, children }: { id: string, name: string, children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-40 transition-all duration-1000">
            <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-foreground text-background font-mono text-[10px] font-black shadow-xl ring-4 ring-background">
                    &lt;{name} /&gt;
                </span>
                <div className="h-px flex-1 bg-linear-to-r from-border to-transparent mr-4 opacity-50" />
            </div>
            <div className="bg-background rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-border/50 relative overflow-hidden group/card">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover/card:bg-primary/10 transition-colors" />
                <div className="relative z-10 font-noto">
                    {children}
                </div>
            </div>
        </section>
    );
}
