"use client";

import { useState, useRef } from "react";
import {
  Search, Filter, ChevronDown, ChevronUp, Eye, CheckCircle,
  XCircle, Clock3, FileEdit, ShieldCheck, CalendarDays,
  MapPin, Users, IndianRupee, X, Send, AlertTriangle,
  Video, SortAsc, Download, RefreshCw, ChevronLeft, ChevronRight,
  User, Brain, Drama, Laptop, Lock, Cloud, FileText, Trophy, Rocket,
} from "lucide-react";
import { allEvents, AdminEvent, EventStatus, EventBanner } from "@/lib/data";

/* ─── Types & helpers ─── */
type SortField = "title" | "faculty" | "date" | "submittedAt" | "status" | "maxParticipants";
type SortDir   = "asc" | "desc";
type FilterStatus = "all" | EventStatus;

const STATUS_CFG: Record<EventStatus, {
  label: string; badgeClass: string; dotClass: string;
  rowBg: string; icon: React.ElementType;
}> = {
  pending:  { label:"Pending",  badgeClass:"badge-pending",  dotClass:"bg-amber-400",  rowBg:"",                  icon: Clock3 },
  approved: { label:"Approved", badgeClass:"badge-approved", dotClass:"bg-emerald-500",rowBg:"bg-emerald-50/30",   icon: ShieldCheck },
  rejected: { label:"Rejected", badgeClass:"badge-rejected", dotClass:"bg-rose-500",   rowBg:"bg-rose-50/30",     icon: XCircle },
  draft:    { label:"Draft",    badgeClass:"badge-draft",    dotClass:"bg-slate-400",  rowBg:"bg-slate-50/50",    icon: FileEdit },
};

const PRIORITY_DOT: Record<string,string> = {
  high:"bg-rose-500", normal:"bg-sky-400", low:"bg-slate-300",
};

const EVENT_BANNER_ICON: Record<EventBanner, React.ElementType> = {
  brain: Brain,
  mask: Drama,
  laptop: Laptop,
  lock: Lock,
  cloud: Cloud,
  file: FileText,
  trophy: Trophy,
  rocket: Rocket,
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });
}
function fmtDateTime(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" });
}

const PAGE_SIZE = 6;

