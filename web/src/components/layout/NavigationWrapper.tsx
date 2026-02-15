"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar"; // Ensure correct import path if needed

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide sidebar on landing page, courses grid, and standalone prototypes (Zen Mode)
    const isFullWidthPage =
        pathname === "/" ||
        pathname === "/courses" ||
        pathname?.startsWith("/golden-prototype");

    return (
        <div className="flex min-h-screen relative">
            {!isFullWidthPage && (
                <Sidebar className="hidden md:flex" />
            )}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
