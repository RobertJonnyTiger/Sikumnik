"use client";

import React, { useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { Check, X, HelpCircle, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Question {
    id: string;
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface CheckpointQuizProps {
    questions: Question[];
}

export const CheckpointQuiz: React.FC<CheckpointQuizProps> = ({
    questions,
}) => {
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const handleSelect = (qId: string, optionIdx: number) => {
        setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    };

    return (
        <SectionWrapper id="checkpoint" sectionNumber={9} title="בדיקה מהירה">
            <div className="space-y-12">
                {questions.map((q, qIdx) => {
                    const selected = answers[q.id];
                    const isAnswered = selected !== undefined;
                    const isCorrect = selected === q.correctIndex;

                    return (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: qIdx * 0.2 }}
                            className={cn(
                                "relative overflow-hidden rounded-3xl border transition-all duration-700",
                                "bg-slate-900/40 backdrop-blur-md border-white/5 shadow-2xl",
                                isAnswered && isCorrect && "border-emerald-500/30 shadow-emerald-500/5",
                                isAnswered && !isCorrect && "border-rose-500/30 shadow-rose-500/5"
                            )}
                        >
                            {/* Visual Wallpaper / Watermarks */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden select-none">
                                {/* Diagonal Texture */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px]" />

                                {/* Large Watermark Icons */}
                                <HelpCircle
                                    size={300}
                                    className="absolute -top-20 -right-20 text-white rotate-12"
                                    strokeWidth={0.5}
                                />
                                <div className="absolute bottom-10 left-10 text-6xl font-black text-white opacity-20 rotate-[-12deg] select-none">
                                    ?
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-white opacity-[0.02] select-none">
                                    {String(qIdx + 1).padStart(2, '0')}
                                </div>
                            </div>

                            {/* Glass Accent Glow */}
                            <div className="absolute -top-12 -left-12 w-48 h-48 bg-teal-500/10 blur-[80px] pointer-events-none" />

                            <div className="relative z-10 p-6 md:p-10">
                                {/* Question Header */}
                                <div className="flex items-start gap-6 mb-10">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center font-handwriting text-2xl font-black shadow-inner leading-none">
                                        {String(qIdx + 1).padStart(2, '0')}
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1 leading-snug">
                                        {q.text}
                                    </h4>
                                </div>

                                {/* Options Grid */}
                                <div className="space-y-4 md:pr-16">
                                    {q.options.map((opt, optIdx) => {
                                        const isSelected = selected === optIdx;
                                        const isThisCorrect = optIdx === q.correctIndex;

                                        let stateClasses = "border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:border-white/10 hover:text-white";
                                        let icon = null;

                                        if (isAnswered) {
                                            if (isThisCorrect) {
                                                stateClasses = "border-emerald-500/50 bg-emerald-500/10 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.1)]";
                                                icon = <Check size={20} className="text-emerald-500" strokeWidth={3} />;
                                            } else if (isSelected && !isCorrect) {
                                                stateClasses = "border-rose-500/50 bg-rose-500/10 text-rose-100 animate-shake";
                                                icon = <X size={20} className="text-rose-500" strokeWidth={3} />;
                                            } else {
                                                stateClasses = "opacity-40 border-white/5 bg-transparent";
                                            }
                                        }

                                        return (
                                            <motion.button
                                                key={optIdx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (qIdx * 0.2) + (optIdx * 0.1) }}
                                                whileHover={!isAnswered ? { scale: 1.01, x: 5 } : {}}
                                                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                                onClick={() => !isAnswered && handleSelect(q.id, optIdx)}
                                                disabled={isAnswered}
                                                className={cn(
                                                    "group relative w-full text-right p-5 md:p-6 rounded-2xl border transition-all flex items-center justify-between overflow-hidden",
                                                    stateClasses
                                                )}
                                            >
                                                <span className="text-lg font-medium relative z-10">{opt}</span>
                                                <div className="relative z-10">
                                                    {icon}
                                                </div>

                                                {!isAnswered && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/[0.03] to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Explanation Disclosure */}
                                <AnimatePresence>
                                    {isAnswered && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            className="md:pr-16"
                                        >
                                            <div
                                                className={cn(
                                                    "p-6 rounded-2xl border backdrop-blur-sm",
                                                    isCorrect
                                                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-200/90"
                                                        : "bg-rose-500/5 border-rose-500/20 text-rose-200/90"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={cn(
                                                        "p-1.5 rounded-lg",
                                                        isCorrect ? "bg-emerald-500/20" : "bg-rose-500/20"
                                                    )}>
                                                        {isCorrect ? <Check size={14} /> : <HelpCircle size={14} />}
                                                    </div>
                                                    <span className="font-bold tracking-tight">
                                                        {isCorrect ? "תשובה נכונה!" : "הסבר קצר..."}
                                                    </span>
                                                </div>
                                                <p className="text-sm leading-relaxed opacity-80">
                                                    {q.explanation}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
};
