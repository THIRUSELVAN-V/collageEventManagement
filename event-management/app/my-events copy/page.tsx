"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, ListFilter, CalendarDays, MapPin, Users,
  CheckCircle2, Clock3, FileEdit, XCircle,
  Eye, Edit3, Trash2, Send, Plus,
  ChevronDown, TrendingUp, MoreVertical,
  Globe, Video,
} from "lucide-react";
import { facultyEvents, FacultyEvent, EventStatus } from "@/lib/data";

const STATUS_CFG: Record<EventStatus, {
  label: string; dot: string; bg: string; color: string; border: string; icon: React.ElementType;
}> = {
  approved: { label: "Approved", dot: "bg-emerald-500", bg: "bg-emerald-50",  color: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle2 },
  pending:  { label: "Pending",  dot: "bg-amber-400",   bg: "bg-amber-50",   color: "text-amber-700",   border: "border-amber-200",   icon: Clock3 },
  draft:    { label: "Draft",    dot: "bg-slate-400",   bg: "bg-slate-100",  color: "text-slate-600",   border: "border-slate-200",   icon: FileEdit },
  rejected: { label: "Rejected", dot: "bg-red-500",     bg: "bg-red-50",     color: "text-red-700",     border: "border-red-200",     icon: XCircle },
};

const TABS: { key: "all" | EventStatus; label: string }[] = [
  { key: "all",      label: "All Events" },
  { key: "approved", label: "Approved" },
  { key: "pending",  label: "Pending" },
  { key: "draft",    label: "Drafts" },
  { key: "rejected", label: "Rejected" },
];

type ViewMode = "list" | "grid";

