'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Maximize2,
  Heart,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  FileSpreadsheet,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { buildWhatsAppLink } from '@/data/seedData';

export default function PropertyCard({ property }) {
  const {
    formatPrice,
    savedIds,
    toggleSavedProperty,
    openEnquiryModal,
  } = usePlatform();

  // Allow user to toggle between Carcass (Roofed Shell), Standard Move-In, and Luxury Build Price directly on the card
  const [costTier, setCostTier] = useState('turnkey'); // 'carcass' | 'turnkey' | 'luxury'

  const isSaved = savedIds.includes(property.id);
  const mainImage =
    property.images?.[0] ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  const displayedPriceNGN =
    costTier === 'carcass'
      ? property.carcassPriceNGN || Math.round(property.priceNGN * 0.46)
      : costTier === 'luxury'
      ? property.luxuryPriceNGN || Math.round(property.priceNGN * 1.38)
      : property.standardPriceNGN || property.priceNGN;

  const ratePerSqmNGN = Math.round(
    displayedPriceNGN / Math.max(Number(property.sizeSqm) || 450, 1)
  );

  const tierLabel =
    costTier === 'carcass'
      ? 'Carcass Cost (Foundation, Blockwork & Roof)'
      : costTier === 'luxury'
      ? 'Luxury Finish Cost (Executive Spec)'
      : 'Full Move-In Cost (Painted & Tiled)';

  const customWhatsAppMsg = `Hello Engr. Ekeson & Ekeconstruct Nigeria, I want to know the exact cost and Material List (cement, blocks, iron rods) to build "${property.title}" [Plan ID: ${property.reference}] under the ${tierLabel} option (Estimated at ${formatPrice(displayedPriceNGN)}).`;

  const stages = property.costBreakdown || [];

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0D3B2E]/60 transition-all duration-300 flex flex-col">
      {/* Image & House Plan Header */}
      <div className="relative h-64 overflow-hidden bg-[#0A1628]">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/30 to-[#0A1628]/45" />

        {/* Top Badges & Save to Dashboard Button */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded bg-[#0A1628]/95 backdrop-blur-sm text-emerald-300 font-mono text-[11px] font-bold border border-emerald-400/30">
              PLAN: {property.reference}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0D3B2E] text-white text-[10px] font-bold tracking-wide uppercase">
              {property.category}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleSavedProperty(property.id)}
            aria-label="Save property to your dashboard"
            title={isSaved ? 'Saved in Your Dashboard' : 'Save Property to Dashboard'}
            className={`px-2.5 py-1.5 rounded-full flex items-center gap-1 text-[11px] font-bold backdrop-blur-sm transition cursor-pointer ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-white/95 text-[#0A1628] hover:bg-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {/* Bottom Estimated Build Cost & Interactive Tier Switcher */}
        <div className="absolute bottom-3 left-3 right-3 space-y-2">
          {/* Interactive Tier Pills */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1 bg-[#0A1628]/90 backdrop-blur-md p-1 rounded-lg border border-white/15">
              {[
                { id: 'carcass', label: 'Carcass (Roofed)' },
                { id: 'turnkey', label: 'Full Move-In' },
                { id: 'luxury', label: 'Luxury' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCostTier(t.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                    costTier === t.id
                      ? 'bg-[#0D3B2E] text-emerald-300 border border-emerald-400/40'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/50 text-emerald-300 font-mono text-[10px] border border-white/10">
              ~{formatPrice(ratePerSqmNGN, true)}/m²
            </span>
          </div>

          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{tierLabel}</span>
              </p>
              <p className="text-xl font-mono font-bold text-white tracking-tight">
                {formatPrice(displayedPriceNGN)}
              </p>
            </div>
            <Link
              href={`/properties/${property.id}`}
              className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-[#0A1628] text-[11px] font-bold inline-flex items-center gap-1 shadow-sm transition"
            >
              <span>Full Breakdown</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#0D3B2E] font-semibold">
            <span className="truncate">{property.propertyType}</span>
            <span className="shrink-0 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[#0D3B2E]">
              COREN Approved
            </span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="block font-serif text-lg font-bold text-[#0A1628] hover:text-[#0D3B2E] transition line-clamp-2 leading-snug"
          >
            {property.title}
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Plain-English Material & Plot Summary Grid */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded-xl p-3 border border-slate-200/80 font-mono">
            <div>
              <span className="text-[9px] text-slate-400 uppercase block">01. CEMENT & BLOCKS</span>
              <span className="font-bold text-[#0A1628] truncate block">
                {property.boqSummary?.cementBags?.split(' ')[0] || '2,350'} Bags •{' '}
                {property.boqSummary?.sandcreteBlocks?.split(' ')[0] || '15,800'} Blks
              </span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase block">02. IRON RODS (STEEL)</span>
              <span className="font-bold text-[#0D3B2E] truncate block">
                {property.boqSummary?.steelRebarTonnes?.split(' ')[0] || '30'} Tonnes Rods
              </span>
            </div>
            <div className="pt-1.5 border-t border-slate-200/60">
              <span className="text-[9px] text-slate-400 uppercase block">03. RECOMMENDED LAND</span>
              <span className="font-bold text-[#0A1628] truncate block">
                Min. {property.landSizeSqm} sqm Plot
              </span>
            </div>
            <div className="pt-1.5 border-t border-slate-200/60">
              <span className="text-[9px] text-slate-400 uppercase block">04. FOUNDATION TYPE</span>
              <span
                className="font-bold text-[#0A1628] truncate block"
                title={property.structuralSpecs?.foundationType}
              >
                {property.structuralSpecs?.foundationType?.split('(')[0] || 'Strip / Raft'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 pt-1.5 border-t border-slate-200/60">
              <Maximize2 className="w-3 h-3 text-[#0D3B2E] shrink-0" />
              <span className="truncate">
                {property.bedrooms ? `${property.bedrooms} Beds • ` : ''}
                {property.sizeSqm}m² Floor
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 pt-1.5 border-t border-slate-200/60">
              <Clock className="w-3 h-3 text-[#0A1628] shrink-0" />
              <span className="truncate">{property.buildDuration || '32–40 Wks'}</span>
            </div>
          </div>

          {/* 5-Stage Milestone Cost Split Bar */}
          {stages.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Pay Stage-by-Stage (5 Phases)</span>
                <span className="text-[#0D3B2E] font-bold">
                  Drawings + BOQ: {formatPrice(property.planFeeNGN || 2200000, true)}
                </span>
              </div>
              <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-100 gap-0.5">
                {stages.map((st, idx) => {
                  const colors = [
                    'bg-[#0A1628]',
                    'bg-[#0D3B2E]',
                    'bg-emerald-600',
                    'bg-slate-600',
                    'bg-emerald-400',
                  ];
                  return (
                    <div
                      key={st.stage}
                      style={{ width: `${st.percent}%` }}
                      title={`${st.stage}: ${st.percent}%`}
                      className={`h-full ${colors[idx % colors.length]}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Direct Action Bar */}
          <div className="grid grid-cols-12 gap-1.5 pt-1">
            <Link
              href={`/properties/${property.id}`}
              className="col-span-4 py-2.5 px-2 rounded-lg bg-[#0A1628] hover:bg-[#132847] text-white text-[11px] font-bold transition text-center inline-flex items-center justify-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>View Plan</span>
            </Link>
            <button
              type="button"
              onClick={() => openEnquiryModal(property, 'Building Cost & Material List (BOQ) Quote')}
              className="col-span-4 py-2.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0A1628] text-[11px] font-bold inline-flex items-center justify-center gap-1 transition cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#0D3B2E] shrink-0" />
              <span>Material List</span>
            </button>
            <a
              href={buildWhatsAppLink(property, customWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-4 py-2.5 px-2 rounded-lg bg-[#0D3B2E] hover:bg-emerald-700 text-white text-[11px] font-bold inline-flex items-center justify-center gap-1.5 transition shadow-sm"
              title="Ask for exact price to build this house on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
