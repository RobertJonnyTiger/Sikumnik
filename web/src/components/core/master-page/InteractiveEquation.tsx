"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, RotateCcw, Activity, Plus, Minus, Divide, Percent, Equal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getConnotationColor } from "@/lib/financial-utils";

const NumberTicker = ({ value, className }: { value: number | string, className?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [mounted, setMounted] = useState(false);
    const target = typeof value === "number" ? value : parseFloat(value.toString().replace(/,/g, ''));

    useEffect(() => {
        setMounted(true);
        if (isNaN(target)) return;
        const start = 0;
        const duration = 1000; // 1s
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out expo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const current = Math.floor(easeProgress * target);
            setDisplayValue(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [target]);

    // Ensure the initial render matches the server output exactly
    if (!mounted || isNaN(target)) {
        return <span className={className}>{mounted ? displayValue.toLocaleString() : "0"}</span>;
    }

    return (
        <span className={className}>
            {displayValue.toLocaleString()}
        </span>
    );
};

interface EquationChunk {
    type: "number" | "operator" | "text" | "input";
    value?: string | number;
    label?: string;
    connotation?: "positive" | "negative" | "neutral" | "warning" | "info" | "success";
    id?: string;
    placeholder?: string;
    correctAnswer?: number | string;
}

interface InteractiveEquationProps {
    chunks: EquationChunk[];
    title?: string;
    description?: string;
    className?: string;
}

export const InteractiveEquation: React.FC<InteractiveEquationProps> = ({ chunks, title, description, className }) => {
    const [showResults, setShowResults] = useState(false);

    return (
        <div
            className={cn(
                "relative bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl transition-all duration-700",
                showResults ? "ring-2 ring-teal-500/20" : "",
                className
            )}
        >
            {/* Math Watermarks Wallpaper */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                <Plus size={140} className="absolute -top-10 -left-10 rotate-[-15deg]" />
                <Minus size={100} className="absolute bottom-10 right-1/4 rotate-10" />
                <Divide size={120} className="absolute top-1/2 -right-10 rotate-[-20deg]" />
                <Percent size={160} className="absolute -bottom-20 -left-20" />
                <Equal size={80} className="absolute top-1/4 left-1/3 rotate-45" />
            </div>

            {/* Background Neon Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Header Hint */}
                <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-slate-950/50 border border-slate-800 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                    <Activity size={12} className="text-teal-400" />
                    <span>סימולציית חישוב חכמה (Interactive Calc)</span>
                </div>

                {title && (
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight uppercase">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-slate-400 mb-10 max-w-xl text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                )}

                {/* The Equation Rail */}
                <div className="w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-12 md:gap-x-12 mb-16">
                    {chunks.map((chunk, idx) => {
                        if (chunk.type === "number") {
                            // Priority: Explicit connotation -> Label-based auto-detection -> Default White
                            const connotationColor = chunk.connotation
                                ? getConnotationColor(chunk.connotation)
                                : getConnotationColor(chunk.label || "neutral");

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div className={cn(
                                        "text-4xl md:text-6xl font-mono font-bold tracking-tighter transition-all duration-700",
                                        connotationColor,
                                        "drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                    )}>
                                        <NumberTicker value={chunk.value ?? 0} />
                                    </div>
                                    {chunk.label && (
                                        <span className="text-[10px] md:text-xs text-slate-500 font-sans font-bold uppercase tracking-[0.2em] opacity-60">
                                            {chunk.label}
                                        </span>
                                    )}
                                </motion.div>
                            );

                        }

                        if (chunk.type === "operator") {
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, rotate: -20 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: idx * 0.12 }}
                                    className="text-2xl md:text-4xl font-light text-slate-700 font-sans py-2"
                                >
                                    {chunk.value}
                                </motion.div>
                            );
                        }

                        if (chunk.type === "input") {
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder={chunk.placeholder || "?"}
                                            className="w-24 md:w-32 h-16 md:h-20 bg-slate-950/50 border-2 border-slate-800 rounded-2xl text-center text-2xl md:text-4xl font-mono font-bold text-teal-400 focus:border-teal-500 outline-hidden transition-all"
                                        />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-500 font-sans font-bold uppercase tracking-[0.2em] opacity-60">
                                        {chunk.label}
                                    </span>
                                </motion.div>
                            );
                        }

                        return (
                            <div key={idx} className="text-xl text-slate-400 font-assistant">
                                {chunk.value}
                            </div>
                        );
                    })}
                </div>

                {/* Insight Call-to-Action */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowResults(!showResults)}
                    className={cn(
                        "group relative px-10 py-5 rounded-2xl font-bold transition-all duration-500 overflow-hidden",
                        showResults
                            ? "bg-slate-950 text-emerald-400 border border-emerald-500/30"
                            : "bg-teal-500 text-slate-950 shadow-[0_0_40px_rgba(20,184,166,0.2)]"
                    )}
                >
                    <div className="relative z-10 flex items-center gap-3">
                        {showResults ? <RotateCcw size={20} /> : <Check size={20} />}
                        <span className="text-lg">
                            {showResults ? "אפס נתונים (Reset)" : "חשב תוצאה (Calculate)"}
                        </span>
                    </div>

                    {!showResults && (
                        <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                </motion.button>
            </div>

            {/* Background Polish */}
            {!showResults && (
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-teal-500/2 pointer-events-none" />
            )}
        </div>
    );
};
