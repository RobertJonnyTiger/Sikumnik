"use client";

import { memo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { Calculator, ArrowDown, Lightbulb } from "lucide-react";
import { CalculationBlock as CalculationType } from "@/types/accounting";
import { FinancialStatement } from "./FinancialStatement";

// Regex to strip English words and text in parentheses containing English
const ENGLISH_STRIP_REGEX = /\s*\([^a-zA-Z]*[a-zA-Z]+[^a-zA-Z]*\)|[a-zA-Z]+/g;
const BOLD_REGEX = /(\*\*.*?\*\*)/g;

interface CalculationBlockProps {
    data: CalculationType;
}

export const CalculationBlock = memo(function CalculationBlock({ data }: CalculationBlockProps) {
    // Helper to strip English as per Truth 2.0 - resilient to undefined
    const cleanText = (text?: string) => text ? text.replace(ENGLISH_STRIP_REGEX, "").trim() : "";

    // If we have distinct data rows, render the Financial Statement view instead of the formula view
    if (data.data && data.data.rows) {
        const rows = data.data.rows;
        // Fixing implicit any by casting rows if needed, or using 'any' explicitly if Type is loose.
        // Assuming data.data.rows is an array of objects.
        const hasAssets = (rows as any[]).some((r: any) => r.type === 'asset');
        const hasLiabilitiesOrEquity = (rows as any[]).some((r: any) => r.type === 'liability' || r.type === 'equity');

        if (hasAssets && hasLiabilitiesOrEquity) {
            const leftRows = (rows as any[]).filter((r: any) => r.type === 'asset');
            const rightRows = (rows as any[]).filter((r: any) => r.type === 'liability' || r.type === 'equity');
            return (
                <div className="relative">
                    <FinancialStatement title={cleanText(data.title)} leftRows={leftRows} rightRows={rightRows} note={data.analogy_note} />
                    {/* Optional side hint if needed */}
                    {data.analogy_note && (
                        <div className="hidden xl:block absolute -left-64 top-0 w-64 p-6 bg-card border-2 border-primary/20 rounded-3xl text-lg text-foreground/80 font-main shadow-premium animate-entry">
                            <div className="flex items-center gap-2 mb-3 text-primary font-black">
                                <Lightbulb className="w-5 h-5 shadow-neon" />
                                <span className="uppercase tracking-widest text-xs">טיפ של אלופים</span>
                            </div>
                            {data.analogy_note}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="relative">
                <FinancialStatement title={cleanText(data.title)} rows={rows as any[]} note={data.analogy_note} />
                {/* Optional side hint if needed */}
                {data.analogy_note && (
                    <div className="hidden xl:block absolute -left-64 top-0 w-64 p-6 bg-card border-2 border-accent/20 rounded-3xl text-lg text-foreground/80 font-main shadow-premium animate-entry">
                        <div className="flex items-center gap-2 mb-3 text-accent font-black">
                            <Lightbulb className="w-5 h-5 shadow-neon" />
                            <span className="uppercase tracking-widest text-xs">שים לב</span>
                        </div>
                        {data.analogy_note}
                    </div>
                )}
            </div>
        );
    }

    // Helper to parse bold markdown and apply Truth 2.0 highlighting
    const renderStepContent = (text: string) => {
        const cleanedText = cleanText(text);
        const parts = cleanedText.split(BOLD_REGEX);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <span key={i} className="font-black text-white bg-primary/20 px-2 py-0.5 rounded shadow-sm border-b-2 border-primary">
                        {part.slice(2, -2)}
                    </span>
                );
            }
            // Auto-highlighting for important concepts in every sentence
            return (
                <span key={i}>
                    {part.split(' ').map((word, wordIdx) => {
                        const isHigh = wordIdx % 7 === 0 || word.includes('ש\"ח') || word.includes('סה\"כ');
                        return <span key={wordIdx} className={isHigh ? "text-primary font-bold" : ""}>{word}{' '}</span>;
                    })}
                </span>
            );
        });
    };

    return (
        <GlassCard className="group border-r-8 border-primary/40 p-10 md:p-16 rounded-4xl">
            {/* Header */}
            <div className="flex items-center gap-6 mb-12 border-b-2 border-border/40 pb-8">
                <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-premium group-hover:scale-110 transition-transform duration-500">
                    <Calculator className="w-10 h-10" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white">{cleanText(data.title)}</h3>
            </div>

            {/* Formula Board */}
            <div className="bg-background/80 backdrop-blur-md rounded-4xl p-8 mb-10 text-center border-2 border-primary/30 text-2xl md:text-3xl font-black text-primary shadow-premium tracking-tighter" dir="ltr">
                {data.formula_visual.includes('=') ? data.formula_visual.split('=').pop()?.trim() : data.formula_visual}
            </div>

            {/* Variables Grid */}
            {data.variables.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {data.variables.map((v: any, i: number) => (
                        <div key={i} className="bg-card/50 border border-border/40 rounded-3xl p-6 flex justify-between items-center hover:bg-card/80 transition-all duration-300 group/var shadow-md">
                            <div>
                                <span className="block text-xs font-black text-primary uppercase tracking-[0.2em] mb-2">{cleanText(v.name)}</span>
                                <span className="text-lg text-foreground/70 font-medium font-main leading-snug">{cleanText(v.desc || v.description)}</span>
                            </div>
                            {v.value && <span className="font-main text-4xl font-black text-white group-hover/var:text-primary transition-colors">{v.value}</span>}
                        </div>
                    ))}
                </div>
            )}

            {/* Steps */}
            <div className="space-y-6 mb-12">
                {(() => {
                    let stepCounter = 0;
                    return data.steps.map((step: any, i: number) => {
                        const isString = typeof step === 'string';
                        const text = isString ? step : step.text;
                        const type = !isString ? step.type : undefined;
                        const isJournal = !isString ? step.isJournal : false;

                        if (!text) return <div key={i} className="h-6" />;

                        stepCounter++;

                        const bgColor = type === 'pnl' ? 'bg-error/10 border-error/30 pr-8' :
                            type === 'bs' ? 'bg-primary/10 border-primary/30 pr-8' :
                                isJournal ? 'bg-accent/10 border-accent/30 pr-8' :
                                    'bg-secondary/20 border-border/40 pr-8';

                        const iconColor = type === 'pnl' ? 'bg-error shadow-[0_0_15px_rgba(239,68,68,0.4)]' :
                            type === 'bs' ? 'bg-primary shadow-neon shadow-primary/40' :
                                isJournal ? 'bg-accent shadow-premium shadow-accent/40' :
                                    'bg-white text-black';

                        return (
                            <div key={i} className={cn(
                                "flex gap-8 p-8 rounded-4xl border-r-8 transition-all hover:translate-x-[-8px] group/step",
                                bgColor
                            )}>
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 text-white transition-all group-hover/step:rotate-12",
                                    iconColor
                                )}>
                                    {stepCounter}
                                </div>
                                <div className={cn(
                                    "pt-1 text-xl md:text-2xl leading-relaxed font-black font-main text-foreground/90 whitespace-pre-wrap",
                                    isJournal && "bg-background/40 p-8 rounded-4xl border border-border/20 shadow-inner text-white"
                                )}>
                                    {renderStepContent(text)}
                                </div>
                            </div>
                        );
                    });
                })()}
            </div>

            {/* Analogy Note */}
            {data.analogy_note && (
                <div className="mt-12 bg-accent/10 border-2 border-accent/20 rounded-[3rem] p-10 flex gap-8 text-foreground font-main relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[80px] rounded-full" />
                    <div className="bg-accent p-4 rounded-2xl shadow-premium group-hover:scale-110 transition-transform shrink-0 self-start">
                        <Lightbulb className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <div className="text-xs font-black text-accent uppercase tracking-[0.3em] mb-4">תובנה להמשך הדרך</div>
                        <p className="relative z-10 leading-relaxed text-2xl font-medium text-foreground/90">{data.analogy_note}</p>
                    </div>
                </div>
            )}
        </GlassCard>
    );
});
