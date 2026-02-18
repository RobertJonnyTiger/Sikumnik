"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, Info, Trophy, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface KnowledgeChallengeProps {
    question: string;
    options: string[];
    correctIndex: number;
    points: number;
    reasoning: {
        correct: string;
        wrong: Record<string, string>;
    };
}

export const KnowledgeChallenge: React.FC<KnowledgeChallengeProps> = ({
    question,
    options,
    correctIndex,
    points,
    reasoning,
}) => {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (idx: number) => {
        if (isSubmitted) return;
        setSelectedIdx(idx);
    };

    const isCorrect = selectedIdx === correctIndex;

    return (
        <div className="bg-white dark:bg-slate-900 border-2 border-primary/20 rounded-3xl overflow-hidden my-8 shadow-xl transition-all duration-300">
            {/* Header: Gamified Stats */}
            <div className="px-6 py-4 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2 rounded-xl">
                        <HelpCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-primary uppercase tracking-wider">אתגר ידע</h4>
                        <p className="text-[10px] text-primary/60 font-medium">בחן את ההבנה שלך</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-700/50">
                    <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm font-black text-amber-700 dark:text-amber-300">{points} נק׳</span>
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Question Section */}
                <div className="text-foreground dark:text-slate-100 font-bold text-xl leading-relaxed mb-8 markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{question}</ReactMarkdown>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 gap-3">
                    {options.map((option, idx) => {
                        const isSelected = selectedIdx === idx;
                        const showsResult = isSubmitted;
                        const isOptionCorrect = idx === correctIndex;

                        let stateStyles = "border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5";
                        if (isSelected) stateStyles = "border-primary bg-primary/5 ring-2 ring-primary/20";

                        if (showsResult) {
                            if (isOptionCorrect) {
                                stateStyles = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20";
                            } else if (isSelected && !isCorrect) {
                                stateStyles = "border-rose-500 bg-rose-50 dark:bg-rose-950/20 ring-2 ring-rose-500/20";
                            } else {
                                stateStyles = "border-slate-200 dark:border-slate-800 opacity-50";
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                disabled={isSubmitted}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-right transition-all group ${stateStyles}`}
                            >
                                <div className={`w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center font-black text-sm transition-colors ${isSelected || (showsResult && isOptionCorrect)
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : "border-slate-300 dark:border-slate-700 text-slate-500"
                                    }`}>
                                    {showsResult && isOptionCorrect ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : showsResult && isSelected && !isCorrect ? (
                                        <XCircle className="w-5 h-5" />
                                    ) : (
                                        String.fromCharCode(1488 + idx) // Aleph, Bet, Gimel...
                                    )}
                                </div>
                                <span className="flex-1 font-semibold text-lg">{option}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Action Section */}
                <div className="mt-8 flex flex-col items-center">
                    {!isSubmitted ? (
                        <button
                            onClick={() => setIsSubmitted(true)}
                            disabled={selectedIdx === null}
                            className={`px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl ${selectedIdx === null
                                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                : "bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/30"
                                }`}
                        >
                            בדוק תשובה!
                        </button>
                    ) : (
                        <div className="w-full space-y-4 animate-in fade-in zoom-in-95 duration-500">
                            {/* Feedback Block */}
                            <div className={`p-6 rounded-2xl border-2 flex items-start gap-4 ${isCorrect
                                ? "border-emerald-500/30 bg-emerald-500/5"
                                : "border-rose-500/30 bg-rose-500/5"
                                }`}>
                                <div className={`p-2 rounded-xl shrink-0 ${isCorrect ? "bg-emerald-500/20" : "bg-rose-500/20"
                                    }`}>
                                    {isCorrect ? (
                                        <Trophy className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                        <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                                    )}
                                </div>
                                <div>
                                    <h5 className={`font-black text-lg mb-1 ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                                        }`}>
                                        {isCorrect ? "כל הכבוד! +" + points + " נקודות!" : "לא נורא, משם לומדים!"}
                                    </h5>
                                    <div className="text-foreground/80 leading-relaxed markdown-content">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                            {isCorrect ? reasoning.correct : reasoning.wrong[selectedIdx?.toString() || ""] || reasoning.correct}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

