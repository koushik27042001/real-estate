import { Link } from "react-router-dom";
import {
  Building2,
  Headphones,
  Mail,
  MapPin,
  ChevronRight,
  Smartphone,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Send,
} from "lucide-react";

const footerLinks = {
  buyers: {
    title: "For Buyers",
    links: [
      { label: "Buy Property", to: "/properties?mode=buy" },
      { label: "Flats & Apartments", to: "/properties?type=flat" },
      { label: "Independent Houses", to: "/properties?type=house" },
      { label: "Plots & Land", to: "/properties?type=plot" },
      { label: "Commercial Property", to: "/properties?type=commercial" },
      { label: "Popular Areas", to: "/properties" },
    ],
  },
  tenants: {
    title: "For Tenants",
    links: [
      { label: "Rent Property", to: "/properties?mode=rent" },
      { label: "PG / Co-living", to: "/properties?mode=pg" },
      { label: "Commercial Rent", to: "/properties?type=commercial" },
      { label: "Top Cities", to: "/properties" },
    ],
  },
  owners: {
    title: "For Owners",
    links: [
      { label: "Post Property", to: "/postproperty", highlight: "FREE" },
      { label: "Owner Services", to: "/postproperty" },
      { label: "My Account", to: "/dashboard/seller" },
      { label: "View Responses", to: "/dashboard/seller" },
    ],
  },
  dealers: {
    title: "For Dealers / Builders",
    links: [
      { label: "Post Property", to: "/postproperty" },
      { label: "Dealer Services", to: "/postproperty" },
      { label: "My Account", to: "/dashboard/agent" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", to: "/" },
      { label: "Insights", to: "/properties" },
      { label: "Articles & News", to: "/properties" },
      { label: "Home Loans", to: "/properties" },
      { label: "Get Help", to: "/" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { label: "Login", to: "/login" },
      { label: "Register", to: "/register" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Top CTA Bar */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-sky-600/20 to-teal-600/20 border border-slate-700/50 p-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20">
              <Building2 className="h-6 w-6 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">List your property for FREE</h3>
              <p className="text-sm text-slate-400">Reach millions of buyers and tenants</p>
            </div>
          </div>
          <Link
            to="/postproperty"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30"
          >
            Post Property
            <span className="rounded bg-white/20 px-2 py-0.5 text-xs">FREE</span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-sky-400"
                    >
                      <span>{link.label}</span>
                      {link.highlight && (
                        <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          {link.highlight}
                        </span>
                      )}
                      <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-slate-700/80" />

        {/* Contact & Newsletter Row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="tel:18004199099"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-sky-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <Headphones className="h-5 w-5" />
                </span>
                <div>
                  <span className="block text-xs text-slate-500">Toll Free | 9AM–11PM IST</span>
                  <span className="text-lg font-bold text-white">1800 41 99099</span>
                </div>
              </a>
              <a
                href="mailto:support@99acres.com"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-sky-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <Mail className="h-5 w-5" />
                </span>
                <span>support@99acres.com</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>All India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-sm">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Stay Updated
            </h4>
            <p className="mb-4 text-sm text-slate-400">
              Get property alerts, market insights, and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-sky-500"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>

          {/* App Download */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Download App
            </h4>
            <div className="flex items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800">
                <Smartphone className="h-6 w-6 text-slate-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">99acres App</p>
                <p className="text-xs text-slate-500">iOS & Android</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <a
                href="#"
                className="inline-block rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700"
              >
                App Store
              </a>
              <a
                href="#"
                className="inline-block rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-slate-700/80" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <a href="/" className="block">
              <img
                src="https://static.99acres.com/universalhp/img/nnacres_white_v2.png"
                alt="99acres.com"
                width="90"
                height="26"
                className="object-contain opacity-90 hover:opacity-100"
              />
            </a>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} 99acres.com. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/" className="text-slate-500 transition-colors hover:text-sky-400">
              Privacy Policy
            </Link>
            <Link to="/" className="text-slate-500 transition-colors hover:text-sky-400">
              Terms of Use
            </Link>
            <Link to="/" className="text-slate-500 transition-colors hover:text-sky-400">
              Sitemap
            </Link>
            <Link to="/" className="text-slate-500 transition-colors hover:text-sky-400">
              Advertise With Us
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-sky-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
