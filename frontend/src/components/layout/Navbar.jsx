import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Headphones,
  User,
  Menu,
  X,
  Search,
  LogOut,
  LayoutDashboard,
  Heart,
  Building2,
  MapPin,
  Home,
  Briefcase,
  TrendingUp,
  FileText,
  Users,
  Shield,
  Smartphone,
  HelpCircle,
  Info,
  CreditCard,
  Plus,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import LocationDropdown from "./Navbar_component/LocationDropdown";

const DASHBOARD_LINKS = {
  buyer: "/dashboard/buyer",
  seller: "/dashboard/seller",
  agent: "/dashboard/agent",
  admin: "/dashboard/admin",
};

const menuConfig = {
  buyers: {
    label: "For Buyers",
    categories: [
      {
        key: "residential",
        label: "Residential",
        icon: Home,
        links: [
          "Buy in Delhi / NCR","Buy in Mumbai","Buy in Bangalore","Buy in Hyderabad",
          "Buy in Pune","Buy in Kolkata","Buy in Ahmedabad","Buy in Chennai",
          "Buy in Noida","Buy in Gurgaon","Buy in Navi Mumbai","Buy in Thane",
        ],
      },
      {
        key: "commercial",
        label: "Commercial",
        icon: Briefcase,
        links: [
          "Buy in Delhi / NCR","Buy in Mumbai","Buy in Bangalore","Buy in Hyderabad",
          "Buy in Pune","Buy in Kolkata","Buy in Chennai","Buy in Ahmedabad",
        ],
      },
      {
        key: "insights",
        label: "Insights",
        icon: TrendingUp,
        isNew: true,
        links: ["Price Trends","Home Loan Tools & More"],
        viewAll: true,
      },
      {
        key: "articles",
        label: "Articles & News",
        icon: FileText,
        links: [
          "Articles For Buyers","Real Estate News","Buyer Guide",
          "Home Interior Guide","Policies (GST, RERA, PMAY, Budget)",
        ],
      },
    ],
    footerLinks: [
      { label: "Apply for Home Loan", href: "/home-loan" },
      { label: "Price Trends", href: "/price-trends" },
      { label: "Real Estate News", href: "/news" },
    ],
  },
  tenants: {
    label: "For Tenants",
    categories: [
      {
        key: "residential-rent",
        label: "Residential Rent",
        icon: Home,
        links: [
          "Rent in Delhi / NCR","Rent in Mumbai","Rent in Bangalore","Rent in Pune",
          "Rent in Kolkata","Rent in Chennai","Rent in Ahmedabad","Rent in Hyderabad",
        ],
      },
      {
        key: "pg",
        label: "PG / Co-living",
        icon: Users,
        links: [
          "PG in Delhi / NCR","PG in Mumbai","PG in Bangalore","PG in Hyderabad",
          "PG in Pune","PG in Kolkata","PG in Chennai","PG in Ahmedabad",
        ],
      },
      {
        key: "commercial-lease",
        label: "Commercial Lease",
        icon: Briefcase,
        links: [
          "Lease in Delhi / NCR","Lease in Mumbai","Lease in Bangalore","Lease in Hyderabad",
          "Lease in Pune","Lease in Kolkata","Lease in Chennai","Lease in Ahmedabad",
        ],
      },
      {
        key: "t-insights",
        label: "Insights",
        icon: TrendingUp,
        isNew: true,
        links: ["Price Trends","Home Loan Tools & More"],
        viewAll: true,
      },
      {
        key: "t-articles",
        label: "Articles & News",
        icon: FileText,
        links: [
          "Articles For Tenants","Real Estate News",
          "Home Interior Guide","Policies (GST, RERA, PMAY, Budget)",
        ],
      },
    ],
    footerLinks: [
      { label: "Rent Receipt Generator", href: "/rent-receipt" },
      { label: "Price Trends", href: "/price-trends" },
      { label: "PG Finder", href: "/pg" },
    ],
  },
  owners: {
    label: "For Owners",
    categories: [
      {
        key: "post-property",
        label: "Post Property",
        icon: Plus,
        custom: "post-property-banner",
      },
      {
        key: "owner-services",
        label: "Owner Services",
        icon: Shield,
        links: [
          "Explore Owner Plans","Get Verified Badge",
          "Boost Your Listing","Legal Documentation",
        ],
      },
      {
        key: "o-insights",
        label: "Insights",
        icon: TrendingUp,
        isNew: true,
        links: ["Price Trends","Home Loan Tools & More"],
        viewAll: true,
      },
      {
        key: "o-articles",
        label: "Articles & News",
        icon: FileText,
        links: [
          "Articles For Owners","Real Estate News","Seller Guide",
          "Home Interior Guide","Policies (GST, RERA, PMAY, Budget)",
        ],
      },
    ],
    footerLinks: [
      { label: "Rent Receipt Generator", href: "/rent-receipt" },
      { label: "Price Trends", href: "/price-trends" },
      { label: "Seller Guide", href: "/seller-guide" },
    ],
  },
  dealers: {
    label: "For Dealers / Builders",
    categories: [
      {
        key: "property-services",
        label: "Property Services",
        icon: Building2,
        links: ["Post Property","Dealer Services","Builder Services"],
      },
      {
        key: "d-insights",
        label: "Insights",
        icon: TrendingUp,
        isNew: true,
        links: [
          "Price Trends","Builders in India","Real Estate Market Research Reports",
          "Policies (GST, RERA, PMAY, Budget)","Area Converter Tool","Rent Receipt Generator",
        ],
        viewAll: true,
      },
    ],
    footerLinks: [
      { label: "Builder Portal", href: "/builders" },
      { label: "Market Reports", href: "/reports" },
    ],
  },
};

