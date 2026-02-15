"use client";

import React, { useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { Collapse } from "./Collapse";
import { BrainCircuit, Calculator, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { getConnotationColor, getConnotationBg } from "@/lib/financial-utils";

interface Step {
    title: string;
    action: string;
    reason: string;
    calculation: string;
    result: string;
}

interface GuidedExerciseProps {
    question: string;
    difficulty: 1 | 2 | 3;
    thinkingDirection: string;
    steps: Step[];
    finalAnswer: string;
}

export const GuidedExercise: React.FC<GuidedExerciseProps> = ({
    question,
    difficulty,
    thinkingDirection,
    steps,
    finalAnswer,
}) => {
    // We can track progress if we want to force sequential, but for now let's allow free exploration
    // with a visual suggestion of flow.

    const formatText = (text: string) => {
        return text.split('.').filter(s => s.trim().length > 0).map((sentence, i) => (
            <span key={i} className="inline-block mb-1 w-full">
                {sentence.trim()}.
            </span>
        ));
    };

    return (
        <SectionWrapper id="guided-exercise" sectionNumber={11} title="תרגיל מודרך">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 bg-slate-950/50">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-teal-500 uppercase tracking-wider border border-teal-500/30 px-2 py-1 rounded bg-teal-500/10">
                            רמת קושי: {"⭐".repeat(difficulty)}
                        </span>
                    </div>
                    <h4 className="text-lg font-medium text-slate-100 leading-title">
                        {formatText(question)}
                    </h4>
                </div>

                <div className="p-6 space-y-4">
                    {/* Thinking Direction - Unique Purple/Pink Gradient */}
                    <Collapse
                        title={
                            <div className="flex items-center gap-2 text-white font-bold">
                                <BrainCircuit size={20} />
                                <span>כיוון חשיבה</span>
                            </div>
                        }
                        className="border-indigo-500/30 rounded-2xl"
                        headerClassName="h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20 border-none transition-all duration-300"
                    >
                        <p className="text-slate-200 leading-relaxed font-medium p-2">
                            {thinkingDirection}
                        </p>
                    </Collapse>

                    {/* Steps */}
                    <div className="space-y-3">
                        {steps.map((step, idx) => (
                            <Collapse
                                key={idx}
                                title={
                                    <div className="flex items-center gap-3 text-slate-200 group-hover:text-teal-400 transition-colors">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-bold border border-slate-700 group-hover:border-teal-500/50">
                                            {idx + 1}
                                        </span>
                                        <span className="font-bold">{step.title}</span>
                                    </div>
                                }
                                className="rounded-2xl"
                                headerClassName="h-14 bg-slate-900 hover:bg-slate-800 transition-colors"
                            >
                                <div className="space-y-4 text-sm bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <span className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-2 uppercase tracking-wider">
                                                <Calculator size={12} /> מה עושים?
                                            </span>
                                            <p className="text-slate-200 leading-relaxed">{step.action}</p>
                                        </div>
                                        <div>
                                            <span className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
                                                <BrainCircuit size={12} /> למה?
                                            </span>
                                            <p className="text-slate-300 italic leading-relaxed">"{step.reason}"</p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 p-3 rounded border border-slate-800 font-mono text-teal-400 dir-ltr shadow-inner">
                                        {step.calculation}
                                    </div>
                                    <div className="text-right border-t border-slate-800 pt-3 mt-2">
                                        <span className="text-xs font-bold text-slate-500 ml-2">
                                            תוצאת ביניים:
                                        </span>
                                        <span className={cn(
                                            "font-bold px-2 py-0.5 rounded text-sm",
                                            getConnotationBg(step.result),
                                            getConnotationColor(step.result)
                                        )}>
                                            {step.result}
                                        </span>
                                    </div>
                                </div>
                            </Collapse>
                        ))}
                    </div>

                    {/* Final Answer */}
                    <Collapse
                        title={
                            <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                <Flag size={18} />
                                <span>תשובה סופית</span>
                            </div>
                        }
                        className="border-emerald-500/30 rounded-2xl"
                        headerClassName="h-14 bg-emerald-950/30 hover:bg-emerald-900/40 transition-all border-none"
                    >
                        <p className="text-xl font-bold text-emerald-300 text-center py-8">
                            {finalAnswer}
                        </p>
                    </Collapse>
                </div>
            </div>
        </SectionWrapper>
    );
};
