"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronDown, Shield, CalendarDays } from "lucide-react";
import { adminProfile } from "@/lib/data";

const pageMeta: Record<string, { title: string; sub: string }> = {
  "/dashboard": { title: "Admin Dashboard",   sub: "System overview & analytics" },
  "/approvals": { title: "Event Approvals",   sub: "Review, approve or reject event submissions" },
};

export default function Header() {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? { title: "Admin Panel", sub: "EduEvents" };
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <header
      className="fixed top-0 left-[232px] right-0 h-[58px] z-30 flex items-center px-6 gap-4"
      style={{
        background: "rgba(244,243,251,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(139,92,246,0.1)",
      }}
    >
      {/* Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3">
          <h2 className="text-[15px] font-bold text-ink leading-none" style={{ fontFamily: "'Fraunces',serif" }}>
            {meta.title}
          </h2>
          <span className="hidden md:block text-xs text-ink-light truncate">{meta.sub}</span>
        </div>
      </div>

      {/* Date */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-white border border-violet-100 text-ink-muted">
        <CalendarDays size={12} />
        {today}
      </div>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search size={13} className="absolute left-3 text-ink-faint" />
        <input
          type="text"
          placeholder="Search events, faculty..."
          className="pl-9 pr-4 py-2 text-xs bg-white border border-violet-100 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent
            w-48 text-ink placeholder-ink-faint transition-all"
        />
      </div>

      {/* Bell */}
      <button className="relative w-8 h-8 rounded-xl bg-white border border-violet-100 flex items-center justify-center hover:bg-violet-50 transition-colors">
        <Bell size={14} className="text-ink-muted" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 rounded-full text-white text-[9px] font-bold flex items-center justify-center">5</span>
      </button>

      {/* Admin badge */}
      <button
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl text-white text-xs font-semibold"
        style={{ background: "linear-gradient(135deg,#5b21b6,#7c3aed)", border: "1px solid rgba(139,92,246,0.3)" }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          {adminProfile.initials}
        </div>
        <Shield size={11} className="opacity-70" />
        <span className="hidden md:block">Admin</span>
        <ChevronDown size={11} className="opacity-60" />
      </button>
    </header>
  );
}
