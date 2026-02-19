import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Lock, Play } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Tab {
    id: string;
    title: string;
}

interface ChapterProgressionBarProps {
    tabs: Tab[];
    activeTab: number;
    onTabChange: (index: number) => void;
    course: string;
    chapterTitle: string;
    nextChapter?: {
        title: string;
        id: string;
    };
}

export const ChapterProgressionBar: React.FC<ChapterProgressionBarProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    // Dock configuration
    // We only show the dock; no side buttons, no breadcrumbs.

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-2 p-2 bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50"
            >
                <TooltipProvider delayDuration={0}>
                    {/* Intro Step */}
                    <DockItem
                        index={-1}
                        isActive={activeTab === -1}
                        isCompleted={activeTab > -1}
                        title="הקדמה"
                        onClick={() => onTabChange(-1)}
                    />

                    <div className="w-px h-4 bg-white/10 mx-1" />

                    {/* Topic Steps */}
                    {tabs.map((tab, idx) => (
                        <DockItem
                            key={tab.id}
                            index={idx}
                            isActive={activeTab === idx}
                            isCompleted={activeTab > idx}
                            title={tab.title}
                            onClick={() => onTabChange(idx)}
                        />
                    ))}
                </TooltipProvider>
            </motion.div>
        </div>
    );
};

interface DockItemProps {
    index: number;
    isActive: boolean;
    isCompleted: boolean;
    title: string;
    onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ index, isActive, isCompleted, title, onClick }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={onClick}
                    className={cn(
                        "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group",
                        isActive
                            ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/25 ring-2 ring-primary/20"
                            : isCompleted
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    )}
                >
                    {isCompleted && !isActive ? (
                        <Check className="w-4 h-4" />
                    ) : isActive ? (
                        <span className="text-xs font-black">{index === -1 ? "i" : index + 1}</span>
                    ) : (
                        <span className="text-xs font-medium">{index === -1 ? "i" : index + 1}</span>
                    )}

                    {isActive && (
                        <motion.div
                            layoutId="dock-glow"
                            className="absolute inset-0 bg-primary/20 blur-lg rounded-full -z-10"
                        />
                    )}
                </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/90 border-white/10 text-white font-bold px-3 py-1.5 text-xs">
                {title}
            </TooltipContent>
        </Tooltip>
    );
};
