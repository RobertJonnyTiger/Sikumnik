import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface FinancialRow {
    label: string;
    amount: number;
    type: 'revenue' | 'expense' | 'subtotal' | 'total';
    highlight?: boolean;
}

interface FinancialStatementProps {
    title: string;
    rows: FinancialRow[];
    note?: string;
}

export function FinancialStatement({ title, rows, note }: FinancialStatementProps) {
    return (
        <GlassCard className="max-w-2xl mx-auto border-t-4 border-t-indigo-500 overflow-hidden relative">
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none mix-blend-overlay" />

            <div className="mb-6 border-b border-white/10 pb-4 text-center">
                <h3 className="text-xl font-bold text-white tracking-wider">{title}</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">לשנה שהסתיימה ב-31 בדצמבר 2025</p>
            </div>

            <div className="space-y-1 font-mono text-sm relative z-10">
                {rows.map((row, i) => {
                    const isTotal = row.type === 'total';
                    const isSubtotal = row.type === 'subtotal';
                    const isExpense = row.amount < 0;

                    return (
                        <div
                            key={i}
                            className={cn(
                                "flex justify-between items-center px-4 py-2 rounded transition-colors",
                                isTotal ? "bg-indigo-500/20 text-white font-bold text-lg border-t border-indigo-500/50 mt-4 mb-2" :
                                    isSubtotal ? "bg-white/5 text-indigo-200 font-bold border-t border-white/10 mt-2" :
                                        "text-slate-300 hover:bg-white/5",
                                row.highlight && !isTotal && !isSubtotal && "bg-yellow-500/10 text-yellow-200"
                            )}
                        >
                            <span className={cn(
                                isTotal || isSubtotal ? "" : "pl-4"
                            )}>
                                {row.label}
                            </span>
                            <span className={cn(
                                "tabular-nums tracking-wide",
                                isExpense && !isTotal && !isSubtotal ? "text-pink-400" :
                                    !isExpense && !isTotal && !isSubtotal ? "text-emerald-400" : ""
                            )}>
                                {row.amount < 0 ? `(${Math.abs(row.amount).toLocaleString()})` : row.amount.toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>

            {note && (
                <div className="mt-6 pt-4 border-t border-dashed border-slate-700 text-xs text-slate-500 text-center italic">
                    * {note}
                </div>
            )}
        </GlassCard>
    );
}
