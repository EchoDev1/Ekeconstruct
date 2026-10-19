'use client';

import React, { useState, use, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  Share2,
  Check,
  Bookmark,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  HardHat,
  FileSpreadsheet,
  Compass,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import PropertyCard from '@/components/PropertyCard';
import {
  CURRENCIES,
  formatCurrency,
  buildWhatsAppLink,
  getStructureEngineeringDossier,
} from '@/data/seedData';

export default function StructureDetailPage({ params }) {
  const resolvedParams = use(params);
  const {
    properties,
    formatPrice,
    savedIds,
    toggleSavedProperty,
    openEnquiryModal,
    openPaymentModal,
  } = usePlatform();

  const property =
    properties.find(
      (p) => p.id === resolvedParams.id || p.reference === resolvedParams.id
    ) || properties[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Interactive Finish Tier & Soil Condition Configurator on Detail Page
  const [costTier, setCostTier] = useState('turnkey'); // 'carcass' | 'turnkey' | 'luxury'
  const [soilCondition, setSoilCondition] = useState('firm'); // 'firm' | 'raft' | 'pile' | 'hillside'
  const [activeSpecTab, setActiveSpecTab] = useState('structural'); // 'structural' | 'boq' | 'bbs' | 'floors' | 'drawings' | 'deliverables'

  const isSaved = savedIds.includes(property.id);
  const images =
    property.images && property.images.length > 0
      ? property.images
      : [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
        ];

  const baseCostNGN =
    costTier === 'carcass'
      ? property.carcassPriceNGN || Math.round(property.priceNGN * 0.46)
      : costTier === 'luxury'
      ? property.luxuryPriceNGN || Math.round(property.priceNGN * 1.38)
      : property.standardPriceNGN || property.priceNGN;

  const soilMultiplier =
    soilCondition === 'raft'
      ? 1.10
      : soilCondition === 'pile'
      ? 1.22
      : soilCondition === 'hillside'
      ? 1.14
      : 1.0;

  const estimatedTotalNGN = Math.round(baseCostNGN * soilMultiplier);
  const estimatedRatePerSqmNGN = Math.round(
    estimatedTotalNGN / Math.max(Number(property.sizeSqm) || 450, 1)
  );

  const tierLabel =
    costTier === 'carcass'
      ? 'Carcass / Structural Shell Only'
      : costTier === 'luxury'
      ? 'Sovereign Luxury Turnkey Spec'
      : 'Standard Turnkey Build';

  const soilLabel =
    soilCondition === 'raft'
      ? 'Coastal / Soft Soil (Raft Foundation +10%)'
      : soilCondition === 'pile'
      ? 'Deep Waterlogged / High-Rise (Bored Piles +22%)'
      : soilCondition === 'hillside'
      ? 'Sloped Terrain (Stepped Retaining Wall +14%)'
      : 'Firm Laterite Soil (Pad/Strip Baseline)';

  const customWhatsAppMsg = `Hello Engr. Ekeson & Ekesonconstruct Civil Engineering Desk, I inspected the full structural details for "${property.title}" [Plan ID: ${property.reference}]. Selected Scope: ${tierLabel} | Soil Profile: ${soilLabel} | Website Estimated Build Cost: ${formatPrice(estimatedTotalNGN)}. Please share the itemized BOQ and mobilization schedule for my land.`;

  const relatedStructures = properties
    .filter((p) => p.id !== property.id && p.category === property.category)
    .concat(properties.filter((p) => p.id !== property.id && p.category !== property.category))
    .slice(0, 3);

  const dossier = useMemo(
    () => getStructureEngineeringDossier(property),
    [property]
  );

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const specs = property.structuralSpecs || {};

  return (
    <div className="space-y-14 pb-20">
      {/* Top Breadcrumb & Structural Dossier Header */}
      <div className="bg-[#0A1628] text-white border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white font-medium"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Back to Building Structures Catalog</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Blueprint Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Share Structure</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => toggleSavedProperty(property.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Shortlisted Plan' : 'Shortlist Building Plan'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0D3B2E] text-emerald-300 font-mono text-xs font-bold border border-emerald-400/30">
                  PLAN ID: {property.reference}
                </span>
                <span className="px-2.5 py-1 rounded bg-white/10 text-white text-xs font-semibold uppercase">
                  {property.category} • {property.subCategory}
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold">
                  {specs.designCode?.split('|')[0] || 'BS 8110 & Eurocode 2'}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {property.title}
              </h1>

              <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {property.propertyType} • {property.neighbourhood}
                </span>
              </p>
            </div>

            {/* Live Multi-Currency Estimated Build Cost Box */}
            <div className="bg-[#11223E] border border-emerald-400/30 rounded-2xl p-5 min-w-[320px] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                  {tierLabel}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0D3B2E] text-emerald-300 font-mono text-[10px] font-bold">
                  ~{formatPrice(estimatedRatePerSqmNGN, true)}/m²
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
                {formatPrice(estimatedTotalNGN)}
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-white/10 text-[10px] font-mono text-slate-300">
                {Object.keys(CURRENCIES).map((code) => (
                  <div key={code}>
                    <span className="text-slate-400 block">{code}</span>
                    <span className="text-white font-semibold">
                      {formatCurrency(estimatedTotalNGN, code, true)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 Columns: Gallery, Interactive 6-Tab Structural Dossier */}
        <div className="lg:col-span-8 space-y-8">
          {/* Interactive High-Res 3D Structural Render & Photo Gallery */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
            <div className="relative h-[360px] sm:h-[460px] rounded-xl overflow-hidden bg-[#0A1628]">
              <img
                src={images[activeImageIdx] || images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A1628]/90 text-emerald-300 font-mono text-xs border border-emerald-400/30">
                {specs.concreteGrade?.split('|')[0] || 'C35/45 Structural Concrete'}
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#0A1628]/85 text-white font-mono text-xs">
                Visual {activeImageIdx + 1} of {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl + idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                      activeImageIdx === idx
                        ? 'border-[#0D3B2E] ring-2 ring-emerald-500/30'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* At-a-Glance Engineering KPI Strip */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase block">
                  GROSS FLOOR / PLOT AREA
                </span>
                <span className="text-sm font-bold text-[#0A1628] mt-1 block">
                  {property.sizeSqm} sqm / {property.landSizeSqm} sqm
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase block">
                  STRUCTURAL LEVELS
                </span>
                <span className="text-sm font-bold text-[#0A1628] mt-1 block">
                  {property.floors || '2 Suspended Levels'}
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase block">
                  REBAR & CONCRETE BOQ
                </span>
                <span className="text-sm font-bold text-[#0D3B2E] mt-1 block">
                  {property.boqSummary?.steelRebarTonnes?.split(' ')[0]}T •{' '}
                  {property.boqSummary?.concreteVolumeM3?.split(' ')[0]}m³
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 uppercase block">
                  EST. BUILD DURATION
                </span>
                <span className="text-sm font-bold text-[#0A1628] mt-1 block">
                  {property.buildDuration || '32 – 40 Weeks'}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================
              INTERACTIVE 6-TAB FULL STRUCTURAL ENGINEERING DOSSIER
             ================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Tab Navigation Bar */}
            <div className="bg-[#0A1628] p-2 flex flex-wrap gap-1.5 border-b border-white/10">
              {[
                { id: 'structural', label: '01. 12-Point Structural Specs' },
                { id: 'boq', label: '02. Stage Cost & BOQ' },
                { id: 'bbs', label: '03. Rebar & BBS Schedule' },
                { id: 'floors', label: '04. Floor-by-Floor Plan' },
                { id: 'drawings', label: '05. Drawing Register & QA/QC' },
                { id: 'deliverables', label: '06. Deliverables & Warranty' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveSpecTab(t.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    activeSpecTab === t.id
                      ? 'bg-[#0D3B2E] text-emerald-300 border border-emerald-400/40'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              {/* TAB 1: FULL 12-POINT STRUCTURAL ENGINEERING SPECIFICATIONS */}
              {activeSpecTab === 'structural' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
                      COREN Structural Engineering Schedule • {property.reference}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                      Complete 12-Point Structural & Civil Specifications
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: '01. Structural Frame System',
                        val: specs.structuralSystem,
                      },
                      {
                        label: '02. Governing Design Codes',
                        val: specs.designCode,
                      },
                      {
                        label: '03. Substructure & Foundation System',
                        val: specs.foundationType,
                      },
                      {
                        label: '04. Concrete Strength Grade',
                        val: specs.concreteGrade,
                      },
                      {
                        label: '05. Reinforcement Steel Specification',
                        val: specs.steelReinforcement,
                      },
                      {
                        label: '06. Suspended Floor Slab System',
                        val: specs.floorSlabSystem,
                      },
                      {
                        label: '07. Column Grid & Section Sizes',
                        val: specs.columnGrid,
                      },
                      {
                        label: '08. Primary & Cantilever Beam Specs',
                        val: specs.beamSpecs,
                      },
                      {
                        label: '09. Blockwork & Shear-Wall System',
                        val: specs.wallSystem,
                      },
                      {
                        label: '10. Roof Trusses & Parapet Drainage',
                        val: specs.roofStructure,
                      },
                      {
                        label: '11. Required Soil Bearing Capacity',
                        val: specs.soilBearingCapacity,
                      },
                      {
                        label: '12. Wind Load & Factor of Safety',
                        val: specs.seismicWindRating,
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1"
                      >
                        <span className="text-[11px] font-mono font-bold uppercase text-[#0D3B2E] block">
                          {row.label}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-[#0A1628] leading-snug">
                          {row.val || 'Engineered to BS 8110 / Eurocode 2'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: STAGE-BY-STAGE CONSTRUCTION COST & MATERIAL BOQ */}
              {activeSpecTab === 'boq' && (
                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
                      Quantity Surveying & Material Take-Off
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                      Stage-by-Stage Construction Cost & Material Quantities
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      Showing live calculated milestone costs for <strong>{tierLabel}</strong> on{' '}
                      <strong>{soilLabel}</strong>.
                    </p>
                  </div>

                  {/* 5 Stages */}
                  <div className="space-y-3">
                    {(property.costBreakdown || []).map((st) => {
                      const stageAmount = Math.round((estimatedTotalNGN * st.percent) / 100);
                      return (
                        <div
                          key={st.stage}
                          className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-base font-bold text-[#0A1628]">
                                {st.stage}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-[11px] font-bold">
                                {st.percent}% of Build
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">{st.details}</p>
                          </div>
                          <div className="font-mono text-base font-bold text-[#0D3B2E] shrink-0">
                            {formatPrice(stageAmount)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Material Quantities Grid */}
                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                      Estimated Key Structural Material Quantities (BOQ Summary)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
                      <div className="bg-[#0A1628] text-white p-4 rounded-xl">
                        <span className="text-[10px] text-emerald-400 block">
                          READY-MIX CONCRETE VOLUME
                        </span>
                        <span className="text-base font-bold mt-1 block">
                          {property.boqSummary?.concreteVolumeM3}
                        </span>
                      </div>
                      <div className="bg-[#0A1628] text-white p-4 rounded-xl">
                        <span className="text-[10px] text-emerald-400 block">
                          HIGH-YIELD TMT STEEL REBAR
                        </span>
                        <span className="text-base font-bold mt-1 block">
                          {property.boqSummary?.steelRebarTonnes}
                        </span>
                      </div>
                      <div className="bg-[#0A1628] text-white p-4 rounded-xl">
                        <span className="text-[10px] text-emerald-400 block">
                          42.5N PORTLAND CEMENT
                        </span>
                        <span className="text-base font-bold mt-1 block">
                          {property.boqSummary?.cementBags}
                        </span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-[10px] text-slate-500 block">
                          VIBRATED SANDCRETE BLOCKS
                        </span>
                        <span className="text-sm font-bold text-[#0A1628] mt-1 block">
                          {property.boqSummary?.sandcreteBlocks}
                        </span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-[10px] text-slate-500 block">
                          CRUSHED GRANITE AGGREGATE
                        </span>
                        <span className="text-sm font-bold text-[#0A1628] mt-1 block">
                          {property.boqSummary?.graniteTonnes}
                        </span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <span className="text-[10px] text-slate-500 block">
                          WASHED SHARP RIVER SAND
                        </span>
                        <span className="text-sm font-bold text-[#0A1628] mt-1 block">
                          {property.boqSummary?.sharpSandTonnes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BAR BENDING SCHEDULE (BBS) & REINFORCEMENT BREAKDOWN */}
              {activeSpecTab === 'bbs' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
                      BS 4449 / BS 8666 Bar Bending Schedule (BBS)
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                      High-Yield TMT Steel Reinforcement Schedule ({property.boqSummary?.steelRebarTonnes})
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      Breakdown of deformed high-yield reinforcement bars ($f_y = 500\text{ N/mm}^2$) across foundation mats, columns, transfer beams, staircases, and suspended floor slabs.
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0A1628] text-white text-[11px] font-mono uppercase">
                          <th className="py-3 px-4">Bar Mark</th>
                          <th className="py-3 px-4">Diameter</th>
                          <th className="py-3 px-4">Yield Grade</th>
                          <th className="py-3 px-4">Cage Share</th>
                          <th className="py-3 px-4">Est. Tonnage</th>
                          <th className="py-3 px-4">Structural Member Allocation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-xs">
                        {dossier.rebarSchedule.map((row) => (
                          <tr key={row.barMark} className="hover:bg-slate-50">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#0D3B2E]">
                              {row.barMark}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-700">
                              {row.diameterMm}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-600">
                              {row.yieldStrength}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-[#0A1628]">
                              {row.sharePercent}%
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-[#0A1628]">
                              {row.tonnage} Tonnes
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              {row.structuralElements}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: FLOOR-BY-FLOOR SPATIAL & STRUCTURAL LAYOUT */}
              {activeSpecTab === 'floors' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
                      Spatial & Deck Configuration
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                      Floor-by-Floor Structural & Architectural Breakdown
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {(property.floorBreakdown || []).map((fl, idx) => (
                      <div
                        key={fl.level}
                        className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-lg font-bold text-[#0A1628]">
                            {fl.level}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-[#0D3B2E] text-emerald-200 font-mono text-xs font-bold">
                            Level 0{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {fl.spaces}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: DRAWING SHEET REGISTER & MANDATORY QA/QC PROTOCOL */}
              {activeSpecTab === 'drawings' && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
                        Complete Working Blueprint Index
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                        COREN, ARCON & NIQS Drawing Sheet Register
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {dossier.drawingRegister.map((dwg) => (
                        <div
                          key={dwg.sheetCode}
                          className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded bg-[#0A1628] text-emerald-300 font-mono text-xs font-bold">
                                {dwg.sheetCode}
                              </span>
                              <span className="font-bold text-xs text-[#0A1628]">
                                {dwg.discipline}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500">
                                (Scale: {dwg.scale})
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">{dwg.title}</p>
                          </div>
                          <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[#0D3B2E] font-mono text-xs font-bold shrink-0">
                            {dwg.stamp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 space-y-4">
                    <h3 className="font-serif text-xl font-bold text-[#0A1628]">
                      Mandatory 4-Gate Site Quality Assurance & Cube-Testing Checkpoints
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dossier.qaCheckpoints.map((cp) => (
                        <div
                          key={cp.stage}
                          className="bg-[#0A1628] text-white rounded-xl p-4 border border-white/10 space-y-1.5"
                        >
                          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                            {cp.stage}
                          </span>
                          <h4 className="text-xs font-bold text-white">{cp.testName}</h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {cp.criterion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: BLUEPRINT DELIVERABLES & WARRANTY */}
              {activeSpecTab === 'deliverables' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
                      COREN & NIA Working Drawings Pack
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                      Included Engineering Drawings & 25-Year Structural Warranty
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(property.amenities || []).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-[#0A1628]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#0D3B2E] shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Sticky Cost Configurator, Engineer Card & Direct WhatsApp Price Desk */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-5 sticky top-28">
            {/* Lead Civil Engineer Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#0A1628] text-emerald-400 flex items-center justify-center">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
                  Lead Structural Engineer
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0A1628]">
                  {property.agentName || 'Engr. Chibuike Ekeson, FNSE, COREN'}
                </h3>
                <p className="text-xs text-slate-500">
                  {property.agentRole || 'Principal Civil & Structural Engineer'}
                </p>
              </div>
            </div>

            {/* Interactive Build Price Configurator Controls */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                  1. Select Execution Tier
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'carcass', label: 'Carcass' },
                    { id: 'turnkey', label: 'Turnkey' },
                    { id: 'luxury', label: 'Luxury' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCostTier(t.id)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        costTier === t.id
                          ? 'bg-[#0A1628] text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase font-bold text-slate-500 mb-1">
                  2. Select Soil / Foundation Condition
                </label>
                <select
                  value={soilCondition}
                  onChange={(e) => setSoilCondition(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-[#0A1628]"
                >
                  <option value="firm">Firm Soil — Pad & Strip (Baseline)</option>
                  <option value="raft">Coastal Soil — RC Raft (+10%)</option>
                  <option value="hillside">Sloped Terrain — Retaining Wall (+14%)</option>
                  <option value="pile">Waterlogged — Bored Piles (+22%)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-600">
                  EST. BUILD PRICE:
                </span>
                <span className="text-lg font-mono font-bold text-[#0D3B2E]">
                  {formatPrice(estimatedTotalNGN)}
                </span>
              </div>
            </div>

            {/* Pre-filled WhatsApp Message Preview */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0D3B2E] font-bold block">
                Direct WhatsApp Engineering Quote Preview
              </span>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                “{customWhatsAppMsg}”
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={buildWhatsAppLink(property, customWhatsAppMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#0D3B2E] hover:bg-[#145340] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Ask Exact Price to Build on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => openEnquiryModal(property, 'Building Cost & BOQ Quote')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0A1628] hover:bg-[#132847] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Request Official BOQ & Engineering Quote</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openPaymentModal(
                    property,
                    'Architectural & Structural Plan Pack',
                    property.planFeeNGN || 2200000
                  )
                }
                className="w-full py-3 px-4 rounded-xl border border-[#0D3B2E] text-[#0D3B2E] hover:bg-emerald-50 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>
                  Buy Blueprint & Structural Pack ({formatPrice(property.planFeeNGN || 2200000)})
                </span>
              </button>

              <a
                href={`tel:${(property.agentPhone || '+2348003537662').replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:border-[#0A1628] text-[#0A1628] text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Lead Engineer: {property.agentPhone || '+234 800 353 7662'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Building Structures Section */}
      {relatedStructures.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D3B2E] font-bold">
              Other Pre-Engineered Building Structures
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0A1628] mt-1">
              Explore More Building Types & Structural Plans
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStructures.map((rel) => (
              <PropertyCard key={rel.id} property={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
