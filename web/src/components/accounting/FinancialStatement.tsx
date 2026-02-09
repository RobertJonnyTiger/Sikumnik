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
        <div className="space-y-1 relative z-10 w-full">
            {columnRows.map((row, i) => {
                const isTotal = row.type === 'total';
                const isSubtotal = row.type === 'subtotal';
                const isExpense = row.amount < 0;

                return (
                    <div
                        key={i}
                        className={cn(
                            "flex justify-between items-center px-4 py-1.5 rounded transition-colors",
                            isTotal ? "bg-primary/10 text-primary font-black text-base border-t border-primary/20 mt-3 mb-1" :
                                isSubtotal ? "bg-foreground/5 text-primary/80 font-bold border-t border-border mt-1.5" :
                                    "text-foreground/80 hover:bg-foreground/5",
                            row.highlight && !isTotal && !isSubtotal && "bg-accent/10 text-accent font-bold"
                        )}
                    >
                        <span className={cn(
                            "font-handwriting text-xl leading-none pt-1",
                            isTotal || isSubtotal ? "" : "pl-4"
                        )}>
                            {row.label}
                        </span>
                        <span className={cn(
                            "font-sans tabular-nums tracking-tight font-bold",
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
        <GlassCard className={cn("mx-auto border-t-4 border-t-primary overflow-hidden relative shadow-premium bg-card", compact ? "max-w-xl p-4" : "max-w-4xl p-6")}>
            {/* Soft Ambient Flourish */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />

            <div className="mb-6 border-b border-border pb-4 text-center">
                <h3 className="text-2xl font-black text-foreground tracking-tight">{title}</h3>
                <p className="text-[10px] text-foreground/30 mt-1 uppercase tracking-[0.2em] font-black">תמונת מצב חשבונאית • 2025</p>
            </div>

            {isTwoColumn ? (
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Assets / Left side */}
                    <div className="flex-1 w-full">
                        <h4 className="text-sm font-black text-success uppercase tracking-widest mb-3 px-4">נכסים</h4>
                        {renderColumn(leftRows || [])}
                    </div>
                    {/* Vertical Divider */}
                    <div className="hidden md:block w-px self-stretch bg-border/50" />
                    {/* Liabilities & Equity / Right side */}
                    <div className="flex-1 w-full">
                        <h4 className="text-sm font-black text-error uppercase tracking-widest mb-3 px-4">התחייבויות והון</h4>
                        {renderColumn(rightRows || [])}
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    {renderColumn(rows)}
                </div>
            )}

            {note && (
                <div className="mt-8 pt-4 border-t border-dashed border-border text-xs text-foreground/40 text-center italic font-handwriting">
                    * {note}
                </div>
            )}
        </GlassCard>
    );
}
