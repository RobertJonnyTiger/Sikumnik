"use client";

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Settings,
    Globe,
    ArrowRight,
    Info,
    Layers,
    BarChart3,
    Scale
} from 'lucide-react';

// --- Math Formatting Component (Refined) ---
const MathText = ({ children }: { children: string }) => (
    <span className="font-serif italic tracking-tight text-slate-900 bg-slate-100 px-1 py-0.5 rounded border border-slate-200 mx-0.5 text-[0.9em] whitespace-nowrap">
        {children}
    </span>
);

// --- Causal Chain Component ---
const CausalChain = ({ steps }: { steps: string[] }) => (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
        {steps.map((step, idx) => (
            <React.Fragment key={idx}>
                <span className="font-medium">{step}</span>
                {idx < steps.length - 1 && <ArrowLeftIcon size={14} className="text-slate-300" />}
            </React.Fragment>
        ))}
    </div>
);

const ArrowLeftIcon = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

// --- Table Section Component ---
const TableSection = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <Icon size={18} className="text-slate-400" />
            <h3 className="font-bold text-slate-800 tracking-tight uppercase text-xs">{title}</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
                <thead>
                    <tr className="bg-slate-50/30 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <th className="px-6 py-4">האירוע / הגורם</th>
                        <th className="px-6 py-4">השתלשלות תהליכים</th>
                        <th className="px-6 py-4 w-32">השפעה על <MathText>P</MathText></th>
                        <th className="px-6 py-4 w-32">השפעה על <MathText>Q</MathText></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);

const TableRow = ({ label, process, pEffect, qEffect }: { label: string, process: string[], pEffect: string, qEffect: string }) => (
    <tr className="hover:bg-slate-50/50 transition-colors group">
        <td className="px-6 py-5 align-top">
            <span className="font-bold text-slate-900 block mb-1">{label}</span>
        </td>
        <td className="px-6 py-5 align-top">
            <CausalChain steps={process} />
        </td>
        <td className="px-6 py-5 align-top">
            <div className={`flex items-center gap-1.5 font-bold ${pEffect === 'עלייה' ? 'text-slate-900' : 'text-slate-500'}`}>
                {pEffect === 'עלייה' ? <TrendingUp size={14} className="text-emerald-500" /> : pEffect === 'עלייה חדה' || pEffect === 'עלייה קלה' ? <TrendingUp size={14} className="text-emerald-500" /> : pEffect === 'ללא שינוי' ? <span className="text-slate-400">-</span> : <TrendingDown size={14} className="text-rose-500" />}
                {pEffect}
            </div>
        </td>
        <td className="px-6 py-5 align-top">
            <div className={`flex items-center gap-1.5 font-bold ${qEffect === 'עלייה' ? 'text-slate-900' : 'text-slate-500'}`}>
                {qEffect.includes('עלייה') ? <TrendingUp size={14} className="text-emerald-500" /> : qEffect === 'ללא שינוי' ? <span className="text-slate-400">-</span> : <TrendingDown size={14} className="text-rose-500" />}
                {qEffect}
            </div>
        </td>
    </tr>
);

