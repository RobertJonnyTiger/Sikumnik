"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-4.json";
import dynamic from "next/dynamic";
const ConceptCard = dynamic(() => import("@/components/accounting/ConceptCard").then(m => m.ConceptCard), { ssr: true });
const CalculationBlock = dynamic(() => import("@/components/accounting/CalculationBlock").then(m => m.CalculationBlock), { ssr: true });
const JournalEntry = dynamic(() => import("@/components/accounting/JournalEntry").then(m => m.JournalEntry), { ssr: true });
const InteractiveExercise = dynamic(() => import("@/components/accounting/InteractiveExercise").then(m => m.InteractiveExercise), { ssr: false });
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRightLeft, ChevronDown, ChevronUp, Calculator, BookOpen } from "lucide-react";
import { JournalEntryBlock } from "@/types/accounting";

interface JournalLine {
    account: string;
    debit: number;
    credit: number;
}

interface Section {
    type: string;
    title: string;
    description?: string;
    entries?: JournalLine[];
    explanation?: string;
    academic_text?: string;
    analogy_text?: string;
    formula_visual?: string;
    variables?: any[];
    steps?: string[];
    analogy_note?: string;
}

interface Transaction {
    date: string;
    description: string;
    journal_entry: {
        entries: JournalLine[];
    };
    explanation: string;
}

export default function Chapter4Page() {
    const [openExamples, setOpenExamples] = useState<Set<number>>(new Set());
    const [openTransactions, setOpenTransactions] = useState<Set<number>>(new Set());

    const toggleExample = (index: number) => {
        setOpenExamples(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const toggleTransaction = (index: number) => {
        setOpenTransactions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    // Separate journal_entry sections from other sections
    const journalEntrySections = chapterData.sections.filter((s: Section) => s.type === 'journal_entry');
    const otherSections = chapterData.sections.filter((s: Section) => s.type !== 'journal_entry');

    let conceptIndex = 0;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                        <ArrowRightLeft className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{chapterData.title}</h1>
                        <p className="text-slate-400 mt-1">פקודות יומן</p>
                    </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">{chapterData.summary}</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
                {otherSections.map((section: Section, index: number) => {
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

                {/* Journal Entry Examples - Grouped */}
                {journalEntrySections.length > 0 && (
                    <GlassCard className="border-t-4 border-t-indigo-500">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">דוגמאות לפקודות יומן</h2>
                                <p className="text-slate-400 text-sm mt-1">{journalEntrySections.length} דוגמאות מעשיות</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {journalEntrySections.map((section: Section, idx: number) => {
                                const journalData: JournalEntryBlock = {
                                    type: 'journal_entry',
                                    title: section.title,
                                    entries: section.entries || [],
                                    explanation: section.explanation || ""
                                };

                                return (
                                    <div key={idx} className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                                        <button
                                            onClick={() => toggleExample(idx)}
                                            className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-sm font-mono">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-slate-300">{section.title}</span>
                                            </div>
                                            {openExamples.has(idx) ? (
                                                <ChevronUp className="w-5 h-5 text-slate-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-slate-500" />
                                            )}
                                        </button>
                                        {openExamples.has(idx) && (
                                            <div className="p-4 pt-0 border-t border-slate-800">
                                                <JournalEntry data={journalData} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>
                )}

                {/* Worked Example */}
                {chapterData.worked_example && (
                    <GlassCard className="border-t-4 border-t-emerald-500">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{chapterData.worked_example.title}</h2>
                                <p className="text-slate-400 text-sm mt-1">{chapterData.worked_example.scenario}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {chapterData.worked_example.transactions.map((transaction: Transaction, idx: number) => {
                                const journalData: JournalEntryBlock = {
                                    type: 'journal_entry',
                                    title: transaction.description,
                                    date: transaction.date,
                                    entries: transaction.journal_entry.entries,
                                    explanation: transaction.explanation
                                };

                                return (
                                    <div key={idx} className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                                        <button
                                            onClick={() => toggleTransaction(idx)}
                                            className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-sm font-mono">
                                                    {transaction.date}
                                                </span>
                                                <span className="text-slate-300">{transaction.description}</span>
                                            </div>
                                            {openTransactions.has(idx) ? (
                                                <ChevronUp className="w-5 h-5 text-slate-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-slate-500" />
                                            )}
                                        </button>
                                        {openTransactions.has(idx) && (
                                            <div className="p-4 pt-0 border-t border-slate-800">
                                                <JournalEntry data={journalData} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </GlassCard>
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
