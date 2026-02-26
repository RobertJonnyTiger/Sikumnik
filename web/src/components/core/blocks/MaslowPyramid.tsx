"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Shield, Users, Heart, Coffee } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const levels = [
    {
        id: 5,
        name: "Self-Actualization",
        hebrew: "הגשמה עצמית",
        color: "var(--color-primary)",
        icon: Sparkles,
        width: "40%",
        description: "מימוש מלא של הפוטנציאל האישי, יצירתיות ופתרון בעיות. זהו שיא הפירמידה - לא כולם מגיעים אליו, וזהו צורך שלא מפסיק להניע גם כשמסופק.",
        examples: ["יצירה אמנותית", "חדשנות בעבודה", "צמיחה אישית"],
        type: "B-Needs (צמיחה)",
    },
    {
        id: 4,
        name: "Esteem Needs",
        hebrew: "צרכי הערכה (אגו)",
        color: "#3b82f6", // Blue
        icon: Heart,
        width: "55%",
        description: "הצורך בהערכה עצמית, הישגים, סטטוס, הכרה וכבוד מהזולת.",
        examples: ["תארים ודרגות", "פרסי הצטיינות", "תחושת יכולת"],
        type: "B-Needs (צמיחה)",
    },
    {
        id: 3,
        name: "Social / Belonging",
        hebrew: "השתייכות ואהבה",
        color: "#10b981", // Emerald
        icon: Users,
        width: "70%",
        description: "הצורך בקשרים חברתיים, חברות, קבלה ואהבה בתוך קבוצה.",
        examples: ["חברות בצוות", "חיי קהילה", "קשרים משפחתיים"],
        type: "D-Needs (חסך)",
    },
    {
        id: 2,
        name: "Safety Needs",
        hebrew: "צורכי ביטחון",
        color: "var(--color-accent)", // Orange
        icon: Shield,
        width: "85%",
        description: "ביטחון פיזי, יציבות כלכלית, הגנה מפני סכנות וסביבה צפויה.",
        examples: ["קביעות בעבודה", "ביטוח בריאות", "סביבה בטוחה"],
        type: "D-Needs (חסך)",
    },
    {
        id: 1,
        name: "Physiological Needs",
        hebrew: "צרכים פיזיולוגיים",
        color: "#ef4444", // Red
        icon: Coffee,
        width: "100%",
        description: "הצרכים הבסיסיים ביותר להישרדות: אוכל, מים, שינה ומחסה.",
        examples: ["שכר למחיה", "זמן מנוחה", "תנאי עבודה בסיסיים"],
        type: "D-Needs (חסך)",
    },
];

export const MaslowPyramid: React.FC = () => {
    const [activeId, setActiveId] = useState<number | null>(null);

    const footerText = `מאסלו טען כי צרכי החסך (**D-Needs**) הם קריטיים - חסרונם יוצר מוטיבציה לפעולה, אך סיפוקם רק מביא אותנו למצב של "שגרה". לעומתם, צרכי הצמיחה (**B-Needs**) הם אינסופיים - ככל שאנחנו מספקים אותם יותר, המוטיבציה שלנו רק גדלה.`;

    return (
        <div className="my-12 select-none" dir="rtl">
            {/* Visual Pyramid */}
            <div className="flex flex-col items-center gap-1.5 mb-10">
                {[...levels].map((level) => {
                    const Icon = level.icon;
                    const isActive = activeId === level.id;

                    return (
                        <motion.div
                            key={level.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (5 - level.id) * 0.1 }}
                            onClick={() => setActiveId(isActive ? null : level.id)}
                            className="relative cursor-pointer group"
                            style={{ width: level.width }}
                        >
                            <div
                                className={`
                  relative h-14 flex items-center justify-center transition-all duration-300
                  ${isActive ? 'scale-[1.02] shadow-xl' : 'hover:scale-[1.01] hover:brightness-110'}
                  rounded-lg border-2
                `}
                                style={{
                                    backgroundColor: isActive ? level.color : `${level.color}15`,
                                    borderColor: level.color,
                                    color: isActive ? 'white' : level.color
                                }}
                            >
                                <div className="flex items-center gap-3 px-4">
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-foreground' : ''}`} />
                                    <span className={`text-base md:text-lg font-bold tracking-tight`}>
                                        {level.hebrew}
                                    </span>
                                </div>

                                {isActive && (
                                    <motion.div
                                        layoutId="pyramid-arrow"
                                        className="absolute -left-3 top-1/2 -translate-y-1/2 text-sky-800"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Details List */}
            <div className="space-y-3">
                {levels.map((level) => {
                    const isActive = activeId === level.id;
                    const Icon = level.icon;

                    return (
                        <div
                            key={level.id}
                            className={`
                border rounded-2xl overflow-hidden transition-all duration-500
                ${isActive ? 'border-primary/40 bg-card shadow-2xl scale-[1.01]' : 'border-border bg-card/50 hover:bg-card/80'}
              `}
                        >
                            <button
                                onClick={() => setActiveId(isActive ? null : level.id)}
                                className="w-full flex items-center justify-between p-5 text-right transition-colors"
                                aria-expanded={isActive}
                            >
                                <div className="flex items-center gap-4 text-right">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                                        style={{
                                            backgroundColor: `${level.color}15`,
                                            borderColor: `${level.color}30`,
                                            color: level.color
                                        }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-bold text-lg text-foreground leading-tight">{level.hebrew}</h3>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest leading-none mt-1">
                                            {level.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span
                                        className="hidden md:inline-block text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md border"
                                        style={{
                                            backgroundColor: `${level.color}05`,
                                            borderColor: `${level.color}20`,
                                            color: level.color
                                        }}
                                    >
                                        {level.type}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isActive ? 'rotate-180 text-sky-800' : ''}`} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                    >
                                        <div className="px-5 pb-6 pt-2 border-t border-border/10">
                                            <div className="md:pr-14">
                                                <div className="text-base leading-relaxed text-foreground mb-6 markdown-content">
                                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{level.description}</ReactMarkdown>
                                                </div>

                                                <div className="space-y-3">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">דוגמאות</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {level.examples.map((ex, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary/50 border border-border text-foreground"
                                                            >
                                                                {ex}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Footer Insight */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-8 p-6 glass-card border-primary/20 bg-primary/5 rounded-3xl"
            >
                <div className="flex gap-4 items-start">
                    <div className="bg-primary/20 p-2 rounded-xl mt-1">
                        <Sparkles className="w-4 h-4 text-sky-800" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sky-800 mb-2 text-lg">תובנת מפתח: D-Needs מול B-Needs</h4>
                        <div className="text-base text-foreground leading-relaxed markdown-content">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{footerText}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
