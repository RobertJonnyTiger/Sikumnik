import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AnalogyBlockProps {
    text: string;
    className?: string;
}

export function AnalogyBlock({ text, className }: AnalogyBlockProps) {
    return (
        <div className={cn("relative group mt-10", className)}>
            {/* Multi-layered glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3713ec] via-[#00f3ff] to-[#3713ec] rounded-3xl blur-lg opacity-10 group-hover:opacity-20 transition duration-700" />

            <div className="relative bg-[#1e1933]/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3713ec]/10 blur-3xl -z-10" />

                <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-[#3713ec] to-[#00f3ff] p-4 rounded-2xl shrink-0 shadow-lg shadow-[#3713ec]/30 group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <h4 className="text-sm md:text-base font-black text-[#00f3ff] uppercase tracking-[0.3em] font-rubik leading-none">תובנה מהשטח</h4>
                            <div className="h-[2px] w-16 bg-gradient-to-r from-[#00f3ff] to-transparent opacity-40" />
                        </div>
                        <div
                            className="text-white text-2xl md:text-3xl leading-snug font-rubik font-light italic opacity-95 pr-2 border-r-2 border-[#00f3ff]/20"
                            dangerouslySetInnerHTML={{ __html: text }}
                        />
                    </div>
                </div>

                {/* Knowledge Pulse Indicator - repositioned and more vibrant */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-[#00f3ff]/10 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#00f3ff] rounded-full animate-ping" />
                    </div>
                </div>
            </div>
        </div>
    );
}
