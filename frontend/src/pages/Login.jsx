import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Home,
  Building2,
  UserCheck,
  Briefcase,
} from "lucide-react";

const ROLE_LABELS = {
  buyer: { label: "Buyer", icon: Home, desc: "Find your dream property" },
  seller: { label: "Owner", icon: Building2, desc: "Sell or rent your property" },
  agent: { label: "Agent / Broker", icon: Briefcase, desc: "Manage listings & leads" },
  admin: { label: "Admin", icon: UserCheck, desc: "Platform administration" },
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const redirectTo = location.state?.from;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user) navigate(redirectTo || `/dashboard/${user.role}`);
  }, [user, redirectTo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(formData.email)) errs.email = "Enter a valid email address";
    if (!formData.password) errs.password = "Password is required";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password, redirectTo);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50/30 to-teal-50/20 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white">
              <LogIn className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to access your account
            </p>
          </div>

          {/* Role badges hint */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {Object.entries(ROLE_LABELS).map(([key, { label, icon: Icon }]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                    fieldErrors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-12 text-sm outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                    fieldErrors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 py-3.5 font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign in
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              state={redirectTo ? { from: redirectTo } : undefined}
              className="font-semibold text-sky-600 hover:text-sky-700"
            >
              Create account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          By signing in, you agree to our{" "}
          <Link to="/" className="text-sky-600 hover:underline">Terms</Link> and{" "}
          <Link to="/" className="text-sky-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
