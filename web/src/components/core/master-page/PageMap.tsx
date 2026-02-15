"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";

interface PageMapItem {
    id: string;
    title: string;
    status: "completed" | "current" | "upcoming";
}

interface PageMapProps {
    items: PageMapItem[];
    className?: string;
}

export const PageMap: React.FC<PageMapProps> = ({ items, className }) => {
    return (
        <div className={cn("p-6 bg-slate-900/50 rounded-xl border border-slate-800", className)}>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                מפת השיעור (Lesson Map)
            </h3>
            <div className="relative space-y-0">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <div key={item.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
                            {/* Connector Line */}
                            {!isLast && (
                                <div
                                    className={cn(
                                        "absolute top-3 right-[11px] w-[2px] h-full",
                                        item.status === "completed" ? "bg-teal-500/50" : "bg-slate-800"
                                    )}
                                />
                            )}

                            {/* Icon / Marker */}
                            <div className={cn(
                                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 transition-all duration-300 shadow-xl",
                                item.status === "completed" && "bg-teal-500 border-teal-500 text-slate-950 shadow-teal-500/20",
                                item.status === "current" && "bg-slate-900 border-teal-400 ring-2 ring-teal-400/20 ring-offset-2 ring-offset-slate-900",
                                item.status === "upcoming" && "bg-slate-950 border-slate-800 text-slate-700"
                            )}>
                                {item.status === "completed" && <Check size={16} strokeWidth={3} />}
                                {item.status === "current" && <Circle size={12} className="fill-teal-400 text-teal-400 animate-pulse" />}
                                {item.status === "upcoming" && <span className="text-xs font-mono">{index + 1}</span>}
                            </div>

                            {/* Text */}
                            <div className={cn(
                                "mt-1 mr-4 transition-all duration-300",
                                item.status === "current" ? "opacity-100 translate-x-0" : "opacity-60"
                            )}>
                                <span className={cn(
                                    "text-base font-bold",
                                    item.status === "current" ? "text-teal-400" : "text-slate-400"
                                )}>
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
