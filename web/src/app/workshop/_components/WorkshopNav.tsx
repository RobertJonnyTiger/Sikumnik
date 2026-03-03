"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PAGES = [
    { href: "/workshop", label: "⚙️ Component Lab", desc: "All 24 content blocks" },
    { href: "/workshop/chapter-start", label: "🚀 Chapter Start", desc: "Landing + Breadcrumb + Progression" },
    { href: "/workshop/chapter-end", label: "🏁 Chapter End", desc: "Summary + Quiz + Footer" },
];

export function WorkshopNav() {
    const pathname = usePathname();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-3 flex items-center gap-2" dir="ltr">
            <span className="text-zinc-500 text-xs font-mono mr-4 tracking-widest">WORKSHOP</span>
            {PAGES.map((p) => (
                <Link
                    key={p.href}
                    href={p.href}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === p.href
                            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        }`}
                >
                    {p.label}
                </Link>
            ))}
        </nav>
    );
}
