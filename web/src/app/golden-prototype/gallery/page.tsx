"use client";

import React from "react";
import { MasterPageLayout } from "@/components/core/master-page/MasterPageLayout";
import { SectionWrapper } from "@/components/core/master-page/SectionWrapper";
import { DefinitionBlock } from "@/components/core/master-page/DefinitionBlock";
import { ToneBreak } from "@/components/core/master-page/ToneBreak";
import { TeaserAnalogy } from "@/components/core/master-page/TeaserAnalogy";
import { CommonMistakes } from "@/components/core/master-page/CommonMistakes";
import { InteractiveEquation } from "@/components/core/master-page/InteractiveEquation";
import { CheckpointQuiz } from "@/components/core/master-page/CheckpointQuiz";
import { GuidedExercise } from "@/components/core/master-page/GuidedExercise";
import { IndependentExercise } from "@/components/core/master-page/IndependentExercise";
import { HandwrittenNote } from "@/components/core/master-page/HandwrittenNote";
import { PageMap } from "@/components/core/master-page/PageMap";
import { DeepDive } from "@/components/core/master-page/DeepDive";
import { ReferenceCard } from "@/components/core/master-page/ReferenceCard";
import { TriviaCard } from "@/components/core/master-page/TriviaCard";
import { ChapterBridge } from "@/components/core/master-page/ChapterBridge";
import { TermTooltip } from "@/components/core/master-page/TermTooltip";
import { StreetLevelSummary } from "@/components/core/master-page/StreetLevelSummary";

