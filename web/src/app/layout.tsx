import type { Metadata } from "next";
import "./globals.css";
// import "katex/dist/katex.min.css"; // Moved to CDN in head for reliability
import { cn } from "@/lib/utils";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { Playpen_Sans_Hebrew, Noto_Sans_Hebrew, JetBrains_Mono, Assistant, Heebo } from "next/font/google";
import { Agentation } from "agentation";

const mainFont = Noto_Sans_Hebrew({
    subsets: ["hebrew", "latin"] as any,
    variable: "--font-main",
    weight: ["400", "500", "700", "900"],
    display: "swap",
});

const assistant = Assistant({
    subsets: ["hebrew", "latin"],
    variable: "--font-assistant",
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    display: "swap",
});

const heebo = Heebo({
    subsets: ["hebrew", "latin"],
    variable: "--font-heebo",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
});

const handwriting = Playpen_Sans_Hebrew({
    subsets: ["hebrew", "latin"] as any,
    variable: "--font-handwriting",
    weight: ["400", "700"],
    display: "swap",
});

const mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://sikumnik.co.il"),
    title: {
        default: "סיכומניק — פלטפורמת לימוד חשבונאות",
        template: "%s | סיכומניק",
    },
    description: "סיכומים, תרגילים ומדריכים לסטודנטים בחשבונאות — פלטפורמת לימוד בעברית",
    keywords: ["חשבונאות", "סיכומים", "מבוא לחשבונאות", "לימודים", "סטודנטים", "אוניברסיטה"],
    authors: [{ name: "סיכומניק" }],
    openGraph: {
        type: "website",
        locale: "he_IL",
        siteName: "סיכומניק",
        title: "סיכומניק — פלטפורמת לימוד חשבונאות",
        description: "סיכומים, תרגילים ומדריכים לסטודנטים בחשבונאות",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="he" dir="rtl">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
                    integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
                    crossOrigin="anonymous"
                />
            </head>
            <body
                suppressHydrationWarning={true}
                className={cn(
                    "min-h-screen bg-background font-main antialiased",
                    mainFont.variable,
                    assistant.variable,
                    heebo.variable,
                    handwriting.variable,
                    mono.variable
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
