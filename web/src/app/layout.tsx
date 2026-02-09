import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google"; // Swapped David for Rubik
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
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
          "min-h-screen bg-[#0a051e] font-sans antialiased",
          heebo.className,
          rubik.variable
        )}
      >
        <NavigationWrapper>
          {children}
        </NavigationWrapper>
      </body>
    </html>
  );
}
