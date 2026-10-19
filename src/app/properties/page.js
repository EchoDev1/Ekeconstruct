'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  PlusCircle,
  HardHat,
  Layers,
  MessageCircle,
  LayoutGrid,
  Table2,
  ArrowUpRight,
  FileSpreadsheet,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import PropertyCard from '@/components/PropertyCard';
import { buildWhatsAppLink } from '@/data/seedData';

function StructuresCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialCity = searchParams.get('city') || 'All';
  const initialSubCategory = searchParams.get('subCategory') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const { properties, formatPrice, setListPropertyModalOpen, openEnquiryModal } = usePlatform();

  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity);
  const [subCategory, setSubCategory] = useState(initialSubCategory);
  const [bedrooms, setBedrooms] = useState('All');
  const [maxPriceNGN, setMaxPriceNGN] = useState('All');
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const filtered = useMemo(() => {
    const list = properties.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (city !== 'All' && p.city !== city) return false;
      if (
        subCategory !== 'All' &&
        p.subCategory.toLowerCase() !== subCategory.toLowerCase()
      )
        return false;
      if (bedrooms !== 'All' && (p.bedrooms || 0) < Number(bedrooms)) return false;
      if (maxPriceNGN !== 'All' && p.priceNGN > Number(maxPriceNGN)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${p.title} ${p.reference} ${p.category} ${p.subCategory} ${p.description} ${p.structuralSpecs?.structuralSystem || ''} ${p.structuralSpecs?.foundationType || ''} ${p.structuralSpecs?.concreteGrade || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.priceNGN - b.priceNGN);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.priceNGN - a.priceNGN);
    if (sortBy === 'area-desc') return [...list].sort((a, b) => b.sizeSqm - a.sizeSqm);
    return list;
  }, [properties, category, city, subCategory, bedrooms, maxPriceNGN, query, sortBy]);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Banner */}
      <section className="bg-[#0A1628] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Ekesonconstruct Structural Engineering & Building Plan Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-1">
              Building Structures, Types & Full Engineering Specs
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Browse COREN-certified residential duplexes, multi-storey apartment blocks, contemporary bungalows, commercial towers, steel portal warehouses, and road/culvert infrastructure. Toggle between Visual Cards and the Technical Engineering Schedule Table below.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 self-start">
            <button
              type="button"
              onClick={() => setListPropertyModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 text-white border border-emerald-400/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>Add Building Plan</span>
            </button>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Ask Custom Build Price</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filter Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          {/* Building Type Category Pills + View Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'All', label: 'All Building Types' },
                { id: 'Duplex & Villa Structures', label: 'Duplex & Villa Structures' },
                { id: 'Multi-Storey Apartment Blocks', label: 'Multi-Storey Blocks' },
                { id: 'Bungalow & Family Structures', label: 'Bungalow Structures' },
                { id: 'Commercial & Office Structures', label: 'Commercial & Hospitals' },
                { id: 'Industrial & Steel Structures', label: 'Steel Warehouses' },
                { id: 'Civil Infrastructure & Bridges', label: 'Roads & Culverts' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCategory(t.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    category === t.id
                      ? 'bg-[#0A1628] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs">
                <SlidersHorizontal className="w-4 h-4 text-[#0D3B2E]" />
                <span className="font-mono font-bold text-[#0A1628]">
                  {filtered.length} Structures
                </span>
              </div>

              {/* View Mode Switcher */}
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#0A1628] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A1628]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-[#0A1628] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0A1628]'
                  }`}
                >
                  <Table2 className="w-3.5 h-3.5" />
                  <span>Engineering Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Structural Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Structural System
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold"
              >
                <option value="All">All Structural Systems</option>
                <option value="Heavy Residential RC Frame">Heavy Cantilevered RC Frame</option>
                <option value="Residential RC Frame">Standard Duplex RC Frame</option>
                <option value="Twin / Terrace RC Frame">Twin Semi-Detached RC Frame</option>
                <option value="Multi-Family RC Structure">Multi-Storey Shear-Wall RC</option>
                <option value="Commercial High-Rise RC Frame">Waffle-Slab Commercial Frame</option>
                <option value="Healthcare & Institutional RC Frame">Hospital Anti-Vibration Frame</option>
                <option value="Structural Steel Portal Frame">S355 Steel Portal Frame</option>
                <option value="Single-Storey RC & Masonry">Single-Storey RC & Masonry</option>
                <option value="Highway, Drainage & Retaining Structures">Highway, Culverts & Retaining Walls</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Minimum Bedrooms / Units
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold"
              >
                <option value="All">Any Capacity</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms / Multi-Unit</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Max Est. Turnkey Build Budget
              </label>
              <select
                value={maxPriceNGN}
                onChange={(e) => setMaxPriceNGN(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold"
              >
                <option value="All">No Maximum Ceiling</option>
                <option value="75000000">Up to {formatPrice(75_000_000, true)}</option>
                <option value="200000000">Up to {formatPrice(200_000_000, true)}</option>
                <option value="450000000">Up to {formatPrice(450_000_000, true)}</option>
                <option value="900000000">Up to {formatPrice(900_000_000, true)}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                Sort Structures By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold"
              >
                <option value="featured">Featured Structures First</option>
                <option value="price-asc">Est. Build Cost: Low to High</option>
                <option value="price-desc">Est. Build Cost: High to Low</option>
                <option value="area-desc">Gross Floor Area: Largest First</option>
              </select>
            </div>
          </div>

          {/* Search Input & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Plan ID (e.g. EKC-STR-001), Foundation (Raft, Pile, Pad), Concrete Grade (C35/45), or Building Type..."
                className="w-full text-xs focus:outline-none text-slate-800"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setCity('All');
                setSubCategory('All');
                setBedrooms('All');
                setMaxPriceNGN('All');
                setQuery('');
              }}
              className="text-xs font-bold text-[#0D3B2E] hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Structures Output: Grid or Technical Comparison Table */}
        {filtered.length === 0 ? (
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <HardHat className="w-10 h-10 text-[#0D3B2E] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#0A1628]">
              Need a Custom-Engineered Building Structure?
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our civil and structural engineers design bespoke residential, commercial, and industrial structures to match any land geometry or soil condition.
            </p>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Chat With Structural Engineer on WhatsApp</span>
            </a>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((structure) => (
              <PropertyCard key={structure.id} property={structure} />
            ))}
          </div>
        ) : (
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#0A1628] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                  Side-by-Side Structural Engineering & BOQ Schedule
                </span>
                <h2 className="font-serif text-lg font-bold">
                  Technical Specification & Construction Cost Comparison ({filtered.length} Plans)
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-300">BS 8110 / Eurocode 2</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[#0A1628] text-[11px] font-mono uppercase border-b border-slate-200">
                    <th className="py-3.5 px-4">Plan ID</th>
                    <th className="py-3.5 px-4">Building Structure & Type</th>
                    <th className="py-3.5 px-4">GFA / Plot</th>
                    <th className="py-3.5 px-4">Foundation & Concrete</th>
                    <th className="py-3.5 px-4">BOQ Rebar & Concrete</th>
                    <th className="py-3.5 px-4">Est. Carcass</th>
                    <th className="py-3.5 px-4">Est. Turnkey</th>
                    <th className="py-3.5 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {filtered.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-mono font-bold text-[#0D3B2E] whitespace-nowrap">
                        {st.reference}
                      </td>
                      <td className="py-4 px-4 max-w-[260px]">
                        <Link
                          href={`/properties/${st.id}`}
                          className="font-bold text-[#0A1628] hover:text-[#0D3B2E] block leading-snug"
                        >
                          {st.title}
                        </Link>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {st.category} • {st.floors}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono whitespace-nowrap">
                        <span className="font-bold text-[#0A1628] block">{st.sizeSqm} m²</span>
                        <span className="text-[11px] text-slate-500">Plot: {st.landSizeSqm} m²</span>
                      </td>
                      <td className="py-4 px-4 max-w-[220px]">
                        <span className="font-semibold text-[#0A1628] block truncate">
                          {st.structuralSpecs?.foundationType?.split('(')[0]}
                        </span>
                        <span className="text-[11px] font-mono text-[#0D3B2E]">
                          {st.structuralSpecs?.concreteGrade?.split('|')[0]}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono whitespace-nowrap">
                        <span className="font-bold text-[#0D3B2E] block">
                          {st.boqSummary?.steelRebarTonnes?.split('(')[0]}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {st.boqSummary?.concreteVolumeM3?.split('(')[0]}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-700 whitespace-nowrap">
                        {formatPrice(st.carcassPriceNGN || Math.round(st.priceNGN * 0.46))}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-[#0A1628] whitespace-nowrap">
                        {formatPrice(st.priceNGN)}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/properties/${st.id}`}
                            className="px-2.5 py-1.5 rounded-lg bg-[#0A1628] text-white text-[11px] font-bold inline-flex items-center gap-1"
                          >
                            <span>Dossier</span>
                            <ArrowUpRight className="w-3 h-3 text-emerald-300" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openEnquiryModal(st, 'Building Cost & BOQ Quote')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0A1628] text-[11px] font-bold cursor-pointer"
                          >
                            BOQ
                          </button>
                          <a
                            href={buildWhatsAppLink(st)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-[#0D3B2E] text-white text-[11px] font-bold inline-flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-300" />
                            <span>Price</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center font-mono text-xs">
          Loading Ekesonconstruct Structural Catalog...
        </div>
      }
    >
      <StructuresCatalogContent />
    </Suspense>
  );
}
