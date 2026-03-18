import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Headphones,
  User,
  Menu,
  X,
  ChevronRight,
  Search,
  LogOut,
  LayoutDashboard,
  Heart,
  Building2,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import LocationDropdown from "./Navbar_component/LocationDropdown";
import MegaMenu from "./for_buyers/MegaMenu";
import { buyerMenu } from "./for_buyers/menuConfig";
import TenantsMegaMenu from "./for_tenants/MegaMenu";
import { tenantsMenu } from "./for_tenants/menuConfig";
import OwnersMegaMenu from "./for_owners/MegaMenu";
import { ownersMenu } from "./for_owners/menuConfig";
import DealersMegaMenu from "./for_dealers/MegaMenu";
import { dealersMenu } from "./for_dealers/menuConfig";

const DASHBOARD_LINKS = {
  buyer: "/dashboard/buyer",
  seller: "/dashboard/seller",
  agent: "/dashboard/agent",
  admin: "/dashboard/admin",
};

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState(Object.keys(buyerMenu)[0]);
  const [activeTenantCategory, setActiveTenantCategory] = useState(Object.keys(tenantsMenu)[0]);
  const [activeOwnerCategory, setActiveOwnerCategory] = useState(Object.keys(ownersMenu)[0]);
  const [activeDealerCategory, setActiveDealerCategory] = useState(Object.keys(dealersMenu)[0]);
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

  const openMenu = (menuKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMenu(menuKey);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?q=${encodeURIComponent(searchQuery.trim())}`;
    }
    setSearchOpen(false);
    setSearchQuery("");
  };

  const isTransparent = isHome && !scrolled;
  const headerClass = isTransparent
    ? "absolute top-0 left-0 right-0 z-[99] bg-slate-900/90 backdrop-blur-md border-b border-white/10 overflow-visible"
    : "sticky top-0 z-[99] bg-white border-b border-slate-200 shadow-sm overflow-visible";

  const navLinkClass = isTransparent
    ? "text-white/90 hover:text-white"
    : "text-slate-700 hover:text-sky-600";

  const iconClass = isTransparent ? "text-white" : "text-slate-600";

  return (
    <>
      <header className={`relative ${headerClass}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="https://static.99acres.com/universalhp/img/nnacres_white_v2.png"
              alt="99acres.com"
              width={88}
              height={26}
              className={`block object-contain transition-opacity hover:opacity-90 ${
                isTransparent ? "" : "brightness-0"
              }`}
            />
          </Link>

          {/* Location - Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors ${
                isTransparent ? "text-white/90 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>All India</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Nav Links - Desktop */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            onMouseLeave={scheduleClose}
            onMouseEnter={cancelClose}
          >
            {[
              { key: "buyers", label: "For Buyers", setCat: () => setActiveCategory(Object.keys(buyerMenu)[0]) },
              { key: "tenants", label: "For Tenants", setCat: () => setActiveTenantCategory(Object.keys(tenantsMenu)[0]) },
              { key: "owners", label: "For Owners", setCat: () => setActiveOwnerCategory(Object.keys(ownersMenu)[0]) },
              { key: "dealers", label: "For Dealers / Builders", setCat: () => setActiveDealerCategory(Object.keys(dealersMenu)[0]) },
            ].map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => {
                  openMenu(item.key);
                  item.setCat();
                }}
              >
                <span
                  className={`block cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${navLinkClass}`}
                >
                  {item.label}
                </span>
                {activeMenu === item.key && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-sky-500" />
                )}
              </div>
            ))}
            <Link
              to="/properties"
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${navLinkClass}`}
            >
              <span className="flex items-center gap-1.5">
                Insights
                <span className="rounded bg-sky-600 px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>
              </span>
            </Link>
          </nav>

          {/* Right: Search, Post Property, Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Desktop */}
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locality, city..."
                  className={`h-9 w-48 rounded-lg border py-1.5 pl-9 pr-3 text-sm outline-none transition-colors ${
                    isTransparent
                      ? "border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-sky-400 focus:bg-white/20"
                      : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                  }`}
                />
              </form>
            </div>

            {/* Post Property CTA */}
            <Link
              to="/postproperty"
              className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-sky-600 to-teal-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 sm:flex"
            >
              <Building2 className="h-4 w-4" />
              <span>Post Property</span>
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">FREE</span>
            </Link>

            {/* Support */}
            <div className={`relative hidden cursor-pointer group md:flex ${iconClass}`}>
              <Headphones className="h-5 w-5 transition-opacity hover:opacity-100" />
              <div className="absolute right-0 top-full z-50 mt-2 hidden w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl group-hover:block">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Us</p>
                <p className="mt-1 text-xs text-slate-500">Toll Free | 9AM–11PM IST</p>
                <p className="text-lg font-bold text-slate-800">1800 41 99099</p>
                <Link
                  to="/"
                  className="mt-3 block w-full rounded-lg border border-sky-600 py-2 text-center text-sm font-bold text-sky-600 transition-colors hover:bg-sky-50"
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
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                      isTransparent ? "hover:bg-white/10" : "hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isTransparent ? "bg-white/20 text-white" : "bg-sky-100 text-sky-600"
                      }`}
                    >
                      <User className="h-4 w-4" />
                    </div>
                    <span className={`hidden text-sm font-semibold sm:block ${isTransparent ? "text-white" : "text-slate-700"}`}>
                      {user.name?.split(" ")[0] || "Account"}
                    </span>
                    <ChevronDown className={`h-4 w-4 ${isTransparent ? "text-white/80" : "text-slate-500"}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                      <div className="border-b border-slate-100 px-4 py-3">
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <Link
                        to={DASHBOARD_LINKS[user.role] || "/"}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    state={location.pathname !== "/login" ? { from: location.pathname } : undefined}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      isTransparent ? "text-white/90 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`rounded-lg p-2 lg:hidden ${iconClass}`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mega Menus - Sidebar dropdowns */}
        <MegaMenu
            open={activeMenu === "buyers"}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onMouseEnter={() => openMenu("buyers")}
            onMouseLeave={scheduleClose}
          />
          <TenantsMegaMenu
            open={activeMenu === "tenants"}
            activeCategory={activeTenantCategory}
            setActiveCategory={setActiveTenantCategory}
            onMouseEnter={() => openMenu("tenants")}
            onMouseLeave={scheduleClose}
          />
          <OwnersMegaMenu
            open={activeMenu === "owners"}
            activeCategory={activeOwnerCategory}
            setActiveCategory={setActiveOwnerCategory}
            onMouseEnter={() => openMenu("owners")}
            onMouseLeave={scheduleClose}
          />
          <DealersMegaMenu
            open={activeMenu === "dealers"}
            activeCategory={activeDealerCategory}
            setActiveCategory={setActiveDealerCategory}
            onMouseEnter={() => openMenu("dealers")}
            onMouseLeave={scheduleClose}
        />
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[120] transition-opacity duration-300 ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
            <span className="text-lg font-bold text-slate-800">Menu</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {/* Post Property CTA */}
            <div className="mx-4 mb-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 p-4 text-white">
              <p className="text-sm font-bold">List your property for FREE</p>
              <p className="mt-1 text-xs opacity-90">Reach millions of buyers</p>
              <Link
                to="/postproperty"
                className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-sm font-bold text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Post Property
              </Link>
            </div>

            {/* Auth Section */}
            <div className="border-b border-slate-200 px-4 pb-4">
              {user ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Account</p>
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <div className="flex gap-2">
                    <Link
                      to={DASHBOARD_LINKS[user.role] || "/"}
                      className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-sm font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="rounded-lg border border-red-200 py-2 px-4 text-sm font-semibold text-red-600"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    state={{ from: location.pathname }}
                    className="flex-1 rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 rounded-lg bg-sky-600 py-2.5 text-center text-sm font-bold text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Explore our Services */}
            <div className="border-b border-slate-200 px-4 py-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Explore our Services
              </p>
              {[
                { to: "/properties?mode=buy", label: "For Buyers" },
                { to: "/properties?mode=rent", label: "For Tenants" },
                { to: "/postproperty", label: "For Owners" },
                { to: "/properties", label: "For Dealers / Builders" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-slate-100 py-3.5 text-slate-800 transition-colors hover:text-sky-600"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </div>

            {/* Home Loans */}
            <div className="border-b border-slate-200 px-4 py-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Home Loans</p>
              <Link
                to="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-slate-800 hover:text-sky-600"
              >
                <span>Home Loan Options</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Insights */}
            <div className="border-b border-slate-200 px-4 py-3">
              <Link
                to="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-slate-800 hover:text-sky-600"
              >
                <span className="flex items-center gap-2">
                  Insights
                  <span className="rounded bg-sky-600 px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Articles & News */}
            <div className="border-b border-slate-200 px-4 py-3">
              <Link
                to="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-slate-800 hover:text-sky-600"
              >
                Articles & News
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* About Us */}
            <div className="border-b border-slate-200 px-4 py-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">About Us</p>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-slate-800 hover:text-sky-600"
              >
                Get Help
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Download App */}
            <div className="border-b border-slate-200 px-4 py-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-slate-800 hover:text-sky-600"
              >
                Download App
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Wishlist */}
            <div className="border-b border-slate-200 px-4 py-3">
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 text-slate-800 hover:text-sky-600"
              >
                Wishlist
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Search by Property Code */}
            <div className="px-4 pt-5 pb-6">
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Property Code"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-500"
                />
              </form>
              <p className="text-sm font-semibold text-slate-700">Toll Free: 1800 41 99099</p>
              <p className="text-xs text-slate-500">For international numbers click here</p>
            </div>
          </div>
        </div>
      </div>

      <LocationDropdown open={locationOpen} onClose={() => setLocationOpen(false)} />
    </>
  );
};

export default Navbar;
