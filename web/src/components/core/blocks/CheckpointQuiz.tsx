"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { QuizQuestion } from "@/types/chapter";

interface CheckpointQuizProps {
    questions: QuizQuestion[];
}

export const CheckpointQuiz: React.FC<CheckpointQuizProps> = ({ questions }) => {
    const [answers, setAnswers] = useState<Record<string, number | null>>({});
    const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

    const select = (qId: string, optIdx: number) => {
        if (submitted[qId]) return;
        setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    };

    const submit = (qId: string) => {
        setSubmitted((prev) => ({ ...prev, [qId]: true }));
    };

    const score = questions.filter(
        (q) => submitted[q.id] && answers[q.id] === q.correctIndex
    ).length;
    const totalSubmitted = Object.keys(submitted).length;

    return (
        <div className="bg-card/30 border border-border/40 rounded-2xl overflow-hidden my-6">
            <div className="flex items-center justify-between px-6 py-4 bg-card/50 border-b border-border/20">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <HelpCircle className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="text-sm font-black text-primary uppercase tracking-wider">בדיקת הבנה</h4>
                </div>
                {totalSubmitted > 0 && (
                    <span className="text-sm font-mono font-bold text-muted-foreground">
                        {score}/{totalSubmitted}
                    </span>
                )}
            </div>

            <div className="p-6 space-y-8">
                {questions.map((q, qIdx) => {
                    const isSubmitted = submitted[q.id];
                    const selectedIdx = answers[q.id];
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                        <div key={q.id}>
                            <div className="text-foreground/90 font-medium mb-4 flex items-start gap-2 markdown-content">
                                <span className="text-primary font-bold">{qIdx + 1}.</span>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{q.question}</ReactMarkdown>
                            </div>

                            <div className="space-y-2 mb-3">
                                {q.options.map((opt, optIdx) => {
                                    const isSelected = selectedIdx === optIdx;
                                    const isAnswer = optIdx === q.correctIndex;

                                    let style = "border-border/30 hover:border-primary/30 hover:bg-primary/5";
                                    if (isSubmitted && isAnswer) style = "border-emerald-500/40 bg-emerald-500/10";
                                    else if (isSubmitted && isSelected && !isAnswer) style = "border-red-500/40 bg-red-500/10";
                                    else if (isSelected) style = "border-primary/50 bg-primary/10";

                                    return (
                                        <button
                                            key={optIdx}
                                            onClick={() => select(q.id, optIdx)}
                                            disabled={isSubmitted}
                                            className={`w-full text-right px-4 py-3 rounded-xl border transition-all duration-200 ${style} ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground/80">{opt}</span>
                                                {isSubmitted && isAnswer && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                                                {isSubmitted && isSelected && !isAnswer && <XCircle className="w-4 h-4 text-red-400" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {!isSubmitted && selectedIdx !== null && selectedIdx !== undefined && (
                                <button
                                    onClick={() => submit(q.id)}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                                >
                                    בדוק תשובה
                                </button>
                            )}

                            <div className={`mt-3 px-4 py-3 rounded-lg text-sm ${isCorrect ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                                <p className="font-bold mb-1">{isCorrect ? "נכון! ✓" : "לא נכון ✗"}</p>
                                <div className="text-foreground/60 markdown-content">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{q.explanation}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