const sidebarSections = [
  {
    label: "Explore our Services",
    items: [
      {
        key: "sb-buyers", label: "For Buyers", icon: Home,
        groups: [
          { title: "Residential", links: ["Buy in Delhi / NCR","Buy in Mumbai","Buy in Bangalore","Buy in Hyderabad","Buy in Pune","Buy in Kolkata","Buy in Ahmedabad"] },
          { title: "Commercial", links: ["Buy in Delhi / NCR","Buy in Mumbai","Buy in Bangalore","Buy in Chennai"] },
          { title: "Articles & News", links: ["Buyer Guide","Real Estate News","Policies (GST, RERA, PMAY)"] },
        ],
      },
      {
        key: "sb-tenants", label: "For Tenants", icon: Users,
        groups: [
          { title: "Residential Rent", links: ["Rent in Delhi / NCR","Rent in Mumbai","Rent in Bangalore","Rent in Pune","Rent in Kolkata","Rent in Chennai","Rent in Ahmedabad"] },
          { title: "PG / Co-Living", links: ["PG in Delhi / NCR","PG in Mumbai","PG in Bangalore","PG in Hyderabad","PG in Pune","PG in Kolkata"] },
          { title: "Commercial Lease", links: ["Lease in Delhi / NCR","Lease in Mumbai","Lease in Bangalore","Lease in Chennai"] },
          { title: "Articles & News", links: ["Articles For Tenants","Real Estate News","Policies (GST, RERA, PMAY)"] },
        ],
      },
      {
        key: "sb-owners", label: "For Owners", icon: Shield,
        groups: [
          { title: null, links: ["Post Property FREE","Owner Services","Explore Owner Plans"] },
          { title: "Articles & News", links: ["Articles For Owners","Seller Guide","Real Estate News","Policies (GST, RERA, PMAY)"] },
        ],
      },
      {
        key: "sb-dealers", label: "For Dealers / Builders", icon: Building2,
        groups: [
          { title: "Property Services", links: ["Post Property","Dealer Services","Builder Services"] },
        ],
      },
    ],
  },
  {
    label: "Tools & Insights",
    items: [
      {
        key: "sb-loans", label: "Home Loans", icon: CreditCard,
        groups: [{ title: null, links: ["Apply for Home Loan","EMI Calculator","Eligibility Check"] }],
      },
      {
        key: "sb-insights", label: "Insights", icon: TrendingUp, isNew: true,
        groups: [{ title: null, links: ["Price Trends","Builders in India","Market Research Reports","Area Converter Tool","Rent Receipt Generator","Policies (GST, RERA, PMAY)"] }],
      },
      {
        key: "sb-news", label: "Articles & News", icon: FileText,
        groups: [
          { title: "User Guides", links: ["Buyer Guide","Seller Guide","Home Interior Guide","Policies (GST, RERA, PMAY)"] },
          { title: "News", links: ["Real Estate Articles","Latest News"] },
        ],
      },
    ],
  },
  {
    label: "Company",
    items: [
      { key: "sb-about", label: "About Us", icon: Info, href: "/about", noExpand: true },
      {
        key: "sb-help", label: "Get Help", icon: HelpCircle,
        groups: [{ title: null, links: ["Customer Services & FAQs"] }],
      },
      { key: "sb-app", label: "Download App", icon: Smartphone, href: "/mobile-apps", noExpand: true },
      { key: "sb-wishlist", label: "Wishlist", icon: Heart, href: "/wishlist", noExpand: true },
    ],
  },
];