export default function MarketEquilibriumMaster() {
    return (
        <div className="w-full font-sans antialiased text-slate-900 selection:bg-slate-200 my-8" dir="rtl">
            <div className="w-full space-y-12">

                {/* Header Section */}
                <div className="border-r-2 border-slate-900 pr-6 mb-12">
                    <h2 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">אנליזת שיווי משקל בשוק תחרותי</h2>
                    <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
                        ריכוז מפות התהליכים והשינויים בשוק תחרותי. מבוסס על מודל הביקוש וההיצע, כולל התערבות ממשלתית וסחר חוץ.
                    </p>
                </div>

                {/* Level 1: Basic Market Shifts */}
                <TableSection title="רמה 1: כוחות שוק בסיסיים" icon={Layers}>
                    <TableRow
                        label="עלייה בביקוש (למשל: עלייה בהכנסה)"
                        process={["ביקוש עולה (D↑)", "עודף ביקוש במחיר הישן", "לחץ לעליית מחיר", "היצרנים מגדילים כמות מוצעת"]}
                        pEffect="עלייה"
                        qEffect="עלייה"
                    />
                    <TableRow
                        label="ירידה בהיצע (למשל: מחיר גורם ייצור עלה)"
                        process={["עלות שולית עולה (MC↑)", "היצע קטן (S↓)", "עודף ביקוש במחיר הישן", "P עולה, כמות מבוקשת יורדת"]}
                        pEffect="עלייה"
                        qEffect="ירידה"
                    />
                    <TableRow
                        label="שיפור טכנולוגי"
                        process={["עלות שולית יורדת (MC↓)", "היצע גדל (S↑)", "עודף היצע במחיר הישן", "P יורד, כמות מבוקשת עולה"]}
                        pEffect="ירידה"
                        qEffect="עלייה"
                    />
                </TableSection>

                {/* Level 2: Complex Elasticities & Aggregate Supply */}
                <TableSection title="רמה 2: גמישויות ומיזוגים" icon={BarChart3}>
                    <TableRow
                        label="היצע קשיח לחלוטין (נדל''ן לטווח קצר)"
                        process={["ביקוש עולה (D↑)", "כמות לא יכולה להשתנות", "כל ההשפעה הולכת למחיר"]}
                        pEffect="עלייה חדה"
                        qEffect="ללא שינוי"
                    />
                    <TableRow
                        label="ביקוש גמיש מאוד (מוצרי מותרות)"
                        process={["היצע קטן (S↓)", "P עולה מעט", "הצרכנים מוותרים מהר על הכמות", "Q יורד משמעותית"]}
                        pEffect="עלייה קלה"
                        qEffect="ירידה חדה"
                    />
                    <TableRow
                        label="צירוף היצעים (מיזוג יצרנים)"
                        process={["חיבור כמותי (Σqi)", "היצע מצרפי גדל ימינה", "במחיר נתון הכמות בשוק עולה"]}
                        pEffect="ירידה"
                        qEffect="עלייה"
                    />
                </TableSection>

                {/* Level 3: Government Intervention */}
                <TableSection title="רמה 3: התערבות ממשלתית" icon={Scale}>
                    <TableRow
                        label="הטלת מס על היצרן (T)"
                        process={["MC עולה בגובה המס", "S זז למעלה ב-T", "P לצרכן עולה", "P ליצרן (נטו) יורד", "נטל עודף נוצר"]}
                        pEffect="עלייה"
                        qEffect="ירידה"
                    />
                    <TableRow
                        label="סובסידיה ליצרן (S)"
                        process={["MC יורד בגובה הסובסידיה", "S זז למטה", "P לצרכן יורד", "P ליצרן (ברוטו) עולה", "Q גדל"]}
                        pEffect="ירידה"
                        qEffect="עלייה"
                    />
                    <TableRow
                        label="מחיר מקסימום (Pmax < E)"
                        process={["מחיר נמוך משיווי משקל", "עודף ביקוש כרוני", "יווצרות שוק שחור / תורים", "Q קטן ל-Qs"]}
                        pEffect="ירידה (כפויה)"
                        qEffect="ירידה"
                    />
                </TableSection>

                {/* Level 4: International Trade */}
                <TableSection title="רמה 4: סחר בינלאומי" icon={Globe}>
                    <TableRow
                        label="פתיחת שוק לייבוא"
                        process={["מחיר עולמי נמוך ממקומי", "היצע עולמי גמיש לחלוטין", "P יורד ל-Pw", "ייצור מקומי קטן", "צריכה מקומית גדלה"]}
                        pEffect="ירידה"
                        qEffect="עלייה (ייבוא)"
                    />
                    <TableRow
                        label="הטלת מכס על ייבוא"
                        process={["מחיר אפקטיבי עולה (Pw+t)", "ייבוא קטן", "ייצור מקומי גדל", "צריכה מקומית קטנה", "הכנסות לממשלה"]}
                        pEffect="עלייה"
                        qEffect="ירידה"
                    />
                    <TableRow
                        label="פתיחת שוק לייצוא"
                        process={["מחיר עולמי גבוה ממקומי", "P עולה ל-Pw", "ייצור מקומי גדל", "צריכה מקומית קטנה", "העודף מיוצא"]}
                        pEffect="עלייה"
                        qEffect="עלייה (ייצור)"
                    />
                </TableSection>

                {/* Legend / Tip */}
                <div className="bg-slate-900 text-white p-6 rounded-xl flex items-start gap-4">
                    <div className="bg-slate-800 p-2.5 rounded border border-slate-700 shrink-0">
                        <Info className="text-slate-400" size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-base mb-1.5 italic">כלל אצבע לפתרון מבחנים:</h4>
                        <ul className="space-y-1.5 text-slate-300 text-sm list-disc pr-4">
                            <li>בכל שינוי, זהה קודם את העקומה שזזה (ביקוש או היצע).</li>
                            <li>שרטט את עודף הביקוש או ההיצע שנוצר ב<strong>מחיר הישן</strong> – זה יגיד לך לאן המחיר חייב לזוז.</li>
                            <li>בסחר חוץ, השוק המקומי תמיד &quot;מתיישר&quot; למחיר העולמי אם הוא קטן מספיק.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
