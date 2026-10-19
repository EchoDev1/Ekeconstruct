'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Phone,
  Upload,
  Globe,
  Menu,
  X,
  MailCheck,
  ShieldCheck,
  Sparkles,
  Bookmark,
  LayoutDashboard,
  Settings,
  Wrench,
  Home,
  Building2,
  Calculator,
  HardHat,
  Compass,
  MapPin,
  Info,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { CURRENCIES } from '@/data/seedData';

const NAV_LINKS = [
  { href: '/', label: 'Home', sub: 'Main Platform & Overview', icon: Home },
  { href: '/properties', label: 'Houses & Plans', sub: 'Verified Structural Designs', icon: Building2 },
  { href: '/buy', label: 'Cost Calculator', sub: 'Stage-by-Stage Naira Estimator', icon: Calculator },
  { href: '/development', label: 'Our Projects', sub: 'Active & Completed Sites', icon: HardHat },
  { href: '/services', label: 'Services', sub: 'Soil Test, BOQ & Turnkey Build', icon: Compass },
  { href: '/locations', label: 'States & Soil Guide', sub: '36 States + FCT Foundation Guide', icon: MapPin },
  { href: '/about', label: 'About Us', sub: 'COREN & ARCON Engineering Team', icon: Info },
  { href: '/contact', label: 'Contact', sub: 'Offices & Direct Site Desk', icon: MessageSquare },
];

/**
 * World-Class Architectural & Structural Emblem for EKECONSTRUCT NIGERIA
 * Mobile-responsive so it never pushes the mobile menu bar off-screen.
 */
