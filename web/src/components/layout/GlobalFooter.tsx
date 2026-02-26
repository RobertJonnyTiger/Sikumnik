"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-card/30 backdrop-blur-xl border-t border-white/5 pt-16 pb-8 px-8 mt-auto relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4">
                {/* Brand & Mission */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-4 group w-fit">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                            <GraduationCap className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                            <span className="font-black text-2xl text-foreground tracking-tight block leading-none mb-1">סיכומניק</span>
                            <span className="text-[10px] font-black text-foreground uppercase tracking-[0.2em]">PLATFORM V3</span>
                        </div>
                    </Link>
                    <p className="text-foreground text-sm leading-relaxed max-w-xs">
                        הפלטפורמה המתקדמת ביותר ללימוד וניהול ידע אקדמי בעברית. סיכומים, תרגול חכם וקהילה תומכת במקום אחד.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:text-foreground hover:bg-primary/5 transition-all">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:text-foreground hover:bg-primary/5 transition-all">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:text-foreground hover:bg-primary/5 transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-[11px] font-black text-foreground uppercase tracking-[0.3em] mb-8">ניווט מהיר</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/" className="text-foreground hover:text-foreground transition-colors text-sm font-medium">לוח בקרה</Link>
                        </li>
                        <li>
                            <Link href="/courses" className="text-foreground hover:text-foreground transition-colors text-sm font-medium">מפת הקורסים</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-foreground hover:text-foreground transition-colors text-sm font-medium">הישגים שלי</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-foreground hover:text-foreground transition-colors text-sm font-medium">ספרייה דיגיטלית</Link>
                        </li>
                    </ul>
                </div>

                {/* Courses */}
                <div>
                    <h4 className="text-[11px] font-black text-foreground uppercase tracking-[0.3em] mb-8">קורסים פופולריים</h4>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/courses/accounting" className="text-foreground hover:text-foreground transition-colors text-sm font-medium">חשבונאות א׳</Link>
                        </li>
                        <li>
                            <Link href="/courses/microeconomics" className="text-foreground hover:text-foreground transition-colors text-sm font-medium">מיקרו כלכלה</Link>
                        </li>
                        <li>
                            <Link href="/courses/organizational-behavior" className="text-foreground hover:text-foreground transition-colors text-sm font-medium">התנהגות ארגונית</Link>
                        </li>
                        <li>
                            <span className="text-foreground text-sm font-medium flex items-center gap-2">
                                סטטיסטיקה (בקרוב)
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Contact/Support - Removed as per request */}

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-[11px] font-bold text-foreground">
                        נוצר ע״י רוברט תיגר, בית-הספר לכלכלה וניהול, האקדמית תל-אביב, 2026
                    </p>
                    <p className="text-[10px] font-black text-foreground uppercase tracking-[0.2em]">
                        © {currentYear} SIKUMNIK — ALL RIGHTS RESERVED
                    </p>
                </div>
                <div className="flex gap-8">
                    <a href="#" className="text-[10px] font-black text-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]">תנאי שימוש</a>
                    <a href="#" className="text-[10px] font-black text-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]">פרטיות</a>
                </div>
            </div>
        </footer>
    );
}
