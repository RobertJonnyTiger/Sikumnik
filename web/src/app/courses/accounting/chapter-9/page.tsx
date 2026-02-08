"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-9.json";
import { ConceptCard } from "@/components/accounting/ConceptCard";
import { CalculationBlock } from "@/components/accounting/CalculationBlock";
import { InteractiveExercise } from "@/components/accounting/InteractiveExercise";
import { GlassCard } from "@/components/ui/glass-card";
import { Calculator, ChevronDown, ChevronUp, ArrowRightLeft } from "lucide-react";

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

export default function Chapter9Page() {
    const [showWorkedExample, setShowWorkedExample] = useState(false);
    const [activeTab, setActiveTab] = useState<'fifo' | 'average' | 'comparison'>('fifo');
    let conceptIndex = 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30">
                        <Calculator className="w-8 h-8 text-violet-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{chapterData.title}</h1>
                        <p className="text-slate-400 mt-1">FIFO וממוצע משוקלל</p>
                    </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">{chapterData.summary}</p>
            </div>

            {/* Quick Methods Comparison Banner */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-3 mb-3">
                    <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-medium text-white">השוואה מהירה בין השיטות</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                        <h4 className="text-blue-400 font-medium mb-2">🔵 FIFO - נכנס ראשון, יוצא ראשון</h4>
                        <p className="text-slate-300 text-sm">הישן נמכר קודם → עלות מכר במחירים ישנים → מלאי סגירה במחירים חדשים</p>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                        <h4 className="text-green-400 font-medium mb-2">🟢 ממוצע משוקלל</h4>
                        <p className="text-slate-300 text-sm">מחיר ממוצע לכולם → עלות מכר ומלאי סגירה באותו מחיר ממוצע</p>
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

                {/* Worked Example with Tabs */}
                {chapterData.worked_example && (
                    <div className="mt-12">
                        <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                            <button
                                onClick={() => setShowWorkedExample(!showWorkedExample)}
                                className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="px-2 py-1 bg-violet-500/20 text-violet-300 rounded text-sm">
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
                                                        <td className="py-2 px-3 text-violet-400 font-medium">{row.total.toLocaleString()} ₪</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <p className="text-slate-300 bg-slate-800/50 p-3 rounded-lg">{chapterData.worked_example.sales_info}</p>

                                    {/* Tabs for solutions */}
                                    <div className="flex gap-2 border-b border-slate-700">
                                        <button
                                            onClick={() => setActiveTab('fifo')}
                                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'fifo'
                                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                                    : 'text-slate-400 hover:text-slate-300'
                                                }`}
                                        >
                                            📘 FIFO
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('average')}
                                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'average'
                                                    ? 'text-green-400 border-b-2 border-green-400'
                                                    : 'text-slate-400 hover:text-slate-300'
                                                }`}
                                        >
                                            📗 ממוצע
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('comparison')}
                                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'comparison'
                                                    ? 'text-purple-400 border-b-2 border-purple-400'
                                                    : 'text-slate-400 hover:text-slate-300'
                                                }`}
                                        >
                                            📊 השוואה
                                        </button>
                                    </div>

                                    {/* Tab Content */}
                                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700">
                                        {activeTab === 'fifo' && (
                                            <div className="space-y-1">
                                                {chapterData.worked_example.fifo_solution.map((step: string, idx: number) => (
                                                    <p key={idx} className={`text-slate-300 ${step === '' ? 'h-2' : ''} ${step.startsWith('📘') ? 'text-blue-400 font-medium text-lg' : ''}`}>
                                                        {step}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                        {activeTab === 'average' && (
                                            <div className="space-y-1">
                                                {chapterData.worked_example.average_solution.map((step: string, idx: number) => (
                                                    <p key={idx} className={`text-slate-300 ${step === '' ? 'h-2' : ''} ${step.startsWith('📗') ? 'text-green-400 font-medium text-lg' : ''}`}>
                                                        {step}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                        {activeTab === 'comparison' && (
                                            <div className="space-y-1">
                                                {chapterData.worked_example.comparison.map((step: string, idx: number) => (
                                                    <p key={idx} className={`text-slate-300 ${step === '' ? 'h-2' : ''} ${step.startsWith('📊') ? 'text-purple-400 font-medium text-lg' : ''} font-mono`}>
                                                        {step}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
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
