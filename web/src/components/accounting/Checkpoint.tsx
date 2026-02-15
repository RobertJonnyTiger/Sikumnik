"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, HelpCircle, XCircle } from "lucide-react";

interface CheckpointQuestion {
    type: "multipleChoice" | "trueFalse";
    question: string;
    options?: string[]; // Only for multipleChoice
    correctIndex?: number; // For multipleChoice
    correct?: boolean; // For trueFalse
    explanation: string;
}

interface CheckpointProps {
    data: CheckpointQuestion[];
}

export const Checkpoint: React.FC<CheckpointProps> = ({ data }) => {
    return (
        <div className="w-full my-16 max-w-3xl mx-auto space-y-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary" />
                בדיקה מהירה לגמרי
            </h2>

            <div className="space-y-6">
                {data.map((q, idx) => (
                    <QuestionItem key={idx} question={q} index={idx} />
                ))}
            </div>
        </div>
    );
};

const QuestionItem = ({ question, index }: { question: CheckpointQuestion; index: number }) => {
    const [selected, setSelected] = useState<number | boolean | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const isCorrect =
        question.type === "multipleChoice"
            ? selected === question.correctIndex
            : selected === question.correct;

    const handleSelect = (val: number | boolean) => {
        if (isRevealed) return;
        setSelected(val);
        setIsRevealed(true);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="font-bold text-lg mb-4 flex gap-3">
                <span className="text-muted-foreground select-none">Q{index + 1}.</span>
                {question.question}
            </div>

            {/* Multiple Choice Options */}
            {question.type === "multipleChoice" && question.options && (
                <div className="space-y-2">
                    {question.options.map((opt, optIdx) => {
                        let stateStyles = "border-border hover:bg-accent/50";
                        if (isRevealed) {
                            if (optIdx === question.correctIndex) stateStyles = "border-green-500 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300";
                            else if (selected === optIdx) stateStyles = "border-destructive bg-destructive/5 text-destructive";
                            else stateStyles = "border-border opacity-50";
                        } else if (selected === optIdx) {
                            stateStyles = "border-primary bg-primary/5";
                        }

                        return (
                            <button
                                key={optIdx}
                                onClick={() => handleSelect(optIdx)}
                                disabled={isRevealed}
                                className={`w-full text-right p-3 rounded-lg border transition-all flex items-center justify-between group ${stateStyles}`}
                            >
                                <span>{opt}</span>
                                {isRevealed && optIdx === question.correctIndex && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                {isRevealed && selected === optIdx && optIdx !== question.correctIndex && <XCircle className="w-5 h-5 text-destructive" />}
                                {!isRevealed && <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* True / False Options */}
            {question.type === "trueFalse" && (
                <div className="flex gap-4">
                    {[true, false].map((val) => {
                        const label = val ? "נכון" : "לא נכון";
                        let stateStyles = "border-border hover:bg-accent/50";

                        if (isRevealed) {
                            if (val === question.correct) stateStyles = "border-green-500 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300";
                            else if (selected === val) stateStyles = "border-destructive bg-destructive/5 text-destructive";
                            else stateStyles = "border-border opacity-50";
                        }

                        return (
                            <button
                                key={val.toString()}
                                onClick={() => handleSelect(val)}
                                disabled={isRevealed}
                                className={`flex-1 p-3 rounded-lg border text-center font-bold transition-all ${stateStyles}`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Explanation Reveal */}
            {isRevealed && (
                <div className={`mt-4 p-4 rounded-lg text-sm border-l-4 animate-in fade-in slide-in-from-top-2 ${isCorrect ? "bg-green-50 dark:bg-green-950/10 border-green-500 text-green-800 dark:text-green-200"
                        : "bg-destructive/5 border-destructive text-destructive-foreground"
                    }`}>
                    <div className="font-bold mb-1">{isCorrect ? "בדיוק!" : "לא בדיוק..."}</div>
                    {question.explanation}
                </div>
            )}
        </div>
    );
};
