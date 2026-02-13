"use client";

import React, { useState } from "react";
import { Gamepad2, RefreshCcw, CheckCircle2, XCircle, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
    label: string;
    correctCategory: string;
}

interface ClassificationGameProps {
    data: {
        type: string;
        title: string;
        instructions: string;
        items: Item[];
    };
    className?: string;
}

/**
 * [8] INTERACTIVE ELEMENT: Classification Game
 * Purpose: Gamified learning for active recall.
 * Design: Neon gaming aesthetic with Framer Motion feedback.
 */
export const ClassificationGame: React.FC<ClassificationGameProps> = ({ data, className }) => {
    if (data.type !== "classification-game") return null;

    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(null);
    const [gameOver, setGameOver] = useState(false);

    const categories = Array.from(new Set(data.items.map(item => item.correctCategory)));
    const currentItem = data.items[currentItemIndex];

    const handleGuess = (category: string) => {
        if (showResult !== null) return;

        const isCorrect = category === currentItem.correctCategory;
        setShowResult(isCorrect ? "correct" : "incorrect");

        if (isCorrect) setScore(s => s + 1);

        setTimeout(() => {
            setShowResult(null);
            if (currentItemIndex < data.items.length - 1) {
                setCurrentItemIndex(prev => prev + 1);
            } else {
                setGameOver(true);
            }
        }, 1500);
    };

    const resetGame = () => {
        setCurrentItemIndex(0);
        setScore(0);
        setShowResult(null);
        setGameOver(false);
    };

    if (gameOver) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn("w-full my-12 bg-slate-900/60 backdrop-blur-3xl border border-teal-500/20 rounded-[2.5rem] p-12 text-center space-y-8", className)}
            >
                <div className="flex justify-center flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 shadow-[0_0_50px_rgba(20,184,166,0.2)]">
                        <Trophy size={48} />
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tight">!כל הכבוד</h3>
                    <p className="text-slate-400 text-xl font-medium mt-2">סיימת את האתגר בהצלחה</p>
                </div>

                <div className="text-6xl font-black text-teal-400 font-mono tracking-tighter">
                    {score} / {data.items.length}
                </div>

                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetGame}
                        className="flex items-center gap-3 px-10 py-5 bg-teal-500 text-slate-950 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(20,184,166,0.2)] hover:shadow-[0_0_40px_rgba(20,184,166,0.4)] transition-all"
                    >
                        <RefreshCcw className="w-6 h-6" />
                        שחק שוב
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={cn("w-full my-16 bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative", className)}>
            {/* Ambient Background Polishing */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center gap-5 mb-12">
                    <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                        <Gamepad2 size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase border-b-2 border-indigo-500/30 pb-1">
                            {data.title}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">
                            {data.instructions}
                        </p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-10">
                    {/* Progress Bar */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                            <span>שאלה {currentItemIndex + 1} מתוך {data.items.length}</span>
                            <span className="text-teal-400">ניקוד: {score}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-teal-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentItemIndex + 1) / data.items.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* The Active Item Card */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentItemIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={cn(
                                    "p-16 rounded-[2rem] shadow-2xl text-4xl md:text-5xl font-black bg-slate-900/60 border-2 transition-all duration-300 text-center min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden",
                                    showResult === "correct" ? "border-emerald-500 bg-emerald-500/5" :
                                        showResult === "incorrect" ? "border-rose-500 bg-rose-500/5" : "border-slate-800"
                                )}
                            >
                                <motion.span
                                    className="text-white relative z-10"
                                    animate={showResult === "incorrect" ? { x: [-10, 10, -10, 10, 0] } : {}}
                                >
                                    {currentItem.label}
                                </motion.span>

                                <AnimatePresence>
                                    {showResult === "correct" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500/10 backdrop-blur-sm"
                                        >
                                            <CheckCircle2 size={64} className="text-emerald-400 mb-4" />
                                            <span className="text-emerald-400 text-lg font-bold">!מעולה 🎉</span>
                                        </motion.div>
                                    )}
                                    {showResult === "incorrect" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-rose-500/10 backdrop-blur-sm"
                                        >
                                            <XCircle size={64} className="text-rose-400 mb-4" />
                                            <span className="text-rose-400 text-lg font-bold">לא מדויק... זה {currentItem.correctCategory} 😬</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Categories Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleGuess(category)}
                                disabled={showResult !== null}
                                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 transition-all font-black text-slate-200 text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-teal-500/50"
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
