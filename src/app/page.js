'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Building2,
  Compass,
  Calculator,
  CheckCircle2,
  ArrowRight,
  HardHat,
  Layers,
  Sparkles,
  TrendingUp,
  UserCheck,
  ShieldCheck,
  Wrench,
  Droplets,
  Zap,
  MapPin,
  FileSpreadsheet,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import PropertyCard from '../components/PropertyCard';
import {
  INITIAL_PROJECTS,
  TESTIMONIALS,
  LIVE_MATERIAL_PRICE_INDEX,
  BUYING_PROCESS_STEPS,
} from '../data/seedData';

const HERO_IMAGE_NUMBER_6 =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90';

const SECTION_02_IMAGE_NUMBER_2 =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=90';

const SPECIALIST_ICON_MAP = {
  'spec-civil-engineer': HardHat,
  'spec-architect': Compass,
  'spec-land-surveyor': MapPin,
  'spec-geotechnical': Layers,
  'spec-quantity-surveyor': FileSpreadsheet,
  'spec-building-contractor': Building2,
  'spec-electrical-engineer': Zap,
  'spec-plumbing-professional': Droplets,
};

export default function HomePage() {
  const {
    properties = [],
    projects = INITIAL_PROJECTS,
    materialPrices = LIVE_MATERIAL_PRICE_INDEX,
    homepageConfig = {},
    formatPrice,
    openEnquiryModal,
    openPaymentModal,
    specialistAgents = [],
    specialistConnections = [],
    openSpecialistModal,
  } = usePlatform();

  // Section 01: Clean House Plan Filter State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [budgetTier, setBudgetTier] = useState('ALL');
  const [minBeds, setMinBeds] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Section 02: Selected Specialist for inline Main Covering & Specification preview
  const [activeSpecialistId, setActiveSpecialistId] = useState(
    'spec-civil-engineer'
  );

  // Section 03: Interactive Building Cost Calculator State
  const [calcPropId, setCalcPropId] = useState('struct-1');
  const [finishGrade, setFinishGrade] = useState('STANDARD'); // 'CARCASS' | 'STANDARD' | 'LUXURY'
  const [contingencyPct, setContingencyPct] = useState(8);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(properties.map((p) => p.category).filter(Boolean))
    );
    return ['All', ...unique];
  }, [properties]);

  const categoryCounts = useMemo(() => {
    const counts = { All: properties.length };
    properties.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [properties]);

  const activeSpecialist = useMemo(() => {
    if (!specialistAgents || specialistAgents.length === 0) return null;
    return (
      specialistAgents.find((agent) => agent.id === activeSpecialistId) ||
      specialistAgents[0]
    );
  }, [specialistAgents, activeSpecialistId]);

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (selectedCategory !== 'All' && prop.category !== selectedCategory) {
        return false;
      }
      const price = Number(prop.priceNGN) || 0;
      if (budgetTier === 'UNDER_75M' && price >= 75000000) return false;
      if (
        budgetTier === '75M_TO_180M' &&
        (price < 75000000 || price > 180000000)
      )
        return false;
      if (budgetTier === 'OVER_180M' && price <= 180000000) return false;
      if (minBeds > 0 && (Number(prop.bedrooms) || 0) < minBeds) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = (prop.title || '').toLowerCase().includes(q);
        const matchSub = (prop.subCategory || '').toLowerCase().includes(q);
        const matchCat = (prop.category || '').toLowerCase().includes(q);
        const matchCode = (prop.reference || '').toLowerCase().includes(q);
        if (!matchTitle && !matchSub && !matchCat && !matchCode) return false;
      }
      return true;
    });
  }, [properties, selectedCategory, budgetTier, minBeds, searchTerm]);

  // Interactive Cost Calculator Computation
  const calcProperty = useMemo(() => {
    return properties.find((p) => p.id === calcPropId) || properties[0];
  }, [properties, calcPropId]);

  const finishMultipliers = {
    CARCASS: {
      label: 'Carcass Only (Foundation, Blockwork, Decking & Roof)',
      multiplier: 0.48,
      desc: 'Complete structural skeleton and roof. You can finish plastering, wiring, tiles, and painting later as funds come in.',
    },
    STANDARD: {
      label: 'Full Move-In Standard Finish (Turnkey)',
      multiplier: 1.0,
      desc: 'Complete ready-to-live house: POP ceiling, vitrified floor/wall tiles, casement windows, pure copper wiring, plumbing, and painting.',
    },
    LUXURY: {
      label: 'Executive Luxury Finish',
      multiplier: 1.32,
      desc: 'Upgraded armored security doors, double-glazed windows, premium sanitary wares, smart lighting, and stone facade cladding.',
    },
  };

  const calculatedTotal = useMemo(() => {
    if (!calcProperty) return 0;
    const basePrice =
      finishGrade === 'CARCASS'
        ? calcProperty.carcassPriceNGN ||
          Math.round(calcProperty.priceNGN * 0.48)
        : finishGrade === 'LUXURY'
        ? calcProperty.luxuryPriceNGN ||
          Math.round(calcProperty.priceNGN * 1.32)
        : calcProperty.standardPriceNGN || calcProperty.priceNGN;

    const withContingency = basePrice * (1 + contingencyPct / 100);
    return Math.round(withContingency);
  }, [calcProperty, finishGrade, contingencyPct]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    budgetTier !== 'ALL' ||
    minBeds > 0 ||
    Boolean(searchTerm.trim());

  const heroImageSrc = homepageConfig.heroImage || HERO_IMAGE_NUMBER_6;
  const section02ImageSrc =
    homepageConfig.section02Image || SECTION_02_IMAGE_NUMBER_2;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628]">
      {/* Optional Admin Announcement Banner */}
      {homepageConfig.announcementBanner && (
        <div className="bg-[#0D3B2E] text-white px-4 py-2.5 text-center text-xs font-semibold border-b border-emerald-400/30">
          {homepageConfig.announcementBanner}
        </div>
      )}

      {/* =====================================================================
          HERO BANNER — "Engineering at it's finest."
      ===================================================================== */}
      <section className="relative w-full h-[68vh] min-h-[440px] max-h-[760px] bg-[#0A1628] overflow-hidden border-b border-slate-200 flex items-center justify-center">
        <img
          src={heroImageSrc}
          alt="Ekeconstruct Nigeria Structural Engineering Landmark"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/70 via-[#0A1628]/35 to-[#0A1628]/25 pointer-events-none" />

        {homepageConfig.showHeroOverlayText !== false && (
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {homepageConfig.heroBadge && (
              <span className="inline-block mb-3 px-3.5 py-1 rounded-full bg-[#0D3B2E]/90 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                {homepageConfig.heroBadge}
              </span>
            )}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              {homepageConfig.heroHeadline || "Engineering at it's finest."}
            </h1>
            {homepageConfig.heroSubtitle && (
              <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
                {homepageConfig.heroSubtitle}
              </p>
            )}
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 01 • VERIFIED NIGERIAN HOUSE PLANS & MATERIAL CATALOG
          (All Search Filters & All Categories 100% Visible — No Horizontal Slide)
      ===================================================================== */}
      {homepageConfig.showSection01Catalog !== false && (
        <section
          id="catalog"
          className="py-16 lg:py-20 border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Clean Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B2E]/10 text-[#0D3B2E] text-xs font-bold uppercase tracking-wider mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  Section 01 • Ready-to-Build Designs & Material Counts
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight">
                  {homepageConfig.section01Title ||
                    'Explore Ekeconstruct Nigeria Building Plans'}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                  {homepageConfig.section01Subtitle ||
                    'Every house plan includes full architectural drawings, COREN structural calculations, and honest counts for 50kg cement bags, blocks, and iron rods.'}
                </p>
              </div>

              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A1628] text-white text-xs font-bold hover:bg-[#0D3B2E] transition-colors self-start lg:self-auto shadow-sm"
              >
                View Full Structural Catalog ({properties.length} Plans){' '}
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </div>

            {/* Sleek Command Console — All Filters & All Categories 100% Visible Without Sliding */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-md mb-10">
              {/* Row 1: Search Input + Budget Tier + Minimum Bedrooms */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Search Input */}
                <div className="md:col-span-5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                    Search House Style, Bedrooms or Plan Code
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by house style, bedrooms, or code (e.g. EKC-STR-002)..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50/70 text-xs sm:text-sm font-medium text-[#0A1628] placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0D3B2E] focus:ring-2 focus:ring-[#0D3B2E]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Budget Filter */}
                <div className="md:col-span-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                    Building Budget Range (₦)
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50/70 text-xs sm:text-sm font-semibold text-[#0A1628] focus:outline-none focus:bg-white focus:border-[#0D3B2E] cursor-pointer transition-all"
                  >
                    <option value="ALL">All Building Budgets (₦)</option>
                    <option value="UNDER_75M">Under ₦75 Million</option>
                    <option value="75M_TO_180M">₦75M – ₦180 Million</option>
                    <option value="OVER_180M">Above ₦180 Million</option>
                  </select>
                </div>

                {/* Minimum Bedrooms */}
                <div className="md:col-span-3">
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 mb-1.5">
                    Bedroom Capacity
                  </label>
                  <select
                    value={minBeds}
                    onChange={(e) => setMinBeds(Number(e.target.value))}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50/70 text-xs sm:text-sm font-semibold text-[#0A1628] focus:outline-none focus:bg-white focus:border-[#0D3B2E] cursor-pointer transition-all"
                  >
                    <option value={0}>Any Number of Bedrooms</option>
                    <option value={3}>3+ Bedrooms</option>
                    <option value={4}>4+ Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                    <option value={6}>6+ Bedrooms / Flats</option>
                  </select>
                </div>
              </div>

              {/* Row 2: All Structural Categories Fully Visible (Wrapped Grid — Zero Horizontal Slide) */}
              <div className="pt-5 mt-5 border-t border-slate-200/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 inline-flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#0D3B2E]" />
                    Select Building & Structural Category (All Categories Visible):
                  </span>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('All');
                        setBudgetTier('ALL');
                        setMinBeds(0);
                        setSearchTerm('');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0D3B2E] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
                  {categories.map((cat) => {
                    const active = selectedCategory === cat;
                    const count = categoryCounts[cat] ?? 0;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between gap-2 border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-sm ring-2 ring-[#0D3B2E]/25'
                            : 'bg-slate-50/90 text-slate-700 border-slate-200/90 hover:bg-emerald-50/60 hover:border-[#0D3B2E]/50 hover:text-[#0A1628]'
                        }`}
                      >
                        <span className="leading-snug">{cat}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                            active
                              ? 'bg-emerald-400 text-[#0A1628]'
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Property Grid */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
                <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-[#0A1628] mb-1">
                  No Matching Building Plans Found
                </h3>
                <p className="text-sm text-slate-500 mb-5">
                  Try clearing your filters or submit your own custom sketch in
                  the User Dashboard for a free valuation.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setBudgetTier('ALL');
                    setMinBeds(0);
                    setSearchTerm('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold hover:bg-[#0A1628] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 02 • CERTIFIED NIGERIAN BUILDING & ENGINEERING TEAM
          (Uses Photo #2 + Interactive Main Covering & Technical Specifications)
      ===================================================================== */}
      {homepageConfig.showSection02Specialists !== false && (
        <section
          id="specialists-directory"
          className="py-16 lg:py-20 bg-white border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Featured Banner with Photo #2 */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-[#0A1628] text-white shadow-xl mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Content Column */}
                <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B2E] border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Section 02 • Certified Nigerian Building & Engineering Team
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-4">
                      {homepageConfig.section02Title ||
                        'Connect With All 8 Ekeconstruct Building Specialists'}
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {homepageConfig.section02Subtitle ||
                        'Avoid site mistakes, collapsed foundations, or inflated material quotes. Click any of our 8 certified Nigerian specialists below to inspect their Main Covering, Technical Specifications, and connect directly for your project.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <p className="text-xs text-slate-400">
                        Professional Bodies
                      </p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        COREN • ARCON • NIQS
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <p className="text-xs text-slate-400">In-House Units</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        8 Verified Disciplines
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <p className="text-xs text-slate-400">Your Connections</p>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5">
                        {specialistConnections.length} Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Image #2 Column */}
                <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] bg-slate-950">
                  <img
                    src={section02ImageSrc}
                    alt="Civil and Structural Engineers Inspecting Site Blueprints and Steel Formwork"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0A1628]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                        EKECONSTRUCT NIGERIA • SITE & BLUEPRINT VERIFICATION
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#0D3B2E] text-emerald-300 text-[10px] font-bold">
                        COREN / ARCON / SURCON / NIQS
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Direct supervision from soil test and foundation setting-out
                      to final MEP testing and handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8 Specialist Selector Cards (Clean 4x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {specialistAgents.map((agent, index) => {
                const IconComponent = SPECIALIST_ICON_MAP[agent.id] || HardHat;
                const isSelected = activeSpecialist?.id === agent.id;
                const isConnected = specialistConnections.some(
                  (c) => c.specialistId === agent.id
                );

                return (
                  <div
                    key={agent.id}
                    onClick={() => setActiveSpecialistId(agent.id)}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0D3B2E] bg-emerald-50/40 shadow-md ring-2 ring-[#0D3B2E]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#0D3B2E] text-white'
                              : 'bg-slate-100 text-[#0A1628]'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          0{index + 1} • {agent.shortBadge}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[#0A1628] leading-snug mb-1">
                        {agent.roleTitle}
                      </h3>
                      <p className="text-xs font-semibold text-[#0D3B2E] mb-2">
                        {agent.leadName}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {agent.plainSummary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-500">
                        {isConnected ? (
                          <span className="text-emerald-700 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                          </span>
                        ) : (
                          `${agent.mainCovering?.length || 6} Main Coverings`
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openSpecialistModal(agent);
                        }}
                        className="text-xs font-bold text-[#0D3B2E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        Connect <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Specialist Main Covering & Technical Specification Panel */}
            {activeSpecialist && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#0A1628] text-white text-xs font-bold">
                        {activeSpecialist.shortBadge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        {activeSpecialist.availability}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {activeSpecialist.licenseNo}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#0A1628]">
                      {activeSpecialist.roleTitle} — {activeSpecialist.leadName}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                      {activeSpecialist.plainSummary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => openSpecialistModal(activeSpecialist)}
                      className="px-5 py-3 rounded-xl bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-300" />
                      Connect With {activeSpecialist.roleTitle}
                    </button>
                    <Link
                      href="/dashboard?tab=specialists"
                      className="px-4 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#0A1628] text-[#0A1628] text-xs sm:text-sm font-bold transition-colors"
                    >
                      Open in Dashboard
                    </Link>
                  </div>
                </div>

                {/* 2-Column Main Covering & Technical Specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Column 1: Main Covering (6 Scope Items) */}
                  <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-serif text-base font-bold text-[#0A1628] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0D3B2E]" />
                        Main Covering & Site Responsibilities
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">
                        Click any scope below to connect
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSpecialist.mainCovering?.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => openSpecialistModal(activeSpecialist)}
                          className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:border-[#0D3B2E] hover:bg-white cursor-pointer transition-all group"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#0D3B2E]/15 text-[#0D3B2E] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0D3B2E] group-hover:text-white transition-colors">
                              {idx + 1}
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">
                              {item}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Technical Specifications */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#0A1628] flex items-center gap-2 mb-4">
                        <Wrench className="w-4 h-4 text-[#0D3B2E]" />
                        Technical Specifications & Standards
                      </h4>

                      <div className="space-y-3">
                        {activeSpecialist.technicalSpecifications?.map(
                          (spec, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-slate-50 border border-slate-200/70"
                            >
                              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                                {spec.label}
                              </p>
                              <p className="text-xs sm:text-sm font-bold text-[#0A1628] mt-0.5">
                                {spec.value}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block">
                          Stage Needed:
                        </span>
                        <span className="font-bold text-[#0A1628]">
                          {activeSpecialist.stageNeeded}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-bold shrink-0">
                        {activeSpecialist.experienceYears}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 03 • INTERACTIVE HOUSE BUILDING COST & STAGE CALCULATOR
      ===================================================================== */}
      {homepageConfig.showSection03Estimator !== false && (
        <section
          id="estimator"
          className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B2E]/10 text-[#0D3B2E] text-xs font-bold uppercase tracking-wider mb-3">
                <Calculator className="w-3.5 h-3.5" />
                Section 03 • Transparent Naira Building Cost Estimator
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight">
                {homepageConfig.section03Title ||
                  'Calculate Your Building Budget & 5-Stage Payment Plan'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Compare how much it costs to build to{' '}
                <strong className="text-[#0A1628]">
                  Carcass (Roofed Shell)
                </strong>{' '}
                versus{' '}
                <strong className="text-[#0A1628]">Full Move-In Finish</strong>,
                including exact cement bags, blocks, and iron rods.
              </p>
            </div>

            {calcProperty && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Controls Card */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
                  {/* Step 1: Select Building Plan */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      1. Choose a House Design to Estimate
                    </label>
                    <select
                      value={calcPropId}
                      onChange={(e) => setCalcPropId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-bold text-[#0A1628] focus:outline-none focus:border-[#0D3B2E]"
                    >
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({formatPrice(p.priceNGN)} Turnkey)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Choose Finishing Level */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      2. Select Your Target Completion Level
                    </label>
                    <div className="space-y-2.5">
                      {Object.entries(finishMultipliers).map(([key, info]) => {
                        const active = finishGrade === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setFinishGrade(key)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                              active
                                ? 'border-[#0D3B2E] bg-emerald-50/50 ring-1 ring-[#0D3B2E]'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-bold text-[#0A1628]">
                                {info.label}
                              </span>
                              <span className="text-xs font-mono font-bold text-[#0D3B2E]">
                                {Math.round(info.multiplier * 100)}%
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              {info.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Market Price Buffer */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        3. Material Inflation Contingency Buffer
                      </label>
                      <span className="text-xs font-mono font-bold text-[#0D3B2E]">
                        +{contingencyPct}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={2}
                      value={contingencyPct}
                      onChange={(e) => setContingencyPct(Number(e.target.value))}
                      className="w-full accent-[#0D3B2E]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>0% (Fixed Contract)</span>
                      <span>8% Recommended</span>
                      <span>20% High Buffer</span>
                    </div>
                  </div>
                </div>

                {/* Right Breakdown Output Card */}
                <div className="lg:col-span-7 bg-[#0A1628] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                        ESTIMATED TOTAL BUILDING BUDGET
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                        {formatPrice(calculatedTotal)}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        For{' '}
                        <strong className="text-white">
                          {calcProperty.title}
                        </strong>{' '}
                        • {finishMultipliers[finishGrade].label}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openPaymentModal(calcProperty)}
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Get Stamped Plan & BOQ
                      </button>
                      <button
                        type="button"
                        onClick={() => openEnquiryModal(calcProperty)}
                        className="px-4 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Discuss This Budget
                      </button>
                    </div>
                  </div>

                  {/* Key Material Quantities Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                    <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                      <p className="text-[11px] text-slate-400">Cement (50kg)</p>
                      <p className="font-mono text-sm sm:text-base font-bold text-white mt-0.5">
                        {calcProperty.boqSummary?.cementBags || '2,100 Bags'}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                      <p className="text-[11px] text-slate-400">
                        Sandcrete Blocks
                      </p>
                      <p className="font-mono text-sm sm:text-base font-bold text-white mt-0.5">
                        {calcProperty.boqSummary?.sandcreteBlocks ||
                          '14,200 Units'}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                      <p className="text-[11px] text-slate-400">
                        Iron Rods (Steel)
                      </p>
                      <p className="font-mono text-sm sm:text-base font-bold text-white mt-0.5">
                        {calcProperty.boqSummary?.steelRebarTonnes || '24 Tonnes'}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                      <p className="text-[11px] text-slate-400">
                        Granite Aggregate
                      </p>
                      <p className="font-mono text-sm sm:text-base font-bold text-white mt-0.5">
                        {calcProperty.boqSummary?.graniteTonnes || '310 Tonnes'}
                      </p>
                    </div>
                  </div>

                  {/* 5-Stage Payment Schedule */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                      PAY-STAGE-BY-STAGE SCHEDULE (NEVER PAY 100% UPFRONT)
                    </h4>
                    <div className="space-y-2.5">
                      {calcProperty.costBreakdown?.map((m, idx) => {
                        const stageAmount = Math.round(
                          (calculatedTotal * m.percent) / 100
                        );
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-6 h-6 rounded-lg bg-[#0D3B2E] text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-bold text-white truncate">
                                  {m.stage}
                                </p>
                                <p className="text-[11px] text-slate-400 truncate">
                                  {m.details}
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-mono text-xs sm:text-sm font-bold text-emerald-400">
                                {formatPrice(stageAmount)}
                              </p>
                              <p className="text-[10px] font-mono text-slate-400">
                                {m.percent}% of budget
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 04 • LIVE NIGERIAN MATERIAL MARKET RATES & ONGOING SITES
      ===================================================================== */}
      {homepageConfig.showSection04MaterialsAndProjects !== false && (
        <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Part A: Compact Live Material Market Benchmark Strip */}
            <div className="mb-14">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Section 04 • Current Nigerian Building Material Rates
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628]">
                    {homepageConfig.section04Title ||
                      'Today’s Verified Market Price Guide'}
                  </h2>
                </div>
                <Link
                  href="/dashboard?tab=valuation"
                  className="text-xs font-bold text-[#0D3B2E] hover:underline inline-flex items-center gap-1"
                >
                  Value Your Personal Design With Current Rates{' '}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {materialPrices.slice(0, 6).map((item) => (
                  <div
                    key={item.code}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">
                          {item.category}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#0D3B2E] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          {formatPrice(item.rateNGN)} / {item.unit}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#0A1628]">
                        {item.material}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.application}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part B: Ongoing & Completed Nigerian Construction Projects */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628]">
                    Active & Completed Ekeconstruct Nigeria Sites
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Real structural works supervised by our COREN and ARCON field
                    teams across Nigeria.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.slice(0, 4).map((proj) => (
                  <div
                    key={proj.id}
                    className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative h-60 bg-[#0A1628] overflow-hidden">
                      <img
                        src={proj.images?.[0]}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#0A1628]/85 text-white text-[11px] font-bold">
                          {proj.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#0D3B2E] text-white text-[11px] font-bold">
                          {proj.progressPercent}% Complete
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="text-xs font-mono text-emerald-300">
                          {proj.location} • {proj.completionStatus}
                        </p>
                        <h4 className="font-serif text-lg font-bold leading-snug">
                          {proj.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {proj.structuralHighlight}
                      </p>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          Contract Value:{' '}
                          <strong className="text-[#0A1628]">
                            {formatPrice(proj.startingPriceNGN)}
                          </strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => openEnquiryModal(properties[0])}
                          className="font-bold text-[#0D3B2E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          Request Site Visit <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 05 • HOW WE BUILD IN 7 VERIFIED STAGES & CLIENT REVIEWS
      ===================================================================== */}
      {homepageConfig.showSection05WorkflowAndReviews !== false && (
        <section className="py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 7-Stage Construction Workflow */}
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D3B2E]/10 text-[#0D3B2E] text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5" />
                Section 05 • Step-by-Step Construction Process
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0A1628] mb-2">
                {homepageConfig.section05Title ||
                  'How Ekeconstruct Nigeria Builds Your House From Soil Test to Key Handover'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mb-8">
                Whether you live in Nigeria or in the Diaspora (UK, USA, Canada,
                Europe), every stage is inspected, photographed, and signed off
                before you fund the next milestone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BUYING_PROCESS_STEPS.slice(0, 4).map((stage) => (
                  <div
                    key={stage.step}
                    className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-xl bg-[#0A1628] text-white font-mono text-xs font-bold flex items-center justify-center">
                          {stage.step}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#0D3B2E]">
                          {stage.stage}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#0A1628] mb-1.5">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {stage.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-800">
                      ✓ {stage.deliverable}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Reviews + Dashboard Call-to-Action */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.slice(0, 2).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                        {item.tag}
                      </span>
                      <span className="text-amber-500 text-xs font-bold">
                        ★★★★★
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                      “{item.quote}”
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-sm font-bold text-[#0A1628]">
                      {item.author}
                    </p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              ))}

              {/* Clean Final CTA Card to User & Admin Dashboards */}
              <div className="bg-[#0A1628] text-white rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Ekeconstruct Nigeria
                    Workspace
                  </span>
                  <h3 className="font-serif text-xl font-bold mb-2">
                    Ready to Plan or Value Your Building Project?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    Open your personal User Dashboard to save houses, upload your
                    architect’s drawing for Naira valuation, or access the Admin
                    Dashboard for full platform management.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    User Dashboard <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/admin"
                    className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
