import { Metadata } from 'next';
import MarketEquilibriumMaster from '@/components/economics/MarketEquilibriumMaster';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'מודל שיווי משקל תחרותי - מאסטר טבלת שינויים | סיכומניק',
    description: 'טבלה אינטראקטיבית ורספונסיבית לניתוח והבנת שינויים בשוק במודל היצע וביקוש, כולל התערבות ממשלתית וסחר חוץ.',
};

export default function EquilibriumTablePage() {
    return (
        <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 md:px-8 font-sans antialiased text-slate-900" dir="rtl">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-8">
                    <Link
                        href="/courses/microeconomics"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm font-medium"
                    >
                        <ArrowRight size={16} />
                        חזרה לקורס מיקרוכלכלה
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-8">
                    <MarketEquilibriumMaster />
                </div>
            </div>
        </div>
    );
}
