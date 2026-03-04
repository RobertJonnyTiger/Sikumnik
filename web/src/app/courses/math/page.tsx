"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, Clock, Target, ChevronLeft, Brain, Zap, Calculator, TrendingUp } from "lucide-react";
import { COURSE_REGISTRY } from "@/data/courses/registry";

export default function MathCoursePage() {
    const [course, setCourse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await (COURSE_REGISTRY as any).math();
                setCourse(data);
            } catch (e) {
                console.error("Failed to load math course", e);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!course) return <div>Course not found</div>;

    const iconMap: Record<string, any> = {
        Calculator, Zap, TrendingUp, Brain, Clock, Target, BookOpen, GraduationCap
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-24" dir="rtl">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-primary/20 via-background/60 to-background z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_transparent_50%)] from-primary/10 to-transparent z-0" />
                
                <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
                            <Calculator className="w-8 h-8 text-foreground" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-primary">מומלץ לך</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none">{course.title}</h1>
                    <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl font-medium leading-relaxed">
                        {course.description}
                    </p>
                    
                    <div className="flex gap-8 mt-10">
                        {course.stats?.map((stat: any, i: number) => {
                            const Icon = iconMap[stat.icon?.name] || stat.icon || BookOpen;
                            return (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-2 bg-muted rounded-xl border border-border">
                                        <Icon className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                                        <span className="text-lg font-black">{stat.value}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Syllabus Section */}
            <main className="max-w-7xl mx-auto px-6 mt-20 space-y-24">
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-2 w-16 bg-primary rounded-full" />
                        <h2 className="text-sm font-black uppercase tracking-[0.5em]">הסילבוס</h2>
                    </div>

                    <div className="space-y-12">
                        {course.syllabus?.map((section: any, idx: number) => {
                            const Icon = section.icon || Brain;
                            return (
                                <div key={idx} className="bg-card border border-border rounded-[3rem] p-10 md:p-14 overflow-hidden relative group transition-all hover:border-primary/30">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                    
                                    <div className="flex flex-col md:flex-row gap-12 relative z-10">
                                        <div className="md:w-1/3 space-y-6">
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/10 text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-500">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-4xl font-black tracking-tight">{section.title}</h3>
                                            <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                                                {section.description}
                                            </p>
                                        </div>

                                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {section.chapters?.map((chapter: any) => (
                                                <Link key={chapter.id} href={chapter.href} className="group/item">
                                                    <div className="p-6 bg-muted/30 border border-border rounded-2xl hover:bg-card hover:border-primary/20 hover:shadow-premium transition-all flex justify-between items-center h-full">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">פרק {chapter.number}</span>
                                                            </div>
                                                            <h4 className="text-lg font-black group-hover/item:text-primary transition-colors">{chapter.title}</h4>
                                                        </div>
                                                        <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover/item:text-primary transition-all group-hover/item:translate-x-[-4px]" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Why It Matters */}
                <section className="bg-muted/30 rounded-[4rem] p-12 md:p-20">
                    <h2 className="text-4xl font-black mb-16 text-center">{course.whyItMatters?.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {course.whyItMatters?.points?.map((point: any, i: number) => {
                            const Icon = point.icon || Zap;
                            return (
                                <div key={i} className="space-y-6 text-center">
                                    <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center border border-border shadow-sm mx-auto">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-black">{point.title}</h3>
                                    <p className="text-foreground/60 leading-relaxed">{point.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}
