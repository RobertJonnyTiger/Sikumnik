"use client";

import { memo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { Calculator, ArrowDown, Lightbulb } from "lucide-react";
import { CalculationBlock as CalculationType } from "@/types/accounting";
import { FinancialStatement } from "./FinancialStatement";

const BOLD_REGEX = /(\*\*.*?\*\*)/g;

interface CalculationBlockProps {
    data: CalculationType;
}

export const CalculationBlock = memo(function CalculationBlock({ data }: CalculationBlockProps) {
    // If we have distinct data rows, render the Financial Statement view instead of the formula view
    if (data.data && data.data.rows) {
        const rows = data.data.rows;
        const hasAssets = rows.some((r: any) => r.type === 'asset');
        const hasLiabilitiesOrEquity = rows.some((r: any) => r.type === 'liability' || r.type === 'equity');

        if (hasAssets && hasLiabilitiesOrEquity) {
            const leftRows = rows.filter((r: any) => r.type === 'asset');
            const rightRows = rows.filter((r: any) => r.type === 'liability' || r.type === 'equity');
            return (
                <div className="relative">
                    <FinancialStatement title={data.title} leftRows={leftRows} rightRows={rightRows} note={data.analogy_note} />
                    {/* Optional side hint if needed */}
                    {data.analogy_note && (
                        <div className="hidden xl:block absolute -left-64 top-0 w-56 p-4 bg-card border border-border rounded-xl text-sm text-foreground/40 font-handwriting shadow-premium animate-entry">
                            <div className="flex items-center gap-2 mb-2 text-primary font-black">
                                <Lightbulb className="w-4 h-4" />
                                <span>שים לב</span>
                            </div>
                            {data.analogy_note}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="relative">
                <FinancialStatement title={data.title} rows={rows} note={data.analogy_note} />
                {/* Optional side hint if needed */}
                {data.analogy_note && (
                    <div className="hidden xl:block absolute -left-64 top-0 w-56 p-4 bg-slate-900/80 border border-slate-800 rounded-lg text-sm text-slate-400 font-handwriting">
                        <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold">
                            <Lightbulb className="w-4 h-4" />
                            <span>שים לב</span>
                        </div>
                        {data.analogy_note}
                    </div>
                )}
            </div>
        );
    }

    // Helper to parse bold markdown
    const parseBold = (text: string) => {
        const parts = text.split(BOLD_REGEX);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={i} className="font-bold text-white">{part.slice(2, -2)}</span>;
            }
            return part;
        });
    };

    return (
        <GlassCard className="group border-l-4 border-l-emerald-500/50">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{data.title}</h3>
            </div>

            {/* Formula Board */}
            <div className="bg-slate-950/50 rounded-xl p-6 mb-8 text-center border border-white/5 text-lg md:text-2xl text-emerald-300 shadow-inner">
                {data.formula_visual}
            </div>

            {/* Variables Grid */}
            {data.variables.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {data.variables.map((v, i) => (
                        <div key={i} className="bg-foreground/5 border border-border rounded-2xl p-4 flex justify-between items-center hover:bg-foreground/10 transition-colors">
                            <div>
                                <span className="block text-[10px] font-black text-primary uppercase tracking-widest mb-1">{v.name}</span>
                                <span className="text-base text-foreground/70 font-medium font-handwriting">{v.desc}</span>
                            </div>
                            <span className="font-sans text-xl font-black text-primary">{v.value}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Steps */}
            <div className="space-y-2 mb-8">
                {(() => {
                    let stepCounter = 0;
                    return data.steps.map((step, i) => {
                        const isString = typeof step === 'string';
                        const text = isString ? step : step.text;
                        const type = !isString ? step.type : undefined;
                        const isJournal = !isString ? step.isJournal : false;

                        if (!text) return <div key={i} className="h-4" />;

                        stepCounter++;

                        const bgColor = type === 'pnl' ? 'bg-error/5 border-error/20' :
                            type === 'bs' ? 'bg-primary/5 border-primary/20' :
                                isJournal ? 'bg-accent/5 border-accent/20' :
                                    'bg-foreground/5 border-border';

                        const iconColor = type === 'pnl' ? 'bg-error text-white' :
                            type === 'bs' ? 'bg-primary text-white' :
                                isJournal ? 'bg-accent text-white' :
                                    'bg-foreground text-background';

                        return (
                            <div key={i} className={cn(
                                "flex gap-6 p-4 rounded-3xl border transition-all hover:translate-x-[-4px]",
                                bgColor
                            )}>
                                <div className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 shadow-sm",
                                    iconColor
                                )}>
                                    {stepCounter}
                                </div>
                                <div className={cn(
                                    "pt-1 text-base leading-relaxed font-medium font-sans text-foreground/80",
                                    isJournal && "font-mono text-sm bg-background/50 p-4 rounded-2xl border border-border"
                                )}>
                                    {parseBold(text)}
                                </div>
                            </div>
                        );
                    });
                })()}
            </div>

            {/* Analogy Note */}
            {data.analogy_note && (
                <div className="mt-6 bg-accent/5 border border-accent/20 rounded-[2.5rem] p-8 flex gap-6 text-foreground/70 text-lg font-handwriting italic relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-2xl rounded-full" />
                    <div className="bg-accent p-3 rounded-2xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform shrink-0 self-start">
                        <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <p className="relative z-10 leading-relaxed pr-6 border-r-2 border-accent/30">{data.analogy_note}</p>
                </div>
            )}
        </GlassCard>
    );
});
