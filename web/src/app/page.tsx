"use client";

import Link from "next/link";
import {
  BookOpen,
  Clock,
  LayoutDashboard,
  GraduationCap,
  Flame,
  Trophy,
  ArrowLeft,
  PlayCircle,
  Settings,
  Sparkles,
  Calendar,
  Beaker,
  HelpCircle,
  Brain,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  // Mock Data - In a real app, this would come from a user context or API
  const stats = [
    { label: "רצף למידה", value: "5 ימים", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "שעות למידה", value: "12.5", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "משימות", value: "8/12", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  ];

  const continueLearning = {
    course: "התנהגות ארגונית",
    chapter: "פרק 4: מוטיבציה",
    progress: 65,
    href: "/courses/organizational-behavior/chapter-4",
    lastAccessed: "לפני 42 דקות"
  };

  const courses = [
    {
      title: "חשבונאות א'",
      id: "accounting",
      progress: 45,
      href: "/courses/accounting",
      color: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-600",
      status: "פעיל"
    },
    {
      title: "מיקרו כלכלה",
      id: "micro",
      progress: 20,
      href: "/courses/microeconomics",
      color: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-600",
      status: "פעיל"
    },
    {
      title: "התנהגות ארגונית",
      id: "ob",
      progress: 65,
      href: "/courses/organizational-behavior",
      color: "from-violet-500/20 to-violet-600/5",
      iconColor: "text-violet-600",
      status: "פעיל"
    },
    {
      title: "סטטיסטיקה א'",
      id: "stats",
      progress: 0,
      href: "/courses/statistics",
      color: "from-slate-500/20 to-slate-600/5",
      iconColor: "text-muted-foreground",
      status: "נעול"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 md:pb-8" dir="rtl">

      {/* Header Section */}
      <header className="px-6 pt-10 pb-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-800">
              <SparklesIcon className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Dashboard V3</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
              אהלן, <span className="text-sky-800">סטודנט!</span> 👋
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-xl">
              מוכן להמשיך מאיפה שהפסקת? המוח שלך כבר התחמם, בוא ניתן בראש.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/workshop">
              <div className="flex items-center gap-3 bg-zinc-950 text-white p-2 px-4 rounded-2xl shadow-lg hover:bg-zinc-900 transition-colors border border-zinc-800 group">
                <Beaker className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <div className="text-right">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Developer</p>
                  <p className="text-sm font-black leading-none">Workshop</p>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3 bg-card border border-border/50 p-2 rounded-2xl shadow-sm">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Calendar className="w-5 h-5 text-sky-800" />
              </div>
              <div className="px-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">תקופת מבחנים</p>
                <p className="text-sm font-black leading-none">נותרו 14 ימים</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 max-w-7xl mx-auto space-y-10">

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                </div>
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Continue Learning + Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Hero Card: Continue Learning */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-sky-800" />
              להמשיך ללמוד
            </h2>
            <Link href={continueLearning.href}>
              <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-background to-secondary border border-white/10 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.01]">

                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors" />

                <div className="relative p-8 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-white/10 text-foreground hover:bg-white/20 border-0">
                        {continueLearning.course}
                      </Badge>
                      <span className="text-foreground/40 text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        נוגן לאחרונה: {continueLearning.lastAccessed}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-3xl font-black text-foreground mb-2 leading-tight group-hover:text-primary-foreground transition-colors">
                        {continueLearning.chapter}
                      </h3>
                      <p className="text-foreground/60 text-sm line-clamp-2">
                        המשך בדיוק מהנקודה בה עצרת בסשן האחרון.
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 max-w-md">
                      <div className="flex justify-between text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                        <span>התקדמות בפרק</span>
                        <span>{continueLearning.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                          style={{ width: `${continueLearning.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary text-foreground flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform">
                      <ArrowLeft className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Actions / Mini Bento */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-sky-800" />
              קיצורי דרך
            </h2>
            <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
              <QuickAction title="ספרייה" icon={BookOpen} href="/library" color="text-pink-500" bg="bg-pink-500/10" />
              <QuickAction title="סימולציות" icon={BrainCircuit} href="/simulations" color="text-violet-500" bg="bg-violet-500/10" />
              <QuickAction title="הגדרות" icon={Settings} href="/settings" color="text-muted-foreground" bg="bg-slate-500/10" />
              <QuickAction title="עזרה" icon={HelpCircle} href="/support" color="text-cyan-500" bg="bg-cyan-500/10" />
            </div>
          </div>

        </section>

        {/* My Courses Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-sky-800" />
              הקורסים שלי
            </h2>
            <button className="text-sm font-bold text-sky-800 hover:underline">
              צפייה בהכל
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link key={course.id} href={course.href} className="group">
                <Card className="h-full border-border/50 transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden relative">
                  <div className={cn("absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", course.color)} />

                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <div className={cn("p-2 rounded-xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm", course.iconColor)}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      {course.status === "נעול" && (
                        <Badge variant="outline" className="text-[10px]">בקרוב</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-sky-800 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      תואר ראשון • ניהול
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 mt-auto">
                    {course.status !== "נעול" ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                          <span>הושלמו {course.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/80 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
                        <LockIcon className="w-3 h-3" />
                        התוכן אינו זמין כעת
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

// Sub-components for cleaner code
interface QuickActionProps {
  title: string;
  icon: React.ElementType;
  href: string;
  color: string;
  bg: string;
}

function QuickAction({ title, icon: Icon, href, color, bg }: QuickActionProps) {
  return (
    <Link href={href} className="block h-full">
      <div className="h-full bg-card border border-border/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all hover:bg-accent/5 hover:border-accent/20 group text-center">
        <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", bg, color)}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">
          {title}
        </span>
      </div>
    </Link>
  );
}

function SparklesIcon(props: React.ComponentProps<"svg">) {
  return <Sparkles {...props} />;
}

function BrainCircuit(props: React.ComponentProps<"svg">) {
  return <Brain {...props} />;
}

function LockIcon(props: React.ComponentProps<"svg">) {
  return <Lock {...props} />;
}
