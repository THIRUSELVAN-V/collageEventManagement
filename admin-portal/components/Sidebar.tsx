"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShieldCheck, Bell, Settings,
  LogOut, ShieldAlert, ChevronRight, Activity,
} from "lucide-react";
import { adminProfile, systemStats } from "@/lib/data";

const navItems = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard, badge: null },
  { href: "/approvals",  label: "Event Approvals", icon: ShieldCheck, badge: String(systemStats.pending) },
];

const bottomItems = [
  { href: "/notifications", label: "Notifications", icon: Bell,     badge: "5" },
  { href: "/settings",      label: "Settings",      icon: Settings,  badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[232px] flex flex-col z-40"
      style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
              boxShadow: "0 0 20px rgba(124,58,237,0.5)",
            }}
          >
            <ShieldAlert size={17} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: "'Fraunces',serif" }}>
              EduEvents
            </p>
            <p className="text-xs font-semibold" style={{ color: "#a78bfa" }}>Admin Control</p>
          </div>
        </div>
      </div>

      {/* Admin profile chip */}
      <div
        className="mx-3 my-4 p-3 rounded-2xl"
        style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
          >
            {adminProfile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{adminProfile.name}</p>
            <p className="text-xs truncate" style={{ color: "#a78bfa" }}>{adminProfile.role}</p>
          </div>
          {/* Live dot */}
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: "#34d399", boxShadow: "0 0 6px #34d399" }}
          />
        </div>
      </div>

      {/* Pending alert pill */}
      {systemStats.pending > 0 && (
        <div
          className="mx-3 mb-3 px-3 py-2.5 rounded-xl flex items-center gap-2.5"
          style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <Activity size={13} style={{ color: "#fbbf24" }} className="flex-shrink-0" />
          <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.65)" }}>
            <span style={{ color: "#fde68a", fontWeight: 700 }}>{systemStats.pending} events</span> awaiting your review
          </p>
        </div>
      )}

      {/* Nav */}
      <div className="flex-1 px-3 overflow-y-auto space-y-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>
            Management
          </p>
          <nav className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon, badge }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} className={`nav-link ${active ? "active" : ""}`}>
                  <Icon size={17} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {badge && Number(badge) > 0 ? (
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                      style={{ background: "#f59e0b", color: "#fff" }}
                    >
                      {badge}
                    </span>
                  ) : active ? (
                    <ChevronRight size={13} style={{ color: "#a78bfa" }} />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>
            Account
          </p>
          <nav className="space-y-0.5">
            {bottomItems.map(({ href, label, icon: Icon, badge }) => (
              <Link key={href} href={href} className="nav-link">
                <Icon size={17} className="flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* System info */}
      <div
        className="mx-3 mb-3 p-3 rounded-xl"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="grid grid-cols-3 gap-1 text-center">
          {[
            { label: "Events", val: systemStats.totalEvents },
            { label: "Faculty", val: systemStats.totalFaculty },
            { label: "Students", val: `${Math.round(systemStats.totalStudentRegistrations / 1000 * 10) / 10}k` },
          ].map(({ label, val }) => (
            <div key={label}>
              <p className="text-white text-sm font-bold">{val}</p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4" style={{ borderTop: "1px solid var(--sidebar-border)", paddingTop: "12px" }}>
        <button className="nav-link w-full hover:!text-rose-400 hover:!bg-rose-500/10">
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
