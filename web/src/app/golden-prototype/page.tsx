"use client";

import React from "react";
import { MasterPageLayout } from "@/components/core/master-page/MasterPageLayout";
import { ChapterTabPanel } from "@/components/core/master-page/ChapterTabPanel";
import { SectionWrapper } from "@/components/core/master-page/SectionWrapper";
import { TeaserAnalogy } from "@/components/core/master-page/TeaserAnalogy";
import { DefinitionBlock } from "@/components/core/master-page/DefinitionBlock";
import { ToneBreak } from "@/components/core/master-page/ToneBreak";
import { CommonMistakes } from "@/components/core/master-page/CommonMistakes";
import { CheckpointQuiz } from "@/components/core/master-page/CheckpointQuiz";
import { GuidedExercise } from "@/components/core/master-page/GuidedExercise";
import { IndependentExercise } from "@/components/core/master-page/IndependentExercise";
import {
    Map,
    Clock,
    ArrowLeft,
    BookOpen,
    Anchor,
    AlertTriangle,
    Lightbulb,
} from "lucide-react";

export default function GoldenPrototypePage() {
    return (
        <MasterPageLayout chapterTitle="פרק 2: המאזן (Balance Sheet)">
            {/* 
        TAB 1: OVERVIEW (מבוא)
        Sections: [1] Page Map, [2] Introduction, [3] Teaser Analogy
      */}
            <ChapterTabPanel id="overview" className="space-y-8">
                {/* [1] PAGE MAP */}
                <SectionWrapper id="page-map" sectionNumber={1}>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-teal-500">
                            <Map size={20} />
                            <h3 className="font-bold">מפת הפרק</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-white mb-2">נלמד בפרק זה:</h4>
                                <ul className="space-y-2 text-slate-300 text-sm list-disc list-inside marker:text-teal-500">
                                    <li>מהו דוח המאזן ומה חשיבותו</li>
                                    <li>משוואת המאזן: נכסים = התחייבויות + הון עצמי</li>
                                    <li>כיצד מסווגים סעיפים לדוח (שוטף vs לא שוטף)</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Clock size={14} />
                                    <span>זמן משוער: 45 דקות</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <ArrowLeft size={14} />
                                    <span>דרישות קדם: פרק 1 - מושגי יסוד</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* [2] INTRODUCTION */}
                <SectionWrapper id="introduction" sectionNumber={2} title="הקדמה">
                    <div className="prose prose-invert max-w-none text-slate-300">
                        <p className="text-lg leading-relaxed">
                            המאזן הוא כמו "תמונת מצב" (Snapshot) של העסק בנקודת זמן ספציפית.
                            בניגוד לדוח רווח והפסד שמספר לנו "סיפור" על מה קרה במשך שנה שלמה
                            (כמו סרט), המאזן עוצר את השעון ומראה לנו בדיוק מה יש לנו ומה אנחנו
                            חייבים באותו רגע (כמו תמונה).
                        </p>
                        <p className="leading-relaxed mt-4">
                            הבנת המאזן היא קריטית כי היא מגלה את איתנותו הפיננסית של העסק. עסק
                            יכול להרוויח המון (בדוח רווח והפסד), אבל אם הוא חייב מיליונים לבנק
                            ואין לו מזומן בקופה (במאזן), הוא בבעיה חמורה.
                        </p>
                    </div>
                </SectionWrapper>

                {/* [3] TEASER ANALOGY */}
                <TeaserAnalogy content="תחשבו על המאזן כמו על צילום מסך של חשבון הבנק והרכוש שלכם ביום ספציפי (למשל, ב-31 בדצמבר). בצד אחד יש את כל מה ששלכם (האייפון, האוטו, הכסף בעו״ש) - אלה ה״נכסים״. בצד השני יש את איך שמימנתם את זה - חלק מהלוואות שלקחתם (״התחייבויות״) וחלק מהכסף שהבאתם מהבית (״הון עצמי״). המאזן פשוט מוודא ששני הצדדים האלה תמיד שווים." />
            </ChapterTabPanel>

            {/* 
        TAB 2: CONCEPTS (מושגים)
        Sections: [4] Definitions, [5] Tone Break, [6] Deep Dive, [7] Mistakes
      */}
            <ChapterTabPanel id="concepts" className="space-y-12">
                {/* [4] DEFINITIONS */}
                <DefinitionBlock
                    title="משוואת המאזן (The Accounting Equation)"
                    definitions={[
                        {
                            term: "נכסים (Assets)",
                            definition:
                                "משאבים כלכליים שנמצאים בבעלות העסק וצפויים להפיק הטבות כלכליות בעתיד. נכסים מסווגים לשוטפים (לטווח קצר) ולא שוטפים (לטווח ארוך).",
                        },
                        {
                            term: "התחייבויות (Liabilities)",
                            definition:
                                "מחויבויות של העסק להעביר משאבים (למשל מזומן) לגורמים חיצוניים בעתיד, הנובעות מאירועים שהתרחשו בעבר.",
                        },
                        {
                            term: "הון עצמי (Equity)",
                            definition:
                                "היתרה השיורית בנכסי העסק לאחר הפחתת כל ההתחייבויות. מייצג את חלקם של הבעלים בעסק.",
                        },
                    ]}
                />

                {/* [5] TONE BREAK */}
                <ToneBreak
                    opener="בואו נשבור את זה רגע"
                    content={[
                        "אל תיבהלו מהמילה ״שיורית״ בהון העצמי. זה פשוט אומר: מה שנשאר.",
                        "אם תמכרו את כל הנכסים של העסק (תקבלו מזומן) ותחזירו את כל החובות לנושים - מה שיישאר ביד הולך הביתה לבעלים. זה ההון העצמי.",
                        "בגלל זה קוראים לזה ״נכסים נטו״.",
                    ]}
                />

                {/* [6] DEEP DIVE */}
                <SectionWrapper id="deep-dive" sectionNumber={6} title="צלילת עומק">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-white mb-4">
                            הבחנה בין שוטף ללא-שוטף
                        </h4>
                        <p className="text-slate-300 mb-4">
                            כלל האצבע בחשבונאות הוא ״שנה אחת״. נכס או התחייבות נחשבים ״שוטפים״
                            אם הם עתידים להתממש (להפוך לכסף או להיות משולמים) בתוך 12 חודשים.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-950 p-4 rounded border border-slate-800">
                                <span className="text-teal-400 font-bold block mb-2">
                                    נכסים שוטפים
                                </span>
                                <ul className="text-sm text-slate-400 list-disc list-inside">
                                    <li>מזומן ושווי מזומן</li>
                                    <li>לקוחות (חייבים)</li>
                                    <li>מלאי (צפוי להימכר השנה)</li>
                                </ul>
                            </div>
                            <div className="bg-slate-950 p-4 rounded border border-slate-800">
                                <span className="text-purple-400 font-bold block mb-2">
                                    נכסים לא שוטפים
                                </span>
                                <ul className="text-sm text-slate-400 list-disc list-inside">
                                    <li>רכוש קבוע (מכונות, מבנים)</li>
                                    <li>מוניטין</li>
                                    <li>השקעות לטווח ארוך</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* [7] COMMON MISTAKES */}
                <CommonMistakes
                    mistakes={[
                        {
                            mistake: "רישום ״הוצאות שכר״ כהתחייבות במאזן",
                            correction:
                                "הוצאה נרשמת בדוח רווח והפסד. ההתחייבות היא ״משכורות לשלם״.",
                            reason: "המאזן מראה חובות (סטוק), לא זרימה של כסף (פלואו).",
                        },
                        {
                            mistake: "בלבול בין ״לקוחות״ ל״ספקים״",
                            correction: "לקוחות חייבים לנו כסף (נכס). אנחנו חייבים כסף לספקים (התחייבות).",
                            reason: "תמיד תשאלו: למי הכסף זורם?",
                        },
                    ]}
                />
            </ChapterTabPanel>

            {/* 
        TAB 3: PRACTICE (תרגול)
        Sections: [8] Interactive, [9] Checkpoint, [10] Guided, [11] Independent
      */}
            <ChapterTabPanel id="practice" className="space-y-12">
                {/* [8] INTERACTIVE (Placeholder for now) */}
                <SectionWrapper id="interactive" sectionNumber={8} title="מעבדת המאזן">
                    <div className="h-64 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                        [כאן יבוא רכיב סיווג אינטראקטיבי: גרירת סעיפים לצד ימין או שמאל]
                    </div>
                </SectionWrapper>

                {/* [9] CHECKPOINT */}
                <CheckpointQuiz
                    questions={[
                        {
                            id: "q1",
                            text: "מהי המשוואה החשבונאית הבסיסית?",
                            options: [
                                "נכסים - התחייבויות = 0",
                                "נכסים = התחייבויות + הון עצמי",
                                "רווח = הכנסות - הוצאות",
                                "נכסים + התחייבויות = הון עצמי",
                            ],
                            correctIndex: 1,
                            explanation: "המשוואה תמיד מאוזנת: הנכסים (מה יש לי) ממומנים על ידי התחייבויות (כסף זר) והון עצמי (כסף שלי).",
                        },
                        {
                            id: "q2",
                            text: "היכן נסווג 'מחשב נייד' שנקנה לשימוש המשרד?",
                            options: [
                                "הוצאה שוטפת",
                                "רכוש קבוע (נכס לא שוטף)",
                                "מלאי",
                                "הוצאות הנהלה וכלליות",
                            ],
                            correctIndex: 1,
                            explanation: "מחשב צפוי לשמש את העסק למעל שנה, ולכן הוא רכוש קבוע ולא הוצאה מיידית.",
                        },
                    ]}
                />

                {/* [10] GUIDED EXERCISE */}
                <GuidedExercise
                    question="חברת 'הבונה' רכשה מכונה בעלות 100,000 ש״ח. 20,000 ש״ח שולמו במזומן והיתרה באשראי לספק. כיצד תשפיע הפעולה על המאזן?"
                    difficulty={1}
                    thinkingDirection="נזהה אילו סעיפים במאזן משתנים ונבדוק שמשוואת המאזן נשמרת."
                    steps={[
                        {
                            title: "זיהוי הנכס החדש",
                            action: "רישום המכונה כנכס.",
                            reason: "קיבלנו משאב חדש לעסק.",
                            calculation: "(+) רכוש קבוע: 100,000",
                            result: "סך נכסים גדל ב-100K",
                        },
                        {
                            title: "זיהוי הירידה במזומן",
                            action: "הפחתת המזומן ששולם.",
                            reason: "יצא כסף מהקופה.",
                            calculation: "(-) מזומן: 20,000",
                            result: "נכסים ירדו ב-20K (נטו עד כאן +80K)",
                        },
                        {
                            title: "זיהוי יצירת ההתחייבות",
                            action: "רישום חוב לספק.",
                            reason: "לא שילמנו את הכל, נוצר חוב.",
                            calculation: "(+) ספקים: 80,000",
                            result: "התחייבויות גדלו ב-80K",
                        },
                    ]}
                    finalAnswer="צד הנכסים גדל ב-80,000 (100-20), וצד ההתחייבויות גדל ב-80,000. המאזן מאוזן."
                />

                {/* [11] INDEPENDENT EXERCISE */}
                <IndependentExercise
                    question="חברה הנפיקה מניות וקיבלה תמורתן 500,000 ש״ח במזומן. נתחו את השינוי במאזן."
                    difficulty={3}
                    hint="זכרו שצד אחד הוא הנכס שקיבלנו (כסף), וצד שני הוא מקור המימון (בעלים)."
                    answer="נכסים (מזומן) גדלו ב-500,000. הון עצמי (הון מניות) גדל ב-500,000. המאזן מאוזן."
                />
            </ChapterTabPanel>

            {/* 
        TAB 4: SUMMARY (סיכום)
        Sections: [12] Street Summary, [13] Reference, [14] Trivia, [15] Bridge
      */}
            <ChapterTabPanel id="summary" className="space-y-8">
                {/* [12] STREET SUMMARY */}
                {/* [12] STREET SUMMARY */}
                <SectionWrapper id="street-summary" sectionNumber={12} title="סיכום רחוב">
                    <div className="bg-slate-900/80 p-6 rounded-xl border-l-4 border-teal-500 shadow-lg">
                        <div className="flex gap-4">
                            <div className="shrink-0 pt-1">
                                <div className="p-2 bg-teal-500/10 rounded-full text-teal-400">
                                    <Lightbulb size={24} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-teal-100 text-lg">בקיצור נמרץ</h4>
                                <p className="text-slate-300 leading-relaxed">
                                    המאזן הוא רשימת מלאי של מה שיש לכם (נכסים) ומי מימן את
                                    זה (חובות או הון עצמי). הנכסים תמיד יהיו שווים לסכום של החובות
                                    וההון העצמי, אחרת רואה החשבון שלכם עשה פאדיחה.
                                </p>
                                <div className="pt-2 flex flex-wrap gap-2">
                                    <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">
                                        שוטף = קצר (עד שנה)
                                    </span>
                                    <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">
                                        לא שוטף = ארוך
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* [13] REFERENCE CARD */}
                <SectionWrapper id="reference" sectionNumber={13}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center hover:border-teal-500/30 transition-colors">
                            <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-handwriting font-bold">משוואת המאזן</span>
                            <div className="text-xl md:text-2xl text-teal-400 font-bold font-handwriting dir-rtl">
                                נכסים = התחייבויות + הון עצמי
                            </div>
                            <div className="text-sm text-slate-500 mt-2 font-mono dir-ltr">
                                Assets = Liabilities + Equity
                            </div>
                        </div>
                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center hover:border-purple-500/30 transition-colors">
                            <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-handwriting font-bold">הון חוזר (Working Capital)</span>
                            <div className="text-xl md:text-2xl text-purple-400 font-bold font-handwriting dir-rtl">
                                נכסים שוטפים - התחייבויות שוטפות
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* [14] TRIVIA (Using basic ToneBreak style for now or simple box) */}
                <SectionWrapper id="trivia" sectionNumber={14}>
                    <div className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-lg flex items-center gap-4">
                        <Lightbulb className="text-indigo-400 shrink-0" />
                        <p className="text-sm text-indigo-200">
                            הידעת? המאזן הראשון בהיסטוריה תועד כנראה בוונציה של המאה ה-15 ע״י לוקה פאצ'ולי, אבי החשבונאות הכפולה.
                        </p>
                    </div>
                </SectionWrapper>

                {/* [15] BRIDGE */}
                <SectionWrapper id="bridge" sectionNumber={15}>
                    <div className="text-center py-12">
                        <Anchor className="mx-auto text-slate-600 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-slate-400 mb-2">לאן ממשיכים?</h3>
                        <p className="text-slate-500">
                            בפרק הבא ניכנס לסרט עצמו: דוח רווח והפסד, ונראה איך העסק באמת מייצר כסף (או שורף אותו) לאורך השנה.
                        </p>
                    </div>
                </SectionWrapper>

            </ChapterTabPanel>
        </MasterPageLayout>
    );
}
