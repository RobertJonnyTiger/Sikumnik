import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gradient?: boolean;
}

export function GlassCard({ children, className, gradient = false, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl shadow-xl relative",
                gradient && "neon-border", // Optional neon border effect
                className
            )}
            {...props}
        >
            {gradient && (
                <div className="absolute top-0 right-0 w-1 h-full bg-linear-to-b from-pink-500 to-indigo-500 opacity-80" />
            )}
            <div className="p-6 relative z-10">{children}</div>
        </div>
    );
}
