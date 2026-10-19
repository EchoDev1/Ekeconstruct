'use client';

import React from 'react';
import Link from 'next/link';
import {
  HardHat,
  ShieldCheck,
  Compass,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Scale,
  Ruler,
  Wrench,
} from 'lucide-react';
import { COMPANY_INFO, buildWhatsAppLink } from '@/data/seedData';

const ENGINEERING_LEADERSHIP = [
  {
    name: 'Engr. Chibuike Ekeson, FNSE, COREN',
    role: 'Principal Partner & Chief Civil / Structural Engineer',
    credentials: 'B.Eng (Civil), M.Sc (Structural Engineering), COREN Reg., Fellow NSE',
    bio: 'Over 16 years leading deep foundation piling, post-tensioned multi-storey frames, industrial steel portal structures, and heavy civil infrastructure across Lagos, Abuja, Port Harcourt, and the South-East.',
  },
  {
    name: 'Engr. Dr. Kenechukwu Okafor, COREN',
    role: 'Head of Geotechnical & Substructure Engineering',
    credentials: 'Ph.D (Geotechnical Engineering), MNICE, COREN Reg.',
    bio: 'Specializes in coastal lagoon subsoil mechanics, rotary bored friction piles, cellular raft foundations, and slope stabilization retaining walls.',
  },
  {
    name: 'Arc. Toluwalase Adeyemi, MNIA, ARCON',
    role: 'Lead Structural-Architectural Coordinator & BIM Director',
    credentials: 'M.Arch, ARCON Reg., Autodesk Revit Structure Specialist',
    bio: 'Integrates architectural spatial design with structural frame grids, ensuring zero clash between reinforced concrete shear walls, MEP ducts, and contemporary facades.',
  },
  {
    name: 'QS. Somtochukwu Nwosu, MNIQS, RQS',
    role: 'Chief Quantity Surveyor & Cost Engineering Lead',
    credentials: 'B.Sc (Quantity Surveying), RQS Reg., MNIQS',
    bio: 'Leads precision Bill of Quantities (BOQ) preparation, high-yield steel bar bending optimization, concrete volume auditing, and stage-by-stage construction cost control.',
  },
];

const QUALITY_STANDARDS = [
  {
    code: 'BS EN 1992 (Eurocode 2)',
    title: 'Reinforced & Pre-Stressed Concrete Design',
    desc: 'All beams, columns, shear cores, and slabs are designed for ultimate limit state (ULS) and deflection serviceability limit state (SLS) compliance.',
  },
  {
    code: 'BS EN 1993 (Eurocode 3)',
    title: 'Structural Steelwork & Portal Trusses',
    desc: 'Universal I-beams, lattice space trusses, and HSFG bolted connections engineered for extreme wind uplift and crane gantry loading.',
  },
  {
    code: 'BS 8004 & ASTM D1586',
    title: 'Geotechnical Foundation & Piling Protocol',
    desc: 'Mandatory Cone Penetration Testing (CPT) and percussion borehole soil logs prior to foundation sizing on every site.',
  },
  {
    code: 'BS 1881 Concrete Cube Testing',
    title: '7-Day, 14-Day & 28-Day Crushing Audits',
    desc: 'Every concrete pour is sampled and laboratory-crushed to verify C30/37, C35/45, or C40/50 compressive strength before formwork stripping.',
  },
];

export default function AboutCivilEngineersPage() {
  const whatsappHref = buildWhatsAppLink(
    'Hello Engr. Chibuike Ekeson, I reviewed your Civil & Structural Engineering credentials on Ekesonconstruct and would like to discuss my upcoming building project.'
  );

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
              <Award className="w-3.5 h-3.5" /> {COMPANY_INFO.certification}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Built by Civil & Structural Engineers.{' '}
              <span className="text-emerald-400">Engineered for Generations.</span>
            </h1>
            <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
              {COMPANY_INFO.name} is a premier Civil & Structural Engineering and Turnkey Construction firm—not a property brokerage. Every building structure on our platform is calculated, detailed, priced, and constructed under strict COREN, NSE, and Eurocode engineering standards.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-16">
        {/* Key Engineering Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Delivered Building & Civil Structures', value: '140+ Projects', sub: 'Across 14 Nigerian States' },
            { label: 'Concrete Poured & Audited', value: '68,500+ m³', sub: '100% 28-Day Cube Test Pass' },
            { label: 'Structural Steel & Rebar Installed', value: '9,200+ Tonnes', sub: '460 N/mm² High-Yield TMT' },
            { label: 'Structural Safety & Zero Collapse Record', value: '100% Certified', sub: '25-Year Structural Warranty' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0A1628] block">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-[#0D3B2E] mt-1 block">{stat.label}</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* Principal Engineer & Technical Leadership */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D3B2E] block mb-2">
              Technical Directorate
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628]">
              Meet Our Chartered Civil, Structural & Cost Engineers
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Direct engineering accountability from soil investigation and structural frame calculations to turnkey site execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGINEERING_LEADERSHIP.map((leader, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-lg bg-[#0A1628] text-emerald-400 text-[11px] font-bold">
                      {leader.role}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-[#0D3B2E] shrink-0" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A1628]">{leader.name}</h3>
                  <p className="text-xs font-semibold text-[#0D3B2E] mt-0.5 mb-3">
                    {leader.credentials}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Structural Design Codes & Quality Assurance Protocol */}
        <div className="bg-[#0A1628] text-white rounded-3xl p-8 sm:p-10 border border-white/10">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
              Zero-Compromise Structural Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              International Engineering Codes & Laboratory Quality Control
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUALITY_STANDARDS.map((std, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2"
              >
                <span className="text-xs font-mono font-bold text-emerald-400 block">
                  {std.code}
                </span>
                <h3 className="text-base font-bold text-white">{std.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-300">
              Want to inspect our structural calculation sheets or discuss building on your land?
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 border border-emerald-400/40 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" /> Chat with Engr. Ekeson on WhatsApp
              </a>
              <Link
                href="/properties"
                className="px-5 py-3 rounded-xl bg-white text-[#0A1628] hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                Explore Building Structures <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
