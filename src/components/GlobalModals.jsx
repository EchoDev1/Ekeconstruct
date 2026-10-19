'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  X,
  CheckCircle2,
  MailCheck,
  MessageCircle,
  CreditCard,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Lock,
  FileUp,
  Calculator,
  ArrowRight,
  HardHat,
  Wrench,
} from 'lucide-react';
import { usePlatform } from '@/context/PlatformContext';
import {
  buildWhatsAppLink,
  CURRENCIES,
  NIGERIAN_STATES_AND_ZONES,
  calculatePersonalDesignValuation,
} from '@/data/seedData';

export default function GlobalModals() {
  const {
    user,
    currency,
    formatPrice,
    activeToast,
    setActiveToast,
    enquiryModal,
    closeEnquiryModal,
    submitEnquiry,
    listPropertyModalOpen,
    setListPropertyModalOpen,
    submitDesignForValuation,
    paymentModal,
    closePaymentModal,
    processPayment,
    authModalOpen,
    setAuthModalOpen,
    registerOrSignIn,
    specialistAgents,
    specialistModal,
    openSpecialistModal,
    closeSpecialistModal,
    connectWithSpecialist,
  } = usePlatform();

  // Specialist Modal Connection State
  const [specForm, setSpecForm] = useState({
    selectedCovering: '',
    projectLocation: 'Abuja / Lagos / Enugu',
    buildingStage: '',
    userMessage: '',
  });
  const [specConnectedRecord, setSpecConnectedRecord] = useState(null);

  useEffect(() => {
    if (specialistModal?.open && specialistModal?.specialist) {
      const sp = specialistModal.specialist;
      setSpecConnectedRecord(null);
      setSpecForm({
        selectedCovering: sp.mainCovering?.[0] || '',
        projectLocation: user?.stateOrigin || 'Abuja / Lagos / Enugu',
        buildingStage: sp.stageNeeded || 'Before Starting Foundation',
        userMessage: sp.commonQuestions?.[0] || `Hello ${sp.leadName}, I need your specialist service for my building project.`,
      });
    }
  }, [specialistModal, user]);

  // 1. Building Cost & BOQ Enquiry Form State
  const [enqForm, setEnqForm] = useState({
    enquiryType: 'Building Cost & Material List (BOQ) Quote',
    fullName: '',
    email: '',
    phone: '',
    preferredLocation: 'Abuja (FCT)',
    propertyType: 'Detached Duplex',
    budget: '',
    purpose: 'Full Move-In Build (Foundation to Key Handover)',
    preferredDate: '',
    message: '',
  });
  const [enqSuccess, setEnqSuccess] = useState(null);

  useEffect(() => {
    if (enquiryModal.open) {
      setEnqSuccess(null);
      setEnqForm({
        enquiryType:
          enquiryModal.defaultType || 'Building Cost & Material List (BOQ) Quote',
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        preferredLocation: enquiryModal.property
          ? `${enquiryModal.property.city} (My Land)`
          : user?.city || 'Abuja / Lagos / Enugu',
        propertyType: enquiryModal.property?.propertyType || 'Detached Duplex',
        budget: enquiryModal.property ? formatPrice(enquiryModal.property.priceNGN) : '',
        purpose: 'Full Move-In Build (Foundation to Key Handover)',
        preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        message: enquiryModal.property
          ? `Hello Engr. Ekeson, I like the "${enquiryModal.property.title}" [Plan ID: ${enquiryModal.property.reference}]. Please send me the full Material List (bags of cement, blocks, iron rods), recommended foundation for my land, and stage-by-stage payment schedule.`
          : 'Hello Ekesonconstruct, I want to know how much it will cost to build a house on my land in Nigeria, including cement bags, blocks, and iron rods.',
      });
    }
  }, [enquiryModal, user, formatPrice]);

  // 2. Submit Personal Design for Instant Valuation Modal State
  const [valForm, setValForm] = useState({
    designTitle: '',
    buildingType: 'Detached Duplex (G+1)',
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    estimatedSqm: 340,
    plotSizeSqm: 600,
    stateZoneId: 'abuja-fct',
    soilCondition: 'Firm Dry Land',
    finishLevel: 'Standard Move-In (Turnkey)',
    drawingFileName: '',
    specialFeatures: 'Penthouse room, security gatehouse, and solar inverter readiness',
    notes: '',
  });
  const [submittedValuation, setSubmittedValuation] = useState(null);

  const liveValuationPreview = useMemo(
    () => calculatePersonalDesignValuation(valForm),
    [valForm]
  );

  useEffect(() => {
    if (listPropertyModalOpen) {
      setSubmittedValuation(null);
    }
  }, [listPropertyModalOpen]);

  // 3. Payment / Service Booking Form State
  const [payForm, setPayForm] = useState({
    paymentType: 'Complete House Plan & Material List (BOQ) Pack',
    amountNGN: 2200000,
    payerName: '',
    payerEmail: '',
  });
  const [payReceipt, setPayReceipt] = useState(null);

  useEffect(() => {
    if (paymentModal.open) {
      setPayReceipt(null);
      setPayForm({
        paymentType:
          paymentModal.defaultType || 'Complete House Plan & Material List (BOQ) Pack',
        amountNGN: paymentModal.defaultAmountNGN || 2200000,
        payerName: user?.fullName || '',
        payerEmail: user?.email || '',
      });
    }
  }, [paymentModal, user]);

  // 4. User Profile / Account Modal State (Single User Role Only)
  const [authForm, setAuthForm] = useState({
    mode: 'signin',
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || 'Abuja (FCT)',
    password: '',
  });

  useEffect(() => {
    if (authModalOpen && user) {
      setAuthForm((prev) => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || 'Abuja (FCT)',
      }));
    }
  }, [authModalOpen, user]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const record = await submitEnquiry({
      ...enqForm,
      propertyId: enquiryModal.property?.id,
      propertyReference: enquiryModal.property?.reference || 'EKC-BUILD-QUOTE',
      propertyTitle: enquiryModal.property?.title || enqForm.enquiryType,
    });
    setEnqSuccess(record);
  };

  const handlePersonalValuationSubmit = async (e) => {
    e.preventDefault();
    const record = await submitDesignForValuation({
      ...valForm,
      designTitle:
        valForm.designTitle.trim() ||
        `My ${valForm.bedrooms}-Bedroom ${valForm.buildingType.split('(')[0].trim()} Plan`,
    });
    setSubmittedValuation(record);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const receipt = await processPayment({
      propertyReference: paymentModal.property?.reference || 'EKC-PLAN-PACK',
      propertyTitle: paymentModal.property?.title || payForm.paymentType,
      payerName: payForm.payerName,
      payerEmail: payForm.payerEmail,
      paymentType: payForm.paymentType,
      amountNGN: Number(payForm.amountNGN),
    });
    setPayReceipt(receipt);
  };

  return (
    <>
      {/* 1. REAL-TIME TOAST NOTIFICATION BANNER */}
      {activeToast && (
        <div className="fixed bottom-24 right-5 z-50 max-w-md w-full bg-[#0A1628] text-white border-l-4 border-emerald-400 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0D3B2E] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide text-emerald-300 uppercase">
                  {activeToast.title}
                </p>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {activeToast.message}
                </p>
                {activeToast.emailRecipient && (
                  <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-emerald-300 font-mono">
                    <MailCheck className="w-3.5 h-3.5" />
                    <span>Sent to {activeToast.emailRecipient}</span>
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveToast(null)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. BUILDING COST, MATERIAL LIST (BOQ) & ENGINEER CONSULTATION MODAL */}
      {enquiryModal.open && (
        <div className="fixed inset-0 z-50 bg-[#0A1628]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-[#0A1628] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                  {enquiryModal.property?.reference || 'EKESONCONSTRUCT NIGERIA COST DESK'}
                </span>
                <h3 className="font-serif text-xl font-bold mt-0.5">
                  {enquiryModal.property
                    ? `Get Full Building Cost: ${enquiryModal.property.title}`
                    : 'Ask Building Cost, Material List or Soil Test'}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeEnquiryModal}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {enqSuccess ? (
              <div className="p-6 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0D3B2E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#0A1628]">
                  Request Received! Your Cost Breakdown Is Ready
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your building request (
                  <span className="font-mono font-semibold">{enqSuccess.propertyReference}</span>) has been saved to your User Dashboard and emailed to{' '}
                  <span className="font-semibold text-[#0A1628]">{enqSuccess.email}</span>.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-1.5 font-mono">
                  <div>STATUS: {enqSuccess.status}</div>
                  <div>SERVICE: {enqSuccess.enquiryType}</div>
                  <div>LAND LOCATION: {enqSuccess.preferredLocation}</div>
                  <div>BUILDING OPTION: {enqSuccess.purpose}</div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={buildWhatsAppLink(enquiryModal.property, enqForm.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D3B2E] hover:bg-[#145340] text-white text-xs font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Chat With Engr. Ekeson on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={closeEnquiryModal}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      What Do You Need Help With?
                    </label>
                    <select
                      value={enqForm.enquiryType}
                      onChange={(e) => setEnqForm({ ...enqForm, enquiryType: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0A1628]"
                    >
                      <option value="Building Cost & Material List (BOQ) Quote">
                        House Building Cost & Material List (Cement, Blocks, Rods)
                      </option>
                      <option value="Full Turnkey House Construction">
                        Build My House From Foundation to Key Handover (Turnkey)
                      </option>
                      <option value="Carcass / Roofed Shell Construction Only">
                        Build Carcass Only (Foundation, Blockwork & Roof)
                      </option>
                      <option value="Soil Test & Foundation Recommendation">
                        Soil Test & Foundation Design (Dry, Swampy or Waterlogged Land)
                      </option>
                      <option value="Custom House Plan & COREN Drawings">
                        Draw a Custom House Plan & COREN Structural Drawings
                      </option>
                      <option value="Building Strength Check (Uncompleted Building)">
                        Test an Existing or Uncompleted Building Before Buying
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      When Do You Plan to Start?
                    </label>
                    <input
                      type="date"
                      value={enqForm.preferredDate}
                      onChange={(e) => setEnqForm({ ...enqForm, preferredDate: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0A1628]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enqForm.fullName}
                      onChange={(e) => setEnqForm({ ...enqForm, fullName: e.target.value })}
                      placeholder="e.g. Chinedu Okafor"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={enqForm.email}
                      onChange={(e) => setEnqForm({ ...enqForm, email: e.target.value })}
                      placeholder="you@gmail.com"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={enqForm.phone}
                      onChange={(e) => setEnqForm({ ...enqForm, phone: e.target.value })}
                      placeholder="+234 803..."
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Where Is Your Land Located? (State / Town & Plot Size)
                    </label>
                    <input
                      type="text"
                      value={enqForm.preferredLocation}
                      onChange={(e) =>
                        setEnqForm({ ...enqForm, preferredLocation: e.target.value })
                      }
                      placeholder="e.g. Lugbe Abuja or Lekki Lagos (600 sqm)"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Build Option / Target Budget ({currency})
                    </label>
                    <input
                      type="text"
                      value={enqForm.budget}
                      onChange={(e) => setEnqForm({ ...enqForm, budget: e.target.value })}
                      placeholder="e.g. Carcass Only or Full Move-In"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tell Us About Your Land or What You Want to Build
                  </label>
                  <textarea
                    rows={3}
                    value={enqForm.message}
                    onChange={(e) => setEnqForm({ ...enqForm, message: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <a
                    href={buildWhatsAppLink(enquiryModal.property, enqForm.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D3B2E] hover:underline"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Or Chat on WhatsApp Instead</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={closeEnquiryModal}
                      className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-[#0A1628] hover:bg-[#0D3B2E] text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Send & Get My Cost Breakdown
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. SUBMIT PERSONAL DESIGN FOR INSTANT VALUATION MODAL */}
      {listPropertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A1628]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-[#0D3B2E] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileUp className="w-5 h-5 text-emerald-300" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-200 block">
                    Personal House Plan Valuation • Nigerian Cost & Material Calculator
                  </span>
                  <h3 className="font-serif text-xl font-bold">
                    Submit Your Personal Design for Instant Valuation
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setListPropertyModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedValuation ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <CheckCircle2 className="w-7 h-7 text-[#0D3B2E] shrink-0" />
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#0D3B2E] font-bold">
                      Valuation Certificate #{submittedValuation.id} Saved to Your Dashboard
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#0A1628]">
                      {submittedValuation.designTitle} ({submittedValuation.stateName})
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Carcass (Roofed Shell)
                    </span>
                    <span className="text-base font-mono font-bold text-[#0A1628]">
                      {formatPrice(submittedValuation.carcassCostNGN)}
                    </span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    <span className="text-[10px] font-mono uppercase text-[#0D3B2E] font-bold block">
                      Selected Cost ({submittedValuation.finishLevel.split(' ')[0]})
                    </span>
                    <span className="text-base font-mono font-bold text-[#0D3B2E]">
                      {formatPrice(submittedValuation.selectedCostNGN)}
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Safe Foundation
                    </span>
                    <span className="text-xs font-bold text-[#0A1628] block mt-0.5">
                      {submittedValuation.recommendedFoundation}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 bg-[#0A1628] text-white rounded-xl p-4 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase block">
                      50kg Cement Bags
                    </span>
                    <span className="text-base font-mono font-bold">
                      {submittedValuation.materials.cementBags.toLocaleString()} Bags
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase block">
                      9-Inch Blocks
                    </span>
                    <span className="text-base font-mono font-bold">
                      {submittedValuation.materials.blocks9Inch.toLocaleString()} Blocks
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase block">
                      Iron Rods (Steel)
                    </span>
                    <span className="text-base font-mono font-bold">
                      {submittedValuation.materials.steelTonnes} Tonnes
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Link
                    href="/dashboard?tab=valuation"
                    onClick={() => setListPropertyModalOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-[#145340] text-white text-xs font-bold"
                  >
                    <span>Open Full Valuation in My Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setListPropertyModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePersonalValuationSubmit} className="p-6 space-y-4">
                <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3">
                  Already have an architect&apos;s drawing, floor plan photo, or house idea? Enter the details below to get an instant Nigerian building valuation (Naira cost, cement bags, blocks, iron rods, and 6-stage payment plan).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Name of Your House Design *
                    </label>
                    <input
                      type="text"
                      required
                      value={valForm.designTitle}
                      onChange={(e) => setValForm({ ...valForm, designTitle: e.target.value })}
                      placeholder="e.g. My 4-Bedroom Family Duplex in Enugu or Lekki"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Type of Building *
                    </label>
                    <select
                      value={valForm.buildingType}
                      onChange={(e) => setValForm({ ...valForm, buildingType: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    >
                      <option value="Bungalow (Single Floor)">Bungalow (Single Floor)</option>
                      <option value="Penthouse Bungalow">Bungalow + Penthouse</option>
                      <option value="Detached Duplex (G+1)">Detached Duplex (Upstairs)</option>
                      <option value="Semi-Detached / Terrace Duplex">
                        Semi-Detached / Terrace Duplex
                      </option>
                      <option value="Block of Flats (2–3 Floors)">
                        Block of Flats (Rental Apartments)
                      </option>
                      <option value="Commercial Plaza / Mini-Warehouse">
                        Commercial Plaza / Warehouse
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State / Location in Nigeria *
                    </label>
                    <select
                      value={valForm.stateZoneId}
                      onChange={(e) => setValForm({ ...valForm, stateZoneId: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    >
                      {NIGERIAN_STATES_AND_ZONES.map((z) => (
                        <option key={z.id} value={z.id}>
                          {z.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      How Is the Ground / Soil on Your Land? *
                    </label>
                    <select
                      value={valForm.soilCondition}
                      onChange={(e) => setValForm({ ...valForm, soilCondition: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    >
                      <option value="Firm Dry Land">Firm Dry Land (Normal Ground)</option>
                      <option value="Rocky / Sloping Ground">Rocky or Sloping Ground</option>
                      <option value="Soft / Clayey Ground">
                        Soft or Clayey Ground (Holds Water)
                      </option>
                      <option value="Waterlogged / Swampy / Coastal">
                        Waterlogged / Swampy / Coastal Land
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Finishing Level *
                    </label>
                    <select
                      value={valForm.finishLevel}
                      onChange={(e) => setValForm({ ...valForm, finishLevel: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    >
                      <option value="Carcass Only (Roofed Shell)">
                        Carcass Only (Foundation, Blockwork & Roof)
                      </option>
                      <option value="Standard Move-In (Turnkey)">
                        Standard Move-In (Complete & Painted)
                      </option>
                      <option value="Luxury Executive Finish">
                        Luxury Finish (Premium Tiles & Smart Fittings)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:col-span-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={valForm.bedrooms}
                        onChange={(e) =>
                          setValForm({ ...valForm, bedrooms: Number(e.target.value) })
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Floor Size (sqm)
                      </label>
                      <input
                        type="number"
                        min={60}
                        max={3000}
                        value={valForm.estimatedSqm}
                        onChange={(e) =>
                          setValForm({ ...valForm, estimatedSqm: Number(e.target.value) })
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Plot Size (sqm)
                      </label>
                      <input
                        type="number"
                        min={150}
                        max={5000}
                        value={valForm.plotSizeSqm}
                        onChange={(e) =>
                          setValForm({ ...valForm, plotSizeSqm: Number(e.target.value) })
                        }
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Attach Your Drawing / Sketch File (PDF, JPG, PNG or DWG — Optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.dwg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValForm({ ...valForm, drawingFileName: file.name });
                        }
                      }}
                      className="w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-700"
                    />
                  </div>
                </div>

                {/* Live Instant Preview Bar */}
                <div className="bg-[#0A1628] text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-300 block">
                      Live Valuation Preview ({valForm.finishLevel.split(' ')[0]})
                    </span>
                    <span className="text-xl font-mono font-bold text-white">
                      {formatPrice(liveValuationPreview.selectedCostNGN)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">CEMENT</span>
                      <span className="font-bold text-emerald-300">
                        {liveValuationPreview.materials.cementBags.toLocaleString()} bags
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">BLOCKS</span>
                      <span className="font-bold text-emerald-300">
                        {liveValuationPreview.materials.blocks9Inch.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">IRON RODS</span>
                      <span className="font-bold text-emerald-300">
                        {liveValuationPreview.materials.steelTonnes}t
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setListPropertyModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-emerald-300" />
                    <span>Save Valuation & Generate Material List</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. HOUSE PLAN PACK & SOIL TEST PAYMENT MODAL */}
      {paymentModal.open && (
        <div className="fixed inset-0 z-50 bg-[#0A1628]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-[#0A1628] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block">
                    House Plans, Soil Testing & Stage-by-Stage Building
                  </span>
                  <h3 className="font-serif text-lg font-bold">
                    {paymentModal.property
                      ? paymentModal.property.title
                      : 'Order Drawings or Book a Soil Test'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={closePaymentModal}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {payReceipt ? (
              <div className="p-6 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0D3B2E] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#0A1628]">
                  Payment Confirmed & Receipt Saved!
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs font-mono space-y-1.5">
                  <div>RECEIPT REF: {payReceipt.reference}</div>
                  <div>PACKAGE: {payReceipt.paymentType}</div>
                  <div>HOUSE PLAN: {payReceipt.propertyTitle}</div>
                  <div>AMOUNT PAID: {formatPrice(payReceipt.amountNGN)} ({currency})</div>
                  <div>EMAIL RECEIPT: {payReceipt.payerEmail}</div>
                </div>
                <button
                  type="button"
                  onClick={closePaymentModal}
                  className="w-full py-2.5 rounded-lg bg-[#0A1628] text-white text-xs font-semibold cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select What You Are Paying For
                  </label>
                  <select
                    value={payForm.paymentType}
                    onChange={(e) => setPayForm({ ...payForm, paymentType: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                  >
                    <option value="Complete House Plan & Material List (BOQ) Pack">
                      Complete COREN-Stamped House Plan (Architectural + Structural + BOQ)
                    </option>
                    <option value="Land Soil Test & Foundation Report">
                      Geotechnical Soil Test on My Land + Safe Foundation Report
                    </option>
                    <option value="Uncompleted Building Strength Test">
                      Strength Test for an Existing / Uncompleted Building
                    </option>
                    <option value="Stage 1 Foundation Mobilization Deposit">
                      Stage 1 Foundation & DPC Mobilization Deposit
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amount in Naira (NGN)
                  </label>
                  <input
                    type="number"
                    value={payForm.amountNGN}
                    onChange={(e) => setPayForm({ ...payForm, amountNGN: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={payForm.payerName}
                      onChange={(e) => setPayForm({ ...payForm, payerName: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email for Receipt & Drawings *
                    </label>
                    <input
                      type="email"
                      required
                      value={payForm.payerEmail}
                      onChange={(e) => setPayForm({ ...payForm, payerEmail: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="bg-[#0A1628] text-white rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-300 block">
                      Total Amount ({CURRENCIES[currency]?.label})
                    </span>
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      {formatPrice(Number(payForm.amountNGN))}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0D3B2E] text-emerald-200">
                    COREN Verified
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#0D3B2E] hover:bg-[#145340] text-white text-xs font-bold tracking-wide uppercase transition cursor-pointer"
                >
                  Confirm & Generate Official Receipt
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. NIGERIAN USER ACCOUNT MODAL (SINGLE USER DASHBOARD PROFILE) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A1628]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-[#0A1628] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h3 className="font-serif text-lg font-bold">
                  My Nigerian Homebuilder Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-700 flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-[#0D3B2E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0A1628] block">
                    One Unified Nigerian User Dashboard
                  </span>
                  <span>
                    Save your favourite house plans, submit personal designs for valuation, and chat with EkeBot from one personal account.
                  </span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  registerOrSignIn(authForm);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authForm.fullName}
                    onChange={(e) => setAuthForm({ ...authForm, fullName: e.target.value })}
                    placeholder="e.g. Chinedu Okafor"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    placeholder="you@gmail.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                      placeholder="+234 803..."
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred State / City
                    </label>
                    <input
                      type="text"
                      value={authForm.city}
                      onChange={(e) => setAuthForm({ ...authForm, city: e.target.value })}
                      placeholder="e.g. Abuja, Lagos, Enugu"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#0A1628] hover:bg-[#0D3B2E] text-white text-xs font-semibold transition cursor-pointer"
                >
                  Save Profile & Continue to My Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 6. EKESONCONSTRUCT SPECIALIST AGENT MAIN COVERING & SPECIFICATION MODAL */}
      {specialistModal?.open && specialistModal?.specialist && (
        <div className="fixed inset-0 z-50 bg-[#0A1628]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
            {/* Top Header */}
            <div className="bg-[#0A1628] text-white px-5 sm:px-6 py-4 flex items-start justify-between gap-4 border-b border-white/10 shrink-0">
              <div className="flex items-start gap-3.5">
                <img
                  src={specialistModal.specialist.photo}
                  alt={specialistModal.specialist.roleTitle}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-emerald-400/50 shrink-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#0D3B2E] text-emerald-300 font-mono text-[10px] font-bold uppercase border border-emerald-400/30">
                      {specialistModal.specialist.shortBadge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300">
                      {specialistModal.specialist.licenseNo}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mt-1">
                    {specialistModal.specialist.roleTitle}
                  </h3>
                  <p className="text-xs text-emerald-300 font-semibold">
                    Lead Specialist: {specialistModal.specialist.leadName} •{' '}
                    {specialistModal.specialist.experienceYears}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeSpecialistModal}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Switcher Bar Across All 8 Ekeconstruct Specialists */}
            <div className="bg-slate-100 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 mr-1 shrink-0">
                SWITCH SPECIALIST:
              </span>
              {specialistAgents.map((ag) => (
                <button
                  key={ag.id}
                  type="button"
                  onClick={() => openSpecialistModal(ag)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition shrink-0 cursor-pointer ${
                    ag.id === specialistModal.specialist.id
                      ? 'bg-[#0D3B2E] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {ag.roleTitle.split('/')[0].trim()}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Plain-English Role Summary */}
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#0D3B2E] block">
                    Plain-English Role (Why You Need This Specialist in Nigeria)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {specialistModal.specialist.plainSummary}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-emerald-200 shrink-0 text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    When Needed on Site
                  </span>
                  <span className="text-xs font-bold text-[#0A1628] block mt-0.5">
                    {specialistModal.specialist.stageNeeded}
                  </span>
                </div>
              </div>

              {/* Two-Column Grid: 1. Main Covering & 2. Technical Specifications */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Main Covering (Scope of Work) */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-[#0A1628] flex items-center gap-2">
                      <HardHat className="w-4 h-4 text-[#0D3B2E]" />
                      <span>1. Main Covering & Scope of Work</span>
                    </h4>
                    <span className="text-[10px] font-mono text-[#0D3B2E] font-semibold">
                      Click any item to select
                    </span>
                  </div>

                  <div className="space-y-2">
                    {specialistModal.specialist.mainCovering.map((cov, idx) => {
                      const isPicked = specForm.selectedCovering === cov;
                      return (
                        <button
                          key={cov}
                          type="button"
                          onClick={() => setSpecForm({ ...specForm, selectedCovering: cov })}
                          className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition flex items-start gap-2.5 cursor-pointer ${
                            isPicked
                              ? 'bg-[#0D3B2E] text-white border-[#0D3B2E] shadow-sm'
                              : 'bg-slate-50 hover:bg-emerald-50/60 text-slate-800 border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                              isPicked
                                ? 'bg-emerald-400 text-[#0A1628]'
                                : 'bg-white border border-slate-300 text-[#0A1628]'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <span className="font-medium">{cov}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Technical & Site Specifications */}
                <div className="lg:col-span-6 space-y-3">
                  <h4 className="font-serif text-base font-bold text-[#0A1628] flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#0D3B2E]" />
                    <span>2. Official Specifications & Deliverables</span>
                  </h4>

                  <div className="bg-[#0A1628] text-white rounded-xl p-4 space-y-3 border border-slate-800">
                    {specialistModal.specialist.technicalSpecifications.map((spec) => (
                      <div
                        key={spec.label}
                        className="border-b border-white/10 last:border-b-0 pb-2.5 last:pb-0"
                      >
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                          {spec.label}
                        </span>
                        <span className="text-xs text-slate-100 font-medium leading-snug block mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Common Questions for this Specialist */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                      Click a Common Question to Auto-Fill Below:
                    </span>
                    <div className="space-y-1.5">
                      {specialistModal.specialist.commonQuestions.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setSpecForm({ ...specForm, userMessage: q })}
                          className="w-full text-left text-[11px] bg-white hover:bg-emerald-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 transition cursor-pointer"
                        >
                          &ldquo;{q}&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Direct Connection Form */}
              {specConnectedRecord ? (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#0D3B2E] text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#0A1628]">
                    Connected With {specConnectedRecord.roleTitle}! ({specConnectedRecord.reference})
                  </h4>
                  <p className="text-xs text-slate-700 max-w-xl mx-auto">
                    Your specification brief for{' '}
                    <span className="font-bold text-[#0D3B2E]">
                      &ldquo;{specConnectedRecord.selectedCovering}&rdquo;
                    </span>{' '}
                    has been assigned to{' '}
                    <span className="font-bold">{specConnectedRecord.leadName}</span> and saved to your User Dashboard.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <a
                      href={buildWhatsAppLink(
                        null,
                        `Hello ${specialistModal.specialist.leadName} (${specialistModal.specialist.roleTitle} at Ekeconstruct Nigeria), my connection ref is ${specConnectedRecord.reference}. Main Covering needed: "${specForm.selectedCovering}". Land/Site Location: ${specForm.projectLocation}. Note: ${specForm.userMessage}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#0D3B2E] hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-300" />
                      <span>Chat Directly With {specialistModal.specialist.leadName} on WhatsApp</span>
                    </a>
                    <Link
                      href="/dashboard?tab=specialists"
                      onClick={closeSpecialistModal}
                      className="px-4 py-2.5 rounded-xl bg-[#0A1628] text-white text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <span>View in My Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const rec = await connectWithSpecialist({
                      specialistId: specialistModal.specialist.id,
                      ...specForm,
                    });
                    setSpecConnectedRecord(rec);
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-serif text-base font-bold text-[#0A1628]">
                      3. Connect Directly With {specialistModal.specialist.leadName}
                    </h4>
                    <span className="text-[11px] font-mono text-[#0D3B2E] font-bold">
                      {specialistModal.specialist.feeNote}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Selected Main Covering / Service Scope
                      </label>
                      <input
                        type="text"
                        value={specForm.selectedCovering}
                        onChange={(e) =>
                          setSpecForm({ ...specForm, selectedCovering: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-[#0A1628]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Land / Building Location in Nigeria
                      </label>
                      <input
                        type="text"
                        value={specForm.projectLocation}
                        onChange={(e) =>
                          setSpecForm({ ...specForm, projectLocation: e.target.value })
                        }
                        placeholder="e.g. Lekki Lagos, Guzape Abuja, Independence Layout Enugu"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      What Do You Want This {specialistModal.specialist.roleTitle} to Handle for You?
                    </label>
                    <textarea
                      rows={2}
                      value={specForm.userMessage}
                      onChange={(e) => setSpecForm({ ...specForm, userMessage: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <a
                      href={buildWhatsAppLink(
                        null,
                        `Hello ${specialistModal.specialist.leadName} (${specialistModal.specialist.roleTitle} at Ekeconstruct Nigeria), I need your help with: "${specForm.selectedCovering}" in ${specForm.projectLocation}. Details: ${specForm.userMessage}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3B2E] hover:underline"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Or Message {specialistModal.specialist.roleTitle} on WhatsApp Now</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={closeSpecialistModal}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 cursor-pointer"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg bg-[#0D3B2E] hover:bg-[#0A1628] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                      >
                        Connect With {specialistModal.specialist.roleTitle}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