export default function MyEventsPage() {
  const [tab, setTab] = useState<"all" | EventStatus>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("list");
  const [expanded, setExpanded] = useState<string | null>(null);

  const counts = {
    all: facultyEvents.length,
    approved: facultyEvents.filter(e => e.status === "approved").length,
    pending:  facultyEvents.filter(e => e.status === "pending").length,
    draft:    facultyEvents.filter(e => e.status === "draft").length,
    rejected: facultyEvents.filter(e => e.status === "rejected").length,
  };

  const filtered = facultyEvents.filter((e) => {
    const matchTab = tab === "all" || e.status === tab;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-5 animate-fade-in">

      {/* TOP SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["approved","pending","draft","rejected"] as EventStatus[]).map((s) => {
          const cfg = STATUS_CFG[s];
          const Icon = cfg.icon;
          const accents: Record<EventStatus, string> = {
            approved: "#059669", pending: "#d97706", draft: "#64748b", rejected: "#dc2626"
          };
          return (
            <button key={s} onClick={() => setTab(s)}
              className={`card p-4 text-left relative overflow-hidden transition-all ${tab === s ? "ring-2 ring-teal-400/40" : "hover:shadow-md"}`}>
              <div className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl" style={{ background: accents[s] }} />
              <div className={`w-8 h-8 ${cfg.bg} ${cfg.border} border rounded-xl flex items-center justify-center mb-2`}>
                <Icon size={15} className={cfg.color} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{counts[s]}</div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mt-0.5">{cfg.label}</div>
            </button>
          );
        })}
      </div>

      {/* FILTER BAR */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Tabs */}
          <div className="flex gap-1.5 flex-wrap flex-1">
            {TABS.map(({ key, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
                style={tab === key ? {
                  background: "#0f1b35", color: "white", border: "1px solid #0f1b35",
                } : {
                  background: "white", color: "#64748b", border: "1px solid #e2e8f0",
                }}>
                {label}
                <span className="w-4 h-4 rounded-md flex items-center justify-center text-[10px]"
                  style={tab === key ? { background: "rgba(255,255,255,0.15)" } : { background: "#f1f5f9" }}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search events..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl
                focus:outline-none focus:ring-2 focus:border-transparent w-44 transition-all"
              style={{ "--tw-ring-color": "rgba(20,184,166,0.35)" } as React.CSSProperties} />
          </div>

          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-medium border border-slate-200 hover:bg-slate-100 transition-colors">
            <ListFilter size={13} /> Sort <ChevronDown size={11} />
          </button>

          {/* View toggle */}
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {(["list","grid"] as ViewMode[]).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className="w-8 h-7 rounded-lg flex items-center justify-center transition-all text-xs font-bold"
                style={view === v ? { background: "white", color: "#0f1b35", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" } : { color: "#94a3b8" }}>
                {v === "list" ? "≡" : "⊞"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EVENTS */}
      {filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="font-bold text-slate-700 mb-2">No Events Found</h3>
          <p className="text-sm text-slate-400 mb-6">Try a different filter or create a new event</p>
          <Link href="/create-event" className="btn-primary inline-flex">
            <Plus size={15} /> Create Event
          </Link>
        </div>
      ) : view === "list" ? (
        <div className="space-y-3">
          {filtered.map((ev, i) => (
            <ListRow key={ev.id} ev={ev} i={i}
              expanded={expanded === ev.id}
              onToggle={() => setExpanded(expanded === ev.id ? null : ev.id)} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((ev, i) => <GridCard key={ev.id} ev={ev} i={i} />)}
        </div>
      )}

    </div>
  );
}

/* ── List Row ── */
function ListRow({ ev, i, expanded, onToggle }: {
  ev: FacultyEvent; i: number; expanded: boolean; onToggle: () => void;
}) {
  const cfg = STATUS_CFG[ev.status];
  const StatusIcon = cfg.icon;
  const fill = ev.maxParticipants > 0 ? Math.round((ev.registeredCount / ev.maxParticipants) * 100) : 0;
  const hot = fill > 80;

  return (
    <div className="card overflow-hidden animate-slide-up transition-all"
      style={{ animationDelay: `${i * 0.06}s` }}>

      {/* Status line at top */}
      <div className="h-0.5 w-full" style={{
        background: ev.status === "approved" ? "#059669" : ev.status === "pending" ? "#d97706" : ev.status === "draft" ? "#94a3b8" : "#dc2626"
      }} />

      <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={onToggle}>
        {/* Banner */}
        <div className={`w-14 h-14 bg-gradient-to-br ${ev.gradient} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm`}>
          {ev.banner}
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: "'DM Serif Display',serif" }}>
              {ev.title}
            </h3>
            <span className={`status-badge ${cfg.bg} ${cfg.color} ${cfg.border} border text-xs`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
            {hot && ev.status === "approved" && (
              <span className="status-badge bg-red-50 text-red-600 border border-red-200 text-xs">🔥 Almost Full</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mt-1">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <CalendarDays size={11} /> {ev.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              {ev.isOnline ? <Video size={11} /> : <MapPin size={11} />}
              {ev.isOnline ? "Online" : ev.venue}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Users size={11} /> {ev.registeredCount}/{ev.maxParticipants}
            </span>
          </div>
        </div>

        {/* Fill bar */}
        <div className="hidden md:flex flex-col items-end gap-1.5 flex-shrink-0 w-28">
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${fill}%`,
                  background: hot ? "linear-gradient(90deg,#f97316,#ef4444)" : "linear-gradient(90deg,#14b8a6,#0d9488)"
                }} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 w-8 text-right">{fill}%</span>
          </div>
          <span className="text-[10px] text-slate-400">{ev.category}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-teal-50 transition-colors group">
            <Eye size={15} className="text-slate-400 group-hover:text-teal-600" />
          </button>
          {(ev.status === "draft" || ev.status === "pending") && (
            <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors group">
              <Edit3 size={15} className="text-slate-400 group-hover:text-blue-600" />
            </button>
          )}
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
            <MoreVertical size={15} className="text-slate-400" />
          </button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors"
            onClick={(e) => { e.stopPropagation(); onToggle(); }}>
            <ChevronDown size={15} className={`text-slate-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-5 pb-5 pt-0 border-t border-slate-50 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Description */}
            <div className="md:col-span-2 space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">{ev.description}</p>
              {ev.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {ev.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{ background: "rgba(20,184,166,0.08)", color: "#0d9488", border: "1px solid rgba(20,184,166,0.2)" }}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              {ev.rejectedReason && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
                  <XCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-700 mb-0.5">Rejection Reason</p>
                    <p className="text-xs text-red-600">{ev.rejectedReason}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Side details */}
            <div className="space-y-2">
              {[
                { icon: TrendingUp, label: "Fill Rate", val: `${fill}% (${ev.registeredCount} registered)` },
                { icon: ev.isOnline ? Globe : MapPin, label: "Location", val: ev.isOnline ? "Online Event" : ev.venue },
                { icon: Users, label: "Coordinators", val: ev.coordinators.join(", ") || "—" },
                ...(ev.budget ? [{ icon: TrendingUp, label: "Budget", val: `₹${ev.budget.toLocaleString()}` }] : []),
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Icon size={13} className="text-teal-500 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                    <p className="text-xs text-slate-700 font-medium truncate">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50">
            {ev.status === "draft" && (
              <button className="btn-primary text-xs px-4 py-2">
                <Send size={13} /> Submit for Approval
              </button>
            )}
            {(ev.status === "draft" || ev.status === "pending") && (
              <button className="btn-secondary text-xs px-4 py-2">
                <Edit3 size={13} /> Edit Event
              </button>
            )}
            <button className="btn-secondary text-xs px-4 py-2">
              <Eye size={13} /> View Full Details
            </button>
            {ev.status !== "approved" && (
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-red-500 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors ml-auto">
                <Trash2 size={13} /> Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Grid Card ── */
function GridCard({ ev, i }: { ev: FacultyEvent; i: number }) {
  const cfg = STATUS_CFG[ev.status];
  const fill = ev.maxParticipants > 0 ? Math.round((ev.registeredCount / ev.maxParticipants) * 100) : 0;
  const hot = fill > 80;

  return (
    <div className="card overflow-hidden card-hover animate-slide-up"
      style={{ animationDelay: `${i * 0.07}s` }}>
      {/* Banner */}
      <div className={`bg-gradient-to-br ${ev.gradient} h-32 flex items-center justify-center relative`}>
        <div className="absolute inset-0 bg-black/15" />
        <span className="text-5xl relative z-10">{ev.banner}</span>
        <div className="absolute top-3 right-3">
          <span className={`status-badge ${cfg.bg} ${cfg.color} ${cfg.border} border text-xs`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold px-2 py-1 rounded-lg"
            style={{ background: "rgba(0,0,0,0.3)", color: "rgba(255,255,255,0.9)" }}>
            {ev.category}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2"
          style={{ fontFamily: "'DM Serif Display',serif" }}>
          {ev.title}
        </h3>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays size={11} className="text-teal-500" /> {ev.date}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            {ev.isOnline ? <Video size={11} className="text-teal-500" /> : <MapPin size={11} className="text-teal-500" />}
            <span className="truncate">{ev.isOnline ? "Online" : ev.venue}</span>
          </div>
        </div>

        {/* Fill bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Users size={10} /> {ev.registeredCount}/{ev.maxParticipants}
            </span>
            <span className={`font-semibold ${hot ? "text-red-500" : "text-teal-600"}`}>{fill}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full"
              style={{
                width: `${fill}%`,
                background: hot ? "linear-gradient(90deg,#f97316,#ef4444)" : "linear-gradient(90deg,#14b8a6,#0d9488)"
              }} />
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "rgba(20,184,166,0.08)", color: "#0d9488", border: "1px solid rgba(20,184,166,0.2)" }}>
            <Eye size={13} /> View
          </button>
          {(ev.status === "draft" || ev.status === "pending") && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors">
              <Edit3 size={13} /> Edit
            </button>
          )}
          {ev.status === "draft" && (
            <button className="flex-1 btn-primary text-xs py-2 px-3">
              <Send size={12} /> Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
