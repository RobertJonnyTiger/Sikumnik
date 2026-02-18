"use client";

import React, { useState } from "react";
import { Calculator, Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
                <div className="text-foreground/80 leading-relaxed text-base markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{scenario}</ReactMarkdown>
                </div>
            </div>

            {calculation && (
                <div className="bg-slate-900/50 px-6 py-4 border-t border-emerald-500/10">
                    <ol className="font-mono text-emerald-400 text-lg list-decimal list-inside space-y-2">
                        {calculation.split('\n').map((line, idx) => (
                            <li key={idx} className="leading-relaxed">
                                {line.replace(/^\d+[\.\)]\s*/, '')}
                            </li>
                        ))}
                    </ol>
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
                <div className="px-6 pb-6 text-foreground/80 leading-relaxed animate-in fade-in-0 duration-300 markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{solution}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};
