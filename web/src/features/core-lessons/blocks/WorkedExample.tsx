"use client";

import React, { useState } from "react";
import { Calculator, Eye, ChevronDown } from "lucide-react";
import { LessonMarkdown } from "./LessonMarkdown";
import { motion, AnimatePresence } from "framer-motion";

interface WorkedExampleProps {
    title: string;
    scenario: string;
    solution: string;
    calculation?: string;
}

export const WorkedExample: React.FC<WorkedExampleProps> = ({ title, scenario, solution, calculation }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-card border border-[--color-border-card] rounded-2xl overflow-hidden my-8 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
        >
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-success/10 p-2 rounded-lg border border-success/20">
                        <Calculator className="w-5 h-5 text-success" />
                    </div>
                    <h4 className="text-sm font-black text-primary uppercase tracking-wider font-heading">{title}</h4>
                </div>
                <div className="text-foreground leading-relaxed text-lg">
                    <LessonMarkdown>{scenario}</LessonMarkdown>
                </div>
            </div>

            {calculation && (
                <div className="bg-muted/30 px-6 py-5 border-t border-[--color-border-card]">
                    <ol className="font-mono text-primary-foreground text-xl list-none space-y-3" style={{ color: 'var(--color-secondary-foreground)' }}>
                        {calculation.split('\n').map((line, idx) => (
                            <li key={idx} className="flex items-baseline gap-3">
                                <span className="text-xs text-muted-foreground font-sans">{idx + 1}.</span>
                                <LessonMarkdown>
                                    {(() => {
                                        const cleanLine = line.replace(/^\d+[\.\)]\s*/, '');
                                        return cleanLine.includes('$') ? cleanLine : `$$${cleanLine}$$`;
                                    })()}
                                </LessonMarkdown>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <div className="border-t border-[--color-border-card]">
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full px-6 py-4 flex items-center justify-between group/btn hover:bg-success/5 transition-colors"
                >
                    <div className="flex items-center gap-2 text-base font-bold text-primary">
                        <Eye className="w-5 h-5" />
                        {showSolution ? "הסתר פתרון" : "הצג פתרון"}
                    </div>
                    <div className={`transition-transform duration-300 ${showSolution ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </div>
                </button>
                <AnimatePresence>
                    {showSolution && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-6 pt-2 text-foreground/90 leading-relaxed text-lg">
                                <LessonMarkdown>{solution}</LessonMarkdown>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
