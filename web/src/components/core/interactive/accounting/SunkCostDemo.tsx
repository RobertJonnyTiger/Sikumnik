"use client";

import React from 'react';
import { DeepDive } from '@/components/core/enhanced/DeepDive';
import { ToneBreak } from '@/components/core/master-page/ToneBreak';
import { IndependentExercise } from '@/components/core/master-page/IndependentExercise';

export const SunkCostDemo = () => {
    const [mode, setMode] = React.useState<'academic' | 'casual'>('academic');

    const content = {
        topic: "Sunk Cost (עלות שקועה)",
        academic: {
            title: "הגדרת עלות שקועה (Sunk Cost)",
            content: "**עלות שקועה** היא עלות שנוצרה בעבר ואינה ניתנת להחזר (Irrecoverable). מדובר בהוצאה שקרתה כבר, ולכן **אין לה רלוונטיות** לקבלת החלטות עתידיות.",
            formula: "$$ \\pi_{future} = R_{future} - C_{future} $$",
            keywords: ["עלות שקועה", "קבלת החלטות", "רלוונטיות"]
        },
        casual: {
            title: "תכלס: כרטיס לסרט גרוע",
            analogy: "שילמת 50 שקל על כרטיס לקולנוע? אחרי 10 דקות הבנת שהסרט פח אשפה? מה אתה עושה?",
            hook: "הכסף הלך. הזמן שלך עדיין שלך.",
            punchline: "אם תישאר לסבול, אתה מפסיד פעמיים: גם את ה-50 שקל, וגם שעתיים מהחיים."
        },
        exercise: {
            title: "מלכודת חשיבה: הפרויקט האבוד",
            question: "חברה השקיעה 10 מיליון בפיתוח מוצר. נדרש עוד מיליון אחד לסיום. הצפי להכנסות הוא 2 מיליון. האם להמשיך?",
            options: [
                "לא, כי עלות כוללת (11M) גדולה מהכנסה (2M) -> הפסד של 9M.",
                "כן, כי הכנסה עתידית (2M) גדולה מעלות עתידית (1M) -> רווח של 1M.",
                "אדיש, כי מפסידים כסף בכל מקרה."
            ],
            answer: "כן, כי הכנסה עתידית (2M) גדולה מעלות עתידית (1M) -> רווח של 1M.",
            explanation: "ה-10 מיליון הם עלות שקועה. הם הלכו. מסתכלים רק קדימה: להוציא 1 לקבל 2 -> רווח של 1. לעצור זה לקבל 0."
        }
    };

    return (
        <div className="space-y-8 p-8 max-w-4xl mx-auto font-main" dir="rtl">
            <h1 className="text-4xl font-black text-white mb-8 border-b border-white/10 pb-4">
                Sikumnik Agent Verification: <span className="text-primary">Sunk Cost</span>
            </h1>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-slate-900 p-1 rounded-xl flex gap-1 border border-slate-800">
                    <button
                        onClick={() => setMode('academic')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${mode === 'academic'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            }`}
                    >
                        👨‍🏫 האקדמיה
                    </button>
                    <button
                        onClick={() => setMode('casual')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${mode === 'casual'
                                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                            }`}
                    >
                        😎 תכלס
                    </button>
                </div>
            </div>

            {/* Territory A: The Professor */}
            {mode === 'academic' && (
                <div className="relative animate-in fade-in zoom-in duration-300">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 to-transparent opacity-50" />
                    <DeepDive
                        title={content.academic.title}
                        data={{
                            definition: content.academic.content,
                            formula: content.academic.formula,
                            explanation: "When calculating future profit, we only look at future Revenue (R) and future Costs (C). The Sunk Cost is not in the equation."
                        }}
                        domain="accounting"
                    />
                </div>
            )}

            {/* Territory B: The Street Smart */}
            {mode === 'casual' && (
                <div className="relative animate-in fade-in zoom-in duration-300">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-pink-500 to-transparent opacity-50" />
                    <ToneBreak
                        opener={content.casual.title}
                        content={[content.casual.analogy, content.casual.hook, content.casual.punchline]}
                    />
                </div>
            )}

            {/* Territory C: The Puzzle Master */}
            <div className="relative mt-12 pt-8 border-t border-white/5">
                <div className="absolute -left-4 top-8 bottom-0 w-1 bg-linear-to-b from-purple-500 to-transparent opacity-50" />
                <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                    <span>🧩</span>
                    <span>The Puzzle Master Assessment</span>
                </h3>
                <IndependentExercise
                    title={content.exercise.title}
                    question={content.exercise.question}
                    options={content.exercise.options}
                    difficulty={3}
                    hint="ה-10 מיליון שייכים לעבר. הם לא רלוונטיים להחלטה של היום."
                    answer={`${content.exercise.answer}\n\n${content.exercise.explanation}`}
                    isExamStyle={true}
                />
            </div>
        </div>
    );
};
