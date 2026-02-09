"use client";

import React from "react";
import { GraduationCap, Divide, Sigma } from "lucide-react";
import { ConceptCard } from "./ConceptCard";

interface Concept {
    title: string;
    content: string;
    tooltips?: Record<string, string>;
}

interface Formula {
    title: string;
    formula: string;
    alternativeForm?: string;
    variables?: Array<{
        symbol: string;
        name: string;
        desc: string;
    }>;
    benchmark?: string;
}

interface FormalDefinitionsProps {
    data: {
        concepts: Concept[];
        formulas: Formula[];
    };
}

export const FormalDefinitions: React.FC<FormalDefinitionsProps> = ({ data }) => {
    return (
        <div className="w-full my-20 space-y-16">
            <div className="flex items-center gap-6 border-b-2 border-border/40 pb-8">
                <div className="p-4 bg-primary/10 rounded-2xl text-primary shadow-premium border border-primary/20 transition-transform hover:scale-110 duration-500">
                    <GraduationCap className="w-10 h-10" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">הגדרות פורמליות</h2>
                    <div className="text-secondary font-bold text-sm uppercase tracking-[0.2em] mt-1 opacity-70">פרופסור חשבונאות</div>
                </div>
            </div>

            {/* Concepts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {data.concepts.map((concept, idx) => (
                    <ConceptCard
                        key={idx}
                        index={idx}
                        title={concept.title}
                        academicText={concept.content}
                        // ConceptCard expects analogyText but we might not have it in this rigorous section
                        // Passing empty string or maybe we should modify ConceptCard to make it optional
                        analogyText=""
                        showAnalogy={false} // Assuming we might want to hide the analogy tab if empty
                    />
                ))}
            </div>

            {/* Formulas Section */}
            {data.formulas.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-foreground/80">
                        <Sigma className="w-5 h-5" />
                        נוסחאות
                    </h3>

                    <div className="grid gap-6">
                        {data.formulas.map((formula, idx) => (
                            <div key={idx} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-lg mb-4">{formula.title}</h4>

                                <div className="bg-primary/5 p-6 rounded-2xl text-center dir-ltr font-black text-2xl md:text-3xl text-white border-2 border-primary/20 shadow-inner" dir="ltr">
                                    {formula.formula}
                                </div>

                                {formula.alternativeForm && (
                                    <div className="text-center text-sm text-muted-foreground mb-4 dir-ltr">
                                        או: {formula.alternativeForm}
                                    </div>
                                )}

                                {formula.variables && (
                                    <div className="space-y-3 mt-6 bg-background/40 p-6 rounded-2xl border border-border/20 text-base md:text-lg">
                                        {formula.variables.map((v, vIdx) => (
                                            <div key={vIdx} className="flex gap-3">
                                                <span className="font-black text-primary">{v.symbol}</span>
                                                <span className="text-muted-foreground/60">=</span>
                                                <span className="font-black text-white">{v.name}:</span>
                                                <span className="text-foreground/70">{v.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {formula.benchmark && (
                                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-950/20 p-2 rounded">
                                        <Divide className="w-4 h-4" />
                                        {formula.benchmark}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
