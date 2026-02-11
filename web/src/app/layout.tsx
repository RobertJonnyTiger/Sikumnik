import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";
import { Playpen_Sans_Hebrew, Noto_Sans_Hebrew } from "next/font/google";
import { Agentation } from "agentation";

const mainFont = Noto_Sans_Hebrew({
    subsets: ["hebrew", "latin"] as any,
    variable: "--font-main",
    weight: ["400", "500", "700", "900"],
    display: "swap",
});

const handwriting = Playpen_Sans_Hebrew({
    subsets: ["hebrew", "latin"] as any,
    variable: "--font-handwriting",
    weight: ["400", "700"],
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
