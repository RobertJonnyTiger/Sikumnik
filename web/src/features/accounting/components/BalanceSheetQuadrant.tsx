"use client";

import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { TermTooltip } from "@/components/ui/term-tooltip";

export interface QuadrantRow {
    label: string;
    amount: number;
    type: 'asset' | 'liability' | 'equity' | 'subtotal' | 'total';
    highlight?: boolean;
    tooltip?: string; // Simple tooltip for uncommon terms
}

export interface Quadrant {
    title: string;
    rows: QuadrantRow[];
    isAsset?: boolean; // Determines header color
}

interface BalanceSheetQuadrantProps {
    topLeft: Quadrant;     // Current Assets
    topRight: Quadrant;    // Current Liabilities
    bottomLeft: Quadrant;  // Non-Current Assets
    bottomRight: Quadrant; // Non-Current Liabilities + Equity
    className?: string;
}

function QuadrantCell({ quadrant, isAssetSide }: { quadrant: Quadrant; isAssetSide: boolean }) {
    return (
        <div className="p-4 border-border/30">
            <h4 className={cn(
                "text-base font-black uppercase tracking-wide mb-3 text-center",
                isAssetSide ? "text-success" : "text-error"
            )}>
                {quadrant.title}
            </h4>
            <div className="space-y-0.5">
                {quadrant.rows.map((row, i) => {
                    const isTotal = row.type === 'total';
                    const isSubtotal = row.type === 'subtotal';
                    const isNegative = row.amount < 0;

                    const labelContent = (
                        <span className={cn(
                            "font-handwriting text-base",
                            isTotal || isSubtotal ? "" : "pr-2"
                        )}>
                            {row.label}
                        </span>
                    );

                    return (
                        <div
                            key={i}
                            className={cn(
                                "flex justify-between items-center px-2 py-1 rounded transition-colors",
                                isTotal ? "bg-primary/10 text-sky-800 font-black border-t border-primary/20 mt-2" :
                                    isSubtotal ? "bg-foreground/5 text-foreground font-bold border-t border-border mt-1" :
                                        "text-foreground hover:bg-foreground/5",
                                row.highlight && !isTotal && !isSubtotal && "bg-accent/10 text-accent font-semibold"
                            )}
                        >
                            {row.tooltip ? (
                                <TermTooltip term={row.label} definition={row.tooltip}>
                                    <span className="cursor-help border-b border-dashed border-foreground/30">
                                        {labelContent}
                                    </span>
                                </TermTooltip>
                            ) : labelContent}
                            <span className={cn(
                                "font-sans tabular-nums font-bold text-sm",
                                isNegative && !isTotal && !isSubtotal ? "text-error" :
                                    !isNegative && !isTotal && !isSubtotal ? "text-success" : ""
                            )}>
                                {row.amount < 0 ? `(${Math.abs(row.amount).toLocaleString()})` : row.amount.toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function BalanceSheetQuadrant({ topLeft, topRight, bottomLeft, bottomRight, className }: BalanceSheetQuadrantProps) {
    return (
        <GlassCard className={cn(
            "w-full max-w-5xl mx-auto overflow-hidden border-t-4 border-t-primary shadow-premium",
            className
        )}>
            {/* Header */}
            <div className="text-center py-3 border-b border-border">
                <h3 className="text-xl font-black text-foreground">המאזן - מבט ארבע רבעים</h3>
                <p className="text-[10px] text-foreground mt-1 uppercase tracking-widest font-bold">
                    תמונת מצב חשבונאית • 2025
                </p>
            </div>

            {/* 2x2 Grid - More Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-border/30">
                {/* Top Row */}
                <QuadrantCell quadrant={topLeft} isAssetSide={true} />
                <QuadrantCell quadrant={topRight} isAssetSide={false} />

                {/* Bottom Row */}
                <QuadrantCell quadrant={bottomLeft} isAssetSide={true} />
                <QuadrantCell quadrant={bottomRight} isAssetSide={false} />
            </div>

            {/* Balance Verification Footer - Compact */}
            <div className="text-center py-2 border-t border-border bg-foreground/5">
                <p className="text-xs font-handwriting text-foreground italic">
                    ✓ המאזן מאוזן: סה״כ נכסים = סה״כ התחייבויות + הון עצמי
                </p>
            </div>
        </GlassCard>
    );
}
