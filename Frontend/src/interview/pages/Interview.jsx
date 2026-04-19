import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInterview } from "../hooks/useInterview.js";

const NAV_ITEMS = [
  {
    id: "technical", label: "Technical Questions",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  },
  {
    id: "behavioral", label: "Behavioral Questions",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  },
  {
    id: "roadmap", label: "Road Map",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
  },
];

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? "border-violet-500/30 bg-violet-500/5" : "border-white/8 bg-white/[0.02] hover:border-white/15"}`}>
      <div
        className="flex items-start gap-4 px-5 py-4 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="shrink-0 w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 text-violet-400 text-xs font-mono font-bold flex items-center justify-center">
          Q{index + 1}
        </span>
        <p className="flex-1 text-white/70 text-sm leading-relaxed">{item.question}</p>
        <span className={`shrink-0 text-white/30 transition-transform duration-200 mt-0.5 ${open ? "rotate-180" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/8 pt-4">
          <div>
            <span className="inline-block px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-2">
              Intention
            </span>
            <p className="text-white/50 text-sm leading-relaxed">{item.intention}</p>
          </div>
          <div>
            <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
              Model Answer
            </span>
            <p className="text-white/50 text-sm leading-relaxed">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 text-violet-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
        D{day.day}
      </div>
      <div className="flex-1 w-px bg-white/8 mt-2" />
    </div>
    <div className="pb-8 flex-1">
      <h3 className="text-white/80 font-semibold text-sm mb-3">{day.focus}</h3>
      <ul className="space-y-2">
        {day.tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-2 text-white/40 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400/50 mt-1.5 shrink-0" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function Interview() {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex flex-col items-center justify-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-violet-400/40 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-violet-500/60 animate-pulse" />
        </div>
        <p className="text-white/50 text-sm tracking-widest uppercase font-mono animate-pulse">
          Loading your interview plan...
        </p>
      </div>
    );
  }

  const scoreColor =
    report.matchScore >= 80 ? "text-emerald-400" :
    report.matchScore >= 60 ? "text-amber-400" : "text-red-400";

  const scoreBg =
    report.matchScore >= 80 ? "border-emerald-500/30 bg-emerald-500/5" :
    report.matchScore >= 60 ? "border-amber-500/30 bg-amber-500/5" : "border-red-500/30 bg-red-500/5";

  const scoreBar =
    report.matchScore >= 80 ? "bg-emerald-400" :
    report.matchScore >= 60 ? "bg-amber-400" : "bg-red-400";

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white font-sans">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[140px]" />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">

        {/* Left Nav */}
        <nav className="hidden lg:flex w-56 shrink-0 flex-col justify-between border-r border-white/8 p-5">
          <div>
            <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-4">Sections</p>
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    activeNav === item.id
                      ? "bg-violet-500/15 border border-violet-500/20 text-violet-400"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => getResumePdf(interviewId)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-violet-500/20"
          >
            <svg height="12" width="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button>
        </nav>

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">

          {/* Mobile Nav */}
          <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto pb-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                  activeNav === item.id
                    ? "bg-violet-500/15 border border-violet-500/20 text-violet-400"
                    : "text-white/40 border border-white/8 hover:text-white/70"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {activeNav === "technical" && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Technical Questions</h2>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-mono">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="space-y-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Behavioral Questions</h2>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-mono">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="space-y-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Preparation Road Map</h2>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-mono">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>
              <div className="mt-4">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col border-l border-white/8 p-5 gap-6">

          {/* Match Score */}
          <div className={`rounded-2xl border p-5 text-center ${scoreBg}`}>
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">Match Score</p>
            <div className={`text-5xl font-bold mb-1 ${scoreColor}`}>
              {report.matchScore}<span className="text-2xl">%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 mt-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${scoreBar} transition-all duration-700`}
                style={{ width: `${report.matchScore}%` }}
              />
            </div>
            <p className="text-white/30 text-xs mt-3">
              {report.matchScore >= 80 ? "Strong match for this role" :
               report.matchScore >= 60 ? "Good match — some gaps" : "Needs improvement"}
            </p>
          </div>

          {/* Skill Gaps */}
          <div>
            <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-4">Skill Gaps</p>
            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${
                    gap.severity === "high" ? "bg-red-500/10 border-red-500/20 text-red-400" :
                    gap.severity === "medium" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                    "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  }`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Download Button */}
          <button
            onClick={() => getResumePdf(interviewId)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold"
          >
            Download Resume
          </button>
        </aside>
      </div>
    </div>
  );
}