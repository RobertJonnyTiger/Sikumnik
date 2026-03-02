"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { motion, AnimatePresence } from "framer-motion";
import "katex/dist/katex.min.css";
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
        <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden my-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500/20 hover:border-slate-400/50 dark:hover:border-slate-500/50" dir="rtl">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                        <HelpCircle className="w-4 h-4 text-slate-700" />
                    </div>
                    <h4 className="text-sm font-black text-slate-700 uppercase tracking-wider">בדיקת הבנה</h4>
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
                        <div key={q.id} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                            <div className="text-foreground font-medium mb-4 flex items-start gap-2 markdown-content">
                                <span className="text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded-full text-sm">{qIdx + 1}</span>
                                <div className="mt-0.5 relative top-[-2px]">
                                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
                                        {q.question}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                {q.options.map((opt, optIdx) => {
                                    const isSelected = selectedIdx === optIdx;
                                    const isAnswer = optIdx === q.correctIndex;

                                    let style = "border-slate-200 hover:border-slate-300 hover:bg-slate-50";
                                    if (isSubmitted && isAnswer) style = "border-emerald-300 bg-emerald-50";
                                    else if (isSubmitted && isSelected && !isAnswer) style = "border-red-300 bg-red-50";
                                    else if (isSelected) style = "border-slate-400 bg-slate-100 ring-2 ring-slate-200";

                                    return (
                                        <button
                                            key={optIdx}
                                            onClick={() => select(q.id, optIdx)}
                                            disabled={isSubmitted}
                                            className={`w-full text-right px-4 py-3 rounded-xl border transition-all duration-200 ${style} ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground">{opt}</span>
                                                {isSubmitted && isAnswer && <CheckCircle className="w-4 h-4 text-emerald-700" />}
                                                {isSubmitted && isSelected && !isAnswer && <XCircle className="w-4 h-4 text-red-700" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {!isSubmitted && selectedIdx !== null && selectedIdx !== undefined && (
                                <button
                                    onClick={() => submit(q.id)}
                                    className="px-5 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors shadow-sm"
                                >
                                    בדוק תשובה
                                </button>
                            )}

                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className={`px-5 py-4 rounded-xl text-sm border ${isCorrect ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                                            <p className="font-bold mb-2 flex items-center gap-2">
                                                {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                {isCorrect ? "נכון!" : "לא מדויק"}
                                            </p>
                                            <div className="text-foreground/90 markdown-content leading-relaxed">
                                                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
                                                    {q.explanation}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
