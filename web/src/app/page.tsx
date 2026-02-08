import { GlassCard } from "@/components/ui/glass-card";
import { BookOpen, Calculator, TrendingUp, ChevronLeft, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">

      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-4 bg-slate-900/50 rounded-full mb-6 border border-slate-800">
            <GraduationCap className="w-12 h-12 text-pink-500" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-400 to-cyan-400 neon-text">
            Sikumnik
          </h1>
          <p className="text-2xl text-slate-400 font-light tracking-wide">
            היכל הידע של אגודת הסטודנטים
          </p>
        </header>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Active Course Card (Accounting) */}
          <Link href="/courses/accounting/intro" className="col-span-1 lg:col-span-2 block group">
            <GlassCard gradient className="h-full cursor-pointer group-hover:neon-glow transition-all duration-300">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-pink-500/10 text-pink-400 text-xs font-bold rounded-full mb-3 border border-pink-500/20">
                    קורס פעיל
                  </span>
                  <h2 className="text-4xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">חשבונאות א'</h2>
                  <p className="text-slate-400">המדריך להישרדות פיננסית (וכלכלית)</p>
                </div>
                <div className="bg-pink-500/10 p-4 rounded-full border border-pink-500/20 group-hover:bg-pink-500/20 transition-colors">
                  <Calculator className="w-8 h-8 text-pink-500" />
                </div>
              </div>

              {/* Chapters Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-pink-500/30 transition-colors group/item">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 text-sm font-bold">✓</div>
                    <span className="text-slate-200">מבוא ומושגי יסוד</span>
                  </div>
                  <span className="text-xs text-slate-500">הושלם</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-pink-500/30 transition-colors group/item">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 text-sm font-bold group-hover/item:border-pink-500 group-hover/item:text-pink-400 transition-colors">2</div>
                    <span className="text-slate-200">המאזן ודוח רווח והפסד</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-slate-600 group-hover/item:text-pink-400 transition-colors" />
                </div>
              </div>
            </GlassCard>
          </Link>

          {/* Prompt / Locked Courses */}
          <GlassCard className="opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-300">מיקרו כלכלה</h3>
                  <TrendingUp className="w-6 h-6 text-indigo-400" />
                </div>
                <p className="text-slate-500 text-sm">היצע, ביקוש, ומה שביניהם.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <span className="text-xs text-indigo-400 font-mono">בקרוב...</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-300">סטטיסטיקה</h3>
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-slate-500 text-sm">הסתברות וקבלת החלטות.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <span className="text-xs text-cyan-400 font-mono">בקרוב...</span>
              </div>
            </div>
          </GlassCard>

        </div>

      </div>
    </main>
  );
}
