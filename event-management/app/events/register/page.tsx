"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import { mockEvents, mockStudent } from "@/data/mockData";
import { Event } from "@/types";
import {
  MapPin,
  Users,
  Check,
  X,
  Filter,
  Sparkles,
  Calendar,
} from "lucide-react";
import { getEventIcon } from "@/lib/eventIcons";

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  Technical: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  Cultural: { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
  Workshop: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  Business: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  Sports: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  Arts: { bg: "bg-pink-100", text: "text-pink-700", dot: "bg-pink-500" },
};

const categories = ["All", "Technical", "Cultural", "Workshop", "Business", "Sports", "Arts"];

function EventCard({
  event,
  isRegistered,
  onRegister,
  onUnregister,
}: {
  event: Event;
  isRegistered: boolean;
  onRegister: (id: string) => void;
  onUnregister: (id: string) => void;
}) {
  const filled = Math.round((event.registered / event.capacity) * 100);
  const cat = categoryColors[event.category];
  const isFull = event.registered >= event.capacity;
  const EventIcon = getEventIcon(event.image);

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 px-5 pt-5 pb-8">
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-400 rounded-full blur-2xl" />
        </div>
        <div className="relative flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-inner border border-white/10">
            <EventIcon className="w-8 h-8 text-white" />
          </div>
          <span className={`${cat.bg} ${cat.text} text-xs font-bold px-3 py-1 rounded-full`}>
            {event.category}
          </span>
        </div>
        <h3 className="text-white font-bold text-base mt-3 leading-tight line-clamp-2">
          {event.title}
        </h3>
        <p className="text-white/50 text-xs mt-1">by {event.organizer}</p>
      </div>

      <div className="flex gap-2 px-5 -mt-4 relative z-10">
        {event.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="bg-white shadow-md text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-slate-100"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="px-5 py-4 flex-1 flex flex-col">
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>
              {new Date(event.date).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              - {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>
              {event.registered}/{event.capacity} registered
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-semibold text-slate-400">CAPACITY</span>
            <span className={`text-[10px] font-bold ${filled > 80 ? "text-red-500" : "text-blue-500"}`}>
              {filled}% filled
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                filled > 80
                  ? "bg-gradient-to-r from-red-400 to-red-500"
                  : "bg-gradient-to-r from-blue-400 to-blue-600"
              }`}
              style={{ width: `${filled}%` }}
            />
          </div>
        </div>

        <div className="mt-auto">
          {isRegistered ? (
            <button
              onClick={() => onUnregister(event.id)}
              className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-red-50 text-green-600 hover:text-red-600 border border-green-200 hover:border-red-200 font-semibold text-sm py-2.5 rounded-xl transition-all group/btn"
            >
              <Check className="w-4 h-4 group-hover/btn:hidden" />
              <X className="w-4 h-4 hidden group-hover/btn:block" />
              <span className="group-hover/btn:hidden">Registered</span>
              <span className="hidden group-hover/btn:block">Unregister</span>
            </button>
          ) : isFull ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-400 font-semibold text-sm py-2.5 rounded-xl cursor-not-allowed"
            >
              Event Full
            </button>
          ) : (
            <button
              onClick={() => onRegister(event.id)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold text-sm py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              Register Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(
    new Set(mockStudent.registeredEvents)
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleRegister = (id: string) => {
    setRegisteredIds((prev) => new Set([...Array.from(prev), id]));
    setSuccessId(id);
    setTimeout(() => setSuccessId(null), 3000);
  };

  const handleUnregister = (id: string) => {
    setRegisteredIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const filtered =
    activeCategory === "All"
      ? mockEvents
      : mockEvents.filter((e) => e.category === activeCategory);

  return (
    <Layout>
      {successId && (
        <div className="fixed top-20 right-6 z-50 bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-scale-in">
          <Check className="w-4 h-4" />
          Successfully registered for event!
        </div>
      )}

      <div className="animate-fade-in-up flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mr-1">
          <Filter className="w-4 h-4" />
          Filter:
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto text-slate-400 text-sm">
          <span className="font-bold text-slate-600">{filtered.length}</span> events found
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((event, i) => (
          <div
            key={event.id}
            className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
          >
            <EventCard
              event={event}
              isRegistered={registeredIds.has(event.id)}
              onRegister={handleRegister}
              onUnregister={handleUnregister}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
}
