"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Trophy, Star, BookOpen, Brain, TrendingUp, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import Link from 'next/link';

interface CourseCompletionDashboardProps {
    courseTitle: string;
    stats: {
        label: string;
        value: string;
        icon: React.ElementType;
        color: string;
    }[];
    learnedConcepts: string[];
    narrative?: React.ReactNode;
}

export const CourseCompletionDashboard: React.FC<CourseCompletionDashboardProps> = ({
    courseTitle,
    stats,
    learnedConcepts,
    narrative
}) => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#22c55e', '#3b82f6', '#eab308']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#22c55e', '#3b82f6', '#eab308']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        // Delay content appearance slightly for effect
        setTimeout(() => setShowContent(true), 500);
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-background text-slate-50 font-sans p-6 md:p-12" dir="rtl">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl mx-auto space-y-12"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center space-y-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -z-10 animate-pulse" />

                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="w-32 h-32 mx-auto bg-linear-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.3)]"
                    >
                        <Trophy className="w-16 h-16 text-yellow-950" strokeWidth={2} />
                    </motion.div>

                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
                            מזל טוב! סיימת את הקורס
                        </h1>
                        <p className="text-2xl text-muted-foreground font-light">
                            {courseTitle}
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-md px-6 py-3 rounded-full border border-border/50 shadow-xl">
                        <BookOpen className="w-5 h-5 text-blue-700" />
                        <span className="text-xl font-bold font-mono tracking-widest">סיום הקורס</span>
                    </div>

                    {/* Narrative Story */}
                    <div className="max-w-3xl mx-auto bg-card/50 p-8 rounded-3xl border border-border backdrop-blur-sm text-lg md:text-xl leading-relaxed text-muted-foreground relative text-right">
                        <div className="absolute -top-6 right-8 bg-background p-3 rounded-full border border-border shadow-xl">
                            <TrendingUp className="w-6 h-6 text-blue-700" />
                        </div>
                        {narrative}
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-border transition-colors">
                            <div className={cn("absolute top-0 right-0 w-full h-1", stat.color)} />
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn("p-3 rounded-xl bg-background", stat.color.replace('bg-', 'text-'))}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <TrendingUp className="w-4 h-4 text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-3xl font-black mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Concepts Mastered */}
                <motion.div variants={itemVariants} className="bg-card/50 border border-border rounded-3xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Brain className="w-6 h-6 text-purple-400" />
                        מושגי מפתח שרכשת
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {learnedConcepts.map((concept, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (idx * 0.05) }}
                                className="px-4 py-2 bg-muted hover:bg-slate-700 border border-border rounded-lg text-sm font-medium transition-colors cursor-default select-none group"
                            >
                                <span className="group-hover:text-purple-300 transition-colors">{concept}</span>
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Action Footer */}
                <motion.div variants={itemVariants} className="flex justify-center pt-8">
                    <Link href="/courses">
                        <button className="group relative px-8 py-4 bg-card text-slate-950 font-bold rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            <span className="flex items-center gap-2 relative z-10">
                                חזרה לקטלוג הקורסים
                                <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </Link>
                </motion.div>

            </motion.div>
        </div>
    );
};
