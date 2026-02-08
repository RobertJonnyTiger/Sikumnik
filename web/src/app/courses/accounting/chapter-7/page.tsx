"use client";

import React, { useState } from "react";
import chapterData from "@/data/chapters/chapter-7.json";
import { ConceptCard } from "@/components/accounting/ConceptCard";
import { CalculationBlock } from "@/components/accounting/CalculationBlock";
import { JournalEntry } from "@/components/accounting/JournalEntry";
import { InteractiveExercise } from "@/components/accounting/InteractiveExercise";
import { GlassCard } from "@/components/ui/glass-card";
import { Scissors, ChevronDown, ChevronUp } from "lucide-react";
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
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                        <Scissors className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{chapterData.title}</h1>
                        <p className="text-slate-400 mt-1">התאמות סוף תקופה</p>
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
