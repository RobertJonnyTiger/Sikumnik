"use client";

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Settings,
    Globe,
    Info,
    Layers,
    BarChart3,
    Scale,
    HelpCircle,
    Percent,
    Briefcase,
    Users,
    Wrench
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// --- True LaTeX Formatter ---
const MathText = ({ children, className = "", asSpan = false }: { children: string; className?: string; asSpan?: boolean }) => (
    <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
            p: ({ node: _node, ...props }) => asSpan ? <span className={className} {...props} /> : <p className={className} {...props} />
        }}
    >
        {children}
    </ReactMarkdown>
);

// --- Component Helpers ---
const CausalChain = ({ steps }: { steps: string[] }) => (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
        {steps.map((step, idx) => (
            <React.Fragment key={idx}>
                <MathText asSpan className="font-medium">{step}</MathText>
                {idx < steps.length - 1 && <ArrowLeftIcon size={14} className="text-slate-700" />}
            </React.Fragment>
        ))}
    </div>
);

const ArrowLeftIcon = ({ size, className }: { size: number, className: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

// --- TR / TE Formatting Components ---
const TREffectUp = ({ text, math }: { text: string, math: string }) => (
    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
        <TrendingUp size={14} className="text-emerald-500 shrink-0" />
        <MathText asSpan>{text}</MathText>
        <div className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mx-0.5 whitespace-nowrap flex items-center gap-1.5" dir="ltr">
            <MathText asSpan className="font-serif text-[1.1em]">{`$${math}$`}</MathText> <span className="text-[0.9em]">&uarr;</span>
        </div>
    </div>
);

const TREffectDown = ({ text, math }: { text: string, math: string }) => (
    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
        <TrendingDown size={14} className="text-rose-500 shrink-0" />
        <MathText asSpan>{text}</MathText>
        <div className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 mx-0.5 whitespace-nowrap flex items-center gap-1.5" dir="ltr">
            <MathText asSpan className="font-serif text-[1.1em]">{`$${math}$`}</MathText> <span className="text-[0.9em]">&darr;</span>
        </div>
    </div>
);

const TREffectDepends = ({ text, math }: { text: string, math: string }) => (
    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
        <HelpCircle size={14} className="text-amber-500 shrink-0" />
        <MathText asSpan>{text}</MathText>
        {math && (
            <div className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 mx-0.5 whitespace-nowrap flex items-center gap-1.5" dir="ltr">
                <MathText asSpan className="font-serif text-[1.1em]">{`$${math}$`}</MathText>
            </div>
        )}
    </div>
);

const TREffectGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col gap-2">
        {children}
    </div>
);

// --- Table Definition ---
const TableSection = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <Icon size={18} className="text-slate-400" />
            <h3 className="font-bold text-slate-800 tracking-tight uppercase text-xs">{title}</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
                <thead>
                    <tr className="bg-slate-100/50 text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-200">
                        <th className="px-6 py-4 min-w-[180px]">האירוע / הגורם</th>
                        <th className="px-6 py-4 min-w-[280px]">השתלשלות תהליכים</th>
                        <th className="px-3 py-4 w-24 whitespace-nowrap"><MathText asSpan>השפעה על $P$</MathText></th>
                        <th className="px-3 py-4 w-24 whitespace-nowrap"><MathText asSpan>השפעה על $Q$</MathText></th>
                        <th className="px-6 py-4 min-w-[220px]">פדיון/הוצאות (<MathText asSpan>$TR/TE$</MathText>)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);

const TableSubHeader = ({ title, colSpan = 5 }: { title: string, colSpan?: number }) => (
    <tr className="bg-slate-100/30">
        <td colSpan={colSpan} className="px-6 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-widest border-y border-slate-100/50 bg-slate-50/50">
            {title}
        </td>
    </tr>
);

