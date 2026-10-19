'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HardHat,
  Layers,
  ShieldCheck,
  Compass,
  CheckCircle2,
  ArrowRight,
  Building2,
  Ruler,
  Wrench,
  Activity,
  FileSpreadsheet,
  MessageCircle,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { buildWhatsAppLink, formatPrice } from '@/data/seedData';

const STRUCTURAL_METHODOLOGIES = [
  {
    code: 'GEO-01',
    title: 'Geotechnical Subsoil Investigation & Piling',
    desc: '20-ton Cone Penetration Testing (CPT), Standard Penetration Testing (SPT), and rotary bored friction piling (450mm–900mm diameter) down to firm bearing strata.',
    specs: ['ASTM D1586 / BS 5930 Standard', 'Pile Load Testing up to 1.5x Working Load', 'Sulphate-Resisting C35/45 Substructure Concrete'],
    icon: Compass,
  },
  {
    code: 'STR-02',
    title: 'Monolithic Reinforced Concrete & Post-Tensioned Frames',
    desc: 'High-rigidity moment-resisting frames, shear core walls, ribbed waffle slabs, and flat post-tensioned floor plates engineered for zero vibration and long spans.',
    specs: ['Eurocode 2 (EN 1992-1-1) Design Code', '460 N/mm² High-Yield TMT Rebar', '28-Day Concrete Cube Crushing Verification'],
    icon: Layers,
  },
  {
    code: 'STL-03',
    title: 'Structural Steel Portal Frames & Space Trusses',
    desc: 'Clear-span universal beam/column portal frames (25m–50m span) with high-strength friction grip (HSFG) bolted connections and hot-dip galvanized corrosion protection.',
    specs: ['Eurocode 3 (EN 1993) Steel Design', 'Ultrasonic Weld Flaw Inspection', 'Industrial Fibre-Reinforced Floor Slabs'],
    icon: Wrench,
  },
  {
    code: 'CIV-04',
    title: 'Civil Infrastructure, Rigid Pavements & Box Culverts',
    desc: 'Reinforced concrete rigid estate roads, twin-cell stormwater box culverts, stone-pitched drainage channels, and subterranean water storage reservoirs.',
    specs: ['150mm Stone-Base + 200mm C35 Rigid Pavement', 'Hydraulic Flood Routing & Invert Leveling', 'Heavy-Duty Axle Load Certification'],
    icon: HardHat,
  },
];

export default function ConstructionSitesAndEngineeringPage() {
  const { projects, properties, currency, setActiveQuoteProperty } = usePlatform();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects =
    statusFilter === 'All'
      ? projects
      : projects.filter((p) => {
          const st = (p.status || p.stage || p.developmentPhase || '').toLowerCase();
          return st.includes(statusFilter.toLowerCase());
        });

  return (
    <div className="min-h-screen bg-[#F4F7FA] pb-24">
      {/* Hero Header */}
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
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D3B2E] border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <HardHat className="w-3.5 h-3.5" /> Active Civil & Structural Construction Sites
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Heavy Structural Execution &{' '}
              <span className="text-emerald-400">Live Site Telemetry.</span>
            </h1>
            <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
              Inspect our ongoing and completed civil engineering sites across Nigeria. Every project features documented soil logs, concrete cube test results, reinforcement bar schedules, and stage-by-stage completion telemetry.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-16">
        {/* 4 Structural Engineering Methodologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STRUCTURAL_METHODOLOGIES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.code}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0A1628] text-emerald-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0D3B2E] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0A1628] mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  {item.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D3B2E] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active & Delivered Construction Sites */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D3B2E] block mb-2">
                Field Execution Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628]">
                Ongoing & Completed Structural Engineering Sites
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Current', 'Completed', 'Piling'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === st
                      ? 'bg-[#0A1628] text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {st === 'All' ? 'All Construction Sites' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
              const title = project.name || project.title;
              const status = project.stage || project.status || 'Active Site';
              const imgUrl = project.images?.[0] || project.image;
              const pct = project.progressPercent ?? project.completion ?? 75;
              const desc = project.description || project.scope;
              const timeline = project.completionStatus || project.timeline || 'On Schedule';
              const whatsappUrl = buildWhatsAppLink(
                `Hello Engr. Chibuike Ekeson, I am inspecting your "${title}" project in ${project.location} (${project.category}). I would like to discuss building a similar structure and get an estimated construction cost.`
              );
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-[#0A1628]">
                    <img
                      src={imgUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-lg bg-[#0A1628]/90 text-white text-xs font-bold">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-[#0D3B2E] text-emerald-300 text-xs font-bold">
                        {status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-xs text-emerald-300 font-semibold">{project.location}</p>
                        <h3 className="text-xl font-bold">{title}</h3>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                        {project.reference || 'EKC-SITE'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>

                      {project.structuralHighlight && (
                        <div className="p-3.5 rounded-xl bg-emerald-950/5 border border-[#0D3B2E]/20 flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <Activity className="w-4 h-4 text-[#0D3B2E] shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D3B2E] block">
                                Verified Structural Telemetry
                              </span>
                              <span className="text-xs font-bold text-[#0A1628]">
                                {project.structuralHighlight}
                              </span>
                            </div>
                          </div>
                          {project.startingPriceNGN && (
                            <div className="text-right shrink-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                Contract Value
                              </span>
                              <span className="text-xs font-extrabold text-[#0A1628]">
                                {formatPrice(project.startingPriceNGN, currency)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {Array.isArray(project.features) && project.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {project.features.map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/70"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D3B2E] shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-500">
                            {project.developmentPhase || 'Structural & Civil Works Progress'}
                          </span>
                          <span className="text-[#0D3B2E]">{pct}% Complete</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0A1628] to-[#0D3B2E] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                          <span>Target Delivery: {timeline}</span>
                          <span>COREN Quality Assured</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-300" />
                        Ask Cost to Build Similar Structure
                      </a>
                      <Link
                        href="/properties"
                        className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1628] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        View Blueprints <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to Pick a Building Plan */}
        <div className="bg-[#0A1628] rounded-3xl p-8 sm:p-12 text-white border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Ready to Mobilize to Site?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Have Land Ready for Development? Let Us Engineer & Construct Your Building.
            </h3>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Pick one of our pre-engineered building structures or send your architectural drawings directly to Engr. Chibuike Ekeson on WhatsApp for a comprehensive Bill of Quantities and Geotechnical Soil Test schedule.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/buy"
              className="px-6 py-4 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 border border-emerald-400/30 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              Open Plan & Cost Calculator <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setActiveQuoteProperty(properties[0])}
              className="px-6 py-4 rounded-xl bg-white text-[#0A1628] hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Request Custom BOQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
