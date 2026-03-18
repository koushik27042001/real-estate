import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Home,
  Building2,
  Briefcase,
  Shield,
  Check,
  X,
} from "lucide-react";

const ROLES = [
  {
    value: "buyer",
    label: "Buyer",
    icon: Home,
    desc: "Search & buy properties",
    short: "I want to buy",
  },
  {
    value: "seller",
    label: "Owner",
    icon: Building2,
    desc: "Sell or rent your property",
    short: "I want to sell/rent",
  },
  {
    value: "agent",
    label: "Agent / Broker",
    icon: Briefcase,
    desc: "Manage listings & clients",
    short: "I'm an agent",
  },
  {
    value: "admin",
    label: "Admin",
    icon: Shield,
    desc: "Platform administration",
    short: "Admin access",
  },
];

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) => {
  const checks = {
    min: password.length >= 6,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
  };
  return checks;
};

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, user } = useAuth();
  const redirectTo = location.state?.from;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.name.trim()) errs.name = "Name is required";
    else if (formData.name.trim().length < 2) errs.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(formData.email)) errs.email = "Enter a valid email address";

    const pwChecks = validatePassword(formData.password);
    if (!formData.password) errs.password = "Password is required";
    else if (!pwChecks.min) errs.password = "Password must be at least 6 characters";
    else if (!pwChecks.hasLetter) errs.password = "Password must contain a letter";
    else if (!pwChecks.hasNumber) errs.password = "Password must contain a number";

    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
        formData.role,
        redirectTo
      );
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pwChecks = formData.password ? validatePassword(formData.password) : null;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50/30 to-teal-50/20 px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 text-white">
              <UserPlus className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">
              Join 99acres.com to buy, sell, or rent properties
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ROLES.map((role) => {
                  const Icon = role.icon;
                  const isSelected = formData.role === role.value;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, role: role.value }))}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-center transition-all ${
                        isSelected
                          ? "border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-500/30"
                          : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isSelected ? "text-sky-600" : ""}`} />
                      <span className="text-xs font-semibold">{role.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {ROLES.find((r) => r.value === formData.role)?.desc}
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  className={`w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                    fieldErrors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  }`}
                />
              </div>
              {fieldErrors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.name}</p>
              )}
            </div>

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
                  autoComplete="new-password"
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
              {pwChecks && (
                <div className="mt-2 flex flex-wrap gap-3 text-xs">
                  <span className={pwChecks.min ? "text-emerald-600" : "text-slate-400"}>
                    {pwChecks.min ? <Check className="inline h-3.5 w-3.5" /> : <X className="inline h-3.5 w-3.5" />}{" "}
                    Min 6 characters
                  </span>
                  <span className={pwChecks.hasLetter ? "text-emerald-600" : "text-slate-400"}>
                    {pwChecks.hasLetter ? <Check className="inline h-3.5 w-3.5" /> : <X className="inline h-3.5 w-3.5" />}{" "}
                    One letter
                  </span>
                  <span className={pwChecks.hasNumber ? "text-emerald-600" : "text-slate-400"}>
                    {pwChecks.hasNumber ? <Check className="inline h-3.5 w-3.5" /> : <X className="inline h-3.5 w-3.5" />}{" "}
                    One number
                  </span>
                </div>
              )}
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full rounded-xl border bg-slate-50/50 py-2.5 pl-10 pr-12 text-sm outline-none transition-colors placeholder:text-slate-400 focus:bg-white ${
                    fieldErrors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.confirmPassword}</p>
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
                  <UserPlus className="h-5 w-5" />
                  Create account
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              state={redirectTo ? { from: redirectTo } : undefined}
              className="font-semibold text-sky-600 hover:text-sky-700"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          By creating an account, you agree to our{" "}
          <Link to="/" className="text-sky-600 hover:underline">Terms</Link> and{" "}
          <Link to="/" className="text-sky-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
