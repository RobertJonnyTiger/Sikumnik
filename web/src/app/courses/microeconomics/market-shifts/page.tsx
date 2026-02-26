import { ChapterTemplate } from "@/components/core/ChapterTemplate";
import type { ChapterData } from "@/types/chapter";
import chapterData from "@/data/microeconomics/chapters/market-shifts.json";

export default function MarketShiftsPage() {
  const data = chapterData as unknown as ChapterData;
  return <ChapterTemplate data={data} />;
}
