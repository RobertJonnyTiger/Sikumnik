"use client";

import { memo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRightLeft, Calendar } from "lucide-react";
import { JournalEntryBlock } from "@/types/accounting";
import { cn } from "@/lib/utils";

interface JournalEntryProps {
    data: JournalEntryBlock;
}

export const JournalEntry = memo(function JournalEntry({ data }: JournalEntryProps) {
    const totalDebit = data.entries.reduce((sum, e) => sum + e.debit, 0);
    const totalCredit = data.entries.reduce((sum, e) => sum + e.credit, 0);

    return (
        <GlassCard className="group border-r-4 border-r-indigo-500/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <ArrowRightLeft className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{data.title}</h3>
                        {data.date && (
                            <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                <Calendar className="w-3 h-3" />
                                <span>{data.date}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid Header */}
            <div className="grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                <div className="col-span-6">חשבון</div>
                <div className="col-span-3 text-left pl-2 text-emerald-500/80">חובה (Debit)</div>
                <div className="col-span-3 text-left pl-2 text-pink-500/80">זכות (Credit)</div>
            </div>

            {/* Entries */}
            <div className="space-y-1 mb-6">
                {data.entries.map((entry, i) => (
                    <div
                        key={i}
                        className={cn(
                            "grid grid-cols-12 items-center p-3 rounded-md transition-colors",
                            "hover:bg-white/5 border border-transparent hover:border-white/5",
                            entry.debit > 0 ? "bg-emerald-500/5" : "bg-pink-500/5"
                        )}
                    >
                        <div className="col-span-6 font-medium text-slate-200">
                            {entry.account}
                        </div>
                        <div className={cn("col-span-3 text-left pl-2 font-mono", entry.debit > 0 ? "text-emerald-400 font-bold" : "text-slate-600")}>
                            {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                        </div>
                        <div className={cn("col-span-3 text-left pl-2 font-mono", entry.credit > 0 ? "text-pink-400 font-bold" : "text-slate-600")}>
                            {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Line */}
            <div className="grid grid-cols-12 items-center p-3 border-t border-indigo-500/30 bg-indigo-500/5 rounded-b-lg">
                <div className="col-span-6 font-bold text-indigo-300">סה"כ</div>
                <div className="col-span-3 text-left pl-2 font-mono font-bold text-indigo-300">
                    {totalDebit.toLocaleString()}
                </div>
                <div className="col-span-3 text-left pl-2 font-mono font-bold text-indigo-300">
                    {totalCredit.toLocaleString()}
                </div>
            </div>

            {/* Explanation */}
            <div className="mt-4 text-xs text-slate-500 italic px-2">
                {data.explanation}
            </div>
        </GlassCard>
    );
});
