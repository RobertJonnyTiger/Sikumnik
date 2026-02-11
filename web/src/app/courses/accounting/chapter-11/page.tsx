"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-11.json";
import dynamic from "next/dynamic";
const ConceptCard = dynamic(() => import("@/components/accounting/ConceptCard").then(m => m.ConceptCard), { ssr: true });
const CalculationBlock = dynamic(() => import("@/components/accounting/CalculationBlock").then(m => m.CalculationBlock), { ssr: true });
const InteractiveExercise = dynamic(() => import("@/components/accounting/InteractiveExercise").then(m => m.InteractiveExercise), { ssr: false });
import { GlassCard } from "@/components/ui/glass-card";
import { ChevronDown, ChevronUp, Percent, AlertCircle } from "lucide-react";
import { PageMap } from "@/components/accounting/PageMap";

interface Section {
    type: string;
    title: string;
    academic_text?: string;
    analogy_text?: string;
    formula_visual?: string;
    variables?: any[];
    steps?: string[];
    analogy_note?: string;
}

interface WorkedData {
    item: string;
    value: string;
}

export default function Chapter11Page() {
    const data: any = chapterData;
    const [showWorkedExample, setShowWorkedExample] = useState(false);
    let conceptIndex = 0;

    return (
        <div className="w-full px-6 lg:px-12 xl:px-16 py-8 max-w-[1600px] mx-auto">
            <PageMap
                title={data.title}
                summary={data.summary}
                data={data.pageMap}
                currentChapter={data.chapterNumber}
                totalChapters={data.totalChapters}
            />

            <div className="max-w-5xl mx-auto">

                {/* Key Formula Banner */}
                <div className="mb-8 p-5 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 rounded-xl border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Percent className="w-6 h-6 text-blue-400" />
                        <h3 className="text-xl font-bold text-white">הנוסחאות המרכזיות</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                            <h4 className="text-blue-400 font-medium mb-2">חישוב הפרשה נדרשת</h4>
                            <p className="text-xl font-mono text-white">יתרת לקוחות × אחוז חומ"ס</p>
                        </div>
                        <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
                            <h4 className="text-cyan-400 font-medium mb-2">חישוב הוצאת חומ"ס</h4>
                            <p className="text-xl font-mono text-white">הפרשה נדרשת − יתרה קיימת</p>
                        </div>
                    </div>
                </div>

                {/* Important Distinction Box */}
                <div className="mb-8 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <h4 className="text-amber-400 font-medium">הבחנה קריטית!</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-amber-300 font-medium">הפרשה נדרשת</p>
                            <p className="text-slate-300">= יתרה שצריכה להיות בסוף</p>
                        </div>
                        <div>
                            <p className="text-amber-300 font-medium">הוצאות חומ"ס</p>
                            <p className="text-slate-300">= מה לרשום בדוח רו"ה השנה</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm mt-3">💡 אם יש יתרת הפרשה מהשנה שעברה - ההוצאה תהיה רק ההפרש!</p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {chapterData.sections.map((section: Section, index: number) => {
                        if (section.type === "concept") {
                            const currentConceptIndex = conceptIndex++;
                            return (
                                <ConceptCard
                                    key={index}
                                    index={currentConceptIndex}
                                    title={section.title}
                                    academicText={section.academic_text || ""}
                                    analogyText={section.analogy_text || ""}
                                />
                            );
                        }
                        if (section.type === "calculation") {
                            return <CalculationBlock key={index} data={section as any} />;
                        }
                        return null;
                    })}

                    {/* Worked Example */}
                    {chapterData.worked_example && (
                        <div className="mt-12">
                            <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                                <button
                                    onClick={() => setShowWorkedExample(!showWorkedExample)}
                                    className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                                            תרגיל מודרך
                                        </span>
                                        <span className="text-slate-300 font-medium">{chapterData.worked_example.title}</span>
                                    </div>
                                    {showWorkedExample ? (
                                        <ChevronUp className="w-5 h-5 text-slate-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                    )}
                                </button>
                                {showWorkedExample && (
                                    <div className="p-6 pt-2 border-t border-slate-800 space-y-6">
                                        <p className="text-slate-300">{chapterData.worked_example.scenario}</p>

                                        {/* Data */}
                                        <div className="grid grid-cols-2 gap-3">
                                            {chapterData.worked_example.data.map((row: WorkedData, idx: number) => (
                                                <div key={idx} className="bg-slate-800/50 p-3 rounded-lg">
                                                    <p className="text-slate-400 text-sm">{row.item}</p>
                                                    <p className="text-white font-medium">{row.value}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Questions */}
                                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                            <h4 className="text-blue-400 font-medium mb-2">שאלות:</h4>
                                            <ul className="space-y-1">
                                                {chapterData.worked_example.questions.map((q: string, idx: number) => (
                                                    <li key={idx} className="text-slate-300">{q}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Solution */}
                                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700">
                                            <h4 className="text-green-400 font-medium mb-3">פתרון מלא:</h4>
                                            <div className="space-y-1 font-mono text-sm">
                                                {chapterData.worked_example.solution_steps.map((step: string, idx: number) => (
                                                    <p key={idx} className={`text-slate-300 ${step === '' ? 'h-2' : ''} ${step.startsWith('📌') ? 'text-blue-400 font-medium mt-3' : ''} ${step.startsWith('ח\'') || step.startsWith('ז\'') || step.includes('ח\'') ? 'text-amber-300 pr-4' : ''}`}>
                                                        {step}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Key Insight */}
                                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                                            <p className="text-amber-300">💡 {chapterData.worked_example.key_insight}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Exercises */}
                    {chapterData.exercises && chapterData.exercises.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-white mb-6">בדוק את עצמך</h2>
                            <div className="space-y-6">
                                {chapterData.exercises.map((exercise: any, idx: number) => (
                                    <InteractiveExercise
                                        key={idx}
                                        question={exercise.question}
                                        solution={exercise.solution}
                                        tip={exercise.tip}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
