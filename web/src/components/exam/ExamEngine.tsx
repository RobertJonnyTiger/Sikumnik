"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ChevronLeft,
    Lightbulb,
    CheckCircle2,
    XCircle,
    Award,
    RefreshCcw,
    Eye,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExamData, ExamQuestion } from "@/types/exam";

interface ExamEngineProps {
    data: ExamData;
}

export function ExamEngine({ data }: ExamEngineProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [hintsUsed, setHintsUsed] = useState<Record<string, boolean>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const questions = data.questions;
    const currentQuestion = questions[currentIndex];

    // Calculate score as percentage on submission
    const handleSubmit = () => {
        let earnedPoints = 0;
        let totalPoints = 0;
        questions.forEach(q => {
            totalPoints += q.points;
            const userAnswer = answers[q.id];
            if (userAnswer === q.correctIndex) {
                let points = q.points;
                if (hintsUsed[q.id]) {
                    points *= 0.8; // 20% penalty for using a hint
                }
                earnedPoints += points;
            }
        });
        const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
        setScore(percentage);
        setIsSubmitted(true);
    };

    const handleAnswerSelect = (index: number) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: index }));
    };

    const toggleHint = () => {
        if (isSubmitted) return;
        setHintsUsed(prev => ({ ...prev, [currentQuestion.id]: true }));
    };

    const resetExam = () => {
        setAnswers({});
        setHintsUsed({});
        setIsSubmitted(false);
        setCurrentIndex(0);
        setScore(0);
    };

    if (isSubmitted) {
        return (
            <PostMortemView
                data={data}
                answers={answers}
                hintsUsed={hintsUsed}
                score={score}
                onReset={resetExam}
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8" dir="rtl">
            {/* Header: Progress and Status */}
            <div className="flex items-center justify-between bg-card/50 p-6 rounded-3xl border border-border shadow-xl">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-foreground">{data.title}</h2>
                    <p className="text-muted-foreground text-sm">סימולציה מלאה • {questions.length} שאלות</p>
                </div>
                <div className="text-left">
                    <div className="text-3xl font-black text-sky-800 tabular-nums">
                        {currentIndex + 1}<span className="text-muted-foreground text-xl mx-1">/</span>{questions.length}
                    </div>
                </div>
            </div>

            {/* Main Question Area */}
            <div className="relative min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background subtle indicator */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />

                        <div className="relative z-10 space-y-8">
                            {/* Question Text */}
                            <div className="space-y-4">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-sky-800 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    שאלה {currentQuestion.number}
                                </span>
                                <h3 className="text-2xl font-bold text-foreground leading-relaxed">
                                    {currentQuestion.question}
                                </h3>
                            </div>

                            {/* Options */}
                            <div className="grid gap-3">
                                {currentQuestion.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswerSelect(idx)}
                                        className={cn(
                                            "group flex items-center gap-4 p-5 rounded-2xl border-2 text-right transition-all duration-200",
                                            answers[currentQuestion.id] === idx
                                                ? "bg-primary/20 border-primary text-foreground shadow-lg shadow-sm"
                                                : "bg-muted/40 border-border/50 text-muted-foreground hover:border-slate-500 hover:bg-muted"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 font-bold text-sm transition-colors",
                                            answers[currentQuestion.id] === idx
                                                ? "border-white bg-white text-sky-800"
                                                : "border-slate-600 group-hover:border-slate-400 text-muted-foreground"
                                        )}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className="text-lg font-medium">{option}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Actions: Hint and Nav */}
                            <div className="flex items-center justify-between pt-8 border-t border-border/50">
                                <button
                                    onClick={toggleHint}
                                    disabled={hintsUsed[currentQuestion.id]}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                                        hintsUsed[currentQuestion.id]
                                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                                            : "bg-muted text-muted-foreground hover:text-amber-700 hover:bg-slate-700"
                                    )}
                                >
                                    <Lightbulb className={cn("w-5 h-5", hintsUsed[currentQuestion.id] && "fill-current")} />
                                    {hintsUsed[currentQuestion.id] ? "רמז בשימוש (-20%)" : "צריך רמז?"}
                                </button>

                                <div className="flex gap-4">
                                    {currentIndex > 0 && (
                                        <button
                                            onClick={() => setCurrentIndex(prev => prev - 1)}
                                            className="p-4 bg-muted rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-700 transition-colors"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    )}

                                    {currentIndex < questions.length - 1 ? (
                                        <button
                                            onClick={() => setCurrentIndex(prev => prev + 1)}
                                            disabled={answers[currentQuestion.id] === undefined}
                                            className="flex items-center gap-2 bg-primary hover:bg-primary disabled:opacity-30 disabled:hover:bg-primary text-foreground font-black px-8 py-3 rounded-xl transition-all"
                                        >
                                            הבא
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={Object.keys(answers).length < questions.length}
                                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-foreground font-black px-8 py-3 rounded-xl transition-all shadow-lg shadow-sm"
                                        >
                                            הגש מבחן
                                            <CheckCircle2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Hint Content (If revealed) */}
                        <AnimatePresence>
                            {hintsUsed[currentQuestion.id] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl relative"
                                >
                                    <div className="absolute top-4 left-4 text-amber-700/20">
                                        <Lightbulb className="w-12 h-12" />
                                    </div>
                                    <p className="text-amber-200 text-sm leading-relaxed relative z-10">
                                        <span className="font-bold border-b border-amber-200 mb-2 inline-block">רמז פדגוגי:</span><br />
                                        {currentQuestion.hint}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Quick Navigation Dots */}
            <div className="flex flex-wrap gap-2 justify-center">
                {questions.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => !isSubmitted && setCurrentIndex(idx)}
                        className={cn(
                            "w-10 h-10 rounded-lg font-bold text-sm transition-all tabular-nums",
                            currentIndex === idx ? "bg-primary text-foreground scale-110 shadow-lg" :
                                answers[questions[idx].id] !== undefined ? "bg-slate-700 text-muted-foreground" : "bg-card border border-border text-muted-foreground hover:border-slate-500"
                        )}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

function PostMortemView({ data, answers, hintsUsed, score, onReset }: {
    data: ExamData,
    answers: Record<string, number>,
    hintsUsed: Record<string, boolean>,
    score: number,
    onReset: () => void
}) {
    const isPassed = score >= data.passingScore;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12" dir="rtl">
            {/* Score Hero */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                    "p-12 rounded-5xl border-4 text-center space-y-6 relative overflow-hidden",
                    isPassed ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
                )}
            >
                <div className="relative z-10 space-y-4">
                    <div className={cn(
                        "w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-2xl",
                        isPassed ? "bg-emerald-500 text-foreground" : "bg-rose-500 text-foreground"
                    )}>
                        <Award className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-foreground">{isPassed ? "כל הכבוד! עברת!" : "לא נורא, פעם הבאה תצליח!"}</h2>
                        <p className="text-muted-foreground mt-2 font-medium">ציון סופי: {score} מתוך 100</p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={onReset}
                            className="flex items-center gap-2 bg-muted hover:bg-slate-700 text-foreground font-bold px-8 py-4 rounded-2xl transition-all"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            נסה שוב
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Detailed Review */}
            <div className="space-y-6">
                <h3 className="text-2xl font-black text-foreground px-2">סקירת תשובות (Post-Mortem)</h3>
                {data.questions.map((q, idx) => {
                    const isCorrect = answers[q.id] === q.correctIndex;
                    const usedHint = hintsUsed[q.id];

                    return (
                        <div key={q.id} className="bg-card border border-border rounded-3xl p-8 space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-lg uppercase">שאלה {q.number}</span>
                                        {isCorrect ? (
                                            <span className="flex items-center gap-1 text-emerald-700 text-sm font-bold">
                                                <CheckCircle2 className="w-4 h-4" />
                                                נכון {usedHint && "(עם רמז)"}
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-rose-700 text-sm font-bold">
                                                <XCircle className="w-4 h-4" />
                                                טעות
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-xl font-bold text-foreground">{q.question}</h4>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {q.options.map((option, optIdx) => {
                                    const isSelected = answers[q.id] === optIdx;
                                    const isAnswerKey = q.correctIndex === optIdx;

                                    return (
                                        <div
                                            key={optIdx}
                                            className={cn(
                                                "p-4 rounded-xl border flex items-center gap-4",
                                                isAnswerKey ? "bg-emerald-50 border-emerald-200 text-emerald-900" :
                                                    isSelected ? "bg-rose-50 border-rose-200 text-rose-900" :
                                                        "bg-muted/20 border-border text-muted-foreground opacity-60"
                                            )}
                                        >
                                            {isAnswerKey ? <CheckCircle2 className="w-5 h-5 text-emerald-700" /> :
                                                isSelected ? <XCircle className="w-5 h-5 text-rose-700" /> :
                                                    <div className="w-5 h-5" />}
                                            <span className="font-medium">{option}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Reasoning Reveal */}
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                                    <Eye className="w-4 h-4" />
                                    נימוק המרצה:
                                </div>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    {isCorrect ? (
                                        <p className="text-emerald-700 font-bold">✓ בחרת נכון! {q.reasoning.correct}</p>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-rose-700 font-bold">✗ בחרת: {q.options[answers[q.id]]} — {q.reasoning.wrong[String(answers[q.id])] || "תשובה שגויה."}</p>
                                            <p className="text-emerald-700 font-bold border-t border-primary/10 pt-3">✓ התשובה הנכונה: {q.options[q.correctIndex]} — {q.reasoning.correct}</p>
                                        </div>
                                    )}
                                    <div className="space-y-2 opacity-80 border-t border-primary/10 pt-4">
                                        <p className="text-xs uppercase font-black text-muted-foreground mb-2">למה האחרות לא?</p>
                                        {Object.entries(q.reasoning.wrong).map(([key, text]) => (
                                            <p key={key} className="text-sm">• {q.options[parseInt(key)]}: {text}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
