import { cn } from "@/lib/utils";

interface AnalogyBlockProps {
    text: string;
    className?: string;
}

export function AnalogyBlock({ text, className }: AnalogyBlockProps) {
    return (
        <div className={cn("mt-4 p-4 bg-indigo-950/30 border-r-4 border-indigo-500 rounded-r-none rounded-l-lg", className)}>
            <h4 className="text-sm font-bold text-indigo-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                <span>🍹</span>
                <span>תכל'ס</span>
            </h4>
            <div
                className="text-indigo-100 text-lg leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: text }}
            />
        </div>
    );
}
