"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Coffee } from 'lucide-react';
import ReactMarkdown from "react-markdown";

interface StreetSmartSketchProps {
    content: string;
    title?: string;
}

/**
 * StreetSmartSketch Component (TSX Version)
 * מציג הסבר "דוגרי" בסגנון שירבוט ידני עם תמיכה ב-Markdown.
 * הקוד עודכן כדי להסיר תלות בחבילות חיצוניות שגורמות לשגיאות קומפילציה.
 */
export const StreetSmartSketch: React.FC<StreetSmartSketchProps> = ({
    content,
    title = "דוגרי?"
}) => {
    const [isOpen, setIsOpen] = useState(true);

    // סגנון למסגרת הלא-אחידה (Hand-drawn look)
    const sketchBorderStyle = {
        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
    };

    return (
        <div className="my-8 font-sans" dir="rtl">
            <div
                style={sketchBorderStyle}
                className="border-2 border-slate-800 p-6 bg-white shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* אייקון מעוצב */}
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-slate-800 shadow-sm">
                            <Coffee size={16} className="text-slate-900" />
                        </div>
                        {/* כותרת מודגשת */}
                        <h3 className="font-black text-xl tracking-tighter">
                            <span className="bg-yellow-300 px-2 py-0.5 border-b-2 border-slate-800">
                                {title}
                            </span>
                        </h3>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                        aria-label={isOpen ? "סגור" : "פתח"}
                    >
                        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                        <div className="text-slate-800 font-bold leading-relaxed border-r-4 border-yellow-300 pr-4 markdown-content">
                            {/* שימוש ב-ReactMarkdown ללא פלאגינים חיצוניים שגורמים לשגיאות */}
                            <ReactMarkdown>
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS מקומי עבור ה-Markdown בתוך הקומפוננטה */}
            <style>{`
        .markdown-content p {
          margin-bottom: 0.5rem;
        }
        .markdown-content strong {
          color: #000;
          text-decoration: underline decoration-yellow-300 decoration-4;
        }
      `}</style>
        </div>
    );
};
