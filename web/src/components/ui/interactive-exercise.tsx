"use client";

import { useState } from "react";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface InteractiveExerciseProps {
    question: string;
    answer: string;
    hint?: string;
    className?: string;
}

export function InteractiveExercise({ question, answer, hint, className }: InteractiveExerciseProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <GlassCard className={cn("border-t-4 border-t-pink-500", className)}>

            {/* Label */}
            <div className="flex items-center gap-2 mb-4 text-pink-400 text-xs font-bold uppercase tracking-widest">
                <HelpCircle className="w-4 h-4" />
                <span>בחן את עצמך</span>
            </div>

            {/* Question */}
            <h3 className="text-xl font-bold text-white mb-6">
                {question}
            </h3>

            {/* Answer Area */}
            <div
                className="relative cursor-pointer group"
                onClick={() => setIsRevealed(!isRevealed)}
            >
                {/* The Content (Blurred or Visible) */}
                <div className={cn(
                    "p-6 rounded-lg bg-slate-900/50 border border-slate-800 transition-all duration-500",
                    !isRevealed && "blur-md select-none opacity-50 grayscale",
                    isRevealed && "opacity-100 neon-border"
                )}>
                    <p className="text-lg text-slate-200 leading-relaxed">
                        {answer}
                    </p>
                </div>

                {/* Overlay / Button (If hidden) */}
                {!isRevealed && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="bg-slate-900/80 backdrop-blur-sm border border-pink-500/50 text-pink-500 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 group-hover:scale-105 transition-transform">
                            <Eye className="w-5 h-5" />
                            <span>לחץ לחשיפת התשובה</span>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer / Hint */}
            {hint && (
                <div className="mt-4 text-xs text-slate-500">
                    <span className="font-bold text-indigo-400">רמז:</span> {hint}
                </div>
            )}

        </GlassCard>
    );
}
