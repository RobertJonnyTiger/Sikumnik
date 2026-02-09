"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Calculator,
  TrendingUp,
  Clock,
  ArrowRight,
  Play,
  LayoutDashboard,
  Brain,
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredCourses = [
    {
      id: "accounting",
      title: "חשבונאות א'",
      desc: "מניהול שכר דירה בתל אביב ועד לדוחות כספיים. ללמוד איך המרצה לא מרמה אותך.",
      icon: Calculator,
      color: "primary",
      progress: 65,
      href: "/courses/accounting/intro"
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
    <div className="min-h-screen bg-background font-sans text-foreground" dir="rtl">

      {/* Dynamic Header / Greeting */}
      <header className="px-8 pt-12 pb-8 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-1.5 w-12 bg-primary rounded-full" />
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">Dashboard V3</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none">אהלן, סטודנט! 👋</h1>
            <p className="text-xl text-foreground/50 font-medium">היום יום ראשון, זמן מצוין לכבוש קצת ידע.</p>
          </div>

          <div className="hidden lg:flex items-center gap-4 bg-card border border-border p-3 rounded-3xl shadow-premium">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <div className="pl-6">
              <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest leading-none mb-1">Last Session</p>
              <p className="text-sm font-black text-foreground leading-none">42 mins ago</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-8 py-8 max-w-7xl mx-auto space-y-16">

        {/* Interactive Carousel Section */}
        <section className="relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight">הקורסים שלך</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : featuredCourses.length - 1))}
                className="p-3 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all shadow-sm"
              >
                <ChevronRight className="w-6 h-6 text-foreground/40" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev < featuredCourses.length - 1 ? prev + 1 : 0))}
                className="p-3 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all shadow-sm"
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
                      <button className="bg-primary text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 hover:shadow-primary/30 transition-all flex items-center gap-4">
                        <span>המשך למידה</span>
                        <Play className="w-5 h-5 fill-current" />
                      </button>
                    </Link>
                    <div className="flex items-center gap-6 bg-card border border-border px-8 py-4 rounded-[2rem] shadow-sm">
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

        {/* Tachles Spotlight section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight">מה בתכל'ס..</h2>
              <Link href="/courses" className="text-primary font-black text-sm flex items-center gap-2 group">
                לכל התובנות <ArrowRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </Link>
            </div>

            <div className="bg-accent/5 border border-accent/20 p-10 rounded-[3.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
              <div className="flex items-start gap-8 relative z-10">
                <div className="bg-accent p-4 rounded-2xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-accent uppercase tracking-[0.3em]">INSIGHT OF THE DAY</h3>
                  <p className="text-2xl md:text-3xl font-handwriting font-medium italic opacity-85 leading-relaxed pr-6 border-r-4 border-accent/30">
                    "אינפלציה זה כמו כשכולם בבר קונים וואנפאונד ובסוף הבעלים מעלה את המחיר ב-20 שקל.
                    הכסף שלך שווה פחות בירות, ואתה נשאר צמא."
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <span className="text-[10px] font-black text-accent/50 uppercase tracking-[0.4em]">SOURCE: ACCOUNTING 101</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-black tracking-tight">הישגים</h2>
            <div className="bg-card border border-border p-8 rounded-[3rem] shadow-premium h-full min-h-[300px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-tr from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="font-black text-lg">אלוף החשבונאות</h4>
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Master Level</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-tr from-slate-300 to-slate-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div>
                    <h4 className="font-black text-lg">רצף למידה: 5 ימים</h4>
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Keep it up!</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <Link href="#">
                  <button className="w-full py-4 rounded-2xl bg-foreground/5 text-foreground/40 font-black text-sm hover:bg-primary hover:text-white transition-all">
                    לצפייה בכל ההישגים
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Bento Actions */}
        <section className="space-y-8">
          <h2 className="text-2xl font-black tracking-tight">קיצורי דרך</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "משימות", icon: LayoutDashboard, color: "primary" },
              { title: "ספריית עזר", icon: BookOpen, color: "accent" },
              { title: "שיחה עם AI", icon: Sparkles, color: "primary" },
              { title: "כל הקורסים", icon: GraduationCap, color: "accent" }
            ].map((item, idx) => (
              <button key={idx} className="bg-white border border-border p-8 rounded-[2.5rem] shadow-sm hover:shadow-premium hover:-translate-y-2 transition-all group flex flex-col items-center gap-4">
                <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                  item.color === "primary" ? "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white" : "bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white"
                )}>
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="font-black text-foreground/60 group-hover:text-foreground">{item.title}</span>
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* Spacing for mobile nav */}
      <div className="h-32 lg:hidden" />
    </div>
  );
}
