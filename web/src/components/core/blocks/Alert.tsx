"use client";

import React from "react";
import { Sparkles, AlertTriangle, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type AlertVariant = 'tip' | 'warning' | 'prerequisite';

interface AlertProps {
    variant: AlertVariant;
    children: React.ReactNode;
    title?: string;
    className?: string;
    icon?: React.ReactNode;
}

const VARIANTS = {
    tip: {
        icon: Sparkles,
        defaultTitle: "טיפ חשוב",
        containerClass: "border-teal-500 bg-teal-50/50",
        iconColor: "text-teal-600",
        titleColor: "text-teal-700",
    },
    warning: {
        icon: AlertTriangle,
        defaultTitle: "שימו לב",
        containerClass: "border-amber-400 bg-amber-50/50",
        iconColor: "text-amber-600",
        titleColor: "text-amber-700",
    },
    prerequisite: {
        icon: RotateCcw,
        defaultTitle: "לפני שנמשיך",
        containerClass: "border-gray-400 bg-gray-50/50",
        iconColor: "text-gray-500",
        titleColor: "text-gray-600",
    }
};

export const Alert: React.FC<AlertProps> = ({ variant, children, title, className = '', icon }) => {
    const v = VARIANTS[variant];
    const Icon = v.icon;

    return (
        <div className={`border-2 rounded-xl p-5 my-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-start gap-4 ${v.containerClass} ${className}`} dir="rtl">
            <div className="shrink-0 mt-1">
                {icon ? icon : <Icon className={`w-6 h-6 ${v.iconColor}`} />}
            </div>
            <div className="flex-1">
                <h4 className={`text-lg font-bold uppercase tracking-wide mb-1.5 ${v.titleColor}`}>
                    {title || v.defaultTitle}
                </h4>
                <div className="text-slate-800 text-base font-medium leading-[1.8] markdown-content">
                    {typeof children === 'string' ? (
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children as string}</ReactMarkdown>
                    ) : children}
                </div>
            </div>
        </div>
    );
};
