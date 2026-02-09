import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { Playpen_Sans, Varela_Round } from "next/font/google";

const mainFont = Varela_Round({
    subsets: ["hebrew", "latin"],
    variable: "--font-main",
    weight: "400",
});

const handwriting = Playpen_Sans({
    subsets: ["hebrew", "latin"],
    variable: "--font-handwriting",
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "Sikumnik Platform",
    description: "The Hall of Knowledge for Tel Aviv Students",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="he" dir="rtl">
            <body
                suppressHydrationWarning={true}
                className={cn(
                    "min-h-screen bg-[#0f172a] font-main antialiased",
                    mainFont.variable,
                    handwriting.variable
                )}
            >
                <NavigationWrapper>
                    {children}
                </NavigationWrapper>
            </body>
        </html>
    );
}
