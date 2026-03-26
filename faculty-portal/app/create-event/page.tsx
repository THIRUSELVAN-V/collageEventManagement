"use client";

import { useState } from "react";
import {
  ChevronRight, ChevronLeft, CheckCircle2, Upload,
  MapPin, Calendar, Users, Clock, Tag, Info,
  Globe, Video, AlertCircle, Send, FileText,
  Plus, X, User,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

interface FormData {
  title: string;
  category: string;
  department: string;
  description: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  isOnline: boolean;
  venue: string;
  meetLink: string;
  maxParticipants: string;
  budget: string;
  tags: string[];
  tagInput: string;
  coordinators: string[];
  coordInput: string;
  eligibility: string;
  requirements: string;
  chiefGuest: string;
  resourcePersons: string;
}

const CATEGORIES = ["Technical", "Cultural", "Sports", "Workshop", "Seminar", "Fest"];
const DEPARTMENTS = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "MBA", "MCA", "All Departments"];

const STEPS = [
  { id: 1, label: "Basic Info",    icon: FileText },
  { id: 2, label: "Schedule",      icon: Calendar },
  { id: 3, label: "Details",       icon: Users },
  { id: 4, label: "Review",        icon: CheckCircle2 },
];

const initialForm: FormData = {
  title: "", category: "", department: "", description: "",
  date: "", endDate: "", time: "", endTime: "",
  isOnline: false, venue: "", meetLink: "",
  maxParticipants: "", budget: "",
  tags: [], tagInput: "",
  coordinators: [], coordInput: "",
  eligibility: "", requirements: "", chiefGuest: "", resourcePersons: "",
};

