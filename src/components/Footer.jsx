'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowUpRight,
  X,
  Bot,
  Sparkles,
  FileUp,
  Heart,
} from 'lucide-react';
import {
  COMPANY_INFO,
  buildWhatsAppLink,
  EKEBOT_SUGGESTED_QUESTIONS,
} from '@/data/seedData';
import { usePlatform } from '@/context/PlatformContext';

export default function Footer() {
  const {
    properties,
    formatPrice,
    submitEnquiry,
    chatMessages,
    sendChatMessage,
    setListPropertyModalOpen,
  } = usePlatform();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Floating EkeBot AI Chatbot + Quick WhatsApp Cost Widget State
  const [chatOpen, setChatOpen] = useState(false);
  const [widgetMode, setWidgetMode] = useState('ekebot'); // 'ekebot' | 'whatsapp'
  const [botInput, setBotInput] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState(properties[0]?.id || 'struct-1');
  const [buildScope, setBuildScope] = useState('Turnkey Build (Foundation to Finish)');
  const [plotLocation, setPlotLocation] = useState('Abuja / Lagos');
  const [customNote, setCustomNote] = useState('');

  const selectedPlan =
    properties.find((p) => p.id === selectedPlanId) || properties[0];

  const estimatedCost =
    buildScope.startsWith('Carcass')
      ? selectedPlan?.carcassPriceNGN || Math.round((selectedPlan?.priceNGN || 145000000) * 0.47)
      : buildScope.startsWith('Luxury')
      ? selectedPlan?.luxuryPriceNGN || Math.round((selectedPlan?.priceNGN || 145000000) * 1.38)
      : selectedPlan?.priceNGN || 145000000;

  const composedWhatsAppMessage = customNote.trim()
    ? `Hello Engr. Ekeson & Ekeconstruct Nigeria, I want to ask about building "${selectedPlan?.title}" [${selectedPlan?.reference}] in ${plotLocation}. Option: ${buildScope} (Estimated at ${formatPrice(estimatedCost)}). Question: ${customNote}`
    : `Hello Engr. Ekeson & Ekeconstruct Nigeria, please send me the exact cost and Material List (cement, blocks, iron rods) to build "${selectedPlan?.title}" [${selectedPlan?.reference}] on my land in ${plotLocation}. Selected Option: ${buildScope} (Estimated at ${formatPrice(estimatedCost)}).`;

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    await submitEnquiry({
      enquiryType: 'Monthly Nigerian Cement, Iron Rod & Building Cost Alert',
      propertyReference: 'EKC-PRICE-INDEX',
      propertyTitle: 'Ekeconstruct Nigeria Building Material Price Updates',
      fullName: newsletterEmail.split('@')[0],
      email: newsletterEmail,
      phone: COMPANY_INFO.phone,
      message: 'Subscribed to monthly Nigerian cement, blocks, and iron rod price updates.',
    });
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const handleBotSend = (e) => {
    e.preventDefault();
    if (!botInput.trim()) return;
    sendChatMessage(botInput);
    setBotInput('');
  };

  return (
    <footer className="bg-[#0A1628] text-slate-300 border-t border-white/10 relative">
      {/* Top Nigerian Building Material Price Alert Banner */}
      <div className="bg-gradient-to-r from-[#0D3B2E] via-[#0F292E] to-[#0A1628] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
              Nigerian Market Building Material Price Tracker
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Get Monthly Updates on Cement, Blocks, Iron Rods & Building Costs in Nigeria
            </h3>
            <p className="text-sm text-slate-200 mt-2">
              Know the real market prices of Dangote/BUA 50kg cement, 9-inch blocks, TMT iron rods, and granite across Lagos, Abuja, Port Harcourt, Enugu, and all 36 states before you buy materials.
            </p>
          </div>

          <form
            onSubmit={handleNewsletter}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5 min-w-[320px] sm:min-w-[420px]"
          >
            {subscribed ? (
              <div className="flex items-center gap-2 bg-white/10 border border-emerald-400/40 rounded-xl px-4 py-3 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Current Nigerian Material Price List sent to your email.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email for Nigerian material price alerts..."
                  className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white text-[#0A1628] hover:bg-emerald-300 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Get Price Alerts</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Column 1: Brand & Plain-English Nigerian Promise */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0D3B2E] to-[#0A1628] border border-emerald-400/40 flex items-center justify-center text-white shadow-md">
              <svg
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <path
                  d="M22 3L38 11.5V32.5L22 41L6 32.5V11.5L22 3Z"
                  stroke="#34D399"
                  strokeWidth="1.6"
                  strokeOpacity="0.85"
                />
                <path d="M13 11.5V32.5" stroke="#10B981" strokeWidth="3.4" strokeLinecap="round" />
                <path d="M13 13H30.5" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M13 22H26.5" stroke="#F59E0B" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M13 31H31.5" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
                <circle cx="30.5" cy="13" r="2" fill="#F59E0B" />
                <circle cx="26.5" cy="22" r="1.8" fill="#10B981" />
                <circle cx="31.5" cy="31" r="2" fill="#F59E0B" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold text-white tracking-tight">
                  EKE<span className="font-sans font-extrabold text-emerald-400">CONSTRUCT</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0D3B2E] border border-emerald-400/40 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-200">
                  NIGERIA
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mt-0.5">
                COREN Building & Valuation Platform • Nigeria
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{COMPANY_INFO.ourPromise}</p>

          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.headquarters}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono">{COMPANY_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono">{COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{COMPANY_INFO.openingHours}</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-3">
            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2.5">
              Follow Our Nigerian Building Sites
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'Instagram', href: COMPANY_INFO.socials.instagram },
                { label: 'Facebook', href: COMPANY_INFO.socials.facebook },
                { label: 'LinkedIn', href: COMPANY_INFO.socials.linkedin },
                { label: 'X / Twitter', href: COMPANY_INFO.socials.twitter },
                { label: 'YouTube', href: COMPANY_INFO.socials.youtube },
                { label: 'TikTok', href: COMPANY_INFO.socials.tiktok },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#0D3B2E] border border-white/10 text-xs font-medium text-white inline-flex items-center gap-1 transition"
                >
                  <span>{soc.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Nigerian House Plans */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            Houses & Building Plans
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href="/properties?category=Duplex+%26+Villa+Structures"
                className="hover:text-white transition"
              >
                Duplexes & Family Villas
              </Link>
            </li>
            <li>
              <Link
                href="/properties?category=Bungalow+%26+Family+Structures"
                className="hover:text-white transition"
              >
                3 & 4-Bedroom Bungalows
              </Link>
            </li>
            <li>
              <Link
                href="/properties?category=Multi-Storey+Apartment+Blocks"
                className="hover:text-white transition"
              >
                Blocks of Flats (Rental Income)
              </Link>
            </li>
            <li>
              <Link
                href="/properties?category=Commercial+%26+Office+Structures"
                className="hover:text-white transition"
              >
                Commercial Plazas & Offices
              </Link>
            </li>
            <li>
              <Link
                href="/properties?category=Industrial+%26+Steel+Structures"
                className="hover:text-white transition"
              >
                Warehouses & Factory Halls
              </Link>
            </li>
            <li>
              <Link
                href="/properties?category=Civil+Infrastructure+%26+Bridges"
                className="hover:text-white transition"
              >
                Estate Roads, Drainages & Culverts
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Services for Nigerians */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            What We Do for You
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/buy" className="hover:text-white transition">
                House Cost & Material Calculator
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setListPropertyModalOpen(true)}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Submit Your Own Design for Valuation
              </button>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Soil Testing & Safe Foundation Design
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Carcass or Full Move-In Building
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Test an Uncompleted Building
              </Link>
            </li>
            <li>
              <Link href="/development" className="hover:text-white transition">
                Completed & Ongoing Nigerian Sites
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Your User Dashboard */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            My User Dashboard
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/dashboard" className="hover:text-white transition">
                My User Dashboard Overview
              </Link>
            </li>
            <li>
              <Link href="/dashboard?tab=saved" className="hover:text-white transition">
                My Saved Properties & House Plans
              </Link>
            </li>
            <li>
              <Link href="/dashboard?tab=valuation" className="hover:text-white transition">
                Value My Personal House Design
              </Link>
            </li>
            <li>
              <Link href="/dashboard?tab=chatbot" className="hover:text-white transition">
                Ask EkeBot (Nigerian Building Chatbot)
              </Link>
            </li>
            <li>
              <Link href="/dashboard?tab=materials" className="hover:text-white transition">
                Fence Calculator & Material Prices
              </Link>
            </li>
            <li>
              <Link href="/locations" className="hover:text-white transition">
                Nigerian States & Soil Guide
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-amber-300 hover:text-amber-200 font-semibold transition">
                Admin Dashboard & CMS
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 bg-[#07101E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Ekeconstruct Nigeria Limited. COREN Registered Civil & Building Construction Company.
          </p>
          <p className="font-mono text-[11px] text-emerald-400">
            Plain-English Building Costs • Personal Design Valuation • 36 States & FCT
          </p>
        </div>
      </div>

      {/* =====================================================================
          FLOATING CHATBOT ICON (Icon-Only, No Write-Up)
         ===================================================================== */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {chatOpen && (
          <div className="mb-3 w-[340px] sm:w-[390px] bg-white text-[#0A1628] rounded-2xl shadow-2xl border-2 border-[#0D3B2E] overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            {/* Compact Header */}
            <div className="bg-[#0A1628] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0D3B2E] border border-emerald-400/40 flex items-center justify-center relative">
                  <Bot className="w-4 h-4 text-emerald-300" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 border border-[#0A1628] absolute -bottom-0.5 -right-0.5" />
                </div>
                <span className="font-serif text-sm font-bold">
                  EkeBot Assistant
                </span>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 bg-slate-100 p-1 border-b border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setWidgetMode('ekebot')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  widgetMode === 'ekebot'
                    ? 'bg-[#0D3B2E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0A1628]'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>EkeBot Chat</span>
              </button>
              <button
                type="button"
                onClick={() => setWidgetMode('whatsapp')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  widgetMode === 'whatsapp'
                    ? 'bg-[#0D3B2E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0A1628]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>

            {widgetMode === 'ekebot' ? (
              <div className="p-3.5 space-y-3 bg-slate-50/80">
                {/* Recent Messages */}
                <div className="max-h-[240px] overflow-y-auto space-y-2.5 pr-1">
                  {chatMessages.slice(-4).map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                        msg.sender === 'bot'
                          ? 'bg-white border border-slate-200 text-slate-700'
                          : 'bg-[#0D3B2E] text-white ml-6'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {EKEBOT_SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendChatMessage(q)}
                      className="text-[11px] bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 text-slate-700 text-left transition cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleBotSend} className="flex gap-1.5">
                  <input
                    type="text"
                    value={botInput}
                    onChange={(e) => setBotInput(e.target.value)}
                    placeholder="Type a question..."
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-[#0A1628] focus:outline-none focus:border-[#0D3B2E]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-4 space-y-3 bg-slate-50/70 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                    1. Pick a House Plan
                  </label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-[#0A1628]"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.reference}] {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                      2. Build Option
                    </label>
                    <select
                      value={buildScope}
                      onChange={(e) => setBuildScope(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-[#0A1628]"
                    >
                      <option value="Carcass / Structural Shell Only">Carcass (Roofed)</option>
                      <option value="Turnkey Build (Foundation to Finish)">Full Move-In</option>
                      <option value="Luxury Sovereign Turnkey Spec">Luxury Finish</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                      3. Your State / City
                    </label>
                    <input
                      type="text"
                      value={plotLocation}
                      onChange={(e) => setPlotLocation(e.target.value)}
                      placeholder="e.g. Abuja, Lekki, Enugu"
                      className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-[#0A1628]"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1628] text-white rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                      Estimated Building Cost ({buildScope.split(' ')[0]})
                    </span>
                    <span className="text-lg font-mono font-bold text-white">
                      {formatPrice(estimatedCost)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#0D3B2E] text-emerald-300">
                    {selectedPlan?.sizeSqm} sqm
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                    Optional Question
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="e.g. My land is 600sqm in Lekki..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-[#0A1628]"
                  />
                </div>

                <a
                  href={buildWhatsAppLink(selectedPlan, composedWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Send to WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Pure Circular Icon-Only Chatbot Trigger (No Write-Up) */}
        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          aria-label="Toggle Chatbot"
          title="Chatbot"
          className="w-14 h-14 rounded-full bg-[#0D3B2E] hover:bg-[#0A1628] text-white shadow-2xl border-2 border-emerald-400/60 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer relative"
        >
          {chatOpen ? (
            <X className="w-6 h-6 text-emerald-300" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-emerald-300" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A1628] absolute top-0.5 right-0.5" />
            </>
          )}
        </button>
      </div>
    </footer>
  );
}
