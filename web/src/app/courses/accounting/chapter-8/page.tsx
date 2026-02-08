"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-8.json";
import { ConceptCard } from "@/components/accounting/ConceptCard";
import { CalculationBlock } from "@/components/accounting/CalculationBlock";
import { InteractiveExercise } from "@/components/accounting/InteractiveExercise";
import { GlassCard } from "@/components/ui/glass-card";
import { Package, ChevronDown, ChevronUp } from "lucide-react";

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
    units: number;
    unit_cost: number;
    total: number;
}

export default function Chapter8Page() {
    const [showWorkedExample, setShowWorkedExample] = useState(false);
    let conceptIndex = 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                        <Package className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{chapterData.title}</h1>
                        <p className="text-slate-400 mt-1">מבוא לשיטות חישוב מלאי</p>
                    </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">{chapterData.summary}</p>
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
                                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-sm">
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

                                    {/* Data Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-right">
                                            <thead>
                                                <tr className="border-b border-slate-700">
                                                    <th className="py-2 px-3 text-slate-400">פריט</th>
                                                    <th className="py-2 px-3 text-slate-400">יחידות</th>
                                                    <th className="py-2 px-3 text-slate-400">עלות ליחידה</th>
                                                    <th className="py-2 px-3 text-slate-400">סה"כ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {chapterData.worked_example.data.map((row: WorkedData, idx: number) => (
                                                    <tr key={idx} className="border-b border-slate-800">
                                                        <td className="py-2 px-3 text-slate-300">{row.item}</td>
                                                        <td className="py-2 px-3 text-slate-300">{row.units}</td>
                                                        <td className="py-2 px-3 text-slate-300">{row.unit_cost.toLocaleString()} ₪</td>
                                                        <td className="py-2 px-3 text-emerald-400 font-medium">{row.total.toLocaleString()} ₪</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <p className="text-slate-300 bg-slate-800/50 p-3 rounded-lg">{chapterData.worked_example.sales_info}</p>

                                    {/* Solution Steps */}
                                    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg p-4 border border-emerald-500/20">
                                        <h4 className="text-emerald-400 font-medium mb-3">פתרון:</h4>
                                        <div className="space-y-1">
                                            {chapterData.worked_example.solution_steps.map((step: string, idx: number) => (
                                                <p key={idx} className={`text-slate-300 ${step === '' ? 'h-2' : ''}`}>
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
