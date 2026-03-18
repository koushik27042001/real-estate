import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Mic,
  Building2,
  Shield,
  TrendingUp,
  Users,
  ChevronRight,
  Sparkles,
  Home as HomeIcon,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { getProperties } from "../services/propertyService";

const TABS = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "commercial", label: "Commercial" },
  { value: "plots", label: "Plots & Land" },
  { value: "post", label: "Post Property", free: true },
];

const PLACEHOLDERS = {
  buy: "Search locality, city or project",
  rent: "Search for rent in your city",
  commercial: "Office, retail, warehouse",
  plots: "Plots and land for sale",
  post: "List your property for free",
};

const CITIES = [
  "Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai",
  "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "Faridabad",
];

const FEATURES = [
  {
    icon: Shield,
    title: "Verified Listings",
    desc: "Every property is verified by our team for authenticity",
  },
  {
    icon: TrendingUp,
    title: "Transparent Pricing",
    desc: "Clear pricing with no hidden charges or surprises",
  },
  {
    icon: Users,
    title: "Trusted Network",
    desc: "Connect with certified agents and verified owners",
  },
];

const STATS = [
  { value: "1M+", label: "Property Listings" },
  { value: "5.5M+", label: "Monthly Searches" },
  { value: "200K+", label: "Active Owners" },
  { value: "4.8", label: "User Rating" },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("buy");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Residential");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProperties();
        setProperties(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab !== "post") {
      if (activeTab) params.set("mode", activeTab);
      if (category) params.set("category", category);
      if (query) params.set("q", query);
      navigate(`/properties?${params.toString()}`);
    } else {
      navigate("/postproperty");
    }
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        navigate(`/properties?lat=${latitude}&lng=${longitude}&near=true`);
      },
      () => alert("Location permission denied")
    );
  };

  const handleVoiceSearch = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Voice search not supported");
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.start();
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
    };
    recognition.onerror = () => alert("Voice recognition error");
  };

  const featured = properties.length > 0
    ? properties
    : [
        { _id: 1, title: "Luxury Apartment", location: "Bangalore", price: "85 L", images: null, img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
        { _id: 2, title: "Modern Villa", location: "Goa", price: "2.1 Cr", images: null, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
        { _id: 3, title: "Cozy Studio", location: "Mumbai", price: "45 L", images: null, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
      ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-slate-900/60" />

        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-28 md:pb-20">
          {/* Trust strip */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              Trusted by 200K+ owners
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              Verified Listings
            </span>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
              No brokerage*
            </span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              Find your perfect
              <span className="block bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
                home or property
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Search from 1M+ verified properties. Buy, rent, or list your property with India's leading real estate platform.
            </p>
          </div>

          {/* Search card */}
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-2xl border border-slate-700/50 bg-white/95 p-4 shadow-2xl backdrop-blur sm:p-6">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                {TABS.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                      activeTab === tab.value
                        ? "bg-sky-600 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                    {tab.free && (
                      <span className="rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        FREE
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <form onSubmit={onSearch} className="mt-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {activeTab !== "post" && (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="All Residential">All Residential</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Plot/Land">Plot/Land</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  )}

                  {activeTab !== "post" ? (
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={PLACEHOLDERS[activeTab]}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-12 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 rounded-xl border border-slate-200 bg-sky-50/50 py-2.5 px-4 text-sm font-medium text-sky-700">
                      List your property in minutes — reach millions of buyers
                    </div>
                  )}

                  <div className="flex gap-2">
                    {activeTab !== "post" && (
                      <>
                        <button
                          type="button"
                          onClick={handleNearMe}
                          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
                        >
                          <MapPin className="h-4 w-4" />
                          <span className="hidden sm:inline">Near Me</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleVoiceSearch}
                          className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50"
                          aria-label="Voice search"
                        >
                          <Mic className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 px-6 py-2.5 font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30"
                    >
                      <Search className="h-4 w-4" />
                      {activeTab === "post" ? "Post Property" : "Search"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popular cities */}
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Popular searches
          </p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <Link
                key={city}
                to={`/properties?q=${encodeURIComponent(city)}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
              >
                Properties in {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
                Featured Properties
              </h2>
              <p className="mt-1 text-slate-600">
                Handpicked listings for you
              </p>
            </div>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 font-semibold text-sky-600 hover:text-sky-700"
            >
              View all properties
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-slate-200/60 h-80" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => {
                const img = p.images?.[0]
                  ? `http://localhost:5000/${p.images[0]}`
                  : p.img || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2";
                return (
                  <Link
                    key={p._id}
                    to={`/property/${p._id}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-sky-200 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={img}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800 shadow">
                        Featured
                      </span>
                      <span className="absolute right-3 top-3 rounded-lg bg-slate-900/70 px-2.5 py-1 text-sm font-bold text-white">
                        {typeof p.price === "number" && p.price > 0
                          ? p.price >= 10000000
                            ? `₹${(p.price / 10000000).toFixed(1)} Cr`
                            : `₹${(p.price / 100000).toFixed(1)} L`
                          : p.price ? `₹${p.price}` : "—"}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-800 group-hover:text-sky-600">
                        {p.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {p.location}
                      </p>
                      {p.bedrooms && (
                        <p className="mt-2 text-xs text-slate-500">
                          {p.bedrooms} BHK • {p.area} sq.ft
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
              Why choose 99acres.com?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              India's most trusted real estate platform for buyers, tenants, and property owners
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 text-center transition-all hover:border-sky-200 hover:bg-sky-50/30"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-800">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-sky-600 md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/20">
            <Building2 className="h-8 w-8 text-sky-400" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white md:text-3xl">
            Ready to sell or rent your property?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            List your property for free and reach millions of serious buyers and tenants. Get unlimited enquiries.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/postproperty"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30"
            >
              <Sparkles className="h-5 w-5" />
              Post Property — FREE
            </Link>
            <Link
              to="/register"
              state={{ from: "/postproperty" }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 px-6 py-3.5 font-semibold text-white transition-colors hover:border-sky-500 hover:bg-slate-800"
            >
              Create account
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Free listing
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Unlimited enquiries
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Dedicated support
            </span>
          </div>
        </div>
      </section>

      {/* Quick links for different users */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
            Explore by profile
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/properties?mode=buy"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
            >
              <HomeIcon className="h-5 w-5 text-sky-600" />
              <span className="font-semibold text-slate-800">For Buyers</span>
            </Link>
            <Link
              to="/properties?mode=rent"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
            >
              <HomeIcon className="h-5 w-5 text-teal-600" />
              <span className="font-semibold text-slate-800">For Tenants</span>
            </Link>
            <Link
              to="/postproperty"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
            >
              <Building2 className="h-5 w-5 text-amber-600" />
              <span className="font-semibold text-slate-800">For Owners</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
            >
              <Briefcase className="h-5 w-5 text-violet-600" />
              <span className="font-semibold text-slate-800">For Agents</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
