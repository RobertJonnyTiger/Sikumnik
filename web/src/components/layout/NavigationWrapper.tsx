"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide sidebar on the landing page and the courses grid
    const isFullWidthPage = pathname === "/" || pathname === "/courses";

    return (
        <div className="flex min-h-screen">
            {!isFullWidthPage && (
                <Sidebar className="hidden md:flex" />
            )}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
