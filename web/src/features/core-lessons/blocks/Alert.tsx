"use client";

import React from "react";
import { Sparkles, AlertTriangle, RotateCcw } from "lucide-react";
import { LessonMarkdown } from "./LessonMarkdown";

type AlertVariant = 'tip' | 'warning' | 'prerequisite' | 'error' | 'success';

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
        containerClass: "border-secondary/30 bg-secondary/5 hover:border-secondary hover:shadow-secondary/10",
        iconColor: "text-secondary-foreground",
        titleColor: "text-secondary-foreground",
    },
    warning: {
        icon: AlertTriangle,
        defaultTitle: "שימו לב",
        containerClass: "border-warning/30 bg-warning/5 hover:border-warning hover:shadow-warning/10",
        iconColor: "text-warning",
        titleColor: "text-[#92400E]",
    },
    prerequisite: {
        icon: RotateCcw,
        defaultTitle: "לפני שנמשיך",
        containerClass: "border-muted-foreground/20 bg-muted hover:border-muted-foreground/40 hover:shadow-soft",
        iconColor: "text-muted-foreground",
        titleColor: "text-foreground",
    },
    error: {
        icon: AlertTriangle,
        defaultTitle: "טעות!",
        containerClass: "border-destructive/30 bg-destructive/5 hover:border-destructive hover:shadow-destructive/10",
        iconColor: "text-destructive",
        titleColor: "text-destructive",
    },
    success: {
        icon: Sparkles,
        defaultTitle: "כל הכבוד",
        containerClass: "border-success/30 bg-success/5 hover:border-success hover:shadow-success/10",
        iconColor: "text-success",
        titleColor: "text-success",
    },
};

export const Alert: React.FC<AlertProps> = ({ variant, children, title, className = '', icon }) => {
    const v = VARIANTS[variant];
    const Icon = v.icon;

    return (
        <div className={`group border-2 rounded-xl p-5 my-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-start gap-4 ${v.containerClass} ${className}`} dir="rtl">
            <div className="shrink-0 mt-1">
                {icon ? icon : <Icon className={`w-6 h-6 ${v.iconColor}`} />}
            </div>
            <div className="flex-1">
                <h4 className={`text-lg font-bold uppercase tracking-wide mb-1.5 ${v.titleColor}`}>
                    {title || v.defaultTitle}
                </h4>
                <div className="text-foreground text-base font-medium leading-[1.8]">
                    {typeof children === 'string' ? (
                        <LessonMarkdown>{children as string}</LessonMarkdown>
                    ) : children}
                </div>
            </div>
        </div>
    );
};
