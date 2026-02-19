import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface TopicNavigationProps {
    previousTopic?: {
        title: string;
        chapter: string;
    };
    nextTopic?: {
        title: string;
        chapter: string;
    };
    onPrevious?: () => void;
    onNext?: () => void;
    className?: string;
}

export function TopicNavigation({
    previousTopic,
    nextTopic,
    onPrevious,
    onNext,
    className = "",
}: TopicNavigationProps) {
    return (
        <div className={`grid grid-cols-2 gap-4 ${className}`} dir="rtl">
            {/* Previous Topic Button (on the right in RTL) */}
            {previousTopic && (
                <Button
                    variant="outline"
                    onClick={onPrevious}
                    className="relative overflow-hidden h-auto p-4 flex flex-col items-end text-right group"
                >
                    {/* Glass overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

                    {/* Glow effect */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative flex items-center gap-2 w-full justify-end">
                        <div>
                            <p className="text-xs text-muted-foreground mb-0.5">הנושא הקודם</p>
                            <p className="font-semibold text-sm">{previousTopic.title}</p>
                            <p className="text-xs text-muted-foreground">{previousTopic.chapter}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                    </div>
                </Button>
            )}

            {/* Next Topic Button (on the left in RTL) */}
            {nextTopic && (
                <Button
                    variant="outline"
                    onClick={onNext}
                    className="relative overflow-hidden h-auto p-4 flex flex-col items-start text-left group"
                >
                    {/* Glass overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    {/* Glow effect */}
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative flex items-center gap-2 w-full justify-start">
                        <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        <div>
                            <p className="text-xs text-muted-foreground mb-0.5">הנושא הבא</p>
                            <p className="font-semibold text-sm">{nextTopic.title}</p>
                            <p className="text-xs text-muted-foreground">{nextTopic.chapter}</p>
                        </div>
                    </div>
                </Button>
            )}
        </div>
    );
}

export default TopicNavigation;