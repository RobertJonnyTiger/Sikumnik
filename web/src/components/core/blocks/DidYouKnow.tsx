"use client";

import * as React from "react";
import { Sparkles, RefreshCw, Lightbulb, Brain, Zap, Rocket, History, Landmark, Users, Search, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GeneratedFact {
    category: string;
    fact: string;
}

interface DidYouKnowProps {
    facts?: Array<{
        icon?: React.ElementType;
        category: string;
        fact: string;
    }>;
    topicData?: {
        title: string;
        blocks: unknown[];
    };
    courseName?: string;
    className?: string;
}

// Icon mapping based on category keywords
const getIconForCategory = (category: string): React.ElementType => {
    const lower = category.toLowerCase();
    if (lower.includes('היסטוריה') || lower.includes('history')) return History;
    if (lower.includes('מוח') || lower.includes('פסיכולוגיה') || lower.includes('brain') || lower.includes('psychology')) return Brain;
    if (lower.includes('חדשנות') || lower.includes('innovation') || lower.includes('טכנולוגיה')) return Zap;
    if (lower.includes('חלל') || lower.includes('rocket') || lower.includes('space')) return Rocket;
    if (lower.includes('חברה') || lower.includes('אנשים') || lower.includes('society') || lower.includes('people')) return Users;
    if (lower.includes('כלכלה') || lower.includes('money') || lower.includes('finance')) return Landmark;
    if (lower.includes('מחקר') || lower.includes('research') || lower.includes('search')) return Search;
    return Lightbulb;
};

const DidYouKnow: React.FC<DidYouKnowProps> = ({ facts: staticFacts, topicData, courseName, className = "" }) => {
    const [generatedFacts, setGeneratedFacts] = React.useState<GeneratedFact[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isFlipping, setIsFlipping] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [hasBeenSeen, setHasBeenSeen] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Generate facts when topic changes
    React.useEffect(() => {
        if (!topicData || (staticFacts && staticFacts.length > 0)) return;

        const generateFacts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/trivia', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topicTitle: topicData.title,
                        topicContent: topicData.blocks,
                        courseName: courseName,
                    }),
                });

                if (!response.ok) {
                    const status = response.status;
                    let errorData = {};
                    try {
                        errorData = await response.json();
                    } catch (e) {
                        // Ignore syntax errors from non-JSON error bodies
                    }
                    console.error(`Trivia API Error (${status}):`, errorData);
                    throw new Error((errorData as any).details || (errorData as any).error || `Request failed with status ${status}`);
                }

                const data = await response.json();
                setGeneratedFacts(data.facts || []);
                setCurrentIndex(0);
            } catch (err) {
                console.error('Error generating facts:', err);
                setError('לא ניתן ליצור עובדות כרגע');
            } finally {
                setIsLoading(false);
            }
        };

        generateFacts();
    }, [topicData, staticFacts, courseName]);

    // Intersection Observer for pulsing animation
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenSeen) {
                    setHasBeenSeen(true);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [hasBeenSeen]);

    const handleRefresh = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFlipping || isLoading) return;

        const factsToUse = staticFacts || generatedFacts;
        if (factsToUse.length <= 1) return;

        setIsFlipping(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % factsToUse.length);
            setIsFlipping(false);
        }, 300);
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    // Determine which facts to display (use static if available and non-empty, otherwise generated)
    const facts = (staticFacts && staticFacts.length > 0) ? staticFacts : generatedFacts;
    if (facts.length === 0 && !isLoading && !error) return null;

    const currentFact = facts[currentIndex];
    const IconComponent = currentFact
        ? getIconForCategory(currentFact.category)
        : Sparkles;

    return (
        <div ref={containerRef} className={`relative flex justify-center items-center ${className} min-h-[60px]`}>
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        key="collapsed"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: hasBeenSeen ? [0, -5, 0] : 0,
                        }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            y: { repeat: hasBeenSeen ? Infinity : 0, duration: 2, repeatDelay: 1 }
                        }}
                        onClick={toggleOpen}
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#1e293b] border border-[#2dd4bf]/30 shadow-[0_0_15px_rgba(45,212,191,0.15)] hover:shadow-[0_0_25px_rgba(45,212,191,0.3)] hover:border-[#2dd4bf]/50 transition-all duration-300"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2dd4bf]"></span>
                        </span>
                        <span className="text-[#f8fafc] font-bold text-sm">גילית משהו חדש?</span>
                        <Lightbulb className="w-5 h-5 text-accent" />
                    </motion.button>
                ) : (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="relative w-full max-w-2xl bg-[#0f172a]/90 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Glow effects */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleOpen(); }}
                            className="absolute top-4 left-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                        >
                            <X size={18} />
                        </button>

                        <div className="p-6 md:p-8 cursor-pointer" onClick={handleRefresh}>
                            <div className="flex flex-col gap-4">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-xl bg-[#1e293b] border border-[#2dd4bf]/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                                            {isLoading ? (
                                                <RefreshCw className="w-5 h-5 text-[#2dd4bf] animate-spin" />
                                            ) : (
                                                <IconComponent className="w-5 h-5 text-[#2dd4bf]" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#2dd4bf]">הידעת?</span>
                                            <span className="text-xs text-slate-400">לחץ כדי לגלות עוד</span>
                                        </div>
                                    </div>
                                    {!isLoading && facts.length > 1 && (
                                        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 ml-8">
                                            <RefreshCw className="w-3 h-3" />
                                            <span>הבא</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`min-h-[80px] flex items-center transition-all duration-300 ${isFlipping ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
                                    {isLoading ? (
                                        <p className="text-slate-400">מחפש עובדות מעניינות...</p>
                                    ) : error ? (
                                        <p className="text-red-400">{error}</p>
                                    ) : currentFact ? (
                                        <p className="text-lg md:text-xl text-[#f8fafc] leading-relaxed font-medium">
                                            <span className="text-accent font-bold ml-2">{currentFact.category}:</span>
                                            {currentFact.fact}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DidYouKnow;
