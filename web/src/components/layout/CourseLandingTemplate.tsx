
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    BookOpen,
    Clock,
    Target,
    Play,
    ArrowLeft,
    ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Chapter {
    id: string;
    number: number | string;
    title: string;
    description: string;
    href: string;
}

interface SyllabusSection {
    title: string;
    description: string;
    icon: any;
    chapters: Chapter[];
}

interface Stat {
    label: string;
    value: string;
    icon: any;
}

interface CourseData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    stats: Stat[];
    whatYouWillLearn: string[];
    syllabus: SyllabusSection[];
    whyItMatters: {
        title: string;
        points: {
            title: string;
            text: string;
            icon: any;
        }[];
    };
    visualCards?: {
        icon: any;
        title: string;
        color: string;
    }[];
}

interface CourseLandingTemplateProps {
    courseData: CourseData;
}

export function CourseLandingTemplate({ courseData }: CourseLandingTemplateProps) {
    // Default visual cards if none provided
    const visualCards = courseData.visualCards || [
        { icon: BookOpen, title: "יסודות", color: "bg-primary" },
        { icon: Target, title: "פרקטיקה", color: "bg-primary" },
        { icon: Clock, title: "יעילות", color: "bg-primary" },
        { icon: Play, title: "למידה", color: "bg-primary" },
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-24" dir="rtl">

            {/* Hero Section */}
            <header className="relative overflow-hidden bg-card border-b border-border">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-slate-900/50 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

                <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-foreground font-bold text-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                קורס פעיל
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
                                {courseData.title}
                                <span className="block text-3xl md:text-4xl text-foreground font-bold opacity-90">
                                    {courseData.subtitle}
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                {courseData.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {courseData.stats.map((stat, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-muted/50 border border-border/50 px-5 py-3 rounded-2xl">
                                        <stat.icon className="w-5 h-5 text-foreground" />
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                                            <span className="text-sm font-bold text-foreground">{stat.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Link
                                    href={courseData.syllabus[0].chapters[0].href}
                                    className="flex items-center gap-3 bg-primary hover:bg-primary text-foreground font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    התחל ללמוד
                                </Link>
                            </div>
                        </div>

                        {/* Abstract Visual Representation */}
                        <div className="flex-1 w-full max-w-md relative">
                            <div className="aspect-square rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 opacity-20 blur-3xl absolute inset-0 animate-pulse" />
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <div className="space-y-4 pt-8">
                                    <CourseValueCard icon={visualCards[0].icon} title={visualCards[0].title} color={visualCards[0].color} delay={0} />
                                    <CourseValueCard icon={visualCards[1].icon} title={visualCards[1].title} color={visualCards[1].color} delay={0.1} />
                                </div>
                                <div className="space-y-4">
                                    <CourseValueCard icon={visualCards[2].icon} title={visualCards[2].title} color={visualCards[2].color} delay={0.2} />
                                    <CourseValueCard icon={visualCards[3].icon} title={visualCards[3].title} color={visualCards[3].color} delay={0.3} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">

                {/* Why It Matters */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-secondary/10 rounded-2xl">
                            <Target className="w-8 h-8 text-secondary-foreground" />
                        </div>
                        <h2 className="text-3xl font-black text-foreground">{courseData.whyItMatters.title}</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {courseData.whyItMatters.points.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card/50 border border-border p-8 rounded-3xl hover:bg-muted/50 transition-colors group"
                            >
                                <div className="bg-muted w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <point.icon className="w-6 h-6 text-secondary-foreground" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {point.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Syllabus */}
                <section className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-muted md:left-1/2 hidden md:block" />

                    <div className="flex items-center gap-4 mb-16 justify-center relative z-10">
                        <div className="bg-background px-6 py-2 border border-border rounded-full flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-foreground" />
                            <span className="font-bold text-foreground">סילבוס הקורס</span>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {courseData.syllabus.map((part, partIndex) => (
                            <div key={partIndex} className="relative">
                                {/* Section Header */}
                                <div className="flex md:justify-center mb-8">
                                    <div className="bg-card border border-border p-6 rounded-3xl max-w-2xl w-full text-center shadow-xl shadow-black/20 relative z-10">
                                        <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <part.icon className="w-6 h-6 text-foreground" />
                                        </div>
                                        <h3 className="text-2xl font-black text-foreground mb-2">{part.title}</h3>
                                        <p className="text-muted-foreground">{part.description}</p>
                                    </div>
                                </div>

                                {/* Chapters Grid */}
                                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                                    {part.chapters.map((chapter) => (
                                        <Link
                                            key={chapter.id}
                                            href={chapter.href}
                                            className="group bg-card/30 border border-border/50 hover:border-primary/30 hover:bg-card/80 p-6 rounded-2xl transition-all flex gap-4"
                                        >
                                            <div className="flex flex-col items-center gap-1 min-w-12">
                                                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">פרק</span>
                                                <span className="text-2xl font-black text-foreground group-hover:scale-110 transition-transform">{chapter.number}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <h4 className="text-lg font-bold text-foreground transition-colors mb-2">
                                                        {chapter.title}
                                                    </h4>
                                                    <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-sky-600 group-hover:-translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {chapter.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <h2 className="text-4xl font-black text-foreground">מוכנים להתחיל?</h2>
                        <p className="text-indigo-900 text-lg">
                            הצטרפו למסע המרתק להבנת {courseData.title}. הפרק הראשון מחכה לכם.
                        </p>
                        <Link
                            href={courseData.syllabus[0].chapters[0].href}
                            className="inline-flex items-center gap-3 bg-white text-foreground hover:bg-slate-100 font-bold py-4 px-10 rounded-2xl transition-all shadow-xl shadow-black/20 hover:scale-105 active:scale-95"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            התחל את הקורס עכשיו
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}

function CourseValueCard({ icon: Icon, title, color, delay }: { icon: any, title: string, color: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="bg-muted/80 backdrop-blur-sm border border-border/50 p-4 rounded-2xl flex items-center gap-3 shadow-lg"
        >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-foreground shadow-lg", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="font-bold text-foreground">{title}</span>
        </motion.div>
    )
}
