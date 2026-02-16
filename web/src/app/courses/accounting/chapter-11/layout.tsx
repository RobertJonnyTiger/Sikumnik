import type { Metadata } from "next";
import { createChapterMetadata } from "@/lib/chapter-metadata";
import chapterData from "@/data/chapters/accounting/chapter-11.json";

export const metadata: Metadata = createChapterMetadata(chapterData as any);

export default function Chapter11Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
