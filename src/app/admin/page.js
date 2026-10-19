'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  LayoutDashboard,
  Building2,
  SlidersHorizontal,
  FileSpreadsheet,
  Wrench,
  TrendingUp,
  HardHat,
  Puzzle,
  PlusCircle,
  Trash2,
  Edit3,
  CheckCircle2,
  ExternalLink,
  Eye,
  Bell,
  RotateCcw,
  Save,
  Search,
  DollarSign,
  Globe,
  Sparkles,
  Upload,
  MapPin,
  MessageCircle,
  Layers,
  ArrowRight,
  Power,
  Home,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { CURRENCIES, buildWhatsAppLink } from '@/data/seedData';

const HERO_PRESET_IMAGES = [
  {
    label: 'Preset 1: Modern High-Rise Structural Landmark (Default)',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90',
  },
  {
    label: 'Preset 2: Contemporary Nigerian Luxury Duplex Villa',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
  },
  {
    label: 'Preset 3: Active Civil & Structural Engineering Site',
    url: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=2000&q=90',
  },
  {
    label: 'Preset 4: Architectural Mansion & Landscaped Compound',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90',
  },
];

export default function AdminDashboardPage() {
  const {
    currency,
    changeCurrency,
    formatPrice,
    properties,
    locations,
    projects,
    designValuations,
    specialistAgents,
    specialistConnections,
    materialPrices,
    enquiries,
    payments,
    notifications,
    pushNotification,
    homepageConfig,
    companyInfo,
    adminPlugins,
    adminCreateProperty,
    adminUpdateProperty,
    adminDeleteProperty,
    adminUpdateValuationStatus,
    adminUpdateEnquiryStatus,
    adminDeleteEnquiry,
    adminUpdatePaymentStatus,
    adminUpdateSpecialist,
    adminUpdateSpecialistConnection,
    adminUpdateMaterialPrice,
    adminAddMaterialPrice,
    adminCreateProject,
    adminUpdateProject,
    adminDeleteProject,
    adminDeleteLocation,
     addDynamicLocation,
    adminUpdateHomepageConfig,
    adminUpdateCompanyInfo,
    adminTogglePlugin,
    adminResetFactoryDefaults,
    openEnquiryModal,
    setListPropertyModalOpen,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState('overview');

  // 1. Broadcast Notification State
  const [broadcastForm, setBroadcastForm] = useState({
    title: 'Important Ekeconstruct Nigeria Update',
    message:
      'Updated COREN structural drawings and Q4 Nigerian building material rates are now live across all 36 states & FCT.',
  });

  // 2. Homepage CMS Form State
  const [cmsForm, setCmsForm] = useState(homepageConfig);
  const [companyForm, setCompanyForm] = useState(companyInfo);

  // 3. Houses & Catalog Manager State
  const [catalogSearch, setCatalogSearch] = useState('');
  const [editingPropId, setEditingPropId] = useState(null);
  const [editPropForm, setEditPropForm] = useState({});
  const [showNewPropForm, setShowNewPropForm] = useState(false);
  const [newPropForm, setNewPropForm] = useState({
    title: '',
    reference: '',
    category: 'Duplex & Villa Structures',
    propertyType: 'Detached Duplex',
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    sizeSqm: 380,
    landSizeSqm: 600,
    carcassPriceNGN: 68000000,
    priceNGN: 142000000,
    luxuryPriceNGN: 188000000,
    planFeeNGN: 2200000,
    cementBags: '2,250 Bags',
    sandcreteBlocks: '15,200 Blocks',
    steelRebarTonnes: '26.5 Tonnes',
    graniteTonnes: '300 Tonnes',
    buildDuration: '6–8 Months',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    description:
      'Complete COREN-stamped structural & architectural house plan with itemized Nigerian material schedule.',
  });

  // 5. Specialist Editor State
  const [selectedSpecId, setSelectedSpecId] = useState(
    specialistAgents[0]?.id || 'spec-civil-engineer'
  );
  const activeSpec = useMemo(
    () =>
      specialistAgents.find((s) => s.id === selectedSpecId) ||
      specialistAgents[0],
    [specialistAgents, selectedSpecId]
  );

  // 6. Material Rate Editor State
  const [editingMatCode, setEditingMatCode] = useState(null);
  const [editingMatRate, setEditingMatRate] = useState(0);
  const [newMatForm, setNewMatForm] = useState({
    code: '',
    category: 'Cement & Binders',
    material: '',
    unit: 'Per 50kg Bag',
    rateNGN: 9500,
    application: 'Foundation, blockwork, plastering & structural concrete.',
  });

  // 7. New Project & New Soil Location State
  const [newProjForm, setNewProjForm] = useState({
    name: '',
    category: 'Residential Turnkey Build',
    location: 'Guzape Hills, Abuja (FCT)',
    completionStatus: 'Roofing & Exterior Plastering',
    progressPercent: 65,
    startingPriceNGN: 175000000,
    structuralHighlight:
      'Reinforced concrete frame on raft foundation with COREN cube test certification.',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=85',
  });

  const [newLocForm, setNewLocForm] = useState({
    city: 'Lagos',
    neighbourhood: '',
    soilProfile: 'Coastal Alluvial Sand & High Water Table',
    averageYield: '95–130 kN/m² Bearing',
    recommendedFoundation: 'Reinforced Concrete Cellular Raft or Bored Pile Foundation',
    description: '',
  });

  const totalConfirmedRevenueNGN = useMemo(
    () => payments.reduce((acc, p) => acc + (Number(p.amountNGN) || 0), 0),
    [payments]
  );

  const filteredCatalog = useMemo(() => {
    if (!catalogSearch.trim()) return properties;
    const q = catalogSearch.toLowerCase();
    return properties.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.reference || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
    );
  }, [properties, catalogSearch]);

  const ADMIN_TABS = [
    {
      id: 'overview',
      label: '1. Command Center',
      sub: 'Overview & Homepage Access',
      icon: LayoutDashboard,
      badge: 'LIVE',
    },
    {
      id: 'homepage',
      label: '2. Homepage CMS',
      sub: 'Hero, Sections & Texts',
      icon: SlidersHorizontal,
      badge: 'CMS',
    },
    {
      id: 'catalog',
      label: '3. Houses & Plans',
      sub: 'Add, Edit & Price Plans',
      icon: Building2,
      badge: properties.length,
    },
    {
      id: 'crm',
      label: '4. Valuations & CRM',
      sub: 'Quotes, Valuations & Pay',
      icon: FileSpreadsheet,
      badge: designValuations.length + enquiries.length,
    },
    {
      id: 'specialists',
      label: '5. 8 Specialists',
      sub: 'Team & Client Dispatches',
      icon: Wrench,
      badge: specialistAgents.length,
    },
    {
      id: 'materials',
      label: '6. Material Prices',
      sub: 'Cement, Blocks & Rebar',
      icon: TrendingUp,
      badge: materialPrices.length,
    },
    {
      id: 'projects',
      label: '7. Sites & Soil Zones',
      sub: 'Projects & 36 States',
      icon: HardHat,
      badge: projects.length + locations.length,
    },
    {
      id: 'plugins',
      label: '8. Plugins & System',
      sub: 'Active Extensions & Reset',
      icon: Puzzle,
      badge: `${adminPlugins.filter((p) => p.enabled).length}/${adminPlugins.length}`,
    },
  ];

  const handleStartEditProp = (prop) => {
    setEditingPropId(prop.id);
    setEditPropForm({
      title: prop.title,
      category: prop.category,
      priceNGN: prop.priceNGN,
      carcassPriceNGN: prop.carcassPriceNGN || Math.round(prop.priceNGN * 0.48),
      luxuryPriceNGN: prop.luxuryPriceNGN || Math.round(prop.priceNGN * 1.32),
      bedrooms: prop.bedrooms || 4,
      sizeSqm: prop.sizeSqm || 350,
      landSizeSqm: prop.landSizeSqm || 600,
      cementBags: prop.boqSummary?.cementBags || '2,100 Bags',
      sandcreteBlocks: prop.boqSummary?.sandcreteBlocks || '14,500 Blocks',
      steelRebarTonnes: prop.boqSummary?.steelRebarTonnes || '24 Tonnes',
      featured: Boolean(prop.featured),
    });
  };

  const handleSaveEditProp = (propId) => {
    adminUpdateProperty(propId, editPropForm);
    setEditingPropId(null);
  };

  const handleCreatePropertySubmit = (e) => {
    e.preventDefault();
    adminCreateProperty(newPropForm);
    setShowNewPropForm(false);
    setNewPropForm((prev) => ({
      ...prev,
      title: '',
      reference: '',
    }));
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-24 text-[#0A1628]">
      {/* =====================================================================
          ADMIN EXECUTIVE HEADER
         ===================================================================== */}
      <section className="bg-gradient-to-br from-[#071120] via-[#0A1628] to-[#0D3B2E] text-white pt-8 pb-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ekeconstruct Nigeria • Master Admin Command Center & CMS</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                Admin Dashboard & Full Platform Control
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Complete administrative access to the Homepage, Houses & Plans Catalog, Personal Design Valuations, 8 Building Specialists, Live Material Price Index, Ongoing Construction Sites, and System Plugins.
              </p>
            </div>

            {/* Quick Navigation & Currency Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-xl px-3 py-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <select
                  aria-label="Admin Currency"
                  value={currency}
                  onChange={(e) => changeCurrency(e.target.value)}
                  className="bg-transparent text-white font-mono font-bold text-xs focus:outline-none cursor-pointer"
                >
                  {Object.keys(CURRENCIES).map((code) => (
                    <option key={code} value={code} className="bg-[#0A1628] text-white">
                      {CURRENCIES[code].label}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#0A1628] text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md transition"
              >
                <Home className="w-4 h-4" />
                <span>View Live Homepage</span>
              </Link>

              <Link
                href="/dashboard"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-300" />
                <span>User Dashboard</span>
              </Link>
            </div>
          </div>

          {/* 8-Module Admin Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
            {ADMIN_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-amber-400 border-amber-300 text-[#0A1628] shadow-lg'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#0A1628]' : 'text-amber-300'
                      }`}
                    />
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                        isActive
                          ? 'bg-[#0A1628] text-amber-300'
                          : 'bg-white/10 text-emerald-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        isActive ? 'text-slate-800 font-medium' : 'text-slate-400'
                      }`}
                    >
                      {tab.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          ADMIN DASHBOARD MAIN WORKSPACE
         ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        {/* ===================================================================
            MODULE 1: EXECUTIVE COMMAND CENTER & FULL HOMEPAGE ACCESS
           =================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top 4 Executive KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div
                onClick={() => setActiveTab('catalog')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Active House Plans
                  </span>
                  <Building2 className="w-5 h-5 text-[#0D3B2E]" />
                </div>
                <span className="text-3xl font-extrabold text-[#0A1628] mt-2 block">
                  {properties.length}
                </span>
                <span className="text-xs text-[#0D3B2E] font-semibold mt-1 inline-flex items-center gap-1">
                  <span>Add or Edit Homepage Plans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('crm')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Valuations & Quotes
                  </span>
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-3xl font-extrabold text-[#0A1628] mt-2 block">
                  {designValuations.length + enquiries.length}
                </span>
                <span className="text-xs text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                  <span>
                    {designValuations.length} Design Valuations • {enquiries.length} Quotes
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('crm')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Confirmed Plan Revenue
                  </span>
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#0A1628] mt-2 block">
                  {formatPrice(totalConfirmedRevenueNGN, true)}
                </span>
                <span className="text-xs text-slate-500 mt-1 inline-flex items-center gap-1">
                  <span>{payments.length} Official Receipts Logged</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div
                onClick={() => setActiveTab('plugins')}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#0D3B2E] transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Active System Plugins
                  </span>
                  <Puzzle className="w-5 h-5 text-[#0D3B2E]" />
                </div>
                <span className="text-3xl font-extrabold text-[#0A1628] mt-2 block">
                  {adminPlugins.filter((p) => p.enabled).length} / {adminPlugins.length}
                </span>
                <span className="text-xs text-[#0D3B2E] font-semibold mt-1 inline-flex items-center gap-1">
                  <span>Manage Platform Extensions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Full Access Launchpad to Homepage Sections & All Platform Features */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Direct Homepage & Platform Feature Access
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#0A1628] mt-0.5">
                    Full Access to Homepage Sections & Core Features
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Jump directly to any live Homepage section, open interactive platform modals, or edit section content in the Admin CMS.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('homepage')}
                  className="px-4 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#0D3B2E] text-white text-xs font-bold inline-flex items-center gap-2 shrink-0 cursor-pointer transition"
                >
                  <SlidersHorizontal className="w-4 h-4 text-amber-300" />
                  <span>Customize Homepage in CMS</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'Homepage Hero & Main View',
                    desc: 'Inspect the main landing page, hero banner, and live sections.',
                    href: '/',
                    editTab: 'homepage',
                    badge: 'Homepage',
                  },
                  {
                    title: 'Section 01 • Building Plans Catalog',
                    desc: `${properties.length} verified house plans, filters & BOQ material counts.`,
                    href: '/#catalog',
                    editTab: 'catalog',
                    badge: 'Section 01',
                  },
                  {
                    title: 'Section 02 • 8 Building Specialists',
                    desc: 'Civil, Architect, QS, Geotechnical, Land Surveyor & MEP directory.',
                    href: '/#specialists-directory',
                    editTab: 'specialists',
                    badge: 'Section 02',
                  },
                  {
                    title: 'Section 03 • Cost & Stage Calculator',
                    desc: 'Interactive Carcass vs Turnkey vs Luxury Naira estimator.',
                    href: '/#estimator',
                    editTab: 'catalog',
                    badge: 'Section 03',
                  },
                  {
                    title: 'Section 04 • Material Price Tracker',
                    desc: `${materialPrices.length} live Nigerian cement, block & iron rod prices.`,
                    href: '/buy',
                    editTab: 'materials',
                    badge: 'Section 04',
                  },
                  {
                    title: 'Ongoing & Completed Sites',
                    desc: `${projects.length} supervised Nigerian building & infrastructure sites.`,
                    href: '/development',
                    editTab: 'projects',
                    badge: 'Portfolio',
                  },
                  {
                    title: '36 States & Soil Guide',
                    desc: `${locations.length} regional soil profiles & foundation recommendations.`,
                    href: '/locations',
                    editTab: 'projects',
                    badge: 'Geotechnical',
                  },
                  {
                    title: 'User Dashboard & Valuation Studio',
                    desc: 'Personal design valuation studio, saved plans & EkeBot advisor.',
                    href: '/dashboard',
                    editTab: 'crm',
                    badge: 'User View',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-4 hover:border-[#0D3B2E] transition"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#0A1628] text-emerald-300 font-mono text-[10px] font-bold">
                          {item.badge}
                        </span>
                        <Link
                          href={item.href}
                          className="text-xs font-bold text-[#0D3B2E] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#0A1628]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveTab(item.editTab)}
                        className="text-xs font-bold text-[#0A1628] hover:text-[#0D3B2E] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#0D3B2E]" />
                        <span>Manage in Admin</span>
                      </button>
                      <Link
                        href={item.href}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Modal Triggers for Testing Features */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-600">
                  Interactive Feature Triggers:
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setListPropertyModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Launch Personal Design Valuation Modal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(properties[0])}
                    className="px-3.5 py-2 rounded-xl bg-[#0A1628] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
                    <span>Launch BOQ & Cost Quote Modal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Column Bottom Row: Live Notification Broadcaster + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left 6 Cols: Real-Time Notification Broadcaster */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1628] text-amber-300 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                      Real-Time Alert Broadcaster Plugin
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                      Broadcast Live Alert to Platform Users
                    </h3>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    pushNotification({
                      title: broadcastForm.title,
                      message: broadcastForm.message,
                      type: 'system',
                    });
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alert Headline
                    </label>
                    <input
                      type="text"
                      required
                      value={broadcastForm.title}
                      onChange={(e) =>
                        setBroadcastForm({ ...broadcastForm, title: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-semibold text-[#0A1628]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alert Message Body
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={broadcastForm.message}
                      onChange={(e) =>
                        setBroadcastForm({ ...broadcastForm, message: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-[#0A1628]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Broadcast Live Toast & Bell Notification</span>
                  </button>
                </form>
              </div>

              {/* Right 6 Cols: Recent Platform Notifications & Events */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                      Live Event Stream
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                      Recent Platform Activity ({notifications.length})
                    </h3>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[#0A1628]">{n.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {n.createdAt}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 2: HOMEPAGE VISUAL CMS & SECTION CONTROLLER
           =================================================================== */}
        {activeTab === 'homepage' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Homepage Visual CMS Plugin
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-0.5">
                    Customize Homepage Hero, Sections & Global Settings
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Every change saved here updates the live Homepage immediately.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/"
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1628] text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Homepage</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => adminUpdateHomepageConfig(cmsForm)}
                    className="px-5 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4 text-emerald-300" />
                    <span>Save Homepage Changes</span>
                  </button>
                </div>
              </div>

              {/* Part 1: Homepage Section Visibility Toggles */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#0A1628]">
                  1. Homepage Section Visibility Controller
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    {
                      key: 'showSection01Catalog',
                      label: 'Section 01: Plans Catalog',
                      sub: 'Search & House Cards',
                    },
                    {
                      key: 'showSection02Specialists',
                      label: 'Section 02: 8 Specialists',
                      sub: 'Engineering Team & Specs',
                    },
                    {
                      key: 'showSection03Estimator',
                      label: 'Section 03: Cost Calculator',
                      sub: '5-Stage Budget Estimator',
                    },
                    {
                      key: 'showSection04MaterialsAndProjects',
                      label: 'Section 04: Materials & Sites',
                      sub: 'Market Prices & Projects',
                    },
                    {
                      key: 'showSection05WorkflowAndReviews',
                      label: 'Section 05: Workflow & Reviews',
                      sub: '7 Stages & Testimonials',
                    },
                  ].map((sec) => {
                    const isShown = cmsForm[sec.key] !== false;
                    return (
                      <button
                        key={sec.key}
                        type="button"
                        onClick={() => {
                          const updated = { ...cmsForm, [sec.key]: !isShown };
                          setCmsForm(updated);
                          adminUpdateHomepageConfig(updated);
                        }}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                          isShown
                            ? 'bg-emerald-50/70 border-[#0D3B2E] text-[#0A1628]'
                            : 'bg-slate-100 border-slate-300 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              isShown
                                ? 'bg-[#0D3B2E] text-white'
                                : 'bg-slate-300 text-slate-700'
                            }`}
                          >
                            {isShown ? 'VISIBLE' : 'HIDDEN'}
                          </span>
                          <Power
                            className={`w-4 h-4 ${
                              isShown ? 'text-[#0D3B2E]' : 'text-slate-400'
                            }`}
                          />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{sec.label}</span>
                          <span className="text-[11px] text-slate-500 block">
                            {sec.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Part 2: Hero Banner & Top Announcement Editor */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-200">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#0A1628]">
                    2. Hero Banner & Top Announcement Bar
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Top Announcement Banner (Leave empty to hide)
                    </label>
                    <input
                      type="text"
                      value={cmsForm.announcementBanner || ''}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, announcementBanner: e.target.value })
                      }
                      placeholder="e.g. Special Q4 Offer: Free Geotechnical Soil Check with Every Full Turnkey Build Contract!"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs text-[#0A1628]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Banner Image URL
                    </label>
                    <input
                      type="text"
                      value={cmsForm.heroImage || ''}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, heroImage: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-mono text-[#0A1628]"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {HERO_PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() =>
                            setCmsForm({ ...cmsForm, heroImage: preset.url })
                          }
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#0D3B2E] hover:text-white text-[11px] font-semibold text-slate-700 transition cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-[#0A1628] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(cmsForm.showHeroOverlayText)}
                        onChange={(e) =>
                          setCmsForm({
                            ...cmsForm,
                            showHeroOverlayText: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-[#0D3B2E]"
                      />
                      <span>
                        Show Hero Slogan / Headline Overlay Card on Hero Image
                      </span>
                    </label>

                    {cmsForm.showHeroOverlayText && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Hero Badge Text
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroBadge || ''}
                            onChange={(e) =>
                              setCmsForm({ ...cmsForm, heroBadge: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Hero Main Headline
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroHeadline || ''}
                            onChange={(e) =>
                              setCmsForm({ ...cmsForm, heroHeadline: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Hero Subtitle
                          </label>
                          <textarea
                            rows={2}
                            value={cmsForm.heroSubtitle || ''}
                            onChange={(e) =>
                              setCmsForm({ ...cmsForm, heroSubtitle: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Hero Preview Box */}
                <div className="lg:col-span-5 space-y-2">
                  <span className="text-xs font-mono uppercase font-bold text-slate-500 block">
                    Live Hero Image Preview
                  </span>
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-[#0A1628] border border-slate-300">
                    <img
                      src={cmsForm.heroImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                    {cmsForm.showHeroOverlayText && (
                      <div className="absolute bottom-3 left-3 right-3 bg-[#0A1628]/85 backdrop-blur-xs p-3.5 rounded-xl text-white">
                        <span className="text-[9px] font-mono uppercase text-emerald-300 block">
                          {cmsForm.heroBadge}
                        </span>
                        <h4 className="font-serif text-sm font-bold mt-0.5">
                          {cmsForm.heroHeadline}
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Part 3: Section Headlines Editor */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#0A1628]">
                  3. Homepage Section Headlines & Copy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Section 01 Headline (Houses Catalog)
                    </label>
                    <input
                      type="text"
                      value={cmsForm.section01Title || ''}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, section01Title: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Section 02 Headline (8 Specialists Directory)
                    </label>
                    <input
                      type="text"
                      value={cmsForm.section02Title || ''}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, section02Title: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Section 03 Headline (Building Cost Estimator)
                    </label>
                    <input
                      type="text"
                      value={cmsForm.section03Title || ''}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, section03Title: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Section 04 Headline (Material Price Guide)
                    </label>
                    <input
                      type="text"
                      value={cmsForm.section04Title || ''}
                      onChange={(e) =>
                        setCmsForm({ ...cmsForm, section04Title: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => adminUpdateHomepageConfig(cmsForm)}
                    className="px-6 py-3 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-emerald-300" />
                    <span>Save & Publish to Homepage</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Global Company Contact Information Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                4. Global Company Contact & Office Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Phone Number
                  </label>
                  <input
                    type="text"
                    value={companyForm.phone || ''}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, phone: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={companyForm.email || ''}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Headquarters Address
                  </label>
                  <input
                    type="text"
                    value={companyForm.headquarters || ''}
                    onChange={(e) =>
                      setCompanyForm({
                        ...companyForm,
                        headquarters: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => adminUpdateCompanyInfo(companyForm)}
                  className="px-5 py-2.5 rounded-xl bg-[#0A1628] hover:bg-[#0D3B2E] text-white text-xs font-bold cursor-pointer"
                >
                  Save Company Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 3: HOUSES & STRUCTURAL PLANS CATALOG MANAGER (FULL CRUD)
           =================================================================== */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Homepage Section 01 & /properties Catalog Manager
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-0.5">
                    Houses & Structural Building Plans ({properties.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Add new house designs, edit Naira prices (Carcass, Turnkey, Luxury), or update cement/block/rebar counts.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowNewPropForm((prev) => !prev)}
                  className="px-5 py-3 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-300" />
                  <span>{showNewPropForm ? 'Close Form' : '+ Add New House Plan'}</span>
                </button>
              </div>

              {/* Add New House Plan Form */}
              {showNewPropForm && (
                <form
                  onSubmit={handleCreatePropertySubmit}
                  className="bg-slate-50 rounded-2xl border-2 border-[#0D3B2E] p-6 space-y-4"
                >
                  <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                    Publish New House Plan to Homepage & Catalog
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Plan Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newPropForm.title}
                        onChange={(e) =>
                          setNewPropForm({ ...newPropForm, title: e.target.value })
                        }
                        placeholder="e.g. The Sovereign 5-Bedroom Contemporary Duplex"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Structural Category *
                      </label>
                      <select
                        value={newPropForm.category}
                        onChange={(e) =>
                          setNewPropForm({ ...newPropForm, category: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold"
                      >
                        <option value="Duplex & Villa Structures">
                          Duplex & Villa Structures
                        </option>
                        <option value="Bungalow & Family Structures">
                          Bungalow & Family Structures
                        </option>
                        <option value="Multi-Storey Apartment Blocks">
                          Multi-Storey Apartment Blocks
                        </option>
                        <option value="Commercial & Office Structures">
                          Commercial & Office Structures
                        </option>
                        <option value="Industrial & Steel Structures">
                          Industrial & Steel Structures
                        </option>
                        <option value="Civil Infrastructure & Bridges">
                          Civil Infrastructure & Bridges
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Carcass Price (₦)
                      </label>
                      <input
                        type="number"
                        value={newPropForm.carcassPriceNGN}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            carcassPriceNGN: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Complete Move-In Price (₦) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newPropForm.priceNGN}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            priceNGN: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Luxury Price (₦)
                      </label>
                      <input
                        type="number"
                        value={newPropForm.luxuryPriceNGN}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            luxuryPriceNGN: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={newPropForm.bedrooms}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            bedrooms: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Floor Area (sqm)
                      </label>
                      <input
                        type="number"
                        value={newPropForm.sizeSqm}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            sizeSqm: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Required Plot Size (sqm)
                      </label>
                      <input
                        type="number"
                        value={newPropForm.landSizeSqm}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            landSizeSqm: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        50kg Cement Bags
                      </label>
                      <input
                        type="text"
                        value={newPropForm.cementBags}
                        onChange={(e) =>
                          setNewPropForm({ ...newPropForm, cementBags: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        9-Inch Blocks
                      </label>
                      <input
                        type="text"
                        value={newPropForm.sandcreteBlocks}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            sandcreteBlocks: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Steel Iron Rods
                      </label>
                      <input
                        type="text"
                        value={newPropForm.steelRebarTonnes}
                        onChange={(e) =>
                          setNewPropForm({
                            ...newPropForm,
                            steelRebarTonnes: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Architectural Render Image URL
                      </label>
                      <input
                        type="text"
                        value={newPropForm.imageUrl}
                        onChange={(e) =>
                          setNewPropForm({ ...newPropForm, imageUrl: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewPropForm(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Publish Plan Now
                    </button>
                  </div>
                </form>
              )}

              {/* Search Filter */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Search catalog plans by title, reference, or category..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              {/* Catalog Plans List with Inline Edit & Delete */}
              <div className="space-y-4">
                {filteredCatalog.map((prop) => {
                  const isEditing = editingPropId === prop.id;
                  return (
                    <div
                      key={prop.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={prop.images?.[0]}
                            alt={prop.title}
                            className="w-20 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-[10px] font-bold">
                                {prop.reference}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#0D3B2E] text-[10px] font-bold">
                                {prop.category}
                              </span>
                            </div>
                            <Link
                              href={`/properties/${prop.id}`}
                              className="font-serif text-lg font-bold text-[#0A1628] hover:text-[#0D3B2E] block mt-0.5"
                            >
                              {prop.title}
                            </Link>
                            <p className="text-xs text-slate-600">
                              Carcass: <strong>{formatPrice(prop.carcassPriceNGN || Math.round(prop.priceNGN * 0.48))}</strong> • Turnkey:{' '}
                              <strong className="text-[#0D3B2E]">{formatPrice(prop.priceNGN)}</strong> • Cement: {prop.boqSummary?.cementBags}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={`/properties/${prop.id}`}
                            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              isEditing
                                ? setEditingPropId(null)
                                : handleStartEditProp(prop)
                            }
                            className="px-3.5 py-2 rounded-xl bg-[#0A1628] text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-emerald-300" />
                            <span>{isEditing ? 'Cancel Edit' : 'Edit Plan & Prices'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => adminDeleteProperty(prop.id)}
                            className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Delete Plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-white p-4 rounded-xl">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                              Plan Title
                            </label>
                            <input
                              type="text"
                              value={editPropForm.title}
                              onChange={(e) =>
                                setEditPropForm({ ...editPropForm, title: e.target.value })
                              }
                              className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                              Carcass Price (₦)
                            </label>
                            <input
                              type="number"
                              value={editPropForm.carcassPriceNGN}
                              onChange={(e) =>
                                setEditPropForm({
                                  ...editPropForm,
                                  carcassPriceNGN: Number(e.target.value),
                                })
                              }
                              className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                              Turnkey Price (₦)
                            </label>
                            <input
                              type="number"
                              value={editPropForm.priceNGN}
                              onChange={(e) =>
                                setEditPropForm({
                                  ...editPropForm,
                                  priceNGN: Number(e.target.value),
                                })
                              }
                              className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                              50kg Cement Bags
                            </label>
                            <input
                              type="text"
                              value={editPropForm.cementBags}
                              onChange={(e) =>
                                setEditPropForm({
                                  ...editPropForm,
                                  cementBags: e.target.value,
                                })
                              }
                              className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-mono"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => handleSaveEditProp(prop.id)}
                              className="w-full py-2 rounded-lg bg-[#0D3B2E] text-white text-xs font-bold cursor-pointer"
                            >
                              Save Changes
                            </button>
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
            MODULE 4: CLIENT VALUATIONS, ENQUIRIES & PAYMENTS CRM
           =================================================================== */}
        {activeTab === 'crm' && (
          <div className="space-y-8">
            {/* 1. Submitted Personal Design Valuations */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Personal House Design Valuation Desk
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0A1628]">
                  Client Personal Design Valuations ({designValuations.length})
                </h2>
              </div>

              <div className="space-y-4">
                {designValuations.map((val) => (
                  <div
                    key={val.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-xs font-bold">
                          {val.reference}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-[#0D3B2E] text-xs font-bold">
                          {val.status}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#0A1628]">
                        {val.designTitle}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {val.buildingType} • {val.stateLocation} • Carcass:{' '}
                        <strong>{formatPrice(val.carcassCostNGN)}</strong> • Move-In:{' '}
                        <strong className="text-[#0D3B2E]">
                          {formatPrice(val.standardTurnkeyNGN)}
                        </strong>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={val.status}
                        onChange={(e) =>
                          adminUpdateValuationStatus(val.id, e.target.value)
                        }
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-[#0A1628]"
                      >
                        <option value="Instant AI & QS Valuation Ready • Assigned to Engineer for Stamp">
                          Instant AI & QS Valuation Ready
                        </option>
                        <option value="Under COREN Structural Engineer Review">
                          Under COREN Structural Review
                        </option>
                        <option value="Approved & COREN Stamped BOQ Ready">
                          Approved & COREN Stamped BOQ Ready
                        </option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Client BOQ Enquiries & Quotes */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Incoming Building Quotes & Soil Test Requests
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0A1628]">
                  Client Enquiries ({enquiries.length})
                </h2>
              </div>

              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#0A1628] text-amber-300 font-mono text-xs font-bold">
                          {enq.propertyReference}
                        </span>
                        <span className="text-xs font-bold text-[#0D3B2E]">
                          {enq.enquiryType}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#0A1628]">
                        {enq.fullName} ({enq.email} • {enq.phone})
                      </h3>
                      <p className="text-xs text-slate-600">
                        Plan: <strong>{enq.propertyTitle}</strong> • Location:{' '}
                        {enq.preferredLocation}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          adminUpdateEnquiryStatus(enq.id, e.target.value)
                        }
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold"
                      >
                        <option value="Material List & Soil Check Scheduled">
                          Material List & Soil Check Scheduled
                        </option>
                        <option value="Engineer Assigned for Site Visit">
                          Engineer Assigned for Site Visit
                        </option>
                        <option value="BOQ & Contract Sent to Client">
                          BOQ & Contract Sent to Client
                        </option>
                        <option value="Completed & Mobilized to Site">
                          Completed & Mobilized to Site
                        </option>
                      </select>

                      <button
                        type="button"
                        onClick={() => adminDeleteEnquiry(enq.id)}
                        className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Payments & Official Receipts Ledger */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Financial Ledger
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0A1628]">
                  Payments & Plan Pack Receipts ({payments.length})
                </h2>
              </div>

              <div className="space-y-3">
                {payments.map((pay) => (
                  <div
                    key={pay.id}
                    className="p-4 rounded-2xl bg-emerald-950/5 border border-[#0D3B2E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#0D3B2E]">
                        {pay.reference} • {pay.payerName} ({pay.payerEmail})
                      </span>
                      <h4 className="text-sm font-bold text-[#0A1628]">
                        {pay.propertyTitle}
                      </h4>
                      <p className="text-xs text-slate-600">{pay.paymentType}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-mono font-extrabold text-[#0D3B2E]">
                        {formatPrice(pay.amountNGN)}
                      </span>
                      <select
                        value={pay.status}
                        onChange={(e) =>
                          adminUpdatePaymentStatus(pay.id, e.target.value)
                        }
                        className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold"
                      >
                        <option value="Confirmed & Drawings Ready in Dashboard">
                          Confirmed & Drawings Ready
                        </option>
                        <option value="COREN Stamped Hardcopies Dispatched">
                          COREN Hardcopies Dispatched
                        </option>
                        <option value="Site Soil Test Team Mobilized">
                          Site Soil Test Team Mobilized
                        </option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 5: 8 BUILDING SPECIALISTS & TEAM MANAGER
           =================================================================== */}
        {activeTab === 'specialists' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Homepage Section 02 & Specialist Directory Manager
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-0.5">
                  Manage All 8 Ekeconstruct Building Specialists
                </h2>
              </div>

              {/* Specialist Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {specialistAgents.map((sp, i) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setSelectedSpecId(sp.id)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                      activeSpec?.id === sp.id
                        ? 'bg-[#0A1628] text-white border-[#0A1628]'
                        : 'bg-slate-50 text-[#0A1628] border-slate-200 hover:bg-white'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-emerald-400 block">
                      0{i + 1} • {sp.shortBadge}
                    </span>
                    <span className="text-xs font-bold block mt-0.5 truncate">
                      {sp.roleTitle}
                    </span>
                    <span className="text-[11px] opacity-80 block truncate">
                      {sp.leadName}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Specialist Editor */}
              {activeSpec && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lead Specialist Name
                      </label>
                      <input
                        type="text"
                        value={activeSpec.leadName}
                        onChange={(e) =>
                          adminUpdateSpecialist(activeSpec.id, {
                            leadName: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Professional License Number
                      </label>
                      <input
                        type="text"
                        value={activeSpec.licenseNo}
                        onChange={(e) =>
                          adminUpdateSpecialist(activeSpec.id, {
                            licenseNo: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Availability Status
                      </label>
                      <input
                        type="text"
                        value={activeSpec.availability}
                        onChange={(e) =>
                          adminUpdateSpecialist(activeSpec.id, {
                            availability: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-[#0D3B2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Plain-English Role Summary (Shown on Homepage Section 02)
                    </label>
                    <textarea
                      rows={2}
                      value={activeSpec.plainSummary}
                      onChange={(e) =>
                        adminUpdateSpecialist(activeSpec.id, {
                          plainSummary: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Active Client Specialist Connections */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                  Active Client Specialist Dispatches ({specialistConnections.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specialistConnections.map((conn) => (
                    <div
                      key={conn.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-[10px] font-bold">
                          {conn.reference} • {conn.roleTitle}
                        </span>
                        <span className="font-mono text-slate-400">
                          {conn.createdAt}
                        </span>
                      </div>
                      <p className="font-bold text-[#0A1628]">{conn.leadName}</p>
                      <p className="text-slate-600">
                        Scope: <strong>{conn.selectedCovering}</strong>
                      </p>
                      <p className="text-slate-600">
                        Site: <strong>{conn.projectLocation}</strong>
                      </p>
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <select
                          value={conn.status}
                          onChange={(e) =>
                            adminUpdateSpecialistConnection(
                              conn.id,
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0D3B2E]"
                        >
                          <option value="COREN Engineer Assigned • Ready for WhatsApp / Site Call">
                            Assigned • Ready for Site Call
                          </option>
                          <option value="Site Inspection & Soil Check In Progress">
                            Site Inspection In Progress
                          </option>
                          <option value="Drawings & Deliverable Completed">
                            Deliverable Completed
                          </option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 6: LIVE NIGERIAN BUILDING MATERIAL PRICE INDEX MANAGER
           =================================================================== */}
        {activeTab === 'materials' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Homepage Section 04 & User Dashboard Market Tracker
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-0.5">
                  Live Nigerian Building Material Price Index ({materialPrices.length})
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Update the Naira rate of any building material below to immediately sync across the Homepage and User Dashboard.
                </p>
              </div>

              {/* Add New Material Row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newMatForm.material.trim()) return;
                  adminAddMaterialPrice(newMatForm);
                  setNewMatForm({ ...newMatForm, code: '', material: '' });
                }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end"
              >
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    New Material Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMatForm.material}
                    onChange={(e) =>
                      setNewMatForm({ ...newMatForm, material: e.target.value })
                    }
                    placeholder="e.g. Lafarge Supaset 50kg Cement"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={newMatForm.unit}
                    onChange={(e) =>
                      setNewMatForm({ ...newMatForm, unit: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Rate in Naira (₦)
                  </label>
                  <input
                    type="number"
                    value={newMatForm.rateNGN}
                    onChange={(e) =>
                      setNewMatForm({
                        ...newMatForm,
                        rateNGN: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold cursor-pointer"
                >
                  + Add Material
                </button>
              </form>

              {/* Material Rates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materialPrices.map((item) => {
                  const isEditingMat = editingMatCode === item.code;
                  return (
                    <div
                      key={item.code}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-[10px] font-bold">
                            {item.code}
                          </span>
                          <span className="text-[11px] text-slate-500 font-semibold">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#0A1628] mt-2">
                          {item.material}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          {item.application}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        {isEditingMat ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={editingMatRate}
                              onChange={(e) =>
                                setEditingMatRate(Number(e.target.value))
                              }
                              className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-mono font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                adminUpdateMaterialPrice(
                                  item.code,
                                  editingMatRate
                                );
                                setEditingMatCode(null);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#0D3B2E] text-white text-xs font-bold cursor-pointer"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                                {item.unit}
                              </span>
                              <span className="text-lg font-mono font-extrabold text-[#0D3B2E]">
                                {formatPrice(item.rateNGN)}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMatCode(item.code);
                                setEditingMatRate(item.rateNGN);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-[#0A1628] hover:bg-slate-100 cursor-pointer"
                            >
                              Edit Rate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 7: CONSTRUCTION SITES & NIGERIAN SOIL ZONES MANAGER
           =================================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Ongoing & Completed Sites */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Homepage Section 04 & /development Portfolio
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0A1628]">
                  Active & Completed Construction Sites ({projects.length})
                </h2>
              </div>

              {/* Add New Site Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newProjForm.name.trim()) return;
                  adminCreateProject(newProjForm);
                  setNewProjForm({ ...newProjForm, name: '' });
                }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
              >
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjForm.name}
                    onChange={(e) =>
                      setNewProjForm({ ...newProjForm, name: e.target.value })
                    }
                    placeholder="e.g. Maitama 6-Bed Luxury Villa Site"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newProjForm.location}
                    onChange={(e) =>
                      setNewProjForm({ ...newProjForm, location: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Contract Value (₦)
                  </label>
                  <input
                    type="number"
                    value={newProjForm.startingPriceNGN}
                    onChange={(e) =>
                      setNewProjForm({
                        ...newProjForm,
                        startingPriceNGN: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold cursor-pointer"
                >
                  + Add Site Project
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#0D3B2E]">
                          {proj.location}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#0A1628]">
                          {proj.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => adminDeleteProject(proj.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Site Progress: {proj.completionStatus}</span>
                        <span className="font-mono text-[#0D3B2E]">
                          {proj.progressPercent}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        step={5}
                        value={proj.progressPercent}
                        onChange={(e) =>
                          adminUpdateProject(proj.id, {
                            progressPercent: Number(e.target.value),
                          })
                        }
                        className="w-full accent-[#0D3B2E] cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nigerian States & Soil Zones Manager */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                  Geotechnical Soil & Foundation Guide (/locations)
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#0A1628]">
                  Nigerian States & Soil Zones ({locations.length})
                </h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newLocForm.neighbourhood.trim()) return;
                  addDynamicLocation(newLocForm);
                  setNewLocForm({ ...newLocForm, neighbourhood: '' });
                }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
              >
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    State / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocForm.city}
                    onChange={(e) =>
                      setNewLocForm({ ...newLocForm, city: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    District / Area Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocForm.neighbourhood}
                    onChange={(e) =>
                      setNewLocForm({
                        ...newLocForm,
                        neighbourhood: e.target.value,
                      })
                    }
                    placeholder="e.g. Epe / Ibeju-Lekki Corridor"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Recommended Foundation
                  </label>
                  <input
                    type="text"
                    value={newLocForm.recommendedFoundation}
                    onChange={(e) =>
                      setNewLocForm({
                        ...newLocForm,
                        recommendedFoundation: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#0A1628] text-white text-xs font-bold cursor-pointer"
                >
                  + Add Soil Zone
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#0D3B2E]">
                          {loc.city}
                        </span>
                        <button
                          type="button"
                          onClick={() => adminDeleteLocation(loc.id)}
                          className="text-slate-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-sm text-[#0A1628] mt-0.5">
                        {loc.neighbourhood}
                      </h4>
                      <p className="text-slate-600 mt-1">
                        Foundation: <strong>{loc.recommendedFoundation}</strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            MODULE 8: PLUGINS & SYSTEM EXTENSIONS HUB
           =================================================================== */}
        {activeTab === 'plugins' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold block">
                    Ekeconstruct Platform Architecture & Extensions
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-0.5">
                    Installed Admin Plugins & Feature Modules ({adminPlugins.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Manage active engineering calculators, AI valuation engines, multi-currency FX, and CMS extensions.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={adminResetFactoryDefaults}
                  className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Platform Data to Factory Defaults</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {adminPlugins.map((pl) => (
                  <div
                    key={pl.id}
                    className={`p-5 rounded-2xl border transition flex flex-col justify-between gap-4 ${
                      pl.enabled
                        ? 'bg-slate-50/90 border-slate-200'
                        : 'bg-slate-100/60 border-slate-200 opacity-75'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-[10px] font-bold">
                          {pl.category} • {pl.version}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            pl.enabled
                              ? 'bg-emerald-100 text-[#0D3B2E]'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {pl.enabled ? 'ACTIVE' : 'PAUSED'}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#0A1628]">
                        {pl.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pl.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500">
                        {pl.statusLabel}
                      </span>
                      <button
                        type="button"
                        onClick={() => adminTogglePlugin(pl.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          pl.enabled
                            ? 'bg-[#0D3B2E] text-white hover:bg-[#0A1628]'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pl.enabled ? 'Enabled' : 'Enable Plugin'}
                      </button>
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
