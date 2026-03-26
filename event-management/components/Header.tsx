"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, ChevronDown, Hand } from "lucide-react";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back, Thiru  " },
  "/events": { title: "Register Events", subtitle: "Discover and join upcoming events" },
  "/my-events": { title: "My Events", subtitle: "Track your registered events" },
};

export default function Header() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || { title: "EduEvents", subtitle: "Student Portal" };
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-blue-100 z-30 flex items-center px-6 gap-4">
      <div className="flex-1">
        <h2 className="text-lg font-bold text-gray-900 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
          {page.title}
        </h2>
        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
          {pathname === "/dashboard" && <Hand className="w-3.5 h-3.5 text-blue-500" />}
          <span>{page.subtitle}</span>
        </p>
      </div>

      <div className="hidden md:block text-xs text-gray-400 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
        {today}
      </div>

      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-52 transition-all"
        />
      </div>

      <button className="relative w-9 h-9 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors border border-blue-100">
        <Bell className="w-4 h-4 text-blue-600" />
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
          3
        </span>
      </button>

      <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-xl transition-all shadow-sm shadow-blue-200">
        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          AK
        </div>
        <span className="text-xs text-white font-semibold">Thiru</span>
        <ChevronDown className="w-3 h-3 text-blue-200" />
      </button>
    </header>
  );
}
