import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {register} from "../services/authApi.js"


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-emerald-400"];
  const pwdStrength = getStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex flex-col lg:flex-row font-sans">

      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#1a1a2e] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 5V11L8 15L1 11V5L8 1Z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight">YourApp</span>
        </div>
        <span className="text-white/30 text-xs tracking-widest uppercase">Register</span>
      </div>

      {/* Mobile Hero Banner */}
      <div className="lg:hidden bg-[#1a1a2e] px-6 pb-8 pt-2">
        <div className="w-10 h-0.5 bg-violet-500 rounded-full mb-4" />
        <h2 className="text-white text-2xl font-bold leading-snug mb-2">
          Start your<br />journey today.
        </h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Create your account in seconds and get started.
        </p>
      </div>

      {/* Left Panel — Desktop only */}
      <div className="hidden lg:flex w-1/2 bg-[#1a1a2e] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full border border-white/5" />
        <div className="absolute top-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full border border-white/5" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full border border-white/5" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 5V11L8 15L1 11V5L8 1Z" fill="white" fillOpacity="0.95" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">PrepAI</span>
        </div>

        <div className="relative z-10">
          <div className="w-16 h-1 bg-violet-500 rounded-full mb-8" />
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Start your<br />journey today.
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-xs">
            Create your account in seconds and unlock everything the platform has to offer.
          </p>
        </div>

        <p className="text-white/20 text-xs tracking-widest relative z-10">© 2026 PrepAI</p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 lg:py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-1">Create account</h1>
          <p className="text-gray-400 text-sm mb-8">Fill in your details to get started.</p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Min. 8 characters"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
              />
              {form.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= pwdStrength ? strengthColor[pwdStrength] : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">{strengthLabel[pwdStrength]}</span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#1a1a2e] text-white text-sm font-semibold hover:bg-[#16213e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99] mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
                    <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-300 text-xs leading-relaxed">
            By registering you agree to our{" "}
            <a href="#" className="text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors">Terms</a>{" "}
            &{" "}
            <a href="#" className="text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors">Privacy Policy</a>
          </p>

          <p className="mt-5 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-500 font-medium hover:text-violet-600 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}