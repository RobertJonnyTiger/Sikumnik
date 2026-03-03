"use client";

import React, { useState } from "react";
import { Hash, Layout, MessageSquare, GraduationCap, Calculator, MoveRight, Beaker } from "lucide-react";

// --- Components ---

// Core Blocks
import { Hook } from "@/features/core-lessons/blocks/Hook";
import { Explanation } from "@/features/core-lessons/blocks/Explanation";
import { Definition } from "@/features/core-lessons/blocks/Definition";
import { List } from "@/features/core-lessons/blocks/List";
import { Alert } from "@/features/core-lessons/blocks/Alert";
import { Callout } from "@/features/core-lessons/blocks/Callout";
import { CommonMistake } from "@/features/core-lessons/blocks/CommonMistake";
import { ExamTip } from "@/features/core-lessons/blocks/ExamTip";
import { TextBlock } from "@/features/core-lessons/blocks/TextBlock";

// Narrative & Tone
import { Analogy } from "@/features/core-lessons/blocks/Analogy";
import { StreetSmartSketch } from "@/features/core-lessons/blocks/StreetSmartSketch";
import { DeepDive } from "@/features/core-lessons/blocks/DeepDive";
import DidYouKnow from "@/features/core-lessons/blocks/DidYouKnow";

// Interactive & Assessment
import { GuidedExercise } from "@/features/core-lessons/blocks/GuidedExercise";
import { CheckpointQuiz } from "@/features/core-lessons/blocks/CheckpointQuiz";


// Math & Technical
import { FormulaCard } from "@/features/core-lessons/blocks/FormulaCard";
import { WorkedExample } from "@/features/core-lessons/blocks/WorkedExample";
import { HeroFormula } from "@/features/math/components/HeroFormula";
import { ReferenceTable } from "@/features/math/components/ReferenceTable";
import { ConceptTranslation } from "@/features/math/components/ConceptTranslation";

// Summary & Structure
import { TopicSummary } from "@/features/core-lessons/blocks/TopicSummary";
import { NarrativeSummary } from "@/features/core-lessons/blocks/NarrativeSummary";
import { TopicNavigation } from "@/features/core-lessons/blocks/TopicNavigation";
import { CourseBreadcrumb } from "@/features/core-lessons/renderers/CourseBreadcrumb";
import { ChapterProgressionBar } from "@/features/core-lessons/renderers/ChapterProgressionBar";

// --- Configuration ---

