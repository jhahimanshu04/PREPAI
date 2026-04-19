import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
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
          <span className="text-white font-semibold tracking-tight">PrepAI</span>
        </div>
        <span className="text-white/30 text-xs tracking-widest uppercase">Sign In</span>
      </div>

      {/* Mobile Hero Banner */}
      <div className="lg:hidden bg-[#1a1a2e] px-6 pb-8 pt-2">
        <div className="w-10 h-0.5 bg-violet-500 rounded-full mb-4" />
        <h2 className="text-white text-2xl font-bold leading-snug mb-2">
          Good to see<br />you again.
        </h2>
        <p className="text-white/40 text-sm leading-relaxed">
          Sign in to pick up right where you left off.
        </p>
      </div>

      {/* Left Panel — Desktop */}
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
            Good to see<br />you again.
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-xs">
            Login to pick up right where you left off. Everything's waiting for you.
          </p>
        </div>

        <p className="text-white/20 text-xs tracking-widest relative z-10">© 2026 PrepAI</p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 lg:py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-1">Login</h1>
          <p className="text-gray-400 text-sm mb-8">Welcome back — enter your details below.</p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-11 text-[#1a1a2e] text-sm placeholder:text-gray-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M2 2L14 14M6.5 6.6A2 2 0 0 0 9.4 9.5M4.1 4.2C2.8 5.1 1.8 6.4 1 8c1.5 3 4 5 7 5 1.3 0 2.5-.4 3.6-1M6 3.1C6.6 3 7.3 3 8 3c3 0 5.5 2 7 5-.5 1.1-1.2 2.1-2 2.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8C2.5 5 5 3 8 3s5.5 2 7 5c-1.5 3-4 5-7 5s-5.5-2-7-5Z" stroke="currentColor" strokeWidth="1.3" />
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

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
                  Logging in...
                </span>
              ) : (
                "Continue →"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-400 text-sm">
            No account?{" "}
            <Link to="/register" className="text-violet-500 font-medium hover:text-violet-600 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}