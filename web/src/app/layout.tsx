import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

import { David_Libre } from "next/font/google"; // Import David Libre

const david = David_Libre({
  weight: ["400", "500", "700"],
  subsets: ["hebrew", "latin"],
  variable: "--font-david",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sikumnik Platform",
  description: "The Hall of Knowledge for Tel Aviv Students",
};

import { Sidebar } from "@/components/layout/Sidebar";

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
          "min-h-screen bg-background font-sans antialiased",
          heebo.className,
          david.variable
        )}
      >
        <div className="flex min-h-screen">
          <Sidebar className="hidden md:flex w-72 shrink-0 border-l border-slate-800" />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
