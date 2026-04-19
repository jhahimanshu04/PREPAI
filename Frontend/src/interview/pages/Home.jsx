// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// // Mock hook — replace with your real useInterview hook
// const useInterview = () => ({
//   loading: false,
//   generateReport: async () => ({ id: "123" }),
//   reports: [
//     { id: "1", title: "Senior React Developer", matchScore: 88, createdAt: new Date() },
//     { id: "2", title: "Full Stack Engineer", matchScore: 65, createdAt: new Date() },
//   ],
// });

// export default function Home() {
//   const { loading, generateReport, reports } = useInterview();
//   const [jobDescription, setJobDescription] = useState("");
//   const [selfDescription, setSelfDescription] = useState("");
//   const [fileName, setFileName] = useState("");
//   const resumeInputRef = useRef();
//   const navigate = useNavigate();

//   const handleGenerateReport = async () => {
//     const resumeFile = resumeInputRef.current.files[0];
//     const data = await generateReport({ jobDescription, selfDescription, resumeFile });
//     navigate(`/interview/${data.id}`);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setFileName(file.name);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0f0f14] flex flex-col items-center justify-center gap-6">
//         <div className="relative w-16 h-16">
//           <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 animate-ping" />
//           <div className="absolute inset-2 rounded-full border-2 border-violet-400/40 animate-pulse" />
//           <div className="absolute inset-4 rounded-full bg-violet-500/60 animate-pulse" />
//         </div>
//         <p className="text-white/50 text-sm tracking-widest uppercase font-mono animate-pulse">
//           Building your interview strategy...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0f0f14] text-white font-sans">
//       {/* Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[140px]" />
//         <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
//         <div
//           className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
//             backgroundSize: "60px 60px",
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">

