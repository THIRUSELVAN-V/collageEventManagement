"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, BookOpen, ShieldCheck, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { loginUser, saveSession } from "@/lib/auth";

/* â”€â”€â”€ Role config â”€â”€â”€ */
const ROLES = [
  {
    key: "student",
    label: "Student",
    icon: GraduationCap,
    tagline: "Learn. Participate. Grow.",
    description: "Register for events, track your activities, and build your campus experience.",
    from: "#1e3a8a",
    mid:  "#1d4ed8",
    to:   "#4f46e5",
    accent: "#93c5fd",
    glow: "rgba(59,130,246,0.35)",
    hint: { email: "student@college.edu", pw: "yourpassword" },
  },
  {
    key: "faculty",
    label: "Faculty",
    icon: BookOpen,
    tagline: "Create. Inspire. Lead.",
    description: "Design meaningful events, coordinate participants, and shape campus culture.",
    from: "#052e16",
    mid:  "#065f46",
    to:   "#0d9488",
    accent: "#6ee7b7",
    glow: "rgba(16,185,129,0.35)",
    hint: { email: "faculty@college.edu", pw: "yourpassword" },
  },
  {
    key: "admin",
    label: "Admin",
    icon: ShieldCheck,
    tagline: "Manage. Approve. Govern.",
    description: "Oversee all events, approve submissions, and maintain institutional standards.",
    from: "#2e1065",
    mid:  "#4c1d95",
    to:   "#6d28d9",
    accent: "#c4b5fd",
    glow: "rgba(124,58,237,0.35)",
    hint: { email: "admin@college.edu", pw: "yourpassword" },
  },
] as const;

type RoleKey = (typeof ROLES)[number]["key"];

/* â”€â”€â”€ Floating orb positions (deterministic) â”€â”€â”€ */
const ORBS = [
  { w: 260, h: 260, top: "-60px",  left: "-60px",  delay: "0s",    dur: "7s",  opacity: 0.18 },
  { w: 180, h: 180, top: "40%",    left: "60%",    delay: "1.5s",  dur: "5s",  opacity: 0.12 },
  { w: 120, h: 120, top: "70%",    left: "10%",    delay: "3s",    dur: "6s",  opacity: 0.15 },
  { w: 90,  h: 90,  top: "20%",    left: "75%",    delay: "0.8s",  dur: "4s",  opacity: 0.2  },
  { w: 200, h: 200, top: "80%",    left: "50%",    delay: "2.2s",  dur: "8s",  opacity: 0.1  },
];

