"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-5.json";
import dynamic from "next/dynamic";
const ConceptCard = dynamic(() => import("@/components/accounting/ConceptCard").then(m => m.ConceptCard), { ssr: true });
const CalculationBlock = dynamic(() => import("@/components/accounting/CalculationBlock").then(m => m.CalculationBlock), { ssr: true });
const JournalEntry = dynamic(() => import("@/components/accounting/JournalEntry").then(m => m.JournalEntry), { ssr: true });
const InteractiveExercise = dynamic(() => import("@/components/accounting/InteractiveExercise").then(m => m.InteractiveExercise), { ssr: false });
import { GlassCard } from "@/components/ui/glass-card";
import { ChevronDown, ChevronUp, Calculator, CheckCircle2 } from "lucide-react";
import { PageMap } from "@/components/accounting/PageMap";
import { JournalEntryBlock } from "@/types/accounting";

interface JournalLine {
    account: string;
    debit: number;
    credit: number;
}

interface Transaction {
    date: string;
    description: string;
    journal_entry: {
        entries: JournalLine[];
    };
    explanation: string;
}

interface TrialBalanceAccount {
    name: string;
    debit: number;
    credit: number;
    calculation?: string;
    highlight?: boolean;
}

export default function Chapter5Page() {
    const data: any = chapterData;
    const [openTransactions, setOpenTransactions] = useState<Set<number>>(new Set());

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

    return (
        <div className="w-full px-6 lg:px-12 xl:px-16 py-8 max-w-[1600px] mx-auto">
            <PageMap
                title={data.title}
                summary={data.summary}
                data={data.pageMap}
                currentChapter={data.chapterNumber}
                totalChapters={data.totalChapters}
            />

            <div className="max-w-5xl mx-auto space-y-8">
                {chapterData.sections.map((section: any, index: number) => {
                    if (section.type === "concept") {
                        return (
                            <ConceptCard
                                key={index}
                                index={index}
                                title={section.title}
                                academicText={section.academic_text}
                                analogyText={section.analogy_text}
                            />
                        );
                    }
                    if (section.type === "calculation") {
                        return <CalculationBlock key={index} data={section} />;
                    }
                    return null;
                })}

                {/* Worked Example - Trial Balance */}
                {chapterData.worked_example && (
                    <GlassCard className="border-t-4 border-t-purple-500">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{chapterData.worked_example.title}</h2>
                                <p className="text-slate-400 text-sm mt-1">{chapterData.worked_example.scenario}</p>
                            </div>
                        </div>

                        {/* Transactions */}
                        <div className="space-y-3 mb-8">
                            <h3 className="text-lg font-bold text-white mb-4">עסקאות החודש:</h3>
                            {chapterData.worked_example.transactions.map((transaction: Transaction, idx: number) => {
                                // Build the JournalEntryBlock format expected by JournalEntry component
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
                                                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm font-mono">
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

                        {/* Trial Balance Table */}
                        {chapterData.worked_example.trial_balance && (
                            <div className="bg-slate-950/50 rounded-xl p-6 border border-purple-500/30">
                                <h3 className="text-lg font-bold text-purple-300 mb-4 text-center">
                                    {chapterData.worked_example.trial_balance.title}
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-purple-500/30">
                                                <th className="text-right py-3 px-4 text-purple-300 font-bold">שם החשבון</th>
                                                <th className="text-center py-3 px-4 text-emerald-400 font-bold">חובה</th>
                                                <th className="text-center py-3 px-4 text-pink-400 font-bold">זכות</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chapterData.worked_example.trial_balance.accounts.map((account: TrialBalanceAccount, idx: number) => (
                                                <tr
                                                    key={idx}
                                                    className={`border-b border-slate-800/50 ${account.highlight ? 'bg-purple-500/10 font-bold' : ''}`}
                                                >
                                                    <td className="py-3 px-4 text-slate-300">{account.name}</td>
                                                    <td className="py-3 px-4 text-center text-emerald-400 font-mono">
                                                        {account.debit > 0 ? account.debit.toLocaleString() : '-'}
                                                    </td>
                                                    <td className="py-3 px-4 text-center text-pink-400 font-mono">
                                                        {account.credit > 0 ? account.credit.toLocaleString() : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-bold">המאזן מאוזן! ✓</span>
                                </div>
                            </div>
                        )}
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
