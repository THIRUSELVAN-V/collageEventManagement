"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Ticket,
  Download,
  Share2,
  Search,
  ListFilter,
  Trophy,
  Hourglass,
  ClipboardList,
  Target,
} from "lucide-react";
import { registeredEvents, RegisteredEvent } from "@/lib/data";
import { getEventIcon } from "@/lib/eventIcons";

const tabs = ["All", "Confirmed", "Pending", "Waitlisted"];

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    label: "Confirmed",
    badge: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-400",
  },
  pending: {
    icon: Hourglass,
    label: "Pending",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-400",
  },
  waitlisted: {
    icon: AlertCircle,
    label: "Waitlisted",
    badge: "bg-gray-100 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  },
};

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = registeredEvents.filter((e) => {
    const matchTab =
      activeTab === "All" ||
      e.registrationStatus.toLowerCase() === activeTab.toLowerCase();
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    All: registeredEvents.length,
    Confirmed: registeredEvents.filter((e) => e.registrationStatus === "confirmed").length,
    Pending: registeredEvents.filter((e) => e.registrationStatus === "pending").length,
    Waitlisted: registeredEvents.filter((e) => e.registrationStatus === "waitlisted").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="relative">
            <Ticket size={20} className="mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-0.5">{registeredEvents.length}</div>
            <p className="text-blue-200 text-sm">Total Registrations</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-blue-50 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Trophy size={18} className="text-amber-500" />
            <span className="badge bg-amber-100 text-amber-700 text-xs">Active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-0.5">{counts.Confirmed}</div>
          <p className="text-gray-500 text-sm">Confirmed Events</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-blue-50 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Hourglass size={18} className="text-yellow-500" />
            <span className="badge bg-yellow-100 text-yellow-700 text-xs">Awaiting</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-0.5">{counts.Pending}</div>
          <p className="text-gray-500 text-sm">Pending Approval</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-blue-50 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex gap-2 flex-wrap flex-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  activeTab === tab
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {tab}
                <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold ${activeTab === tab ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {counts[tab as keyof typeof counts]}
                </span>
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search my events..."
              className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent w-48 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-medium hover:bg-gray-100 transition-colors border border-gray-200">
            <ListFilter size={13} /> Sort
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((event: RegisteredEvent, i) => {
            const cfg = statusConfig[event.registrationStatus];
            const StatusIcon = cfg.icon;
            const EventIcon = getEventIcon(event.image);
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-blue-50 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-100 transition-all animate-slide-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className={`bg-gradient-to-br ${event.gradient} w-full md:w-28 flex items-center justify-center py-6 md:py-0 relative flex-shrink-0`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <EventIcon className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex flex-col md:flex-row md:items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                            {event.title}
                          </h3>
                          <span className={`badge text-xs border ${cfg.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} mr-1.5`} />
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 max-w-lg">{event.description}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <div className="w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center">
                              <Calendar size={11} className="text-blue-500" />
                            </div>
                            {event.date} - {event.time}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <div className="w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center">
                              <MapPin size={11} className="text-blue-500" />
                            </div>
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <div className="w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center">
                              <Ticket size={11} className="text-blue-500" />
                            </div>
                            {event.ticketId}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <div className="w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center">
                              <Clock size={11} className="text-blue-500" />
                            </div>
                            Registered {event.registeredAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 flex-shrink-0">
                        {event.registrationStatus === "confirmed" && (
                          <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 whitespace-nowrap">
                            <Download size={13} /> Download Ticket
                          </button>
                        )}
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-200 whitespace-nowrap">
                          <Share2 size={13} /> Share
                        </button>
                        {event.registrationStatus === "pending" && (
                          <div className="flex items-center gap-1.5 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-xl text-xs font-medium border border-yellow-200">
                            <StatusIcon size={13} /> Awaiting Approval
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {event.registrationStatus === "confirmed" && (
                  <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-600 w-full" />
                )}
                {event.registrationStatus === "pending" && (
                  <div className="h-1 bg-gradient-to-r from-yellow-400 to-orange-400 w-full" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-blue-50 p-16 text-center shadow-sm">
          <ClipboardList className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-700 mb-2">No Events Found</h3>
          <p className="text-sm text-gray-400 mb-6">
            {activeTab === "All" ? "You haven't registered for any events yet." : `No ${activeTab.toLowerCase()} events found.`}
          </p>
          <a href="/events" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-sm shadow-blue-200">
            <Target size={14} /> Browse Events
          </a>
        </div>
      )}
    </div>
  );
}
