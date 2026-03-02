"use client";

import React, { useState } from "react";
import { BrainCircuit, Calculator, Flag, ChevronDown, Hand, Users, Zap } from "lucide-react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { LessonMarkdown } from "./LessonMarkdown";
import { motion, AnimatePresence } from "framer-motion";
import "katex/dist/katex.min.css";
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
    if (d <= 2) return { text: "בסיסי", color: "text-success" };
    if (d <= 4) return { text: "בינוני", color: "text-secondary" };
    return { text: "מתקדם", color: "text-destructive" };
};

const phaseIcon = (type: "i-do" | "we-do" | "you-do") => {
    switch (type) {
        case "i-do": return { icon: <Zap className="w-4 h-4" />, label: "אני", color: "bg-primary/5 border-primary/20 text-primary" };
        case "we-do": return { icon: <Users className="w-4 h-4" />, label: "אנחנו", color: "bg-secondary/5 border-secondary/20 text-secondary" };
        case "you-do": return { icon: <Hand className="w-4 h-4" />, label: "אתה", color: "bg-success/5 border-success/20 text-success" };
    }
};

// MathText is now replaced by LessonMarkdown

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
        <div className="academic-card group p-0 overflow-hidden my-10" dir="rtl">
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                            <BrainCircuit className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="text-sm font-black text-primary uppercase tracking-wider font-heading">תרגיל מודרך</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full bg-muted text-xs font-bold border border-border ${diff.color}`}>{diff.text}</span>
                </div>

                <div className="text-xl text-foreground font-bold mb-6">
                    <LessonMarkdown>{question}</LessonMarkdown>
                </div>

                <div className="bg-muted border-r-4 border-primary px-5 py-3 rounded-l-lg shadow-sm">
                    <p className="text-xs font-black text-primary uppercase tracking-wide mb-1">🧭 כיוון חשיבה</p>
                    <LessonMarkdown className="text-base text-foreground/80 leading-relaxed italic">{thinkingDirection}</LessonMarkdown>
                </div>
            </div>

            {/* Phases (I do / We do / You do) */}
            {phases && phases.length > 0 && (
                <div className="px-6 pb-4 space-y-3">
                    <p className="text-xs font-black text-primary uppercase tracking-wider mb-2">שלבי הלימוד</p>
                    {phases.map((phase, idx) => {
                        const phaseInfo = phaseIcon(phase.type);
                        return (
                            <div key={idx} className={`p-4 rounded-xl border ${phaseInfo.color}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {phaseInfo.icon}
                                    <span className="text-xs font-bold uppercase">{phaseInfo.label}</span>
                                </div>
                                <LessonMarkdown className="text-foreground text-sm">{phase.content}</LessonMarkdown>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Steps */}
            <div className="px-6 pb-6 space-y-4">
                {steps.map((step, idx) => (
                    <div key={idx} className="border border-border/60 rounded-xl overflow-hidden shadow-sm bg-card/30">
                        <button
                            onClick={() => toggleStep(idx)}
                            className="w-full px-5 py-4 flex items-center justify-between text-right hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-black flex items-center justify-center">
                                    {idx + 1}
                                </span>
                                <LessonMarkdown className="font-bold text-lg text-foreground">{step.title}</LessonMarkdown>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${revealedSteps.has(idx) ? "rotate-180" : ""}`}
                            />
                        </button>
                        <AnimatePresence>
                            {revealedSteps.has(idx) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-6 pt-2 space-y-4 border-t border-border/40">
                                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                            <LessonMarkdown className="text-foreground text-base leading-relaxed">{step.action}</LessonMarkdown>
                                        </div>

                                        <div className="flex items-start gap-3 text-muted-foreground italic">
                                            <div className="h-4 w-1 bg-secondary rounded-full mt-1"></div>
                                            <LessonMarkdown className="text-sm leading-relaxed">{step.reasoning}</LessonMarkdown>
                                        </div>

                                        {step.calculation && (
                                            <div className="bg-muted px-4 py-3 rounded-xl flex items-center gap-3 border border-border/50" dir="ltr">
                                                <div className="bg-secondary/20 p-1.5 rounded-lg">
                                                    <Calculator className="w-4 h-4 text-secondary shrink-0" />
                                                </div>
                                                <div className="font-mono text-foreground text-lg text-left w-full overflow-x-auto scrollbar-hide">
                                                    <LessonMarkdown>{step.calculation.includes('$') ? step.calculation : `$$${step.calculation}$$`}</LessonMarkdown>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-end pt-2">
                                            <div className="bg-success text-success-foreground px-4 py-1.5 rounded-full font-bold text-sm inline-flex items-center gap-2 shadow-sm" dir="ltr">
                                                <span>✓</span>
                                                <LessonMarkdown>{step.result}</LessonMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Final Answer */}
            <div className="border-t border-border/50">
                <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-success/5 transition-colors group/answer"
                >
                    <div className="flex items-center gap-2 text-base font-black text-success">
                        <Flag className="w-5 h-5" />
                        {showAnswer ? "הסתר תשובה סופית" : "הצג תשובה סופית"}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-success/50 transition-transform duration-300 ${showAnswer ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {showAnswer && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-8 pt-2">
                                <div className="bg-success/10 border-2 border-success/30 rounded-2xl px-6 py-4 shadow-sm">
                                    <LessonMarkdown className="text-success text-2xl font-black text-center">{finalAnswer}</LessonMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
