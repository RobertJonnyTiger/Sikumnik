"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

/**
 * StyledAccordion - A premium, interactive accordion component.
 * @param {string} title - Optional title for the accordion section.
 * @param {Array} items - List of items to display.
 * @param {string} items[].id - Unique identifier for the item.
 * @param {string} items[].name - Primary title of the item.
 * @param {string} items[].label - Secondary badge label (displayed in the header).
 * @param {string} items[].color - Hex color or CSS variable for the item's theme.
 * @param {string} items[].description - Markdown content for the expanded body.
 * @param {Array<string>} items[].tags - Optional list of tags/chips for the footer.
 */
const StyledAccordion = ({ title, items = [] }) => {
    const [activeId, setActiveId] = useState(null);

    const toggleItem = (id) => {
        setActiveId(prevId => prevId === id ? null : id);
    };

    return (
        <div className="w-full space-y-6 my-8 select-none font-main" dir="rtl">
            {title && (
                <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-tighter knowledge-text inline-block">
                    {title}
                </h2>
            )}

            <div className="space-y-3">
                {items.map((item, index) => {
                    const isActive = activeId === item.id;
                    const color = item.color || "var(--color-primary)";

                    return (
                        <div
                            key={item.id}
                            className={`
                border rounded-2xl overflow-hidden transition-all duration-500
                ${isActive ? 'border-primary/40 bg-card shadow-2xl scale-[1.01]' : 'border-border bg-card/50 hover:bg-card/80'}
              `}
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full flex items-center justify-between p-5 text-right transition-colors group"
                                aria-expanded={isActive}
                            >
                                <div className="flex items-center gap-4 text-right">
                                    {/* Numbered Circle */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center border font-bold text-lg transition-all duration-300"
                                        style={{
                                            backgroundColor: `${color}15`,
                                            borderColor: `${color}30`,
                                            color: color
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-bold text-lg text-foreground/90 leading-tight">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Badge Label */}
                                    {item.label && (
                                        <span
                                            className="hidden md:inline-block text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md border"
                                            style={{
                                                backgroundColor: `${color}05`,
                                                borderColor: `${color}20`,
                                                color: color
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                    <ChevronDown
                                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isActive ? 'rotate-180 text-primary' : 'group-hover:text-primary/70'}`}
                                    />
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
                                                <div className="text-base leading-relaxed text-foreground/80 mb-6 markdown-content">
                                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                                        {item.description}
                                                    </ReactMarkdown>
                                                </div>

                                                {/* Tags / Chips */}
                                                {item.tags && item.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        {item.tags.map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary/50 border border-border text-foreground/80 shadow-sm"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StyledAccordion;
