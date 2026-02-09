"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-10.json";
import dynamic from "next/dynamic";
const ConceptCard = dynamic(() => import("@/components/accounting/ConceptCard").then(m => m.ConceptCard), { ssr: true });
const CalculationBlock = dynamic(() => import("@/components/accounting/CalculationBlock").then(m => m.CalculationBlock), { ssr: true });
const InteractiveExercise = dynamic(() => import("@/components/accounting/InteractiveExercise").then(m => m.InteractiveExercise), { ssr: false });
import { GlassCard } from "@/components/ui/glass-card";
import { Building2, ChevronDown, ChevronUp, TrendingDown } from "lucide-react";

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

export default function Chapter10Page() {
    const [showWorkedExample, setShowWorkedExample] = useState(false);
    let conceptIndex = 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-slate-500/20 to-zinc-500/20 border border-slate-500/30">
                        <Building2 className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{chapterData.title}</h1>
                        <p className="text-slate-400 mt-1">פחת בשיטת קו ישר ומכירת רכוש קבוע</p>
                    </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">{chapterData.summary}</p>
            </div>

            {/* Key Formula Banner */}
            <div className="mb-8 p-5 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingDown className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">הנוסחה המרכזית</h3>
                </div>
                <div className="text-center py-4">
                    <p className="text-2xl font-mono text-indigo-300 mb-4">
                        פחת = בסיס הפחת × אחוז לשנה × תקופה
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                            <p className="text-blue-400 font-medium">בסיס הפחת</p>
                            <p className="text-slate-300">עלות − ערך שייר</p>
                        </div>
                        <div className="bg-indigo-500/10 rounded-lg p-3 border border-indigo-500/20">
                            <p className="text-indigo-400 font-medium">אחוז לשנה</p>
                            <p className="text-slate-300">100 ÷ שנות חיים</p>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                            <p className="text-purple-400 font-medium">תקופה</p>
                            <p className="text-slate-300">חודשים ÷ 12</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-500/20">
                    <p className="text-slate-400 text-sm text-center">
                        💡 <span className="text-indigo-300">100 ÷ שנים = אחוז</span> | <span className="text-indigo-300">100 ÷ אחוז = שנים</span>
                    </p>
                </div>
            </div>

            {/* Period Notation Quick Reference */}
            <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-white font-medium mb-3">📅 ייצוג תקופות - מדריך מהיר</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-slate-400">3 חודשים</p>
                        <p className="text-white font-mono">3/12</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-slate-400">חצי שנה</p>
                        <p className="text-white font-mono">6/12</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-slate-400">שנה שלמה</p>
                        <p className="text-white font-mono">1</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/50 rounded">
                        <p className="text-slate-400">שנה וחצי</p>
                        <p className="text-white font-mono">1 6/12</p>
                    </div>
                </div>
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
                                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-sm">
                                        תרגיל מודרך מקיף
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
                                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                                        <h4 className="text-indigo-400 font-medium mb-2">שאלות:</h4>
                                        <ul className="space-y-1">
                                            {chapterData.worked_example.questions.map((q: string, idx: number) => (
                                                <li key={idx} className="text-slate-300">{q}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Solution */}
                                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700">
                                        <h4 className="text-green-400 font-medium mb-3">פתרון מלא:</h4>
                                        <div className="space-y-1">
                                            {chapterData.worked_example.solution_steps.map((step: string, idx: number) => (
                                                <p key={idx} className={`text-slate-300 ${step === '' ? 'h-2' : ''} ${step.startsWith('📌') || step.startsWith('📘') ? 'text-blue-400 font-medium mt-3' : ''}`}>
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
    );
}
