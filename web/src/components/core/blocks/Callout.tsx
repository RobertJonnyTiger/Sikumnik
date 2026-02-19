"use client";

import React from "react";
import { Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface CalloutProps {
    variant: "tip" | "warning" | "note" | "important";
    content: string;
    className?: string;
}

const VARIANTS = {
    tip: {
        icon: Lightbulb,
        label: "טיפ",
        border: "border-emerald-500/20",
        bg: "bg-emerald-950/20",
        text: "text-emerald-400",
        iconBg: "bg-emerald-500/10",
    },
    warning: {
        icon: AlertTriangle,
        label: "שימו לב",
        border: "border-amber-500/20",
        bg: "bg-amber-950/20",
        text: "text-amber-400",
        iconBg: "bg-amber-500/10",
    },
    note: {
        icon: Info,
        label: "הערה",
        border: "border-sky-500/20",
        bg: "bg-sky-950/20",
        text: "text-sky-400",
        iconBg: "bg-sky-500/10",
    },
    important: {
        icon: AlertCircle,
        label: "חשוב",
        border: "border-rose-500/20",
        bg: "bg-rose-950/20",
        text: "text-rose-400",
        iconBg: "bg-rose-500/10",
    },
};

export const Callout: React.FC<CalloutProps> = ({ variant, content, className }) => {
    const v = VARIANTS[variant];
    const Icon = v.icon;

    return (
        <div className={`${v.bg} border ${v.border} rounded-xl p-4 my-3 flex items-start gap-3`}>
            <div className={`${v.iconBg} p-1.5 rounded-lg shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${v.text}`} />
            </div>
            <div className="flex-1">
                <p className={`text-xs font-black ${v.text} uppercase tracking-wider mb-1`}>{v.label}</p>
                <div className={`text-foreground/70 text-[14px] leading-relaxed markdown-content ${className || ''}`}>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};
