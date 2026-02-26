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
        <GlassCard className="group border-r-8 border-primary/40 p-10 md:p-14 rounded-[3rem]">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 border-b-2 border-border/40 pb-8">
                <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-primary/10 text-sky-800 border border-primary/20 shadow-premium">
                        <ArrowRightLeft className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-foreground">{data.title}</h3>
                        {data.date && (
                            <div className="flex items-center gap-2 text-sm text-sky-800 font-black uppercase tracking-[0.2em] mt-2">
                                <Calendar className="w-4 h-4" />
                                <span>{data.date}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid Header - No English as per Truth 2.0 */}
            <div className="grid grid-cols-12 text-sm font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 px-6">
                <div className="col-span-6">חשבון</div>
                <div className="col-span-3 text-left pl-4 text-success pr-2 border-r border-border/20">חובה</div>
                <div className="col-span-3 text-left pl-4 text-accent pr-2">זכות</div>
            </div>

            {/* Entries */}
            <div className="space-y-3 mb-12">
                {data.entries.map((entry, i) => (
                    <div
                        key={i}
                        className={cn(
                            "grid grid-cols-12 items-center p-6 rounded-2xl transition-all duration-300",
                            "hover:bg-foreground/5 border-2 border-transparent hover:border-primary/20 hover:translate-x-[-4px]",
                            entry.debit > 0 ? "bg-success/5 border-success/10" : "bg-accent/5 border-accent/10"
                        )}
                    >
                        <div className="col-span-6 font-main text-xl font-black text-foreground px-2">
                            {entry.account}
                        </div>
                        <div className={cn("col-span-3 text-left pl-4 font-main text-2xl font-black border-r border-border/20 h-full flex items-center justify-end pr-4", entry.debit > 0 ? "text-success" : "text-muted-foreground/10")}>
                            {entry.debit > 0 ? entry.debit.toLocaleString() : "-"}
                        </div>
                        <div className={cn("col-span-3 text-left pl-4 font-main text-2xl font-black h-full flex items-center justify-end pr-4", entry.credit > 0 ? "text-accent" : "text-muted-foreground/10")}>
                            {entry.credit > 0 ? entry.credit.toLocaleString() : "-"}
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Line */}
            <div className="grid grid-cols-12 items-center p-6 border-4 border-primary/30 bg-primary/10 rounded-4xl shadow-premium">
                <div className="col-span-6 font-black text-2xl text-sky-800 uppercase tracking-widest pl-4">סה"כ פקודה</div>
                <div className="col-span-3 text-left pl-4 font-main text-2xl font-black text-foreground border-r-2 border-primary/20">
                    {totalDebit.toLocaleString()}
                </div>
                <div className="col-span-3 text-left pl-4 font-main text-2xl font-black text-foreground">
                    {totalCredit.toLocaleString()}
                </div>
            </div>

            {/* Explanation - Truth 2.0: No italics, increased size */}
            {data.explanation && (
                <div className="mt-8 bg-background/40 p-6 rounded-3xl border border-border/20 border-r-8 border-r-primary shadow-inner">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-3">ביאור הפעולה</div>
                    <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed font-main">
                        {data.explanation.split(' ').map((word, i) => {
                            const isHigh = i % 8 === 0 || word.includes('חשבון') || word.includes('פעולה');
                            return <span key={i} className={isHigh ? "text-sky-800 font-black" : ""}>{word} </span>;
                        })}
                    </p>
                </div>
            )}
        </GlassCard>
    );
});
