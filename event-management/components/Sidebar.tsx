"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  BookMarked,
  Bell,
  Settings,
  GraduationCap,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/events", label: "Register Events", icon: CalendarDays },
  { href: "/my-events", label: "My Events", icon: BookMarked },
];

const bottomItems = [
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-blue-100 flex flex-col z-40 shadow-sm">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              EduEvents
            </h1>
            <p className="text-xs text-blue-500 font-medium">Student Portal</p>
          </div>
        </div>
      </div>

      {/* Student Profile */}
      <div className="mx-4 my-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Thiruselvan v</p>
            <p className="text-xs text-blue-500 truncate">B.Tech CSE · Sem 5</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full ring-2 ring-white"></div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 px-3 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Main Menu</p>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`sidebar-link ${active ? "active" : "text-gray-600"}`}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
                <span>{label}</span>
                {active && (
                  <Sparkles className="w-3 h-3 ml-auto opacity-70" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Account</p>
          <nav className="space-y-1">
            {bottomItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="sidebar-link text-gray-500">
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-blue-50">
        <button className="sidebar-link w-full text-red-400 hover:text-red-600 hover:bg-red-50">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