export default function CreateEventPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, val: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [field]: val }));

  const addTag = () => {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t) && form.tags.length < 6) {
      set("tags", [...form.tags, t]);
      set("tagInput", "");
    }
  };
  const removeTag = (t: string) => set("tags", form.tags.filter((x) => x !== t));

  const addCoord = () => {
    const c = form.coordInput.trim();
    if (c && !form.coordinators.includes(c)) {
      set("coordinators", [...form.coordinators, c]);
      set("coordInput", "");
    }
  };
  const removeCoord = (c: string) => set("coordinators", form.coordinators.filter((x) => x !== c));

  const canNext = () => {
    if (step === 1) return form.title && form.category && form.department && form.description.length > 20;
    if (step === 2) return form.date && form.time && (form.isOnline ? form.meetLink : form.venue);
    if (step === 3) return form.maxParticipants;
    return true;
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center animate-scale-in">
        <div className="card p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, #14b8a6, #0d9488)", boxShadow: "0 0 40px rgba(20,184,166,0.3)" }}>
            <CheckCircle2 size={36} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Event Submitted!
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-2">
            <span className="font-semibold text-slate-700">&ldquo;{form.title}&rdquo;</span> has been submitted for admin approval.
          </p>
          <p className="text-xs text-slate-400 mb-8">You will be notified once the admin reviews your event. Typically takes 1–2 business days.</p>
          <div className="flex flex-col gap-3">
            <a href="/my-events" className="btn-primary justify-center">View My Events</a>
            <button onClick={() => { setSubmitted(false); setForm(initialForm); setStep(1); }}
              className="btn-secondary justify-center">
              Create Another Event
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">

      {/* Step Header */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-900" style={{ fontFamily: "'DM Serif Display',serif" }}>
            New Event — Step {step} of 4
          </h2>
          <span className="text-xs text-slate-400 font-medium">{Math.round(((step - 1) / 4) * 100)}% complete</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%`, background: "linear-gradient(90deg,#14b8a6,#0d9488)" }} />
        </div>
        {/* Steps */}
        <div className="flex items-center gap-0">
          {STEPS.map(({ id, label, icon: Icon }, idx) => {
            const done = step > id;
            const active = step === id;
            return (
              <div key={id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`step-dot ${done ? "done" : active ? "active" : "idle"}`}
                    style={active ? { background: "#0f1b35" } : {}}>
                    {done ? <CheckCircle2 size={14} /> : <Icon size={13} />}
                  </div>
                  <span className={`text-[10px] font-semibold whitespace-nowrap ${active ? "text-slate-800" : done ? "text-teal-600" : "text-slate-400"}`}>
                    {label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-2 mb-4" style={{ background: done ? "#14b8a6" : "#e2e8f0" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="card p-6 animate-slide-up">

        {/* STEP 1 — Basic Info */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "'DM Serif Display',serif" }}>Event Details</h3>
              <p className="text-sm text-slate-400">Fill in the core information about your event</p>
            </div>

            <div>
              <label className="form-label">Event Title *</label>
              <input className="form-input" placeholder="e.g. National Symposium on Deep Learning 2025"
                value={form.title} onChange={(e) => set("title", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Category *</label>
                <select className="form-input" value={form.category} onChange={(e) => set("category", e.target.value)}>
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Department *</label>
                <select className="form-input" value={form.department} onChange={(e) => set("department", e.target.value)}>
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Description * <span className="normal-case text-slate-400 font-normal">(min 20 characters)</span></label>
              <textarea className="form-input resize-none" rows={5}
                placeholder="Describe the event, its purpose, what participants will gain, invited speakers, and any special activities..."
                value={form.description} onChange={(e) => set("description", e.target.value)} />
              <p className="text-xs text-slate-400 mt-1 text-right">{form.description.length} chars</p>
            </div>

            <div>
              <label className="form-label">Tags <span className="normal-case text-slate-400 font-normal">(up to 6)</span></label>
              <div className="flex gap-2">
                <input className="form-input flex-1" placeholder="e.g. AI, Workshop, Certificate..."
                  value={form.tagInput}
                  onChange={(e) => set("tagInput", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                <button onClick={addTag} className="btn-secondary px-4 py-2">
                  <Plus size={15} />
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold"
                      style={{ background: "rgba(20,184,166,0.1)", color: "#0d9488", border: "1px solid rgba(20,184,166,0.25)" }}>
                      <Tag size={11} /> {t}
                      <button onClick={() => removeTag(t)} className="hover:text-red-500 transition-colors"><X size={11} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2 — Schedule & Venue */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "'DM Serif Display',serif" }}>Schedule & Venue</h3>
              <p className="text-sm text-slate-400">Set dates, times, and location for your event</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label"><Calendar size={12} className="inline mr-1" />Start Date *</label>
                <input type="date" className="form-input" value={form.date} onChange={(e) => set("date", e.target.value)} />
              </div>
              <div>
                <label className="form-label"><Calendar size={12} className="inline mr-1" />End Date</label>
                <input type="date" className="form-input" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label"><Clock size={12} className="inline mr-1" />Start Time *</label>
                <input type="time" className="form-input" value={form.time} onChange={(e) => set("time", e.target.value)} />
              </div>
              <div>
                <label className="form-label"><Clock size={12} className="inline mr-1" />End Time</label>
                <input type="time" className="form-input" value={form.endTime} onChange={(e) => set("endTime", e.target.value)} />
              </div>
            </div>

            {/* Online toggle */}
            <div>
              <label className="form-label">Event Mode *</label>
              <div className="flex gap-3">
                {[
                  { val: false, label: "In-Person", icon: MapPin },
                  { val: true,  label: "Online",    icon: Video },
                ].map(({ val, label, icon: Icon }) => (
                  <button key={String(val)}
                    onClick={() => set("isOnline", val)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all border"
                    style={form.isOnline === val ? {
                      background: "rgba(20,184,166,0.1)", color: "#0d9488",
                      border: "2px solid rgba(20,184,166,0.4)",
                    } : { background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" }}>
                    <Icon size={16} /> {label}
                  </button>
                ))}
              </div>
            </div>

            {form.isOnline ? (
              <div>
                <label className="form-label"><Globe size={12} className="inline mr-1" />Meeting Link *</label>
                <input className="form-input" placeholder="https://meet.google.com/xxx-yyy or Zoom link"
                  value={form.meetLink} onChange={(e) => set("meetLink", e.target.value)} />
              </div>
            ) : (
              <div>
                <label className="form-label"><MapPin size={12} className="inline mr-1" />Venue *</label>
                <input className="form-input" placeholder="e.g. Seminar Hall A, Block 3 or Main Auditorium"
                  value={form.venue} onChange={(e) => set("venue", e.target.value)} />
              </div>
            )}

            {/* Banner upload placeholder */}
            <div>
              <label className="form-label"><Upload size={12} className="inline mr-1" />Event Banner</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-teal-300 transition-colors cursor-pointer group">
                <Upload size={24} className="mx-auto text-slate-300 mb-2 group-hover:text-teal-400 transition-colors" />
                <p className="text-sm text-slate-400 font-medium">Click to upload or drag & drop</p>
                <p className="text-xs text-slate-300 mt-1">PNG, JPG or WEBP · Max 5MB</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Participants & Details */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "'DM Serif Display',serif" }}>Participants & Details</h3>
              <p className="text-sm text-slate-400">Registration limits, budget, and coordination details</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label"><Users size={12} className="inline mr-1" />Max Participants *</label>
                <input type="number" min="1" className="form-input" placeholder="e.g. 200"
                  value={form.maxParticipants} onChange={(e) => set("maxParticipants", e.target.value)} />
              </div>
              <div>
                <label className="form-label">Estimated Budget (₹)</label>
                <input type="number" min="0" className="form-input" placeholder="e.g. 25000"
                  value={form.budget} onChange={(e) => set("budget", e.target.value)} />
              </div>
            </div>

            <div>
              <label className="form-label">Eligibility</label>
              <input className="form-input" placeholder="e.g. All B.Tech / M.Tech students, Final year only..."
                value={form.eligibility} onChange={(e) => set("eligibility", e.target.value)} />
            </div>

            <div>
              <label className="form-label">Event Coordinators</label>
              <div className="flex gap-2">
                <input className="form-input flex-1" placeholder="Add coordinator name..."
                  value={form.coordInput}
                  onChange={(e) => set("coordInput", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCoord())} />
                <button onClick={addCoord} className="btn-secondary px-4 py-2"><Plus size={15} /></button>
              </div>
              {form.coordinators.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.coordinators.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      <User size={11} /> {c}
                      <button onClick={() => removeCoord(c)} className="hover:text-red-500 transition-colors"><X size={11} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="form-label">Chief Guest / Speaker</label>
              <input className="form-input" placeholder="Name and designation of chief guest..."
                value={form.chiefGuest} onChange={(e) => set("chiefGuest", e.target.value)} />
            </div>

            <div>
              <label className="form-label">Resource Persons</label>
              <input className="form-input" placeholder="Names of resource persons / panelists..."
                value={form.resourcePersons} onChange={(e) => set("resourcePersons", e.target.value)} />
            </div>

            <div>
              <label className="form-label">Requirements / Note to Admin</label>
              <textarea className="form-input resize-none" rows={3}
                placeholder="Any special equipment, lab access, or permissions needed..."
                value={form.requirements} onChange={(e) => set("requirements", e.target.value)} />
            </div>
          </div>
        )}

        {/* STEP 4 — Review */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "'DM Serif Display',serif" }}>Review & Submit</h3>
              <p className="text-sm text-slate-400">Confirm all details before sending for approval</p>
            </div>

            {/* Preview card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              {/* Header */}
              <div className="p-5" style={{ background: "linear-gradient(135deg, #0f1b35, #0d5c54)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(20,184,166,0.25)", color: "#5eead4", border: "1px solid rgba(20,184,166,0.3)" }}>
                    {form.category || "Category"}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                    {form.department || "Dept"}
                  </span>
                </div>
                <h4 className="text-white font-bold text-lg mt-2" style={{ fontFamily: "'DM Serif Display',serif" }}>
                  {form.title || "Event Title"}
                </h4>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 bg-white">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {form.description || <span className="text-slate-300 italic">No description</span>}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Calendar, label: "Date", val: form.date ? `${form.date}${form.endDate ? " → " + form.endDate : ""}` : "—" },
                    { icon: Clock,    label: "Time", val: form.time ? `${form.time}${form.endTime ? " – " + form.endTime : ""}` : "—" },
                    { icon: form.isOnline ? Video : MapPin, label: form.isOnline ? "Meeting Link" : "Venue", val: form.isOnline ? (form.meetLink || "—") : (form.venue || "—") },
                    { icon: Users,    label: "Max Participants", val: form.maxParticipants || "—" },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon size={13} className="text-teal-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                        <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate max-w-[120px]">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{ background: "rgba(20,184,166,0.08)", color: "#0d9488", border: "1px solid rgba(20,184,166,0.2)" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {form.coordinators.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.coordinators.map((c) => (
                      <span key={c} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                        <User size={11} /> {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)" }}>
              <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Once submitted, your event will be sent to the admin for approval. You can still edit it while it&apos;s in <strong>pending</strong> status.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={() => step > 1 && setStep((s) => (s - 1) as Step)}
          disabled={step === 1}
          className="btn-secondary gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div className="flex gap-1.5">
          {STEPS.map(({ id }) => (
            <div key={id}
              className="rounded-full transition-all duration-300"
              style={{
                width: step === id ? "24px" : "8px",
                height: "8px",
                background: step > id ? "#14b8a6" : step === id ? "#0f1b35" : "#cbd5e1",
              }} />
          ))}
        </div>

        {step < 4 ? (
          <button
            onClick={() => canNext() && setStep((s) => (s + 1) as Step)}
            disabled={!canNext()}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Continue <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={() => setSubmitted(true)} className="btn-primary gap-2">
            <Send size={15} /> Submit for Approval
          </button>
        )}
      </div>

    </div>
  );
}
