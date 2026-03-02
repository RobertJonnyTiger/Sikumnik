"use client";

import React, { useState } from "react";
import { Calculator, Eye, ChevronDown } from "lucide-react";
import { LessonMarkdown } from "./LessonMarkdown";

interface WorkedExampleProps {
    title: string;
    scenario: string;
    solution: string;
    calculation?: string;
}

export const WorkedExample: React.FC<WorkedExampleProps> = ({ title, scenario, solution, calculation }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="academic-card group p-0 overflow-hidden my-8 border-success/20">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-success/10 p-2 rounded-lg border border-success/20">
                        <Calculator className="w-5 h-5 text-success" />
                    </div>
                    <h4 className="text-sm font-black text-success uppercase tracking-wider font-heading">{title}</h4>
                </div>
                <div className="text-foreground leading-relaxed text-lg">
                    <LessonMarkdown>{scenario}</LessonMarkdown>
                </div>
            </div>

            {calculation && (
                <div className="bg-muted px-6 py-5 border-t border-success/10">
                    <ol className="font-mono text-success text-xl list-none space-y-3">
                        {calculation.split('\n').map((line, idx) => (
                            <li key={idx} className="flex items-baseline gap-3">
                                <span className="text-xs text-success/50 font-sans">{idx + 1}.</span>
                                <LessonMarkdown>{line.replace(/^\d+[\.\)]\s*/, '')}</LessonMarkdown>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <div className="border-t border-success/10">
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full px-6 py-4 flex items-center justify-between group/btn hover:bg-success/5 transition-colors"
                >
                    <div className="flex items-center gap-2 text-base font-bold text-success">
                        <Eye className="w-5 h-5" />
                        {showSolution ? "הסתר פתרון" : "הצג פתרון"}
                    </div>
                    <div className={`transition-transform duration-300 ${showSolution ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-success/50" />
                    </div>
                </button>
                {showSolution && (
                    <div className="px-6 pb-6 pt-2 text-foreground/90 leading-relaxed text-lg animate-in fade-in slide-in-from-top-2 duration-300">
                        <LessonMarkdown>{solution}</LessonMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
};