export default function ComponentGalleryPage() {
    return (
        <MasterPageLayout chapterTitle="Component Gallery (Fine-Tuning)">
            <div className="space-y-16 pb-24">

                {/* 1. TYPOGRAPHY & HANDWRITING */}
                <SectionWrapper id="typography" sectionNumber={1} title="טיפוגרפיה וקול (מעבדת פונטים)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-teal-400 mb-4 font-bold">טקסט סטנדרטי (Noto Sans)</h4>
                            <p className="text-slate-300">
                                זהו טקסט הגוף הסטנדרטי המשמש להסברים אקדמיים. נקי, קריא ומקצועי. מתאים להסברים ארוכים ולוגיקה.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-yellow-400 mb-4 font-handwriting font-bold text-xl">קול הסטודנט (Playpen Sans)</h4>
                            <HandwrittenNote
                                content="אני פתק צדדי! מרגיש כמו משהו שסטודנט כתב במחברת. מעולה לטיפים, קיצורי דרך או תרגומים."
                                color="yellow"
                                rotation={-2}
                            />
                            <div className="mt-8">
                                <HandwrittenNote
                                    content="אני פתק בעברית! הפונט הזה נראה כמו כתב יד אמיתי ומרגיש ידידותי יותר."
                                    color="blue"
                                    rotation={1}
                                />
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* 1A. PAGE MAP (SYLLABUS) */}
                <SectionWrapper id="pagemap" sectionNumber={1.5} title="מפת העמוד (Page Map)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PageMap
                            items={[
                                { id: "1", title: "הקדמה", status: "completed" },
                                { id: "2", title: "מושגי יסוד", status: "current" },
                                { id: "3", title: "תרגול", status: "upcoming" },
                                { id: "4", title: "סיכום", status: "upcoming" },
                            ]}
                        />
                        <div className="flex items-center justify-center text-slate-500 bg-slate-950/30 rounded-xl border border-dashed border-slate-800 p-8">
                            (מיקום: בדרך כלל בסרגל צד או בראש העמוד)
                        </div>
                    </div>
                </SectionWrapper>

                {/* 1B. DEEP DIVE */}
                <SectionWrapper id="deepdive" sectionNumber={1.6} title="העמקה (Deep Dive)">
                    <DeepDive title="למה ההון העצמי מתנהג כמו התחייבות?">
                        <p>
                            היסטורית, הון עצמי נתפס כסכום שהעסק <strong>חייב</strong> לבעלים שלו.
                            ממש כמו שהלוואה היא חוב לבנק, הון מניות הוא חוב לבעלי המניות.
                        </p>
                        <p className="mt-4">
                            לכן שניהם מופיעים ב<strong>צד שמאל</strong> (צד הזכות) של המאזן לפי ההיגיון החשבונאי.
                        </p>
                    </DeepDive>
                </SectionWrapper>

                {/* 2. DEFINITION BLOCKS */}
                <SectionWrapper id="definitions" sectionNumber={2} title="הגדרות ומונחים">
                    <div className="space-y-8">
                        <DefinitionBlock
                            title="הגדרה בודדת"
                            definitions={[
                                { term: "נכס", definition: "משאב בעל ערך כלכלי שנמצא בבעלות או בשליטת אדם, תאגיד או מדינה, מתוך ציפייה שיניב תועלת כלכלית בעתיד." }
                            ]}
                        />
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                            <h4 className="text-slate-400 text-sm font-bold mb-2">הדגמת מונחון (Tooltip):</h4>
                            <p className="text-slate-300 leading-relaxed">
                                בחשבונאות, לכל פעולה יש צד של <TermTooltip term="חובה" definition="הצד שמקבל (ימין)" /> וצד של <TermTooltip term="זכות" definition="הצד שנותן (שמאל)" />.
                                זהו הבסיס לשיטה הכפולה.
                            </p>
                        </div>
                    </div>
                </SectionWrapper>

                {/* ... */}

                {/* 5. MISTAKES */}
                <SectionWrapper id="mistakes" sectionNumber={5} title="טעויות נפוצות">
                    <CommonMistakes
                        introText="במאזן ספציפית, שמנו לב שסטודנטים נוטים להתבלבל בתאריך. המאזן הוא תמונת מצב לרגע נתון, לא סרט נע."
                        mistakes={[
                            { mistake: "בלבול בין חובה לזכות", correction: "חובה זה ימין, זכות זה שמאל.", reason: "תמיד." },
                            { mistake: "התעלמות מהתאריך", correction: "מאזן הוא 'ליייום', דוח רווח והפסד הוא 'לשנה'.", reason: "נקודה בזמן מול תקופה." }
                        ]}
                    />
                </SectionWrapper>


                {/* 5A. REFERENCE CARD */}
                <SectionWrapper id="reference-card" sectionNumber={5.5} title="כרטיסיית נוסחאות">
                    <ReferenceCard
                        formulas={[
                            { label: "נכסים", formula: "נכסים = התחייבויות + הון", subtext: "A = L + E" },
                            { label: "התחייבויות", formula: "חובות = התחייבות שוטפת + זמן ארוך", subtext: "L = CL + LTL" },
                            { label: "רווח", formula: "רווח = הכנסות - הוצאות", subtext: "Revenue - Expenses" }
                        ]}
                    />
                </SectionWrapper>

                {/* 5B. TRIVIA CARD */}
                <SectionWrapper id="trivia" sectionNumber={5.6} title="הידעת?">
                    <TriviaCard
                        fact="הקונספט של 'הנהלת חשבונות כפולה' תועד לראשונה על ידי לוקה פאצ'ולי ב-1494, שהיה חבר קרוב של לאונרדו דה וינצ'י."
                        source="היסטוריה של החשבונאות"
                    />
                </SectionWrapper>

                {/* 5C. INTERACTIVE EQUATION */}
                <SectionWrapper id="interactive-equation" sectionNumber={5.7} title="משוואה אינטראקטיבית">
                    <InteractiveEquation
                        title="משוואת המאזן (חשב את הנעלם)"
                        description="השלם את המספר החסר כדי שהמשוואה תתקיים: נכסים = התחייבויות + הון"
                        chunks={[
                            { type: "number", value: 1000, label: "נכסים", connotation: "positive" },
                            { type: "operator", value: "=" },
                            { type: "input", id: "liabilities", label: "התחייבויות", correctAnswer: 400, placeholder: "?" },
                            { type: "operator", value: "+" },
                            { type: "number", value: 600, label: "הון עצמי", connotation: "positive" }
                        ]}
                        className="max-w-3xl mx-auto"
                    />
                </SectionWrapper>

                {/* 6. QUIZZES */}
                <SectionWrapper id="quizzes" sectionNumber={6} title="שאלת בדיקה">
                    <CheckpointQuiz
                        questions={[
                            {
                                id: "q1",
                                text: "האם זה מבחן?",
                                options: ["כן", "לא", "אולי"],
                                correctIndex: 0,
                                explanation: "כן, זו בדיקה מובחנת לרכיב השאלות."
                            }
                        ]}
                    />
                </SectionWrapper>

                {/* 6A. STREET-LEVEL SUMMARY */}
                <SectionWrapper id="street-summary" sectionNumber={6.5} title="סיכום בגובה העיניים">
                    <StreetLevelSummary
                        intro="טוב, בואו נעשה רגע סטופ. קראנו המון הגדרות יבשות, בואו נבין מה זה אומר בחיים האמיתיים שלכם בין שיעור לשיעור."
                        points={[
                            {
                                title: "המאזן הוא לא סיפור, הוא תמונה",
                                content: "תחשבו על זה כמו סטורי באינסטגרם — זה מה שקורה בדיוק ברגע הזה. לא אתמול, לא מחר."
                            },
                            {
                                title: "הכסף תמיד מגיע מאיפשהו",
                                content: "אם יש לכם שקל (נכס), או שהוא שלכם (הון) או שמישהו הלווה לכם אותו (התחייבות). פשוט ככה."
                            }
                        ]}
                        closing="בקיצור, פשוט תוודאו שהצדדים שווים ואתם בטוב."
                    />
                </SectionWrapper>

                {/* 7. EXERCISES - SIDE BY SIDE */}
                <SectionWrapper id="exercises" sectionNumber={7} title="תרגול (לצד)">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                        {/* Left Col: Guided */}
                        <GuidedExercise
                            question="חברת 'בונה' רכשה מכונה בעלות של 100,000 ש״ח. התשלום בוצע במזומן. חשבו את השינוי במאזן."
                            difficulty={1}
                            thinkingDirection="חשבו קודם על תזרים המזומנים (מה יצא?), ואז על הנכס החדש (מה נכנס?)."
                            steps={[
                                { title: "שלב 1", action: "זיהוי יציאת מזומן", reason: "הכסף יצא מהקופה.", calculation: "-100,000", result: "מזומן ירד." },
                                { title: "שלב 2", action: "זיהוי כניסת נכס", reason: "המכונה נכנסה לרשות החברה.", calculation: "+100,000", result: "רכוש קבוע עלה." }
                            ]}
                            finalAnswer="המאזן נשמר (שינוי פנימי בנכסים)."
                        />

                        {/* Right Col: Independent */}
                        <div className="space-y-6">
                            <div className="bg-slate-900/50 p-4 border border-dashed border-slate-700 rounded-lg text-center text-slate-500 mb-4">
                                (פריסת צד-לצד חוסכת גובה מסך)
                            </div>
                            <IndependentExercise
                                title="נסו בעצמכם"
                                question="נסו לבד: לקוח שילם חוב של 500 ש״ח במזומן."
                                difficulty={3}
                                hint="שימו לב: אין כאן הכנסה חדשה, זו גבייה של חוב קיים."
                                answer="מזומן +500, לקוחות -500."
                            />
                        </div>
                    </div>
                </SectionWrapper>

                {/* 8. NAVIGATION */}
                <SectionWrapper id="navigation" sectionNumber={8} title="ניווט בין פרקים">
                    <ChapterBridge
                        prevChapter={{ id: "intro", title: "פרק 1: מבוא" }}
                        nextChapter={{ id: "pnl", title: "פרק 3: דוח רווח והפסד", description: "צלילה לעומק ההכנסות, ההוצאות והשורה התחתונה." }}
                    />
                </SectionWrapper>

            </div>
        </MasterPageLayout >
    );
}
