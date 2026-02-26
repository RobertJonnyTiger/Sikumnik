"use client";

import React from "react";
import type { Variable } from "@/types/chapter";

interface FormulaCardProps {
    title: string;
    formula: string;
    variables?: Variable[];
}

export const FormulaCard: React.FC<FormulaCardProps> = ({ title, formula, variables }) => {
    return (
        <div className="bg-card border border-border/50 rounded-2xl p-6 my-4 text-center">
            <h4 className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-4">{title}</h4>
            <div className="font-mono text-2xl md:text-3xl text-foreground font-bold py-4">
                {formula}
            </div>
            {variables && variables.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-right">
                        {variables.map((v, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                                <span className="font-mono text-secondary-foreground font-bold w-8 text-center" dir="ltr">
                                    {v.symbol}
                                </span>
                                <span className="text-muted-foreground">=</span>
                                <p className="text-foreground text-[14px] leading-relaxed">{v.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