// ─── NewBadge ─────────────────────────────────────────────────────────────────

const NewBadge = () => (
  <span className="ml-1.5 inline-block rounded bg-sky-600 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
    NEW
  </span>
);

// ─── MegaMenu ─────────────────────────────────────────────────────────────────

const MegaMenu = ({ menuKey, open, onMouseEnter, onMouseLeave }) => {
  const config = menuConfig[menuKey];
  const [activeCategory, setActiveCategory] = useState(config?.categories[0]?.key || "");

  useEffect(() => {
    if (open) setActiveCategory(config?.categories[0]?.key || "");
  }, [open, config]);

  if (!config) return null;

  const activeConfig = config.categories.find((c) => c.key === activeCategory);

  return (
    <div
      className={`absolute left-0 right-0 top-full z-50 flex bg-white shadow-2xl border-t-2 border-sky-500 transition-all duration-150 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ maxHeight: open ? "460px" : "0", overflow: open ? "visible" : "hidden" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Left Sidebar */}
      <div className="flex-shrink-0 py-2 overflow-y-auto border-r w-52 bg-slate-50 border-slate-200">
        {config.categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.key}
              type="button"
              onMouseEnter={() => setActiveCategory(cat.key)}
              onClick={() => setActiveCategory(cat.key)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-all border-l-[3px] ${
                activeCategory === cat.key
                  ? "border-sky-500 bg-sky-50 text-sky-700 font-semibold"
                  : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
              }`}
            >
              <Icon className="flex-shrink-0 w-4 h-4" />
              <span>{cat.label}</span>
              {cat.isNew && <NewBadge />}
            </button>
          );
        })}
      </div>

      {/* Right Panel */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          {activeConfig?.custom === "post-property-banner" ? (
            <div>
              <p className="mb-4 text-xs font-bold tracking-wider uppercase text-slate-400">
                List your property for free
              </p>
              <div className="flex items-center gap-6 p-6 border rounded-xl bg-gradient-to-br from-sky-50 to-teal-50 border-sky-200">
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-slate-800">
                    Sell or Rent Faster at the Right Price!
                  </h3>
                  <p className="mb-4 text-sm text-slate-500">
                    Reach millions of buyers & tenants across India
                  </p>
                  <Link
                    to="/postproperty"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <Building2 className="w-4 h-4" />
                    Post Property
                    <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded">FREE</span>
                  </Link>
                </div>
                <div className="text-6xl select-none">🏠</div>
              </div>
            </div>
          ) : activeConfig?.links ? (
            <div>
              <p className="mb-3 text-xs font-bold tracking-wider uppercase text-slate-400">
                {activeConfig.label}
              </p>
              <div className="grid grid-cols-3 gap-1">
                {activeConfig.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block px-3 py-2 text-sm transition-colors rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                  >
                    {link}
                  </a>
                ))}
              </div>
              {activeConfig.viewAll && (
                <div className="mt-4">
                  <a href="#" className="text-sm font-semibold text-sky-600 hover:underline">
                    View All Insights →
                  </a>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer Bar */}
        <div className="flex items-center flex-shrink-0 gap-5 px-6 py-3 border-t border-slate-100 bg-slate-50">
          {config.footerLinks.map((fl) => (
            <Link
              key={fl.label}
              to={fl.href}
              className="text-xs font-semibold transition-colors text-sky-600 hover:text-sky-800 hover:underline"
            >
              {fl.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SidebarAccordionItem ──────────────────────────────────────────────────────

const SidebarAccordionItem = ({ item, onLinkClick }) => {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  if (item.noExpand) {
    return (
      <Link
        to={item.href || "#"}
        onClick={onLinkClick}
        className="flex items-center justify-between px-4 py-3 transition-colors border-b border-slate-100 hover:bg-slate-50"
      >
        <span className="flex items-center gap-2.5 text-sm font-medium text-slate-800">
          <Icon className="w-4 h-4 text-slate-400" />
          {item.label}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-300" />
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-4 py-3 transition-colors border-b border-slate-100 hover:bg-slate-50"
      >
        <span className="flex items-center gap-2.5 text-sm font-medium text-slate-800">
          <Icon className="w-4 h-4 text-slate-400" />
          {item.label}
          {item.isNew && <NewBadge />}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-b bg-slate-50 border-slate-100">
          {item.groups?.map((group, gi) => (
            <div key={gi} className="py-2">
              {group.title && (
                <p className="px-7 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.title}
                </p>
              )}
              {group.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={onLinkClick}
                  className="flex items-center px-7 py-1.5 text-xs text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                >
                  <span className="mr-2 text-slate-300">·</span>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar = ({ open, onClose, user, logout, location }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?code=${encodeURIComponent(searchQuery.trim())}`;
    }
    setSearchQuery("");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 z-[120] flex h-full w-[300px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between bg-[#0f2744] px-5 py-4">
          <span className="text-lg font-bold text-white">
            99<span className="text-sky-400">acres</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Post Property Banner */}
          <div className="m-3 rounded-xl bg-gradient-to-br from-[#0f2744] to-[#1e4a7a] p-4 text-white">
            <h3 className="mb-1 text-sm font-bold">Sell or Rent Faster!</h3>
            <p className="mb-3 text-xs opacity-75">
              List your property for FREE. Reach millions of buyers & tenants
            </p>
            <Link
              to="/postproperty"
              onClick={onClose}
              className="inline-block rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#0f2744] hover:bg-sky-50 transition-colors"
            >
              Post Property FREE
            </Link>
          </div>

          {/* Auth */}
          <div className="px-4 pt-2 pb-4 border-b border-slate-200">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full h-9 w-9 bg-sky-100 text-sky-600">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Link
                    to={DASHBOARD_LINKS[user.role] || "/"}
                    onClick={onClose}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); onClose(); }}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  state={{ from: location.pathname }}
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="flex-1 rounded-lg bg-sky-600 py-2.5 text-center text-sm font-bold text-white hover:bg-sky-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Sections */}
          {sidebarSections.map((section) => (
            <div key={section.label} className="border-b border-slate-200">
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.label}
              </p>
              {section.items.map((item) => (
                <SidebarAccordionItem key={item.key} item={item} onLinkClick={onClose} />
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-slate-200 bg-slate-50">
          <form onSubmit={handleSearch} className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Property Code"
              className="w-full py-2 pr-3 text-xs bg-white border rounded-lg outline-none border-slate-200 pl-9 text-slate-700 placeholder:text-slate-400 focus:border-sky-400"
            />
          </form>
          <p className="text-xs font-semibold text-center text-slate-700">
            Toll Free: <span className="text-sky-700">1800 41 99099</span>
          </p>
          <p className="text-[10px] text-slate-400 text-center mt-0.5">
            For international numbers{" "}
            <a href="#" className="text-sky-600 hover:underline">click here</a>
          </p>
        </div>
      </div>
    </>
  );
};

// ─── Navbar (Main) ────────────────────────────────────────────────────────────

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const closeTimerRef = useRef(null);
  const userMenuRef = useRef(null);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const openMenu = useCallback((menuKey) => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setActiveMenu(menuKey);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?q=${encodeURIComponent(searchQuery.trim())}`;
    }
    setSearchQuery("");
  };

  const isTransparent = isHome && !scrolled;
  const headerClass = isTransparent
    ? "absolute top-0 left-0 right-0 z-[99] bg-[#0f2744]/90 backdrop-blur-md border-b border-white/10"
    : "sticky top-0 z-[99] bg-[#0f2744] border-b border-white/10 shadow-lg";

  const navLinkBase = "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors cursor-pointer select-none whitespace-nowrap";
  const navLinkIdle = "text-white/85 hover:text-white hover:bg-white/10";
  const navLinkActive = "text-white bg-white/10";

  const navItems = [
    { key: "buyers",  label: "For Buyers" },
    { key: "tenants", label: "For Tenants" },
    { key: "owners",  label: "For Owners" },
    { key: "dealers", label: "For Dealers / Builders" },
  ];

  return (
    <>
      <header className={`relative overflow-visible ${headerClass}`}>
        <div className="flex items-center h-16 gap-3 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center mr-1 shrink-0">
            <span className="text-xl font-bold tracking-tight text-white">
              99<span className="text-sky-400">acres</span>
            </span>
          </Link>

          {/* Location – Desktop */}
          <button
            type="button"
            onClick={() => setLocationOpen(true)}
            className="hidden md:flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-white/85 hover:bg-white/10 transition-colors"
          >
            <MapPin className="flex-shrink-0 w-4 h-4" />
            <span>All India</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </button>

          {/* Desktop Nav */}
          <nav className="items-center flex-1 hidden gap-1 lg:flex" onMouseLeave={scheduleClose}>
            {navItems.map((item) => (
              <div key={item.key} className="relative" onMouseEnter={() => openMenu(item.key)}>
                <span className={`${navLinkBase} ${activeMenu === item.key ? navLinkActive : navLinkIdle}`}>
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-70 transition-transform duration-150 ${activeMenu === item.key ? "rotate-180" : ""}`}
                  />
                </span>
                {activeMenu === item.key && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-sky-400" />
                )}
              </div>
            ))}
            <Link to="/insights" className={`${navLinkBase} ${navLinkIdle}`}>
              Insights
              <NewBadge />
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 ml-auto sm:gap-3">

            {/* Search – Desktop */}
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locality, city..."
                className="h-9 w-48 rounded-lg border border-white/20 bg-white/10 py-1.5 pl-9 pr-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-sky-400 focus:bg-white/20 transition-colors"
              />
            </form>

            {/* Post Property CTA */}
            <Link
              to="/postproperty"
              className="items-center hidden gap-2 px-4 py-2 text-sm font-bold text-white transition-shadow rounded-lg shadow-lg sm:flex bg-gradient-to-r from-sky-500 to-teal-500 shadow-sky-500/20 hover:shadow-sky-500/30 whitespace-nowrap"
            >
              <Building2 className="w-4 h-4" />
              <span>Post Property</span>
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">FREE</span>
            </Link>

            {/* Support */}
            <div className="relative hidden md:block group">
              <button
                type="button"
                className="flex items-center justify-center p-2 transition-colors rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Support"
              >
                <Headphones className="w-5 h-5" />
              </button>
              <div className="absolute right-0 z-50 hidden p-4 mt-2 bg-white border shadow-xl top-full w-72 rounded-xl border-slate-200 group-hover:block">
                <p className="text-xs font-bold tracking-wider uppercase text-slate-400">Contact Us</p>
                <p className="mt-0.5 text-xs text-slate-400">Toll Free | 9AM–11PM IST</p>
                <p className="mt-1 text-xl font-bold text-slate-800">1800 41 99099</p>
                <Link
                  to="/contact"
                  className="block w-full py-2 mt-3 text-sm font-bold text-center transition-colors border rounded-lg border-sky-600 text-sky-600 hover:bg-sky-50"
                >
                  Request a Call Back
                </Link>
              </div>
            </div>

            {/* User / Auth */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-white/85 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-white/15">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden text-sm font-semibold sm:block">
                      {user.name?.split(" ")[0] || "Account"}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 z-50 w-56 py-2 mt-2 bg-white border shadow-xl top-full rounded-xl border-slate-200">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                      <Link
                        to={DASHBOARD_LINKS[user.role] || "/"}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-slate-400" />
                        Wishlist
                      </Link>
                      <button
                        type="button"
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="items-center hidden gap-2 sm:flex">
                  <Link
                    to="/login"
                    state={location.pathname !== "/login" ? { from: location.pathname } : undefined}
                    className="px-3 py-2 text-sm font-semibold transition-colors rounded-lg text-white/85 hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-bold text-white transition-colors border rounded-lg bg-white/15 border-white/20 hover:bg-white/25"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center p-2 transition-colors rounded-lg text-white/85 hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mega Menus container */}
        <div className="relative" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
          {Object.keys(menuConfig).map((key) => (
            <MegaMenu
              key={key}
              menuKey={key}
              open={activeMenu === key}
              onMouseEnter={() => openMenu(key)}
              onMouseLeave={scheduleClose}
            />
          ))}
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        logout={logout}
        location={location}
      />

      {/* Location Dropdown */}
      <LocationDropdown open={locationOpen} onClose={() => setLocationOpen(false)} />
    </>
  );
};

export default Navbar;