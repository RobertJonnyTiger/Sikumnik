"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { LessonMarkdown } from "./LessonMarkdown";
import { motion, AnimatePresence } from "framer-motion";
import "katex/dist/katex.min.css";
import type { QuizQuestion } from "@/types/chapter";

interface CheckpointQuizProps {
    questions: QuizQuestion[];
}

type ChoiceState = "idle" | "selected" | "correct" | "wrong" | "reveal";

function getChoiceState(
    optIdx: number,
    correctIndex: number,
    selectedIdx: number | null | undefined,
    isSubmitted: boolean
): ChoiceState {
    if (!isSubmitted) return selectedIdx === optIdx ? "selected" : "idle";
    if (optIdx === correctIndex && selectedIdx === optIdx) return "correct";
    if (optIdx !== correctIndex && selectedIdx === optIdx) return "wrong";
    if (optIdx === correctIndex) return "reveal";
    return "idle";
}

const choiceStyles: Record<ChoiceState, string> = {
    idle: [
        "bg-white border-2 border-gray-200 text-gray-700",
        "hover:border-indigo-400 hover:bg-indigo-50/60",
        "hover:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]",
        "hover:scale-[1.02] active:scale-[0.98]",
    ].join(" "),
    selected:
        "bg-indigo-50 border-2 border-indigo-400 text-indigo-800 shadow-sm scale-[1.01]",
    correct: "bg-emerald-50 border-2 border-emerald-400 text-emerald-800",
    wrong: "bg-rose-50 border-2 border-rose-400 text-rose-800",
    reveal: "bg-emerald-50/60 border-2 border-emerald-200 text-emerald-600",
};

function shouldUseGrid(options: string[]): boolean {
    return options.length === 4 && options.every((o) => o.length < 24);
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
        <div
            className="rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-md my-6 transition-shadow duration-300 hover:shadow-lg"
            dir="rtl"
        >
            {/* Header */}
            <div className="bg-indigo-500 text-white px-5 py-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-black text-sm uppercase tracking-widest flex-1">
                    בדיקת הבנה
                </h4>
                {totalSubmitted > 0 && (
                    <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full font-mono">
                        {score}/{totalSubmitted}
                    </span>
                )}
            </div>

            {/* Questions */}
            <div className="bg-white p-4 space-y-6">
                {questions.map((q, qIdx) => {
                    const isSubmitted = submitted[q.id];
                    const selectedIdx = answers[q.id];
                    const isCorrect = selectedIdx === q.correctIndex;
                    const useGrid = shouldUseGrid(q.options);

                    return (
                        <div key={q.id}>
                            {/* Question text */}
                            <div className="flex items-start gap-2 mb-4">
                                <span className="w-6 h-6 rounded-lg bg-indigo-500 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                                    {qIdx + 1}
                                </span>
                                <div className="flex-1 font-medium text-gray-800 markdown-content">
                                    <LessonMarkdown>{q.question}</LessonMarkdown>
                                </div>
                            </div>

                            {/* Choices */}
                            <div
                                className={
                                    useGrid
                                        ? "grid grid-cols-2 gap-2 mb-3"
                                        : "flex flex-col gap-2 mb-3"
                                }
                            >
                                {q.options.map((opt, optIdx) => {
                                    const state = getChoiceState(
                                        optIdx,
                                        q.correctIndex,
                                        selectedIdx,
                                        !!isSubmitted
                                    );

                                    return (
                                        <button
                                            key={optIdx}
                                            onClick={() => select(q.id, optIdx)}
                                            disabled={!!isSubmitted}
                                            className={`
                        w-full flex items-center justify-center gap-2
                        px-4 py-3 rounded-2xl
                        transition-all duration-200
                        cursor-pointer disabled:cursor-default
                        ${choiceStyles[state]}
                      `}
                                        >
                                            {/* Status icon — only after submit */}
                                            {state === "correct" && (
                                                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                                    ✓
                                                </span>
                                            )}
                                            {state === "wrong" && (
                                                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                                    ✗
                                                </span>
                                            )}
                                            {state === "reveal" && (
                                                <span className="w-4 h-4 rounded-full bg-emerald-300 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                                    ✓
                                                </span>
                                            )}

                                            {/* Option text — centered, markdown+math aware */}
                                            <span className="text-center text-sm markdown-content">
                                                <LessonMarkdown>{opt}</LessonMarkdown>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Submit button */}
                            {!isSubmitted &&
                                selectedIdx !== null &&
                                selectedIdx !== undefined && (
                                    <button
                                        onClick={() => submit(q.id)}
                                        className="px-5 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-black hover:bg-indigo-600 transition-colors shadow-sm"
                                    >
                                        בדוק תשובה
                                    </button>
                                )}

                            {/* Explanation — smooth Framer Motion reveal */}
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        key="explanation"
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div
                                            className={`px-5 py-4 rounded-2xl border-2 text-sm ${isCorrect
                                                    ? "bg-emerald-50 border-emerald-200"
                                                    : "bg-rose-50 border-rose-200"
                                                }`}
                                        >
                                            {/* Explanation header */}
                                            <p
                                                className={`font-black mb-2 flex items-center gap-2 ${isCorrect ? "text-emerald-700" : "text-rose-700"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center ${isCorrect ? "bg-emerald-500" : "bg-rose-500"
                                                        }`}
                                                >
                                                    {isCorrect ? "✓" : "✗"}
                                                </span>
                                                {isCorrect ? "נכון!" : "לא מדויק"}
                                            </p>

                                            {/* Explanation body */}
                                            <div
                                                className={`leading-relaxed markdown-content ${isCorrect ? "text-emerald-900" : "text-rose-900"
                                                    }`}
                                            >
                                                <LessonMarkdown>{q.explanation}</LessonMarkdown>
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
