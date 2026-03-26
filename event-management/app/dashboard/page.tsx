"use client";

import Link from "next/link";
import {
  CalendarDays,
  BookMarked,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  ArrowRight,
  Zap,
  Star,
  ChevronRight,
  GraduationCap,
  Sun,
  Target,
  Lightbulb,
} from "lucide-react";
import { studentStats, registeredEvents, allEvents } from "@/lib/data";
import { getEventIcon } from "@/lib/eventIcons";

const statCards = [
  {
    label: "Registered Events",
    value: studentStats.totalRegistered,
    icon: BookMarked,
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  {
    label: "Upcoming Events",
    value: studentStats.upcomingEvents,
    icon: CalendarDays,
    color: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-100",
  },
  {
    label: "Completed",
    value: studentStats.completedEvents,
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    label: "Certificates",
    value: studentStats.certificatesEarned,
    icon: Award,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100",
  },
];

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-700",
  Cultural: "bg-purple-100 text-purple-700",
  Business: "bg-orange-100 text-orange-700",
  Arts: "bg-teal-100 text-teal-700",
  Health: "bg-green-100 text-green-700",
};

export default function DashboardPage() {
  const upcoming = allEvents.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-indigo-400/20 rounded-full blur-lg" />
        <div className="absolute top-4 right-40 w-2 h-2 bg-white/60 rounded-full animate-float" />
        <div className="absolute bottom-6 right-24 w-3 h-3 bg-blue-300/60 rounded-full animate-float" style={{ animationDelay: "1s" }} />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-white/20 text-white border border-white/20 text-xs inline-flex items-center gap-1.5">
                <GraduationCap size={12} />
                Student Portal
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              Good Morning, Thiru!
              <Sun size={20} className="text-amber-200" />
            </h1>
            <p className="text-blue-200 text-sm max-w-md">
              You have <span className="text-white font-semibold">3 upcoming events</span> this month. Keep exploring and registering for new experiences!
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/events"
                className="px-4 py-2 bg-white text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Zap size={14} /> Explore Events
              </Link>
              <Link
                href="/my-events"
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
              >
                My Events
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex w-24 h-24 bg-white/10 rounded-3xl items-center justify-center animate-float">
            <Target size={46} className="text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg, text, border }, i) => (
          <div
            key={label}
            className={`bg-white rounded-2xl p-4 border ${border} card-hover`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${text}`} />
            </div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-0.5`}>
              {value}
            </div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div>
              <h3 className="font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Upcoming Events</h3>
              <p className="text-xs text-gray-500 mt-0.5">Next scheduled activities</p>
            </div>
            <Link href="/events" className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {upcoming.map((event) => {
              const EventIcon = getEventIcon(event.image);
              return (
                <div key={event.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-blue-50/40 transition-colors group">
                  <div className={`w-12 h-12 bg-gradient-to-br ${event.gradient} rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <EventIcon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{event.title}</h4>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} /> {event.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={11} /> {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`badge text-xs ${categoryColors[event.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {event.category}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Recent Registrations</h3>
            </div>
            <div className="p-4 space-y-3">
              {registeredEvents.map((ev) => {
                const EventIcon = getEventIcon(ev.image);
                return (
                  <div key={ev.id} className="flex items-center gap-3">
                    <div className={`w-9 h-9 bg-gradient-to-br ${ev.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <EventIcon size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{ev.title}</p>
                      <p className="text-xs text-gray-400">{ev.registeredAt}</p>
                    </div>
                    <span className={`badge text-xs ${
                      ev.registrationStatus === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : ev.registrationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {ev.registrationStatus}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star size={14} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1 inline-flex items-center gap-1.5">
                  Pro Tip <Lightbulb size={14} className="text-blue-700" />
                </h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Register early for events to secure your spot and get priority seating. Some events have limited seats!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
