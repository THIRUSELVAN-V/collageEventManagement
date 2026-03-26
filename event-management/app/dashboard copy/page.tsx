"use client";

import Link from "next/link";
import {
  PlusCircle, ArrowUpRight, CheckCircle2, Clock3, FileEdit,
  XCircle, Users, CalendarDays, ChevronRight, Flame,
} from "lucide-react";
import { dashboardStats, facultyEvents, recentActivity, facultyProfile } from "@/lib/data";

const statusCfg = {
  approved: { label: "Approved", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle2, accent: "#059669" },
  pending:  { label: "Pending",  color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200",   icon: Clock3,        accent: "#d97706" },
  draft:    { label: "Draft",    color: "text-slate-600",   bg: "bg-slate-100",  border: "border-slate-200",   icon: FileEdit,      accent: "#64748b" },
  rejected: { label: "Rejected", color: "text-red-700",     bg: "bg-red-50",     border: "border-red-200",     icon: XCircle,       accent: "#dc2626" },
};

const activityDot = {
  success: "bg-emerald-500",
  info: "bg-blue-500",
  error: "bg-red-500",
  neutral: "bg-slate-400",
};

export default function DashboardPage() {
  const upcoming = facultyEvents.filter((e) => e.status === "approved").slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* HERO BANNER */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white"
        style={{ background: "linear-gradient(135deg, #0f1b35 0%, #1e3a5f 50%, #0d5c54 100%)" }}
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #14b8a6, transparent)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)", transform: "translateY(50%)" }} />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold mb-4"
              style={{ background: "rgba(20,184,166,0.2)", color: "#5eead4", border: "1px solid rgba(20,184,166,0.3)" }}>
              <Flame size={12} /> Faculty Dashboard
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2"
              style={{ fontFamily: "'DM Serif Display', serif" }}>
              Welcome back, {facultyProfile.name.split(" ")[1]} 👋
            </h1>
            <p className="text-sm opacity-70 max-w-md leading-relaxed">
              You have{" "}
              <span className="font-semibold" style={{ color: "#5eead4" }}>{dashboardStats.pending} events</span>{" "}
              awaiting admin approval and{" "}
              <span className="font-semibold" style={{ color: "#5eead4" }}>{dashboardStats.upcomingThisMonth} upcoming</span>{" "}
              this month.
            </p>
            <div className="flex gap-3 mt-5">
              <Link href="/create-event" className="btn-primary text-sm px-5 py-2.5">
                <PlusCircle size={15} /> New Event
              </Link>
              <Link href="/my-events"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                View All Events <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Mini stat grid */}
          <div className="grid grid-cols-2 gap-3 md:w-56 flex-shrink-0">
            {[
              { label: "Events Created", val: dashboardStats.totalEvents, icon: "📋" },
              { label: "Registrations",  val: dashboardStats.totalRegistrations, icon: "👥" },
              { label: "Avg Fill Rate",  val: `${dashboardStats.avgFillRate}%`, icon: "📈" },
              { label: "Rating",         val: `${facultyProfile.rating}★`, icon: "⭐" },
            ].map(({ label, val, icon }) => (
              <div key={label} className="rounded-2xl p-3 text-center"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-lg font-bold text-white">{val}</div>
                <div className="text-[10px] opacity-50 mt-0.5 leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STATUS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(["approved", "pending", "draft", "rejected"] as const).map((status, i) => {
          const cfg = statusCfg[status];
          const Icon = cfg.icon;
          const counts = { approved: dashboardStats.approved, pending: dashboardStats.pending, draft: dashboardStats.drafts, rejected: dashboardStats.rejected };
          return (
            <div key={status} className="card p-5 relative overflow-hidden"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: cfg.accent }} />
              <div className={`w-9 h-9 ${cfg.bg} ${cfg.border} border rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={17} className={cfg.color} />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-0.5">{counts[status]}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* TWO COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Upcoming events */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <div>
              <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Upcoming Approved Events
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Running events under your coordination</p>
            </div>
            <Link href="/my-events" className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: "#14b8a6" }}>
              View All <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {upcoming.map((ev) => {
              const fill = Math.round((ev.registeredCount / ev.maxParticipants) * 100);
              const hot = fill > 80;
              return (
                <div key={ev.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group">
                  <div className={`w-12 h-12 bg-gradient-to-br ${ev.gradient} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                    {ev.banner}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-semibold text-slate-800 truncate">{ev.title}</h4>
                      {hot && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-200 flex-shrink-0">
                          🔥 Hot
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><CalendarDays size={11} />{ev.date}</span>
                      <span className="flex items-center gap-1"><Users size={11} />{ev.registeredCount}/{ev.maxParticipants}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-40">
                      <div className="h-full rounded-full transition-all"
                        style={{
                          width: `${fill}%`,
                          background: hot
                            ? "linear-gradient(90deg,#f97316,#ef4444)"
                            : "linear-gradient(90deg,#14b8a6,#0d9488)",
                        }} />
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50">
            <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Recent Activity
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Latest updates</p>
          </div>
          <div className="p-4 space-y-2">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityDot[item.type as keyof typeof activityDot]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700">{item.action}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{item.event}</p>
                  <p className="text-[10px] text-slate-300 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: "🚀", title: "Create New Event",  sub: "Start building your next event",            href: "/create-event", bg: "from-teal-500 to-teal-700" },
          { icon: "📊", title: "View All Events",    sub: "Track registrations & statuses",            href: "/my-events",    bg: "from-blue-500 to-blue-700" },
          { icon: "🏆", title: "Top Performers",     sub: `${facultyProfile.totalParticipants} total participants`, href: "/my-events", bg: "from-amber-500 to-orange-600" },
        ].map(({ icon, title, sub, href, bg }) => (
          <Link key={title} href={href}
            className="group card p-5 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
            <div className={`w-12 h-12 bg-gradient-to-br ${bg} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800">{title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

    </div>
  );
}
