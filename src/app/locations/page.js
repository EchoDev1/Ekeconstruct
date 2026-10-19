'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Compass,
  Layers,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Plus,
  Activity,
  HardHat,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import PropertyCard from '@/components/PropertyCard';
import { buildWhatsAppLink, FOUNDATION_SELECTION_GUIDE } from '@/data/seedData';

export default function GeotechnicalZonesPage() {
  const { locations, properties, addNewLocation } = usePlatform();
  const [selectedState, setSelectedState] = useState('All');
  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [zoneForm, setZoneForm] = useState({
    name: '',
    state: 'Lagos',
    description: '',
    soilProfile: 'Firm Lateritic Clay (165 kN/m²)',
    recommendedFoundation: 'Reinforced Concrete Pad & Strip Foundation',
    averageYield: '165 kN/m² Bearing',
    tag: 'Verified Soil Log',
    image: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1000&q=80',
  });

  const matchingStructures =
    selectedState === 'All'
      ? properties
      : properties.filter(
          (p) =>
            p.state?.toLowerCase() === selectedState.toLowerCase() ||
            p.location?.toLowerCase().includes(selectedState.toLowerCase())
        );

  const handleCreateZone = (e) => {
    e.preventDefault();
    if (!zoneForm.name) return;
    addNewLocation({
      ...zoneForm,
      city: zoneForm.state,
      neighbourhood: zoneForm.name,
    });
    setShowAddZoneModal(false);
    setZoneForm({
      name: '',
      state: 'Lagos',
      description: '',
      soilProfile: 'Firm Lateritic Clay (165 kN/m²)',
      recommendedFoundation: 'Reinforced Concrete Pad & Strip Foundation',
      averageYield: '165 kN/m² Bearing',
      tag: 'Verified Soil Log',
      image: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1000&q=80',
    });
  };

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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D3B2E] border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-4">
                <Compass className="w-3.5 h-3.5" /> Regional Geotechnical Soil Atlas & Foundation Zones
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
                Soil Bearing Profiles &{' '}
                <span className="text-emerald-400">Foundation Engineering Zones.</span>
              </h1>
              <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
                Every building structure must be engineered for the ground it stands on. Explore our regional geotechnical soil profiles across Lagos, Abuja, Rivers, Enugu, and Anambra to see recommended foundation systems and allowable soil bearing capacities (kN/m²).
              </p>
            </div>

            <button
              onClick={() => setShowAddZoneModal(true)}
              className="px-5 py-3.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 border border-emerald-500/40 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4 text-emerald-300" /> Log New Geotechnical Zone
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-16">
        {/* Geotechnical Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((zone) => {
            const zoneTitle = zone.name || `${zone.city} — ${zone.neighbourhood}`;
            const zoneTag = zone.tag || `${zone.propertyCount || 3} Matched Blueprints`;
            const waUrl = buildWhatsAppLink(
              `Hello Engr. Chibuike Ekeson, my land is located in ${zoneTitle} (${zone.state}). Based on your geotechnical profile (${zone.soilProfile || zone.averageYield}), please advise on soil testing and estimated foundation/building costs.`
            );
            return (
              <div
                key={zone.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-52 bg-[#0A1628] overflow-hidden">
                  <img
                    src={zone.image}
                    alt={zoneTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/35 to-transparent" />
                  <div className="absolute top-3.5 left-3.5 flex gap-2">
                    <span className="px-3 py-1 rounded-lg bg-[#0A1628]/90 text-white text-xs font-bold">
                      {zone.state}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#0D3B2E] text-emerald-300 text-xs font-bold">
                      {zoneTag}
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h2 className="text-lg font-bold">{zoneTitle}</h2>
                    <p className="text-xs text-emerald-300 font-semibold">
                      Allowable Bearing: {zone.averageYield}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">{zone.description}</p>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Subsoil Stratigraphy
                        </span>
                        <span className="text-xs font-bold text-[#0A1628]">
                          {zone.soilProfile || 'Subsoil CPT/SPT Verified'}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-200/70">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Recommended Foundation System
                        </span>
                        <span className="text-xs font-bold text-[#0D3B2E]">
                          {zone.recommendedFoundation || 'Reinforced Concrete Raft / Pile System'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedState(zone.state)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1628] text-xs font-bold transition-all"
                    >
                      Structures for {zone.state}
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-300" /> Soil & Build Quote
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Foundation Selection & Bearing Capacity Matrix */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D3B2E] block mb-1">
              Substructure Selection Schedule (BS 8004 / Eurocode 7)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1628]">
              Geotechnical Bearing Capacity vs. Foundation Engineering Matrix
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr className="border-b-2 border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50">
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Soil Condition & Stratigraphy</th>
                  <th className="py-3.5 px-4">Allowable Bearing</th>
                  <th className="py-3.5 px-4">Recommended Foundation System</th>
                  <th className="py-3.5 px-4">Typical Regions</th>
                  <th className="py-3.5 px-4">Substructure Cost Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-xs">
                {FOUNDATION_SELECTION_GUIDE.map((row) => (
                  <tr key={row.code} className="hover:bg-slate-50/90">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0D3B2E]">{row.code}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0A1628]">{row.soilType}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{row.bearingCapacity}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#0D3B2E]">{row.recommendedFoundation}</td>
                    <td className="py-3.5 px-4 text-slate-600">{row.typicalZones}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0A1628]">{row.costImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Building Structures Engineered for Selected Geotechnical Zone */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D3B2E] block mb-2">
                Zone-Matched Structural Designs
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628]">
                Building Structures Engineered for{' '}
                {selectedState === 'All' ? 'All Nigerian Soil Zones' : `${selectedState} Subsoil`}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Lagos', 'FCT Abuja', 'Rivers', 'Enugu', 'Anambra'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedState === st
                      ? 'bg-[#0A1628] text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {st === 'All' ? 'All Zones' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(matchingStructures.length > 0 ? matchingStructures : properties).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal to Add New Geotechnical Soil Zone */}
      {showAddZoneModal && (
        <div className="fixed inset-0 z-50 bg-[#0A1628]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D3B2E] block">
                  Geotechnical Engineering Registry
                </span>
                <h3 className="text-lg font-bold text-[#0A1628]">
                  Log New Regional Soil & Foundation Zone
                </h3>
              </div>
              <button
                onClick={() => setShowAddZoneModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateZone} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Zone / Corridor Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Epe — Ibeju Industrial Axis"
                    value={zoneForm.name}
                    onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos"
                    value={zoneForm.state}
                    onChange={(e) => setZoneForm({ ...zoneForm, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Soil Stratigraphy Profile
                  </label>
                  <input
                    type="text"
                    value={zoneForm.soilProfile}
                    onChange={(e) => setZoneForm({ ...zoneForm, soilProfile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Allowable Bearing Capacity
                  </label>
                  <input
                    type="text"
                    value={zoneForm.averageYield}
                    onChange={(e) => setZoneForm({ ...zoneForm, averageYield: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Recommended Foundation System
                </label>
                <input
                  type="text"
                  value={zoneForm.recommendedFoundation}
                  onChange={(e) =>
                    setZoneForm({ ...zoneForm, recommendedFoundation: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Geotechnical Engineering Notes
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe water table depth, CPT resistance, and concrete grade requirements..."
                  value={zoneForm.description}
                  onChange={(e) => setZoneForm({ ...zoneForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#0A1628]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddZoneModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0D3B2E] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Geotechnical Zone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
