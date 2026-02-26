"use client";

import React, { useState } from "react";
import { BrainCircuit, Calculator, Flag, ChevronDown, Hand, Users, Zap } from "lucide-react";
import type { Step, GuidedExercisePhase } from "@/types/chapter";

interface GuidedExerciseProps {
    difficulty: number;
    question: string;
    thinkingDirection: string;
    steps: Step[];
    finalAnswer: string;
    phases?: GuidedExercisePhase[];
}

const difficultyLabel = (d: number) => {
    if (d <= 2) return { text: "בסיסי", color: "text-emerald-700" };
    if (d <= 4) return { text: "בינוני", color: "text-amber-700" };
    return { text: "מתקדם", color: "text-red-700" };
};

const phaseIcon = (type: "i-do" | "we-do" | "you-do") => {
    switch (type) {
        case "i-do": return { icon: <Zap className="w-4 h-4" />, label: "אני עושה", color: "bg-blue-50 border-blue-200 text-blue-700" };
        case "we-do": return { icon: <Users className="w-4 h-4" />, label: "אנחנו עושים", color: "bg-amber-50 border-amber-200 text-amber-700" };
        case "you-do": return { icon: <Hand className="w-4 h-4" />, label: "אתה עושה", color: "bg-emerald-50 border-emerald-200 text-emerald-700" };
    }
};

export const GuidedExercise: React.FC<GuidedExerciseProps> = ({
    difficulty,
    question,
    thinkingDirection,
    steps,
    finalAnswer,
    phases,
}) => {
    const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());
    const [showAnswer, setShowAnswer] = useState(false);
    const diff = difficultyLabel(difficulty);

    const toggleStep = (idx: number) => {
        const next = new Set(revealedSteps);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        setRevealedSteps(next);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden my-6">
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <BrainCircuit className="w-4 h-4 text-slate-700" />
                        </div>
                        <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">תרגיל מודרך</h4>
                    </div>
                    <span className={`text-xs font-bold ${diff.color}`}>{diff.text}</span>
                </div>

                <p className="text-lg text-foreground font-medium mb-3">{question}</p>

                <div className="bg-slate-50 border-r-2 border-slate-300 px-4 py-2 rounded-l-lg">
                    <p className="text-xs font-bold text-slate-700 mb-1">🧭 כיוון חשיבה</p>
                    <p className="text-sm text-foreground">{thinkingDirection}</p>
                </div>
            </div>

            {/* Phases (I do / We do / You do) */}
            {phases && phases.length > 0 && (
                <div className="px-6 pb-4 space-y-3">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">שלבי התרגיל</p>
                    {phases.map((phase, idx) => {
                        const phaseInfo = phaseIcon(phase.type);
                        return (
                            <div key={idx} className={`p-4 rounded-xl border ${phaseInfo.color}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {phaseInfo.icon}
                                    <span className="text-xs font-bold uppercase">{phaseInfo.label}</span>
                                </div>
                                <p className="text-foreground text-sm">{phase.content}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Steps */}
            <div className="px-6 pb-4 space-y-2">
                {steps.map((step, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <button
                            onClick={() => toggleStep(idx)}
                            className="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center justify-center">
                                    {idx + 1}
                                </span>
                                <span className="font-medium text-foreground">{step.title}</span>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${revealedSteps.has(idx) ? "rotate-180" : ""}`}
                            />
                        </button>
                        {revealedSteps.has(idx) && (
                            <div className="px-4 pb-4 space-y-2 animate-in fade-in-0 duration-300">
                                <p className="text-foreground text-sm">{step.action}</p>
                                <p className="text-foreground text-sm italic">{step.reasoning}</p>
                                {step.calculation && (
                                    <div className="bg-card/50 px-3 py-2 rounded-lg">
                                        <p className="font-mono text-secondary-foreground text-sm" dir="ltr">
                                            <Calculator className="w-3 h-3 inline mr-1" />
                                            {step.calculation}
                                        </p>
                                    </div>
                                )}
                                <p className="text-emerald-700 font-bold text-sm">→ {step.result}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Final Answer */}
            <div className="border-t border-slate-200">
                <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="w-full px-6 py-4 flex items-center gap-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                    <Flag className="w-4 h-4" />
                    {showAnswer ? "הסתר תשובה סופית" : "הצג תשובה סופית"}
                </button>
                {showAnswer && (
                    <div className="px-6 pb-6 animate-in fade-in-0 duration-300">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                            <p className="text-emerald-700 font-bold">{finalAnswer}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
