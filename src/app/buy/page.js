'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Calculator,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  SlidersHorizontal,
  Plus,
  FileSpreadsheet,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import PropertyCard from '@/components/PropertyCard';
import {
  LIVE_MATERIAL_PRICE_INDEX,
  BUYING_PROCESS_STEPS,
  buildWhatsAppLink,
} from '@/data/seedData';

export default function PickPlanAndBuildCostPage() {
  const {
    properties,
    formatPrice,
    openEnquiryModal,
    openPaymentModal,
    setListPropertyModalOpen,
  } = usePlatform();

  // Interactive Custom Building Cost Estimator state
  const [selectedStructureId, setSelectedStructureId] = useState(
    properties[0]?.id || 'struct-1'
  );
  const [buildTier, setBuildTier] = useState('standard'); // 'carcass' | 'standard' | 'luxury'
  const [soilCondition, setSoilCondition] = useState('firm'); // 'firm' | 'coastal' | 'sloped' | 'pile'
  const [customGfaMultiplier, setCustomGfaMultiplier] = useState(100); // % of standard plan footprint
  const [filterCategory, setFilterCategory] = useState('All');

  const selectedStructure = useMemo(
    () => properties.find((p) => p.id === selectedStructureId) || properties[0],
    [properties, selectedStructureId]
  );

  const soilMultipliers = {
    firm: {
      label: 'Firm Laterite / Mainland (Pad & Strip)',
      factor: 1.0,
      note: 'Standard foundation depth (1.5m – 1.8m)',
    },
    sloped: {
      label: 'Sloped / Rocky Terrain (Stepped + Retaining Wall)',
      factor: 1.12,
      note: '+12% for RC retaining walls & rock benching',
    },
    coastal: {
      label: 'Swampy / Coastal Zone (Cellular Raft Foundation)',
      factor: 1.14,
      note: '+14% for 1.1m cellular raft & sulphate-resisting concrete',
    },
    pile: {
      label: 'Deep Lagoon / High-Load (Rotary Bored Piling)',
      factor: 1.24,
      note: '+24% for 18m–28m friction piles & pile caps',
    },
  };

  const tierDetails = {
    carcass: {
      label: 'Carcass / Structural Shell',
      subtitle:
        'Foundation, columns, beams, slabs, blockwork, staircases & roof carcass.',
    },
    standard: {
      label: 'Standard Turnkey Build',
      subtitle:
        'Full structure + MEP piping/wiring, plastering, vitrified tiles, casement windows & painting.',
    },
    luxury: {
      label: 'Sovereign Luxury Spec',
      subtitle:
        'Full structure + Double-glazed curtain walls, Spanish porcelain, smart automation & landscaping.',
    },
  };

  const baseCost = useMemo(() => {
    if (!selectedStructure) return 0;
    if (buildTier === 'carcass')
      return (
        selectedStructure.carcassPriceNGN ||
        Math.round(selectedStructure.priceNGN * 0.46)
      );
    if (buildTier === 'luxury')
      return (
        selectedStructure.luxuryPriceNGN ||
        Math.round(selectedStructure.priceNGN * 1.38)
      );
    return selectedStructure.standardPriceNGN || selectedStructure.priceNGN;
  }, [selectedStructure, buildTier]);

  const soilFactor = soilMultipliers[soilCondition]?.factor || 1.0;
  const scaleFactor = customGfaMultiplier / 100;
  const computedTotalCost = Math.round(baseCost * soilFactor * scaleFactor);
  const baseSqm = Number(selectedStructure?.sizeSqm) || 480;
  const scaledSqm = Math.round(baseSqm * scaleFactor);

  // Dynamically scale BOQ Material Take-off Quantities
  const parseNumeric = (val, fallback) =>
    parseFloat(String(val || fallback).replace(/[^0-9.]/g, '')) || fallback;

  const scaledConcreteM3 = Math.round(
    parseNumeric(selectedStructure?.boqSummary?.concreteVolumeM3, 250) *
      scaleFactor *
      soilFactor
  );
  const scaledSteelTonnes = (
    parseNumeric(selectedStructure?.boqSummary?.steelRebarTonnes, 32) *
    scaleFactor *
    soilFactor
  ).toFixed(1);
  const scaledCementBags = Math.round(
    parseNumeric(selectedStructure?.boqSummary?.cementBags, 2400) *
      scaleFactor *
      soilFactor
  );
  const scaledBlocks = Math.round(
    parseNumeric(selectedStructure?.boqSummary?.sandcreteBlocks, 16000) *
      scaleFactor
  );

  const filteredPlans = useMemo(() => {
    if (filterCategory === 'All') return properties;
    return properties.filter((p) => p.category === filterCategory);
  }, [properties, filterCategory]);

  const directWhatsAppHref = selectedStructure
    ? buildWhatsAppLink(
        selectedStructure,
        `Hello Engr. Chibuike Ekeson, I used the Building Plan & Cost Configurator on Ekesonconstruct:\n\n• Selected Structure: ${selectedStructure.title} [${selectedStructure.reference}]\n• Execution Tier: ${tierDetails[buildTier].label}\n• Soil / Foundation Profile: ${soilMultipliers[soilCondition].label}\n• Target Floor Area: ${scaledSqm} sqm (${customGfaMultiplier}% scale)\n• Estimated Build Cost: ${formatPrice(computedTotalCost)}\n\nPlease share the detailed Bill of Quantities (BOQ) and let us discuss building this on my land.`
      )
    : '#';

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-24">
      {/* Header Banner */}
      <section className="bg-[#0A1628] text-white pt-14 pb-20 border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D3B2E] border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4">
                <Calculator className="w-3.5 h-3.5" /> Pick a Building Plan & Construction Cost Engine
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                Select Your Building Structure.{' '}
                <span className="text-emerald-400">Calculate Exact Turnkey Cost.</span>
              </h1>
              <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
                We do not broker real estate—we engineer and construct buildings from foundation to roof. Pick any COREN-stamped building plan below, configure your soil condition and execution tier, inspect scaled BOQ quantities, and chat directly with our Principal Civil Engineer on WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={directWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 border border-emerald-500/40 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" /> Ask Engr. Ekeson on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setListPropertyModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-400" /> Upload Custom Building Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-16" id="estimator">
        {/* INTERACTIVE BUILDING PLAN & BOQ COST CONFIGURATOR */}
        {selectedStructure && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="bg-[#0A1628] px-6 sm:px-8 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0D3B2E] border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                    Interactive Civil Engineering BOQ Simulator
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                    Configure Building Plan, Foundation Soil Profile & Execution Scope
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-300 bg-white/5 px-3.5 py-1.5 rounded-lg border border-white/10">
                Design Code: {selectedStructure.structuralSpecs?.designCode?.split('|')[0] || 'Eurocode 2 / BS 8110'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Configuration Controls */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
                {/* 1. Choose Building Structure */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    01. Select Engineered Building Plan ({properties.length} Structural Blueprints)
                  </label>
                  <select
                    value={selectedStructureId}
                    onChange={(e) => setSelectedStructureId(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-bold text-[#0A1628] focus:outline-none focus:border-[#0D3B2E]"
                  >
                    {properties.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.reference}] {item.title} — ({item.sizeSqm} sqm • {item.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Choose Execution Scope */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    02. Choose Construction Execution Scope
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(tierDetails).map(([key, info]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setBuildTier(key)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          buildTier === key
                            ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-md'
                            : 'bg-slate-50 text-[#0A1628] border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {info.label}
                          </span>
                          {buildTier === key && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p
                          className={`text-[11px] leading-relaxed ${
                            buildTier === key ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {info.subtitle}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Choose Soil / Geotechnical Profile */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    03. Select Site Soil & Foundation Condition
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(soilMultipliers).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSoilCondition(key)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          soilCondition === key
                            ? 'bg-[#0D3B2E] text-white border-[#0D3B2E]'
                            : 'bg-slate-50 text-[#0A1628] border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold">{item.label}</p>
                        <p
                          className={`text-[11px] mt-1 ${
                            soilCondition === key ? 'text-emerald-200' : 'text-slate-500'
                          }`}
                        >
                          {item.note}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Custom Footprint Scaling */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0A1628]">
                      04. Adjust Floor Area Scale ({customGfaMultiplier}% of Master Blueprint)
                    </label>
                    <span className="text-xs font-mono font-extrabold text-[#0D3B2E] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {scaledSqm.toLocaleString()} sqm GFA
                    </span>
                  </div>
                  <input
                    type="range"
                    min={75}
                    max={150}
                    step={5}
                    value={customGfaMultiplier}
                    onChange={(e) => setCustomGfaMultiplier(Number(e.target.value))}
                    className="w-full accent-[#0D3B2E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono font-semibold text-slate-500 mt-1">
                    <span>75% Compact Adaptation</span>
                    <span>100% Master Plan ({baseSqm} sqm)</span>
                    <span>150% Expanded Footprint</span>
                  </div>
                </div>

                {/* Stage-by-Stage Cost Bars */}
                {selectedStructure.costBreakdown && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Estimated Stage-by-Stage Engineering Disbursement
                    </h3>
                    <div className="space-y-2.5">
                      {selectedStructure.costBreakdown.map((stage) => {
                        const stageAmount = Math.round(
                          (computedTotalCost * stage.percent) / 100
                        );
                        return (
                          <div
                            key={stage.stage}
                            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div>
                              <span className="text-xs font-bold text-[#0A1628]">
                                {stage.stage} ({stage.percent}%)
                              </span>
                              <p className="text-[11px] text-slate-600 mt-0.5">
                                {stage.details}
                              </p>
                            </div>
                            <span className="text-xs font-mono font-extrabold text-[#0D3B2E] shrink-0">
                              {formatPrice(stageAmount)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Live Summary & Direct WhatsApp Action */}
              <div className="lg:col-span-5 bg-[#0A1628] text-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                        Selected Building Structure
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                        {selectedStructure.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white/10 text-emerald-300 text-xs font-mono font-bold shrink-0">
                      {selectedStructure.reference}
                    </span>
                  </div>

                  {/* Estimated Construction Price Display */}
                  <div className="my-6 p-5 rounded-2xl bg-[#0D3B2E] border border-emerald-500/40">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-300 block">
                      Estimated Construction Cost ({tierDetails[buildTier].label})
                    </span>
                    <div className="text-3xl sm:text-4xl font-mono font-extrabold text-white mt-1">
                      {formatPrice(computedTotalCost)}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-white/15 text-xs text-emerald-100 font-mono">
                      <span>
                        Blueprint Pack:{' '}
                        <strong>{formatPrice(selectedStructure.planFeeNGN || 2200000)}</strong>
                      </span>
                      <span>Duration: {selectedStructure.buildDuration || '8–12 Months'}</span>
                    </div>
                  </div>

                  {/* Scaled Material Quantities & Structural Specs Summary */}
                  <div className="space-y-3 text-xs">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                      Scaled Material Take-Off ({scaledSqm} sqm • {soilMultipliers[soilCondition].label.split('(')[0]})
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 font-mono">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">
                          READY-MIX CONCRETE
                        </span>
                        <span className="font-bold text-white">
                          ~{scaledConcreteM3.toLocaleString()} m³ ({selectedStructure.structuralSpecs?.concreteGrade?.split(' ')[0]})
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">
                          HIGH-YIELD TMT REBAR
                        </span>
                        <span className="font-bold text-emerald-300">
                          ~{scaledSteelTonnes} Tonnes
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">
                          42.5N PORTLAND CEMENT
                        </span>
                        <span className="font-bold text-white">
                          ~{scaledCementBags.toLocaleString()} Bags
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block">
                          VIBRATED BLOCKS
                        </span>
                        <span className="font-bold text-white">
                          ~{scaledBlocks.toLocaleString()} Units
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 mt-3">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block">
                        SLAB & STRUCTURAL SYSTEM
                      </span>
                      <p className="text-xs text-slate-200">
                        {selectedStructure.structuralSpecs?.floorSlabSystem}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="space-y-3 mt-8 pt-6 border-t border-white/10">
                  <a
                    href={directWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 border border-emerald-400/40 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    Ask Exact Build Price on WhatsApp
                  </a>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => openEnquiryModal(selectedStructure, 'Building Cost & BOQ Quote')}
                      className="py-3 px-4 rounded-xl bg-white text-[#0A1628] hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#0D3B2E]" />
                      <span>Request BOQ</span>
                    </button>
                    <Link
                      href={`/properties/${selectedStructure.id}`}
                      className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openPaymentModal(
                        selectedStructure,
                        'Architectural & Structural Plan Pack',
                        selectedStructure.planFeeNGN || 2200000
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-white/5 border border-white/15 text-slate-300 font-semibold text-xs transition-all cursor-pointer"
                  >
                    Order Stamped Structural Blueprints & CPT Soil Test ({formatPrice(selectedStructure.planFeeNGN || 2200000)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BROWSE ALL BUILDING STRUCTURES TO PICK FROM */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D3B2E] block mb-1">
                Engineered Building Catalog
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628]">
                Click Any Building Structure to Inspect Full Structural Details
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'All', label: 'All Building Types' },
                { id: 'Duplex & Villa Structures', label: 'Duplex & Villas' },
                { id: 'Multi-Storey Apartment Blocks', label: 'Multi-Storey Blocks' },
                { id: 'Bungalow & Family Structures', label: 'Bungalows' },
                { id: 'Commercial & Office Structures', label: 'Commercial & Hospitals' },
                { id: 'Industrial & Steel Structures', label: 'Steel Warehouses' },
                { id: 'Civil Infrastructure & Bridges', label: 'Roads & Culverts' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterCategory === cat.id
                      ? 'bg-[#0A1628] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* LIVE MATERIAL RATE SCHEDULE */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D3B2E] block">
                Quantity Surveying Unit Rate Schedule
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
                Current Nigerian Structural Material Benchmark Rates
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              BESMM4 Standard Measurement
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A1628] text-white text-[11px] font-mono uppercase">
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Material & Specification</th>
                  <th className="py-3.5 px-4">Standard</th>
                  <th className="py-3.5 px-4">Unit</th>
                  <th className="py-3.5 px-4">Benchmark Rate</th>
                  <th className="py-3.5 px-4">Structural Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {LIVE_MATERIAL_PRICE_INDEX.map((m) => (
                  <tr key={m.code} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0D3B2E]">{m.code}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0A1628]">{m.material}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{m.specStandard}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{m.unit}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0D3B2E]">
                      {formatPrice(m.rateNGN)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{m.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7-STAGE TURNKEY CIVIL ENGINEERING EXECUTION PROTOCOL */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D3B2E] block mb-1">
              From Soil Test to Handover
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628]">
              Our 7-Stage Civil & Structural Execution Workflow
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every building project is supervised directly by COREN-registered civil engineers with stage-by-stage ultrasonic pulse velocity (UPV) and concrete cube crushing verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BUYING_PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col justify-between hover:border-[#0D3B2E]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0A1628] text-emerald-400 font-mono text-xs font-bold">
                      STAGE {item.step}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#0D3B2E]" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#0A1628] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Engineering Deliverable
                  </span>
                  <span className="text-xs font-bold text-[#0D3B2E]">{item.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
