'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import {
  CORE_BUSINESS_PILLARS,
  PROPERTY_MANAGEMENT_SERVICES,
  FOUNDATION_SELECTION_GUIDE,
  buildWhatsAppLink,
} from '@/data/seedData';

const SPECIALIZED_ENGINEERING_LABS = [
  {
    code: 'LAB-01',
    title: 'Geotechnical Soil Investigation (CPT & Percussion Boreholes)',
    priceEstimate: 'From ₦950,000 / Plot',
    turnaround: '5 – 7 Working Days',
    desc: '20-ton penetrometer testing, undisturbed soil sampling, triaxial shear strength tests, water table profiling, and COREN-stamped foundation recommendations.',
    deliverables: [
      'Borehole Log Sheets (15m – 30m depth)',
      'Allowable Bearing Capacity Curve (kN/m²)',
      'Recommended Foundation Type & Depth',
      'Chemical & Sulphate Attack Assessment',
    ],
  },
  {
    code: 'LAB-02',
    title: 'Structural Engineering Design, Detailing & BOQ',
    priceEstimate: 'From ₦1,450,000 / Structure',
    turnaround: '7 – 14 Working Days',
    desc: 'Complete 3D finite-element structural frame modeling (CSC Orion / Protastructure / STAAD.Pro) to Eurocode 2 & BS 8110 with bar bending schedules.',
    deliverables: [
      'COREN-Stamped Structural Calculation Sheets',
      'Foundation, Column, Beam & Slab GA Drawings',
      'High-Yield Steel Bar Bending Schedule (BBS)',
      'Itemized Multi-Stage Bill of Quantities (BOQ)',
    ],
  },
  {
    code: 'LAB-03',
    title: 'Non-Destructive Structural Integrity Audit (NDT)',
    priceEstimate: 'From ₦1,200,000 / Building',
    turnaround: '4 – 6 Working Days',
    desc: 'Diagnostic structural health testing for existing buildings, distressed structures, or uncompleted shells before vertical extension or remodeling.',
    deliverables: [
      'Ultrasonic Pulse Velocity (UPV) Concrete Scan',
      'Schmidt Rebound Hammer Strength Profiling',
      'Ferroscan Rebar Cover & Diameter Verification',
      'COREN Structural Fitness & Retrofitting Report',
    ],
  },
  {
    code: 'LAB-04',
    title: 'Rotary Bored Piling & Raft Substructure Contracting',
    priceEstimate: 'Custom per Pile / Footing',
    turnaround: '2 – 5 Weeks Mobilization',
    desc: 'Dedicated foundation engineering execution for swampy, coastal, or high-load multi-storey sites using hydraulic rigs and marine-grade C35/45 concrete.',
    deliverables: [
      '450mm – 900mm Diameter Bored Friction Piles',
      'Static & Dynamic Pile Integrity Load Testing',
      'Cellular Waterproofed Raft Substructures',
      '28-Day Concrete Cube Crushing Certificates',
    ],
  },
];

