"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { HelpCircle, CheckCircle2, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

interface InteractiveExerciseProps {
    question: string;
    solution: string;
    tip?: string;
}

export function InteractiveExercise({ question, solution, tip }: InteractiveExerciseProps) {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <GlassCard className="border-l-4 border-l-amber-500/50">
            {/* Question */}
            <div className="flex gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 h-fit">
                    <HelpCircle className="w-5 h-5" />
                </div>
                <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {question}
                </div>
            </div>

            {/* Show Solution Button */}
            <button
                onClick={() => setShowSolution(!showSolution)}
                className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all",
                    showSolution
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 border border-slate-700"
                )}
            >
                {showSolution ? (
                    <>
                        <ChevronUp className="w-4 h-4" />
                        <span>הסתר פתרון</span>
                    </>
                ) : (
                    <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>הצג פתרון</span>
                    </>
                )}
            </button>

            {/* Solution */}
            {showSolution && (
                <div className="mt-4 space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>פתרון</span>
                        </div>
                        <div className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed font-mono">
                            {solution}
                        </div>
                    </div>

                    {tip && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm">
                                <Lightbulb className="w-4 h-4" />
                                <span>טיפ</span>
                            </div>
                            <p className="text-slate-400 text-sm">{tip}</p>
                        </div>
                    )}
                </div>
            )}
        </GlassCard>
    );
}
