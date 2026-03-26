"use client";

import Link from "next/link";
import {
  ShieldCheck, Clock3, XCircle, FileEdit, Users,
  IndianRupee, ArrowUpRight, ChevronRight,
  TrendingUp, CalendarDays, Zap, AlertTriangle,
  Hand, ClipboardList, Wallet, GraduationCap, Settings, Wrench, Drama, Megaphone, Trophy, PartyPopper,
  Brain, Laptop, Lock, Cloud, FileText, Rocket,
} from "lucide-react";
import { systemStats, allEvents, recentActions, adminProfile, type EventBanner } from "@/lib/data";

const PRIORITY_COLOR = {
  high:   { bg: "bg-rose-50",   text: "text-rose-600",   border: "border-rose-200",   dot: "bg-rose-500" },
  normal: { bg: "bg-sky-50",    text: "text-sky-600",     border: "border-sky-200",     dot: "bg-sky-500" },
  low:    { bg: "bg-slate-100", text: "text-slate-500",   border: "border-slate-200",   dot: "bg-slate-400" },
};

const ACTION_COLOR = {
  approve: { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  reject:  { dot: "bg-rose-500",    bg: "bg-rose-50",    text: "text-rose-700" },
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

const CATEGORY_ICON: Record<string, React.ElementType> = {
  Technical: Settings,
  Workshop: Wrench,
  Cultural: Drama,
  Seminar: Megaphone,
  Sports: Trophy,
  Fest: PartyPopper,
};

export default function DashboardPage() {
  const pending = allEvents.filter(e => e.status === "pending");
  const highPriority = pending.filter(e => e.priority === "high");
  const totalBudgetFmt = systemStats.totalBudget >= 100000
    ? `₹${(systemStats.totalBudget / 100000).toFixed(1)}L`
    : `₹${systemStats.totalBudget.toLocaleString()}`;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── HERO BANNER ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-7 text-white"
        style={{
          background: "linear-gradient(135deg, #16112e 0%, #2e1065 45%, #1e3a5f 100%)",
        }}
      >
        {/* decorative */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#a78bfa,transparent)" }} />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#38bdf8,transparent)", transform: "translateY(60%)" }} />
        {/* grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize:"36px 36px" }} />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold mb-4"
              style={{ background:"rgba(139,92,246,0.25)", color:"#c4b5fd", border:"1px solid rgba(139,92,246,0.35)" }}>
              <Zap size={11} /> Admin Command Centre
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2"
              style={{ fontFamily:"'Fraunces',serif" }}>
              <span className="inline-flex items-center gap-2">
                Good day, {adminProfile.name.split(" ").pop()}
                <Hand size={22} className="text-violet-200" />
              </span>
            </h1>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color:"rgba(255,255,255,0.65)" }}>
              There are{" "}
              <span className="font-bold" style={{ color:"#fde68a" }}>{systemStats.pending} events</span> pending your approval
              {highPriority.length > 0 && (
                <>, including <span className="font-bold text-rose-300">{highPriority.length} high-priority</span> submissions</>
              )}.
            </p>

            <div className="flex gap-3 mt-5">
              <Link href="/approvals"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-violet-900 transition-all hover:scale-105"
                style={{ background:"linear-gradient(135deg,#c4b5fd,#a78bfa)", boxShadow:"0 4px 20px rgba(139,92,246,0.4)" }}>
                <ShieldCheck size={15} /> Review Events
              </Link>
              <Link href="/approvals?filter=pending"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.8)" }}>
                Pending Only <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-3 md:w-56 flex-shrink-0">
            {[
              { label:"Total Events",  val: systemStats.totalEvents,               icon: ClipboardList },
              { label:"Registrations", val: systemStats.totalStudentRegistrations, icon: Users },
              { label:"Budget Pool",   val: totalBudgetFmt,                        icon: Wallet },
              { label:"Faculty",       val: systemStats.totalFaculty,              icon: GraduationCap },
            ].map(({ label, val, icon: Icon }) => (
              <div key={label} className="rounded-2xl p-3 text-center"
                style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)" }}>
                <div className="mb-1 flex justify-center">
                  <Icon size={18} className="text-white" />
                </div>
                <div className="text-lg font-bold text-white">{val}</div>
                <div className="text-[10px] leading-tight mt-0.5" style={{ color:"rgba(255,255,255,0.4)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Pending Review", val: systemStats.pending,
            icon: Clock3, accent: "#f59e0b",
            bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200",
            sub: "Awaiting decision",
          },
          {
            label: "Approved", val: systemStats.approved,
            icon: ShieldCheck, accent: "#10b981",
            bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",
            sub: "Events cleared",
          },
          {
            label: "Rejected", val: systemStats.rejected,
            icon: XCircle, accent: "#f43f5e",
            bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200",
            sub: "Sent back to faculty",
          },
          {
            label: "Drafts", val: systemStats.draft,
            icon: FileEdit, accent: "#8b5cf6",
            bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200",
            sub: "Not submitted yet",
          },
        ].map(({ label, val, icon: Icon, accent, bg, text, border, sub }, i) => (
          <div key={label} className="card card-hover p-5 relative overflow-hidden"
            style={{ animationDelay:`${i * 0.08}s` }}>
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-[18px]" style={{ background: accent }} />
            <div className={`w-9 h-9 ${bg} ${border} border rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={17} className={text} />
            </div>
            <div className="text-3xl font-bold text-ink mb-0.5">{val}</div>
            <div className="text-xs font-bold text-ink-muted uppercase tracking-wide">{label}</div>
            <div className="text-[11px] text-ink-light mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* ── TWO COLUMN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Pending events list */}
        <div className="lg:col-span-3 card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:"1px solid rgba(139,92,246,0.07)" }}>
            <div>
              <h3 className="font-bold text-ink text-sm" style={{ fontFamily:"'Fraunces',serif" }}>Pending Approvals</h3>
              <p className="text-xs text-ink-light mt-0.5">Requires your immediate attention</p>
            </div>
            <Link href="/approvals" className="text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all" style={{ color:"#7c3aed" }}>
              View All <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="divide-y" style={{ "--tw-divide-opacity":"1" } as React.CSSProperties}>
            {pending.slice(0, 5).map((ev) => {
              const pc = PRIORITY_COLOR[ev.priority];
              const BannerIcon = EVENT_BANNER_ICON[ev.banner];
              const daysAgo = Math.floor((Date.now() - new Date(ev.submittedAt).getTime()) / 86400000);
              return (
                <div key={ev.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-violet-50/40 transition-colors group">
                  <div className={`w-11 h-11 bg-gradient-to-br ${ev.gradient} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                    <BannerIcon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-ink truncate">{ev.title}</p>
                      <span className={`badge ${pc.bg} ${pc.text} ${pc.border} text-[10px] flex-shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                        {ev.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-ink-light">
                      <span>{ev.faculty}</span>
                      <span className="flex items-center gap-1"><CalendarDays size={10} />{ev.date}</span>
                      <span className="text-ink-faint">{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
                    </div>
                  </div>
                  <Link href="/approvals"
                    className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{ background:"rgba(139,92,246,0.08)", color:"#7c3aed", border:"1px solid rgba(139,92,246,0.15)" }}>
                    Review <ChevronRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recent decisions */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4" style={{ borderBottom:"1px solid rgba(139,92,246,0.07)" }}>
              <h3 className="font-bold text-ink text-sm" style={{ fontFamily:"'Fraunces',serif" }}>Recent Decisions</h3>
            </div>
            <div className="p-4 space-y-2">
              {recentActions.map((item) => {
                const cfg = ACTION_COLOR[item.type as keyof typeof ACTION_COLOR];
                return (
                  <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${cfg.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>{item.action}</span>
                        <p className="text-xs text-ink-muted truncate">{item.event}</p>
                      </div>
                      <p className="text-[10px] text-ink-light mt-0.5">{item.faculty} · {item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget overview */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee size={15} className="text-violet-500" />
              <h3 className="font-bold text-ink text-sm" style={{ fontFamily:"'Fraunces',serif" }}>Budget Overview</h3>
            </div>
            <div className="space-y-3">
              {[
                { label:"Approved Budget",  val: allEvents.filter(e=>e.status==="approved").reduce((s,e)=>s+(e.budget??0),0), color:"#10b981" },
                { label:"Pending Budget",   val: allEvents.filter(e=>e.status==="pending").reduce((s,e)=>s+(e.budget??0),0),  color:"#f59e0b" },
                { label:"Total Pool",       val: systemStats.totalBudget, color:"#8b5cf6" },
              ].map(({ label, val, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-muted font-medium">{label}</span>
                    <span className="font-bold text-ink">₹{val.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{
                      width:`${Math.min(100, Math.round(val / systemStats.totalBudget * 100))}%`,
                      background: color,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High priority alert */}
          {highPriority.length > 0 && (
            <div className="rounded-2xl p-4 flex items-start gap-3"
              style={{ background:"rgba(244,63,94,0.06)", border:"1px solid rgba(244,63,94,0.2)" }}>
              <AlertTriangle size={16} className="text-rose-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-rose-700 mb-1">High Priority Events</p>
                <p className="text-xs text-rose-600 leading-relaxed">
                  {highPriority.map(e => e.title).join(", ")} require immediate review.
                </p>
                <Link href="/approvals" className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 mt-2 hover:gap-2 transition-all">
                  Review now <ArrowUpRight size={11} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CATEGORY BREAKDOWN ── */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-ink text-sm" style={{ fontFamily:"'Fraunces',serif" }}>Events by Category</h3>
          <span className="text-xs text-ink-light">{systemStats.totalEvents} total</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {["Technical","Workshop","Cultural","Seminar","Sports","Fest"].map((cat) => {
            const count = allEvents.filter(e => e.category === cat).length;
            const colors: Record<string,string> = { Technical:"#3b82f6", Workshop:"#10b981", Cultural:"#c026d3", Seminar:"#f59e0b", Sports:"#ef4444", Fest:"#8b5cf6" };
            const Icon = CATEGORY_ICON[cat];
            return (
              <div key={cat}
                className="text-center p-3 rounded-2xl border transition-all hover:scale-105 cursor-pointer"
                style={{ border:`1px solid ${colors[cat]}20`, background:`${colors[cat]}08` }}>
                <div className="mb-1 flex justify-center">
                  <Icon size={20} style={{ color: colors[cat] }} />
                </div>
                <div className="text-xl font-bold text-ink">{count}</div>
                <div className="text-[10px] font-semibold text-ink-light">{cat}</div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