/* ─── Main Component ─── */
export default function ApprovalsPage() {
  const [events, setEvents]           = useState<AdminEvent[]>(allEvents);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [search, setSearch]           = useState("");
  const [sortField, setSortField]     = useState<SortField>("submittedAt");
  const [sortDir, setSortDir]         = useState<SortDir>("desc");
  const [page, setPage]               = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [detailEvent, setDetailEvent] = useState<AdminEvent | null>(null);
  const [rejectModal, setRejectModal] = useState<AdminEvent | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast]             = useState<{ msg: string; type: "success"|"error" } | null>(null);

  /* counts */
  const counts: Record<string, number> = {
    all: events.length,
    pending:  events.filter(e => e.status === "pending").length,
    approved: events.filter(e => e.status === "approved").length,
    rejected: events.filter(e => e.status === "rejected").length,
    draft:    events.filter(e => e.status === "draft").length,
  };

  /* filter + sort */
  const visible = events
    .filter(e => {
      const matchStatus = filterStatus === "all" || e.status === filterStatus;
      const q = search.toLowerCase();
      const matchSearch = !q || e.title.toLowerCase().includes(q)
        || e.faculty.toLowerCase().includes(q)
        || e.category.toLowerCase().includes(q)
        || e.id.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    })
    .sort((a, b) => {
      let va: string | number = "", vb: string | number = "";
      if (sortField === "title")         { va = a.title;         vb = b.title; }
      else if (sortField === "faculty")  { va = a.faculty;       vb = b.faculty; }
      else if (sortField === "date")     { va = a.date;          vb = b.date; }
      else if (sortField === "submittedAt") { va = a.submittedAt; vb = b.submittedAt; }
      else if (sortField === "status")   { va = a.status;        vb = b.status; }
      else if (sortField === "maxParticipants") { va = a.maxParticipants; vb = b.maxParticipants; }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(visible.length / PAGE_SIZE);
  const pageRows   = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const showToast = (msg: string, type: "success"|"error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const doApprove = (id: string) => {
    setEvents(es => es.map(e => e.id === id
      ? { ...e, status: "approved" as EventStatus, reviewedAt: new Date().toISOString(), reviewedBy: "Admin" }
      : e));
    setDetailEvent(null);
    showToast("Event approved successfully!", "success");
  };

  const doReject = () => {
    if (!rejectModal || !rejectReason.trim()) return;
    setEvents(es => es.map(e => e.id === rejectModal.id
      ? { ...e, status: "rejected" as EventStatus, rejectedReason: rejectReason, reviewedAt: new Date().toISOString(), reviewedBy: "Admin" }
      : e));
    setRejectModal(null);
    setRejectReason("");
    setDetailEvent(null);
    showToast("Event rejected with reason sent to faculty.", "error");
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === pageRows.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(pageRows.map(r => r.id)));
  };

  const setSort = (f: SortField) => {
    if (sortField === f) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(f); setSortDir("asc"); }
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    sortField === field
      ? (sortDir === "asc" ? <ChevronUp size={12} className="text-violet-500" /> : <ChevronDown size={12} className="text-violet-500" />)
      : <ChevronDown size={12} className="text-ink-faint opacity-50" />
  );

  return (
    <div className="space-y-5 animate-fade-in">

      {/* ── SUMMARY STRIP ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["pending","approved","rejected","draft"] as EventStatus[]).map((s, i) => {
          const cfg = STATUS_CFG[s];
          const Icon = cfg.icon;
          const accents: Record<EventStatus,string> = { pending:"#f59e0b", approved:"#10b981", rejected:"#f43f5e", draft:"#8b5cf6" };
          return (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`card card-hover p-4 text-left relative overflow-hidden transition-all ${filterStatus === s ? "ring-2 ring-violet-400/40" : ""}`}
              style={{ animationDelay:`${i*0.07}s` }}>
              <div className="absolute top-0 left-0 w-full h-1 rounded-t-[18px]" style={{ background: accents[s] }} />
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} className={s === "pending" ? "text-amber-500" : s === "approved" ? "text-emerald-500" : s === "rejected" ? "text-rose-500" : "text-violet-500"} />
                {filterStatus === s && <div className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: accents[s] }} />}
              </div>
              <div className="text-2xl font-bold text-ink">{counts[s]}</div>
              <div className="text-[11px] font-semibold text-ink-light uppercase tracking-wide mt-0.5">{cfg.label}</div>
            </button>
          );
        })}
      </div>

      {/* ── TABLE CARD ── */}
      <div className="card overflow-hidden">

        {/* Toolbar */}
        <div className="px-5 py-4 flex flex-col md:flex-row md:items-center gap-3"
          style={{ borderBottom:"1px solid rgba(139,92,246,0.08)" }}>
          <div className="flex-1 flex flex-wrap gap-1.5">
            {(["all","pending","approved","rejected","draft"] as FilterStatus[]).map(s => (
              <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border"
                style={filterStatus === s
                  ? { background:"#5b21b6", color:"#fff", border:"1px solid #6d28d9" }
                  : { background:"white", color:"#4a4568", border:"1px solid rgba(139,92,246,0.12)" }}>
                {s === "all" ? "All Events" : STATUS_CFG[s as EventStatus].label}
                <span className="w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-bold"
                  style={filterStatus === s ? { background:"rgba(255,255,255,0.2)" } : { background:"#f4f3fb" }}>
                  {counts[s]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input type="text" placeholder="Search events, faculty..." value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 pr-3 py-2 text-xs bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent w-48 transition-all"
                style={{ border:"1px solid rgba(139,92,246,0.12)" }} />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border transition-all hover:bg-violet-50"
              style={{ border:"1px solid rgba(139,92,246,0.12)", color:"#4a4568" }}>
              <Filter size={12} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border transition-all hover:bg-violet-50"
              style={{ border:"1px solid rgba(139,92,246,0.12)", color:"#4a4568" }}>
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedRows.size > 0 && (
          <div className="px-5 py-2.5 flex items-center gap-3 animate-slide-right"
            style={{ background:"rgba(91,33,182,0.06)", borderBottom:"1px solid rgba(139,92,246,0.1)" }}>
            <span className="text-xs font-semibold text-violet-700">{selectedRows.size} selected</span>
            <button onClick={() => { selectedRows.forEach(id => doApprove(id)); setSelectedRows(new Set()); }}
              className="btn-approve text-xs py-1.5 px-3">
              <CheckCircle size={12} /> Approve All
            </button>
            <button onClick={() => setSelectedRows(new Set())}
              className="text-xs font-medium text-ink-muted hover:text-ink transition-colors">
              Clear
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width:"40px" }}>
                  <input type="checkbox"
                    checked={selectedRows.size === pageRows.length && pageRows.length > 0}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 accent-violet-600 cursor-pointer" />
                </th>
                <th style={{ width:"80px" }}>ID</th>
                <th onClick={() => setSort("title")} className="cursor-pointer hover:text-violet-600 select-none">
                  <span className="flex items-center gap-1">Event <SortIcon field="title" /></span>
                </th>
                <th onClick={() => setSort("faculty")} className="cursor-pointer hover:text-violet-600 select-none">
                  <span className="flex items-center gap-1">Faculty <SortIcon field="faculty" /></span>
                </th>
                <th onClick={() => setSort("date")} className="cursor-pointer hover:text-violet-600 select-none">
                  <span className="flex items-center gap-1">Event Date <SortIcon field="date" /></span>
                </th>
                <th onClick={() => setSort("maxParticipants")} className="cursor-pointer hover:text-violet-600 select-none">
                  <span className="flex items-center gap-1">Capacity <SortIcon field="maxParticipants" /></span>
                </th>
                <th onClick={() => setSort("submittedAt")} className="cursor-pointer hover:text-violet-600 select-none">
                  <span className="flex items-center gap-1">Submitted <SortIcon field="submittedAt" /></span>
                </th>
                <th onClick={() => setSort("status")} className="cursor-pointer hover:text-violet-600 select-none">
                  <span className="flex items-center gap-1">Status <SortIcon field="status" /></span>
                </th>
                <th style={{ textAlign:"center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={34} className="text-ink-faint" />
                      <p className="text-sm font-semibold text-ink-muted">No events found</p>
                      <p className="text-xs text-ink-light">Try adjusting the filter or search query</p>
                    </div>
                  </td>
                </tr>
              )}
              {pageRows.map((ev, i) => {
                const cfg = STATUS_CFG[ev.status];
                const isSelected = selectedRows.has(ev.id);
                const fill = ev.maxParticipants > 0 ? Math.round((ev.registeredCount / ev.maxParticipants) * 100) : 0;
                const BannerIcon = EVENT_BANNER_ICON[ev.banner];
                return (
                  <tr key={ev.id}
                    className={`${cfg.rowBg} ${isSelected ? "!bg-violet-50" : ""}`}
                    style={{ animationDelay:`${i * 0.05}s` }}>

                    {/* Checkbox */}
                    <td>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleRow(ev.id)}
                        className="w-3.5 h-3.5 accent-violet-600 cursor-pointer" />
                    </td>

                    {/* ID */}
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_DOT[ev.priority]}`} />
                        <span className="text-xs font-mono font-semibold text-ink-muted">{ev.id}</span>
                      </div>
                    </td>

                    {/* Event */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${ev.gradient} rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
                          <BannerIcon size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink leading-tight max-w-[180px] truncate">{ev.title}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                              style={{ background:"rgba(139,92,246,0.08)", color:"#7c3aed" }}>
                              {ev.category}
                            </span>
                            {ev.isOnline && <Video size={10} className="text-sky-500" />}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Faculty */}
                    <td>
                      <div>
                        <p className="text-sm font-semibold text-ink">{ev.faculty}</p>
                        <p className="text-xs text-ink-light mt-0.5">{ev.facultyDept}</p>
                      </div>
                    </td>

                    {/* Event Date */}
                    <td>
                      <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                        <CalendarDays size={12} className="text-violet-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-ink">{fmtDate(ev.date)}</p>
                          {ev.endDate && <p className="text-ink-light">→ {fmtDate(ev.endDate)}</p>}
                        </div>
                      </div>
                    </td>

                    {/* Capacity */}
                    <td>
                      <div className="min-w-[80px]">
                        <div className="flex items-center gap-1 mb-1">
                          <Users size={11} className="text-violet-400" />
                          <span className="text-xs font-semibold text-ink">{ev.maxParticipants}</span>
                          {ev.registeredCount > 0 && (
                            <span className="text-[10px] text-ink-light">({ev.registeredCount} reg.)</span>
                          )}
                        </div>
                        {ev.registeredCount > 0 && (
                          <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full"
                              style={{ width:`${fill}%`, background: fill > 80 ? "#ef4444" : "#8b5cf6" }} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Submitted */}
                    <td>
                      <p className="text-xs text-ink-muted font-medium">{fmtDateTime(ev.submittedAt)}</p>
                      {ev.reviewedAt && (
                        <p className="text-[10px] text-ink-light mt-0.5">Reviewed {fmtDate(ev.reviewedAt)}</p>
                      )}
                    </td>

                    {/* Status badge */}
                    <td>
                      <span className={`badge ${cfg.badgeClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
                        {cfg.label}
                      </span>
                      {ev.budget && (
                        <div className="flex items-center gap-0.5 mt-1">
                          <IndianRupee size={10} className="text-ink-faint" />
                          <span className="text-[10px] text-ink-light">{ev.budget.toLocaleString()}</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center gap-1.5 justify-center">
                        {/* View */}
                        <button onClick={() => setDetailEvent(ev)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-violet-50 group"
                          title="View Details">
                          <Eye size={14} className="text-ink-faint group-hover:text-violet-600" />
                        </button>

                        {/* Approve */}
                        {ev.status === "pending" && (
                          <button onClick={() => doApprove(ev.id)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all bg-emerald-50 hover:bg-emerald-100 group"
                            title="Approve">
                            <CheckCircle size={14} className="text-emerald-500 group-hover:text-emerald-700" />
                          </button>
                        )}

                        {/* Reject */}
                        {ev.status === "pending" && (
                          <button onClick={() => setRejectModal(ev)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all bg-rose-50 hover:bg-rose-100 group"
                            title="Reject">
                            <XCircle size={14} className="text-rose-400 group-hover:text-rose-600" />
                          </button>
                        )}

                        {/* Re-review: undo approved/rejected back to pending */}
                        {(ev.status === "approved" || ev.status === "rejected") && (
                          <button onClick={() => setEvents(es => es.map(e => e.id === ev.id ? { ...e, status: "pending" as EventStatus, reviewedAt: undefined, reviewedBy: undefined } : e))}
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all bg-slate-100 hover:bg-slate-200 group"
                            title="Re-review">
                            <RefreshCw size={13} className="text-ink-muted group-hover:text-ink" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5"
          style={{ borderTop:"1px solid rgba(139,92,246,0.07)" }}>
          <p className="text-xs text-ink-light">
            Showing <span className="font-semibold text-ink">{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE, visible.length)}</span> of <span className="font-semibold text-ink">{visible.length}</span> events
          </p>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage(p => p-1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center border text-ink-muted transition-all hover:bg-violet-50 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ border:"1px solid rgba(139,92,246,0.12)" }}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, k) => k+1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-8 h-8 rounded-xl text-xs font-bold transition-all"
                style={page === p
                  ? { background:"#5b21b6", color:"#fff", border:"none" }
                  : { border:"1px solid rgba(139,92,246,0.12)", color:"#4a4568" }}>
                {p}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p+1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center border text-ink-muted transition-all hover:bg-violet-50 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ border:"1px solid rgba(139,92,246,0.12)" }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {detailEvent && (
        <DetailModal
          ev={detailEvent}
          onClose={() => setDetailEvent(null)}
          onApprove={() => doApprove(detailEvent.id)}
          onReject={() => { setRejectModal(detailEvent); }}
        />
      )}

      {/* ── REJECT MODAL ── */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          style={{ background:"rgba(16,11,34,0.55)", backdropFilter:"blur(8px)" }}>
          <div className="card w-full max-w-md p-6 animate-scale-in">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={18} className="text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-ink text-base" style={{ fontFamily:"'Fraunces',serif" }}>Reject Event</h3>
                <p className="text-sm text-ink-muted mt-0.5 leading-snug">
                  Rejecting &ldquo;<span className="font-semibold text-ink">{rejectModal.title}</span>&rdquo;.
                  The faculty will be notified with your reason.
                </p>
              </div>
            </div>
            <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2">
              Rejection Reason *
            </label>
            <textarea
              rows={4} value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="e.g. Scheduling conflict with exams. Please reschedule to May 2025 and resubmit."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-ink
                focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent
                resize-none placeholder-ink-faint transition-all"
            />
            <p className="text-xs text-ink-light mt-1 text-right">{rejectReason.length} chars</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setRejectModal(null); setRejectReason(""); }}
                className="btn-ghost flex-1 justify-center">Cancel</button>
              <button onClick={doReject} disabled={!rejectReason.trim()}
                className="btn-reject flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                <Send size={13} /> Send Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl animate-slide-up"
          style={{
            background: toast.type === "success" ? "#d1fae5" : "#ffe4e6",
            border: `1px solid ${toast.type === "success" ? "#a7f3d0" : "#fecdd3"}`,
          }}>
          {toast.type === "success"
            ? <CheckCircle size={16} className="text-emerald-600" />
            : <XCircle size={16} className="text-rose-600" />}
          <p className="text-sm font-semibold" style={{ color: toast.type === "success" ? "#065f46" : "#9f1239" }}>
            {toast.msg}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Detail Modal ─── */
function DetailModal({ ev, onClose, onApprove, onReject }: {
  ev: AdminEvent; onClose: () => void; onApprove: () => void; onReject: () => void;
}) {
  const cfg = STATUS_CFG[ev.status];
  const fill = ev.maxParticipants > 0 ? Math.round((ev.registeredCount / ev.maxParticipants) * 100) : 0;
  const BannerIcon = EVENT_BANNER_ICON[ev.banner];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background:"rgba(16,11,34,0.55)", backdropFilter:"blur(8px)" }}>
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">

        {/* Modal header */}
        <div className={`bg-gradient-to-br ${ev.gradient} p-6 relative rounded-t-[18px]`}>
          <div className="absolute inset-0 bg-black/15 rounded-t-[18px]" />
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <X size={16} className="text-white" />
          </button>
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <BannerIcon size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg text-white" style={{ background:"rgba(255,255,255,0.2)" }}>
                  {ev.category}
                </span>
                <span className={`badge ${cfg.badgeClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
                  {cfg.label}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white leading-tight" style={{ fontFamily:"'Fraunces',serif" }}>
                {ev.title}
              </h3>
              <p className="text-sm text-white/70 mt-1">by {ev.faculty} · {ev.facultyDept}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-ink-muted leading-relaxed">{ev.description}</p>

          {/* Key details grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: CalendarDays, label:"Event Date",    val: `${ev.date}${ev.endDate ? " → "+ev.endDate : ""}` },
              { icon: ev.isOnline ? Video : MapPin, label: ev.isOnline ? "Platform" : "Venue", val: ev.isOnline ? ev.venue : ev.venue },
              { icon: Users,        label:"Max Participants", val: `${ev.maxParticipants} seats` },
              { icon: IndianRupee,  label:"Budget",        val: ev.budget ? `₹${ev.budget.toLocaleString()}` : "Not specified" },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background:"rgba(139,92,246,0.04)", border:"1px solid rgba(139,92,246,0.08)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background:"rgba(139,92,246,0.1)" }}>
                  <Icon size={13} className="text-violet-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-ink-light uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-semibold text-ink mt-0.5">{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fill rate */}
          {ev.registeredCount > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-ink-muted font-medium">Registration Fill Rate</span>
                <span className="font-bold text-ink">{ev.registeredCount} / {ev.maxParticipants} ({fill}%)</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full"
                  style={{ width:`${fill}%`, background: fill > 80 ? "#ef4444" : "#8b5cf6" }} />
              </div>
            </div>
          )}

          {/* Tags */}
          {ev.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {ev.tags.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{ background:"rgba(139,92,246,0.08)", color:"#7c3aed", border:"1px solid rgba(139,92,246,0.15)" }}>
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Coordinators */}
          {ev.coordinators.length > 0 && (
            <div>
              <p className="text-xs font-bold text-ink-muted uppercase tracking-wide mb-2">Coordinators</p>
              <div className="flex flex-wrap gap-2">
                {ev.coordinators.map(c => (
                  <span key={c} className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 text-ink-muted border border-slate-200 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <User size={12} />
                      {c}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rejection reason if rejected */}
          {ev.rejectedReason && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200">
              <AlertTriangle size={15} className="text-rose-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-rose-700 mb-0.5">Rejection Reason</p>
                <p className="text-sm text-rose-600">{ev.rejectedReason}</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2 border-t border-violet-50">
            {ev.status === "pending" && (
              <>
                <button onClick={onApprove} className="btn-approve flex-1 justify-center py-2.5">
                  <CheckCircle size={15} /> Approve Event
                </button>
                <button onClick={() => { onClose(); onReject(); }} className="btn-reject flex-1 justify-center py-2.5">
                  <XCircle size={15} /> Reject Event
                </button>
              </>
            )}
            <button onClick={onClose} className="btn-ghost flex-1 justify-center py-2.5">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
