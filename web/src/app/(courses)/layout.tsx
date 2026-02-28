import type { Metadata } from "next";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
    title: {
        default: "קורסים | סיכומניק",
        template: "%s | סיכומניק",
    },
};

export default function CoursesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen pt-16 md:pt-20 lg:pt-24 bg-background">
            {/* Desktop Sidebar */}
            <aside className="fixed top-24 bottom-0 right-0 z-30 hidden w-72 lg:block">
                <div className="h-full px-6 py-6 overflow-y-auto">
                    <Sidebar />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:pr-72 w-full max-w-[100vw] overflow-x-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 min-h-[calc(100vh-6rem)]">
                    {children}
                </div>
            </main>
        </div>
    );
}
