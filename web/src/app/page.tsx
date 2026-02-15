import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Clock,
  LayoutDashboard,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HomeCarousel } from "@/components/home/HomeCarousel";
import { HomeInsights } from "@/components/home/HomeInsights";

export default function Home() {
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
        <HomeCarousel />

        {/* Tachles Spotlight section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <HomeInsights />

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
              <button key={idx} className="bg-card border border-border p-8 rounded-5xl shadow-sm hover:shadow-premium hover:-translate-y-2 transition-all group flex flex-col items-center gap-4">
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
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
