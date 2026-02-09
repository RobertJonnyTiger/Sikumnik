import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";

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
          "min-h-screen bg-[#0a051e] font-sans antialiased"
        )}
      >
        <NavigationWrapper>
          {children}
        </NavigationWrapper>
      </body>
    </html>
  );
}