export function EkeconstructLogo({ darkText = true }) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3.5 group select-none min-w-0">
      {/* Precision 3D Isometric Structural Crest & Monogram "E" */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#0A1628] via-[#0F243C] to-[#0D3B2E] p-[1.5px] shadow-lg shadow-slate-950/20 group-hover:shadow-emerald-900/30 transition-all duration-300 shrink-0">
        <div className="w-full h-full rounded-[14px] bg-[#0A1628] flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(16,185,129,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.25) 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-400/25 blur-md group-hover:bg-amber-400/30 transition-colors" />

          <svg
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 transform group-hover:scale-105 transition-transform duration-300"
          >
            <path
              d="M22 3L38 11.5V32.5L22 41L6 32.5V11.5L22 3Z"
              stroke="url(#ekeGoldGrad)"
              strokeWidth="1.6"
              strokeOpacity="0.85"
            />
            <path
              d="M13 11.5V32.5"
              stroke="#10B981"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            <path
              d="M13 13H30.5"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M13 22H26.5"
              stroke="#F59E0B"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M13 31H31.5"
              stroke="#FFFFFF"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M27.5 13L22.5 22L28.5 31"
              stroke="#34D399"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 2"
            />
            <circle cx="30.5" cy="13" r="2" fill="#F59E0B" />
            <circle cx="26.5" cy="22" r="1.8" fill="#10B981" />
            <circle cx="31.5" cy="31" r="2" fill="#F59E0B" />
            <defs>
              <linearGradient
                id="ekeGoldGrad"
                x1="6"
                y1="3"
                x2="38"
                y2="41"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#34D399" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Wordmark + Iconic NIGERIA Badge */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span
            className={`font-serif text-base sm:text-[22px] font-bold tracking-tight leading-none ${
              darkText ? 'text-[#0A1628]' : 'text-white'
            }`}
          >
            EKE
            <span className="font-sans font-extrabold tracking-normal text-[#0D3B2E] dark:text-emerald-400">
              CONSTRUCT
            </span>
          </span>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#0D3B2E] to-[#0A2E23] text-white border border-emerald-400/40 shadow-xs shrink-0">
            <span
              className="inline-flex items-center h-2 w-3 rounded-[2px] overflow-hidden border border-white/30 shrink-0"
              aria-hidden="true"
            >
              <span className="w-1/3 h-full bg-[#008751]" />
              <span className="w-1/3 h-full bg-white" />
              <span className="w-1/3 h-full bg-[#008751]" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-emerald-100">
              NIGERIA
            </span>
          </span>
        </div>

        <p
          className={`hidden sm:block text-[10px] tracking-[0.06em] uppercase font-semibold mt-1 truncate ${
            darkText ? 'text-slate-500' : 'text-slate-300'
          }`}
        >
          Structural Engineering • Building Plans • Cost Valuation
        </p>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const {
    currency,
    changeCurrency,
    user,
    companyInfo,
    notifications,
    markAllNotificationsRead,
    savedIds,
    setListPropertyModalOpen,
    setAuthModalOpen,
  } = usePlatform();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
      {/* Clean Single Header Bar (Both Mobile & Desktop use the Menu Bar) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link href="/" className="min-w-0 shrink" onClick={() => setMenuOpen(false)}>
          <EkeconstructLogo darkText={true} />
        </Link>

        {/* Right Controls: Saved Icon, Alerts Icon, and Prominent Menu Bar Button (Mobile & Desktop) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Saved Plans Icon */}
          <Link
            href="/dashboard?tab=saved"
            onClick={() => setMenuOpen(false)}
            title="Saved Properties & House Plans"
            className="relative p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0A1628] transition"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
            {savedIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0D3B2E] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                {savedIds.length}
              </span>
            )}
          </Link>

          {/* Real-Time Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen((prev) => !prev);
                if (!notifOpen) markAllNotificationsRead();
              }}
              aria-label="Platform Alerts"
              className="relative p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0A1628] transition cursor-pointer"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                <div className="bg-[#0A1628] text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold tracking-wide uppercase">
                      Ekeconstruct Nigeria Alerts
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3.5 hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-[#0A1628]">
                          {n.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {n.createdAt}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                      {n.emailRecipient && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[#0D3B2E] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          <MailCheck className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[240px]">
                            Sent: {n.emailRecipient}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Unified Menu Bar Button — Always Visible on Mobile AND Desktop */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu Bar"
            aria-expanded={menuOpen}
            className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#0D3B2E] text-white text-xs font-bold tracking-wide shadow-sm transition cursor-pointer shrink-0"
          >
            {menuOpen ? (
              <>
                <X className="w-5 h-5 text-emerald-300" />
                <span>Close</span>
              </>
            ) : (
              <>
                <Menu className="w-5 h-5 text-emerald-300" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Unified Menu Bar Drawer (Mobile & Desktop) — Houses All Navigation & Top Features */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 sm:top-20 bg-[#0A1628]/60 backdrop-blur-xs z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Bar Content Panel */}
          <div className="relative z-50 bg-[#0A1628] text-white border-t border-white/10 shadow-2xl max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              {/* Top Row inside Menu: Dashboards & Quick Account Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="md:col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D3B2E] border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                      100% Nigerian Owned • COREN Certified
                    </span>
                    <p className="text-sm font-bold text-white truncate">
                      {user?.fullName}
                    </p>
                  </div>
                </div>

                {/* Dashboards & Profile Quick Buttons */}
                <div className="md:col-span-7 flex flex-wrap items-center md:justify-end gap-2.5">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                      pathname === '/dashboard'
                        ? 'bg-emerald-400 text-[#0A1628]'
                        : 'bg-[#0D3B2E] hover:bg-emerald-700 text-white border border-emerald-400/40'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>My User Dashboard</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                      pathname?.startsWith('/admin')
                        ? 'bg-amber-400 text-[#0A1628]'
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>

                  {/* Currency Selector inside Menu */}
                  <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <select
                      aria-label="Select Currency"
                      value={currency}
                      onChange={(e) => changeCurrency(e.target.value)}
                      className="bg-transparent text-white font-mono font-bold text-xs focus:outline-none cursor-pointer"
                    >
                      {Object.keys(CURRENCIES).map((code) => (
                        <option
                          key={code}
                          value={code}
                          className="bg-[#0A1628] text-white"
                        >
                          {CURRENCIES[code].label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 cursor-pointer"
                  >
                    Profile
                  </button>
                </div>
              </div>

              {/* Section 1: Main Navigation Pages */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">
                  Platform Pages & Structural Catalog
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    const active =
                      item.href === '/'
                        ? pathname === '/'
                        : pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition ${
                          active
                            ? 'bg-[#0D3B2E] border-emerald-400 text-white shadow-md'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              active
                                ? 'bg-emerald-400 text-[#0A1628]'
                                : 'bg-white/10 text-emerald-300'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold block truncate">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate">
                              {item.sub}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Platform Features & Tools (Moved from Top Header into Menu Bar) */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">
                  Quick Engineering Tools & Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setListPropertyModalOpen(true);
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0D3B2E] to-[#114B3A] hover:from-emerald-700 hover:to-emerald-800 border border-emerald-400/40 text-left flex items-center gap-3 transition cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Upload className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block">
                        Value My Design
                      </span>
                      <span className="text-[11px] text-emerald-200 block truncate">
                        Instant Naira & Material Valuation
                      </span>
                    </div>
                  </button>

                  <Link
                    href="/dashboard?tab=specialists"
                    onClick={() => setMenuOpen(false)}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center gap-3 transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block">
                        Connect to 8 Specialists
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        Civil, Architect, QS, Soil & MEP
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard?tab=materials"
                    onClick={() => setMenuOpen(false)}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center gap-3 transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block">
                        Fence & Material Calculator
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        Live Cement, Blocks & Rebar Prices
                      </span>
                    </div>
                  </Link>

                  <a
                    href={`tel:${(companyInfo?.phone || '+234 800 EKECONSTRUCT').replace(/\s+/g, '')}`}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center gap-3 transition"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">
                        {companyInfo?.phone || '+234 800 EKECONSTRUCT'}
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        Direct Engineering Desk
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