/* â”€â”€â”€ Main Component â”€â”€â”€ */
export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<RoleKey>("student");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [touched, setTouched]     = useState({ email: false, password: false });
  const [transitioning, setTransitioning] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const role = ROLES.find(r => r.key === activeRole)!;
  const ActiveRoleIcon = role.icon;

  /* clear fields when switching role */
  const switchRole = (key: RoleKey) => {
    if (key === activeRole) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveRole(key);
      setEmail("");
      setPassword("");
      setError("");
      setSuccess("");
      setTouched({ email: false, password: false });
      setTransitioning(false);
      setTimeout(() => emailRef.current?.focus(), 50);
    }, 220);
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwValid    = password.length >= 0;
  const canSubmit  = emailValid && pwValid && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await loginUser(email, password);
      const returnedRole = data.user.role?.toLowerCase();
      // Validate role matches selected
      if (returnedRole && returnedRole !== activeRole) {
        setError(`This account is registered as "${data.user.role}". Please select the correct role.`);
        setLoading(false);
        return;
      }
      saveSession(data);
      setSuccess(`Welcome back, ${data.user.username}! Redirectingâ€¦`);
      const portalUrls: Record<string, string> = {
  student: "http://localhost:3000/dashboard",
  faculty: "http://localhost:3001/dashboard",
  admin:   "http://localhost:3002/dashboard",
};
const redirectUrl = portalUrls[data.user.role?.toLowerCase()] ?? "http://localhost:3000/dashboard";
setTimeout(() => {
  window.location.href = redirectUrl;
}, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
      setLoading(false);
    }
  };

  /* keyboard shortcut: Enter */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canSubmit) handleSubmit(e as unknown as React.FormEvent);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [canSubmit, email, password]);

  return (
    <div className="w-screen h-screen flex overflow-hidden" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          LEFT PANEL â€” animated brand side
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div
        className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-10 overflow-hidden transition-all duration-700"
        style={{
          background: `linear-gradient(145deg, ${role.from} 0%, ${role.mid} 50%, ${role.to} 100%)`,
        }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating orbs */}
        {ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orb.w, height: orb.h,
              top: orb.top, left: orb.left,
              background: `radial-gradient(circle, ${role.accent}, transparent 70%)`,
              opacity: orb.opacity,
              animation: `floatSlow ${orb.dur} ease-in-out infinite`,
              animationDelay: orb.delay,
            }}
          />
        ))}

        {/* Rotating ring */}
        <div
          className="absolute animate-spin-slow pointer-events-none"
          style={{
            width: 420, height: 420,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid rgba(255,255,255,0.06)`,
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 280, height: 280,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid rgba(255,255,255,0.04)`,
            borderRadius: "50%",
          }}
        />

        {/* Top: Logo */}
        <div className="relative z-10 animate-fade-in">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
            >
              <GraduationCap size={20} color="white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>
                EduEvents
              </p>
              <p className="text-xs font-medium" style={{ color: role.accent }}>
                Campus Event Management
              </p>
            </div>
          </div>
        </div>

        {/* Center: Big hero content */}
        <div className="relative z-10 flex flex-col items-start">
          {/* Role icon */}
          <div
            className="mb-6 animate-float-slow select-none"
            style={{ filter: `drop-shadow(0 8px 24px ${role.glow})` }}
          >
            <ActiveRoleIcon size={72} color="white" strokeWidth={1.6} />
          </div>

          <div
            key={activeRole + "-text"}
            className={`transition-all duration-300 ${transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <h1
              className="text-5xl font-bold text-white leading-tight mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {role.tagline}
            </h1>
            <p className="text-base leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              {role.description}
            </p>
          </div>

          {/* Stats strip */}
          <div className="flex gap-6 mt-8">
            {[
              { val: "1,200+", label: "Students" },
              { val: "80+",    label: "Events/yr" },
              { val: "45+",    label: "Faculty" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{val}</p>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Testimonial / tip */}
        <div
          className="relative z-10 p-4 rounded-2xl animate-fade-in"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
            &ldquo;EduEvents transformed how our college manages campus activities â€” everything from registration to approval in one seamless platform.&rdquo;
          </p>
          <p className="text-xs font-semibold mt-2" style={{ color: role.accent }}>
            â€” Dr. Principal, Academic Director
          </p>
        </div>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          RIGHT PANEL â€” form side
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative overflow-hidden p-6"
        style={{ background: "#0c0a1a" }}
      >
        {/* Subtle bg glow matching role */}
        <div
          className="absolute pointer-events-none transition-all duration-700"
          style={{
            width: 500, height: 500,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${role.glow} 0%, transparent 70%)`,
            opacity: 0.4,
          }}
        />

        {/* Mobile logo */}
        <div className="lg:hidden mb-8 flex items-center gap-3 relative z-10 animate-fade-in">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${role.mid}, ${role.to})` }}
          >
            <GraduationCap size={18} color="white" />
          </div>
          <p className="text-white font-bold text-lg" style={{ fontFamily: "'Instrument Serif', serif" }}>EduEvents</p>
        </div>

        <div className="relative z-10 w-full max-w-[400px] animate-scale-in">

          {/* Header */}
          <div className="mb-8">
            <h2
              className="text-3xl font-bold text-white mb-2 leading-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Sign in to your portal and continue where you left off.
            </p>
          </div>

          {/* â”€â”€ ROLE SELECTOR â”€â”€ */}
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              I am a â€”
            </p>
            <div className="flex gap-2">
              {ROLES.map((r) => {
                const isActive = activeRole === r.key;
                const Icon = r.icon;
                return (
                  <button
                    key={r.key}
                    onClick={() => switchRole(r.key)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl transition-all duration-300 select-none"
                    style={isActive ? {
                      background: `linear-gradient(135deg, ${r.from}99, ${r.to}99)`,
                      border: `1.5px solid ${r.accent}55`,
                      boxShadow: `0 4px 24px ${r.glow}`,
                      transform: "scale(1.02)",
                    } : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                      style={isActive
                        ? { background: `linear-gradient(135deg, ${r.mid}, ${r.to})`, boxShadow: `0 4px 12px ${r.glow}` }
                        : { background: "rgba(255,255,255,0.06)" }}
                    >
                      <Icon size={16} style={{ color: isActive ? "white" : "rgba(255,255,255,0.4)" }} />
                    </div>
                    <span
                      className="text-xs font-bold transition-colors"
                      style={{ color: isActive ? "white" : "rgba(255,255,255,0.35)" }}
                    >
                      {r.label}
                    </span>
                    {isActive && (
                      <div
                        className="w-1 h-1 rounded-full animate-pulse-ring"
                        style={{ background: r.accent }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* â”€â”€ FORM â”€â”€ */}
          <form onSubmit={handleSubmit} noValidate>
            <div
              className={`space-y-4 transition-all duration-300 ${transitioning ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
            >
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                    style={{ color: email ? role.accent : "rgba(255,255,255,0.3)" }}
                  />
                  <input
                    ref={emailRef}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                    placeholder={role.hint.email}
                    className={`glass-input ${touched.email && !emailValid ? "error" : ""}`}
                  />
                  {touched.email && emailValid && (
                    <CheckCircle size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: role.accent }} />
                  )}
                </div>
                {touched.email && !emailValid && email.length > 0 && (
                  <p className="text-xs flex items-center gap-1.5 animate-slide-in-left" style={{ color: "#fca5a5" }}>
                    <AlertCircle size={12} /> Please enter a valid email address
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                    style={{ color: password ? role.accent : "rgba(255,255,255,0.3)" }}
                  />
                  <input
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, password: true }))}
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    className={`glass-input pr-12 ${touched.password && !pwValid ? "error" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-all hover:scale-110"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {touched.password && !pwValid && password.length > 0 && (
                  <p className="text-xs flex items-center gap-1.5 animate-slide-in-left" style={{ color: "#fca5a5" }}>
                    <AlertCircle size={12} /> Password must be at least 1 characters
                  </p>
                )}
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button type="button" className="text-xs font-semibold transition-all hover:opacity-80" style={{ color: role.accent }}>
                  Forgot password?
                </button>
              </div>

              {/* Error message */}
              {error && (
                <div
                  className="flex items-start gap-2.5 p-3.5 rounded-xl animate-slide-in-left"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-300 leading-snug">{error}</p>
                </div>
              )}

              {/* Success message */}
              {success && (
                <div
                  className="flex items-center gap-2.5 p-3.5 rounded-xl animate-slide-in-left"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
                >
                  <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                  <p className="text-sm text-emerald-300">{success}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-sm
                  transition-all duration-300 select-none mt-2
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: canSubmit
                    ? `linear-gradient(135deg, ${role.mid}, ${role.to})`
                    : "rgba(255,255,255,0.08)",
                  color: "white",
                  boxShadow: canSubmit ? `0 8px 28px ${role.glow}` : "none",
                  transform: canSubmit ? undefined : "none",
                }}
                onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px) scale(1.01)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Signing inâ€¦</>
                ) : (
                  <>Sign in as {role.label} <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>OR CONTINUE WITH</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* SSO buttons */}
          <div className="flex gap-3">
            {[
              { label: "Google", initial: "G" },
              { label: "Microsoft", initial: "M" },
            ].map(({ label, initial }) => (
              <button
                key={label}
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <span className="font-bold text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{initial}</span>
                {label} SSO
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
            Having trouble?{" "}
            <button className="font-semibold hover:opacity-80 transition-opacity" style={{ color: role.accent }}>
              Contact IT Support
            </button>
          </p>
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Secured by 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  );
}


