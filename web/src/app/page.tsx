"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, X, Menu } from "lucide-react";

const HERO_GRADIENT_STYLE = {
  background: 'radial-gradient(circle at top center, #2a1b6d 0%, #131022 70%)'
};

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#131022] text-white" dir="rtl">
      {/* Sidebar Overlay */}
      {isSidebarOpen ? (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-80 h-full bg-[#1c1836] border-r border-white/10 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <span className="text-xl font-bold">תפריט</span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-6 space-y-4">
              <Link
                href="/courses"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#3713ec]/20 border border-[#3713ec]/40 text-white hover:bg-[#3713ec]/30 transition-all group"
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="w-10 h-10 rounded-lg bg-[#3713ec] flex items-center justify-center shadow-lg shadow-[#3713ec]/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg">כל הקורסים</span>
              </Link>
            </nav>
          </div>
        </div>
      ) : null}

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 w-full px-4 py-3 backdrop-blur-xl bg-white/[0.03] border-b border-white/5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-lg font-bold tracking-tight">סיכומניק</span>
            <div className="w-8 h-8 bg-[#3713ec] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(55,19,236,0.4)]">
              <span className="text-white text-xl">🎓</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Hero Section with Temple Gradient */}
      <header className="relative pt-12 pb-20 px-6 flex flex-col items-center text-center" style={HERO_GRADIENT_STYLE}>
        {/* Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#3713ec]/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#00f3ff]/10 rounded-full blur-[80px] -z-10" />

        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tight">
            סיכומניק:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3713ec] to-[#00f3ff]">
              המקדש הדיגיטלי שלך
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed mb-10 max-w-lg mx-auto">
            הופכים הגדרות יבשות לשפת רחוב, כדי שתגיע למבחן בביטחון של מישהו שמצא חניה ברוטשילד.
          </p>
        </div>

        {/* Search Bar with Glow */}
        <div className="w-full max-w-md mt-4" style={{ boxShadow: '0 0 30px rgba(0, 243, 255, 0.15)' }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3713ec] via-[#00f3ff] to-[#3713ec] rounded-xl blur opacity-30 group-focus-within:opacity-60 transition duration-500" />
            <div className="relative flex items-center bg-[#1c1836] rounded-xl border border-white/10 overflow-hidden">
              <div className="pr-4 flex items-center justify-center text-[#00f3ff]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="w-full bg-transparent border-none text-white placeholder:text-slate-500 py-5 px-4 focus:ring-0 text-lg outline-none"
                placeholder="חפש קורס, מרצה או תובנה אלוהית..."
                type="text"
              />
              <div className="pl-2">
                <Link href="/courses">
                  <button className="bg-[#3713ec] hover:bg-[#3713ec]/90 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 ml-2">
                    גלה
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
            <span>מחפשים עכשיו:</span>
            <a className="text-[#00f3ff]/80 hover:underline" href="#">כלכלה מיקרו</a>
            <span className="opacity-30">•</span>
            <a className="text-[#00f3ff]/80 hover:underline" href="#">משפט חוקתי</a>
            <span className="opacity-30">•</span>
            <a className="text-[#00f3ff]/80 hover:underline" href="#">מדעי המחשב</a>
          </div>
        </div>
      </header>

      <main className="px-6 py-16 max-w-screen-xl mx-auto">
        {/* Why Sikumnik Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">למה סיכומניק?</h2>
            <div className="w-12 h-1 bg-[#3713ec] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-2xl flex flex-col gap-4 border-b-4 border-b-[#3713ec]/20 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-[#3713ec]/20 rounded-xl flex items-center justify-center text-[#3713ec]">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold">למידה בלי שכר דירה</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                כי גם ככה הדירה בפלורנטין שותה לך את הנשמה. קבל גישה לכל החומר הכי חם בלי לשלם שקל נוסף על קורסי עזר יקרים.
              </p>
              <div className="mt-auto pt-4 flex items-center text-[#00f3ff] text-xs font-bold uppercase tracking-widest gap-2">
                <span>חיסכון מקסימלי</span>
                <span>📉</span>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-2xl flex flex-col gap-4 border-b-4 border-b-[#00f3ff]/20 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-[#00f3ff]/20 rounded-xl flex items-center justify-center text-[#00f3ff]">
                <span className="text-3xl">☕</span>
              </div>
              <h3 className="text-xl font-bold">סיכומים חזקים כמו אספרסו</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                מזקקים 3 שעות של הרצאה משמימה ל-10 דקות של קריאה ממוקדת. בדיוק מה שאתה צריך כדי להתעורר על החיים שלך לפני המבחן.
              </p>
              <div className="mt-auto pt-4 flex items-center text-[#00f3ff] text-xs font-bold uppercase tracking-widest gap-2">
                <span>אנרגיה טהורה</span>
                <span>⚡</span>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-2xl flex flex-col gap-4 border-b-4 border-b-[#3713ec]/20 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-[#3713ec]/20 rounded-xl flex items-center justify-center text-[#3713ec]">
                <span className="text-3xl">🅿️</span>
              </div>
              <h3 className="text-xl font-bold">ביטחון של חניה ברוטשילד</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                מכיר את ההרגשה שמצאת כחול-לבן פנוי בשישי בערב? ככה תרגיש כשתיכנס למבחן אחרי שעברת על הסיכומים שלנו.
              </p>
              <div className="mt-auto pt-4 flex items-center text-[#00f3ff] text-xs font-bold uppercase tracking-widest gap-2">
                <span>רוגע נפשי</span>
                <span>✓</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Moved ABOVE Statistics */}
        <section className="mb-24 px-6 scale-[1.05]">
          <div className="max-w-screen-lg mx-auto relative overflow-hidden rounded-[2rem] p-1 bg-[#1c1836] border border-white/10 shadow-[0_0_50px_rgba(55,19,236,0.15)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3713ec]/20 blur-[100px] -z-0" />
            <div className="relative z-10 px-8 py-12 md:p-16 text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6">מוכן להיכנס למקדש?</h2>
              <p className="text-slate-400 max-w-md mx-auto mb-10">
                אל תיתן לאקדמיה לייבש אותך. הצטרף לקהילה של סטודנטים שמבינים שללמוד זה לא חייב להיות סיוט.
              </p>
              <Link href="/courses">
                <button className="bg-[#3713ec] hover:bg-[#3713ec]/90 text-white text-lg font-bold px-10 py-5 rounded-xl shadow-[0_0_15px_rgba(55,19,236,0.4)] transition-all active:scale-95 flex items-center gap-3">
                  <span>התחל ללמוד בסטייל</span>
                  <span>✨</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-[#3713ec]/5 py-20 rounded-[2rem] border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#3713ec]/5 blur-3xl opacity-20" />
          <div className="max-w-screen-xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-around gap-12 text-center">
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-black text-white">+15k</span>
                <span className="text-slate-400">סטודנטים מאושרים</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-black text-[#00f3ff]">+400</span>
                <span className="text-slate-400">קורסים מתורגמים</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-black text-white">98%</span>
                <span className="text-slate-400">אחוזי הצלחה במבחן</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#131022]">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold">סיכומניק</span>
            <div className="w-6 h-6 bg-[#3713ec] rounded flex items-center justify-center">
              <span className="text-white text-xs">🎓</span>
            </div>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a className="hover:text-white transition-colors" href="#">תקנון</a>
            <a className="hover:text-white transition-colors" href="#">פרטיות</a>
            <a className="hover:text-white transition-colors" href="#">צור קשר</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-600">
          2024 © סיכומניק. כל הזכויות שמורות למקדש הדיגיטלי.
        </div>
      </footer>
    </div>
  );
}
