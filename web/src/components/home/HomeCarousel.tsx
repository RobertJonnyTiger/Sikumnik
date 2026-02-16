"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calculator,
    TrendingUp,
    Brain,
    ChevronRight,
    ChevronLeft,
    Play
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HomeCarousel() {
    const [activeSlide, setActiveSlide] = useState(0);

    const featuredCourses = [
        {
            id: "accounting",
            title: "חשבונאות א'",
            desc: "מניהול שכר דירה בתל אביב ועד לדוחות כספיים. ללמוד איך המרצה לא מרמה אותך.",
            icon: Calculator,
            color: "primary",
            progress: 65,
            href: "/courses/accounting/chapter-0"
        },
        {
            id: "micro",
            title: "מיקרו כלכלה",
            desc: "למה אין ארוחות חינם, איך עקומת התמורה קובעת הכל, ולמה זה רלוונטי לחיים שלך בתל אביב.",
            icon: TrendingUp,
            color: "accent",
            progress: 25,
            href: "/courses/microeconomics/chapter-1"
        },
        {
            id: "stats",
            title: "סטטיסטיקה א'",
            desc: "להבין למה יש 100% סיכוי שתצליח אם תלמד איתנו. התפלגות נורמלית לסטודנט הלא-כל-כך-נורמלי.",
            icon: TrendingUp,
            color: "accent",
            progress: 12,
            href: "#"
        },
        {
            id: "psych",
            title: "מבוא לפסיכולוגיה",
            desc: "למה אתה דוחה הכל לרגע האחרון? בוא נבין את המוח שלך (ואיך לעבור את המבחן).",
            icon: Brain,
            color: "primary",
            progress: 0,
            href: "#"
        }
    ];

    return (
        <section className="relative">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black tracking-tight">הקורסים שלך</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : featuredCourses.length - 1))}
                        className="p-3 rounded-4xl bg-card border border-border hover:border-primary/40 transition-all shadow-sm"
                    >
                        <ChevronRight className="w-6 h-6 text-foreground/40" />
                    </button>
                    <button
                        onClick={() => setActiveSlide((prev) => (prev < featuredCourses.length - 1 ? prev + 1 : 0))}
                        className="p-3 rounded-4xl bg-card border border-border hover:border-primary/40 transition-all shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6 text-foreground/40" />
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-[3.5rem] bg-card border border-border shadow-premium group/hero h-[400px] md:h-[450px]">
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

                {featuredCourses.map((course, idx) => (
                    <div
                        key={course.id}
                        className={cn(
                            "absolute inset-0 p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ease-in-out",
                            idx === activeSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 pointer-events-none"
                        )}
                    >
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary p-4 rounded-3xl shadow-lg shadow-primary/20">
                                    <course.icon className="w-10 h-10 text-white" />
                                </div>
                                <span className="text-3xl font-black tracking-tight">{course.title}</span>
                            </div>
                            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-medium max-w-xl">
                                {course.desc}
                            </p>

                            <div className="flex flex-wrap gap-6 items-center">
                                <Link href={course.href}>
                                    <button className="bg-primary text-white px-10 py-5 rounded-4xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 hover:shadow-primary/30 transition-all flex items-center gap-4">
                                        <span>המשך למידה</span>
                                        <Play className="w-5 h-5 fill-current" />
                                    </button>
                                </Link>
                                <div className="flex items-center gap-6 bg-card border border-border px-8 py-4 rounded-4xl shadow-sm">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest leading-none mb-1">Progress</p>
                                        <p className="text-lg font-black text-primary leading-none">{course.progress}%</p>
                                    </div>
                                    <div className="w-32 h-2 bg-primary/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${course.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 justify-center items-center">
                            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                                <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-6 scale-90 blur-xl" />
                                <div className="absolute inset-0 bg-card border-4 border-border rounded-[4rem] shadow-premium flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform duration-700">
                                    <course.icon className="w-32 h-32 lg:w-48 lg:h-48 text-primary opacity-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
