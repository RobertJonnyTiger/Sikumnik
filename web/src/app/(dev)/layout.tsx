"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beaker, Settings, Layout, Palette, Home } from "lucide-react";

export default function DevLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-muted/10 relative">
            {/* Global Dev Header */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-12 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6 pointer-events-auto" dir="ltr">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 pr-4 border-r border-zinc-800">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sikumnik Dev Hub</span>
                    </div>
                    
                    <nav className="flex items-center gap-1">
                        <DevNavLink href="/workshop" active={pathname === "/workshop"}>
                            <Layout className="w-3 h-3" />
                            Workshop
                        </DevNavLink>
                        <DevNavLink href="/workshop/colors" active={pathname === "/workshop/colors"}>
                            <Palette className="w-3 h-3" />
                            Colors
                        </DevNavLink>
                    </nav>
                </div>

                <Link href="/" className="flex items-center gap-2 text-[10px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-widest group">
                    Back to Production
                    <Home className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            <div className="pt-12 min-h-screen">
                {children}
            </div>
        </div>
    );
}

function DevNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link 
            href={href}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                active 
                ? "bg-zinc-800 text-white shadow-sm" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
            }`}
        >
            {children}
        </Link>
    );
}
