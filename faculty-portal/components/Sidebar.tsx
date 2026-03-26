"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusSquare,
  ClipboardList,
  Bell,
  Settings,
  BookOpen,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { facultyProfile } from "@/lib/data";

const navSections = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
      { href: "/create-event", label: "Create Event", icon: PlusSquare, badge: "New" },
      { href: "/my-events", label: "Event History", icon: ClipboardList, badge: "6" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/notifications", label: "Notifications", icon: Bell, badge: "3" },
      { href: "/settings", label: "Settings", icon: Settings, badge: null },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[240px] flex flex-col z-40"
      style={{ background: "var(--sidebar-bg)", borderRight: "1px solid var(--sidebar-border)" }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #14b8a6, #0d9488)", boxShadow: "0 0 20px rgba(20,184,166,0.4)" }}
          >
            <BookOpen size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
              EduEvents
            </p>
            <p className="text-xs font-medium" style={{ color: "#2dd4bf" }}>Faculty Portal</p>
          </div>
        </div>
      </div>

      {/* Faculty Card */}
      <div className="mx-3 my-4 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #14b8a6, #0d9488)" }}
          >
            {facultyProfile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{facultyProfile.name}</p>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{facultyProfile.title}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" style={{ boxShadow: "0 0 6px #2dd4bf" }} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 overflow-y-auto space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold uppercase tracking-widest px-2 mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
              {section.label}
            </p>
            <nav className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, badge }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`}>
                    <Icon size={17} className="flex-shrink-0" />
                    <span className="flex-1">{label}</span>
                    {badge === "New" ? (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{ background: "rgba(20,184,166,0.2)", color: "#2dd4bf", border: "1px solid rgba(20,184,166,0.3)" }}
                      >
                        NEW
                      </span>
                    ) : badge ? (
                      <span
                        className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold"
                        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                      >
                        {badge}
                      </span>
                    ) : active ? (
                      <ChevronRight size={13} style={{ color: "#2dd4bf" }} />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom tip */}
      <div className="mx-3 mb-3 p-3 rounded-xl" style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.15)" }}>
        <div className="flex items-start gap-2">
          <Sparkles size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#2dd4bf" }} />
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Events submitted for admin approval appear in <span style={{ color: "#5eead4" }}>Event History</span>.
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4" style={{ borderTop: "1px solid var(--sidebar-border)", paddingTop: "12px" }}>
        <button className="nav-item w-full hover:text-red-400 hover:!bg-red-500/10">
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
