import { GlassCard } from "@/components/ui/glass-card";
import { Calculator, ArrowDown, Lightbulb } from "lucide-react";
import { CalculationBlock as CalculationType } from "@/types/accounting";
import { FinancialStatement } from "./FinancialStatement";

interface CalculationBlockProps {
    data: CalculationType;
}

export function CalculationBlock({ data }: CalculationBlockProps) {
    // If we have distinct data rows, render the Financial Statement view instead of the formula view
    if (data.data && data.data.rows) {
        return (
            <div className="relative">
                <FinancialStatement title={data.title} rows={data.data.rows} note={data.analogy_note} />
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
        const parts = text.split(/(\*\*.*?\*\*)/g);
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
                        <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                            <div>
                                <span className="block text-xs text-slate-400">{v.name}</span>
                                <span className="text-sm text-slate-200">{v.desc}</span>
                            </div>
                            <span className="font-mono text-emerald-400 font-bold">{v.value}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Steps */}
            <div className="space-y-0 mb-8">
                {(() => {
                    let stepCounter = 0;
                    return data.steps.map((step, i) => {
                        const isString = typeof step === 'string';
                        const text = isString ? step : step.text;
                        const type = !isString ? step.type : undefined;
                        const isJournal = !isString ? step.isJournal : false;

                        // Handle empty steps (spacers)
                        if (!text) {
                            return (
                                <div key={i} className="flex gap-4 h-6">
                                    <div className="w-8 flex justify-center">
                                        {i < data.steps.length - 1 && (
                                            <div className="w-px h-full bg-slate-800/50" />
                                        )}
                                    </div>
                                </div>
                            );
                        }

                        stepCounter++;

                        const textColor = type === 'pnl' ? 'text-red-300' :
                            type === 'bs' ? 'text-blue-300' :
                                isJournal ? 'text-amber-300' :
                                    'text-slate-300';

                        return (
                            <div key={i} className="flex gap-4">
                                <div className="flex flex-col items-center relative">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border z-10
                                        ${type === 'pnl' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                            type === 'bs' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                                'bg-slate-800 text-white border-slate-700'}`}>
                                        {stepCounter}
                                    </div>
                                    {i < data.steps.length - 1 && (
                                        <div className="w-px h-full bg-slate-800/50 absolute top-8" />
                                    )}
                                </div>
                                <div className={`pt-1 pb-6 text-sm leading-relaxed w-full whitespace-pre-wrap ${textColor}
                                    ${isJournal ? 'bg-slate-900/50 p-3 rounded-lg border-l-2 border-amber-500/30 mt-1' : ''}`}>
                                    {parseBold(text)}
                                </div>
                            </div>
                        );
                    });
                })()}
            </div>

            {/* Analogy Note */}
            {data.analogy_note && (
                <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3 text-yellow-200/90 text-sm font-handwriting">
                    <Lightbulb className="w-5 h-5 shrink-0 text-yellow-400" />
                    <p>{data.analogy_note}</p>
                </div>
            )}
        </GlassCard>
    );
}
