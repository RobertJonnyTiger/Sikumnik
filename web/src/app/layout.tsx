import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { Playpen_Sans_Hebrew, Varela_Round } from "next/font/google";
import { Agentation } from "agentation";

const mainFont = Varela_Round({
    subsets: ["hebrew", "latin"] as any,
    variable: "--font-main",
    weight: "400",
    display: "swap",
});

const handwriting = Playpen_Sans_Hebrew({
    subsets: ["hebrew", "latin"] as any,
    variable: "--font-handwriting",
    weight: ["400", "700"],
    display: "swap",
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
                    "min-h-screen bg-background font-main antialiased",
                    mainFont.variable,
                    handwriting.variable
                )}
            >
                <NavigationWrapper>
                    {children}
                </NavigationWrapper>
                <Agentation />
            </body>
        </html>
    );
}