//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs tracking-widest uppercase font-mono mb-6">
//             <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
//             AI Powered · PrepAI
//           </div>
//           <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
//             Create Your Custom
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
//               Interview Strategy
//             </span>
//           </h1>
//           <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
//             Let our AI analyze the job requirements and your unique profile to build a winning strategy tailored just for you.
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-[#13131a] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 mb-8">

//           {/* Card Body */}
//           <div className="flex flex-col lg:flex-row">

//             {/* Left Panel — Job Description */}
//             <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-white/8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-white font-semibold text-sm">Target Job Description</h2>
//                   <span className="text-xs text-red-400/80 font-mono">Required</span>
//                 </div>
//               </div>
//               <textarea
//                 onChange={(e) => setJobDescription(e.target.value)}
//                 value={jobDescription}
//                 placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript...'`}
//                 maxLength={5000}
//                 className="w-full h-72 bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/6 resize-none transition-all duration-200 font-mono leading-relaxed"
//               />
//               <div className="mt-2 text-right text-white/20 text-xs font-mono">
//                 {jobDescription.length} / 5000
//               </div>
//             </div>

//             {/* Right Panel — Profile */}
//             <div className="flex-1 p-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-white font-semibold text-sm">Your Profile</h2>
//                   <span className="text-xs text-white/30 font-mono">Resume or description</span>
//                 </div>
//               </div>

//               {/* Upload Resume */}
//               <label
//                 htmlFor="resume"
//                 className="flex flex-col items-center justify-center gap-3 w-full h-36 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 mb-4"
//               >
//                 {fileName ? (
//                   <>
//                     <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
//                     </div>
//                     <p className="text-emerald-400 text-sm font-medium">{fileName}</p>
//                     <p className="text-white/30 text-xs">Click to change file</p>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
//                       </svg>
//                     </div>
//                     <p className="text-white/50 text-sm">Click to upload or drag &amp; drop</p>
//                     <p className="text-white/20 text-xs">PDF or DOCX · Max 5MB</p>
//                   </>
//                 )}
//                 <input
//                   ref={resumeInputRef}
//                   hidden
//                   type="file"
//                   id="resume"
//                   name="resume"
//                   accept=".pdf,.docx"
//                   onChange={handleFileChange}
//                 />
//               </label>

//               {/* OR Divider */}
//               <div className="flex items-center gap-3 my-4">
//                 <div className="flex-1 h-px bg-white/8" />
//                 <span className="text-white/20 text-xs font-mono tracking-widest">OR</span>
//                 <div className="flex-1 h-px bg-white/8" />
//               </div>

//               {/* Self Description */}
//               <textarea
//                 onChange={(e) => setSelfDescription(e.target.value)}
//                 value={selfDescription}
//                 placeholder="Briefly describe your experience, key skills, and years of experience..."
//                 className="w-full h-28 bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 resize-none transition-all duration-200 leading-relaxed"
//               />

//               {/* Info Box */}
//               <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-500/8 border border-amber-500/15">
//                 <svg className="text-amber-400 mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                   <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#0f0f14" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#0f0f14" strokeWidth="2" />
//                 </svg>
//                 <p className="text-amber-400/70 text-xs leading-relaxed">
//                   Either a <span className="text-amber-400 font-semibold">Resume</span> or a <span className="text-amber-400 font-semibold">Self Description</span> is required to generate a personalized plan.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Card Footer */}
//           <div className="px-8 py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02]">
//             <div className="flex items-center gap-2 text-white/25 text-xs font-mono">
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-violet-400/50">
//                 <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
//               </svg>
//               AI-Powered Strategy · ~30 seconds
//             </div>
//             <button
//               onClick={handleGenerateReport}
//               disabled={!jobDescription}
//               className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-500/20 active:scale-[0.98]"
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
//               </svg>
//               Generate My Interview Strategy
//             </button>
//           </div>
//         </div>

//         {/* Recent Reports */}
//         {reports.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-white/60 text-xs font-mono tracking-widest uppercase mb-4">
//               Recent Interview Plans
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {reports.map((report) => (
//                 <div
//                   key={report.id}
//                   onClick={() => navigate(`/interview/${report.id}`)}
//                   className="bg-[#13131a] border border-white/8 rounded-xl p-5 cursor-pointer hover:border-violet-500/30 hover:bg-white/[0.03] transition-all duration-200 group"
//                 >
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="text-white/80 font-semibold text-sm group-hover:text-white transition-colors line-clamp-1">
//                       {report.title || "Untitled Position"}
//                     </h3>
//                     <svg className="text-white/20 group-hover:text-violet-400 transition-colors shrink-0 ml-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M5 12h14M12 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                   <p className="text-white/25 text-xs font-mono mb-3">
//                     {new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//                   </p>
//                   <div className="flex items-center gap-2">
//                     <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
//                       <div
//                         className={`h-full rounded-full transition-all duration-500 ${
//                           report.matchScore >= 80 ? "bg-emerald-400" :
//                           report.matchScore >= 60 ? "bg-amber-400" : "bg-red-400"
//                         }`}
//                         style={{ width: `${report.matchScore}%` }}
//                       />
//                     </div>
//                     <span className={`text-xs font-mono font-bold ${
//                       report.matchScore >= 80 ? "text-emerald-400" :
//                       report.matchScore >= 60 ? "text-amber-400" : "text-red-400"
//                     }`}>
//                       {report.matchScore}%
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <footer className="text-center flex items-center justify-center gap-6">
//           {["Privacy Policy", "Terms of Service", "Help Center"].map((link) => (
//             <a key={link} href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors font-mono">
//               {link}
//             </a>
//           ))}
//         </footer>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview.js";

export default function Home() {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({ jobDescription, selfDescription, resumeFile });
    console.log("Report data:", data);
    if (data?.id) {
      navigate(`/interview/${data.id}`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex flex-col items-center justify-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-violet-400/40 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-violet-500/60 animate-pulse" />
        </div>
        <p className="text-white/50 text-sm tracking-widest uppercase font-mono animate-pulse">
          Building your interview strategy...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white font-sans">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs tracking-widest uppercase font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            AI Powered · PrepAI
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Create Your Custom
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Interview Strategy
            </span>
          </h1>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
            Let our AI analyze the job requirements and your unique profile to build a winning strategy tailored just for you.
          </p>
        </div>

        <div className="bg-[#13131a] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 mb-8">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-white/8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-sm">Target Job Description</h2>
                  <span className="text-xs text-red-400/80 font-mono">Required</span>
                </div>
              </div>
              <textarea
                onChange={(e) => setJobDescription(e.target.value)}
                value={jobDescription}
                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript...'`}
                maxLength={5000}
                className="w-full h-72 bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/6 resize-none transition-all duration-200 font-mono leading-relaxed"
              />
              <div className="mt-2 text-right text-white/20 text-xs font-mono">
                {jobDescription.length} / 5000
              </div>
            </div>

            <div className="flex-1 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-sm">Your Profile</h2>
                  <span className="text-xs text-white/30 font-mono">Resume or description</span>
                </div>
              </div>

              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center gap-3 w-full h-36 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 mb-4"
              >
                {fileName ? (
                  <>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p className="text-emerald-400 text-sm font-medium">{fileName}</p>
                    <p className="text-white/30 text-xs">Click to change file</p>
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                      </svg>
                    </div>
                    <p className="text-white/50 text-sm">Click to upload or drag &amp; drop</p>
                    <p className="text-white/20 text-xs">PDF or DOCX · Max 5MB</p>
                  </>
                )}
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />
              </label>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-white/20 text-xs font-mono tracking-widest">OR</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                value={selfDescription}
                placeholder="Briefly describe your experience, key skills, and years of experience..."
                className="w-full h-28 bg-white/4 border border-white/8 rounded-xl px-4 py-3.5 text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 resize-none transition-all duration-200 leading-relaxed"
              />

              <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-500/8 border border-amber-500/15">
                <svg className="text-amber-400 mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#0f0f14" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#0f0f14" strokeWidth="2" />
                </svg>
                <p className="text-amber-400/70 text-xs leading-relaxed">
                  Either a <span className="text-amber-400 font-semibold">Resume</span> or a <span className="text-amber-400 font-semibold">Self Description</span> is required to generate a personalized plan.
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-white/25 text-xs font-mono">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-violet-400/50">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              AI-Powered Strategy · ~30 seconds
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={!jobDescription}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-500/20 active:scale-[0.98]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Generate My Interview Strategy
            </button>
          </div>
        </div>

        {reports.length > 0 && (
          <div className="mb-8">
            <h2 className="text-white/60 text-xs font-mono tracking-widest uppercase mb-4">
              Recent Interview Plans
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => navigate(`/interview/${report.id}`)}
                  className="bg-[#13131a] border border-white/8 rounded-xl p-5 cursor-pointer hover:border-violet-500/30 hover:bg-white/[0.03] transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white/80 font-semibold text-sm group-hover:text-white transition-colors line-clamp-1">
                      {report.title || "Untitled Position"}
                    </h3>
                    <svg className="text-white/20 group-hover:text-violet-400 transition-colors shrink-0 ml-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-white/25 text-xs font-mono mb-3">
                    {new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          report.matchScore >= 80 ? "bg-emerald-400" :
                          report.matchScore >= 60 ? "bg-amber-400" : "bg-red-400"
                        }`}
                        style={{ width: `${report.matchScore}%` }}
                      />
                    </div>
                    <span className={`text-xs font-mono font-bold ${
                      report.matchScore >= 80 ? "text-emerald-400" :
                      report.matchScore >= 60 ? "text-amber-400" : "text-red-400"
                    }`}>
                      {report.matchScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center flex items-center justify-center gap-6">
          {["Privacy Policy", "Terms of Service", "Help Center"].map((link) => (
            <a key={link} href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors font-mono">
              {link}
            </a>
          ))}
        </footer>
      </div>
    </div>
  );
}