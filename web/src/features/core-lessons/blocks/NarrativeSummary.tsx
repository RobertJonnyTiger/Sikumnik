"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bird, Star, Zap, ArrowRight, ShieldAlert, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NarrativeSummaryProps {
    data: {
        summary: string;
        keyTakeaway: string;
        tip?: {
            title: string;
            content: string;
        };
        pitfall?: {
            title: string;
            content: string;
        };
    };
    nextChapter?: {
        id?: string;
        href?: string;
        title: string;
    } | null;
}

export const NarrativeSummary: React.FC<NarrativeSummaryProps> = ({ data, nextChapter }) => {
    // Extreme defensive checks
    if (!data) return null;

    const summary = data.summary || "אין סיכום זמין לפרק זה.";
    const keyTakeaway = data.keyTakeaway || "";
    const tip = data.tip;
    const pitfall = data.pitfall;

    return (
        <section className="space-y-12 my-20">
            {/* Main Narrative Card */}
            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-10 md:p-14">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-32 -translate-y-32 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-32 translate-y-32 blur-3xl opacity-50" />

                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 rotate-3">
                        <Bird className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                        מבט על: מה למדנו כאן?
                    </h2>

                    <div className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-medium mb-12">
                        {summary}
                    </div>

                    {keyTakeaway && (
                        <div className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 px-8 py-6 rounded-2xl shadow-sm rotate-1">
                            <span className="block text-sm font-black text-primary uppercase tracking-widest mb-2">בשורה התחתונה</span>
                            <p className="text-xl font-bold">{keyTakeaway}</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Tip & Pitfall - Enhanced Defensiveness */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* The Pro Tip */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-amber-500/5 rounded-3xl -rotate-1 group-hover:rotate-0 transition-transform" />
                    <Card className="relative p-8 border-2 border-amber-200/50 bg-white/50 backdrop-blur-sm rounded-3xl">
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                                <Zap className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h4 className="font-black text-amber-700 uppercase tracking-wide text-sm mb-2">
                                    {(tip as any)?.title || "טיפ למבחן"}
                                </h4>
                                <p className="text-lg font-bold leading-snug">
                                    {(tip as any)?.content || "אין טיפ זמין."}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* The Pitfall */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-rose-500/5 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform" />
                    <Card className="relative p-8 border-2 border-rose-200/50 bg-white/50 backdrop-blur-sm rounded-3xl">
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-6 h-6 text-rose-600" />
                            </div>
                            <div>
                                <h4 className="font-black text-rose-700 uppercase tracking-wide text-sm mb-2">
                                    {(pitfall as any)?.title || "זהירות, מוקש!"}
                                </h4>
                                <p className="text-lg font-bold leading-snug">
                                    {(pitfall as any)?.content || "אין מידע על מוקשים בפרק זה."}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Next Chapter Bridge */}
            {nextChapter && (
                <div className="pt-10 border-t flex flex-col items-center">
                    <Badge variant="outline" className="mb-6 px-4 py-1 text-sm font-bold uppercase tracking-widest bg-primary/5">מה הלאה?</Badge>
                    <Link
                        href={`./chapter-${(nextChapter as any).id?.replace('chapter-', '') || ''}`}
                        className="group flex flex-col items-center gap-4 text-center max-w-xl transition-all hover:scale-105"
                    >
                        <h3 className="text-2xl md:text-3xl font-black group-hover:text-primary transition-colors">
                            {nextChapter?.title || "הפרק הבא"}
                        </h3>
                        <div className="flex items-center gap-3 text-primary font-black text-lg">
                            <span>בואו נמשיך</span>
                            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                    </Link>
                </div>
            )}
        </section>
    );
};
