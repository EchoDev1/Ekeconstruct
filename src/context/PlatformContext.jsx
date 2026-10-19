'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_PROPERTIES,
  INITIAL_LOCATIONS,
  INITIAL_PROJECTS,
  INITIAL_DESIGN_VALUATIONS,
  NIGERIAN_LAND_CHECKLIST,
  CURRENCIES,
  COMPANY_INFO,
  LIVE_MATERIAL_PRICE_INDEX,
  formatCurrency,
  calculatePersonalDesignValuation,
  generateEkeBotReply,
  EKESON_SPECIALIST_AGENTS,
} from '@/data/seedData';
import {
  supabase,
  isSupabaseConfigured,
  subscribeToPlatformRealtime,
  broadcastLocalRealtimeEvent,
} from '@/lib/supabase';

const PlatformContext = createContext(null);

const DEFAULT_NIGERIAN_USER = {
  id: 'usr-ng-01',
  fullName: 'Chinedu Okafor',
  email: 'chinedu.okafor@gmail.com',
  phone: '+234 803 456 7890',
  stateOrigin: 'Enugu & Lagos, Nigeria',
  role: 'admin',
  roleLabel: 'Verified Nigerian Homeowner & Platform Admin',
  company: 'Ekeconstruct Nigeria & Personal Property Account',
  verified: true,
};

export const DEFAULT_HOMEPAGE_CONFIG = {
  heroImage:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90',
  showHeroOverlayText: true,
  heroBadge: '',
  heroHeadline: "Engineering at it's finest.",
  heroSubtitle: '',
  section01Title: 'Explore Ekeconstruct Nigeria Building Plans',
  section01Subtitle:
    'Every house plan includes full architectural drawings, COREN structural calculations, and honest counts for 50kg cement bags, blocks, and iron rods.',
  section02Image:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=90',
  section02Title: 'Connect With All 8 Ekeconstruct Building Specialists',
  section02Subtitle:
    'Avoid site mistakes, collapsed foundations, or inflated material quotes. Click any of our 8 certified Nigerian specialists below to inspect their Main Covering, Technical Specifications, and connect directly for your project.',
  section03Title: 'Calculate Your Building Budget & 5-Stage Payment Plan',
  section04Title: 'Today’s Verified Market Price Guide',
  section05Title: 'How Ekeconstruct Nigeria Builds Your House From Soil Test to Key Handover',
  showSection01Catalog: true,
  showSection02Specialists: true,
  showSection03Estimator: true,
  showSection04MaterialsAndProjects: true,
  showSection05WorkflowAndReviews: true,
  announcementBanner: '',
};

export const DEFAULT_ADMIN_PLUGINS = [
  {
    id: 'plugin-ai-valuation',
    name: 'AI & QS Personal Design Valuation Engine',
    category: 'Core Engineering Plugin',
    version: 'v3.4.0',
    enabled: true,
    statusLabel: 'Active • Real-Time BOQ & Stage Costing',
    description:
      'Automatically computes Carcass, Standard Move-In, and Luxury build budgets plus 50kg cement bags, 9-inch blocks, iron rods, and 6-stage payment schedules.',
  },
  {
    id: 'plugin-ekebot-ai',
    name: 'EkeBot 24/7 Nigerian Building Chatbot',
    category: 'AI Assistant Plugin',
    version: 'v2.8.1',
    enabled: true,
    statusLabel: 'Active • Floating Icon & Dashboard Advisor',
    description:
      'Provides instant plain-English answers on Nigerian land sizes, swampy vs dry foundations, fencing costs, and material quantities.',
  },
  {
    id: 'plugin-homepage-cms',
    name: 'Homepage Live Visual CMS & Section Controller',
    category: 'Content Management Plugin',
    version: 'v4.0.0',
    enabled: true,
    statusLabel: 'Active • Instant Homepage Sync',
    description:
      'Full administrative control over the homepage hero banner, section visibility, headlines, featured house plans, and announcement banners.',
  },
  {
    id: 'plugin-material-ticker',
    name: 'Nigerian Building Material Price Index Tracker',
    category: 'Market Data Plugin',
    version: 'v2.5.0',
    enabled: true,
    statusLabel: 'Active • 36 States + FCT Rates',
    description:
      'Tracks live market prices for Dangote/BUA 50kg cement, vibrated blocks, TMT steel rebar, granite, sharp sand, and roofing sheets.',
  },
  {
    id: 'plugin-multi-currency',
    name: 'Diaspora Multi-Currency FX Converter',
    category: 'Financial Plugin',
    version: 'v1.9.2',
    enabled: true,
    statusLabel: 'Active • NGN / USD / GBP / EUR / CAD',
    description:
      'Converts all building budgets, material rates, and valuation certificates across Naira and major international diaspora currencies.',
  },
  {
    id: 'plugin-whatsapp-dispatch',
    name: 'WhatsApp Engineer Desk & Email Alert Dispatcher',
    category: 'CRM & Communications Plugin',
    version: 'v3.1.0',
    enabled: true,
    statusLabel: 'Active • Direct Specialist Routing',
    description:
      'Routes client BOQ enquiries, personal design valuations, and specialist connections directly to COREN engineers via WhatsApp and email.',
  },
  {
    id: 'plugin-coren-verification',
    name: 'COREN / ARCON / NIQS Compliance Stamp System',
    category: 'Regulatory Plugin',
    version: 'v2.2.0',
    enabled: true,
    statusLabel: 'Active • License Verification On',
    description:
      'Verifies structural drawings, geotechnical soil reports, and bill of quantities against Nigerian statutory building approval standards.',
  },
  {
    id: 'plugin-supabase-sync',
    name: 'Cloud & LocalStorage Persistence Engine',
    category: 'Infrastructure Plugin',
    version: 'v3.0.4',
    enabled: true,
    statusLabel: 'Active • Auto-Save & Backup Ready',
    description:
      'Synchronizes catalog edits, custom locations, valuations, material prices, and homepage settings across browser sessions.',
  },
];