export default function CivilEngineeringServicesPage() {
  const { properties, openEnquiryModal } = usePlatform();
  const [selectedServiceCode, setSelectedServiceCode] = useState('LAB-01');

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
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D3B2E] border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5" /> COREN & NSE Certified Civil Engineering Practice
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Civil & Structural Engineering{' '}
              <span className="text-emerald-400">Divisions & Lab Services.</span>
            </h1>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed">
              From geotechnical soil testing and rotary bored piling to post-tensioned superstructures, structural steel fabrication, and non-destructive building integrity audits—we deliver zero-compromise civil engineering.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-16">
        {/* 5 Core Civil & Structural Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_BUSINESS_PILLARS.map((pillar) => {
            const waLink = buildWhatsAppLink(
              null,
              `Hello Engr. Chibuike Ekeson, I need professional engineering assistance under your "${pillar.title}" division. Please advise on requirements and estimated pricing.`
            );
            const itemsList = pillar.items || pillar.highlights || [];
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-lg bg-[#0A1628] text-emerald-400 text-xs font-mono font-bold">
                      DIVISION {pillar.number}
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D3B2E]">
                      {pillar.badge}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#0A1628] mb-1">
                    {pillar.title}
                  </h2>
                  <p className="text-[11px] font-semibold text-[#0D3B2E] mb-2">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {itemsList.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 text-xs font-semibold text-[#0A1628]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#0D3B2E] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-300" /> Consult Engineer
                  </a>
                  <Link
                    href={pillar.href || '/properties'}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1628] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specialized Geotechnical, Structural Design & NDT Audit Packages */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D3B2E] block mb-1">
              Direct Engineering Commissions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628]">
              Book Soil Testing, Structural Blueprints or Building Integrity Audits
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Even if you already have an architectural sketch, our civil engineering team provides standalone geotechnical borehole investigations, COREN-stamped structural calculations, and non-destructive testing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SPECIALIZED_ENGINEERING_LABS.map((lab) => {
              const waUrl = buildWhatsAppLink(
                null,
                `Hello Engr. Chibuike Ekeson, I want to commission "${lab.title}" (${lab.code} — ${lab.priceEstimate}). Please share your mobilization schedule.`
              );
              return (
                <div
                  key={lab.code}
                  onClick={() => setSelectedServiceCode(lab.code)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedServiceCode === lab.code
                      ? 'bg-[#0A1628] text-white border-[#0A1628] shadow-xl'
                      : 'bg-[#F8FAFC] text-[#0A1628] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                          selectedServiceCode === lab.code
                            ? 'bg-[#0D3B2E] text-emerald-300 border border-emerald-500/30'
                            : 'bg-white text-[#0A1628] border border-slate-200'
                        }`}
                      >
                        {lab.code} • {lab.turnaround}
                      </span>
                      <span
                        className={`text-sm font-mono font-extrabold ${
                          selectedServiceCode === lab.code ? 'text-emerald-400' : 'text-[#0D3B2E]'
                        }`}
                      >
                        {lab.priceEstimate}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold mb-2">{lab.title}</h3>
                    <p
                      className={`text-xs leading-relaxed mb-5 ${
                        selectedServiceCode === lab.code ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {lab.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {lab.deliverables.map((del) => (
                        <div
                          key={del}
                          className={`p-2.5 rounded-xl text-[11px] font-semibold flex items-center gap-2 ${
                            selectedServiceCode === lab.code
                              ? 'bg-white/5 text-slate-200 border border-white/10'
                              : 'bg-white text-slate-700 border border-slate-200/70'
                          }`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-300" />
                      Book via WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEnquiryModal(properties[0], lab.title);
                      }}
                      className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedServiceCode === lab.code
                          ? 'bg-white text-[#0A1628] hover:bg-slate-100'
                          : 'bg-[#0A1628] text-white hover:bg-slate-800'
                      }`}
                    >
                      Request Formal Proposal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Foundation Selection Matrix */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D3B2E] block">
              Substructure & Geotechnical Reference
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A1628] mt-1">
              Foundation System Selection by Soil Bearing Capacity
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A1628] text-white text-[11px] font-mono uppercase">
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Foundation System</th>
                  <th className="py-3.5 px-4">Soil Bearing</th>
                  <th className="py-3.5 px-4">Typical Depth</th>
                  <th className="py-3.5 px-4">Concrete & Rebar Spec</th>
                  <th className="py-3.5 px-4">Typical Nigerian Zones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {FOUNDATION_SELECTION_GUIDE.map((f) => (
                  <tr key={f.code} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0D3B2E]">{f.code}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0A1628]">{f.type}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#0D3B2E]">
                      {f.bearingCapacity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{f.typicalDepth}</td>
                    <td className="py-3.5 px-4 text-slate-700">{f.concreteSpec}</td>
                    <td className="py-3.5 px-4 text-slate-600">{f.idealSoilZones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 11-Point Comprehensive Civil Engineering Capabilities */}
        <div className="bg-[#0A1628] text-white rounded-3xl p-8 sm:p-10 border border-white/10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Complete Technical Scope
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                11 Specialized Civil, Structural & MEP Capabilities
              </h2>
            </div>
            <button
              type="button"
              onClick={() => openEnquiryModal(null, 'Turnkey Building Construction')}
              className="px-5 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 border border-emerald-400/40 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 self-start cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>Request Technical Bid</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROPERTY_MANAGEMENT_SERVICES.map((srv, idx) => (
              <div
                key={srv.title}
                className="bg-[#11223E] rounded-2xl p-5 border border-white/10 space-y-2"
              >
                <span className="text-xs font-mono font-bold text-emerald-400">
                  CAPABILITY {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-base font-bold text-white">{srv.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{srv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
