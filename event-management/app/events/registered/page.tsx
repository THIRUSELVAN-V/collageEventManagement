"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import { mockRegisteredEvents } from "@/data/mockData";
import { RegisteredEvent } from "@/types";
import {
  MapPin,
  Clock,
  Ticket,
  CheckCircle2,
  Calendar,
  Download,
  X,
  QrCode,
  User,
  Hash,
  ClipboardList,
  CheckCircle,
  AlarmClock,
  MailX,
} from "lucide-react";
import { getEventIcon } from "@/lib/eventIcons";

const categoryColors: Record<string, { bg: string; text: string }> = {
  Technical: { bg: "bg-blue-100", text: "text-blue-700" },
  Cultural: { bg: "bg-purple-100", text: "text-purple-700" },
  Workshop: { bg: "bg-green-100", text: "text-green-700" },
  Business: { bg: "bg-amber-100", text: "text-amber-700" },
  Sports: { bg: "bg-red-100", text: "text-red-700" },
  Arts: { bg: "bg-pink-100", text: "text-pink-700" },
};

function TicketModal({
  event,
  onClose,
}: {
  event: RegisteredEvent;
  onClose: () => void;
}) {
  const EventIcon = getEventIcon(event.image);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1a3a6e] p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <div className="w-14 h-14 bg-white/10 rounded-2xl border border-white/20 mx-auto mb-2 flex items-center justify-center">
              <EventIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg leading-tight">
              {event.title}
            </h3>
            <p className="text-blue-300 text-xs mt-1">by {event.organizer}</p>
          </div>
        </div>

        <div className="flex items-center -my-px">
          <div className="w-5 h-5 bg-slate-100 rounded-full -ml-2.5 border border-slate-200" />
          <div className="flex-1 border-t-2 border-dashed border-slate-200" />
          <div className="w-5 h-5 bg-slate-100 rounded-full -mr-2.5 border border-slate-200" />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                Date & Time
              </p>
              <p className="text-slate-800 text-sm font-semibold">
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p className="text-slate-500 text-xs">{event.time}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                Venue
              </p>
              <p className="text-slate-800 text-sm font-semibold">
                {event.location.split(",")[0]}
              </p>
              <p className="text-slate-500 text-xs">
                {event.location.split(",")[1]?.trim()}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                Ticket ID
              </p>
              <p className="text-slate-800 text-sm font-bold font-mono">
                {event.ticketId}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                Seat
              </p>
              <p className="text-slate-800 text-sm font-bold">
                {event.seatNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-20 h-20 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center shadow-inner">
              <QrCode className="w-12 h-12 text-slate-700" />
            </div>
            <div>
              <p className="text-slate-800 text-sm font-bold">Scan at Entry</p>
              <p className="text-slate-400 text-xs mt-0.5">
                Show this QR code
              </p>
              <p className="text-slate-400 text-xs">at the event entrance</p>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventRow({ event, onViewTicket }: { event: RegisteredEvent; onViewTicket: () => void }) {
  const cat = categoryColors[event.category];
  const EventIcon = getEventIcon(event.image);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      <div className="flex items-stretch">
        <div className="w-1.5 bg-gradient-to-b from-blue-500 to-blue-600 flex-shrink-0 rounded-l-2xl" />

        <div className="flex-1 p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
            <EventIcon className="w-8 h-8 text-slate-700" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-slate-800 font-bold text-base truncate">
                {event.title}
              </h3>
              <span className={`${cat.bg} ${cat.text} text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                {event.category}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {event.time}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {event.location.split(",")[0]}
              </span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Hash className="w-3 h-3" />
              <span className="font-mono font-medium">{event.ticketId}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <User className="w-3 h-3" />
              <span>Seat {event.seatNumber}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Confirmed
            </div>
          </div>

          <button
            onClick={onViewTicket}
            className="flex-shrink-0 flex items-center gap-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all border border-blue-100 hover:border-blue-600 hover:shadow-md hover:shadow-blue-500/20"
          >
            <Ticket className="w-4 h-4" />
            Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RegisteredPage() {
  const [selectedEvent, setSelectedEvent] = useState<RegisteredEvent | null>(null);

  const summaryCards = [
    {
      label: "Total Registered",
      value: mockRegisteredEvents.length,
      icon: ClipboardList,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Confirmed",
      value: mockRegisteredEvents.length,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Upcoming",
      value: mockRegisteredEvents.filter(
        (e) => new Date(e.date) > new Date()
      ).length,
      icon: AlarmClock,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <Layout>
      {selectedEvent && (
        <TicketModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <div className="grid grid-cols-3 gap-4 mb-8">
        {summaryCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`animate-fade-in-up stagger-${i + 1} bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-slate-400 text-sm">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="animate-fade-in-up stagger-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-800 font-bold text-lg">
            Registered Events
          </h2>
          <span className="text-slate-400 text-sm">
            {mockRegisteredEvents.length} event
            {mockRegisteredEvents.length !== 1 ? "s" : ""}
          </span>
        </div>

        {mockRegisteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
            <MailX className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 font-semibold text-lg">
              No registered events yet
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Go to Browse Events to register!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockRegisteredEvents.map((event, i) => (
              <div
                key={event.id}
                className={`animate-fade-in-up stagger-${Math.min(i + 4, 6)}`}
              >
                <EventRow
                  event={event}
                  onViewTicket={() => setSelectedEvent(event)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
