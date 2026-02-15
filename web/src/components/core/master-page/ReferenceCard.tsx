"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Calculator, Printer } from "lucide-react";
import { getConnotationColor } from "@/lib/financial-utils";
import { FinancialBackground } from "@/components/core/VisualContext/FinancialBackground";

interface FormulaItem {
    label: string;
    formula: string;
    subtext?: string;
}

interface ReferenceCardProps {
    title?: string;
    formulas: FormulaItem[];
    className?: string;
}

export const ReferenceCard: React.FC<ReferenceCardProps> = ({
    title = "דף נוסחאות",
    formulas,
    className
}) => {
    return (
        <div className={cn("bg-slate-950 border border-slate-800 rounded-xl overflow-hidden", className)}>
            {/* Header */}
            <div className="bg-slate-900/50 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500/10 rounded-lg">
                        <Calculator size={18} className="text-teal-400" />
                    </div>
                    <span className="font-bold text-slate-200">{title}</span>
                </div>
                <button className="text-slate-500 hover:text-teal-400 transition-colors" title="Print View">
                    <Printer size={16} />
                </button>
            </div>

            {/* Grid */}
            <div className="divide-y divide-slate-800/50">
                {formulas.map((item, idx) => {
                    const dynamicColor = getConnotationColor({ text: item.label });

                    return (
                        <div key={idx} className="relative p-4 md:p-6 hover:bg-slate-900/30 transition-colors group overflow-hidden">
                            {/* Visual Context Layer */}
                            <FinancialBackground term={item.label} opacity={10} />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <span className={cn("text-sm font-bold uppercase tracking-wider transition-colors duration-300", dynamicColor)}>
                                    {item.label}
                                </span>
                                <div className="text-right md:text-left">
                                    <div className={cn("text-xl md:text-2xl font-bold font-mono dir-ltr text-left group-hover:scale-[1.02] transition-transform origin-left text-slate-200", dynamicColor)}>
                                        {item.formula}
                                    </div>
                                    {item.subtext && (
                                        <div className="text-xs text-slate-500 font-mono mt-1 dir-ltr opacity-60 group-hover:opacity-100 transition-opacity">
                                            {item.subtext}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
