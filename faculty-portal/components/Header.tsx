"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronDown, HelpCircle, CalendarDays, ClipboardList } from "lucide-react";
import { facultyProfile } from "@/lib/data";

const pageMeta: Record<string, { title: string; sub: string; icon?: React.ElementType }> = {
  "/dashboard":    { title: "Dashboard",      sub: "Overview of your events and activity" },
  "/create-event": { title: "Create Event",   sub: "Build and submit a new event for approval" },
  "/my-events":    { title: "Event History",  sub: "Manage and track all your events", icon: ClipboardList },
};

export default function Header() {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Faculty Portal", sub: "EduEvents" };
  const PageIcon = meta.icon;
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <header
      className="fixed top-0 left-[240px] right-0 h-[60px] z-30 flex items-center px-6 gap-4"
      style={{
        background: "rgba(241,245,249,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3">
          {PageIcon && <PageIcon size={14} className="text-slate-500" />}
          <h2
            className="text-base font-bold text-slate-900 leading-none"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {meta.title}
          </h2>
          <span className="hidden md:block text-xs text-slate-400 truncate">{meta.sub}</span>
        </div>
      </div>

      {/* Date pill */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-slate-500 font-medium bg-white border border-slate-200">
        <CalendarDays size={13} className="text-slate-400" /> {today}
      </div>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search size={14} className="absolute left-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search events..."
          className="pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl
            focus:outline-none focus:ring-2 focus:border-transparent w-44 transition-all"
          style={{ "--tw-ring-color": "rgba(20,184,166,0.4)" } as React.CSSProperties}
        />
      </div>

      {/* Help */}
      <button className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
        <HelpCircle size={15} className="text-slate-400" />
      </button>

      {/* Notifications */}
      <button className="relative w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
        <Bell size={15} className="text-slate-500" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
      </button>

      {/* Avatar */}
      <button
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl text-white text-xs font-semibold transition-all"
        style={{ background: "linear-gradient(135deg, #0f1b35, #1e3a5f)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold"
          style={{ background: "linear-gradient(135deg, #14b8a6, #0d9488)" }}
        >
          {facultyProfile.initials}
        </div>
        <span className="hidden md:block">{facultyProfile.name.split(" ")[1]}</span>
        <ChevronDown size={12} className="opacity-60" />
      </button>
    </header>
  );
}
