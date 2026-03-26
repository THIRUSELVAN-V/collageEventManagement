"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Users,
  CheckCircle,
  Calendar,
  Tag,
  TrendingUp,
  Flame,
  SearchX,
  Check,
} from "lucide-react";
import { allEvents, Event } from "@/lib/data";
import { getEventIcon } from "@/lib/eventIcons";

const categories = ["All", "Technology", "Cultural", "Business", "Arts", "Health"];

export default function EventsPage() {
  const [selected, setSelected] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  const [modalEvent, setModalEvent] = useState<Event | null>(null);

  const filtered = allEvents.filter((e) => {
    const matchCat = selected === "All" || e.category === selected;
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleRegister = (id: string) => {
    setRegistered((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setModalEvent(null);
  };

  const pct = (r: number, s: number) => Math.round((r / s) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl p-5 border border-blue-50 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
              Browse Events
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing {filtered.length} of {allEvents.length} events
            </p>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200">
            <Filter size={15} /> Filter
          </button>
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selected === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((event, i) => {
          const isReg = registered.has(event.id);
          const spotsLeft = event.seats - event.registered;
          const fillPct = pct(event.registered, event.seats);
          const almostFull = fillPct > 80;
          const EventIcon = getEventIcon(event.image);

          return (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-blue-50 overflow-hidden card-hover shadow-sm group"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className={`bg-gradient-to-br ${event.gradient} p-5 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
                <div className="relative flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                    <EventIcon size={28} className="text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="badge bg-white/20 text-white border border-white/20 text-xs backdrop-blur-sm">
                      {event.category}
                    </span>
                    {almostFull && (
                      <span className="badge bg-red-500/90 text-white text-xs inline-flex items-center gap-1">
                        <Flame size={11} /> Almost Full
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-white font-bold text-base mt-3 leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                  {event.title}
                </h3>
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Calendar size={12} className="text-blue-500" />
                    </div>
                    <span>{event.date} - {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MapPin size={12} className="text-blue-500" />
                    </div>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Users size={12} className="text-blue-500" />
                    </div>
                    <span>{spotsLeft} spots left</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span className="flex items-center gap-1"><TrendingUp size={11} /> Capacity</span>
                    <span className={almostFull ? "text-red-500 font-semibold" : "text-gray-500"}>
                      {event.registered}/{event.seats}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        almostFull
                          ? "bg-gradient-to-r from-orange-400 to-red-500"
                          : "bg-gradient-to-r from-blue-400 to-blue-600"
                      }`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-1.5 flex-wrap mb-4">
                  {event.tags.map((tag) => (
                    <span key={tag} className="badge bg-gray-100 text-gray-500 text-xs border border-gray-200">
                      <Tag size={9} className="mr-1" />{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => (isReg ? handleRegister(event.id) : setModalEvent(event))}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isReg
                      ? "bg-green-50 text-green-700 border-2 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-sm shadow-blue-200 hover:shadow-blue-300"
                  }`}
                >
                  {isReg ? (
                    <><CheckCircle size={15} /> Registered - Undo</>
                  ) : (
                    <>Register Now</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-blue-50 p-16 text-center">
          <SearchX className="w-12 h-12 mx-auto mb-4 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-700 mb-2">No Events Found</h3>
          <p className="text-sm text-gray-400">Try a different search term or category</p>
        </div>
      )}

      {modalEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
            <div className={`bg-gradient-to-br ${modalEvent.gradient} p-6 relative`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative text-center">
                {(() => {
                  const ModalIcon = getEventIcon(modalEvent.image);
                  return <ModalIcon className="w-12 h-12 mb-3 text-white mx-auto" />;
                })()}
                <h3 className="text-white text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  {modalEvent.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4 text-center">
                Are you sure you want to register for this event?
              </p>
              <div className="bg-blue-50 rounded-xl p-4 mb-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar size={14} className="text-blue-500" />
                  {modalEvent.date} at {modalEvent.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin size={14} className="text-blue-500" />
                  {modalEvent.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Users size={14} className="text-blue-500" />
                  {modalEvent.seats - modalEvent.registered} seats available
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalEvent(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRegister(modalEvent.id)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all shadow-sm shadow-blue-200 inline-flex items-center justify-center gap-1.5"
                >
                  <Check size={14} /> Confirm Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
