import Link from "next/link";

export default function NotFound() {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-6"
            dir="rtl"
        >
            <div className="glass-card p-10 text-center max-w-lg space-y-8">
                <div className="space-y-2">
                    <p className="text-8xl font-black text-sky-800/30 leading-none">
                        404
                    </p>
                    <h2 className="text-2xl font-bold text-foreground">
                        הדף לא נמצא
                    </h2>
                </div>
                <p className="text-text-secondary leading-relaxed">
                    הדף שחיפשתם לא קיים, ייתכן שהקישור שגוי או שהתוכן הועבר.
                </p>
                <div className="flex gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        חזרה לדף הבית
                    </Link>
                    <Link
                        href="/courses"
                        className="px-6 py-3 bg-secondary text-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        לכל הקורסים
                    </Link>
                </div>
            </div>
        </div>
    );
}
