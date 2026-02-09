"use client";

import React from "react";
import chapterData from "@/data/chapters/chapter-2.json";
import dynamic from "next/dynamic";
import { Scale } from "lucide-react";

const ConceptCard = dynamic(() => import("@/components/accounting/ConceptCard").then(m => m.ConceptCard), { ssr: true });
const CalculationBlock = dynamic(() => import("@/components/accounting/CalculationBlock").then(m => m.CalculationBlock), { ssr: true });
const JournalEntry = dynamic(() => import("@/components/accounting/JournalEntry").then(m => m.JournalEntry), { ssr: true });
const InteractiveExercise = dynamic(() => import("@/components/accounting/InteractiveExercise").then(m => m.InteractiveExercise), { ssr: false });
const BalanceSheetQuadrant = dynamic(() => import("@/components/accounting/BalanceSheetQuadrant").then(m => m.BalanceSheetQuadrant), { ssr: true });

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
    const allSections = chapterData.sections as Section[];
    const exercises = chapterData.exercises || [];

    // Skip first 4 concept cards (GAAP principles) - they belong to Chapter 1/intro
    const conceptSectionsToSkip = allSections.filter(s => s.type === "concept").slice(0, 4);
    const skipTitles = conceptSectionsToSkip.map(s => s.title);

    const sections = allSections.filter(s => !skipTitles.includes(s.title));

    // Extract the four balance sheet quadrant sections for the 2x2 grid
    const currentAssets = sections.find(s => s.title === "נכסים שוטפים");
    const nonCurrentAssets = sections.find(s => s.title === "נכסים לא שוטפים");
    const currentLiabilities = sections.find(s => s.title === "התחייבויות שוטפות");
    const nonCurrentAndEquity = sections.find(s => s.title === "התחייבויות לא שוטפות והון עצמי");

    // Sections that are NOT part of the quadrant grid
    const otherSections = sections.filter(s =>
        s.title !== "נכסים שוטפים" &&
        s.title !== "נכסים לא שוטפים" &&
        s.title !== "התחייבויות שוטפות" &&
        s.title !== "התחייבויות לא שוטפות והון עצמי"
    );

    return (
        <div className="w-full px-6 lg:px-12 xl:px-16 py-8">
            {/* Wide Header */}
            <div className="mb-12 max-w-5xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 border border-primary/30 shadow-premium">
                        <Scale className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-foreground">{chapterData.title}</h1>
                        <p className="text-foreground/50 mt-1 text-lg font-handwriting">עריכת מאזן</p>
                    </div>
                </div>
                <p className="text-xl text-foreground/70 leading-relaxed font-medium">{chapterData.summary}</p>
            </div>

            {/* Content Grid - 2 columns */}
            <div className="space-y-12">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {otherSections.map((section, idx) => {
                        if (section.type === "concept") {
                            return (
                                <ConceptCard
                                    key={idx}
                                    index={idx}
                                    title={section.title}
                                    academicText={section.academic_text || ""}
                                    analogyText={section.analogy_text || ""}
                                />
                            );
                        }
                        if (section.type === "calculation") {
                            return <CalculationBlock key={idx} data={section as any} />;
                        }
                        if (section.type === "journal_entry") {
                            return <JournalEntry key={idx} data={section as any} />;
                        }
                        return null;
                    })}
                </div>

                {/* Balance Sheet 2x2 Quadrant Grid */}
                {currentAssets && nonCurrentAssets && currentLiabilities && nonCurrentAndEquity && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-black text-foreground mb-8 text-center">
                            המאזן המלא - ארבעת הרבעים
                        </h2>
                        <BalanceSheetQuadrant
                            topLeft={{
                                title: "נכסים שוטפים",
                                rows: currentAssets.data?.rows || []
                            }}
                            topRight={{
                                title: "התחייבויות שוטפות",
                                rows: currentLiabilities.data?.rows || []
                            }}
                            bottomLeft={{
                                title: "נכסים לא שוטפים",
                                rows: nonCurrentAssets.data?.rows || []
                            }}
                            bottomRight={{
                                title: "התחייבויות לא שוטפות + הון",
                                rows: nonCurrentAndEquity.data?.rows || []
                            }}
                        />
                    </div>
                )}

                {/* Exercises Section - After Balance Sheet */}
                {exercises.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-black text-foreground mb-8 text-center">
                            בדוק את עצמך
                        </h2>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {exercises.map((exercise: any, idx: number) => (
                                <InteractiveExercise
                                    key={`ex-${idx}`}
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
