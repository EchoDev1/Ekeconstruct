'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Bookmark,
  Calculator,
  MessageCircle,
  Sparkles,
  Upload,
  CheckCircle2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Bell,
  HelpCircle,
  Send,
  FileSpreadsheet,
  Home,
  Layers,
  MapPin,
  PlusCircle,
  Eye,
  Compass,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import {
  CURRENCIES,
  NIGERIAN_STATES_AND_ZONES,
  NIGERIAN_LAYMAN_GUIDE,
  NIGERIAN_LAND_CHECKLIST,
  EKEBOT_SUGGESTED_QUESTIONS,
  LIVE_MATERIAL_PRICE_INDEX,
  calculatePersonalDesignValuation,
  buildWhatsAppLink,
} from '@/data/seedData';

function NigerianUserDashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const {
    user,
    currency,
    changeCurrency,
    formatPrice,
    properties,
    savedIds,
    savedProperties,
    toggleSavedProperty,
    designValuations,
    submitDesignForValuation,
    deleteDesignValuation,
    chatMessages,
    sendChatMessage,
    materialPrices,
    priceAlerts,
    togglePriceAlert,
    checklistDoneIds,
    toggleChecklistItem,
    quoteRequests,
    payments,
    projects,
    setActiveQuoteProperty,
    setAuthModalOpen,
    specialistAgents,
    specialistConnections,
    openSpecialistModal,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedDashSpecId, setSelectedDashSpecId] = useState('spec-civil-engineer');
  const activeDashSpec = useMemo(
    () =>
      specialistAgents.find((s) => s.id === selectedDashSpecId) ||
      specialistAgents[0],
    [specialistAgents, selectedDashSpecId]
  );

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t) setActiveTab(t);
  }, [searchParams]);

  // Saved Properties Tier Toggle ('carcass' | 'turnkey' | 'luxury')
  const [savedFinishTier, setSavedFinishTier] = useState('turnkey');

  // Personal Design Valuation Form State
  const [valForm, setValForm] = useState({
    designTitle: '',
    buildingType: '4-Bedroom Duplex',
    bedrooms: 4,
    stateLocation: 'Lagos (Mainland)',
    townArea: '',
    landPlotType: 'Full Plot (600 sqm / 60x120ft)',
    soilType: 'dry',
    finishLevel: 'turnkey',
    customSqm: '',
    includeBQ: true,
    includeFence: true,
    includeBorehole: true,
    includeSolar: false,
    planFileName: '',
    planPreviewUrl: '',
    userNotes: '',
  });
  const [expandedValuationId, setExpandedValuationId] = useState(
    designValuations[0]?.id || 'val-seed-1'
  );
  const [justSubmittedVal, setJustSubmittedVal] = useState(null);

  // Live preview of the current valuation form
  const liveValuationPreview = useMemo(
    () => calculatePersonalDesignValuation(valForm),
    [valForm]
  );

  // Chatbot Input State
  const [chatInput, setChatInput] = useState('');

  // Quick Nigerian Fence & Plot Calculator State (in Materials tab)
  const [fencePlots, setFencePlots] = useState(1); // 0.5, 1, 1.5, 2, 6 (1 Acre)
  const [fenceSoil, setFenceSoil] = useState('dry'); // 'dry' | 'swampy'
  const [fenceGatehouse, setFenceGatehouse] = useState(true);

  const fenceCalculation = useMemo(() => {
    const perimeterScale = fencePlots === 0.5 ? 0.72 : fencePlots === 1 ? 1.0 : fencePlots === 1.5 ? 1.28 : fencePlots === 2 ? 1.55 : 3.2;
    const soilFactor = fenceSoil === 'swampy' ? 1.25 : 1.0;
    const blocks = Math.round(3200 * perimeterScale * soilFactor) + (fenceGatehouse ? 650 : 0);
    const cementBags = Math.round(270 * perimeterScale * soilFactor) + (fenceGatehouse ? 65 : 0);
    const ironRodLengths = Math.round(165 * perimeterScale * soilFactor) + (fenceGatehouse ? 35 : 0);
    const sandTrips = Math.max(Math.round(2 * perimeterScale), 1);
    const graniteTrips = Math.max(Math.round(1 * perimeterScale), 1);
    const estCostNGN = Math.round((8_200_000 * perimeterScale * soilFactor) + (fenceGatehouse ? 2_400_000 : 0));
    return { blocks, cementBags, ironRodLengths, sandTrips, graniteTrips, estCostNGN };
  }, [fencePlots, fenceSoil, fenceGatehouse]);

  const handleFileSelection = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const objectUrl = isImage ? URL.createObjectURL(file) : '';
    setValForm((prev) => ({
      ...prev,
      planFileName: file.name,
      planPreviewUrl: objectUrl || prev.planPreviewUrl,
    }));
  };

  const handleValuationSubmit = async (e) => {
    e.preventDefault();
    const created = await submitDesignForValuation(valForm);
    setJustSubmittedVal(created);
    setExpandedValuationId(created.id);
    setValForm((prev) => ({
      ...prev,
      designTitle: '',
      townArea: '',
      userNotes: '',
    }));
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  const checklistPercent = Math.round(
    (checklistDoneIds.length / Math.max(NIGERIAN_LAND_CHECKLIST.length, 1)) * 100
  );

  const DASHBOARD_TABS = [
    {
      id: 'overview',
      label: '1. Dashboard Home',
      sub: 'Summary & Plain Guide',
      icon: Home,
      badge: null,
    },
    {
      id: 'saved',
      label: '2. Saved Properties',
      sub: 'Compare House Plans',
      icon: Bookmark,
      badge: savedProperties.length,
    },
    {
      id: 'valuation',
      label: '3. Value My Design',
      sub: 'Submit Personal Plan',
      icon: Upload,
      badge: designValuations.length,
    },
    {
      id: 'specialists',
      label: '4. Connect Specialists',
      sub: '8 Building Agents',
      icon: Wrench,
      badge: specialistAgents.length,
    },
    {
      id: 'chatbot',
      label: '5. Ask EkeBot (Chatbot)',
      sub: '24/7 Building Advisor',
      icon: Sparkles,
      badge: 'AI',
    },
    {
      id: 'materials',
      label: '6. Material & Fence Calc',
      sub: 'Cement, Blocks & Rods',
      icon: Calculator,
      badge: null,
    },
    {
      id: 'planner',
      label: '7. My Quotes & Checklist',
      sub: 'Stage Payment & Land',
      icon: ShieldCheck,
      badge: `${checklistPercent}%`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-24">
      {/* =====================================================================
          USER DASHBOARD HEADER (Strictly Single User Dashboard — Nigerian Friendly)
         ===================================================================== */}
      <section className="bg-[#0A1628] text-white pt-10 pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B2E] border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>My Personal Ekesonconstruct User Dashboard • Nigeria</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold">
                Welcome back, <span className="text-emerald-400">{user.fullName}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Manage your saved properties and house plans, submit your personal building design for an honest Naira valuation, chat with <strong>EkeBot</strong> in simple English, and check today’s cement, block, and iron rod prices across Nigeria.
              </p>
            </div>

            {/* Right User Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Currency Selector */}
              <div className="flex items-center gap-1.5 bg-[#11223E] border border-white/15 rounded-xl px-3 py-2">
                <span className="text-[11px] text-slate-300">Currency:</span>
                <select
                  aria-label="Dashboard Currency"
                  value={currency}
                  onChange={(e) => changeCurrency(e.target.value)}
                  className="bg-transparent text-emerald-300 font-mono font-bold text-xs focus:outline-none cursor-pointer"
                >
                  {Object.keys(CURRENCIES).map((code) => (
                    <option key={code} value={code} className="bg-[#0A1628] text-white">
                      {CURRENCIES[code].label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('valuation')}
                className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#0A1628] text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition cursor-pointer shadow-md"
              >
                <Upload className="w-4 h-4" />
                <span>Submit Design for Valuation</span>
              </button>

              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Admin Dashboard</span>
              </Link>

              <button
                type="button"
                onClick={() => setActiveTab('chatbot')}
                aria-label="Open Chatbot"
                title="Chatbot"
                className="p-2.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white border border-emerald-400/40 inline-flex items-center justify-center transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </button>

              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition cursor-pointer"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* 7-Tab Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
            {DASHBOARD_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#0D3B2E] border-emerald-400 text-white shadow-lg'
                      : 'bg-[#11223E]/90 border-white/10 text-slate-300 hover:text-white hover:bg-[#11223E]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                    {tab.badge !== null && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isActive
                            ? 'bg-emerald-400 text-[#0A1628]'
                            : 'bg-white/10 text-emerald-300'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">{tab.label}</span>
                    <span className="text-[10px] text-slate-300/90 block mt-0.5">{tab.sub}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN DASHBOARD BODY
         ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-10">
        {/* ===================================================================
            TAB 1: DASHBOARD OVERVIEW
           =================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Key User Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div
                onClick={() => setActiveTab('saved')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Saved Properties & Plans
                  </span>
                  <Bookmark className="w-5 h-5 text-[#0D3B2E]" />
                </div>
                <span className="text-3xl font-extrabold text-[#0A1628] mt-2 block">
                  {savedProperties.length}
                </span>
                <span className="text-xs text-[#0D3B2E] font-semibold mt-1 inline-flex items-center gap-1">
                  <span>Compare Carcass vs Move-In Cost</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('valuation')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    My Design Valuations
                  </span>
                  <Upload className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-3xl font-extrabold text-[#0A1628] mt-2 block">
                  {designValuations.length}
                </span>
                <span className="text-xs text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                  <span>Submit Personal Plan for Valuation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('specialists')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Building Specialists
                  </span>
                  <Wrench className="w-5 h-5 text-[#0D3B2E]" />
                </div>
                <span className="text-3xl font-extrabold text-[#0A1628] mt-2 block">
                  {specialistAgents.length} Verified
                </span>
                <span className="text-xs text-[#0D3B2E] font-semibold mt-1 inline-flex items-center gap-1">
                  <span>Connect to COREN & ARCON Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('planner')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Land & Build Readiness
                  </span>
                  <ShieldCheck className="w-5 h-5 text-[#0D3B2E]" />
                </div>
                <span className="text-3xl font-extrabold text-[#0A1628] mt-2 block">
                  {checklistPercent}%
                </span>
                <span className="text-xs text-slate-500 mt-1 inline-flex items-center gap-1">
                  <span>{quoteRequests.length + payments.length} Active Quotes & Orders</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Two-Column Overview: Saved Properties Preview + Personal Design Valuations Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Saved Properties Preview */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D3B2E] block">
                      Bookmarked Favorites
                    </span>
                    <h2 className="text-lg font-bold text-[#0A1628]">
                      Your Saved Properties & Plans ({savedProperties.length})
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('saved')}
                    className="text-xs font-bold text-[#0D3B2E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {savedProperties.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                    <p className="text-xs text-slate-600">
                      You haven’t saved any house plans yet. Browse our catalog to bookmark your favourite bungalows, duplexes, or flats!
                    </p>
                    <Link
                      href="/properties"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1628] text-white text-xs font-bold"
                    >
                      <span>Browse House Plans</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedProperties.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#0D3B2E] block">
                            {item.reference} • {item.bedrooms ? `${item.bedrooms} Bedrooms` : item.category} • Fits {item.landSizeSqm} sqm Plot
                          </span>
                          <Link
                            href={`/properties/${item.id}`}
                            className="text-sm font-bold text-[#0A1628] hover:text-[#0D3B2E]"
                          >
                            {item.title}
                          </Link>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                            <span>
                              Carcass (Roofed):{' '}
                              <strong className="text-slate-800">
                                {formatPrice(item.carcassPriceNGN || Math.round(item.priceNGN * 0.47))}
                              </strong>
                            </span>
                            <span>•</span>
                            <span>
                              Complete Move-In:{' '}
                              <strong className="text-[#0D3B2E]">
                                {formatPrice(item.priceNGN)}
                              </strong>
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab('saved')}
                          className="px-3 py-2 rounded-xl bg-[#0A1628] text-white text-xs font-bold shrink-0 cursor-pointer"
                        >
                          Compare
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Design Valuations Preview */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 block">
                      Custom Plan Costing
                    </span>
                    <h2 className="text-lg font-bold text-[#0A1628]">
                      My Personal Design Valuations ({designValuations.length})
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('valuation')}
                    className="px-3 py-1.5 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-300" />
                    <span>+ Value New Design</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {designValuations.slice(0, 3).map((val) => (
                    <div
                      key={val.id}
                      className="p-4 rounded-2xl bg-emerald-950/5 border border-[#0D3B2E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#0D3B2E] block">
                          {val.reference} • {val.stateLocation} • {val.landPlotType.split('(')[0]}
                        </span>
                        <h3 className="text-sm font-bold text-[#0A1628]">{val.designTitle}</h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Carcass: <strong>{formatPrice(val.carcassCostNGN)}</strong> • Complete Move-In:{' '}
                          <strong className="text-[#0D3B2E]">{formatPrice(val.standardTurnkeyNGN)}</strong>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedValuationId(val.id);
                          setActiveTab('valuation');
                        }}
                        className="px-3 py-2 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold shrink-0 cursor-pointer"
                      >
                        See Material List
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: SAVED PROPERTIES & HOUSE PLANS
           =================================================================== */}
        {activeTab === 'saved' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D3B2E] block">
                    Your Bookmarked Properties & House Plans
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-0.5">
                    Saved Properties ({savedProperties.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Switch between <strong>Carcass Only (Structure + Roof)</strong> and <strong>Complete Move-In Finish</strong> to see what fits your current budget.
                  </p>
                </div>

                {/* Tier Toggle */}
                <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start">
                  {[
                    { id: 'carcass', label: 'Carcass (Roofed Shell)' },
                    { id: 'turnkey', label: 'Complete Move-In' },
                    { id: 'luxury', label: 'Luxury Finish' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSavedFinishTier(t.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        savedFinishTier === t.id
                          ? 'bg-[#0A1628] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#0A1628]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {savedProperties.length === 0 ? (
                <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                  <Bookmark className="w-10 h-10 text-[#0D3B2E] mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                    No Saved Properties Yet
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Click any house plan below or visit our full catalog to save properties into your personal dashboard for easy comparison.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedProperties.map((prop) => {
                    const priceShown =
                      savedFinishTier === 'carcass'
                        ? prop.carcassPriceNGN || Math.round(prop.priceNGN * 0.47)
                        : savedFinishTier === 'luxury'
                        ? prop.luxuryPriceNGN || Math.round(prop.priceNGN * 1.38)
                        : prop.standardPriceNGN || prop.priceNGN;

                    return (
                      <div
                        key={prop.id}
                        className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/70 flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-52 bg-[#0A1628]">
                            <img
                              src={prop.images?.[0]}
                              alt={prop.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-black/30" />
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                              <span className="px-2.5 py-1 rounded bg-[#0A1628]/90 text-emerald-300 font-mono text-xs font-bold">
                                {prop.reference}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleSavedProperty(prop.id)}
                                className="px-3 py-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Remove</span>
                              </button>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                              <div>
                                <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                                  {savedFinishTier === 'carcass'
                                    ? 'Carcass (Structure + Roof)'
                                    : savedFinishTier === 'luxury'
                                    ? 'Luxury Executive Finish'
                                    : 'Complete Move-In House'}
                                </span>
                                <span className="text-2xl font-mono font-bold">
                                  {formatPrice(priceShown)}
                                </span>
                              </div>
                              <span className="px-2.5 py-1 rounded bg-[#0D3B2E] text-emerald-200 text-[11px] font-mono">
                                Fits {prop.landSizeSqm} sqm Land
                              </span>
                            </div>
                          </div>

                          <div className="p-5 space-y-4">
                            <div>
                              <Link
                                href={`/properties/${prop.id}`}
                                className="font-serif text-xl font-bold text-[#0A1628] hover:text-[#0D3B2E]"
                              >
                                {prop.title}
                              </Link>
                              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                                {prop.description}
                              </p>
                            </div>

                            {/* Plain-English Material Count */}
                            <div className="grid grid-cols-2 gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase block">
                                  50KG CEMENT BAGS
                                </span>
                                <span className="font-bold text-[#0A1628]">
                                  {prop.boqSummary?.cementBags || '2,350 Bags'}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase block">
                                  9-INCH BLOCKS
                                </span>
                                <span className="font-bold text-[#0A1628]">
                                  {prop.boqSummary?.sandcreteBlocks || '15,800 Blocks'}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase block">
                                  IRON RODS (REBAR)
                                </span>
                                <span className="font-bold text-[#0D3B2E]">
                                  {prop.boqSummary?.steelRebarTonnes || '29.8 Tonnes'}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 uppercase block">
                                  BUILD TIME
                                </span>
                                <span className="font-bold text-[#0A1628]">
                                  {prop.buildDuration || '7–9 Months'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-5 pb-5 flex flex-wrap items-center gap-2">
                          <Link
                            href={`/properties/${prop.id}`}
                            className="px-3.5 py-2.5 rounded-xl bg-[#0A1628] text-white text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Full Plan Details</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setActiveQuoteProperty(prop)}
                            className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#0A1628] text-xs font-bold cursor-pointer"
                          >
                            Request Material List
                          </button>
                          <a
                            href={buildWhatsAppLink(
                              prop,
                              `Hello Engr. Ekeson, I saved "${prop.title}" (${prop.reference}) in my User Dashboard and want to discuss building it (${savedFinishTier.toUpperCase()} estimate: ${formatPrice(priceShown)}).`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2.5 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold inline-flex items-center gap-1 ml-auto"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quick Add More Properties from Catalog */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0A1628]">
                    Explore More Nigerian House Plans to Save
                  </h3>
                  <Link href="/properties" className="text-xs font-bold text-[#0D3B2E] hover:underline">
                    See Full Catalog ({properties.length}) →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {properties
                    .filter((p) => !savedIds.includes(p.id))
                    .slice(0, 3)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-3"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-[#0D3B2E] font-bold">
                            {p.reference} • {formatPrice(p.priceNGN, true)}
                          </span>
                          <h4 className="text-xs font-bold text-[#0A1628] mt-0.5 line-clamp-1">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Carcass: {formatPrice(p.carcassPriceNGN, true)} • Fits {p.landSizeSqm} sqm
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSavedProperty(p.id)}
                          className="w-full py-2 rounded-xl bg-[#0A1628] hover:bg-[#0D3B2E] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Save to My Dashboard</span>
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: SUBMIT PERSONAL DESIGN FOR VALUATION (FLAGSHIP INNOVATION)
           =================================================================== */}
        {activeTab === 'valuation' && (
          <div className="space-y-10">
            {/* Top Valuation Studio: Form on Left (7 cols) + Live Instant Valuation Certificate Preview on Right (5 cols) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="bg-[#0A1628] text-white px-6 sm:px-8 py-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    First in Nigeria • Personal Architectural Design & House Plan Valuation Studio
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                    Submit Your Personal Design for Instant Naira & Material Valuation
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                    Already have a building drawing from your architect, a floor plan sketch, or a house idea? Fill in the simple details below and upload your design to see the exact Naira cost, bags of cement, blocks, iron rods, and 6-stage payment plan.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-xl bg-[#0D3B2E] border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold self-start shrink-0">
                  Instant AI + QS Valuation
                </span>
              </div>

              {justSubmittedVal && (
                <div className="m-6 p-5 rounded-2xl bg-emerald-50 border-2 border-[#0D3B2E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#0D3B2E] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-bold text-[#0A1628]">
                        Personal Design Valuation Generated & Saved! ({justSubmittedVal.reference})
                      </h3>
                      <p className="text-xs text-slate-700 mt-0.5">
                        <strong>{justSubmittedVal.designTitle}</strong> — Estimated at{' '}
                        <strong>{formatPrice(justSubmittedVal.selectedTotalNGN)}</strong> ({justSubmittedVal.materials.cementBags.split('(')[0]} • {justSubmittedVal.materials.blocks9Inch.split('(')[0]}). Scroll down to inspect your full 6-stage certificate!
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setJustSubmittedVal(null)}
                    className="px-3 py-1.5 rounded-lg bg-[#0D3B2E] text-white text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              )}

              <form onSubmit={handleValuationSubmit} className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left 7 Cols: Easy Nigerian User Inputs */}
                <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#0A1628] mb-1">
                        1. Name of Your Personal Design / House Idea *
                      </label>
                      <input
                        type="text"
                        required
                        value={valForm.designTitle}
                        onChange={(e) => setValForm({ ...valForm, designTitle: e.target.value })}
                        placeholder="e.g. My 4-Bedroom Bungalow for Enugu or 5-Bedroom Duplex in Lekki"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm text-[#0A1628] focus:outline-none focus:border-[#0D3B2E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1628] mb-1">
                        2. Type of Building *
                      </label>
                      <select
                        value={valForm.buildingType}
                        onChange={(e) => setValForm({ ...valForm, buildingType: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-[#0A1628]"
                      >
                        <option value="2-Bedroom Bungalow">2-Bedroom Bungalow</option>
                        <option value="3-Bedroom Bungalow">3-Bedroom Bungalow</option>
                        <option value="4-Bedroom Bungalow">4-Bedroom Bungalow</option>
                        <option value="4-Bedroom Duplex">4-Bedroom Detached Duplex</option>
                        <option value="5-Bedroom Duplex">5-Bedroom Detached Duplex</option>
                        <option value="6-Bedroom Triplex / Mansion">6-Bedroom Triplex / Mansion</option>
                        <option value="Twin Semi-Detached Duplex (2 Wings)">Twin Semi-Detached Duplex (2 Wings)</option>
                        <option value="Block of 4 Flats (3-Bedroom Each)">Block of 4 Flats (For Rent / Investment)</option>
                        <option value="Block of 6 Flats (2/3-Bedroom Each)">Block of 6 Flats (For Rent / Investment)</option>
                        <option value="Commercial Plaza / Shopping Complex">Commercial Plaza / Shopping Complex</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1628] mb-1">
                        3. Which State in Nigeria Is Your Land? *
                      </label>
                      <select
                        value={valForm.stateLocation}
                        onChange={(e) => {
                          const matched = NIGERIAN_STATES_AND_ZONES.find((z) => z.state === e.target.value);
                          setValForm({
                            ...valForm,
                            stateLocation: e.target.value,
                            soilType: matched?.defaultSoil || valForm.soilType,
                          });
                        }}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-[#0A1628]"
                      >
                        {NIGERIAN_STATES_AND_ZONES.map((z) => (
                          <option key={z.state} value={z.state}>
                            {z.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1628] mb-1">
                        4. Town / Estate / Area Name
                      </label>
                      <input
                        type="text"
                        value={valForm.townArea}
                        onChange={(e) => setValForm({ ...valForm, townArea: e.target.value })}
                        placeholder="e.g. Sangotedo, Guzape, Independence Layout, GRA"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-[#0A1628]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1628] mb-1">
                        5. Your Land Size (In Nigerian Plots)
                      </label>
                      <select
                        value={valForm.landPlotType}
                        onChange={(e) => setValForm({ ...valForm, landPlotType: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-[#0A1628]"
                      >
                        <option value="Half Plot (300 sqm / 30x120ft or 50x50ft)">
                          Half Plot (~300 sqm / 50×50ft)
                        </option>
                        <option value="Full Plot (500–600 sqm / 60x120ft or 50x100ft)">
                          1 Full Plot (~500–600 sqm / 60×120ft)
                        </option>
                        <option value="1.5 Plots (900 sqm)">1.5 Plots (~900 sqm)</option>
                        <option value="2 Plots (1,200 sqm)">2 Full Plots (~1,200 sqm)</option>
                        <option value="1 Acre (6 Plots / 4,000 sqm)">1 Acre (6 Plots / ~4,000 sqm)</option>
                      </select>
                    </div>
                  </div>

                  {/* Soil Condition in Plain English */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A1628] mb-1.5">
                      6. How Is the Ground / Soil on Your Land?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'dry',
                          title: 'Dry & Firm Land',
                          desc: 'Normal red earth (Strip/Pad foundation)',
                        },
                        {
                          id: 'waterlogged',
                          title: 'Waterlogged / Swampy',
                          desc: 'Holds water in rainy season (Raft/Pile)',
                        },
                        {
                          id: 'rocky',
                          title: 'Sloping / Hilly Land',
                          desc: 'Sloped or rocky ground (Stepped base)',
                        },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setValForm({ ...valForm, soilType: s.id })}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            valForm.soilType === s.id
                              ? 'bg-[#0D3B2E] text-white border-[#0D3B2E]'
                              : 'bg-slate-50 text-[#0A1628] border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-bold block">{s.title}</span>
                          <span
                            className={`text-[10px] block mt-0.5 ${
                              valForm.soilType === s.id ? 'text-emerald-200' : 'text-slate-500'
                            }`}
                          >
                            {s.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Completion Level */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A1628] mb-1.5">
                      7. Which Stage Do You Want Us to Value?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'carcass',
                          title: 'Carcass Only (Roofed)',
                          desc: 'Foundation + Blocks + Decking + Roof',
                        },
                        {
                          id: 'turnkey',
                          title: 'Complete Move-In',
                          desc: 'Plastered, Wired, Tiled & Painted',
                        },
                        {
                          id: 'luxury',
                          title: 'Luxury Executive',
                          desc: 'Premium Tiles, Smart Home & POP',
                        },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setValForm({ ...valForm, finishLevel: f.id })}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            valForm.finishLevel === f.id
                              ? 'bg-[#0A1628] text-white border-[#0A1628]'
                              : 'bg-slate-50 text-[#0A1628] border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className="text-xs font-bold block">{f.title}</span>
                          <span
                            className={`text-[10px] block mt-0.5 ${
                              valForm.finishLevel === f.id ? 'text-emerald-300' : 'text-slate-500'
                            }`}
                          >
                            {f.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compound Extras */}
                  <div>
                    <label className="block text-xs font-bold text-[#0A1628] mb-1.5">
                      8. Include Nigerian Compound Extras in Your Valuation:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      {[
                        { key: 'includeBQ', label: 'Boys Quarters (BQ)' },
                        { key: 'includeFence', label: 'Fence & Gatehouse' },
                        { key: 'includeBorehole', label: 'Borehole & Water Tank' },
                        { key: 'includeSolar', label: 'Solar & Inverter' },
                      ].map((ex) => (
                        <label
                          key={ex.key}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer font-semibold ${
                            valForm[ex.key]
                              ? 'bg-emerald-50 border-[#0D3B2E] text-[#0D3B2E]'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={valForm[ex.key]}
                            onChange={(e) =>
                              setValForm({ ...valForm, [ex.key]: e.target.checked })
                            }
                            className="accent-[#0D3B2E]"
                          />
                          <span>{ex.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Upload Drawing / Sketch File or Link */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-[#0A1628] block">
                          9. Attach Your Personal Building Plan, Sketch or House Photo
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Upload PDF, JPG, PNG drawing from your phone/computer or paste a link
                        </span>
                      </div>
                      <label className="px-3.5 py-2 rounded-xl bg-[#0A1628] hover:bg-[#0D3B2E] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer self-start shrink-0">
                        <Upload className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Choose Plan File</span>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={handleFileSelection}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {valForm.planFileName && (
                      <p className="text-xs font-mono font-bold text-[#0D3B2E]">
                        ✓ Attached File: {valForm.planFileName}
                      </p>
                    )}
                    <input
                      type="text"
                      value={valForm.userNotes}
                      onChange={(e) => setValForm({ ...valForm, userNotes: e.target.value })}
                      placeholder="Any special request? (e.g. I want high parapet roof, pent room, or swimming pool)"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-[#0A1628]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Generate & Save My Official Personal Design Valuation</span>
                  </button>
                </div>

                {/* Right 5 Cols: Live Instant Valuation Preview */}
                <div className="lg:col-span-5 bg-[#0A1628] text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                          Live Nigerian Market Valuation Preview
                        </span>
                        <h3 className="font-serif text-xl font-bold mt-0.5">
                          {valForm.designTitle || `Your ${valForm.buildingType}`}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-white/10 text-emerald-300 font-mono text-xs">
                        ~{liveValuationPreview.floorAreaSqm} sqm
                      </span>
                    </div>

                    {/* Selected Price Box */}
                    <div className="p-5 rounded-2xl bg-[#0D3B2E] border border-emerald-400/40 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 block">
                        Estimated Cost ({valForm.finishLevel === 'carcass' ? 'Carcass / Roofed' : valForm.finishLevel === 'luxury' ? 'Luxury Finish' : 'Complete Move-In'})
                      </span>
                      <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white">
                        {formatPrice(liveValuationPreview.selectedTotalNGN)}
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15 text-[11px] font-mono text-emerald-100">
                        <div>
                          Carcass Only: <strong>{formatPrice(liveValuationPreview.carcassCostNGN, true)}</strong>
                        </div>
                        <div>
                          Complete Move-In: <strong>{formatPrice(liveValuationPreview.standardTurnkeyNGN, true)}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Live Material Estimate */}
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                        Estimated Building Materials Needed:
                      </span>
                      <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                          <span className="text-slate-300">50kg Cement:</span>
                          <span className="font-bold text-white">{liveValuationPreview.materials.cementBags.split('(')[0]}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                          <span className="text-slate-300">9-Inch Blocks:</span>
                          <span className="font-bold text-white">{liveValuationPreview.materials.blocks9Inch.split('(')[0]}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                          <span className="text-slate-300">Iron Rods:</span>
                          <span className="font-bold text-emerald-300">{liveValuationPreview.materials.ironRods.split('(')[0]}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                          <span className="text-slate-300">Sand & Granite:</span>
                          <span className="font-bold text-white">
                            {liveValuationPreview.materials.sharpSandTrips.split(' ')[0]} Sand • {liveValuationPreview.materials.graniteTrips.split(' ')[0]} Granite Trips
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Plain-English Foundation Advice */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                        Recommended Foundation for {valForm.stateLocation}:
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {liveValuationPreview.foundationRecommendation}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 italic">
                    Click <strong>“Generate & Save My Official Personal Design Valuation”</strong> to save this full 6-stage breakdown to your dashboard below.
                  </p>
                </div>
              </form>
            </div>

            {/* Saved Personal Design Valuations List */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Your Personal Valuation Certificates
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0A1628]">
                    My Submitted Personal Designs ({designValuations.length})
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                {designValuations.map((val) => {
                  const isExpanded = expandedValuationId === val.id;
                  const waValuationHref = buildWhatsAppLink(
                    null,
                    `Hello Engr. Ekeson, I submitted my personal building design "${val.designTitle}" [Ref: ${val.reference}] on my Ekesonconstruct User Dashboard.\n• Building Type: ${val.buildingType}\n• Location: ${val.townArea}, ${val.stateLocation}\n• Land Size: ${val.landPlotType}\n• Carcass Estimate: ${formatPrice(val.carcassCostNGN)}\n• Complete Move-In Estimate: ${formatPrice(val.standardTurnkeyNGN)}\n\nPlease review my drawing and schedule a Quantity Surveyor sign-off.`
                  );

                  return (
                    <div
                      key={val.id}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                      <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/70 border-b border-slate-200">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-xs font-bold">
                              {val.reference}
                            </span>
                            <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-[#0D3B2E] text-xs font-bold">
                              {val.status}
                            </span>
                            <span className="text-xs text-slate-500">• {val.createdAt}</span>
                          </div>
                          <h4 className="font-serif text-xl font-bold text-[#0A1628]">
                            {val.designTitle}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {val.buildingType} (~{val.floorAreaSqm} sqm) • {val.townArea},{' '}
                            <strong>{val.stateLocation}</strong> • {val.landPlotType}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-right">
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">
                              Carcass (Roofed)
                            </span>
                            <span className="text-sm font-mono font-bold text-slate-800">
                              {formatPrice(val.carcassCostNGN)}
                            </span>
                          </div>
                          <div className="bg-[#0D3B2E] text-white px-4 py-2 rounded-xl text-right">
                            <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                              Complete Move-In
                            </span>
                            <span className="text-sm font-mono font-bold">
                              {formatPrice(val.standardTurnkeyNGN)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedValuationId(isExpanded ? null : val.id)
                            }
                            className="px-3.5 py-2.5 rounded-xl bg-[#0A1628] text-white text-xs font-bold cursor-pointer"
                          >
                            {isExpanded ? 'Hide Breakdown' : 'View Full Breakdown'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteDesignValuation(val.id)}
                            title="Delete Valuation"
                            className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-6 sm:p-8 space-y-6">
                          {/* Materials Grid */}
                          <div>
                            <h5 className="text-xs font-mono uppercase tracking-wider text-[#0D3B2E] font-bold mb-3">
                              Estimated Material List for Your Personal Design:
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] font-mono text-slate-400 block">
                                  50KG CEMENT
                                </span>
                                <span className="font-bold text-[#0A1628] mt-0.5 block">
                                  {val.materials?.cementBags}
                                </span>
                              </div>
                              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] font-mono text-slate-400 block">
                                  9-INCH BLOCKS
                                </span>
                                <span className="font-bold text-[#0A1628] mt-0.5 block">
                                  {val.materials?.blocks9Inch}
                                </span>
                              </div>
                              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] font-mono text-slate-400 block">
                                  IRON RODS (12MM/16MM)
                                </span>
                                <span className="font-bold text-[#0D3B2E] mt-0.5 block">
                                  {val.materials?.ironRods}
                                </span>
                              </div>
                              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] font-mono text-slate-400 block">
                                  SHARP SAND
                                </span>
                                <span className="font-bold text-[#0A1628] mt-0.5 block">
                                  {val.materials?.sharpSandTrips}
                                </span>
                              </div>
                              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] font-mono text-slate-400 block">
                                  GRANITE STONE
                                </span>
                                <span className="font-bold text-[#0A1628] mt-0.5 block">
                                  {val.materials?.graniteTrips}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* 6-Stage Pay-As-You-Build Breakdown */}
                          <div>
                            <h5 className="text-xs font-mono uppercase tracking-wider text-[#0D3B2E] font-bold mb-3">
                              6-Stage “Pay-As-You-Build” Cost Breakdown:
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {(val.stageBreakdown || []).map((st) => (
                                <div
                                  key={st.stage}
                                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-xs font-bold text-[#0A1628]">
                                        {st.stage}
                                      </span>
                                      <span className="px-2 py-0.5 rounded bg-[#0D3B2E] text-emerald-300 font-mono text-xs font-bold shrink-0">
                                        {formatPrice(st.amountNGN)}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                                      {st.plainExplanation}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Bar */}
                          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-slate-600">
                              <strong>Foundation Note:</strong> {val.foundationRecommendation}
                            </p>
                            <a
                              href={waValuationHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-3 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm"
                            >
                              <MessageCircle className="w-4 h-4 text-emerald-300" />
                              <span>Discuss & Stamp This Design on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: ASK EKEBOT (24/7 NIGERIAN BUILDING & VALUATION CHATBOT)
           =================================================================== */}
        {activeTab === 'chatbot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Interactive Chat Window */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[680px]">
              {/* Chatbot Header */}
              <div className="bg-[#0A1628] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0D3B2E] border border-emerald-400/40 flex items-center justify-center relative">
                    <Sparkles className="w-5 h-5 text-emerald-300" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A1628] absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                      Online 24/7 • Trained for Nigerian Landowners & Homebuilders
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl font-bold">
                      EkeBot — Your Plain-English Nigerian Building & Valuation Assistant
                    </h2>
                  </div>
                </div>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0D3B2E] text-emerald-300 text-xs font-bold border border-emerald-400/30"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Talk to Human Engineer</span>
                </a>
              </div>

              {/* Chat Messages Scroll Area */}
              <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/70">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#0A1628] text-white rounded-br-none'
                          : 'bg-white text-[#0A1628] border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      {msg.title && (
                        <div className="flex items-center gap-1.5 font-bold text-[#0D3B2E] border-b border-slate-100 pb-1.5">
                          <Sparkles className="w-4 h-4 shrink-0" />
                          <span>{msg.title}</span>
                        </div>
                      )}
                      <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                      {msg.actionTab && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setActiveTab(msg.actionTab)}
                            className="px-3.5 py-2 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{msg.actionLabel || 'Open Tool'}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Question Chips */}
              <div className="px-5 py-3 bg-white border-t border-slate-200 overflow-x-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 shrink-0">
                    Tap a Question:
                  </span>
                  {EKEBOT_SUGGESTED_QUESTIONS.map((qText) => (
                    <button
                      key={qText}
                      type="button"
                      onClick={() => sendChatMessage(qText)}
                      className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#0D3B2E] text-slate-700 hover:text-white text-xs font-semibold transition shrink-0 cursor-pointer"
                    >
                      {qText}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleChatSend}
                className="p-4 bg-white border-t border-slate-200 flex items-center gap-2.5"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask EkeBot anything (e.g. How many blocks to fence 1 plot? How much for a 3-bed bungalow?)..."
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-xs sm:text-sm text-[#0A1628] focus:outline-none focus:border-[#0D3B2E]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </form>
            </div>

            {/* Right 4 Cols: Popular Nigerian Building Topics */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Quick Answers for Nigerians
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                  Click Any Question to Ask EkeBot
                </h3>
                <div className="space-y-2">
                  {EKEBOT_SUGGESTED_QUESTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => sendChatMessage(item)}
                      className="w-full p-3 rounded-xl bg-slate-50 hover:bg-[#0A1628] text-slate-700 hover:text-white border border-slate-200 text-left text-xs font-semibold transition flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0A1628] text-white rounded-3xl p-6 border border-white/10 space-y-3">
                <h4 className="font-serif text-lg font-bold text-emerald-400">
                  Have Your Own Building Drawing?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instead of guessing, use our Personal Design Valuation tool to get an instant breakdown of cement bags, blocks, iron rods, and stage-by-stage costs.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('valuation')}
                  className="w-full py-3 rounded-xl bg-emerald-400 text-[#0A1628] text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                >
                  Submit Personal Design Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: NIGERIAN MATERIAL CALCULATOR, FENCE ESTIMATOR & LIVE PRICES
           =================================================================== */}
        {activeTab === 'materials' && (
          <div className="space-y-10">
            {/* Interactive Nigerian Plot Fence & Gatehouse Calculator */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Everyday Nigerian Landowner Tool
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-0.5">
                  Plot Fencing & Security Gatehouse Material Calculator
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Bought land and want to fence it first so nobody encroaches? Select your number of plots below to see the exact blocks, cement bags, iron rods, and estimated cost.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1628] mb-2">
                      1. Select Your Land Size:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { val: 0.5, label: 'Half Plot (300m²)' },
                        { val: 1, label: '1 Full Plot (600m²)' },
                        { val: 1.5, label: '1.5 Plots (900m²)' },
                        { val: 2, label: '2 Plots (1,200m²)' },
                        { val: 6, label: '1 Acre (6 Plots)' },
                      ].map((p) => (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() => setFencePlots(p.val)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                            fencePlots === p.val
                              ? 'bg-[#0A1628] text-white border-[#0A1628]'
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0A1628] mb-1">
                        2. Land Soil Condition:
                      </label>
                      <select
                        value={fenceSoil}
                        onChange={(e) => setFenceSoil(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold"
                      >
                        <option value="dry">Dry / Firm Land (Normal Base)</option>
                        <option value="swampy">Waterlogged / Swampy (Deep Raft Base)</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <label className="w-full p-2.5 rounded-xl bg-white border border-slate-300 flex items-center gap-2 text-xs font-bold text-[#0A1628] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={fenceGatehouse}
                          onChange={(e) => setFenceGatehouse(e.target.checked)}
                          className="accent-[#0D3B2E]"
                        />
                        <span>Include Security Gatehouse + Gate</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-[#0A1628] text-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                        Estimated Total Fencing Cost
                      </span>
                      <span className="text-2xl sm:text-3xl font-mono font-extrabold">
                        {formatPrice(fenceCalculation.estCostNGN)}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded bg-[#0D3B2E] text-emerald-300 font-mono text-xs font-bold">
                      2.4m High Fence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">9-INCH BLOCKS</span>
                      <span className="font-bold text-white">
                        {fenceCalculation.blocks.toLocaleString()} Blocks
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">50KG CEMENT</span>
                      <span className="font-bold text-emerald-300">
                        {fenceCalculation.cementBags} Bags
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">12MM IRON RODS</span>
                      <span className="font-bold text-white">
                        {fenceCalculation.ironRodLengths} Lengths
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">SAND & GRANITE</span>
                      <span className="font-bold text-white">
                        {fenceCalculation.sandTrips}S / {fenceCalculation.graniteTrips}G Trips
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Nigerian Material Prices + Price Alert Toggles */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Live Nigerian Building Material Market Tracker
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0A1628]">
                    Today’s Verified Prices (Cement, Blocks, Iron Rods & Granite)
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  Click <strong>“Alert Me”</strong> to get notified when prices drop
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(materialPrices || LIVE_MATERIAL_PRICE_INDEX).map((item) => {
                  const alertActive = priceAlerts.includes(item.code);
                  return (
                    <div
                      key={item.code}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0A1628] text-emerald-300">
                            {item.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePriceAlert(item.code)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer transition ${
                              alertActive
                                ? 'bg-[#0D3B2E] text-white'
                                : 'bg-white border border-slate-300 text-slate-600'
                            }`}
                          >
                            <Bell className="w-3 h-3" />
                            <span>{alertActive ? 'Alert On' : 'Alert Me'}</span>
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-[#0A1628] leading-snug pt-1">
                          {item.material}
                        </h4>
                        <p className="text-[11px] text-slate-600">{item.application}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">
                            {item.unit}
                          </span>
                          <span className="text-lg font-mono font-extrabold text-[#0D3B2E]">
                            {formatPrice(item.rateNGN)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plain-English Nigerian Building Dictionary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#0D3B2E]" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    No Confusing Grammar • Understand Every Term
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0A1628]">
                    Plain-English Nigerian Building Dictionary (For Everyone)
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {NIGERIAN_LAYMAN_GUIDE.map((item) => (
                  <div
                    key={item.term}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <h4 className="text-sm font-bold text-[#0A1628]">{item.term}</h4>
                    <p className="text-xs font-semibold text-[#0D3B2E]">{item.simpleMeaning}</p>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: MY QUOTES, STAGE PAYMENT PLANNER & LAND SAFETY CHECKLIST
           =================================================================== */}
        {activeTab === 'planner' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 7 Cols: Interactive Nigerian Land & Building Safety Checklist */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                      Protect Your Money & Land in Nigeria
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#0A1628]">
                      6-Step Nigerian Land & Building Readiness Checklist
                    </h2>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-[#0D3B2E] text-emerald-300 font-mono text-xs font-bold">
                    {checklistPercent}% Ready
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0D3B2E] transition-all duration-300"
                    style={{ width: `${checklistPercent}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {NIGERIAN_LAND_CHECKLIST.map((item) => {
                    const done = checklistDoneIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                          done
                            ? 'bg-emerald-50/70 border-[#0D3B2E]/40'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 accent-[#0D3B2E] cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#0A1628] block">
                            Step {item.step}: {item.title}
                          </span>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {item.plainAdvice}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right 5 Cols: My Quotes, Requests & Drawing Orders */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Your Activity & Receipts
                  </span>
                  <h2 className="font-serif text-xl font-bold text-[#0A1628]">
                    My Cost Requests & Drawing Orders ({quoteRequests.length + payments.length})
                  </h2>
                </div>

                <div className="space-y-3">
                  {quoteRequests.map((q) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                    >
                      <div className="flex justify-between font-bold text-[#0A1628]">
                        <span>{q.propertyTitle || 'Custom Building Quote'}</span>
                        <span className="text-[#0D3B2E] font-mono">{q.status}</span>
                      </div>
                      <p className="text-slate-600">
                        Request: {q.enquiryType} • Location: {q.preferredLocation}
                      </p>
                    </div>
                  ))}

                  {payments.map((pay) => (
                    <div
                      key={pay.id}
                      className="p-4 rounded-2xl bg-emerald-950/5 border border-[#0D3B2E]/20 text-xs space-y-1"
                    >
                      <div className="flex justify-between font-bold text-[#0A1628]">
                        <span>{pay.paymentType}</span>
                        <span className="text-[#0D3B2E] font-mono">{pay.reference}</span>
                      </div>
                      <p className="text-slate-600">{pay.propertyTitle}</p>
                      <p className="font-mono font-bold text-[#0D3B2E]">
                        Paid: {formatPrice(pay.amountNGN)} • {pay.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB: CONNECT TO ALL 8 EKESONCONSTRUCT BUILDING SPECIALISTS
           =================================================================== */}
        {activeTab === 'specialists' && (
          <div className="space-y-8">
            {/* Header & Active Connections Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Verified In-House Nigerian Building & Engineering Directory
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                    Connect With All 8 Ekesonconstruct Building Specialists
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                    Click any specialist card below to inspect their <strong>Main Covering</strong>, <strong>Official Technical Specifications</strong>, and connect directly for your land or building project.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openSpecialistModal(activeDashSpec)}
                  className="px-5 py-3 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shrink-0 transition cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-emerald-300" />
                  <span>Open Full Specification & Connect Modal</span>
                </button>
              </div>

              {/* 8 Specialist Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {specialistAgents.map((sp, i) => {
                  const isCurrent = activeDashSpec.id === sp.id;
                  return (
                    <div
                      key={sp.id}
                      onClick={() => setSelectedDashSpecId(sp.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setSelectedDashSpecId(sp.id);
                      }}
                      className={`rounded-2xl p-4 border text-left transition cursor-pointer flex flex-col justify-between gap-3 ${
                        isCurrent
                          ? 'bg-[#0A1628] text-white border-2 border-emerald-400 shadow-lg'
                          : 'bg-slate-50 hover:bg-white text-[#0A1628] border-slate-200'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                              isCurrent
                                ? 'bg-[#0D3B2E] text-emerald-300'
                                : 'bg-white text-[#0D3B2E] border border-slate-200'
                            }`}
                          >
                            0{i + 1} • {sp.shortBadge}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>

                        <div className="flex items-center gap-2.5 pt-1">
                          <img
                            src={sp.photo}
                            alt={sp.roleTitle}
                            className="w-11 h-11 rounded-xl object-cover border border-emerald-400/40 shrink-0"
                          />
                          <div>
                            <h3
                              className={`font-serif text-sm font-bold leading-snug ${
                                isCurrent ? 'text-white' : 'text-[#0A1628]'
                              }`}
                            >
                              {sp.roleTitle}
                            </h3>
                            <p
                              className={`text-[11px] font-semibold ${
                                isCurrent ? 'text-emerald-300' : 'text-[#0D3B2E]'
                              }`}
                            >
                              {sp.leadName}
                            </p>
                          </div>
                        </div>

                        <p
                          className={`text-[11px] line-clamp-2 leading-relaxed ${
                            isCurrent ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          {sp.plainSummary}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDashSpecId(sp.id);
                          openSpecialistModal(sp);
                        }}
                        className={`w-full py-2 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-400 text-[#0A1628] hover:bg-emerald-300'
                            : 'bg-[#0D3B2E] text-white hover:bg-[#0A1628]'
                        }`}
                      >
                        Specify Covering & Connect
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Specialist Full Main Covering & Technical Specification View */}
            <div className="bg-white rounded-3xl border-2 border-[#0D3B2E] shadow-md overflow-hidden">
              <div className="bg-[#0A1628] text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={activeDashSpec.photo}
                    alt={activeDashSpec.roleTitle}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      {activeDashSpec.licenseNo} • {activeDashSpec.experienceYears}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                      {activeDashSpec.roleTitle} — {activeDashSpec.leadName}
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Stage Needed: <strong>{activeDashSpec.stageNeeded}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => openSpecialistModal(activeDashSpec)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#0A1628] text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Connect & Specify Scope
                  </button>
                  <a
                    href={buildWhatsAppLink(
                      null,
                      `Hello ${activeDashSpec.leadName} (${activeDashSpec.roleTitle} at Ekesonconstruct), I am reaching out from my User Dashboard regarding my building project.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 text-white border border-emerald-400/40 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>WhatsApp Specialist</span>
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#0D3B2E] block">
                      Plain-English Summary
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed font-medium">
                      {activeDashSpec.plainSummary}
                    </p>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#0A1628]">
                    Main Covering & Responsibilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeDashSpec.mainCovering.map((cov, idx) => (
                      <div
                        key={cov}
                        onClick={() => openSpecialistModal(activeDashSpec)}
                        className="p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition cursor-pointer flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#0D3B2E] text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <span className="text-xs text-slate-800 font-medium leading-relaxed">
                          {cov}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <h4 className="font-serif text-lg font-bold text-[#0A1628]">
                    Technical Specifications & Deliverables
                  </h4>
                  <div className="bg-[#0A1628] text-white rounded-2xl p-5 space-y-3">
                    {activeDashSpec.technicalSpecifications.map((spec) => (
                      <div
                        key={spec.label}
                        className="border-b border-white/10 last:border-b-0 pb-2.5 last:pb-0"
                      >
                        <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                          {spec.label}
                        </span>
                        <span className="text-xs text-slate-100 font-medium block mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* User's Active Specialist Connections */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Your Connected Ekesonconstruct Specialists
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                    My Specialist Connections ({specialistConnections.length})
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialistConnections.map((conn) => (
                  <div
                    key={conn.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-[#0D3B2E] text-emerald-300 font-mono text-[10px] font-bold">
                        {conn.reference} • {conn.roleTitle}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{conn.createdAt}</span>
                    </div>
                    <p className="font-bold text-[#0A1628] text-sm">{conn.leadName}</p>
                    <p className="text-slate-700">
                      <strong>Main Covering:</strong> {conn.selectedCovering}
                    </p>
                    <p className="text-slate-600">
                      <strong>Site Location:</strong> {conn.projectLocation}
                    </p>
                    <div className="pt-1 flex items-center justify-between border-t border-slate-200/80">
                      <span className="text-[11px] font-mono text-[#0D3B2E] font-bold">
                        {conn.status}
                      </span>
                      <a
                        href={buildWhatsAppLink(
                          null,
                          `Hello ${conn.leadName} (${conn.roleTitle}), following up on my specialist connection [${conn.reference}] for ${conn.selectedCovering} in ${conn.projectLocation}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0D3B2E] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center font-mono text-xs">
          Loading Your Ekesonconstruct User Dashboard...
        </div>
      }
    >
      <NigerianUserDashboardContent />
    </Suspense>
  );
}
