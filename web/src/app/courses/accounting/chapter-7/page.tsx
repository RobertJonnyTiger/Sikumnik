"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-7.json";
import dynamic from "next/dynamic";
const ConceptCard = dynamic(() => import("@/components/accounting/ConceptCard").then(m => m.ConceptCard), { ssr: true });
const CalculationBlock = dynamic(() => import("@/components/accounting/CalculationBlock").then(m => m.CalculationBlock), { ssr: true });
const JournalEntry = dynamic(() => import("@/components/accounting/JournalEntry").then(m => m.JournalEntry), { ssr: true });
const InteractiveExercise = dynamic(() => import("@/components/accounting/InteractiveExercise").then(m => m.InteractiveExercise), { ssr: false });
import { GlassCard } from "@/components/ui/glass-card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PageMap } from "@/components/accounting/PageMap";
import { JournalEntryBlock } from "@/types/accounting";

interface Section {
    type: string;
    title: string;
    description?: string;
    entries?: any[];
    explanation?: string;
    academic_text?: string;
    analogy_text?: string;
    formula_visual?: string;
    variables?: any[];
    steps?: string[];
    analogy_note?: string;
}

export default function Chapter7Page() {
    const data: any = chapterData;
    const [openJournals, setOpenJournals] = useState<Set<number>>(new Set());

    const toggleJournal = (index: number) => {
        setOpenJournals(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    // Separate journal_entry sections from others for grouping
    const journalEntrySections = chapterData.sections
        .map((s, i) => ({ ...s, originalIndex: i }))
        .filter((s: any) => s.type === 'journal_entry');

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

            <div className="max-w-5xl mx-auto space-y-8">
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
                    if (section.type === "journal_entry") {
                        const journalData: JournalEntryBlock = {
                            type: 'journal_entry',
                            title: section.title,
                            entries: section.entries || [],
                            explanation: section.explanation || ""
                        };

                        return (
                            <div key={index} className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
                                <button
                                    onClick={() => toggleJournal(index)}
                                    className="w-full flex items-center justify-between p-4 text-right hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-sm">
                                            פקודות יומן
                                        </span>
                                        <span className="text-slate-300 font-medium">{section.title}</span>
                                    </div>
                                    {openJournals.has(index) ? (
                                        <ChevronUp className="w-5 h-5 text-slate-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-500" />
                                    )}
                                </button>
                                {openJournals.has(index) && (
                                    <div className="p-4 pt-0 border-t border-slate-800">
                                        <JournalEntry data={journalData} />
                                    </div>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}

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