const TableRow = ({ label, process, pEffect, qEffect, trEffect }: { label: string, process: string[], pEffect: string, qEffect: string, trEffect: React.ReactNode }) => (
    <tr className="hover:bg-slate-50/50 transition-colors group">
        <td className="px-6 py-5 align-top">
            <MathText asSpan className="font-bold text-slate-900 block mb-1">{label}</MathText>
        </td>
        <td className="px-6 py-5 align-top">
            <CausalChain steps={process} />
        </td>
        <td className="px-3 py-5 align-top">
            <div className={`flex items-center gap-1.5 font-bold whitespace-nowrap ${pEffect.includes('עלייה') ? 'text-slate-900' : 'text-slate-500'}`}>
                {pEffect.includes('עלייה') ? <TrendingUp size={14} className="text-emerald-500 shrink-0" /> : pEffect.includes('ללא שינוי') ? <span className="text-slate-400 shrink-0">-</span> : <TrendingDown size={14} className="text-rose-500 shrink-0" />}
                {pEffect}
            </div>
        </td>
        <td className="px-3 py-5 align-top">
            <div className={`flex items-center gap-1.5 font-bold whitespace-nowrap ${qEffect.includes('עלייה') ? 'text-slate-900' : 'text-slate-500'}`}>
                {qEffect.includes('עלייה') ? <TrendingUp size={14} className="text-emerald-500 shrink-0" /> : qEffect.includes('ללא שינוי') ? <span className="text-slate-400 shrink-0">-</span> : <TrendingDown size={14} className="text-rose-500 shrink-0" />}
                {qEffect}
            </div>
        </td>
        <td className="px-6 py-5 align-top">
            {trEffect}
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
                        עמודת ה־<MathText asSpan>$TR$</MathText> מציגה את השפעת השינוי על הפדיון הכולל של היצרן (Total Revenue) או ההוצאות הכוללות של הצרכן (Total Expenses).
                    </p>
                </div>

                {/* Level 1: Basic Market Shifts */}
                <TableSection title="רמה 1: כוחות שוק בסיסיים" icon={Layers}>
                    <TableSubHeader title="שינויים בביקוש" />
                    <TableRow
                        label="עלייה בביקוש (זז ימינה)"
                        process={["ביקוש לגורמי ייצור עולה ($D \\uparrow$)", "עודף ביקוש במחיר הישן", "לחץ לעליית מחיר", "היצרנים מגדילים כמות מוצעת ($Q_s \\uparrow$)"]}
                        pEffect="עלייה"
                        qEffect="עלייה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectUp text="היצע קשיח: פדיון עולה עמוקות" math="TR" />
                                <TREffectUp text="היצע גמיש: פדיון עולה במתינות" math="TR" />
                            </TREffectGroup>
                        }
                    />
                    <TableRow
                        label="ירידה בביקוש (זז שמאלה)"
                        process={["ביקוש קטן ($D \\downarrow$)", "עודף היצע במחיר הישן", "$P$ יורד, $Q$ יורד"]}
                        pEffect="ירידה"
                        qEffect="ירידה"
                        trEffect={<TREffectDown text="קריסת פדיון ליצרן" math="TR" />}
                    />
                    <TableSubHeader title="שינויים בהיצע" />
                    <TableRow
                        label="ירידה בהיצע (התייקרות גורמי ייצור)"
                        process={["עלות שולית עולה ($MC \\uparrow$)", "היצע קטן ($S \\downarrow$)", "עודף ביקוש במחיר הישן", "$P$ עולה, כמות מבוקשת ($Q_d$) יורדת"]}
                        pEffect="עלייה"
                        qEffect="ירידה"
                        trEffect={<TREffectDepends text="תלוי בגמישות הביקוש" math="|E_d|" />}
                    />
                    <TableRow
                        label="שיפור טכנולוגי"
                        process={["עלות שולית יורדת ($MC \\downarrow$)", "היצע גדל ($S \\uparrow$)", "עודף היצע במחיר הישן", "$P$ יורד, כמות מבוקשת ($Q_d$) עולה"]}
                        pEffect="ירידה"
                        qEffect="עלייה"
                        trEffect={<TREffectDepends text="תלוי בגמישות הביקוש" math="|E_d|" />}
                    />
                    <TableSubHeader title="שינויים משולבים" />
                    <TableRow
                        label="עלייה בהיצע וגם עלייה בביקוש (בגדלים שונים)"
                        process={["$S$ זזה ימינה", "$D$ זזה ימינה", "$Q$ בהכרח עולה", "המחיר תלוי בגודל היחסי (אם $\\Delta D > \\Delta S \\leftarrow P \\uparrow$)"]}
                        pEffect="תלוי גודל יחסי"
                        qEffect="עלייה"
                        trEffect={<TREffectDepends text="תלוי מי השתנה יותר" math="TR" />}
                    />
                    <TableRow
                        label="עלייה בהיצע יחד עם ירידה בביקוש"
                        process={["$S$ זזה ימינה", "$D$ זזה שמאלה", "$P$ בהכרח יורד", "הכמות אינה ניתנת לחיזוי ללא נתונים"]}
                        pEffect="ירידה"
                        qEffect="לא ידוע"
                        trEffect={<TREffectDepends text="תלוי בגודל השינויים" math="TR" />}
                    />
                </TableSection>

                {/* Level 2: Complex Elasticities & Aggregate Supply */}
                <TableSection title="רמה 2: גמישויות ומיזוגים מיוחדים" icon={BarChart3}>
                    <TableRow
                        label="היצע קשיח לחלוטין (נדל&quot;ן לטווח קצר)"
                        process={["ביקוש עולה ($D \\uparrow$)", "כמות לא יכולה להשתנות ($Q$ קבוע)", "כל ההשפעה הולכת למחיר ($P$)"]}
                        pEffect="עלייה חדה"
                        qEffect="ללא שינוי"
                        trEffect={<TREffectUp text="המפיצים גורפים פדיון גבוה" math="TR" />}
                    />
                    <TableRow
                        label="ביקוש גמיש מאוד (מוצרי מותרות)"
                        process={["היצע קטן ($S \\downarrow$)", "$P$ עולה מעט", "הצרכנים מוותרים מהר על הכמות", "$Q$ יורד משמעותית"]}
                        pEffect="עלייה קלה"
                        qEffect="ירידה חדה"
                        trEffect={<TREffectDown text="קריסת פדיון ליצרן" math="TR" />}
                    />
                    <TableRow
                        label="צירוף היצעים (מיזוג יצרנים)"
                        process={["חיבור כמותי ($\\sum Q_i$)", "היצע מצרפי גדל ימינה", "במחיר נתון הכמות בשוק עולה ($Q \\uparrow$)"]}
                        pEffect="ירידה"
                        qEffect="עלייה"
                        trEffect={<TREffectDepends text="תלוי בגמישות הביקוש" math="|E_d|" />}
                    />
                </TableSection>

                {/* Level 3: Government Intervention */}
                <TableSection title="רמה 3: התערבות ממשלתית (מס וסובסידיה)" icon={Scale}>
                    <TableSubHeader title="מיסים על יחידה" />
                    <TableRow
                        label="הטלת מס על היצרן מול נטל מס על צרכן"
                        process={["מבחינה כלכלית התוצאה זהה!", "$S$ זזה למעלה או $D$ זזה למטה בגובה המס $t$", "$P$ לצרכן עולה", "$P$ ליצרן (נטו) יורד", "נטל עודף נוצר וחלק המס מתחלק לפי גמישויות"]}
                        pEffect="עלייה (צרכן)"
                        qEffect="ירידה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectDepends text="הוצאות צרכנים: תלוי גמישות" math="|E_d|" />
                                <TREffectDown text="פדיון יצרנים (נטו) יורד" math="TR_{net}" />
                            </TREffectGroup>
                        }
                    />
                    <TableRow
                        label="העלאת מס קיים (כשהביקוש קשיח $|E_d| < 1$)"
                        process={["מס יצרן עולה ($t \\uparrow$)", "היצע זז עליונה", "הצרכנים 'שבויים' אז $Q$ כמעט לא משתנה", "תקבולי הממשלה ממיסים גדלים! ($t \\times Q$)"]}
                        pEffect="עלייה חדה"
                        qEffect="ירידה קלה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectUp text="הוצאות הצרכנים עולות" math="TE" />
                                <TREffectUp text="תקבולי הממשלה ממיסים מזנקים" math="Tax" />
                            </TREffectGroup>
                        }
                    />
                    <TableSubHeader title="סובסידיות ומחירי מקסימום" />
                    <TableRow
                        label="סובסידיה ליצרן ($s$)"
                        process={["$MC$ יורד בגובה הסובסידיה", "$S$ זזה ימינה/למטה ב-$s$", "$P$ לצרכן יורד", "$P$ ליצרן (ברוטו) עולה", "$Q$ גדל"]}
                        pEffect="ירידה"
                        qEffect="עלייה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectUp text="פדיון יצרנים (ברוטו) עולה" math="TR_{bruto}" />
                                <TREffectDepends text="הוצאות הצרכנים: תלוי גמישות" math="|E_d|" />
                            </TREffectGroup>
                        }
                    />
                    <TableRow
                        label="מחיר מקסימום ($P_{max} < P^*$)"
                        process={["מחיר נמוך משיווי משקל", "עודף ביקוש כרוני", "יווצרות שוק שחור / תורים", "$Q$ קטן ל-$Q_s$"]}
                        pEffect="ירידה (כפויה)"
                        qEffect="ירידה"
                        trEffect={<TREffectDown text="הפדיון וההוצאות בשוק קורסים חוקית" math="TR=TE" />}
                    />
                </TableSection>

                {/* Level 4: International Trade */}
                <TableSection title="רמה 4: סחר בינלאומי" icon={Globe}>
                    <TableSubHeader title="שוק פתוח לייבוא" />
                    <TableRow
                        label="עלייה במחיר עולמי ($P_w \\uparrow$) או פיחות במטבע ($E \\uparrow$)"
                        process={["המחיר בשקלים ($P_w \\times E$) עולה", "מחיר מקומי עולה ל-$P_w$ החדש", "ייצור מקומי $Q_s$ עולה", "צריכה מקומית $Q_d$ יורדת", "הייבוא קטן ($Q_d - Q_s$)"]}
                        pEffect="עלייה"
                        qEffect="ירידה (בייבוא)"
                        trEffect={<TREffectUp text="פדיון יצרני המקור המקומי עולה" math="TR_{loc}" />}
                    />
                    <TableRow
                        label="הטלת מכס על ייבוא ($t$)"
                        process={["מחיר אפקטיבי עולה לצרכן המקומי ($P_w+t$)", "ייצור מקומי $Q_s$ גדל", "צריכה מקומית $Q_d$ קטנה", "הממשלה גובה תקבולי מכס"]}
                        pEffect="עלייה"
                        qEffect="ירידה (סה&quot;כ צריכה)"
                        trEffect={
                            <TREffectGroup>
                                <TREffectUp text="פדיון יצרני המקור המקומי עולה" math="TR_{loc}" />
                                <TREffectUp text="תקבולי ממשלה נכנסים" math="Tax" />
                            </TREffectGroup>
                        }
                    />
                    <TableRow
                        label="תיסוף שער המטבע ($E \\downarrow$)"
                        process={["הדולר 'נוזל', $E$ יורד", "המחיר המקומי מעוגן ל-$P_w$ בשקלים לכן יורד", "ייצור מקומי קטן $Q_s \\downarrow$", "צריכה מקומית עולה $Q_d \\uparrow$", "הייבוא מתרחב!"]}
                        pEffect="ירידה"
                        qEffect="עלייה"
                        trEffect={<TREffectDown text="פדיון יצרן מקומי נשחק" math="TR_{loc}" />}
                    />
                    <TableRow
                        label="עלייה בהיצע המקומי ($S \\uparrow$)"
                        process={["$S$ זזה ימינה", "המחיר המקומי מעוגן ל-$P_w$ ולכן נשאר קבוע!", "צריכה $Q_d$ בסך הכל נותרת ללא שינוי", "$Q_s$ עולה מתוך הסך הכל &larr; הייבוא יורד"]}
                        pEffect="ללא שינוי"
                        qEffect="יורד (רק הייבוא)"
                        trEffect={<TREffectUp text="פדיון יצרנים מקומיים עולה" math="TR_{loc}" />}
                    />
                    <TableSubHeader title="שוק פתוח לייצוא" />
                    <TableRow
                        label="פתיחת שוק לייצוא או עלייה ב-$P_w$"
                        process={["מחיר עולמי גבוה ממקומי", "$P$ עולה ל-$P_w$", "ייצור מקומי גדל ($Q_s \\uparrow$)", "צריכה מקומית קטנה ($Q_d \\downarrow$)", "הייצוא גדל ($Q_s - Q_d$)"]}
                        pEffect="עלייה"
                        qEffect="עלייה (ייצור)"
                        trEffect={<TREffectUp text="פדיון יצרנים נוסק בזכות הייצוא" math="TR" />}
                    />
                    <TableRow
                        label="עלייה בביקוש המקומי ($D \\uparrow$)"
                        process={["$D$ זזה ימינה", "המחיר המקומי מעוגן ל-$P_w$ ולכן קבוע!", "צריכה $Q_d$ עולה", "ייצור $Q_s$ נותר ללא שינוי", "הייצוא בהכרח יורד ($Q_s - Q_d$)"]}
                        pEffect="ללא שינוי"
                        qEffect="עלייה (צריכה)"
                        trEffect={<TREffectDepends text="פדיון סה&quot;כ קבוע, אך מחולק שונה" math="TR" />}
                    />
                </TableSection>

                {/* Level 5: Elasticity and Price Change */}
                <TableSection title="רמה 5: גמישות והשפעות פדיון/הוצאות" icon={Percent}>
                    <TableSubHeader title="עלייה במחיר השוק ($P \\uparrow$)" />
                    <TableRow
                        label="ביקוש קשיח ($|E_d| < 1$)"
                        process={["אחוז הירידה בכמות קטן מאחוז העלייה במחיר", "מכיוון שהצרכנים כמעט לא מקטינים כמות, ההוצאה הכוללת שלהם צומחת חזק"]}
                        pEffect="עלייה"
                        qEffect="ירידה חלשה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectUp text="הוצאות הצרכן מטפסות" math="TE" />
                                <TREffectUp text="פדיון היצרן נוסק" math="TR" />
                            </TREffectGroup>
                        }
                    />
                    <TableRow
                        label="ביקוש יחידתי ($|E_d| = 1$)"
                        process={["אחוז הירידה בכמות זהה לאחוז העלייה במחיר", "האפקטים מקזזים זה את זה בדיוק מוחלט"]}
                        pEffect="עלייה"
                        qEffect="ירידה זהה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectDepends text="ללא שינוי בהוצאות" math="TE" />
                                <TREffectDepends text="ללא שינוי בפדיון" math="TR" />
                            </TREffectGroup>
                        }
                    />
                    <TableRow
                        label="ביקוש גמיש ($|E_d| > 1$)"
                        process={["אחוז הירידה בכמות אדיר לעומת העלייה הקלה במחיר", "הצרכנים 'בורחים' מהמוצר מהר יותר מהעלייה במחירו"]}
                        pEffect="עלייה"
                        qEffect="ירידה חדה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectDown text="הוצאות הצרכן מתרסקות" math="TE" />
                                <TREffectDown text="פדיון היצרן צונח" math="TR" />
                            </TREffectGroup>
                        }
                    />
                    <TableSubHeader title="ירידה במחיר השוק ($P \\downarrow$)" />
                    <TableRow
                        label="ביקוש קשיח ($|E_d| < 1$)"
                        process={["המחיר צונח, אבל הצרכנים קונים רק מעט יותר", "הירידה במחיר מושכת למטה חזק יותר מהעלייה הקלה בכמות"]}
                        pEffect="ירידה"
                        qEffect="עלייה חלשה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectDown text="הוצאות הצרכן יורדות" math="TE" />
                                <TREffectDown text="פדיון היצרן נשחק" math="TR" />
                            </TREffectGroup>
                        }
                    />
                    <TableRow
                        label="ביקוש גמיש ($|E_d| > 1$)"
                        process={["המחיר יורד מעט, אך הצרכנים נוהרים בהמוניהם", "התפרצות הכמות גוברת על הירידה במחיר ומזניקה רווחים"]}
                        pEffect="ירידה"
                        qEffect="עלייה חזקה"
                        trEffect={
                            <TREffectGroup>
                                <TREffectUp text="הוצאות הצרכן מטפסות" math="TE" />
                                <TREffectUp text="פדיון היצרן טס מעלה" math="TR" />
                            </TREffectGroup>
                        }
                    />
                </TableSection>

                {/* Level 6: Related Products */}
                <TableSection title="רמה 6: מוצרים קשורים (קרוס) והכנסה" icon={Users}>
                    <TableSubHeader title="שינוי במחיר מוצר קשור ($P_y$)" />
                    <TableRow
                        label="התייקרות מוצר תחליפי ($P_y \\uparrow$)"
                        process={["המוצר התחליפי $Y$ מתייקר", "תהליך נדידת צרכנים: הביקוש ל-$X$ עולה ($D_x \\uparrow$)", "שיווי משקל חדש בשוק $X$: מחירו וכמותו עולים"]}
                        pEffect="עלייה"
                        qEffect="עלייה"
                        trEffect={<TREffectUp text="פדיון יצרני $X$ עולה" math="TR_x" />}
                    />
                    <TableRow
                        label="התייקרות מוצר משלים ($P_y \\uparrow$)"
                        process={["המוצר המשלים $Y$ מתייקר", "הצרכנים קונים פחות מ-$Y$ ובהתאמה פחות מהמשלים $X$", "הביקוש ל-$X$ יורד ($D_x \\downarrow$)", "מחירו וכמותו של $X$ במגמת ירידה"]}
                        pEffect="ירידה"
                        qEffect="ירידה"
                        trEffect={<TREffectDown text="פדיון יצרני $X$ נפגע" math="TR_x" />}
                    />
                    <TableSubHeader title="זעזועי הכנסה ($I$)" />
                    <TableRow
                        label="עלייה בהכנסה למוצר נורמלי ($I \\uparrow$)"
                        process={["יש יותר כסף בכיס הצרכנים", "הביקוש למוצר הנורמלי מזנק ($D_x \\uparrow$)", "לחץ מחירים כלפי מעלה"]}
                        pEffect="עלייה"
                        qEffect="עלייה"
                        trEffect={<TREffectUp text="תור הזהב של היצרנים" math="TR" />}
                    />
                    <TableRow
                        label="עלייה בהכנסה למוצר נחות ($I \\uparrow$)"
                        process={["יש יותר כסף בכיס הצרכנים", "הצרכנים נוטשים את המוצר מחוסר ברירה (למשל: לחם פשוט) לטובת חלופות איכותיות", "הביקוש נופל ($D_x \\downarrow$)"]}
                        pEffect="ירידה"
                        qEffect="ירידה"
                        trEffect={<TREffectDown text="מיתון פדיון בענף הנחות" math="TR" />}
                    />
                </TableSection>

                {/* Level 7: Firm Decisions */}
                <TableSection title="רמה 7: החלטות ייצור של הפירמה התחרותית" icon={Briefcase}>
                    <TableSubHeader title="טווח קצר לעומת ארוך" />
                    <TableRow
                        label="המחיר מכסה עלות ממוצעת ($P \\ge \\min ATC$)"
                        process={["הרווח הנקי $\\pi$ חיובי (או אפס)", "הפירמה בטוח מכסה את כל ההוצאות הקבועות ($FC$) והמשתנות ($VC$)", "הפירמה תייצר תוך מקסום רווח בנקודה $P=MC$"]}
                        pEffect="נתון ($P$ השוק)"
                        qEffect="מייצרת ב-$P=MC$"
                        trEffect={<TREffectUp text="רווח כלכלי חיובי (או תקין)" math="\\pi \\ge 0" />}
                    />
                    <TableRow
                        label="המחיר נופל בין מינימום משתנה לסך הכל ($ATC > P \\ge \\min AVC$)"
                        process={["הרווח הנקי שלילי (הפסד חשבונאי)", "אבל הפירמה מכסה את כל ההוצאות השוטפות ונשאר כדי לצמצם הפסדי ה-$FC$", "טווח קצר: מייצרת במטרה למזער נזק. טווח ארוך: תבריח את עסקיה מהענף"]}
                        pEffect="הפסד חלקי"
                        qEffect="מייצרת פחות"
                        trEffect={<TREffectDepends text="ממזערת הפסדים מתחת לקבועות" math="\\pi > -FC" />}
                    />
                    <TableRow
                        label="המחיר קורס מתחת למינימום המשתנה ($P < \\min AVC$)"
                        process={["הפגיעה הקשה מכול (Shutdown Point)", "הפירמה אפילו לא מכסה את חומרי הגלם וחשבון החשמל היומי", "כל יחידה שנוצרת מעמיקה את הבור. מכבים מכונות ומפטרים זמנית!"]}
                        pEffect="קריסה מלאה"
                        qEffect="0 יחידות מיוצרות"
                        trEffect={<TREffectDown text="סופגת את מלוא ההוצאה הקבועה" math="\\pi = -FC" />}
                    />
                </TableSection>

                {/* Level 8: Factor Markets */}
                <TableSection title="רמה 8: שוק גורמי הייצור (העבודה - $L$)" icon={Wrench}>
                    <TableRow
                        label="המוצר הסופי המיוצר מתייקר בחוץ ($P_x \\uparrow$)"
                        process={["מחירו של המוצר עליו העובדים שוקדים זינק", "בהתאמה, שווי ערך התפוקה השולית ($VMP_L = P_x \\times MP_L$) טיפס!", "המעסיק רודף אחרי עובדים מאושרים: הביקוש לעבודה זז הרחק ימינה ($D_L \\uparrow$)"]}
                        pEffect="שכר מטפס ($W \\uparrow$)"
                        qEffect="תעסוקה מזנקת ($L \\uparrow$)"
                        trEffect={<TREffectUp text="בום גיוסים המוניים בשוק העבודה" math="L_{emp}" />}
                    />
                    <TableRow
                        label="שיפור טכנולוגי (רובוט סייען לעובד) שמעלה תפוקה שולית ($MP_L \\uparrow$)"
                        process={["כל עובד קורע את פס הייצור, ומייצר כפול יחידות מבעבר", "ערך התפוקה הכספי שלו למעסיק ($VMP_L$) מוכפל אוטומטית", "במלחמת תחרות על העובד הדגול, הביקוש לו ($D_L$) מזנק מעלה"]}
                        pEffect="מנוף שכר אדיר ($W \\uparrow$)"
                        qEffect="התרחבות מהירה ($L \\uparrow$)"
                        trEffect={<TREffectUp text="פדיון ותוצר לעובד ממריא לחלל" math="TR_{emp}" />}
                    />
                    <TableRow
                        label="התארגנות ועד עובדים דורשת תוספת שכר רוחבית ($W \\uparrow$)"
                        process={["עלות העסקת כל עובד ואף החדש ביותר טיפסה ללא קשר לביצועיו", "המעסיק משווה בכוח את השכר החדש לערך התפוקה השולית הנותר ($W = VMP_L$)", "הפועלים שתפוקת השוליים שלהם נמוכה מודחים בבעיטה מחוץ לארגון"]}
                        pEffect="שכר מטפס מלאכותית"
                        qEffect="פיטורים המוניים ($L \\downarrow$)"
                        trEffect={<TREffectDown text="אוטומציה, צמצומים והשמדת תעסוקה" math="L_{emp}" />}
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
                            <li>במקרים של מיסים, זכור שיש &quot;טריז&quot;: <strong>המחיר לצרכן</strong> ו<strong>המחיר ליצרן</strong> נפרדים לחלוטין.</li>
                            <li>שרטט את עודף הביקוש או ההיצע שנוצר ב<strong>מחיר הישן</strong> – זה יגיד לך לאן המחיר חייב לזוז.</li>
                            <li>בסחר חוץ, השוק המקומי תמיד &quot;מתיישר&quot; למחיר העולמי אם הוא קטן מספיק.</li>
                        </ul>
                    </div>
                </div>

                {/* Attack Protocol: International Trade */}
                <div className="bg-slate-900 text-slate-200 rounded-2xl overflow-hidden border border-slate-800 shadow-xl mt-12">
                    <div className="border-b border-slate-700/50 bg-slate-800/50 p-6 flex items-center gap-3">
                        <span className="text-xl">🚢</span>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">פרוטוקול תקיפה: סחר בינלאומי (ייבוא, ייצוא ומכס)</h3>
                            <p className="text-slate-400 text-sm mt-1">פרוטוקול זה משמש לחישוב כמויות ורווחה במשק פתוח תחת התערבות ממשלתית.</p>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-10">
                        {/* Step 1 */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🔍</span>
                                <h4 className="text-lg font-bold text-indigo-300">שלב 1: קביעת מחיר השוק המקומי (<MathText asSpan className="text-indigo-200">{"$P_{local}$"}</MathText>)</h4>
                            </div>
                            <p className="text-slate-300 font-medium pb-2 border-b border-slate-800">במשק פתוח, המחיר נקבע ע&quot;י המחיר העולמי (<MathText asSpan className="text-slate-300">$P_w$</MathText>) ושער החליפין (<MathText asSpan className="text-slate-300">$E$</MathText>):</p>
                            <ol className="list-decimal list-inside space-y-4 text-slate-300 pr-2">
                                <li>
                                    <span className="font-bold text-white">מחיר עולמי בשקלים: </span>
                                    <MathText asSpan className="text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-800/50">{"$P_{world} = P_w \\times E$"}</MathText>.
                                </li>
                                <li className="space-y-2">
                                    <span className="font-bold text-white">השפעת התערבות (מכס/מס):</span>
                                    <ul className="list-disc list-inside space-y-2 pr-6 text-slate-400">
                                        <li><strong className="text-rose-300">בייבוא:</strong> מכס (Tariff) של <MathText asSpan className="text-slate-300">$T$</MathText> שקלים &larr; המחיר המקומי עולה: <MathText asSpan className="text-rose-200 bg-rose-900/30 px-2 py-0.5 rounded border border-rose-800/50">{"$P_{local} = P_{world} + T$"}</MathText>.</li>
                                        <li><strong className="text-blue-300">בייצוא:</strong> מס על ייצוא של <MathText asSpan className="text-slate-300">$T$</MathText> שקלים &larr; המחיר ליצרן המקומי יורד: <MathText asSpan className="text-blue-200 bg-blue-900/30 px-2 py-0.5 rounded border border-blue-800/50">{"$P_{local} = P_{world} - T$"}</MathText>.</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">⚙️</span>
                                <h4 className="text-lg font-bold text-indigo-300">שלב 2: תהליך עבודה אופרטיבי (The Trade Algorithm)</h4>
                            </div>

                            <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 space-y-5">
                                <div>
                                    <h5 className="font-bold text-white mb-2 pb-1 border-b border-slate-700 inline-block">תחנה א&apos;: חישוב כמויות במצב מוצא (לפני המס)</h5>
                                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-sm mt-2 pr-2">
                                        <li>מצא את הכמות המבוקשת מקומית (<MathText asSpan className="text-slate-200">$Q_d$</MathText>) לפי <MathText asSpan className="text-slate-200">{"$P_{world}$"}</MathText>.</li>
                                        <li>מצא את הכמות המוצעת מקומית (<MathText asSpan className="text-slate-200">$Q_s$</MathText>) לפי <MathText asSpan className="text-slate-200">{"$P_{world}$"}</MathText>.</li>
                                        <li className="pt-2">
                                            <span className="font-bold text-white">הגדרת הסחר:</span>
                                            <ul className="list-disc list-inside space-y-1.5 pr-6 mt-1.5 text-slate-400">
                                                <li>אם <MathText asSpan className="text-slate-300">{"$Q_d > Q_s$"}</MathText> &larr; המשק <strong className="text-emerald-400">מייבא</strong>. כמות הייבוא: <MathText asSpan className="text-slate-300">{"$Q_d - Q_s$"}</MathText>.</li>
                                                <li>אם <MathText asSpan className="text-slate-300">{"$Q_s > Q_d$"}</MathText> &larr; המשק <strong className="text-blue-400">מייצא</strong>. כמות הייצוא: <MathText asSpan className="text-slate-300">{"$Q_s - Q_d$"}</MathText>.</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </div>

                                <div>
                                    <h5 className="font-bold text-white mb-2 pb-1 border-b border-slate-700 inline-block">תחנה ב&apos;: חישוב כמויות לאחר הטלת המס</h5>
                                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-sm mt-2 pr-2">
                                        <li>הצב את <MathText asSpan className="text-slate-200">{"$P_{local}$"}</MathText> החדש (עם המס) בביקוש לקבלת <MathText asSpan className="text-slate-200">{"$Q_{d, new}$"}</MathText>.</li>
                                        <li>הצב את <MathText asSpan className="text-slate-200">{"$P_{local}$"}</MathText> החדש (עם המס) בהיצע לקבלת <MathText asSpan className="text-slate-200">{"$Q_{s, new}$"}</MathText>.</li>
                                    </ol>
                                </div>

                                <div>
                                    <h5 className="font-bold text-white mb-2 pb-1 border-b border-slate-700 inline-block">תחנה ג&apos;: חישוב תוצאות המדיניות</h5>
                                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-sm mt-2 pr-2">
                                        <li><strong className="text-white">שינוי בכמות הסחר:</strong> (ייבוא חדש) פחות (ייבוא מקורי).</li>
                                        <li><strong className="text-white">תקבולי ממשלה:</strong> <MathText asSpan className="text-amber-300 bg-amber-900/20 px-1.5 py-0.5 rounded border border-amber-800/30">$Tax/Tariff \times New\ Trade\ Volume$</MathText>.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Cheatsheet Table */}
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg">📄</span>
                                <h4 className="text-lg font-bold text-rose-300 uppercase tracking-wider">CHEATSHEET: השפעות המכס על ייבוא (<MathText asSpan className="text-rose-200">$T \uparrow$</MathText>)</h4>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30">
                                <table className="w-full text-right text-sm">
                                    <thead className="bg-slate-800 text-slate-300">
                                        <tr>
                                            <th className="px-4 py-3 font-bold">המדד</th>
                                            <th className="px-4 py-3 font-bold w-32">כיוון השינוי</th>
                                            <th className="px-4 py-3 font-bold">הסבר</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50 text-slate-300">
                                        <tr className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-white">מחיר מקומי</td>
                                            <td className="px-4 py-3 text-rose-400 font-bold flex items-center gap-1.5">עולה &uarr;</td>
                                            <td className="px-4 py-3 text-slate-400">הצרכן משלם &quot;עולם + מכס&quot;.</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-white">צריכה מקומית (<MathText asSpan>$Q_d$</MathText>)</td>
                                            <td className="px-4 py-3 text-emerald-400 font-bold flex items-center gap-1.5">יורדת &darr;</td>
                                            <td className="px-4 py-3 text-slate-400">המחיר עולה, אנשים קונים פחות.</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-white">ייצור מקומי (<MathText asSpan>$Q_s$</MathText>)</td>
                                            <td className="px-4 py-3 text-rose-400 font-bold flex items-center gap-1.5">עולה &uarr;</td>
                                            <td className="px-4 py-3 text-slate-400">המחיר עולה, ליצרנים המקומיים כדאי ליצר יותר.</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-white">כמות הייבוא</td>
                                            <td className="px-4 py-3 text-emerald-400 font-bold flex items-center gap-0.5">יורדת &darr;&darr;</td>
                                            <td className="px-4 py-3 text-slate-400">&quot;לחץ&quot; משני הצדדים (פחות צריכה ויותר ייצור מקומי).</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-white">תקבולי ממשלה</td>
                                            <td className="px-4 py-3 text-amber-400 font-bold">חיוביים</td>
                                            <td className="px-4 py-3 text-slate-400">המכס נגבה רק על היחידות המיובאות בפועל.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
