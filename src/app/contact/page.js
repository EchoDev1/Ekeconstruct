'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  HardHat,
  Calculator,
  Compass,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import { COMPANY_INFO, formatPrice, buildWhatsAppLink } from '@/data/seedData';

export default function ContactCivilEngineerPage() {
  const { properties, currency, submitQuoteRequest } = usePlatform();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    structureId: 'struct-1',
    buildScope: 'Standard Turnkey Execution',
    siteLocation: '',
    plotSizeSqm: '600',
    needSoilTest: 'Yes — Include CPT/Borehole Soil Investigation',
    notes: '',
  });

  const selectedPlan =
    properties.find((p) => p.id === formData.structureId) || properties[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuoteRequest({
      ...formData,
      propertyId: selectedPlan?.id,
      propertyTitle: selectedPlan?.title,
    });
    setSubmitted(true);
  };

  const whatsappDirectHref = buildWhatsAppLink(
    `Hello Engr. Chibuike Ekeson, I am reaching out from the Contact & Engineering Desk:\n\n• Name: ${formData.name || 'Prospective Client'}\n• Selected Building Structure: ${selectedPlan?.title || 'Custom Structure'}\n• Preferred Scope: ${formData.buildScope}\n• Site Location: ${formData.siteLocation || 'To be confirmed'}\n• Plot Size: ${formData.plotSizeSqm} sqm\n• Soil Test Needed: ${formData.needSoilTest}\n\nPlease share the estimated construction cost and schedule a technical call.`
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
              <HardHat className="w-3.5 h-3.5" /> Direct Civil & Structural Engineering Desk
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Request Building Cost, BOQ or{' '}
              <span className="text-emerald-400">Geotechnical Soil Test.</span>
            </h1>
            <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
              Speak directly with {COMPANY_INFO.principalEngineer} and our Quantity Surveying team. Select a building plan below to request a formal Bill of Quantities (BOQ) or launch an instant WhatsApp engineering consultation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Engineering Offices & Instant WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A1628] text-white rounded-3xl p-7 border border-white/10 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                  Principal Civil Engineer Direct Line
                </span>
                <h2 className="text-xl font-bold mt-1">{COMPANY_INFO.principalEngineer}</h2>
                <p className="text-xs text-slate-300 mt-1">{COMPANY_INFO.certification}</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Engineering Desk & Site Hotline</span>
                    <span className="font-bold text-white text-sm">{COMPANY_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">BOQ & Structural Submissions</span>
                    <span className="font-bold text-white text-sm">{COMPANY_INFO.email}</span>
                  </div>
                </div>

                {COMPANY_INFO.offices?.map((off, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-300 font-bold block">{off.city} Office</span>
                      <span className="text-slate-300">{off.address}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={whatsappDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 border border-emerald-400/40 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                Chat Directly on WhatsApp for Build Price
              </a>
            </div>
          </div>

          {/* Right Column: Engineering BOQ & Soil Test Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-lg">
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#0D3B2E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A1628]">
                    Engineering Brief & BOQ Request Logged
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Your selected building structure (<strong>{selectedPlan?.title}</strong>) and site parameters have been registered. Click below to continue the conversation immediately on WhatsApp with Engr. Chibuike Ekeson.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                      href={whatsappDirectHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-300" /> Open WhatsApp with This Brief
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3.5 rounded-xl bg-slate-100 text-[#0A1628] text-xs font-bold uppercase tracking-wider"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0D3B2E] block mb-1">
                      Bill of Quantities & Site Mobilization Brief
                    </span>
                    <h2 className="text-2xl font-bold text-[#0A1628]">
                      Pick Your Building Structure & Submit Site Details
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Full Name / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Chief / Engr. Obinna Nwosu"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+234 803 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Select Building Structure Plan (Shows Estimated Turnkey Cost)
                      </label>
                      <select
                        value={formData.structureId}
                        onChange={(e) => setFormData({ ...formData, structureId: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-[#0A1628]"
                      >
                        {properties.map((p) => (
                          <option key={p.id} value={p.id}>
                            [{p.structuralCode || p.id.toUpperCase()}] {p.title} — Est. Turnkey:{' '}
                            {formatPrice(p.standardPriceNGN || p.priceNGN, currency)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Preferred Construction Scope
                        </label>
                        <select
                          value={formData.buildScope}
                          onChange={(e) => setFormData({ ...formData, buildScope: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                        >
                          <option>Carcass / Structural Shell Only</option>
                          <option>Standard Turnkey Execution</option>
                          <option>Luxury Spec Turnkey Execution</option>
                          <option>Structural Blueprints & BOQ Package Only</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Site Location (City / State) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lekki Phase 1, Lagos or Guzape, Abuja"
                          value={formData.siteLocation}
                          onChange={(e) =>
                            setFormData({ ...formData, siteLocation: e.target.value })
                          }
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Land / Plot Size (sqm)
                        </label>
                        <input
                          type="text"
                          value={formData.plotSizeSqm}
                          onChange={(e) =>
                            setFormData({ ...formData, plotSizeSqm: e.target.value })
                          }
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Geotechnical Soil Investigation
                        </label>
                        <select
                          value={formData.needSoilTest}
                          onChange={(e) =>
                            setFormData({ ...formData, needSoilTest: e.target.value })
                          }
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                        >
                          <option>Yes — Include CPT/Borehole Soil Investigation</option>
                          <option>Already Have Soil Report (Will Share PDF)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Structural Customizations / Engineering Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mention any custom floor adjustments, penthouses, basement parking, or timeline targets..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-4 px-5 rounded-xl bg-[#0A1628] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4 text-emerald-400" />
                        Log Official BOQ Request
                      </button>
                      <a
                        href={whatsappDirectHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-4 px-5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-300" />
                        Send Directly to WhatsApp
                      </a>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
