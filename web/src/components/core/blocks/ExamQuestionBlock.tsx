"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, FileText, Settings, Play, CheckSquare, Square } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";

export interface ExamQuestion {
    id: string;
    number: number;
    type: "multiple-choice" | "open-ended" | "multiple-select";
    question: string;
    points: number;
    // Multiple choice fields
    options?: string[];
    correctIndex?: number;
    correctIndices?: number[];
    // Open-ended fields
    modelAnswer?: string;
    gradingCriteria?: string[];
}

interface ExamQuestionBlockProps {
    questions: ExamQuestion[];
    showAnswersAtEnd?: boolean;
}

type Mode = "practice" | "exam";

export const ExamQuestionBlock: React.FC<ExamQuestionBlockProps> = ({
    questions,
    showAnswersAtEnd = true
}) => {
    const [mode, setMode] = useState<Mode>("exam");
    const [answers, setAnswers] = useState<Record<string, number | number[] | string>>({});
    const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
    const [examSubmitted, setExamSubmitted] = useState(false);

    // Reset state when switching modes
    const switchMode = (newMode: Mode) => {
        if (newMode === mode) return;
        if (Object.keys(answers).length > 0 && !confirm("החלפת מצב תאפס את התשובות שלך. להמשיך?")) {
            return;
        }
        setMode(newMode);
        setAnswers({});
        setSubmitted({});
        setExamSubmitted(false);
    };

    const handleSingleSelect = (qId: string, optIdx: number) => {
        if (submitted[qId] || examSubmitted) return;
        setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    };

    const handleMultiSelect = (qId: string, optIdx: number) => {
        if (submitted[qId] || examSubmitted) return;
        setAnswers((prev) => {
            const current = prev[qId];
            const currentSelection: number[] = Array.isArray(current) ? current : [];
            if (currentSelection.includes(optIdx)) {
                return { ...prev, [qId]: currentSelection.filter((i) => i !== optIdx) };
            } else {
                return { ...prev, [qId]: [...currentSelection, optIdx].sort((a, b) => a - b) };
            }
        });
    };

    const updateOpenEnded = (qId: string, value: string) => {
        if (submitted[qId] || examSubmitted) return;
        setAnswers((prev) => ({ ...prev, [qId]: value }));
    };

    const submitSingleQuestion = (qId: string) => {
        setSubmitted((prev) => ({ ...prev, [qId]: true }));
    };

    const submitExam = () => {
        if (!confirm("האם אתה בטוח שברצונך להגיש את המבחן? לא ניתן לשנות תשובות לאחר ההגשה.")) return;
        setExamSubmitted(true);
        // Mark all as submitted
        const allSubmitted: Record<string, boolean> = {};
        questions.forEach(q => allSubmitted[q.id] = true);
        setSubmitted(allSubmitted);
    };

    // Calculation Logic
    const calculateScore = () => {
        return questions.reduce((sum, q) => {
            const answer = answers[q.id];
            if (!submitted[q.id] && !examSubmitted) return sum;

            if (q.type === "multiple-choice") {
                if (answer === q.correctIndex) return sum + q.points;
            }
            else if (q.type === "multiple-select") {
                const correctIndices = q.correctIndices || [];
                const selectedList = (answer as number[]) || [];

                // Exact match required for full points (strict grading)
                const isExactMatch =
                    selectedList.length === correctIndices.length &&
                    selectedList.every((val) => correctIndices.includes(val));

                if (isExactMatch) return sum + q.points;
            }
            // Open ended questions don't automatically score, but we could add self-grading logic later
            return sum;
        }, 0);
    };

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const currentScore = calculateScore();
    const submittedCount = Object.keys(submitted).length;

    return (
        <div className="space-y-8 select-none">
            {/* Control Panel & Header */}
            <div className="bg-card/50 border border-border/40 rounded-2xl p-6 backdrop-blur-sm sticky top-20 z-10 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                            <FileText className="w-6 h-6 text-sky-800" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">סימולציית מבחן</h3>
                            <p className="text-sm text-muted-foreground">
                                {questions.length} שאלות • {totalPoints} נקודות
                            </p>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        מבחן סימולציה
                    </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                        הגשה בסוף המבחן
                    </div>
                    {!examSubmitted && (
                        <div className="font-mono text-amber-700">
                            מבחן פעיל
                        </div>
                    )}
                </div>

                {/* Score Display (Only After Exam) */}
                {examSubmitted && (
                    <div className="mt-4 pt-4 border-t border-border/20 flex justify-between items-center">
                        <span className="font-bold">ציון סופי:</span>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-black text-sky-800">{currentScore}</span>
                            <span className="text-sm text-muted-foreground mb-1">/ {totalPoints}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
                {questions.map((q, idx) => {
                    const answer = answers[q.id];
                    const isSubmitted = submitted[q.id] || examSubmitted;

                    // Logic for showing correctness
                    // In PRACTICE: Show immediately after submit
                    // In EXAM: Show only after Exam Submit
                    const showFeedback = isSubmitted;

                    let statusIcon = null;
                    let isCorrect = false;

                    if (showFeedback) {
                        if (q.type === "multiple-choice") {
                            isCorrect = answer === q.correctIndex;
                        } else if (q.type === "multiple-select") {
                            const correctIndices = q.correctIndices || [];
                            const selectedList = (answer as number[]) || [];
                            isCorrect = selectedList.length === correctIndices.length &&
                                selectedList.every((val) => correctIndices.includes(val));
                        }

                        // Open ended handled differently or just marked as submitted
                        if (q.type !== "open-ended") {
                            statusIcon = isCorrect
                                ? <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                                : <XCircle className="w-6 h-6 text-rose-700" />;
                        }
                    }

                    return (
                        <div
                            key={q.id}
                            className={clsx(
                                "border rounded-2xl overflow-hidden transition-all duration-300",
                                showFeedback
                                    ? (isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200")
                                    : "bg-card/30 border-border/40 hover:border-border/60"
                            )}
                        >
                            {/* Question Header */}
                            <div className="px-6 py-4 flex items-center justify-between border-b border-black/5  bg-black/5 ">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-sky-800">
                                        {q.number}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {q.type === "multiple-choice" && "בחירה יחידה"}
                                            {q.type === "multiple-select" && "בחירה מרובה (סמן הכל)"}
                                            {q.type === "open-ended" && "שאלה פתוחה"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold bg-primary/10 text-sky-800 px-2 py-1 rounded">
                                        {q.points} נק׳
                                    </span>
                                    {statusIcon}
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Question Content */}
                                <div className="text-lg font-medium mb-6 markdown-content">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{q.question}</ReactMarkdown>
                                </div>

                                {/* Options Area */}
                                <div className="space-y-3">
                                    {/* Multiple Choice / Select */}
                                    {(q.type === "multiple-choice" || q.type === "multiple-select") && q.options?.map((opt, optIdx) => {
                                        const isMulti = q.type === "multiple-select";
                                        const selected = isMulti
                                            ? ((answer as number[]) || []).includes(optIdx)
                                            : answer === optIdx;

                                        // Styling Logic for Feedback
                                        let optionStyle = "border-border/40 hover:bg-primary/5 hover:border-primary/30";

                                        if (showFeedback) {
                                            const isTrulyCorrect = isMulti
                                                ? q.correctIndices?.includes(optIdx)
                                                : q.correctIndex === optIdx;

                                            if (isTrulyCorrect) {
                                                optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-700  ring-1 ring-emerald-500";
                                            } else if (selected && !isTrulyCorrect) {
                                                optionStyle = "bg-rose-50 border-rose-500 text-rose-700 ";
                                            } else {
                                                optionStyle = "opacity-50 border-transparent";
                                            }
                                        } else if (selected) {
                                            optionStyle = "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(var(--primary),1)]";
                                        }

                                        return (
                                            <button
                                                key={optIdx}
                                                onClick={() => isMulti ? handleMultiSelect(q.id, optIdx) : handleSingleSelect(q.id, optIdx)}
                                                disabled={showFeedback}
                                                className={clsx(
                                                    "w-full text-right p-4 rounded-xl border transition-all flex items-start gap-4 group",
                                                    optionStyle,
                                                    showFeedback && "cursor-default"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors",
                                                    isMulti ? "rounded-md" : "rounded-full",
                                                    selected
                                                        ? "bg-primary border-primary text-primary-foreground"
                                                        : "border-muted-foreground/30 group-hover:border-primary/50"
                                                )}>
                                                    {selected && (isMulti ? <CheckSquare size={12} /> : <div className="w-2 h-2 bg-current rounded-full" />)}
                                                </div>
                                                <span className="leading-relaxed">{opt}</span>
                                            </button>
                                        );
                                    })}

                                    {/* Open Ended */}
                                    {q.type === "open-ended" && (
                                        <div className="space-y-4">
                                            <textarea
                                                value={(answer as string) || ""}
                                                onChange={(e) => updateOpenEnded(q.id, e.target.value)}
                                                disabled={showFeedback}
                                                placeholder="הקלד/י את התשובה שלך כאן..."
                                                className="w-full min-h-[120px] p-4 rounded-xl border border-border/40 bg-background resize-y focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 disabled:opacity-70"
                                                dir="rtl"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Actions & Feedback Section */}
                                <div className="mt-8 flex flex-col items-start gap-4">
                                    {/* Practice Mode Submit Button (Per Question) */}
                                    {mode === "practice" && !isSubmitted && (
                                        <button
                                            onClick={() => submitSingleQuestion(q.id)}
                                            disabled={!answer || (Array.isArray(answer) && answer.length === 0)}
                                            className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            בדיקה
                                        </button>
                                    )}

                                    {/* Explanation / Model Answer (Visible ONLY after submit) */}
                                    {showFeedback && (
                                        <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
                                            {/* Logic explaination would go here if we had it per question, assuming modelAnswer serves this purpose or we add an 'explanation' field later */}
                                            {q.modelAnswer && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                                    <div className="flex items-center gap-2 mb-2 text-sky-800  font-bold">
                                                        <HelpCircle size={18} />
                                                        הסבר / תשובה מודל
                                                    </div>
                                                    <div className="markdown-content text-sm text-foreground">
                                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{q.modelAnswer}</ReactMarkdown>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Exam Mode Global Submit */}
            {mode === "exam" && !examSubmitted && (
                <div className="sticky bottom-6 z-20 flex justify-center">
                    <button
                        onClick={submitExam}
                        className="shadow-xl shadow-primary/20 bg-primary text-primary-foreground text-lg px-12 py-4 rounded-2xl font-black hover:scale-105 transition-transform"
                    >
                        הגש מבחן וקבל ציון 🏁
                    </button>
                </div>
            )}
        </div>
    );
};
