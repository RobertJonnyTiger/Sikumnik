import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export interface FinancialRow {
    label: string;
    amount: number;
    type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'subtotal' | 'total';
    highlight?: boolean;
}

interface FinancialStatementProps {
    title: string;
    rows?: FinancialRow[]; // optional fallback
    leftRows?: FinancialRow[];
    rightRows?: FinancialRow[];
    note?: string;
    compact?: boolean;
}

export function FinancialStatement({ title, rows = [], leftRows, rightRows, note, compact = false }: FinancialStatementProps) {
    const isTwoColumn = (leftRows && leftRows.length > 0) || (rightRows && rightRows.length > 0);

    const renderColumn = (columnRows: FinancialRow[]) => (
        <div className="space-y-4 relative z-10 w-full font-main">
            {columnRows.map((row, i) => {
                const isTotal = row.type === 'total';
                const isSubtotal = row.type === 'subtotal';
                const isExpense = row.amount < 0 || row.type === 'expense';

                return (
                    <div
                        key={i}
                        className={cn(
                            "flex justify-between items-center px-6 py-3 rounded-2xl transition-all duration-300 border-2 border-transparent",
                            isTotal ? "bg-primary/20 text-foreground font-black text-xl border-primary/40 mt-4 shadow-premium" :
                                isSubtotal ? "bg-foreground/5 text-sky-800 font-black border-t-2 border-primary/20 mt-3 text-lg" :
                                    "text-foreground hover:bg-foreground/5 hover:border-border/40",
                            row.highlight && !isTotal && !isSubtotal && "bg-accent/10 border-accent/20 text-accent font-black"
                        )}
                    >
                        <span className={cn(
                            "text-lg leading-tight",
                            (isTotal || isSubtotal) ? "font-black" : "font-medium"
                        )}>
                            {row.label}
                        </span>
                        <span className={cn(
                            "text-xl tabular-nums tracking-tight font-black",
                            isTotal ? "text-foreground text-2xl" :
                                isExpense && !isTotal && !isSubtotal ? "text-error" :
                                    !isExpense && !isTotal && !isSubtotal ? "text-success" : ""
                        )}>
                            {row.amount < 0 ? `(${Math.abs(row.amount).toLocaleString()})` : row.amount.toLocaleString()}
                        </span>
                    </div>
                );
            })}
        </div>
    );

    return (
        <GlassCard className={cn(
            "mx-auto border-t-8 border-t-primary rounded-4xl overflow-hidden relative shadow-premium bg-card/60 backdrop-blur-3xl",
            compact ? "max-w-2xl p-6" : "max-w-6xl p-8 md:p-12"
        )}>
            {/* Soft Ambient Flourish */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10" />

            <div className="mb-10 border-b-2 border-border/40 pb-6 text-center relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-tight">{title}</h3>
                <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="h-px w-12 bg-primary/30" />
                    <p className="text-xs text-sky-800 font-black uppercase tracking-[0.4em]">דוח כספי רשמי • אמת אחת</p>
                    <div className="h-px w-12 bg-primary/30" />
                </div>
            </div>

            {isTwoColumn ? (
                <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                    {/* Assets / Left side */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-6 px-6">
                            <div className="w-2 h-2 rounded-full bg-success shadow-neon" />
                            <h4 className="text-lg font-black text-success uppercase tracking-[0.2em]">נכסים</h4>
                        </div>
                        {renderColumn(leftRows || [])}
                    </div>
                    {/* Vertical Divider */}
                    <div className="hidden md:block w-0.5 self-stretch bg-linear-to-b from-transparent via-border/50 to-transparent" />
                    {/* Liabilities & Equity / Right side */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-6 px-6">
                            <div className="w-2 h-2 rounded-full bg-error shadow-neon" />
                            <h4 className="text-lg font-black text-error uppercase tracking-[0.2em]">התחייבויות והון</h4>
                        </div>
                        {renderColumn(rightRows || [])}
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto relative z-10">
                    {renderColumn(rows)}
                </div>
            )}

            {note && (
                <div className="mt-10 pt-6 border-t-2 border-dashed border-border/40 text-lg text-foreground text-center font-main leading-relaxed">
                    {note.split(' ').map((word, i) => (
                        <span key={i} className={i % 7 === 0 ? "text-sky-800 font-black" : ""}>{word} </span>
                    ))}
                </div>
            )}
        </GlassCard>
    );
}
