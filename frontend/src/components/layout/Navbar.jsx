import React, { useRef, useState } from 'react';
import { ChevronDown, Headphones, User, Menu, X, ChevronRight, Search } from 'lucide-react';
import LocationDropdown from './Navbar_component/LocationDropdown';
import MegaMenu from './for_buyers/MegaMenu';
import { buyerMenu } from './for_buyers/menuConfig';
import TenantsMegaMenu from './for_tenants/MegaMenu';
import { tenantsMenu } from './for_tenants/menuConfig';
import OwnersMegaMenu from './for_owners/MegaMenu';
import { ownersMenu } from './for_owners/menuConfig';
import DealersMegaMenu from './for_dealers/MegaMenu';
import { dealersMenu } from './for_dealers/menuConfig';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState(Object.keys(buyerMenu)[0]);
  const [activeTenantCategory, setActiveTenantCategory] = useState(Object.keys(tenantsMenu)[0]);
  const [activeOwnerCategory, setActiveOwnerCategory] = useState(Object.keys(ownersMenu)[0]);
  const [activeDealerCategory, setActiveDealerCategory] = useState(Object.keys(dealersMenu)[0]);
  const closeTimerRef = useRef(null);

  const openMenu = (menuKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMenu(menuKey);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // Styling constants based on your CSS requirements
  // 99acres uses a semi-transparent gradient or slate overlay in the screenshot
  const headerOverlayClass = "absolute top-0 left-0 w-full z-[99] px-[50px] py-[14px] box-border flex items-center justify-between font-['Open_Sans'] text-[14px] leading-[20px] text-white font-[600] bg-slate-900/85 backdrop-blur-md shadow";

  return (
    <>
      {/* Load Open Sans Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');`}
      </style>

      {/* 
        Main Header Wrapper 
        - position: absolute, top: 0, left: 0, width: 100%
        - padding: 20px 50px
        - font-family: Open Sans
      */}
      <header className={headerOverlayClass}>
        
        {/* --- LEFT SECTION: Logo & Location --- */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="block shrink-0">
            <img 
              src="https://static.99acres.com/universalhp/img/nnacres_white_v2.png" 
              alt="99acres.com" 
              width="80"
              height="23"
              className="block object-contain"
            />
          </a>

          {/* City Selector Dropdown Trigger */}
          <div className="relative items-center hidden gap-1 ml-2 md:flex">
            <button
              type="button"
              onClick={() => setLocationOpen((v) => !v)}
              className="flex items-center gap-1 cursor-pointer"
              aria-haspopup="dialog"
              aria-expanded={locationOpen}
            >
              <span className="font-bold text-white transition-opacity whitespace-nowrap opacity-90 hover:opacity-100">
                All India
              </span>
              <ChevronDown className="w-5 h-5 text-white opacity-80" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* --- CENTER SECTION: Navigation Links --- */}
        <nav
          className="items-center hidden h-full gap-8 xl:flex"
          onMouseLeave={scheduleClose}
          onMouseEnter={cancelClose}
        >
          <div
            className="relative flex items-center h-full cursor-pointer group"
            onMouseEnter={() => {
              openMenu("buyers");
              setActiveCategory(Object.keys(buyerMenu)[0]);
            }}
          >
            <span className="text-white font-semibold text-[14px] opacity-90 hover:opacity-100 transition-opacity flex items-center">
              For Buyers
            </span>
            <div className="absolute bottom-[-20px] left-0 w-full h-[3px] bg-transparent group-hover:bg-white transition-colors"></div>
          </div>

          <div
            className="relative flex items-center h-full cursor-pointer group"
            onMouseEnter={() => {
              openMenu("tenants");
              setActiveTenantCategory(Object.keys(tenantsMenu)[0]);
            }}
          >
            <span className="text-white font-semibold text-[14px] opacity-90 hover:opacity-100 transition-opacity flex items-center">
              For Tenants
            </span>
            <div className="absolute bottom-[-20px] left-0 w-full h-[3px] bg-transparent group-hover:bg-white transition-colors"></div>
          </div>

          <div
            className="relative flex items-center h-full cursor-pointer group"
            onMouseEnter={() => {
              openMenu("owners");
              setActiveOwnerCategory(Object.keys(ownersMenu)[0]);
            }}
          >
            <span className="text-white font-semibold text-[14px] opacity-90 hover:opacity-100 transition-opacity flex items-center">
              For Owners
            </span>
            <div className="absolute bottom-[-20px] left-0 w-full h-[3px] bg-transparent group-hover:bg-white transition-colors"></div>
          </div>

          <div
            className="relative flex items-center h-full cursor-pointer group"
            onMouseEnter={() => {
              openMenu("dealers");
              setActiveDealerCategory(Object.keys(dealersMenu)[0]);
            }}
          >
            <span className="text-white font-semibold text-[14px] opacity-90 hover:opacity-100 transition-opacity flex items-center">
              For Dealers / Builders
            </span>
            <div className="absolute bottom-[-20px] left-0 w-full h-[3px] bg-transparent group-hover:bg-white transition-colors"></div>
          </div>

          {['Insights'].map((item, idx) => (
            <div key={idx} className="relative flex items-center h-full cursor-pointer group">
              <span className="text-white font-semibold text-[14px] opacity-90 hover:opacity-100 transition-opacity flex items-center">
                {item}
                {item === 'Insights' && (
                   // Exact badge styling from HTML: bg-[#004E8F]
                   <span className="ml-2 bg-[#004E8F] text-[9px] px-[4px] py-[1px] rounded-[2px] text-white font-bold border border-white/20 uppercase leading-none transform translate-y-[-1px]">
                     NEW
                   </span>
                )}
              </span>
              <div className="absolute bottom-[-20px] left-0 w-full h-[3px] bg-transparent group-hover:bg-white transition-colors"></div>
            </div>
          ))}
        </nav>

        {/* --- RIGHT SECTION: Actions --- */}
        <div className="flex items-center gap-6">
          
          {/* Post Property Button - Matching Screenshot visual */}
          <a 
            href="/postproperty" 
            className="hidden lg:flex items-center bg-[#D7E8F7] hover:bg-white transition-colors text-[#091e42] px-3 py-1.5 rounded-[4px] cursor-pointer"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
          >
            <span className="text-[12px] font-bold mr-2">Post property</span>
            {/* Free Badge - Visual approximation of the image in HTML */}
            <span className="bg-[#009681] text-white text-[9px] font-bold px-1 rounded-[2px] uppercase tracking-wide">
              FREE
            </span>
          </a>

          {/* Icons Group */}
          <div className="flex items-center gap-5">
            {/* Support Icon */}
            <div className="relative cursor-pointer group">
                <Headphones className="w-6 h-6 text-white opacity-90 hover:opacity-100" strokeWidth={2} />
                {/* Tooltip */}
                <div className="absolute right-[-20px] top-[40px] w-[280px] bg-white rounded shadow-lg p-4 hidden group-hover:block z-50 text-left">
                   <div className="text-[11px] font-bold text-gray-500 mb-2 tracking-wide">CONTACT US</div>
                   <div className="flex items-start gap-3">
                      <div className="mt-1"><Headphones className="w-4 h-4 text-gray-800" /></div>
                      <div className="text-gray-800">
                         <div className="text-[12px] font-semibold text-gray-500">Toll Free | 9AM-11PM IST</div>
                         <div className="text-[16px] font-bold">1800 41 99099</div>
                      </div>
                   </div>
                   <div className="pt-3 mt-4 text-center border-t border-gray-100">
                      <button className="w-full py-2 text-sm font-bold text-blue-600 transition-colors border border-blue-600 rounded hover:bg-blue-50">
                        Request a Call Back
                      </button>
                   </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="relative flex items-center cursor-pointer group">
              <div className="relative">
                <User className="w-6 h-6 text-white opacity-90 hover:opacity-100" strokeWidth={2} />
                <div className="absolute hidden w-2 h-2 bg-red-500 border rounded-full -top-1 -right-1 border-slate-900"></div>
              </div>
              <ChevronDown className="w-3 h-3 ml-1 text-white opacity-80" strokeWidth={3} />
              
              {/* Profile Dropdown */}
              <div className="absolute right-0 top-[40px] w-[200px] bg-white rounded shadow-lg py-2 hidden group-hover:block z-50 text-left">
                 <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-bold text-blue-600">LOGIN / REGISTER</div>
                 </div>
                 <ul className="py-2 text-sm text-gray-700">
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-blue-600">My Activity</li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-blue-600">Recently Searched</li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-blue-600">Shortlisted</li>
                 </ul>
              </div>
            </div>

            {/* Hamburger Menu */}
            <div className="cursor-pointer" onClick={() => setMobileMenuOpen(true)}>
               <Menu className="text-white w-7 h-7 opacity-90 hover:opacity-100" strokeWidth={2} />
            </div>
          </div>
        </div>

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

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-[120] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)}></div>
        <div
          className={`absolute right-0 top-0 h-full w-[340px] max-w-[90%] bg-white text-gray-800 shadow-2xl transition-transform duration-300 transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2 text-[12px] font-bold text-blue-700">
              <User className="h-4 w-4 text-gray-500" />
              <span>LOGIN / REGISTER</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-900">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-[calc(100%-48px)] overflow-y-auto">
            <div className="px-4 pt-4">
              <div className="rounded-lg border-2 border-[#0f2d2e]/80 bg-[#dff3e9] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[13px] font-semibold text-gray-900">Sell or rent faster at the right price!</div>
                    <button className="mt-2 rounded bg-[#1a73e8] px-3 py-1.5 text-[12px] font-bold text-white">
                      Post Property
                    </button>
                  </div>
                  <img
                    className="h-[66px] w-[66px] object-contain"
                    src="/universalapp/img/hp_ppf_banner.png"
                    alt="Post Property"
                  />
                </div>
              </div>
            </div>

            <div className="px-4">
              <div className="border-b border-gray-200 py-4 text-[13px] font-semibold text-gray-700">
                Explore our Services
              </div>

              {['For Buyers', 'For Tenants', 'For Owners', 'For Dealers / Builders'].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-gray-200 py-3 text-[13px] text-gray-800">
                  <span>{item}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}

              <div className="border-b border-gray-200 py-4 text-[13px] font-semibold text-gray-800">Home Loans</div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3 text-[13px] text-gray-800">
                <span className="flex items-center gap-2">
                  Insights
                  <span className="rounded bg-[#004E8F] px-1.5 py-0.5 text-[9px] font-bold text-white">NEW</span>
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3 text-[13px] text-gray-800">
                <span>Articles & News</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="border-b border-gray-200 py-4 text-[13px] font-semibold text-gray-800">About Us</div>
              <div className="flex items-center justify-between border-b border-gray-200 py-3 text-[13px] text-gray-800">
                <span>Get Help</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="border-b border-gray-200 py-3 text-[13px] text-gray-800">Download App</div>
            </div>

            <div className="px-4 pb-6 pt-5">
              <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-[#f7f8fa] px-3 py-2">
                <input
                  type="text"
                  placeholder="Search by Property Code"
                  className="w-full bg-transparent text-[12px] text-gray-700 outline-none"
                />
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <div className="mt-4 text-[12px] text-gray-700">
                Toll Free Number: 1800 41 99099.
              </div>
              <div className="text-[12px] text-gray-600">For international numbers click here</div>
            </div>
          </div>
        </div>
      </div>

      <LocationDropdown open={locationOpen} onClose={() => setLocationOpen(false)} />
    </>
  );
};

export default Navbar;
