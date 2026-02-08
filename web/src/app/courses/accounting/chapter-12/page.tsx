"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-12.json";
import { ConceptCard } from "@/components/accounting/ConceptCard";
import { CalculationBlock } from "@/components/accounting/CalculationBlock";
import { InteractiveExercise } from "@/components/accounting/InteractiveExercise";
import { GlassCard } from "@/components/ui/glass-card";
import { Clock, ChevronDown, ChevronUp, Table, TrendingUp } from "lucide-react";

interface Section {
    type: string;
    title: string;
    academic_text?: string;
    analogy_text?: string;
    formula_visual?: string;
    variables?: any[];
    steps?: string[];
    analogy_note?: string;
    headers?: string[];
    rows?: string[][];
}

interface WorkedData {
    item: string;
    value: string;
}

interface AgingData {
    category: string;
    balance: number;
    rate: number;
}

export default function Chapter12Page() {
    const [showWorkedExample, setShowWorkedExample] = useState(false);
    const [showAgingTemplate, setShowAgingTemplate] = useState(false);
    let conceptIndex = 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <Clock className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{chapterData.title}</h1>
                        <p className="text-slate-400 mt-1">שיטה מתקדמת לחישוב הפרשה לחומ"ס</p>
                    </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">{chapterData.summary}</p>
            </div>

            {/* Key Concept Banner */}
            <div className="mb-8 p-5 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">העיקרון המרכזי</h3>
                </div>
                <div className="text-center py-4">
                    <p className="text-2xl text-purple-300 mb-4">
                        ככל שהחוב <span className="font-bold text-pink-400">ישן יותר</span> → אחוז ההפרשה <span className="font-bold text-pink-400">גבוה יותר</span>
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-slate-400">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">0-30 יום: 2%</span>
                        <span>→</span>
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">31-60 יום: 5%</span>
                        <span>→</span>
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded">61-90 יום: 15%</span>
                        <span>→</span>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">90+: 40%+</span>
                    </div>
                </div>
            </div>

            {/* Interactive Aging Table Template */}
            <div className="mb-8 bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                <button
                    onClick={() => setShowAgingTemplate(!showAgingTemplate)}
                    className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-800/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Table className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">📋 תבנית טבלת גיול - לשימוש בתרגילים</span>
                    </div>
                    {showAgingTemplate ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                </button>
                {showAgingTemplate && (
                    <div className="p-6 pt-2 border-t border-slate-800">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-700">
                                        <th className="text-right py-3 px-4 text-purple-400">קטגוריית גיל</th>
                                        <th className="text-right py-3 px-4 text-purple-400">יתרת חוב</th>
                                        <th className="text-right py-3 px-4 text-purple-400">אחוז הפרשה</th>
                                        <th className="text-right py-3 px-4 text-purple-400">הפרשה נדרשת</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-800 bg-green-500/5">
                                        <td className="py-3 px-4 text-green-400">0-30 יום (שוטף)</td>
                                        <td className="py-3 px-4 text-slate-300">___,___</td>
                                        <td className="py-3 px-4 text-slate-300">___%</td>
                                        <td className="py-3 px-4 text-slate-300">= יתרה × אחוז</td>
                                    </tr>
                                    <tr className="border-b border-slate-800 bg-yellow-500/5">
                                        <td className="py-3 px-4 text-yellow-400">31-60 יום</td>
                                        <td className="py-3 px-4 text-slate-300">___,___</td>
                                        <td className="py-3 px-4 text-slate-300">___%</td>
                                        <td className="py-3 px-4 text-slate-300">= יתרה × אחוז</td>
                                    </tr>
                                    <tr className="border-b border-slate-800 bg-orange-500/5">
                                        <td className="py-3 px-4 text-orange-400">61-90 יום</td>
                                        <td className="py-3 px-4 text-slate-300">___,___</td>
                                        <td className="py-3 px-4 text-slate-300">___%</td>
                                        <td className="py-3 px-4 text-slate-300">= יתרה × אחוז</td>
                                    </tr>
                                    <tr className="border-b border-slate-800 bg-red-500/5">
                                        <td className="py-3 px-4 text-red-400">מעל 90 יום</td>
                                        <td className="py-3 px-4 text-slate-300">___,___</td>
                                        <td className="py-3 px-4 text-slate-300">___%</td>
                                        <td className="py-3 px-4 text-slate-300">= יתרה × אחוז</td>
                                    </tr>
                                    <tr className="bg-purple-500/10 font-medium">
                                        <td className="py-3 px-4 text-purple-400">סה"כ</td>
                                        <td className="py-3 px-4 text-white">ΣΣΣ</td>
                                        <td className="py-3 px-4 text-slate-500">-</td>
                                        <td className="py-3 px-4 text-pink-400 font-bold">= הפרשה נדרשת</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-slate-400 text-sm mt-4 text-center">
                            💡 סכום עמודת ההפרשה = הפרשה נדרשת לסוף התקופה
                        </p>
                    </div>
                )}
            </div>

            {/* Comparison Box */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h4 className="text-white font-medium mb-3">📊 השוואה בין השיטות</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                        <p className="text-blue-400 font-medium mb-1">שיטת אחוז מהלקוחות (פרק 11)</p>
                        <p className="text-slate-300">אחוז אחיד × כל הלקוחות</p>
                        <p className="text-slate-400 text-xs mt-1">פשוטה, מהירה, פחות מדויקת</p>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                        <p className="text-purple-400 font-medium mb-1">שיטת גיול חובות (פרק 12)</p>
                        <p className="text-slate-300">אחוז שונה × כל קטגוריית גיל</p>
                        <p className="text-slate-400 text-xs mt-1">מורכבת, מדויקת, שמרנית יותר</p>
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
                    if (section.type === "table") {
                        return (
                            <GlassCard key={index} className="border-l-4 border-l-purple-500/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                        <Table className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{section.title}</h3>
                                </div>

                                <div className="overflow-x-auto bg-slate-900/50 rounded-xl border border-slate-800">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-700 bg-slate-800/50">
                                                {section.headers?.map((h, i) => (
                                                    <th key={i} className="text-right py-3 px-4 text-purple-400 font-medium whitespace-nowrap">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.rows?.map((row, i) => (
                                                <tr key={i} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors last:border-0 ${i === (section.rows?.length || 0) - 1 ? 'bg-purple-500/5 font-medium' : ''}`}>
                                                    {row.map((cell, j) => (
                                                        <td key={j} className={`py-3 px-4 text-slate-300 whitespace-nowrap ${i === (section.rows?.length || 0) - 1 ? 'text-white' : ''}`}>
                                                            {cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {section.analogy_note && (
                                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400 bg-slate-900/30 p-3 rounded-lg border border-slate-800/50">
                                        <span>💡</span>
                                        <span>{section.analogy_note}</span>
                                    </div>
                                )}
                            </GlassCard>
                        );
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
                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
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

                                    {/* Basic Data */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {chapterData.worked_example.data.map((row: WorkedData, idx: number) => (
                                            <div key={idx} className="bg-slate-800/50 p-3 rounded-lg">
                                                <p className="text-slate-400 text-sm">{row.item}</p>
                                                <p className="text-white font-medium">{row.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Aging Data Table */}
                                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                                        <h4 className="text-purple-400 font-medium mb-3">פירוט לפי גיל:</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-purple-500/30">
                                                        <th className="text-right py-2 px-3 text-purple-300">קטגוריה</th>
                                                        <th className="text-right py-2 px-3 text-purple-300">יתרה</th>
                                                        <th className="text-right py-2 px-3 text-purple-300">אחוז</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {chapterData.worked_example.aging_data.map((row: AgingData, idx: number) => (
                                                        <tr key={idx} className="border-b border-purple-500/10">
                                                            <td className="py-2 px-3 text-slate-300">{row.category}</td>
                                                            <td className="py-2 px-3 text-white">{row.balance.toLocaleString()} ₪</td>
                                                            <td className="py-2 px-3 text-slate-300">{row.rate}%</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Questions */}
                                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                                        <h4 className="text-purple-400 font-medium mb-2">שאלות:</h4>
                                        <ul className="space-y-1">
                                            {chapterData.worked_example.questions.map((q: string, idx: number) => (
                                                <li key={idx} className="text-slate-300">{q}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Solution */}
                                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700">
                                        <h4 className="text-green-400 font-medium mb-3">פתרון מלא:</h4>
                                        <div className="space-y-4 text-sm">
                                            {chapterData.worked_example.solution_steps.map((step: any, idx: number) => {
                                                if (typeof step === "object" && step.type === "table") {
                                                    return (
                                                        <div key={idx} className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-800 my-2">
                                                            <table className="w-full text-sm">
                                                                <thead>
                                                                    <tr className="border-b border-slate-700 bg-slate-800/50">
                                                                        {step.headers?.map((h: string, i: number) => (
                                                                            <th key={i} className="text-right py-2 px-3 text-purple-400 font-medium whitespace-nowrap">{h}</th>
                                                                        ))}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {step.rows?.map((row: string[], i: number) => (
                                                                        <tr key={i} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors last:border-0 ${i === step.rows.length - 1 ? 'bg-purple-500/5 font-medium' : ''}`}>
                                                                            {row.map((cell: string, j: number) => (
                                                                                <td key={j} className={`py-2 px-3 text-slate-300 whitespace-nowrap ${i === step.rows.length - 1 ? 'text-white' : ''}`}>
                                                                                    {cell}
                                                                                </td>
                                                                            ))}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    );
                                                }
                                                // Handle string steps (backward compatibility or simple text)
                                                const textStep = step as string;
                                                return (
                                                    <p key={idx} className={`text-slate-300 whitespace-pre-wrap leading-relaxed ${textStep === '' ? 'h-0' : ''} ${textStep.startsWith('📌') ? 'text-purple-400 font-bold text-base mt-4 mb-2' : ''} ${textStep.startsWith('ח\'') || textStep.includes('    ז\'') ? 'text-amber-300 font-mono bg-slate-900/50 p-2 rounded border-l-2 border-amber-500/50' : ''} ${textStep.startsWith('│') || textStep.startsWith('├') || textStep.startsWith('└') || textStep.startsWith('┌') ? 'hidden' : ''}`}>
                                                        {textStep}
                                                    </p>
                                                );
                                            })}
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
