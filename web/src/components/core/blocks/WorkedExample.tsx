"use client";

import React, { useState } from "react";
import { Calculator, Eye } from "lucide-react";

interface WorkedExampleProps {
    title: string;
    scenario: string;
    solution: string;
    calculation?: string;
}

export const WorkedExample: React.FC<WorkedExampleProps> = ({ title, scenario, solution, calculation }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl overflow-hidden my-4">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        <Calculator className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider">{title}</h4>
                </div>
                <p className="text-foreground/80 leading-relaxed text-base">{scenario}</p>
            </div>

            {calculation && (
                <div className="bg-slate-900/50 px-6 py-3 border-t border-emerald-500/10">
                    <p className="font-mono text-emerald-400 text-lg" dir="ltr">{calculation}</p>
                </div>
            )}

            <div className="border-t border-emerald-500/10">
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full px-6 py-3 flex items-center gap-2 text-sm font-bold text-emerald-400 hover:bg-emerald-500/5 transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    {showSolution ? "הסתר פתרון" : "הצג פתרון"}
                </button>
                {showSolution && (
                    <div className="px-6 pb-6 text-foreground/80 leading-relaxed animate-in fade-in-0 duration-300">
                        {solution}
                    </div>
                )}
            </div>
        </div>
    );
};
