"use client";

import React from "react";
import { MaslowPyramid } from "@/components/core/blocks/MaslowPyramid";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function MaslowPyramidPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 font-main" dir="rtl">
            <div className="max-w-4xl mx-auto">
                {/* Navigation Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        בית
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/courses/organizational-behavior/chapter-3" className="hover:text-primary transition-colors">
                        התנהגות ארגונית - פרק 3
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary/80">פירמידת מאסלו</span>
                </nav>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter knowledge-text inline-block">
                        מדרג הצרכים של מאסלו
                    </h1>
                    <p className="text-lg text-foreground/60 max-w-2xl leading-relaxed">
                        אברהם מאסלו (1943) הציע את אחת התיאוריות המשפיעות ביותר על מוטיבציה אנושית.
                        לחצו על כל שלב בפירמידה כדי לחקור את עומק הצרכים המניעים אותנו.
                    </p>
                </div>

                {/* Component */}
                <MaslowPyramid />

                {/* Footer Info */}
                <div className="mt-16 pt-8 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-foreground/50">
                    <div>
                        <h5 className="font-bold text-foreground/80 mb-2 uppercase tracking-widest text-xs">הקשר ארגוני</h5>
                        <p className="leading-relaxed">
                            בניהול מודרני, מנהלים משתמשים במודל זה כדי להבין מדוע תמריצים מסוימים (כמו בונוסים) לא עובדים אם צרכים בסיסיים יותר (כמו ביטחון תעסוקתי) לא מסופקים.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-bold text-foreground/80 mb-2 uppercase tracking-widest text-xs">ביקורת התיאוריה</h5>
                        <p className="leading-relaxed">
                            חשוב לזכור: המדרג אינו קשיח עבור כולם. ישנם אנשים שיקריבו צרכים פיזיולוגיים בשביל אידיאלים או הגשמה עצמית (למשל, שביתות רעב או אמנים עניים).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
