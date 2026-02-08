"use client";

import React from "react";
import chapterData from "@/data/chapters/chapter-2.json";
import { ConceptCard } from "@/components/accounting/ConceptCard";
import { CalculationBlock } from "@/components/accounting/CalculationBlock";
import { JournalEntry } from "@/components/accounting/JournalEntry";
import { InteractiveExercise } from "@/components/accounting/InteractiveExercise";
import { Scale } from "lucide-react";

interface Section {
    type: string;
    title: string;
    academic_text?: string;
    analogy_text?: string;
    formula_visual?: string;
    variables?: any[];
    steps?: string[];
    analogy_note?: string;
    data?: any;
}

export default function Chapter2Page() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
                        <Scale className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{chapterData.title}</h1>
                        <p className="text-slate-400 mt-1">עריכת מאזן</p>
                    </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">{chapterData.summary}</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
                {chapterData.sections.map((section: Section, index: number) => {
                    if (section.type === "concept") {
                        return (
                            <ConceptCard
                                key={index}
                                index={index}
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
                        return <JournalEntry key={index} data={section as any} />;
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
