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
    chapterTitle?: string;
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-3 p-2.5 bg-background/80 backdrop-blur-2xl border border-primary/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
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

                    <div className="w-px h-5 bg-primary/10 mx-1.5" />

                    {/* Topic Steps */}
                    {tabs?.map((tab, idx) => (
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
                            ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30 ring-2 ring-primary/30"
                            : isCompleted
                                ? "bg-secondary text-secondary-foreground hover:brightness-110"
                                : "bg-muted text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground border border-border/50"
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
            <TooltipContent side="top" className="bg-primary border-primary/20 text-primary-foreground font-black px-4 py-2 text-sm rounded-xl shadow-xl mb-2">
                {title}
            </TooltipContent>
        </Tooltip>
    );
};
