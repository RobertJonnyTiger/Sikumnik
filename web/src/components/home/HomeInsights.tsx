"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Sparkles,
    ArrowRight,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HomeInsights() {
    const [activeInsight, setActiveInsight] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    const insights = [
        "אינפלציה זה כמו כשכולם בבר קונים וואנפאונד ובסוף הבעלים מעלה את המחיר ב-20 שקל. הכסף שלך שווה פחות בירות.",
        "עלות שקועה זה כמו ה-40 דקות שחיכית למונית בגשם. זה שהמתנת לא אומר שאתה צריך לחכות עוד, תזמין כבר אובר.",
        "נזילות זה היכולת שלך לשלם טיפ לשליח של וולט במזומן כשהוא מגיע. אם יש לך רק ביט, אתה לא נזיל, אחי.",
        "החזר השקעה (ROI) של תואר בחשבונאות? נדבר כשתסיים את הסטאז' ותפסיק לבקש כסף מאמא לשכר דירה בפלורנטין.",
        "פחת זה האופניים החשמליים שלך. קנית אותם ב-5000, אחרי יומיים באלנבי הם שווים חצי, ואחרי חודש הם גנובים (שווי 0).",
        "נכס זה לא הדירה השכורה שלך ברוטשילד. נכס זה המכונת אספרסו שקנית והחברים משלמים לך על קפסולות.",
        "התחייבות זה הדרינק הזה ב-3 בבוקר שאתה מבטיח שתצטער עליו מחר בשיעור מבוא למיקרו.",
        "עלות אלטרנטיבית זה הזמן שאתה מבזבז על טיקטוק במקום ללמוד למבחן. המחיר הוא נכשל, והתשלום במזומן (מועד ב').",
        "הון עצמי זה מה שנשאר לך בכיס אחרי ששילמת שכר דירה, ארנונה, וחשבון חשמל מופקע. בקיצור, מינוס.",
        "גידור סיכונים זה להזמין פיצה וגם המבורגר למאנץ', למקרה שאחד מהם יגיע קר."
    ];

    const changeInsight = (newDirection: 'next' | 'prev') => {
        if (isAnimating) return;

        setDirection(newDirection);
        setIsAnimating(true);

        setTimeout(() => {
            setActiveInsight((prev) => {
                if (newDirection === 'next') return (prev + 1) % insights.length;
                return (prev - 1 + insights.length) % insights.length;
            });
            setIsAnimating(false);
        }, 400); // Sync with CSS duration
    };

    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">מה בתכל&apos;ס..</h2>
                <Link href="/courses" className="text-primary font-black text-sm flex items-center gap-2 group">
                    לכל התובנות <ArrowRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                </Link>
            </div>

            <div className="bg-accent/5 border border-accent/20 p-10 rounded-[3.5rem] relative overflow-hidden group min-h-[320px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />

                <div className="flex flex-col h-full relative z-10 space-y-6">
                    {/* Header Row */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-accent p-4 rounded-2xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform shrink-0">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-sm font-black text-accent uppercase tracking-[0.3em]">תובנת היום</h3>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => changeInsight('prev')}
                                className="p-3 rounded-xl bg-white/50 hover:bg-white text-accent transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                disabled={isAnimating}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => changeInsight('next')}
                                className="p-3 rounded-xl bg-white/50 hover:bg-white text-accent transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                disabled={isAnimating}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content Area with Animation */}
                    <div className="flex-1 w-full flex items-center relative overflow-hidden min-h-[140px]">
                        <p
                            key={activeInsight}
                            className={cn(
                                "text-2xl md:text-3xl font-handwriting font-medium italic leading-relaxed pr-6 border-r-4 border-accent/30 transition-all duration-500 absolute w-full",
                                isAnimating
                                    ? (direction === 'next' ? "-translate-x-10 opacity-0 blur-sm" : "translate-x-10 opacity-0 blur-sm")
                                    : "translate-x-0 opacity-85 blur-0"
                            )}
                        >
                            &quot;{insights[activeInsight]}&quot;
                        </p>
                    </div>

                    {/* Footer Row: Origin & Indicators */}
                    <div className="flex items-center justify-between pt-4 border-t border-accent/10">
                        <div className="flex gap-1.5">
                            {insights.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-500",
                                        idx === activeInsight ? "w-8 bg-accent" : "w-1.5 bg-accent/20"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-accent/50 uppercase tracking-[0.4em]">מקור: חשבונאות א&apos;</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
