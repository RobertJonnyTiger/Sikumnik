"use client";

import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Globe,
    Info,
    Layers,
    BarChart3,
    Scale,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    Minus,
    BookOpen,
    Zap,
    Filter,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// ─── Math renderer ───────────────────────────────────────────────────────────
const MathText = ({
    children,
    className = "",
    asSpan = false,
}: {
    children: string;
    className?: string;
    asSpan?: boolean;
}) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                p: ({ node, ...props }) => asSpan ? (
                    <span className={className} {...props} />
                ) : (
                    <p className={className} {...props} />
                ),
            }}
        >
            {children}
        </ReactMarkdown>
    );
};

// ─── Arrow icon ───────────────────────────────────────────────────────────────
const ArrowLeftIcon = ({ size, className }: { size: number; className: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

// ─── Causal chain ─────────────────────────────────────────────────────────────
const CausalChain = ({ steps }: { steps: string[] }) => (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-slate-600 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
        {steps.map((step, idx) => (
            <React.Fragment key={idx}>
                <MathText asSpan className="font-medium leading-snug">
                    {step}
                </MathText>
                {idx < steps.length - 1 && (
                    <ArrowLeftIcon size={13} className="text-slate-400 shrink-0" />
                )}
            </React.Fragment>
        ))}
    </div>
);

// ─── Effect badges ────────────────────────────────────────────────────────────
type EffectType = "up" | "down" | "neutral" | "depends";

const EffectBadge = ({ type, label }: { type: EffectType; label?: string }) => {
    const configs = {
        up: {
            icon: <TrendingUp size={13} />,
            text: label ?? "עלייה",
            cls: "text-emerald-700 bg-emerald-50 border-emerald-200",
        },
        down: {
            icon: <TrendingDown size={13} />,
            text: label ?? "ירידה",
            cls: "text-rose-700 bg-rose-50 border-rose-200",
        },
        neutral: {
            icon: <Minus size={13} />,
            text: label ?? "ללא שינוי",
            cls: "text-slate-500 bg-slate-50 border-slate-200",
        },
        depends: {
            icon: <HelpCircle size={13} />,
            text: label ?? "תלוי גמישות",
            cls: "text-amber-700 bg-amber-50 border-amber-200",
        },
    };
    const { icon, text, cls } = configs[type];
    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border whitespace-nowrap ${cls}`}
        >
            {icon}
            {text}
        </span>
    );
};

// ─── TR/TE effect cells ───────────────────────────────────────────────────────
const TRUp = ({ text, math }: { text: string; math: string }) => (
    <div className="flex items-start gap-1.5 text-sm">
        <TrendingUp size={14} className="text-emerald-500 shrink-0 mt-0.5" />
        <div>
            <span className="font-semibold text-slate-800">{text} </span>
            <span className="text-emerald-700 font-bold" dir="ltr">
                <MathText asSpan>{`$${math}\\uparrow$`}</MathText>
            </span>
        </div>
    </div>
);

const TRDown = ({ text, math }: { text: string; math: string }) => (
    <div className="flex items-start gap-1.5 text-sm">
        <TrendingDown size={14} className="text-rose-500 shrink-0 mt-0.5" />
        <div>
            <span className="font-semibold text-slate-600">{text} </span>
            <span className="text-rose-700 font-bold" dir="ltr">
                <MathText asSpan>{`$${math}\\downarrow$`}</MathText>
            </span>
        </div>
    </div>
);

const TRDepends = ({ text, math }: { text: string; math?: string }) => (
    <div className="flex items-start gap-1.5 text-sm">
        <HelpCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
            <span className="font-semibold text-slate-600">{text}</span>
            {math && (
                <span className="text-amber-700 font-bold mr-1" dir="ltr">
                    <MathText asSpan>{` $${math}$`}</MathText>
                </span>
            )}
        </div>
    </div>
);

const TRGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col gap-2">{children}</div>
);

// ─── Elasticity sub-table ─────────────────────────────────────────────────────
const ElasticityBreakdown = () => (
    <div className="mt-3 rounded-lg border border-slate-200 overflow-hidden text-xs">
        <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-600 text-[11px] uppercase tracking-wide">
            פירוט לפי גמישות ביקוש
        </div>
        <table className="w-full text-right">
            <thead>
                <tr className="bg-slate-50 text-[10px] text-slate-500 uppercase tracking-wider">
                    <th className="px-3 py-1.5">גמישות</th>
                    <th className="px-3 py-1.5 text-center">P↑ → TR</th>
                    <th className="px-3 py-1.5 text-center">P↓ → TR</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                <tr>
                    <td className="px-3 py-1.5 font-semibold text-amber-700">
                        <MathText asSpan>{`קשיח $|\\eta| < 1$`}</MathText>
                    </td>
                    <td className="px-3 py-1.5 text-center text-emerald-600 font-bold">↑</td>
                    <td className="px-3 py-1.5 text-center text-rose-600 font-bold">↓</td>
                </tr>
                <tr>
                    <td className="px-3 py-1.5 font-semibold text-purple-700">
                        <MathText asSpan>{`יחידתי $|\\eta| = 1$`}</MathText>
                    </td>
                    <td className="px-3 py-1.5 text-center text-slate-500 font-bold">—</td>
                    <td className="px-3 py-1.5 text-center text-slate-500 font-bold">—</td>
                </tr>
                <tr>
                    <td className="px-3 py-1.5 font-semibold text-blue-700">
                        <MathText asSpan>{`גמיש $|\\eta| > 1$`}</MathText>
                    </td>
                    <td className="px-3 py-1.5 text-center text-rose-600 font-bold">↓</td>
                    <td className="px-3 py-1.5 text-center text-emerald-600 font-bold">↑</td>
                </tr>
            </tbody>
        </table>
    </div>
);

// ─── Table row ────────────────────────────────────────────────────────────────
interface RowData {
    label: string;
    process: string[];
    pEffect: EffectType;
    pLabel?: string;
    qEffect: EffectType;
    qLabel?: string;
    trEffect: React.ReactNode;
    note?: string;
    showElasticity?: boolean;
    tag?: string[];
}

const TableRow = ({
    label,
    process,
    pEffect,
    pLabel,
    qEffect,
    qLabel,
    trEffect,
    note,
    showElasticity,
}: RowData) => {
    const [open, setOpen] = useState(false);

    return (
        <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors group">
            {/* Label */}
            <td className="px-5 py-4 align-top">
                <MathText asSpan className="font-semibold text-slate-800 text-sm leading-snug">
                    {label}
                </MathText>
                {note && (
                    <div className="mt-1.5 text-xs text-slate-400 italic leading-snug">{note}</div>
                )}
            </td>

            {/* Causal chain — collapsed by default on small screens */}
            <td className="px-5 py-4 align-top">
                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="sm:hidden flex items-center gap-1 text-xs text-slate-500 font-medium mb-1"
                >
                    {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    {open ? "הסתר" : "הצג תהליך"}
                </button>
                <div className={open ? "" : "hidden sm:block"}>
                    <CausalChain steps={process} />
                </div>
                {showElasticity && <ElasticityBreakdown />}
            </td>

            {/* P */}
            <td className="px-4 py-4 align-top">
                <EffectBadge type={pEffect} label={pLabel} />
            </td>

            {/* Q */}
            <td className="px-4 py-4 align-top">
                <EffectBadge type={qEffect} label={qLabel} />
            </td>

            {/* TR/TE */}
            <td className="px-5 py-4 align-top">{trEffect}</td>
        </tr>
    );
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
interface SectionProps {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ElementType;
    accentClass: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const TableSection = ({
    id,
    title,
    subtitle,
    icon: Icon,
    accentClass,
    children,
    footer,
}: SectionProps) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div id={id} className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <button
                onClick={() => setCollapsed((v) => !v)}
                className={`w-full text-right flex items-center gap-3 px-6 py-4 border-b border-slate-200 ${accentClass} transition-colors`}
            >
                <div className="bg-white/60 rounded-lg p-1.5 shrink-0">
                    <Icon size={16} className="text-current opacity-80" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-black text-sm uppercase tracking-widest">{title}</h3>
                    {subtitle && (
                        <p className="text-xs opacity-70 font-normal mt-0.5 truncate">{subtitle}</p>
                    )}
                </div>
                {collapsed ? <ChevronDown size={16} className="opacity-60 shrink-0" /> : <ChevronUp size={16} className="opacity-60 shrink-0" />}
            </button>

            {/* Table */}
            {!collapsed && (
                <div className="overflow-x-auto bg-white">
                    <table className="w-full text-right border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200">
                                <th className="px-5 py-3 min-w-[180px]">האירוע / הגורם</th>
                                <th className="px-5 py-3 min-w-[300px]">שרשרת תהליכים</th>
                                <th className="px-4 py-3 w-28 text-center whitespace-nowrap">
                                    <MathText asSpan>{"השפעה על $P$"}</MathText>
                                </th>
                                <th className="px-4 py-3 w-28 text-center whitespace-nowrap">
                                    <MathText asSpan>{"השפעה על $Q$"}</MathText>
                                </th>
                                <th className="px-5 py-3 min-w-[200px]">
                                    פדיון / הוצאות{" "}
                                    <MathText asSpan className="text-slate-400 font-normal normal-case tracking-normal">
                                        {"($TR/TE$)"}
                                    </MathText>
                                </th>
                            </tr>
                        </thead>
                        <tbody>{children}</tbody>
                    </table>
                    {footer && (
                        <div className="bg-slate-50/50 p-4 border-t border-slate-200">
                            {footer}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// ─── Cheatsheet Tariffs ───────────────────────────────────────────────────────
const CheatsheetTariffs = () => (
    <div className="rounded-xl border border-sky-200/60 bg-white overflow-hidden shadow-sm">
        <div className="bg-sky-50 px-4 py-2 border-b border-sky-100 flex items-center gap-2">
            <Zap size={13} className="text-amber-500" />
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                Cheatsheet: השפעות מכס על ייבוא (T↑)
            </span>
        </div>
        <table className="w-full text-right text-sm">
            <thead className="bg-slate-50">
                <tr className="text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-slate-200">
                    <th className="px-4 py-3">מדד</th>
                    <th className="px-4 py-3 w-20">כיוון</th>
                    <th className="px-4 py-3">הסבר</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {[
                    ["מחיר מקומי", "↑", "text-rose-600", "הצרכן משלם עולם + מכס"],
                    ["צריכה מקומית Qd", "↓", "text-emerald-600", "מחיר גבוה → פחות קונים"],
                    ["ייצור מקומי Qs", "↑", "text-rose-600", "מחיר גבוה → יצרנים מגדילים"],
                    ["כמות הייבוא", "↓↓", "text-emerald-600", "לחץ משני הצדדים"],
                    ["תקבולי ממשלה", "+", "text-amber-600", "רק על יחידות מיובאות בפועל"],
                    ["DWL", "↑", "text-rose-600", "שני משולשים — אובדן יעילות"],
                ].map(([label, dir, color, desc]) => (
                    <tr key={label} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-700">{label}</td>
                        <td className={`px-4 py-3 font-black text-lg ${color}`}>{dir}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{desc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// ─── Quick tips bar ───────────────────────────────────────────────────────────
const TipsBar = () => (
    <div className="rounded-2xl bg-slate-900 text-white p-5 flex items-start gap-4">
        <div className="bg-slate-800 border border-slate-700 p-2 rounded-lg shrink-0">
            <Info size={18} className="text-slate-400" />
        </div>
        <div>
            <h4 className="font-bold text-sm mb-2 text-white">כלל אצבע לפתרון מבחנים</h4>
            <ul className="space-y-1.5 text-slate-300 text-sm leading-relaxed list-disc pr-5">
                <li>
                    זהה קודם איזו עקומה זזה: <strong>ביקוש</strong> (אירוע צרכן) או{" "}
                    <strong>היצע</strong> (אירוע יצרן).
                </li>
                <li>
                    מסים יוצרים <em>טריז</em>: הפרש בין{" "}
                    <strong>מחיר לצרכן</strong> ל<strong>מחיר ליצרן</strong> = גובה המס.
                </li>
                <li>
                    שרטט את עודף הביקוש/ההיצע שנוצר{" "}
                    <strong>במחיר הישן</strong> — זה מסביר את כיוון הלחץ.
                </li>
                <li>
                    בשוק פתוח, המחיר המקומי{" "}
                    <em>תמיד מתכייל</em> למחיר העולמי (אלא אם מכס סוגר את השוק).
                </li>
                <li>
                    TR עולה כש-P עולה ←→ ביקוש <strong>קשיח</strong>. TR עולה כש-P יורד ←→
                    ביקוש <strong>גמיש</strong>.
                </li>
            </ul>
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const TAGS = ["הכל", "ביקוש", "היצע", "מס/סובסידיה", "מכס/סחר", "גמישות"];

export default function MarketEquilibriumMaster() {
    const [activeTag, setActiveTag] = useState("הכל");

    return (
        <div className="w-full font-sans antialiased text-slate-900 my-8 space-y-10" dir="rtl">

            {/* ── Header ── */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 px-8 py-10 text-white shadow-xl">
                {/* subtle grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)",
                    }}
                />
                <div className="relative z-10 flex items-start gap-5">
                    <div className="bg-white/10 border border-white/20 rounded-xl p-3 shrink-0">
                        <BookOpen size={24} className="text-indigo-300" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                            אנליזת שיווי משקל — שוק תחרותי
                        </h2>
                        <p className="mt-2 text-slate-300 text-sm max-w-xl leading-relaxed">
                            מפת שינויים מלאה: כוחות שוק, גמישות, התערבות ממשלתית וסחר חוץ. עמודת{" "}
                            <MathText asSpan className="text-indigo-200">
                                {"$TR$"}
                            </MathText>{" "}
                            = פדיון יצרן |{" "}
                            <MathText asSpan className="text-indigo-200">
                                {"$TE$"}
                            </MathText>{" "}
                            = הוצאות צרכן.
                        </p>
                        {/* tag filters */}
                        <div className="flex flex-wrap gap-2 mt-5">
                            <Filter size={13} className="text-slate-400 self-center shrink-0" />
                            {TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${activeTag === tag
                                        ? "bg-indigo-500 border-indigo-400 text-white shadow"
                                        : "bg-white/10 border-white/20 text-slate-300 hover:bg-white/20"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Level 1: Basic Market Shifts ── */}
            {(activeTag === "הכל" || activeTag === "ביקוש" || activeTag === "היצע") && (
                <TableSection
                    id="level1"
                    title="רמה 1: כוחות שוק בסיסיים"
                    subtitle="שינויים בביקוש ובהיצע — הבסיס לכל ניתוח"
                    icon={Layers}
                    accentClass="bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                >
                    <TableRow
                        label="עלייה בביקוש (למשל: עלייה בהכנסה)"
                        process={[
                            "ביקוש עולה ($D \\uparrow$)",
                            "עודף ביקוש במחיר הישן",
                            "לחץ לעליית מחיר",
                            "היצרנים מגדילים כמות ($Q \\uparrow$)",
                        ]}
                        pEffect="up"
                        qEffect="up"
                        trEffect={<TRUp text="פדיון יצרנים עולה" math="TR" />}
                        tag={["ביקוש"]}
                    />
                    <TableRow
                        label="ירידה בביקוש (למשל: מוצר נחות + הכנסה עלתה)"
                        process={[
                            "ביקוש יורד ($D \\downarrow$)",
                            "עודף היצע במחיר הישן",
                            "לחץ לירידת מחיר",
                            "$P \\downarrow$, $Q \\downarrow$",
                        ]}
                        pEffect="down"
                        qEffect="down"
                        trEffect={<TRDown text="פדיון מתכווץ" math="TR" />}
                        tag={["ביקוש"]}
                    />
                    <TableRow
                        label="ירידה בהיצע (מחיר גורם ייצור עלה)"
                        process={[
                            "עלות שולית עולה ($MC \\uparrow$)",
                            "היצע קטן ($S \\downarrow$)",
                            "עודף ביקוש במחיר הישן",
                            "$P \\uparrow$, $Q \\downarrow$",
                        ]}
                        pEffect="up"
                        qEffect="down"
                        trEffect={
                            <TRGroup>
                                <TRDepends text="תלוי בגמישות הביקוש" math="|E_d|" />
                            </TRGroup>
                        }
                        showElasticity
                        tag={["היצע"]}
                    />
                    <TableRow
                        label="שיפור טכנולוגי (MC יורד)"
                        process={[
                            "עלות שולית יורדת ($MC \\downarrow$)",
                            "היצע גדל ($S \\uparrow$)",
                            "עודף היצע במחיר הישן",
                            "$P \\downarrow$, $Q \\uparrow$",
                        ]}
                        pEffect="down"
                        qEffect="up"
                        trEffect={
                            <TRGroup>
                                <TRDepends text="תלוי בגמישות הביקוש" math="|E_d|" />
                            </TRGroup>
                        }
                        showElasticity
                        tag={["היצע"]}
                    />
                </TableSection>
            )}

            {/* ── Level 2: Elasticities ── */}
            {(activeTag === "הכל" || activeTag === "גמישות") && (
                <TableSection
                    id="level2"
                    title="רמה 2: גמישויות ומיזוגים"
                    subtitle="כיצד מבנה הביקוש/היצע משנה את גודל ההשפעה"
                    icon={BarChart3}
                    accentClass="bg-violet-50 text-violet-800 hover:bg-violet-100/70"
                >
                    <TableRow
                        label="היצע קשיח לחלוטין — נדל״ן בטווח קצר"
                        process={[
                            "ביקוש עולה ($D \\uparrow$)",
                            "כמות לא יכולה להשתנות ($Q$ קבוע)",
                            "כל ההשפעה הולכת למחיר ($P$)",
                        ]}
                        pEffect="up"
                        pLabel="עלייה חדה"
                        qEffect="neutral"
                        trEffect={<TRUp text="המפיצים גורפים" math="TR" />}
                        tag={["גמישות"]}
                    />
                    <TableRow
                        label="ביקוש גמיש מאוד — מוצרי מותרות"
                        process={[
                            "היצע קטן ($S \\downarrow$)",
                            "$P$ עולה מעט",
                            "הצרכנים מוותרים מהר",
                            "$Q \\downarrow\\downarrow$ משמעותית",
                        ]}
                        pEffect="up"
                        pLabel="עלייה קלה"
                        qEffect="down"
                        qLabel="ירידה חדה"
                        trEffect={<TRDown text="קריסת פדיון" math="TR" />}
                        tag={["גמישות"]}
                    />
                    <TableRow
                        label="ביקוש קשיח לחלוטין — תרופות חיוניות"
                        process={[
                            "היצע קטן ($S \\downarrow$)",
                            "$P \\uparrow\\uparrow$ חד מאוד",
                            "$Q$ כמעט ללא שינוי",
                        ]}
                        pEffect="up"
                        pLabel="עלייה חדה מאוד"
                        qEffect="neutral"
                        qLabel="כמעט ללא שינוי"
                        trEffect={<TRUp text="פדיון מזנק" math="TR" />}
                        tag={["גמישות"]}
                    />
                    <TableRow
                        label="צירוף היצעים (מיזוג יצרנים)"
                        process={[
                            "חיבור כמותי ($\\sum Q_i$)",
                            "היצע מצרפי גדל ימינה",
                            "במחיר נתון — $Q \\uparrow$",
                            "$P \\downarrow$",
                        ]}
                        pEffect="down"
                        qEffect="up"
                        trEffect={<TRDepends text="תלוי בגמישות" math="|E_d|" />}
                        showElasticity
                        tag={["גמישות"]}
                    />
                </TableSection>
            )}

            {/* ── Level 3: Government Intervention ── */}
            {(activeTag === "הכל" || activeTag === "מס/סובסידיה") && (
                <TableSection
                    id="level3"
                    title="רמה 3: התערבות ממשלתית"
                    subtitle="מיסים, סובסידיות ומחירים מפוקחים"
                    icon={Scale}
                    accentClass="bg-amber-50 text-amber-800 hover:bg-amber-100/70"
                >
                    <TableRow
                        label="הטלת מס יחידה על היצרן ($T$)"
                        process={[
                            "$MC$ עולה בגובה המס",
                            "$S$ זז למעלה ב-$T$",
                            "$P$ לצרכן עולה (פחות מ-$T$)",
                            "$P$ ליצרן (נטו) יורד",
                            "נטל עודף: $DWL = \\frac{\\Delta Q \\cdot T}{2}$",
                        ]}
                        pEffect="up"
                        qEffect="down"
                        trEffect={
                            <TRGroup>
                                <TRDepends text="הוצאות צרכנים: תלוי גמישות" math="|E_d|" />
                                <TRDown text="פדיון יצרנים (נטו) יורד" math="TR_{net}" />
                            </TRGroup>
                        }
                        note="חלוקת נטל: קשיח יותר ← נושא יותר"
                        tag={["מס/סובסידיה"]}
                    />
                    <TableRow
                        label="העלאת מס קיים — ביקוש קשיח"
                        process={[
                            "$T \\uparrow$ (מס גבוה יותר)",
                            "$S$ זז עוד למעלה",
                            "צרכנים 'שבויים' — $Q$ כמעט לא משתנה",
                            "$P$ עולה עצמתית",
                            "תקבולי ממשלה עולים ($T \\times Q$)",
                        ]}
                        pEffect="up"
                        pLabel="עלייה חדה"
                        qEffect="down"
                        qLabel="ירידה קלה"
                        trEffect={
                            <TRGroup>
                                <TRUp text="הוצאות הצרכנים" math="TE" />
                                <TRDown text="פדיון יצרנים (נטו)" math="TR_{net}" />
                                <TRUp text="תקבולי הממשלה" math="Tax" />
                            </TRGroup>
                        }
                        tag={["מס/סובסידיה", "גמישות"]}
                    />
                    <TableRow
                        label="סובסידיה ליצרן"
                        process={[
                            "$MC$ יורד בגובה הסובסידיה",
                            "$S$ זז למטה",
                            "$P$ לצרכן יורד",
                            "$P$ ליצרן (ברוטו) עולה",
                            "$Q \\uparrow$ — ייצור יתר",
                        ]}
                        pEffect="down"
                        qEffect="up"
                        trEffect={
                            <TRGroup>
                                <TRUp text="פדיון יצרנים (ברוטו)" math="TR_{bruto}" />
                                <TRDepends text="הוצאות צרכנים: תלוי גמישות" math="|E_d|" />
                            </TRGroup>
                        }
                        note="שקול לירידה ב-MC — אותן תוצאות כמותיות"
                        tag={["מס/סובסידיה"]}
                    />
                    <TableRow
                        label="מחיר מקסימום ($P_{max} < P^*$)"
                        process={[
                            "מחיר כפוי מתחת לשיווי משקל",
                            "עודף ביקוש כרוני",
                            "שוק שחור / תורים",
                            "$Q$ יורד ל-$Q_s$",
                        ]}
                        pEffect="down"
                        pLabel="ירידה (כפויה)"
                        qEffect="down"
                        trEffect={<TRDown text="פדיון וצריכה קורסים" math="TR=TE" />}
                        tag={["מס/סובסידיה"]}
                    />
                </TableSection>
            )}

            {/* ── Level 4: International Trade ── */}
            {(activeTag === "הכל" || activeTag === "מכס/סחר") && (
                <TableSection
                    id="level4"
                    title="רמה 4: סחר בינלאומי"
                    subtitle="פתיחה לייבוא/ייצוא, מכס ושינויי שער חליפין"
                    icon={Globe}
                    accentClass="bg-sky-50 text-sky-800 hover:bg-sky-100/70"
                    footer={<CheatsheetTariffs />}
                >
                    <TableRow
                        label="פתיחה לייבוא ($P_w < P^*$)"
                        process={[
                            "מחיר עולמי נמוך ממקומי",
                            "$P$ יורד ל-$P_w$",
                            "ייצור מקומי $Q_s \\downarrow$",
                            "צריכה מקומית $Q_d \\uparrow$",
                            "הפרש = ייבוא",
                        ]}
                        pEffect="down"
                        qEffect="up"
                        qLabel="עלייה (ייבוא)"
                        trEffect={<TRDown text="פדיון יצרנים מקומיים" math="TR_{loc}" />}
                        tag={["מכס/סחר"]}
                    />
                    <TableRow
                        label="הטלת מכס על ייבוא ($t$)"
                        process={[
                            "מחיר מקומי = $P_w + t$",
                            "ייצור מקומי $Q_s \\uparrow$",
                            "צריכה מקומית $Q_d \\downarrow$",
                            "ייבוא קטן",
                            "ממשלה גובה מכס",
                        ]}
                        pEffect="up"
                        qEffect="down"
                        trEffect={
                            <TRGroup>
                                <TRUp text="פדיון יצרנים מקומיים" math="TR_{loc}" />
                                <TRUp text="תקבולי ממשלה" math="Tax" />
                            </TRGroup>
                        }
                        note="זהה להתייקרות מחיר עולמי באותו גובה"
                        tag={["מכס/סחר"]}
                    />
                    <TableRow
                        label="פתיחה לייצוא ($P_w > P^*$)"
                        process={[
                            "מחיר עולמי גבוה ממקומי",
                            "$P$ עולה ל-$P_w$",
                            "ייצור מקומי $Q_s \\uparrow$",
                            "צריכה מקומית $Q_d \\downarrow$",
                            "עודף = ייצוא",
                        ]}
                        pEffect="up"
                        qEffect="up"
                        qLabel="עלייה (ייצור)"
                        trEffect={<TRUp text="פדיון יצרנים נוסק" math="TR" />}
                        tag={["מכס/סחר"]}
                    />
                    <TableRow
                        label="פיחות (E↑) — שוק פתוח לייבוא"
                        process={[
                            "שער חליפין $E$ עולה",
                            "$P_{world}^{\\text{NIS}} = P_w \\times E \\uparrow$",
                            "מחיר מקומי עולה",
                            "ייצור $Q_s \\uparrow$, ביקוש $Q_d \\downarrow$",
                            "ייבוא קטן",
                        ]}
                        pEffect="up"
                        qEffect="down"
                        qLabel="ייבוא↓"
                        trEffect={<TRUp text="פדיון יצרנים מקומיים" math="TR_{loc}" />}
                        note="זהה להטלת מכס בגובה עליית Pw"
                        tag={["מכס/סחר"]}
                    />
                    <TableRow
                        label="תיסוף (E↓) — שוק פתוח לייצוא"
                        process={[
                            "שער חליפין $E$ יורד",
                            "$P_{world}^{\\text{NIS}} \\downarrow$",
                            "מחיר מקומי יורד",
                            "ייצוא קטן (אולי נהפך לייבוא)",
                        ]}
                        pEffect="down"
                        qEffect="down"
                        qLabel="ייצוא↓"
                        trEffect={<TRDown text="פדיון יצרנים יורד" math="TR" />}
                        tag={["מכס/סחר"]}
                    />
                </TableSection>
            )}

            {/* ── Tips ── */}
            <TipsBar />
        </div>
    );
}