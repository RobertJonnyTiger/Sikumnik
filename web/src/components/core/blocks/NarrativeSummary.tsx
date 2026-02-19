"use client";

import React from "react";
import { Lightbulb, AlertTriangle, ArrowLeft, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NarrativeSummaryProps {
    data: {
        content: string;
        tip: { title: string; content: string };
        pitfall: { title: string; content: string };
    };
    nextChapter?: {
        href: string;
        title: string;
    };
}

export const NarrativeSummary: React.FC<NarrativeSummaryProps> = ({ data, nextChapter }) => {
    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            {/* Header / Persona */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Bot className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2 relative">
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-card rotate-45 border-l border-b border-border/50" />
                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm relative z-10">
                        <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                            מבט מלמעלה (Bird's Eye View) 🦅
                        </h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {data.content}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tip & Pitfall Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Pro Tip */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-emerald-500/10 transition-colors">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-x-10 -translate-y-10 blur-xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <h4 className="font-black text-emerald-500 uppercase tracking-wide text-sm">
                                {data.tip.title}
                            </h4>
                        </div>
                        <p className="text-emerald-100/80 text-sm leading-relaxed">
                            {data.tip.content}
                        </p>
                    </div>
                </div>

                {/* Pitfall */}
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-rose-500/10 transition-colors">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-rose-500/10 rounded-full -translate-x-10 -translate-y-10 blur-xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h4 className="font-black text-rose-500 uppercase tracking-wide text-sm">
                                {data.pitfall.title}
                            </h4>
                        </div>
                        <p className="text-rose-100/80 text-sm leading-relaxed">
                            {data.pitfall.content}
                        </p>
                    </div>
                </div>
            </div>

            {/* Next Chapter CTA */}
            {nextChapter && (
                <Link
                    href={nextChapter.href}
                    className="block w-full group"
                >
                    <div className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-8 flex items-center justify-between transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1">
                        <div className="space-y-1">
                            <span className="text-primary-foreground/60 text-xs font-black uppercase tracking-widest">
                                הפרק הבא
                            </span>
                            <h3 className="text-2xl font-black">
                                {nextChapter.title}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};