export function PlatformProvider({ children }) {
  const [currency, setCurrency] = useState('NGN');
  const [user, setUser] = useState(DEFAULT_NIGERIAN_USER);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [savedIds, setSavedIds] = useState(['struct-2', 'struct-5']);
  const [designValuations, setDesignValuations] = useState(INITIAL_DESIGN_VALUATIONS);
  const [specialistAgents, setSpecialistAgents] = useState(EKESON_SPECIALIST_AGENTS);
  const [materialPrices, setMaterialPrices] = useState(LIVE_MATERIAL_PRICE_INDEX);
  const [homepageConfig, setHomepageConfig] = useState(DEFAULT_HOMEPAGE_CONFIG);
  const [companyInfo, setCompanyInfo] = useState(COMPANY_INFO);
  const [adminPlugins, setAdminPlugins] = useState(DEFAULT_ADMIN_PLUGINS);

  // Active Specialist Connections & Consultations
  const [specialistConnections, setSpecialistConnections] = useState([
    {
      id: 'spc-seed-1',
      reference: 'EKC-AGT-401',
      specialistId: 'spec-civil-engineer',
      roleTitle: 'Civil & Structural Engineer',
      leadName: 'Engr. Chibuike Ekeson, FNSE',
      licenseNo: 'COREN Reg. #R.28491 • FNSE • M.IStructE',
      selectedCovering:
        'Foundation Engineering (Pad & Strip Footings, Cellular Raft Foundations & Bored Pile Foundations)',
      projectLocation: 'Independence Layout, Enugu (600 sqm)',
      buildingStage: 'Stage 01 — Foundation & German Floor (DPC)',
      userMessage:
        'Please review my 4-bedroom duplex foundation and prepare the COREN bar bending schedule.',
      status: 'COREN Engineer Assigned • Ready for WhatsApp / Site Call',
      createdAt: 'Today',
    },
  ]);

  // Nigerian Land & Building Checklist Progress
  const [checklistDoneIds, setChecklistDoneIds] = useState(
    NIGERIAN_LAND_CHECKLIST.filter((c) => c.completedByDefault).map((c) => c.id)
  );

  // Material Price Drop Alerts
  const [priceAlerts, setPriceAlerts] = useState(['MAT-CEM-425', 'MAT-REB-Y12', 'MAT-BLK-9IN']);

  // EkeBot — Smart Nigerian Building & Valuation Chatbot History
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      title: 'Welcome to EkeBot — Your Nigerian Building & Property Advisor!',
      text:
        'Hello! I am EkeBot, your plain-English Nigerian building assistant. Ask me anything—like how many bags of cement and blocks you need for a 3-bedroom bungalow or 4-bedroom duplex, how to fence 1 plot of land, how to submit your personal house plan for instant Naira valuation, or connect to any of our 8 building specialists!',
      actionTab: 'valuation',
      actionLabel: 'Submit My Personal Design for Valuation',
      time: 'Just now',
    },
  ]);

  const [enquiries, setEnquiries] = useState([
    {
      id: 'enq-seed-1',
      enquiryType: 'House Plan Cost & Material List (BOQ)',
      propertyReference: 'EKC-STR-002',
      propertyTitle: 'The Aurelia 5-Bedroom Contemporary Duplex Plan',
      fullName: 'Chinedu Okafor',
      email: 'chinedu.okafor@gmail.com',
      phone: '+234 803 456 7890',
      preferredLocation: 'Sangotedo / Lekki, Lagos (1 Full Plot - 600 sqm)',
      preferredDate: '2026-10-25',
      status: 'Material List & Soil Check Scheduled',
      automatedEmailSent: true,
      createdAt: '2026-10-16T10:15:00Z',
    },
    {
      id: 'enq-seed-2',
      enquiryType: 'Soil Test & Foundation Check',
      propertyReference: 'EKC-STR-005',
      propertyTitle: 'Greenhaven 4-Bedroom Contemporary Bungalow Plan',
      fullName: 'Chinedu Okafor',
      email: 'chinedu.okafor@gmail.com',
      phone: '+234 803 456 7890',
      preferredLocation: 'Independence Layout, Enugu (500 sqm Plot)',
      preferredDate: '2026-10-28',
      status: 'Engineer Assigned for Site Visit',
      automatedEmailSent: true,
      createdAt: '2026-10-17T14:30:00Z',
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: 'pay-seed-1',
      reference: 'EKC-NG-88412',
      propertyReference: 'EKC-STR-002',
      propertyTitle: 'Aurelia 5-Bedroom Duplex — Stamped Drawings & Material List (BOQ)',
      payerName: 'Chinedu Okafor',
      payerEmail: 'chinedu.okafor@gmail.com',
      paymentType: 'Complete Stamped Building Drawings & Material List Pack',
      amountNGN: 2200000,
      currencyUsed: 'NGN',
      status: 'Confirmed & Drawings Ready in Dashboard',
      createdAt: '2026-10-15T16:40:00Z',
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Personal Design Valuation Ready!',
      message: 'Your 4-Bedroom Duplex plan for Enugu has been valued with full cement, block, and iron rod estimates.',
      type: 'system',
      emailRecipient: 'chinedu.okafor@gmail.com',
      emailSubject: 'Your Ekesonconstruct Personal Design Valuation',
      read: false,
      createdAt: 'Just now',
    },
    {
      id: 'notif-2',
      title: 'Today’s Nigerian Cement & Iron Rod Price Update',
      message: '50kg Cement (Dangote/BUA/Lafarge) is currently ₦9,500/bag; 9-Inch Vibrated Block is ₦1,150/unit.',
      type: 'email',
      emailRecipient: 'chinedu.okafor@gmail.com',
      emailSubject: '[Ekesonconstruct] Nigerian Building Material Price Alert',
      read: false,
      createdAt: '25m ago',
    },
  ]);

  const [activeToast, setActiveToast] = useState(null);

  // Modal states
  const [enquiryModal, setEnquiryModal] = useState({
    open: false,
    property: null,
    defaultType: 'Building Cost & Material List (BOQ)',
  });
  const [listPropertyModalOpen, setListPropertyModalOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState({
    open: false,
    property: null,
    defaultType: 'Complete Stamped Building Plan & Material List',
    defaultAmountNGN: 2200000,
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [specialistModal, setSpecialistModal] = useState({
    open: false,
    specialist: null,
  });

  const pushNotification = useCallback((notif) => {
    const newItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      read: false,
      createdAt: 'Just now',
      ...notif,
    };
    setNotifications((prev) => [newItem, ...prev]);
    setActiveToast(newItem);
    setTimeout(() => {
      setActiveToast((current) => (current?.id === newItem.id ? null : current));
    }, 6000);
  }, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAllProps = localStorage.getItem('ekc_admin_properties_v3');
        if (savedAllProps) {
          const parsed = JSON.parse(savedAllProps);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProperties(parsed);
          }
        } else {
          const savedProps = localStorage.getItem('ekc_custom_structures_v2');
          if (savedProps) {
            const parsed = JSON.parse(savedProps);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProperties([...parsed, ...INITIAL_PROPERTIES]);
            }
          }
        }

        const savedValuations = localStorage.getItem('ekc_user_design_valuations_v1');
        if (savedValuations) {
          const parsedVals = JSON.parse(savedValuations);
          if (Array.isArray(parsedVals) && parsedVals.length > 0) {
            setDesignValuations([...parsedVals, ...INITIAL_DESIGN_VALUATIONS]);
          }
        }

        const savedIdsStorage = localStorage.getItem('ekc_saved_property_ids_v1');
        if (savedIdsStorage) {
          const parsedIds = JSON.parse(savedIdsStorage);
          if (Array.isArray(parsedIds)) {
            setSavedIds(parsedIds);
          }
        }

        const savedLocs = localStorage.getItem('ekc_custom_zones_v2');
        if (savedLocs) {
          const parsedLocs = JSON.parse(savedLocs);
          if (Array.isArray(parsedLocs) && parsedLocs.length > 0) {
            setLocations([...parsedLocs, ...INITIAL_LOCATIONS]);
          }
        }

        const savedProjects = localStorage.getItem('ekc_admin_projects_v1');
        if (savedProjects) {
          const parsedProjs = JSON.parse(savedProjects);
          if (Array.isArray(parsedProjs) && parsedProjs.length > 0) {
            setProjects(parsedProjs);
          }
        }

        const savedMaterials = localStorage.getItem('ekc_admin_materials_v1');
        if (savedMaterials) {
          const parsedMats = JSON.parse(savedMaterials);
          if (Array.isArray(parsedMats) && parsedMats.length > 0) {
            setMaterialPrices(parsedMats);
          }
        }

        const savedHomepage = localStorage.getItem('ekc_admin_homepage_v2');
        if (savedHomepage) {
          const parsedHome = JSON.parse(savedHomepage);
          if (parsedHome && typeof parsedHome === 'object') {
            setHomepageConfig((prev) => ({ ...prev, ...parsedHome }));
          }
        }

        const savedSpecialists = localStorage.getItem('ekc_admin_specialists_v1');
        if (savedSpecialists) {
          const parsedSpecs = JSON.parse(savedSpecialists);
          if (Array.isArray(parsedSpecs) && parsedSpecs.length > 0) {
            setSpecialistAgents(parsedSpecs);
          }
        }

        const savedCurr = localStorage.getItem('ekc_currency');
        if (savedCurr && CURRENCIES[savedCurr]) {
          setCurrency(savedCurr);
        }
      } catch {
        // Ignore storage errors
      }
    }

    const unsubscribe = subscribeToPlatformRealtime({
      onNewProperty: (newProp) => {
        pushNotification({
          title: 'New House Plan Added',
          message: `${newProp.title} (${newProp.reference}) is now available.`,
          type: 'post',
        });
      },
      onNewLocation: (newLoc) => {
        pushNotification({
          title: 'New State / Soil Zone Added',
          message: `${newLoc.neighbourhood}, ${newLoc.city} added to Nigerian Soil Guide.`,
          type: 'system',
        });
      },
      onNewNotification: (notif) => {
        pushNotification(notif);
      },
      onNewEnquiry: (enq) => {
        pushNotification({
          title: `Request Logged: ${enq.enquiryType || enq.enquiry_type}`,
          message: `We have received your request and sent a summary to your email.`,
          type: 'enquiry',
        });
      },
    });

    return () => unsubscribe();
  }, [pushNotification]);

  const changeCurrency = (code) => {
    if (CURRENCIES[code]) {
      setCurrency(code);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_currency', code);
      }
    }
  };

  const formatPrice = useCallback(
    (amountNGN, compact = false) => formatCurrency(amountNGN, currency, compact),
    [currency]
  );

  const toggleSavedProperty = (propertyId) => {
    setSavedIds((prev) => {
      const exists = prev.includes(propertyId);
      const next = exists ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_saved_property_ids_v1', JSON.stringify(next));
      }
      const prop = properties.find((p) => p.id === propertyId);
      pushNotification({
        title: exists ? 'Removed from Your Saved Properties' : 'Saved to Your User Dashboard!',
        message: prop
          ? `"${prop.title}" (${prop.reference}) ${exists ? 'removed from' : 'added to'} your Saved Properties in My Dashboard.`
          : 'Saved properties updated.',
        type: 'system',
      });
      return next;
    });
  };

  const registerOrSignIn = async ({ fullName, email, phone, stateOrigin, password, mode = 'signin' }) => {
    if (supabase && password) {
      try {
        if (mode === 'signup') {
          await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName, phone, role: 'user' } },
          });
        } else {
          await supabase.auth.signInWithPassword({ email, password });
        }
      } catch {
        // Fallback to instant session hydration
      }
    }

    const customUser = {
      id: `usr-${Date.now()}`,
      fullName: fullName || email.split('@')[0],
      email,
      phone: phone || '+234 803 456 7890',
      stateOrigin: stateOrigin || 'Lagos / Abuja, Nigeria',
      role: 'admin',
      roleLabel: 'Verified Nigerian Homeowner & Platform Admin',
      company: 'Personal Home & Property Account',
      verified: true,
    };
    setUser(customUser);
    pushNotification({
      title: 'Welcome to Your Ekesonconstruct Dashboard!',
      message: `Signed in as ${customUser.fullName}. All your saved properties, chatbot history, and personal design valuations are ready.`,
      type: 'email',
      emailRecipient: customUser.email,
      emailSubject: 'Welcome to Ekesonconstruct Nigeria',
    });
    setAuthModalOpen(false);
    return customUser;
  };

  // Submit Personal Design for Instant Nigerian Market Valuation (Flagship Feature!)
  const submitDesignForValuation = async (designInput) => {
    const randomNum = Math.floor(100 + Math.random() * 899);
    const reference = `EKC-VAL-${randomNum}`;
    const calculated = calculatePersonalDesignValuation(designInput);

    const newValuation = {
      id: `val-${Date.now()}`,
      reference,
      designTitle: designInput.designTitle || `My ${designInput.buildingType || '4-Bedroom Duplex'} Personal Plan`,
      buildingType: designInput.buildingType || '4-Bedroom Duplex',
      bedrooms: Number(designInput.bedrooms) || 4,
      stateLocation: designInput.stateLocation || 'Lagos (Mainland)',
      townArea: designInput.townArea || designInput.stateLocation || 'Nigeria',
      landPlotType: designInput.landPlotType || 'Full Plot (600 sqm / 60x120ft)',
      soilType: designInput.soilType || 'dry',
      finishLevel: designInput.finishLevel || 'turnkey',
      customSqm: calculated.floorAreaSqm,
      includeBQ: Boolean(designInput.includeBQ),
      includeFence: Boolean(designInput.includeFence),
      includeBorehole: Boolean(designInput.includeBorehole),
      includeSolar: Boolean(designInput.includeSolar),
      planFileName: designInput.planFileName || 'Personal_Building_Plan_Upload.pdf',
      planPreviewUrl:
        designInput.planPreviewUrl ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      userNotes:
        designInput.userNotes ||
        'Submitted from User Dashboard for full Nigerian building cost & material valuation.',
      status: 'Instant AI & QS Valuation Ready • Assigned to Engineer for Stamp',
      createdAt: 'Just now',
      ...calculated,
    };

    setDesignValuations((prev) => {
      const updated = [newValuation, ...prev];
      if (typeof window !== 'undefined') {
        const customOnly = updated.filter(
          (v) => !INITIAL_DESIGN_VALUATIONS.some((iv) => iv.id === v.id)
        );
        localStorage.setItem('ekc_user_design_valuations_v1', JSON.stringify(customOnly));
      }
      return updated;
    });

    pushNotification({
      title: `Personal Design Valued (${newValuation.reference})!`,
      message: `"${newValuation.designTitle}" estimated at ${formatPrice(newValuation.selectedTotalNGN)} with ${String(newValuation.materials.cementBags).split(' ')[0]} bags of cement.`,
      type: 'post',
      emailRecipient: user?.email,
      emailSubject: `[Ekesonconstruct Valuation] ${newValuation.reference} — ${newValuation.designTitle}`,
    });

    return newValuation;
  };

  const deleteDesignValuation = (valId) => {
    setDesignValuations((prev) => {
      const updated = prev.filter((v) => v.id !== valId);
      if (typeof window !== 'undefined') {
        const customOnly = updated.filter(
          (v) => !INITIAL_DESIGN_VALUATIONS.some((iv) => iv.id === v.id)
        );
        localStorage.setItem('ekc_user_design_valuations_v1', JSON.stringify(customOnly));
      }
      return updated;
    });
    pushNotification({
      title: 'Design Valuation Removed',
      message: 'The valuation entry was removed from your Dashboard.',
      type: 'system',
    });
  };

  // Send message to EkeBot (Nigerian Building & Valuation AI Chatbot)
  const sendChatMessage = (text) => {
    if (!text || !text.trim()) return;
    const trimmed = text.trim();
    const userMsg = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: 'Just now',
    };

    const botResponse = generateEkeBotReply(trimmed, properties, formatPrice);
    const botMsg = {
      id: `msg-b-${Date.now() + 1}`,
      sender: 'bot',
      title: botResponse.title,
      text: botResponse.reply,
      actionTab: botResponse.actionTab,
      actionLabel: botResponse.actionLabel,
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const togglePriceAlert = (materialCode) => {
    setPriceAlerts((prev) => {
      const exists = prev.includes(materialCode);
      const next = exists ? prev.filter((c) => c !== materialCode) : [...prev, materialCode];
      pushNotification({
        title: exists ? 'Material Price Alert Paused' : 'Nigerian Market Price Alert Active!',
        message: exists
          ? `Stopped SMS/Email alerts for ${materialCode}.`
          : `You will receive instant alerts whenever ${materialCode} price drops or changes in Nigeria.`,
        type: 'system',
      });
      return next;
    });
  };

  const toggleChecklistItem = (itemId) => {
    setChecklistDoneIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Backward-compatible property post handler (also logs a Personal Design Valuation!)
  const addPropertyPost = async (propertyInput) => {
    const valRecord = await submitDesignForValuation({
      designTitle: propertyInput.title || 'Custom Nigerian Building Design',
      buildingType: propertyInput.propertyType || '4-Bedroom Duplex',
      bedrooms: Number(propertyInput.bedrooms) || 4,
      stateLocation: propertyInput.city || 'Lagos (Mainland)',
      townArea: propertyInput.neighbourhood || propertyInput.city || 'Nigeria',
      landPlotType: `${propertyInput.landSizeSqm || 600} sqm Plot`,
      soilType: propertyInput.soilType || 'dry',
      finishLevel: propertyInput.finishLevel || 'turnkey',
      customSqm: Number(propertyInput.sizeSqm) || 380,
      includeBQ: Boolean(propertyInput.includeBQ),
      includeFence: Boolean(propertyInput.includeFence),
      includeBorehole: Boolean(propertyInput.includeBorehole),
      includeSolar: Boolean(propertyInput.includeSolar),
      planFileName: propertyInput.planFileName || 'Uploaded_House_Design.pdf',
      planPreviewUrl:
        (Array.isArray(propertyInput.images) && propertyInput.images[0]) ||
        propertyInput.imageUrl ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      userNotes: propertyInput.description || '',
    });
    return valRecord;
  };

  // =========================================================================
  // ADMIN DASHBOARD FULL CRUD & PLUGIN FUNCTIONS
  // =========================================================================
  const adminCreateProperty = (propData) => {
    const randomNum = Math.floor(100 + Math.random() * 899);
    const reference = propData.reference || `EKC-STR-${randomNum}`;
    const priceNGN = Number(propData.priceNGN) || 125000000;
    const carcassPriceNGN = Number(propData.carcassPriceNGN) || Math.round(priceNGN * 0.48);
    const luxuryPriceNGN = Number(propData.luxuryPriceNGN) || Math.round(priceNGN * 1.32);

    const newProp = {
      id: `struct-${Date.now()}`,
      reference,
      title: propData.title || 'New Ekeconstruct Building Plan',
      category: propData.category || 'Duplex & Villa Structures',
      subCategory: propData.subCategory || 'Residential Building Structure',
      propertyType: propData.propertyType || 'Detached Duplex',
      city: propData.city || 'Abuja / Lagos / Nationwide',
      state: propData.state || 'All 36 States & FCT',
      neighbourhood: propData.neighbourhood || 'Builds on Any Suitable Nigerian Land',
      priceNGN,
      carcassPriceNGN,
      standardPriceNGN: priceNGN,
      luxuryPriceNGN,
      planFeeNGN: Number(propData.planFeeNGN) || 2200000,
      bedrooms: Number(propData.bedrooms) || 4,
      bathrooms: Number(propData.bathrooms) || 5,
      floors: Number(propData.floors) || 2,
      sizeSqm: Number(propData.sizeSqm) || 360,
      landSizeSqm: Number(propData.landSizeSqm) || 600,
      buildDuration: propData.buildDuration || '6–8 Months',
      foundationType:
        propData.foundationType || 'Reinforced Concrete Strip / Pad or Raft Foundation',
      featured: Boolean(propData.featured ?? true),
      verified: true,
      description:
        propData.description ||
        'COREN-certified structural and architectural building package with full Nigerian Bill of Quantities (BOQ).',
      images: [
        propData.imageUrl ||
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      ],
      boqSummary: {
        cementBags: propData.cementBags || '2,150 Bags',
        sandcreteBlocks: propData.sandcreteBlocks || '14,500 Blocks',
        steelRebarTonnes: propData.steelRebarTonnes || '24.5 Tonnes',
        graniteTonnes: propData.graniteTonnes || '290 Tonnes',
      },
      costBreakdown: INITIAL_PROPERTIES[0]?.costBreakdown || [
        { stage: 'Stage 1: Substructure & Foundation (DPC)', percent: 22, details: 'Excavation, blinding, reinforcement, footing & German floor' },
        { stage: 'Stage 2: Ground to First Floor Decking', percent: 26, details: 'Blockwork, columns, lintels & reinforced concrete slab' },
        { stage: 'Stage 3: Superstructure & Roofing', percent: 18, details: 'Upper blockwork, roof beam, trusses & stone-coated/longspan roof' },
        { stage: 'Stage 4: Mechanical, Electrical & Plastering', percent: 16, details: 'Piping, pure copper wiring, rendering & POP ceiling' },
        { stage: 'Stage 5: Finishing, Tiling & Handover', percent: 18, details: 'Vitrified tiles, doors, windows, sanitary wares & painting' },
      ],
    };

    setProperties((prev) => {
      const updated = [newProp, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_properties_v3', JSON.stringify(updated));
      }
      return updated;
    });

    broadcastLocalRealtimeEvent('NEW_PROPERTY', newProp);

    pushNotification({
      title: `Admin Published Plan: ${newProp.reference}`,
      message: `"${newProp.title}" is now live on the Homepage and Catalog.`,
      type: 'post',
    });

    return newProp;
  };

  const adminUpdateProperty = (propId, updates) => {
    setProperties((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== propId) return p;
        const nextPrice = updates.priceNGN !== undefined ? Number(updates.priceNGN) : p.priceNGN;
        const nextCarcass =
          updates.carcassPriceNGN !== undefined
            ? Number(updates.carcassPriceNGN)
            : p.carcassPriceNGN;
        const nextLuxury =
          updates.luxuryPriceNGN !== undefined
            ? Number(updates.luxuryPriceNGN)
            : p.luxuryPriceNGN;
        return {
          ...p,
          ...updates,
          priceNGN: nextPrice,
          standardPriceNGN: nextPrice,
          carcassPriceNGN: nextCarcass,
          luxuryPriceNGN: nextLuxury,
          images: updates.imageUrl ? [updates.imageUrl, ...(p.images?.slice(1) || [])] : p.images,
          boqSummary: {
            ...p.boqSummary,
            ...(updates.cementBags ? { cementBags: updates.cementBags } : {}),
            ...(updates.sandcreteBlocks ? { sandcreteBlocks: updates.sandcreteBlocks } : {}),
            ...(updates.steelRebarTonnes ? { steelRebarTonnes: updates.steelRebarTonnes } : {}),
            ...(updates.graniteTonnes ? { graniteTonnes: updates.graniteTonnes } : {}),
          },
        };
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_properties_v3', JSON.stringify(updated));
      }
      return updated;
    });

    pushNotification({
      title: 'Catalog Plan Updated',
      message: 'Changes have been synced to the Homepage and Houses Catalog.',
      type: 'system',
    });
  };

  const adminDeleteProperty = (propId) => {
    setProperties((prev) => {
      const updated = prev.filter((p) => p.id !== propId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_properties_v3', JSON.stringify(updated));
      }
      return updated;
    });
    pushNotification({
      title: 'House Plan Removed',
      message: 'The building plan has been removed from the active catalog.',
      type: 'system',
    });
  };

  const adminUpdateValuationStatus = (valId, status, extraUpdates = {}) => {
    setDesignValuations((prev) =>
      prev.map((v) => (v.id === valId ? { ...v, status, ...extraUpdates } : v))
    );
    pushNotification({
      title: 'Valuation Status Updated',
      message: `Client valuation status updated to "${status}".`,
      type: 'system',
    });
  };

  const adminUpdateEnquiryStatus = (enqId, status) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enqId ? { ...e, status } : e))
    );
    pushNotification({
      title: 'Client Enquiry Updated',
      message: `Enquiry status changed to "${status}".`,
      type: 'system',
    });
  };

  const adminDeleteEnquiry = (enqId) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== enqId));
    pushNotification({
      title: 'Enquiry Deleted',
      message: 'Enquiry record removed from CRM.',
      type: 'system',
    });
  };

  const adminUpdatePaymentStatus = (payId, status) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === payId ? { ...p, status } : p))
    );
    pushNotification({
      title: 'Payment Status Updated',
      message: `Payment status updated to "${status}".`,
      type: 'payment',
    });
  };

  const adminUpdateSpecialist = (specId, updates) => {
    setSpecialistAgents((prev) => {
      const updated = prev.map((s) => (s.id === specId ? { ...s, ...updates } : s));
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_specialists_v1', JSON.stringify(updated));
      }
      return updated;
    });
    pushNotification({
      title: 'Specialist Profile Updated',
      message: 'Specialist details updated on Homepage Section 02 and User Dashboard.',
      type: 'system',
    });
  };

  const adminUpdateSpecialistConnection = (connId, status) => {
    setSpecialistConnections((prev) =>
      prev.map((c) => (c.id === connId ? { ...c, status } : c))
    );
    pushNotification({
      title: 'Specialist Dispatch Updated',
      message: `Consultation status set to "${status}".`,
      type: 'system',
    });
  };

  const adminUpdateMaterialPrice = (code, newRateNGN, extraUpdates = {}) => {
    setMaterialPrices((prev) => {
      const updated = prev.map((m) =>
        m.code === code ? { ...m, rateNGN: Number(newRateNGN), ...extraUpdates } : m
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_materials_v1', JSON.stringify(updated));
      }
      return updated;
    });
    pushNotification({
      title: `Material Rate Updated (${code})`,
      message: `New rate ${formatPrice(Number(newRateNGN))} synced to Homepage & User Dashboard.`,
      type: 'system',
    });
  };

  const adminAddMaterialPrice = (matInput) => {
    const newMat = {
      code: matInput.code || `MAT-CUS-${Math.floor(100 + Math.random() * 899)}`,
      category: matInput.category || 'Structural Material',
      material: matInput.material || 'New Building Material',
      unit: matInput.unit || 'Per Unit',
      rateNGN: Number(matInput.rateNGN) || 15000,
      application: matInput.application || 'General Nigerian site construction & structural works.',
    };
    setMaterialPrices((prev) => {
      const updated = [newMat, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_materials_v1', JSON.stringify(updated));
      }
      return updated;
    });
    pushNotification({
      title: 'New Material Added to Price Index',
      message: `${newMat.material} (${formatPrice(newMat.rateNGN)}) is now live.`,
      type: 'system',
    });
  };

  const adminCreateProject = (projInput) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: projInput.name || 'New Ekeconstruct Turnkey Site',
      category: projInput.category || 'Residential Development',
      location: projInput.location || 'Abuja (FCT), Nigeria',
      completionStatus: projInput.completionStatus || 'Ongoing Structural Works',
      progressPercent: Number(projInput.progressPercent) || 45,
      startingPriceNGN: Number(projInput.startingPriceNGN) || 165000000,
      structuralHighlight:
        projInput.structuralHighlight ||
        'COREN-supervised reinforced concrete frame, soil test verified foundation, and full QA/QC cube testing.',
      images: [
        projInput.imageUrl ||
          'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=85',
      ],
    };
    setProjects((prev) => {
      const updated = [newProj, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_projects_v1', JSON.stringify(updated));
      }
      return updated;
    });
    pushNotification({
      title: 'New Construction Site Added',
      message: `"${newProj.name}" is now visible on Homepage & Projects page.`,
      type: 'system',
    });
  };

  const adminUpdateProject = (projId, updates) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projId
          ? {
              ...p,
              ...updates,
              progressPercent:
                updates.progressPercent !== undefined
                  ? Number(updates.progressPercent)
                  : p.progressPercent,
              startingPriceNGN:
                updates.startingPriceNGN !== undefined
                  ? Number(updates.startingPriceNGN)
                  : p.startingPriceNGN,
            }
          : p
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_projects_v1', JSON.stringify(updated));
      }
      return updated;
    });
    pushNotification({
      title: 'Site Project Updated',
      message: 'Project progress and details updated across the platform.',
      type: 'system',
    });
  };

  const adminDeleteProject = (projId) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== projId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_projects_v1', JSON.stringify(updated));
      }
      return updated;
    });
    pushNotification({
      title: 'Project Removed',
      message: 'Construction project removed from portfolio.',
      type: 'system',
    });
  };

  const adminDeleteLocation = (locId) => {
    setLocations((prev) => prev.filter((l) => l.id !== locId));
    pushNotification({
      title: 'Soil Zone Removed',
      message: 'Location removed from States & Soil Guide.',
      type: 'system',
    });
  };

  const adminUpdateHomepageConfig = (updates) => {
    setHomepageConfig((prev) => {
      const next = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('ekc_admin_homepage_v2', JSON.stringify(next));
      }
      return next;
    });
    pushNotification({
      title: 'Homepage Configuration Saved',
      message: 'Your Homepage layout, banners, and sections have been updated live.',
      type: 'system',
    });
  };

  const adminUpdateCompanyInfo = (updates) => {
    setCompanyInfo((prev) => ({ ...prev, ...updates }));
    pushNotification({
      title: 'Company Settings Updated',
      message: 'Global contact details and headquarters info updated.',
      type: 'system',
    });
  };

  const adminTogglePlugin = (pluginId) => {
    setAdminPlugins((prev) =>
      prev.map((pl) =>
        pl.id === pluginId
          ? {
              ...pl,
              enabled: !pl.enabled,
              statusLabel: !pl.enabled ? 'Active • Enabled by Admin' : 'Paused by Admin',
            }
          : pl
      )
    );
    pushNotification({
      title: 'Plugin Configuration Updated',
      message: 'Platform plugin status updated in real time.',
      type: 'system',
    });
  };

  const adminResetFactoryDefaults = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ekc_admin_properties_v3');
      localStorage.removeItem('ekc_custom_structures_v2');
      localStorage.removeItem('ekc_admin_projects_v1');
      localStorage.removeItem('ekc_admin_materials_v1');
      localStorage.removeItem('ekc_admin_homepage_v1');
      localStorage.removeItem('ekc_admin_specialists_v1');
    }
    setProperties(INITIAL_PROPERTIES);
    setProjects(INITIAL_PROJECTS);
    setLocations(INITIAL_LOCATIONS);
    setMaterialPrices(LIVE_MATERIAL_PRICE_INDEX);
    setHomepageConfig(DEFAULT_HOMEPAGE_CONFIG);
    setSpecialistAgents(EKESON_SPECIALIST_AGENTS);
    setAdminPlugins(DEFAULT_ADMIN_PLUGINS);
    pushNotification({
      title: 'Factory Defaults Restored',
      message: 'All Homepage settings, catalog plans, and material prices reset to default.',
      type: 'system',
    });
  };

  const addDynamicLocation = async (locInput) => {
    const newLoc = {
      id: `loc-${Date.now()}`,
      country: locInput.country || 'Nigeria',
      state: locInput.state || locInput.city,
      city: locInput.city,
      neighbourhood: locInput.neighbourhood,
      category: locInput.category || 'Domestic',
      propertyCount: Number(locInput.propertyCount) || 12,
      averageYield: locInput.averageYield || '150 kN/m² Bearing',
      soilProfile: locInput.soilProfile || 'Firm Lateritic Earth & Sand',
      recommendedFoundation:
        locInput.recommendedFoundation || 'Reinforced Concrete Strip/Pad or Raft Foundation',
      description:
        locInput.description ||
        `Verified building, soil test, and house construction zone across ${locInput.neighbourhood}, ${locInput.city}.`,
      image:
        locInput.image ||
        'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=85',
      featured: true,
    };

    setLocations((prev) => {
      const updated = [newLoc, ...prev];
      if (typeof window !== 'undefined') {
        const customOnly = updated.filter((l) => !INITIAL_LOCATIONS.some((il) => il.id === l.id));
        localStorage.setItem('ekc_custom_zones_v2', JSON.stringify(customOnly));
      }
      return updated;
    });

    broadcastLocalRealtimeEvent('NEW_LOCATION', newLoc);

    pushNotification({
      title: 'New Nigerian Location Zone Added',
      message: `${newLoc.neighbourhood}, ${newLoc.city} added to Soil & Foundation Guide.`,
      type: 'system',
    });

    return newLoc;
  };

  const submitEnquiry = async (enquiryData) => {
    const newEnq = {
      id: `enq-${Date.now()}`,
      enquiryType: enquiryData.enquiryType || 'Building Cost & Material List (BOQ)',
      propertyId: enquiryData.propertyId || null,
      propertyReference: enquiryData.propertyReference || 'EKC-QUOTE',
      propertyTitle: enquiryData.propertyTitle || 'Custom Building & Cost Quote',
      fullName: enquiryData.fullName || user?.fullName,
      email: enquiryData.email || user?.email,
      phone: enquiryData.phone || user?.phone,
      preferredLocation: enquiryData.preferredLocation || 'Lagos / Abuja / Enugu',
      propertyType: enquiryData.propertyType || 'Detached Duplex / Bungalow',
      budget: enquiryData.budget || 'Standard Move-In Finish',
      purpose: enquiryData.purpose || 'Complete Build on My Land',
      preferredDate: enquiryData.preferredDate || 'Ready to Start',
      message: enquiryData.message || '',
      status: 'Assigned to Nigerian Quantity Surveyor & Engineer',
      automatedEmailSent: true,
      createdAt: new Date().toISOString(),
    };

    setEnquiries((prev) => [newEnq, ...prev]);

    broadcastLocalRealtimeEvent('NEW_ENQUIRY', newEnq);

    pushNotification({
      title: `${newEnq.enquiryType} Logged!`,
      message: `Your building cost breakdown and material list request for ${newEnq.propertyReference} has been sent to ${newEnq.email}.`,
      type: 'email',
      emailRecipient: newEnq.email,
      emailSubject: `[Ekesonconstruct Nigeria] ${newEnq.enquiryType} — ${newEnq.propertyReference}`,
    });

    return newEnq;
  };

  const processPayment = async (paymentData) => {
    const ref = `EKC-NG-${Math.floor(10000 + Math.random() * 89999)}`;
    const newPay = {
      id: `pay-${Date.now()}`,
      reference: ref,
      propertyReference: paymentData.propertyReference || 'EKC-PLAN',
      propertyTitle: paymentData.propertyTitle || 'Complete Stamped Building Plan & Material List',
      payerName: paymentData.payerName || user?.fullName,
      payerEmail: paymentData.payerEmail || user?.email,
      paymentType: paymentData.paymentType || 'Complete Stamped Building Plan & Material List',
      amountNGN: Number(paymentData.amountNGN) || 2200000,
      currencyUsed: currency,
      status: 'Confirmed & Added to Your Dashboard',
      createdAt: new Date().toISOString(),
    };

    setPayments((prev) => [newPay, ...prev]);

    pushNotification({
      title: `Payment Confirmed (${newPay.reference})`,
      message: `${formatPrice(newPay.amountNGN)} received for ${newPay.paymentType}. Receipt sent to ${newPay.payerEmail}.`,
      type: 'payment',
      emailRecipient: newPay.payerEmail,
      emailSubject: `[Ekesonconstruct Receipt] ${newPay.reference} — ${newPay.paymentType}`,
    });

    return newPay;
  };

  const openEnquiryModal = (property = null, defaultType = 'Building Cost & Material List (BOQ)') => {
    setEnquiryModal({ open: true, property, defaultType });
  };

  const closeEnquiryModal = () => {
    setEnquiryModal({ open: false, property: null, defaultType: 'Building Cost & Material List (BOQ)' });
  };

  const openPaymentModal = (
    property = null,
    defaultType = 'Complete Stamped Building Plan & Material List',
    defaultAmountNGN = 2200000
  ) => {
    setPaymentModal({
      open: true,
      property,
      defaultType,
      defaultAmountNGN: property?.planFeeNGN || defaultAmountNGN,
    });
  };

  const closePaymentModal = () => {
    setPaymentModal((prev) => ({ ...prev, open: false }));
  };

  const openSpecialistModal = (specialist) => {
    const resolved =
      typeof specialist === 'string'
        ? specialistAgents.find((s) => s.id === specialist) || specialistAgents[0]
        : specialist || specialistAgents[0];
    setSpecialistModal({ open: true, specialist: resolved });
  };

  const closeSpecialistModal = () => {
    setSpecialistModal({ open: false, specialist: null });
  };

  const connectWithSpecialist = async (payload) => {
    const spec =
      specialistAgents.find((s) => s.id === payload.specialistId) ||
      specialistModal.specialist ||
      specialistAgents[0];
    const ref = `EKC-AGT-${Math.floor(100 + Math.random() * 899)}`;
    const newConn = {
      id: `spc-${Date.now()}`,
      reference: ref,
      specialistId: spec.id,
      roleTitle: spec.roleTitle,
      leadName: spec.leadName,
      licenseNo: spec.licenseNo,
      selectedCovering: payload.selectedCovering || spec.mainCovering[0],
      projectLocation: payload.projectLocation || 'Lagos / Abuja / Enugu',
      buildingStage: payload.buildingStage || spec.stageNeeded,
      userMessage:
        payload.userMessage ||
        `I want to connect with the ${spec.roleTitle} (${spec.leadName}) regarding my building project.`,
      status: `${spec.shortBadge} Connected • Ready in Your Dashboard`,
      createdAt: 'Just now',
    };

    setSpecialistConnections((prev) => [newConn, ...prev]);

    pushNotification({
      title: `Connected to ${spec.roleTitle} (${ref})`,
      message: `${spec.leadName} (${spec.licenseNo}) has received your specification brief for ${newConn.projectLocation}.`,
      type: 'email',
      emailRecipient: user?.email,
      emailSubject: `[Ekesonconstruct Specialist] Connected to ${spec.roleTitle}`,
    });

    return newConn;
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));

  const switchAccountRole = () => {};
  const loginDemoRole = () => {};

  return (
    <PlatformContext.Provider
      value={{
        currency,
        changeCurrency,
        formatPrice,
        user: { ...user, name: user?.fullName },
        switchAccountRole,
        loginDemoRole,
        registerOrSignIn,
        properties,
        addPropertyPost,
        locations,
        addDynamicLocation,
        addNewLocation: addDynamicLocation,
        projects,
        savedIds,
        savedProperties,
        toggleSavedProperty,
        designValuations,
        submitDesignForValuation,
        deleteDesignValuation,
        specialistAgents,
        specialistConnections,
        connectWithSpecialist,
        specialistModal,
        openSpecialistModal,
        closeSpecialistModal,
        chatMessages,
        sendChatMessage,
        materialPrices,
        priceAlerts,
        togglePriceAlert,
        checklistDoneIds,
        toggleChecklistItem,
        enquiries,
        quoteRequests: enquiries,
        submitEnquiry,
        submitQuoteRequest: submitEnquiry,
        payments,
        processPayment,
        notifications,
        markAllNotificationsRead,
        pushNotification,
        activeToast,
        setActiveToast,
        isSupabaseConfigured,
        enquiryModal,
        openEnquiryModal,
        setActiveQuoteProperty: (prop) => openEnquiryModal(prop, 'Building Cost & Material List (BOQ)'),
        closeEnquiryModal,
        listPropertyModalOpen,
        setListPropertyModalOpen,
        setIsPublishModalOpen: setListPropertyModalOpen,
        paymentModal,
        openPaymentModal,
        setActivePaymentProperty: (prop) =>
          openPaymentModal(prop, 'Complete Stamped Building Plan & Material List', prop?.planFeeNGN || 2200000),
        closePaymentModal,
        authModalOpen,
        setAuthModalOpen,
        // Admin & Homepage CMS exports
        homepageConfig,
        companyInfo,
        adminPlugins,
        adminCreateProperty,
        adminUpdateProperty,
        adminDeleteProperty,
        adminUpdateValuationStatus,
        adminUpdateEnquiryStatus,
        adminDeleteEnquiry,
        adminUpdatePaymentStatus,
        adminUpdateSpecialist,
        adminUpdateSpecialistConnection,
        adminUpdateMaterialPrice,
        adminAddMaterialPrice,
        adminCreateProject,
        adminUpdateProject,
        adminDeleteProject,
        adminDeleteLocation,
        adminUpdateHomepageConfig,
        adminUpdateCompanyInfo,
        adminTogglePlugin,
        adminResetFactoryDefaults,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