const CATEGORIES = [
    {
        id: "core",
        name: "Core Content",
        icon: Layout,
        components: [
            { id: "hook", name: "Hook" },
            { id: "text", name: "TextBlock" },
            { id: "explanation", name: "Explanation" },
            { id: "definition", name: "Definition" },
            { id: "list", name: "List" },
        ]
    },
    {
        id: "tips",
        name: "Tips & Alerts",
        icon: Beaker,
        components: [
            { id: "alert", name: "Alert" },
            { id: "callout", name: "Callout" },
            { id: "common-mistake", name: "CommonMistake" },
            { id: "exam-tip", name: "ExamTip" },
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
            { id: "did-you-know", name: "DidYouKnow" },
        ]
    },
    {
        id: "interactive",
        name: "Assessment",
        icon: GraduationCap,
        components: [
            { id: "guided-exercise", name: "GuidedExercise" },
            { id: "checkpoint-quiz", name: "CheckpointQuiz" },
        ]
    },
    {
        id: "math",
        name: "Math & Technical",
        icon: Calculator,
        components: [
            { id: "formula-card", name: "FormulaCard" },
            { id: "hero-formula", name: "HeroFormula" },
            { id: "reference-table", name: "ReferenceTable" },
            { id: "concept-translation", name: "ConceptTranslation" },
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

                        <Section id="text" name="TextBlock">
                            <TextBlock
                                formalText="**הפונקציה הקווית** מוגדרת כ-$f(x) = mx + b$ כאשר $m$ הוא השיפוע (slope) ו-$b$ היא נקודת החיתוך עם ציר ה-$y$. בהסתכלות על גרף הפונקציה $y = 3x + 7$, ניתן לראות שהיא חותכת את ציר ה-$y$ בנקודה $(0, 7)$ ועולה בשיפוע של $3$ לכל יחידה של $x$."

                                streetNarrator="תחשוב על זה כמו �חשבון הבנק שלך: כל יום אתה מקבל אותו סכום קבוע (זה ה-$b$), ועוד קצת כל פעם שאתה עובד (זה ה-$m \\cdot x$). אז החשבון תמיד יעלה בקו ישר, בלי הפתעות. ה-$m$ זה כמו הריבית - אם היא חיובית, אתה מרוויח; אם שלילית, אתה מפסיד. ה-$b$ זה הסכום ההתחלתי - מאיפה התחלת."
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
                    </SectionGroup>

                    {/* --- TIPS & ALERTS --- */}
                    <SectionGroup title="Tips & Alerts">
                        <Section id="alert" name="Alert">
                            <Alert variant="warning" title="שימו לב לסימן!">
                                כאשר פותרים משוואה ריבועית מהצורה ax2 + bx + c = 0, חשוב לזכור את הנוסחה הכללית. זו טעות נפוצה במבחנים לבלבל בין הפורמולות.
                            </Alert>
                            <div className="mt-4">
                                <Alert variant="success" title="הצלחה!">
                                    מצאתם את הפתרון הנכון! עכשיו תוכלו לפתור כל משוואה ריבועית.
                                </Alert>
                            </div>
                            <div className="mt-4">
                                <Alert variant="prerequisite">
                                    לפני שנמשיך, ודאו שאתם שולטים בחוקי החזקות הבסיסיים.
                                </Alert>
                            </div>
                        </Section>

                        <Section id="callout" name="Callout">
                            <Callout 
                                variant="info" 
                                title="מה זה Δ ?" 
                                content="הדלתא (Δ) היא הדיסקרימיננטה של המשוואה הריבועית. היא קובעת כמה פתרונות יש למשוואה: אם Δ > 0 יש שני פתרונות ממשיים, אם Δ = 0 יש פתרון ממשי אחד (כפול), ואם Δ < 0 אין פתרונות ממשיים (אבל יש שני פתרונות מרוכבים)."
                            />
                        </Section>

                        <Section id="common-mistake" name="CommonMistake">
                            <CommonMistake 
                                mistake="Many students write √(a² + b²) = a + b, which is WRONG! For example, √(3² + 4²) = √(9 + 16) = √25 = 5, but 3 + 4 = 7 ≠ 5."
                                correction="הזהות הנכונה היא √(a² + b²) לא שווה ל-a + b באופן כללי. רק כאשר a = 0 או b = 0, השוויון מתקיים. במקום זאת, √(a² + b²) = √a² + √b² רק אם a, b ≥ 0 ו-ab = 0."
                            />
                        </Section>

                        <Section id="exam-tip" name="ExamTip">
                            <ExamTip 
                                content="במבחן, תמיד בדקו קודם אם ניתן לפרק את המשוואה לגורמים לפני שאתם משתמשים בנוסחה הריבועית. למשל, $x^2 - 9 = 0$ נפתר מיידית כ-$(x-3)(x+3)=0$, ולא צריך את הנוסחה הכללית!"
                                source="מבחן מיקרו כלכלה א' - סמסטר 2024א'"
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

                        <Section id="did-you-know" name="DidYouKnow">
                            <DidYouKnow
                                facts={[
                                    { category: "היסטוריה", fact: "המושג 'אינפלציה' הגיע מהמילה הלטינית 'inflare' - לנפח. בתחילת המאה ה-20, מחירי הנייר נפחו (עלו) בגלל הדפסת כסף מוגזם!" },
                                    { category: "מוח", fact: "מחקרים מראים שהמוח שלנו מעריך הפסד פי 2 מאשר רווח שווה ערך. זה נקרא 'aversione to loss' ומסביר למה אנשים מחזיקים במניות יורדות יותר זמן מדאיק." },
                                    { category: "כלכלה", fact: "הפרדוקס של וילסון: ככל שהמוצר נדיר יותר, כך אנחנו רוצים אותו יותר - עד שהוא נעשה נחוץ כל כך שאנחנו מוכנים לשלם הרבה. זה מסביר את שוק היהלומים!" }
                                ]}
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

                        <Section id="hero-formula" name="HeroFormula">
                            <HeroFormula
                                block={{
                                    id: "hero-quadratic",
                                    type: "hero-formula",
                                    title: "נוסחת השורשים הריבועיים",
                                    subtitle: "הפתרון למשוואה $ax^2 + bx + c = 0$",
                                    katexString: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
                                    streetNarrator: "זוכרים את המשפט הקדום: 'יש מי שמחפש מציאות ויש מי שמוצא בעיות' - אז הנה הנוסחה שתמיד עובדת! פשוט תצי�או את ה-$a$, ה-$b$, וה-$c$ שלכם ותציבו בפורמולה. ה-$\\pm$ אומר שיש שני פתרונות בדרך כלל (חוץ מהמקרה שהדלתא היא 0). כמו שאומרים: 'לכל בעיה יש פתרון, ולפעמים יש שניים!'"
                                }}
                            />
                        </Section>

                        <Section id="reference-table" name="ReferenceTable">
                            <ReferenceTable
                                block={{
                                    id: "derivatives-table",
                                    type: "reference-table",
                                    tableCategory: "טבלת נגזרות בסיסיות",
                                    rows: [
                                        { id: "d1", ruleName: "קבוע", generalForm: "\\frac{d}{dx}[c] = 0", numericExample: "\\frac{d}{dx}[5] = 0", streetExplanation: "נגזרת של מספר קבוע היא תמיד 0. הקבוע לא זז." },
                                        { id: "d2", ruleName: "זהות", generalForm: "\\frac{d}{dx}[x] = 1", numericExample: "\\frac{d}{dx}[x] = 1", streetExplanation: "ה-$x$ תמיד עולה בקו ישר בשיפוע 1." },
                                        { id: "d3", ruleName: "חזקה", generalForm: "\\frac{d}{dx}[x^n] = nx^{n-1}", numericExample: "\\frac{d}{dx}[x^3] = 3x^2", streetExplanation: "הורד את החזקה כמקדם, והורד את החזקה ב-1." },
                                        { id: "d4", ruleName: "אקספוננט", generalForm: "\\frac{d}{dx}[e^x] = e^x", numericExample: "\\frac{d}{dx}[e^{2x}] = 2e^{2x}", streetExplanation: "ה-$e$ הוא הקסם: הנגזרת שלו היא הוא עצמו!" },
                                        { id: "d5", ruleName: "לוגריתם", generalForm: "\\frac{d}{dx}[\\ln x] = \\frac{1}{x}", numericExample: "\\frac{d}{dx}[\\ln(3x)] = \\frac{1}{x}", streetExplanation: "הלוגריתם הטבעי יורד ככל ש-$x$ עולה - וזה ההפך מאקספוננט." }
                                    ]
                                }}
                            />
                        </Section>

                        <Section id="concept-translation" name="ConceptTranslation">
                            <ConceptTranslation
                                block={{
                                    id: "marginal-utility",
                                    type: "definition",
                                    title: "תועלת שולית (Marginal Utility)",
                                    content: {
                                        formalText: "התועלת השולית היא התוספת לתועלת הכוללת כתוצאה מצריכת יחידה נוספת של המוצר. מתמטית: $MU = \\frac{\\Delta TU}{\\Delta Q}$.",
                                        streetNarrator: "תחשוב על זה ככה: המאפרסמה הראשונה בפיצה סופר טעימה ונותנת לך הרבה הנאה. השנייה עדיין טעימה אבל פחות. השלישית? כבר לא רעב. זו התועלת השולית - כל פרוסה נוספת נותנת לך פחות ופחות удовольствие (הנאה). זה החוק השולטני: הסופט (הרווח השולי) יורד עם כל יחידה נוספת."
                                    }
                                }}
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
                    {/* --- MATH --- */}

                </div>
            </main >
        </div >
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
