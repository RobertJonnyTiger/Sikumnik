"use client";

import React from "react";
import { ChapterData } from "@/types/chapter";
import { motion } from "framer-motion";
import {
    Clock,
    Target,
    ArrowLeft,
    Sparkles,
    BookOpen,
    Lightbulb
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ChapterLandingProps {
    data: ChapterData;
    onStart: () => void;
}

export const ChapterLanding: React.FC<ChapterLandingProps> = ({ data, onStart }) => {
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 max-w-5xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Header / Meta */}
            <motion.div variants={item} className="text-center space-y-6 mb-12">
                <div className="flex items-center justify-center gap-3">
                    <Badge variant="outline" className="text-sm py-1 px-4 border-primary/20 bg-primary/5 text-primary">
                        {data.course}
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-1 px-4">
                        פרק {data.chapterNumber}
                    </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/70">
                    {data.title}
                </h1>

                {data.pageMap?.estimatedTime && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
                        <Clock className="w-5 h-5" />
                        <span>זמן משוער: {data.pageMap.estimatedTime}</span>
                    </div>
                )}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">

                {/* Right Column: Hook & Why */}
                <motion.div variants={item} className="space-y-6">
                    {data.introduction?.hook && (
                        <div className="relative p-6 rounded-3xl bg-linear-to-br from-primary/5 to-accent/5 border border-primary/10">
                            <Sparkles className="w-8 h-8 text-primary absolute -top-4 -right-4 bg-background rounded-full p-1 border border-border shadow-sm" />
                            <h3 className="text-lg font-black mb-3 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                למה זה מעניין?
                            </h3>
                            <p className="text-lg leading-relaxed text-foreground/80">
                                {data.introduction.hook}
                            </p>
                        </div>
                    )}

                    {data.introduction?.whyItMatters && (
                        <Card className="border-l-4 border-l-primary shadow-sm bg-card/50">
                            <CardContent className="p-6">
                                <h4 className="font-bold text-sm text-primary uppercase tracking-wider mb-2">בשורה התחתונה</h4>
                                <p className="text-foreground/70">
                                    {data.introduction.whyItMatters}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>

                {/* Left Column: Learning Objectives */}
                <motion.div variants={item} className="space-y-4">
                    <div className="bg-card border border-border rounded-3xl p-8 h-full shadow-premium relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

                        <h3 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10">
                            <Target className="w-6 h-6 text-primary" />
                            מה נלמד בפרק?
                        </h3>

                        <ul className="space-y-4 relative z-10">
                            {data.pageMap?.learningObjectives?.map((objective, idx) => (
                                <li key={idx} className="flex items-start gap-4 group/item">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                        <span className="text-xs font-bold">{idx + 1}</span>
                                    </div>
                                    <p className="text-foreground/70 group-hover/item:text-foreground transition-colors font-medium">
                                        {objective}
                                    </p>
                                </li>
                            )) || (
                                    <li className="text-muted-foreground italic">יעדי הלימוד יעודכנו בקרוב</li>
                                )}
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Footer / CTA */}
            <motion.div variants={item} className="flex flex-col items-center gap-4">
                <button
                    onClick={onStart}
                    className="group relative px-8 py-4 bg-primary text-primary-foreground text-lg font-black rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                    <span>התחל בפרק</span>
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <p className="text-xs text-muted-foreground font-medium">
                    לחץ כדי לצלול פנימה
                </p>
            </motion.div>

        </motion.div>
    );
};
