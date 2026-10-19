// ============================================================================
// EKESONCONSTRUCT LIMITED — Civil & Structural Engineering Construction Platform
// Corporate Identity: Ekesonconstruct Limited (ekesonconstruct.africa)
// Principal Civil & Structural Engineering, Building Plans & Turnkey EPC Works
// Design Palette: Navy Blue (#0A1628), Pure White (#FFFFFF), Dark Green (#0D3B2E)
// ============================================================================

export const COMPANY_INFO = {
  name: 'Ekeconstruct Nigeria Limited',
  shortName: 'Ekeconstruct Nigeria',
  domain: 'ekeconstruct.africa',
  tagline: 'Nigeria’s #1 Smart Building, House Plan, Personal Design Valuation & Construction Platform',
  principalEngineer: 'Engr. Chibuike Ekeson, FNSE, COREN',
  certification: '100% Nigerian Owned • COREN Registered Engineers & Quantity Surveyors',
  phone: '+234 800 353 7662',
  whatsappNumber: '2348003537662',
  email: 'engineering@ekeconstruct.africa',
  conciergeEmail: 'projects@ekeconstruct.africa',
  headquarters: 'Plot 1408, Diplomatic Drive, Central Business District / Maitama Corridor, Abuja, FCT, Nigeria',
  openingHours: 'Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 4:00 PM (WAT)',
  offices: [
    {
      city: 'Abuja Head Office (FCT & Northern Nigeria)',
      address: 'Plot 1408, Diplomatic Drive, Maitama / CBD Corridor, Abuja, FCT',
      phone: '+234 800 353 7662',
      email: 'abuja@ekesonconstruct.africa',
      hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
    },
    {
      city: 'Lagos Office (Island, Mainland & South-West)',
      address: '14th Floor, Heritage Sovereign Tower, Adeola Odeku Street, Victoria Island, Lagos',
      phone: '+234 809 353 7663',
      email: 'lagos@ekesonconstruct.africa',
      hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
    },
    {
      city: 'Port Harcourt & South-South Office',
      address: '28 Evo Road, New GRA Phase II, Port Harcourt, Rivers State',
      phone: '+234 809 353 7664',
      email: 'phc@ekesonconstruct.africa',
      hours: 'Mon–Fri, 8:30 AM – 5:30 PM',
    },
    {
      city: 'Enugu / Owerri South-East Desk & Diaspora Support',
      address: 'Independence Layout, Enugu & New Owerri, Imo State (Serving Nigerians Home & Abroad)',
      phone: '+234 800 353 7662',
      email: 'diaspora@ekesonconstruct.africa',
      hours: 'Mon–Sat, 8:00 AM – 6:00 PM WAT',
    },
  ],
  socials: {
    instagram: 'https://instagram.com/ekesonconstruct',
    facebook: 'https://facebook.com/ekesonconstruct',
    linkedin: 'https://linkedin.com/company/ekesonconstruct',
    twitter: 'https://x.com/ekesonconstruct',
    youtube: 'https://youtube.com/@ekesonconstruct',
    tiktok: 'https://tiktok.com/@ekesonconstruct',
  },
  corporateProfile: [
    'Ekesonconstruct Limited is a proudly Nigerian building, house plan, and construction technology company built so every Nigerian—whether you are a first-time landowner, civil servant, business owner, family builder, or Nigerian living abroad (Japa/Diaspora)—can know the true cost of building a house in Nigeria without being cheated by contractors or middlemen.',
    'On our platform, you can pick a ready-made house plan, save your favourite properties, chat with our smart Nigerian Building Assistant (EkeBot), or even upload your own personal building design/sketch to get an instant Naira (₦) valuation showing how many bags of cement, blocks, iron rods, and trips of sand your building will need.',
    'From dry land in Abuja, Enugu, Ibadan, and Benin to swampy/waterlogged land in Lekki and Port Harcourt, our COREN-certified Nigerian engineers and builders handle everything step-by-step: from soil testing and foundation (DPC) to decking, roofing, plastering, and handing over your keys.',
  ],
  ourPromise:
    'Built for Nigerians, in plain language everyone understands: Know the exact cost, bags of cement, blocks, and iron rods for your dream house before you lay a single block—and pay stage-by-stage with zero stories.',
};

export const CURRENCIES = {
  NGN: { code: 'NGN', symbol: '₦', label: 'NGN (₦)', rate: 1, locale: 'en-NG' },
  USD: { code: 'USD', symbol: '$', label: 'USD ($)', rate: 0.00064, locale: 'en-US' },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 0.00050, locale: 'en-GB' },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 0.00059, locale: 'de-DE' },
};

export function formatCurrency(amountNGN, currencyCode = 'NGN', compact = false) {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  const converted = (Number(amountNGN) || 0) * curr.rate;

  if (compact) {
    if (converted >= 1_000_000_000) {
      return `${curr.symbol}${(converted / 1_000_000_000).toFixed(2)}B`;
    }
    if (converted >= 1_000_000) {
      return `${curr.symbol}${(converted / 1_000_000).toFixed(1)}M`;
    }
    if (converted >= 1_000) {
      return `${curr.symbol}${(converted / 1_000).toFixed(0)}K`;
    }
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: curr.code,
    maximumFractionDigits: 0,
  }).format(converted);
}

export const formatPrice = formatCurrency;

export function buildWhatsAppLink(structureOrMessage = null, customMessage = null) {
  const phone = COMPANY_INFO.whatsappNumber;
  let text = customMessage;
  if (typeof structureOrMessage === 'string') {
    text = structureOrMessage;
  } else if (!text && structureOrMessage && typeof structureOrMessage === 'object') {
    const planRef = structureOrMessage.reference || structureOrMessage.structuralCode || structureOrMessage.id || 'CUSTOM-PLAN';
    const title = structureOrMessage.title || structureOrMessage.name || 'Building Structure';
    const estCost = structureOrMessage.priceNGN
      ? ` (Est. Turnkey Build Cost: ₦${Number(structureOrMessage.priceNGN).toLocaleString()})`
      : '';
    text = `Hello Engr. Ekeson & Ekesonconstruct Civil Engineering Desk, I inspected the "${title}" [Plan ID: ${planRef}]${estCost} on your website. Please share the full Bill of Quantities (BOQ), structural drawing requirements, and current price to build this structure on my land.`;
  }
  if (!text) {
    text =
      'Hello Engr. Ekeson & Ekesonconstruct Limited, I would like to ask for the estimated cost of building a structure and speak with a Civil/Structural Engineer.';
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export const CORE_BUSINESS_PILLARS = [
  {
    id: 'personal-design-valuation',
    number: '01',
    title: 'Personal Design Valuation',
    subtitle: 'Have Your Own Plan or Sketch? Get Instant Cost & Material Valuation',
    description:
      'Already have a drawing from an architect or a house idea? Submit it on your User Dashboard to get the exact Naira cost, bags of cement, blocks, and iron rods needed to build it.',
    items: [
      'Instant Valuation for Your Personal House Plan',
      'Exact Bags of Cement, Blocks & Iron Rods Count',
      'Carcass (Roofed) vs Complete Move-In Price',
    ],
    href: '/dashboard?tab=valuation',
    badge: 'New in Nigeria',
  },
  {
    id: 'building-plans',
    number: '02',
    title: 'Ready-Made House & Building Plans',
    subtitle: 'Verified Nigerian Bungalows, Duplexes, Flats & Plazas',
    description:
      'Pick from our catalog of ready-to-build Nigerian house plans designed for Half Plot (300sqm), Full Plot (600sqm), or 2 Plots—complete with government approval drawings.',
    items: [
      'Architectural & Structural Approval Drawings',
      'Electrical, Plumbing & Soakaway/Biodigester Plans',
      'Fits Standard Nigerian Plot Sizes Nationwide',
    ],
    href: '/properties',
    badge: 'Pick & Save Plans',
  },
  {
    id: 'turnkey-construction',
    number: '03',
    title: 'We Build On Your Land (Pay Stage-by-Stage)',
    subtitle: 'From Foundation (DPC) to Decking, Roofing & Handing Over Keys',
    description:
      'You don’t need all the money at once. Our COREN-certified Nigerian engineers build on your land stage-by-stage—you can build to Carcass (Roofed) first or complete to Move-In finish.',
    items: [
      'Stage 1–3: Foundation (DPC), Blockwork & Decking',
      'Stage 4–5: Roofing, Plastering, Wiring & Plumbing',
      'Stage 6: Tiles, POP, Painting & Key Handover',
    ],
    href: '/development',
    badge: 'Pay-As-You-Build',
  },
  {
    id: 'quantity-surveying',
    number: '04',
    title: 'Honest Material List (No Contractor Cheating)',
    subtitle: 'Know Every Bag of Cement, Trip of Sand & Length of Rod',
    description:
      'Say goodbye to inflated material lists on site. We give you a clear Bill of Quantities (Material List) showing current Nigerian market prices for Dangote/BUA cement, blocks, and iron rods.',
    items: [
      'Clear Material List (Cement, Blocks, Sand, Granite)',
      'Live Nigerian Building Material Price Tracker',
      'Fence, Gatehouse & Borehole Cost Calculator',
    ],
    href: '/buy',
    badge: 'Zero Inflation',
  },
  {
    id: 'integrity-renovation',
    number: '05',
    title: 'Soil Test, Foundation & Uncompleted Buildings',
    subtitle: 'Dry Land, Swampy/Waterlogged Land & Building Checks',
    description:
      'Whether your land is in waterlogged Lekki/Port Harcourt or rocky Abuja/Enugu, we test the soil, build solid foundations (Raft, Pile, or Strip), and finish uncompleted houses.',
    items: [
      'Soil Test & Right Foundation Selection',
      'Finishing & Remodeling Uncompleted Houses',
      'Estate Roads, Drainage & Perimeter Fencing',
    ],
    href: '/services',
    badge: 'Solid Foundation',
  },
];

export const WHY_CHOOSE_EKESONCONSTRUCT = [
  {
    title: 'Written in Plain Language Every Nigerian Understands',
    description:
      'No confusing big grammar. We explain your foundation, decking, roofing, bags of cement, blocks, and iron rods in simple English so you are 100% in control.',
  },
  {
    title: 'Submit Your Own Personal Design for Valuation',
    description:
      'First of its kind in Nigeria: upload your own building plan or sketch in your User Dashboard and immediately see how much it will cost to build in your state.',
  },
  {
    title: '24/7 Smart Nigerian Building Chatbot (EkeBot)',
    description:
      'Ask our AI Building Advisor any question—from "How many blocks will fence 1 plot?" to "How much to roof a 4-bedroom bungalow?"—and get instant answers.',
  },
  {
    title: 'Honest Material Breakdown (Zero Site Theft)',
    description:
      'Know the exact number of 50kg cement bags, 9-inch blocks, tonnes/lengths of 12mm & 16mm iron rods, and tipper trips of sand before work starts.',
  },
  {
    title: 'Pay Stage-by-Stage (No Pressure)',
    description:
      'Build at your own pace! Pay strictly by stages: Foundation (DPC), Blockwork to Lintel, Decking, Roofing, Plastering/Wiring, and Tiling/Painting.',
  },
  {
    title: 'Choose "Carcass Only" or "Complete Move-In"',
    description:
      'Tight budget? We can build the strong structure and roof it (Carcass) so you can finish the tiles and painting later—or we deliver the complete house ready to live in.',
  },
  {
    title: 'Right Foundation for Swampy or Dry Land',
    description:
      'We test your soil first so whether your land is swampy (Lekki, Ajah, Port Harcourt, Warri) or dry (Abuja, Enugu, Ibadan, Benin), your house will never sink or crack.',
  },
  {
    title: 'Peace of Mind for Nigerians Abroad (Diaspora)',
    description:
      'Stop sending building money to relatives who send fake photos. Track live videos, drone updates, and material receipts right from your User Dashboard.',
  },
  {
    title: 'COREN-Certified Engineers & 25-Year Warranty',
    description:
      'Every building is supervised by registered Nigerian engineers with tested concrete and original iron rods—backed by a 25-year structural warranty.',
  },
  {
    title: 'Direct WhatsApp Access to Our Engineers',
    description:
      'One click connects you straight to Engr. Chibuike Ekeson and our Nigerian Quantity Surveyors on WhatsApp for fast, honest advice.',
  },
];

export const INITIAL_LOCATIONS = [
  {
    id: 'loc-abuja-hillside',
    country: 'Nigeria',
    state: 'FCT Abuja',
    city: 'Abuja',
    neighbourhood: 'Maitama, Guzape Hills & Katampe Extension',
    category: 'Domestic',
    propertyCount: 32,
    averageYield: 'Rock / Laterite (180–350 kN/m²)',
    soilProfile: 'Weathered Basement Complex Rock & Firm Lateritic Clay',
    recommendedFoundation: 'Reinforced Concrete Pad & Strip Footings + Stepped Retaining Walls',
    description:
      'Hillside and undulating granitic terrain requiring stepped RC foundations, rock anchoring, and cantilevered retaining walls.',
    image: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=85',
    featured: true,
  },
  {
    id: 'loc-lagos-coastal',
    country: 'Nigeria',
    state: 'Lagos State',
    city: 'Lagos',
    neighbourhood: 'Ikoyi, Victoria Island, Lekki & Eko Atlantic',
    category: 'Domestic',
    propertyCount: 45,
    averageYield: 'Coastal Alluvial (60–110 kN/m²)',
    soilProfile: 'Marine Sand, Silty Clay & High Water Table Subsoil',
    recommendedFoundation: 'Reinforced Concrete Raft Foundation or Bored Friction/End-Bearing Piles (18m–32m)',
    description:
      'Coastal zone demanding sulphate-resistant marine concrete (C35/45), deep bored piling, and cellular raft foundations.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    featured: true,
  },
  {
    id: 'loc-phc-delta',
    country: 'Nigeria',
    state: 'Rivers State',
    city: 'Port Harcourt',
    neighbourhood: 'New GRA, Peter Odili & Trans-Amadi Industrial',
    category: 'Domestic',
    propertyCount: 24,
    averageYield: 'Deltaic Clay/Sand (85–140 kN/m²)',
    soilProfile: 'Niger Delta Silty Clay over Dense Sand Stratum',
    recommendedFoundation: 'Wide Cellular RC Raft or Driven Precast Concrete Piles + Damp-Proof Tanking',
    description:
      'High-rainfall tropical zone engineered with elevated plinth levels (900mm+), deep storm drainage, and corrosion-protected steel.',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=85',
    featured: true,
  },
  {
    id: 'loc-enugu-coal',
    country: 'Nigeria',
    state: 'Enugu State',
    city: 'Enugu',
    neighbourhood: 'Independence Layout, Golf Estate & Centenary City',
    category: 'Domestic',
    propertyCount: 21,
    averageYield: 'Firm Laterite/Shale (150–220 kN/m²)',
    soilProfile: 'Consolidated Red Lateritic Earth & Shale Outcrops',
    recommendedFoundation: 'Reinforced Concrete Pad & Strip Foundation with Anti-Expansive Sand Cushion',
    description:
      'Ideal bearing strata for multi-storey residential duplexes, institutional complexes, and cantilevered hill villas.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    featured: true,
  },
  {
    id: 'loc-benin-edo',
    country: 'Nigeria',
    state: 'Edo State',
    city: 'Benin',
    neighbourhood: 'GRA Benin, Sapele Road & Irhirhi Corridor',
    category: 'Domestic',
    propertyCount: 18,
    averageYield: 'Benin Formation Sand (160–210 kN/m²)',
    soilProfile: 'Deep Well-Drained Reddish Lateritic Sand (Benin Formation)',
    recommendedFoundation: 'Reinforced Concrete Pad & Strip Footings at 1.5m–1.8m Depth',
    description:
      'High-permeability lateritic soil supporting rapid excavation, deep soakaway drainage, and heavy residential/commercial frames.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85',
    featured: false,
  },
  {
    id: 'loc-owerri-imo',
    country: 'Nigeria',
    state: 'Imo State',
    city: 'Owerri',
    neighbourhood: 'New Owerri, World Bank & Avu Corridor',
    category: 'Domestic',
    propertyCount: 19,
    averageYield: 'Coastal Plain Sand (140–190 kN/m²)',
    soilProfile: 'Uniform Lateritic Sand with Seasonal Perched Water Table',
    recommendedFoundation: 'Interconnected Ground-Beam Strip & Pad Foundation',
    description:
      'Active diaspora and hospitality construction hub where we execute duplex mansions, apartment blocks, and hotels.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    featured: false,
  },
  {
    id: 'loc-ogun-industrial',
    country: 'Nigeria',
    state: 'Ogun State',
    city: 'Ogun',
    neighbourhood: 'Abeokuta GRA, Sagamu Interchange & Agbara Industrial',
    category: 'Domestic',
    propertyCount: 27,
    averageYield: 'Laterite / Granite (175–280 kN/m²)',
    soilProfile: 'Firm Lateritic Clay & Granitic Outcrops',
    recommendedFoundation: 'Heavy-Duty Industrial Pad Foundations & Fibre-Reinforced Ground Slabs',
    description:
      'West Africa’s premier industrial belt for structural steel warehouses, factories, and large-scale housing estates.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85',
    featured: true,
  },
  {
    id: 'loc-ondo-abia-regional',
    country: 'Nigeria',
    state: 'Multi-State',
    city: 'Other Nigerian Cities',
    neighbourhood: 'Akure • Umuahia • Aba • Asaba • Ibadan • Kano • Uyo',
    category: 'Domestic',
    propertyCount: 38,
    averageYield: 'Site-Specific CPT Verified',
    soilProfile: 'Full Nationwide Geotechnical & Mobile Engineering Deployment',
    recommendedFoundation: 'Custom-Engineered post-CPT Soil Investigation',
    description:
      'Our mobile civil engineering teams, site engineers, and equipment deploy across all 36 states in Nigeria.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    featured: true,
  },
];

// ============================================================================
// BUILDING STRUCTURES & ARCHITECTURAL PLANS CATALOG (WITH FULL STRUCTURAL SPECS)
// ============================================================================
export const INITIAL_PROPERTIES = [
  {
    id: 'struct-1',
    reference: 'EKC-STR-001',
    title: 'The Sovereign Crest 6-Bedroom Triplex Mansion Structure',
    category: 'Duplex & Villa Structures',
    subCategory: 'Heavy Residential RC Frame',
    propertyType: 'Triplex Villa Structure (G + 2 Floors + Penthouse)',
    status: 'Ready-to-Build Plan + BOQ',
    priceNGN: 285000000,
    carcassPriceNGN: 128000000,
    standardPriceNGN: 285000000,
    luxuryPriceNGN: 410000000,
    planFeeNGN: 3800000,
    pricePeriod: 'Est. Turnkey Build',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Abuja',
    neighbourhood: 'Suitable for 800–1,500 sqm Plots (Abuja, Lagos, Enugu, Owerri)',
    address: 'Engineered to BS 8110 & Eurocode 2 • Full Structural & MEP Blueprint Pack',
    bedrooms: 6,
    bathrooms: 8,
    sizeSqm: 920,
    landSizeSqm: 900,
    floors: '3 Suspended Levels (G + 2 + Roof Terrace)',
    buildDuration: '40 – 48 Weeks (10–12 Months)',
    description:
      'A state-of-the-art 3-storey reinforced concrete residential structure engineered with a 3.8m dramatic front cantilever, double-height void over the main ante-room, reinforced concrete lift shaft for a residential glass elevator, infinity pool structural shell, and 3-room detached BQ.',
    structuralSpecs: {
      structuralSystem: 'Moment-Resisting Reinforced Concrete Frame with Post-Tensioned / Deep Transfer Beams',
      designCode: 'Eurocode 2 (EN 1992-1-1) & BS 8110-1:1997 | Wind Load: BS 6399-2',
      foundationType: 'Reinforced Concrete Raft Foundation (1,100mm Deep Ribbed Beam Raft) or 450mm Ø Bored Piles (Coastal)',
      concreteGrade: 'C35/45 Ready-Mix Concrete (Foundations, Columns & Transfer Beams) | C30/37 (Suspended Slabs)',
      steelReinforcement: 'High-Yield TMT Deformed Bars fy = 500 N/mm² (Y12, Y16, Y20, Y25 & Y32 Main Bars)',
      floorSlabSystem: '200mm Two-Way Solid Reinforced Concrete Slab + 250mm Waffle Slab over 8.4m Main Lounge Span',
      columnGrid: '6.2m × 7.5m Primary Grid | 300×600mm & 230×450mm RC Columns with Y25 Longitudinal Bars',
      beamSpecs: '300×750mm Cantilever Transfer Beams (3.8m Projection) | 230×450mm Secondary Floor Beams',
      wallSystem: '225mm (9-Inch) Vibrated Hollow Sandcrete Blocks (Min. 3.5 N/mm² Crushing Strength) + RC Shear Walls at Lift Core',
      roofStructure: 'Reinforced Concrete Parapet Gutter Slab + Galvanized Light-Gauge Steel Trusses (0.55mm Stone-Coated Tiles)',
      soilBearingCapacity: 'Minimum 150 kN/m² for Pad/Raft | Pile Option Engineered for <80 kN/m² Coastal Soils',
      seismicWindRating: 'Wind Speed up to 45 m/s | Factor of Safety (FoS) = 3.0 on Foundation Bearing',
    },
    costBreakdown: [
      { stage: '01. Substructure, Excavation & Raft/Pad Foundation', percent: 18, amountNGN: 51300000, details: 'Site clearing, setting out, blinding, Y16/Y20 raft reinforcement, C35/45 concrete pour, hardcore & DPC slab.' },
      { stage: '02. Ground, 1st & 2nd Floor RC Columns, Beams & Slabs', percent: 27, amountNGN: 76950000, details: 'Formwork, steel fixing, lift core shear walls, cantilevered transfer beams, staircases & 200mm suspended slabs.' },
      { stage: '03. Blockwork, Lintels, Parapet & Roof Structure', percent: 14, amountNGN: 39900000, details: '9-inch vibrated block walls, ring beams, cast-in-situ RC parapet gutter, steel trusses & roofing sheets.' },
      { stage: '04. First & Second Fix MEP (Electrical, Plumbing, HVAC)', percent: 16, amountNGN: 45600000, details: 'Conduits, armoured cabling, PPR pressure pipes, biodigester, VRF AC piping & solar-inverter microgrid.' },
      { stage: '05. Plastering, Screeding, Glazing & Turnkey Finishes', percent: 25, amountNGN: 71250000, details: 'Internal/external rendering, double-glazed curtain walls, porcelain/marble tiling, joinery & external paving.' },
    ],
    boqSummary: {
      concreteVolumeM3: '485 m³ (C30/37 & C35/45)',
      steelRebarTonnes: '64.5 Tonnes (Y10 – Y32 TMT)',
      cementBags: '4,250 Bags (42.5N Grade)',
      sandcreteBlocks: '28,500 Units (9-Inch Vibrated)',
      graniteTonnes: '690 Tonnes (19mm & 12mm)',
      sharpSandTonnes: '820 Tonnes (Washed River Sand)',
    },
    floorBreakdown: [
      { level: 'Substructure & Ground Floor (340 sqm)', spaces: 'Double-Height Foyer, Main Living Room, Dining, Chef Wet & Dry Kitchens, Guest Bedroom En-Suite, Visitor Waiting Lounge, Lift Shaft.' },
      { level: 'First Floor Suspended Deck (320 sqm)', spaces: 'Family Lounge with Void Overlook, 3 Spacious En-Suite Bedrooms with Walk-In Closets, Study / Home Office, Cantilevered Sit-Out Terrace.' },
      { level: 'Second Floor / Penthouse Deck (260 sqm)', spaces: 'Ambassadorial Master Suite (His & Hers Dressing + Spa Bath), Private 8-Seat Cinema Room, Gym, Sky Terrace & Rooftop Lounge.' },
    ],
    amenities: [
      'Complete COREN-Stamped Structural Drawings',
      'Architectural Working Drawings & 3D Renders',
      'Full Mechanical & Electrical (MEP) Drawings',
      'Itemized Bill of Quantities (BOQ) & Bar Bending Schedule',
      'Reinforced Concrete Elevator Core Included',
      '3.8m Structural Cantilever Terrace Design',
      'Swimming Pool & Detached 3-Room BQ Structural Plan',
      '25-Year Structural Frame Integrity Warranty',
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 9.0882,
    lng: 7.4934,
    featured: true,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-2',
    reference: 'EKC-STR-002',
    title: 'The Aurelia 5-Bedroom Contemporary Cantilevered Duplex Plan',
    category: 'Duplex & Villa Structures',
    subCategory: 'Residential RC Frame',
    propertyType: 'Detached Duplex Structure (G + 1 Floor)',
    status: 'Best-Selling Building Plan',
    priceNGN: 145000000,
    carcassPriceNGN: 68000000,
    standardPriceNGN: 145000000,
    luxuryPriceNGN: 210000000,
    planFeeNGN: 2200000,
    pricePeriod: 'Est. Turnkey Build',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Lagos',
    neighbourhood: 'Fits 500–650 sqm Plots (Standard Full Plot)',
    address: 'Engineered to BS 8110 • Pad/Strip or Raft Foundation Options Included',
    bedrooms: 5,
    bathrooms: 6,
    sizeSqm: 480,
    landSizeSqm: 500,
    floors: '2 Levels (Ground + First Floor + Hidden Parapet Roof)',
    buildDuration: '28 – 36 Weeks (7–9 Months)',
    description:
      'Our most popular 5-bedroom detached duplex structure designed to fit a standard 500–600 sqm plot with ample parking for 5 cars, a 2-room attached BQ, floating reinforced concrete staircase, floor-to-ceiling thermal glass panels, and hidden RC roof gutter slab.',
    structuralSpecs: {
      structuralSystem: 'Reinforced Concrete Column-Beam Frame with Monolithic Staircase & Cantilever Balcony',
      designCode: 'BS 8110-1:1997 & Eurocode 2 | Nigerian National Building Code Compliant',
      foundationType: 'Reinforced Concrete Pad & Strip Footings (1.5m–1.8m Depth) or 600mm Raft for Waterlogged Plots',
      concreteGrade: 'C30/37 Structural Concrete (1:1.5:3 Nominal / Ready-Mix) across Footings, Columns, Beams & Deck',
      steelReinforcement: 'High-Yield TMT Deformed Steel Bars fy = 460–500 N/mm² (Y12 Slab Mesh, Y16/Y20 Columns & Beams)',
      floorSlabSystem: '175mm Solid Two-Way Reinforced Concrete Suspended First Floor Slab',
      columnGrid: '5.4m × 6.0m Structural Grid | 230×230mm & 230×450mm Flushed RC Columns',
      beamSpecs: '230×450mm Main Floor Beams | 230×600mm Front Cantilever Beam (2.4m Projection)',
      wallSystem: '225mm (9-Inch) Hollow Sandcrete Blockwork Externally & Internally (Load-Relieved Partitioning)',
      roofStructure: 'Cast-in-Situ RC Parapet & Rainwater Gutter + Treated Timber or Steel King-Post Trusses (0.55mm Aluminum)',
      soilBearingCapacity: 'Minimum 130 kN/m² for Pad & Strip | Raft Option Included for 75–120 kN/m²',
      seismicWindRating: 'Wind Load 38 m/s | Deflection Span/Effective Depth Ratio Checked to BS 8110',
    },
    costBreakdown: [
      { stage: '01. Substructure & Foundation to DPC', percent: 17, amountNGN: 24650000, details: 'Trench & pad pit excavation, column bases, plinth beams, hardcore filling, damp-proof membrane & 150mm German floor.' },
      { stage: '02. Ground & First Floor RC Frame + Suspended Deck', percent: 26, amountNGN: 37700000, details: 'Ground columns, lintels, first-floor beam & 175mm slab casting, floating RC staircase & upper columns.' },
      { stage: '03. Blockwork, Parapet & Roof Truss Installation', percent: 15, amountNGN: 21750000, details: 'All 9-inch block walls, RC roof beam & parapet gutter casting, trusses & 0.55mm long-span roof sheets.' },
      { stage: '04. Mechanical, Electrical & Plumbing (MEP)', percent: 15, amountNGN: 21750000, details: 'Electrical wiring, distribution boards, borehole & overhead tank tower, septic/biodigester & AC piping.' },
      { stage: '05. Rendering, Tiling, Joinery & External Works', percent: 27, amountNGN: 39150000, details: 'Plastering, POP ceilings, Spanish porcelain tiles, kitchen cabinetry, security doors, stamped concrete & gatehouse.' },
    ],
    boqSummary: {
      concreteVolumeM3: '245 m³ (C30/37 Grade)',
      steelRebarTonnes: '29.8 Tonnes (Y10 – Y25 TMT)',
      cementBags: '2,350 Bags (42.5N Grade)',
      sandcreteBlocks: '15,800 Units (9-Inch & 6-Inch)',
      graniteTonnes: '360 Tonnes',
      sharpSandTonnes: '440 Tonnes',
    },
    floorBreakdown: [
      { level: 'Ground Floor Plan (245 sqm)', spaces: 'Security Ante-Room & Visitor Toilet, Double-Volume Main Living Area, Dining Room, En-Suite Guest Bedroom, Fitted Kitchen + Store, 2-Room BQ.' },
      { level: 'First Floor Suspended Deck (235 sqm)', spaces: 'Family Lounge, Master Bedroom Suite with Walk-In Closet & Balcony, 3 Additional En-Suite Bedrooms, Box Room / Study.' },
    ],
    amenities: [
      'Complete Structural & Architectural Blueprints',
      'Pad/Strip AND Raft Foundation Drawings Included',
      'Bar Bending Schedule (BBS) for Zero Steel Waste',
      'Full Itemized Bill of Quantities (BOQ)',
      '2.4m Front Cantilever Balcony Engineering',
      'Gatehouse, Fence & Stamped Forecourt Details',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 6.4549,
    lng: 3.4346,
    featured: true,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-3',
    reference: 'EKC-STR-003',
    title: 'Concordia 8-Unit Multi-Storey Apartment Block (G + 3 Floors)',
    category: 'Multi-Storey Apartment Blocks',
    subCategory: 'Multi-Family RC Structure',
    propertyType: '4-Storey Block of Flats (8 × 3-Bedroom Apartments)',
    status: 'Commercial / Multi-Unit Plan',
    priceNGN: 420000000,
    carcassPriceNGN: 195000000,
    standardPriceNGN: 420000000,
    luxuryPriceNGN: 560000000,
    planFeeNGN: 5500000,
    pricePeriod: 'Est. Turnkey Build',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Port Harcourt',
    neighbourhood: 'Engineered for 1,000–1,200 sqm Plots',
    address: 'Eurocode 2 Multi-Storey RC Frame + Dual Staircase & Lift Core',
    bedrooms: 24,
    bathrooms: 32,
    sizeSqm: 1680,
    landSizeSqm: 1000,
    floors: '4 Levels (Ground + 3 Suspended Floors)',
    buildDuration: '48 – 60 Weeks (12–15 Months)',
    description:
      'A high-density, structurally robust 4-storey residential block comprising eight (8) spacious 3-bedroom apartments (2 flats per floor), central passenger elevator core, dual fire-rated escape staircases, and ground-level parking bays.',
    structuralSpecs: {
      structuralSystem: '4-Storey Moment-Resisting RC Frame with Central Shear-Wall Elevator & Stair Core',
      designCode: 'Eurocode 2 (EN 1992) & BS 8110 | Fire Resistance Rating: REI 120 (2 Hours)',
      foundationType: 'Cellular Reinforced Concrete Raft Foundation (1,200mm Deep) or Bored Pile Group',
      concreteGrade: 'C35/45 Ready-Mix Concrete for Foundation, Lift Core & Columns | C30/37 for Suspended Slabs',
      steelReinforcement: 'High-Yield TMT Bars fy = 500 N/mm² (Y16, Y20, Y25 Columns/Beams; Y12 Double-Layer Slab Mat)',
      floorSlabSystem: '200mm Solid Reinforced Concrete Suspended Slabs across 1st, 2nd & 3rd Floors',
      columnGrid: '6.0m × 6.0m Regular Modular Grid | 350×500mm & 300×450mm Heavy RC Columns',
      beamSpecs: '300×600mm Primary Continuous Beams | 230×450mm Secondary Floor Beams',
      wallSystem: '225mm Vibrated Sandcrete Blocks + 200mm Cast-in-Situ RC Shear Walls around Lift & Fire Stairs',
      roofStructure: 'Steel Portal Roof Trusses over RC Ring Beam & Parapet Gutter + 0.70mm Industrial Long-Span Aluminum',
      soilBearingCapacity: 'Minimum 160 kN/m² for Raft | Pile Schedule Included for Coastal/Swampy Sites',
      seismicWindRating: 'Lateral Wind & Drift Checked for 16.5m Building Height',
    },
    costBreakdown: [
      { stage: '01. Substructure, Cellular Raft / Pile Foundation', percent: 20, amountNGN: 84000000, details: 'Bulk excavation, blinding, heavy raft reinforcement cage (Y20/Y25), C35/45 concrete pour & ground beams.' },
      { stage: '02. 4-Storey RC Frame, Lift Core & 3 Suspended Decks', percent: 31, amountNGN: 130200000, details: 'Columns, shear walls, beams & 200mm suspended slabs for 1st, 2nd & 3rd floors + dual RC staircases.' },
      { stage: '03. Blockwork Partitioning & Roof Structure', percent: 13, amountNGN: 54600000, details: '9-inch hollow block walls across 8 apartments, lintels, parapet & steel roof trusses.' },
      { stage: '04. Multi-Unit MEP, Lift Installation & Fire Systems', percent: 16, amountNGN: 67200000, details: '8-stop meter distribution, rising mains, sewage treatment plant, fire hydrants & 8-person passenger lift.' },
      { stage: '05. Internal/External Finishes & External Civil Works', percent: 20, amountNGN: 84000000, details: 'Plastering, tiling, kitchens/baths for 8 units, external interlocking pavement & transformer/generator plinth.' },
    ],
    boqSummary: {
      concreteVolumeM3: '890 m³ (C30/37 & C35/45)',
      steelRebarTonnes: '118.0 Tonnes (Y10 – Y25 TMT)',
      cementBags: '7,600 Bags (42.5N Grade)',
      sandcreteBlocks: '48,000 Units (9-Inch Vibrated)',
      graniteTonnes: '1,280 Tonnes',
      sharpSandTonnes: '1,450 Tonnes',
    },
    floorBreakdown: [
      { level: 'Ground Floor (420 sqm)', spaces: '2 × 3-Bedroom En-Suite Apartments, Entrance Lobby, Elevator Core, Dual Stairwells & 16 Covered Car Parking Bays.' },
      { level: '1st, 2nd & 3rd Floors (3 × 420 sqm)', spaces: 'Each floor houses 2 symmetrical 3-Bedroom En-Suite Apartments (Living/Dining, Kitchen, Laundry, 3 En-Suite Beds, 1 BQ Room & Balconies).' },
    ],
    amenities: [
      'Full 4-Storey Structural Frame & Shear-Wall Calculations',
      'COREN-Stamped Multi-Storey Approval Drawings',
      'Elevator Pit & Machine-Roomless (MRL) Shaft Specs',
      'Dual Fire-Escape Staircase Structural Detailing',
      'Complete Itemized BOQ for All 8 Apartments',
      'Central Sewage & Water Reticulation Engineering',
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 4.8242,
    lng: 7.0036,
    featured: true,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-4',
    reference: 'EKC-STR-004',
    title: 'Emerald Atrium 6-Storey Grade-A Commercial Office Structure',
    category: 'Commercial & Office Structures',
    subCategory: 'Commercial High-Rise RC Frame',
    propertyType: '6-Storey Commercial Office Building (Column-Free Floor Plates)',
    status: 'Institutional / Corporate Plan',
    priceNGN: 780000000,
    carcassPriceNGN: 365000000,
    standardPriceNGN: 780000000,
    luxuryPriceNGN: 980000000,
    planFeeNGN: 9500000,
    pricePeriod: 'Est. Turnkey Build',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Lagos',
    neighbourhood: 'CBD / Commercial Plots (1,200–2,000 sqm)',
    address: 'Post-Tensioned / Waffle Slab Long-Span Commercial Engineering',
    bedrooms: 0,
    bathrooms: 24,
    sizeSqm: 2850,
    landSizeSqm: 1500,
    floors: '6 Levels (Ground Reception + Mezzanine + 4 Open-Plan Office Floors)',
    buildDuration: '60 – 76 Weeks (15–18 Months)',
    description:
      'A state-of-the-art 6-storey commercial office structure engineered with 9.0m × 9.0m wide-span ribbed waffle slabs to deliver open, column-free corporate floor plates, structural curtain-wall glazing anchors, twin elevator shafts, and basement/ground parking.',
    structuralSpecs: {
      structuralSystem: 'Dual Structural System: Moment-Resisting RC Perimeter Frame + Central Reinforced Concrete Core Wall',
      designCode: 'Eurocode 2 (EN 1992-1-1) & BS 8110 | Imposed Office Live Load: 4.0 kN/m² + 1.0 kN/m² Partitions',
      foundationType: 'Deep Bored Concrete Piles (600mm Ø to 26m Depth) + 1,500mm Thick Pile Caps & Tie Beams',
      concreteGrade: 'C40/50 High-Strength Concrete (Columns, Core Walls & Pile Caps) | C35/45 (Waffle Slabs)',
      steelReinforcement: 'High-Yield TMT Bars fy = 500 N/mm² (Y16, Y20, Y25, Y32) + BRC A393 Top Topping Mesh',
      floorSlabSystem: '325mm Deep Two-Way Ribbed Waffle Slab (75mm Solid Topping + 250mm Ribs at 900mm Centers)',
      columnGrid: '9.0m × 9.0m Long-Span Commercial Grid | 450×600mm & 500×500mm High-Strength RC Columns',
      beamSpecs: '400×750mm Wide-Band Primary Beams | Perimeter Curtain-Wall Edge Beams',
      wallSystem: '250mm Reinforced Concrete Core Walls (Twin Lift Shafts & Pressurized Fire Stairs) + Double-Glazed Aluminium Curtain Wall',
      roofStructure: '200mm Waterproofed Flat RC Service Roof Slab (Engineered for HVAC Chillers & Solar Array Loads)',
      soilBearingCapacity: 'Piled Foundation Engineered for 650 kN Working Load per Pile (Dynamic Load Tested)',
      seismicWindRating: 'Wind Tunnel & Lateral Drift < H/500 | 2-Hour Fire Rating (REI 120)',
    },
    costBreakdown: [
      { stage: '01. Piling, Pile Caps, Ground Beams & Basement/Ground Slab', percent: 24, amountNGN: 187200000, details: 'Rotary bored piling (600mm Ø), pile integrity testing (PIT), pile caps, tie beams & ground slab.' },
      { stage: '02. 6-Storey RC Core Wall, Columns & Waffle Floor Slabs', percent: 32, amountNGN: 249600000, details: 'Slip/jump-form RC lift core, 450×600mm columns & 325mm waffle slab moulds across 6 levels.' },
      { stage: '03. Unitized Curtain-Wall Facade & Masonry Cores', percent: 16, amountNGN: 124800000, details: 'Double-glazed Low-E solar curtain walling, Alucobond cladding & fire-rated core blockwork.' },
      { stage: '04. Commercial MEP, Twin Elevators, VRF HVAC & Fire Suppression', percent: 16, amountNGN: 124800000, details: 'Twin 13-passenger high-speed lifts, central VRF air-conditioning, sprinkler system & 500kVA substation.' },
      { stage: '05. Raised Access Floors, Acoustic Ceilings & Lobby Fit-Out', percent: 12, amountNGN: 93600000, details: 'Granite double-height lobby, modular raised flooring, washroom cores & external asphalt parking.' },
    ],
    boqSummary: {
      concreteVolumeM3: '1,640 m³ (C35/45 & C40/50)',
      steelRebarTonnes: '235.0 Tonnes (Y12 – Y32 TMT)',
      cementBags: '13,200 Bags (42.5N / 52.5R)',
      sandcreteBlocks: '22,000 Units (Core & Washrooms)',
      graniteTonnes: '2,350 Tonnes',
      sharpSandTonnes: '2,600 Tonnes',
    },
    floorBreakdown: [
      { level: 'Ground Floor & Mezzanine (550 sqm)', spaces: 'Double-Height Security Reception Atrium, Twin Elevator Lobby, Facility Control Room, Cafe/Showroom & Covered Parking.' },
      { level: '1st to 4th Typical Office Floors (4 × 520 sqm)', spaces: '9.0m × 9.0m Column-Free Open Office Floor Plates, Executive Washroom Cores, Server Room & Kitchenette.' },
      { level: '5th Floor Executive Penthouse & Roof Deck (220 sqm)', spaces: 'Executive Boardroom Suite, Rooftop Terrace & Reinforced Mechanical Chiller/Solar Plant Deck.' },
    ],
    amenities: [
      '9.0m × 9.0m Column-Free Waffle Slab Engineering',
      'Full Pile Foundation & Pile Cap Structural Drawings',
      'Curtain-Wall Wind Load & Anchor Calculations',
      'Twin Elevator Core & Fire-Stair Pressurization Specs',
      'Complete Commercial BOQ & Phased Construction Schedule',
      'COREN & State Building Control Approval Pack',
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 6.4375,
    lng: 3.4285,
    featured: true,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-5',
    reference: 'EKC-STR-005',
    title: 'Greenhaven 4-Bedroom Contemporary Winged Bungalow Plan',
    category: 'Bungalow & Family Structures',
    subCategory: 'Single-Storey RC & Masonry',
    propertyType: 'High-Headroom Contemporary Bungalow (3.6m Ceiling + Parapet)',
    status: 'Fast-Track 16-Week Build',
    priceNGN: 58000000,
    carcassPriceNGN: 26500000,
    standardPriceNGN: 58000000,
    luxuryPriceNGN: 82000000,
    planFeeNGN: 950000,
    pricePeriod: 'Est. Turnkey Build',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Enugu',
    neighbourhood: 'Fits 450–600 sqm Plots',
    address: 'Cost-Engineered Strip/Pad Foundation + High-Parapet Contemporary Roof',
    bedrooms: 4,
    bathrooms: 5,
    sizeSqm: 245,
    landSizeSqm: 450,
    floors: 'Single Level (Elevated 750mm Plinth + High Roof Parapet)',
    buildDuration: '14 – 18 Weeks (3.5–4.5 Months)',
    description:
      'Designed with the bold visual presence of a duplex while maintaining single-storey accessibility and cost efficiency. Features a 750mm elevated damp-proof plinth, 3.6m internal ceiling height, cast-in-situ RC roof fascia parapet, and 4 en-suite bedrooms.',
    structuralSpecs: {
      structuralSystem: 'Load-Bearing 225mm Vibrated Sandcrete Masonry Reinforced with RC Stub Columns, Plinth & Roof Ring Beams',
      designCode: 'BS 8110 & BS 5628 (Structural Use of Masonry)',
      foundationType: '675mm Wide Reinforced Concrete Strip Foundation at 1.2m Depth + Pad Bases under Verandah Columns',
      concreteGrade: 'C25/30 Structural Concrete (Foundations, Stub Columns, Lintels, Ring Beam & Parapet Fascia)',
      steelReinforcement: 'High-Yield TMT Bars fy = 460 N/mm² (Y12 Main Bars in Columns/Ring Beams, Y10 Stirrups @ 200mm c/c)',
      floorSlabSystem: '150mm Thick Oversite Concrete Slab (German Floor) over 300mm Hardcore & 1200-Gauge Polythene DPM',
      columnGrid: '4.5m × 5.0m Span Grid | 225×225mm RC Stiffener Columns at Wall Intersections',
      beamSpecs: '225×300mm Continuous Perimeter Lintels & Roof Tie Beam + 900mm High RC Parapet Crown',
      wallSystem: '225mm (9-Inch) Vibrated Hollow Sandcrete Blocks throughout',
      roofStructure: 'Seasoned Hardwood / Light-Gauge Steel Trusses + 0.55mm Stone-Coated Step-Tile Roofing',
      soilBearingCapacity: 'Minimum 100 kN/m² Safe Bearing Capacity',
      seismicWindRating: 'Hurricane-Clipped Roof Truss Anchorage into Continuous RC Ring Beam',
    },
    costBreakdown: [
      { stage: '01. Substructure, Strip Foundation & Elevated German Floor', percent: 22, amountNGN: 12760000, details: 'Excavation, concrete strip footings, foundation blockwork, laterite filling, hardcore, DPM & 150mm oversite slab.' },
      { stage: '02. Superstructure Blockwork, Stiffener Columns & Ring Beam', percent: 20, amountNGN: 11600000, details: '9-inch block walls to 3.6m headroom, RC columns, continuous lintel/ring beam & front verandah portal.' },
      { stage: '03. RC Parapet Fascia & Stone-Coated Roof Installation', percent: 18, amountNGN: 10440000, details: 'Cast-in-situ concrete parapet gutter, timber/steel roof trusses & 0.55mm stone-coated roofing tiles.' },
      { stage: '04. Mechanical, Electrical & Plumbing (MEP)', percent: 14, amountNGN: 8120000, details: 'Conduit wiring, plumbing piping, borehole, overhead tank stand & biodigester.' },
      { stage: '05. Plastering, POP, Tiling, Cabinetry & Compound Paving', percent: 26, amountNGN: 15080000, details: 'Internal/external rendering, POP ceiling, floor/wall tiles, kitchen cabinets, doors & perimeter fence.' },
    ],
    boqSummary: {
      concreteVolumeM3: '98 m³ (C25/30 Grade)',
      steelRebarTonnes: '8.4 Tonnes (Y10 – Y16 TMT)',
      cementBags: '1,120 Bags (42.5N Grade)',
      sandcreteBlocks: '7,400 Units (9-Inch Vibrated)',
      graniteTonnes: '145 Tonnes',
      sharpSandTonnes: '190 Tonnes',
    },
    floorBreakdown: [
      { level: 'Single-Storey Elevated Floor Plan (245 sqm)', spaces: 'Entrance Porch, Ante-Room & Visitor WC, Central High-Ceiling Living Room, Dining Alcove, Fitted Kitchen + Verandah, Master Bedroom Suite + 3 En-Suite Family Bedrooms.' },
    ],
    amenities: [
      'Complete Architectural, Structural & MEP Working Drawings',
      'Full Itemized Bill of Quantities (BOQ)',
      '750mm Elevated Anti-Flood Plinth Design',
      '3.6m High-Headroom Cross-Ventilated Layout',
      'Cast-in-Situ RC Parapet Roof Fascia Details',
      '14–18 Week Fast-Track Construction Program',
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 6.4413,
    lng: 7.5248,
    featured: true,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-6',
    reference: 'EKC-STR-006',
    title: 'TitanSpan 2,400 SQM Structural Steel Portal Frame Warehouse & Office',
    category: 'Industrial & Steel Structures',
    subCategory: 'Structural Steel Portal Frame',
    propertyType: 'Clear-Span Industrial Warehouse + 2-Storey RC Admin Block',
    status: 'Industrial EPC Structure',
    priceNGN: 540000000,
    carcassPriceNGN: 340000000,
    standardPriceNGN: 540000000,
    luxuryPriceNGN: 650000000,
    planFeeNGN: 6800000,
    pricePeriod: 'Est. Turnkey Build',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Ogun',
    neighbourhood: 'Industrial Parks & Logistics Corridors (3,500+ sqm Land)',
    address: 'Eurocode 3 (EN 1993) Universal Beam Steel Portal Frame + FM2 Industrial Floor Slab',
    bedrooms: 0,
    bathrooms: 10,
    sizeSqm: 2400,
    landSizeSqm: 4000,
    floors: '9.5m Eaves Clear-Span Warehouse + 2-Storey Office Mezzanine',
    buildDuration: '32 – 40 Weeks (8–10 Months)',
    description:
      'Heavy-duty 30m clear-span × 80m long structural steel portal frame warehouse and factory facility with a 2-storey reinforced concrete administrative office annex, overhead crane corbel provision (10-Tonne Gantry capacity), and laser-screeded fibre-reinforced industrial floor slab.',
    structuralSpecs: {
      structuralSystem: '30m Clear-Span Hot-Rolled S355JR Structural Steel Portal Frame (6.0m Bay Spacing) + RC Admin Frame',
      designCode: 'Eurocode 3 (EN 1993-1-1) & BS 5950 (Steelwork) | TR34 Industrial Ground Floor Code',
      foundationType: 'Heavy-Duty Reinforced Concrete Pad Footings (2.4m × 2.4m) with Grade 8.8 HD Holding-Down Anchor Bolts',
      concreteGrade: 'C35/45 Steel-Fibre Reinforced Concrete Industrial Floor Slab (225mm Thick, 50 kN/m² Uniform Load)',
      steelReinforcement: 'S355 Universal Columns (UC 305×305×118) & Universal Beams (UB 533×210×92) + Cold-Formed Z-Purlins',
      floorSlabSystem: '225mm Power-Floated C35/45 Industrial Ground Slab with Saw-Cut Contraction Joints & Epoxy Seal',
      columnGrid: '30.0m Clear Span (Zero Internal Columns) × 6.0m Longitudinal Portal Bays (13 Bays = 78m)',
      beamSpecs: 'Haunched UB 533×210×92 Portal Rafters + Gantry Crane Runway Brackets at 7.0m Height',
      wallSystem: '2.4m High 225mm RC/Blockwork Dado Wall + 0.55mm Insulated Aluzinc Cladding Panels & Polycarbonate Skylights',
      roofStructure: 'Pitched Structural Steel Portal Rafters (6° Pitch) + Z200 Galvanized Purlins + 0.70mm Industrial Aluzinc Sheets',
      soilBearingCapacity: 'Minimum 150 kN/m² | CBR > 15% Engineered Sub-Base under Warehouse Floor',
      seismicWindRating: 'Wind Bracing in End Bays, Roof Plan & Eaves Struts | 2-Coat Zinc-Phosphate Anti-Corrosion Paint',
    },
    costBreakdown: [
      { stage: '01. Earthworks, Pad Foundations & HD Holding-Down Bolts', percent: 18, amountNGN: 97200000, details: 'Sub-base compaction, RC pad footings, pedestal columns, template bolt setting & perimeter ground beams.' },
      { stage: '02. S355 Structural Steel Fabrication & Erection', percent: 34, amountNGN: 183600000, details: 'CNC cutting, submerged-arc welding, sandblasting, epoxy priming & crane erection of 30m span portal frames.' },
      { stage: '03. 225mm Heavy-Duty Industrial Floor Slab & Dado Wall', percent: 20, amountNGN: 108000000, details: 'BRC mesh / steel fibre reinforcement, C35/45 laser-levelled concrete pour, power floating & dado walls.' },
      { stage: '04. Roof Cladding, Insulated Side Sheeting & Roller Shutters', percent: 14, amountNGN: 75600000, details: '0.70mm industrial roof sheets, ridge ventilators, translucent skylights & 4 motorized 5m×5m roller doors.' },
      { stage: '05. 2-Storey Office Mezzanine, Industrial MEP & Loading Bay', percent: 14, amountNGN: 75600000, details: 'Admin offices, high-bay LED lighting, 3-phase industrial busbar, fire ring-main & heavy truck apron.' },
    ],
    boqSummary: {
      concreteVolumeM3: '780 m³ (C35/45 Grade)',
      steelRebarTonnes: '142.0 Tonnes (S355 Portal Steel + Rebar)',
      cementBags: '6,400 Bags (42.5N / 52.5R)',
      sandcreteBlocks: '14,500 Units (Dado & Office Walls)',
      graniteTonnes: '1,150 Tonnes',
      sharpSandTonnes: '1,250 Tonnes',
    },
    floorBreakdown: [
      { level: 'Main Warehouse Hall (2,050 sqm)', spaces: '30m Clear-Span Production/Storage Floor, 9.5m Eaves Height, 4 Dock-Level Loading Bays, 10-Tonne Crane Corbels.' },
      { level: '2-Storey RC Office & Welfare Block (350 sqm)', spaces: 'Ground Reception, QA Lab, Staff Changing Rooms & Canteen; First Floor Open-Plan Operations Office & Boardroom.' },
    ],
    amenities: [
      'Full Eurocode 3 (EN 1993) Steel Connection Drawings',
      'Holding-Down Bolt & Pad Foundation Calculations',
      '10-Tonne Overhead Gantry Crane Corbel Provision',
      '225mm Power-Floated Industrial Slab Design',
      'Motorized Roller Shutter & Loading Dock Details',
      'Complete Steel Tonnage & Civil BOQ Schedule',
    ],
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 6.8485,
    lng: 3.4382,
    featured: true,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-7',
    reference: 'EKC-STR-007',
    title: 'The Kensington 4-Bedroom Twin Semi-Detached Duplex Structure',
    category: 'Duplex & Villa Structures',
    subCategory: 'Twin / Terrace RC Frame',
    propertyType: 'Semi-Detached Twin Duplex (2 Mirror Units × 4-Bedrooms)',
    status: 'High-ROI Dual Structure Plan',
    priceNGN: 185000000,
    carcassPriceNGN: 86000000,
    standardPriceNGN: 185000000,
    luxuryPriceNGN: 255000000,
    planFeeNGN: 2800000,
    pricePeriod: 'Est. Turnkey Build (Both Wings)',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Abuja',
    neighbourhood: 'Fits 650–800 sqm Plots',
    address: 'Acoustic Double Party-Wall RC Frame • Independent Services per Wing',
    bedrooms: 8,
    bathrooms: 10,
    sizeSqm: 680,
    landSizeSqm: 700,
    floors: '2 Levels (Ground + First Floor across Twin Symmetrical Wings)',
    buildDuration: '32 – 40 Weeks (8–10 Months)',
    description:
      'Engineered for landowners and family builders who want two independent 4-bedroom luxury duplexes on a single plot. Features an acoustic double-leaf structural party wall, independent foundation tie beams, separate gate entrances, and 2 en-suite BQs.',
    structuralSpecs: {
      structuralSystem: 'Symmetrical Twin Reinforced Concrete Frame with Acoustic Double-Wall Separation',
      designCode: 'BS 8110-1:1997 & Eurocode 2',
      foundationType: 'Combined Pad & Strip Foundation with Central Eccentricity Strap Beams',
      concreteGrade: 'C30/37 Structural Concrete throughout Columns, Beams, Staircases & Suspended Deck',
      steelReinforcement: 'High-Yield TMT Bars fy = 460–500 N/mm² (Y12, Y16, Y20)',
      floorSlabSystem: '175mm Solid Two-Way Reinforced Concrete Suspended Slab',
      columnGrid: '5.2m × 5.8m Grid per Wing | 230×300mm & 230×450mm RC Columns',
      beamSpecs: '230×450mm Main Floor Beams | 230×500mm Cantilever Balcony Beams',
      wallSystem: '300mm Acoustic Central Party Wall + 225mm Vibrated Sandcrete External/Internal Walls',
      roofStructure: 'Independent Parapet RC Gutters per Wing + Steel/Timber Trusses (0.55mm Step-Tile)',
      soilBearingCapacity: 'Minimum 135 kN/m² (Raft Option Available for Coastal/Soft Soils)',
      seismicWindRating: 'Expansion/Movement Joint Integrated Along Central Party Axis',
    },
    costBreakdown: [
      { stage: '01. Substructure & Combined Foundation to DPC', percent: 18, amountNGN: 33300000, details: 'Excavation for both wings, pad bases, strap beams, foundation walls, hardcore & 150mm oversite slab.' },
      { stage: '02. Twin Superstructure RC Frame & First Floor Deck', percent: 26, amountNGN: 48100000, details: 'Columns, lintels, beams, twin RC staircases & 680 sqm total floor area concrete works.' },
      { stage: '03. Blockwork, Acoustic Party Wall & Roofing', percent: 15, amountNGN: 27750000, details: '9-inch vibrated blocks, central soundproof party wall, parapet gutters & roof installation.' },
      { stage: '04. Independent Dual MEP Systems', percent: 15, amountNGN: 27750000, details: 'Separate electrical distribution, plumbing, boreholes & biodigesters for Wing A and Wing B.' },
      { stage: '05. Rendering, Tiling, Joinery & Dual Forecourts', percent: 26, amountNGN: 48100000, details: 'Complete interior & exterior finishes, two fitted kitchens, dividing fence & two sliding gates.' },
    ],
    boqSummary: {
      concreteVolumeM3: '335 m³ (C30/37 Grade)',
      steelRebarTonnes: '41.5 Tonnes (Y10 – Y20 TMT)',
      cementBags: '3,100 Bags (42.5N Grade)',
      sandcreteBlocks: '21,400 Units (9-Inch Vibrated)',
      graniteTonnes: '490 Tonnes',
      sharpSandTonnes: '580 Tonnes',
    },
    floorBreakdown: [
      { level: 'Ground Floor (2 × 170 sqm = 340 sqm)', spaces: 'Each Wing: Ante-Room, Living & Dining Room, Fitted Kitchen + Pantry, En-Suite Guest Bedroom & 1-Room En-Suite BQ.' },
      { level: 'First Floor Deck (2 × 170 sqm = 340 sqm)', spaces: 'Each Wing: Family Lounge, Master Bedroom with Walk-In Closet & Balcony, 2 Additional En-Suite Bedrooms.' },
    ],
    amenities: [
      'Dual Independent 4-Bedroom Duplex Structural Plans',
      'Acoustic Party-Wall & Movement Joint Engineering',
      'Separate MEP & Utility Metering Schematics',
      'Complete Itemized BOQ for Single or Phased Construction',
      'COREN-Stamped Approval Drawings',
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 9.0765,
    lng: 7.4792,
    featured: false,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-8',
    reference: 'EKC-STR-008',
    title: 'MedCore 50-Bed Specialist Hospital & Diagnostic Center Structure',
    category: 'Commercial & Office Structures',
    subCategory: 'Healthcare & Institutional RC Frame',
    propertyType: '3-Storey Healthcare & Medical Facility Structure',
    status: 'Institutional Engineering Plan',
    priceNGN: 520000000,
    carcassPriceNGN: 240000000,
    standardPriceNGN: 520000000,
    luxuryPriceNGN: 680000000,
    planFeeNGN: 7500000,
    pricePeriod: 'Est. Turnkey Build',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Benin',
    neighbourhood: 'Fits 1,500–2,500 sqm Institutional Plots',
    address: 'Radiation-Shielded Radiology Bunkers + Stretcher Lift + Vibration-Free ICU Slab',
    bedrooms: 50,
    bathrooms: 42,
    sizeSqm: 1950,
    landSizeSqm: 1800,
    floors: '3 Levels (Ground Emergency/Radiology + 1st Surgical/ICU + 2nd In-Patient Wards)',
    buildDuration: '48 – 60 Weeks (12–15 Months)',
    description:
      'Purpose-engineered 3-storey medical and diagnostic complex featuring high-density concrete radiation shielding for CT/X-Ray rooms, vibration-isolated surgical theatre slabs, wide hospital stretcher elevator core, and structural emergency ramp.',
    structuralSpecs: {
      structuralSystem: 'Heavy-Duty Reinforced Concrete Frame with Radiation-Shielded Bunkers & Anti-Vibration Theatre Slabs',
      designCode: 'Eurocode 2 & HTM (Health Technical Memoranda) Structural Standards | Live Load: 5.0 kN/m²',
      foundationType: 'Reinforced Concrete Raft Foundation (1,000mm Deep) + Isolated Equipment Plinths for MRI/CT Scanners',
      concreteGrade: 'C35/45 High-Density Concrete (350mm Thick Walls around Radiology) | C30/37 Superstructure',
      steelReinforcement: 'High-Yield TMT Bars fy = 500 N/mm² (Y16, Y20, Y25)',
      floorSlabSystem: '225mm Thick Solid RC Slabs to Eliminate Footfall Vibration in Operating Theatres & ICU',
      columnGrid: '7.2m × 7.2m Hospital Corridor Module (2.4m Clear Stretcher Corridors)',
      beamSpecs: '300×600mm Main Beams with Sleeved MEP Service Penetrations for Medical Gas & HVAC Ducts',
      wallSystem: '350mm Barytes/High-Density Concrete Walls (Radiology) + 225mm Anti-Bacterial Rendered Blockwork',
      roofStructure: 'Reinforced Concrete Roof Deck + Steel Truss Over-Roof for Medical Gas & Chiller Plant Protection',
      soilBearingCapacity: 'Minimum 150 kN/m²',
      seismicWindRating: 'Importance Factor γI = 1.4 (Critical Healthcare Infrastructure Class)',
    },
    costBreakdown: [
      { stage: '01. Substructure, Raft Foundation & MRI/CT Equipment Bunkers', percent: 21, amountNGN: 109200000, details: 'Excavation, raft foundation, high-density radiation bunker walls & vibration-isolated scanner plinths.' },
      { stage: '02. 3-Storey RC Frame, 225mm Slabs & Stretcher Ramp', percent: 29, amountNGN: 150800000, details: 'Columns, beams, 225mm anti-vibration slabs, hospital bed-lift core & non-slip RC ambulance/stretcher ramp.' },
      { stage: '03. Blockwork, Lead-Lined Partitioning & Roof Deck', percent: 14, amountNGN: 72800000, details: 'Hospital corridor masonry, lead-lined radiology partitions & weatherproof steel over-roof.' },
      { stage: '04. Medical Gas Piping, Hospital Bed Lift & Cleanroom HVAC', percent: 18, amountNGN: 93600000, details: 'Copper medical oxygen/vacuum piping, HEPA surgical theatre air-handling & 1,600kg stretcher elevator.' },
      { stage: '05. Seamless Vinyl Flooring, Hygienic Wall Cladding & External Works', percent: 18, amountNGN: 93600000, details: 'Anti-static medical vinyl floors, scrub sinks, ambulance bay canopy & 3-stage medical waste plant.' },
    ],
    boqSummary: {
      concreteVolumeM3: '1,050 m³ (C30/37 & C35/45)',
      steelRebarTonnes: '136.0 Tonnes (Y12 – Y25 TMT)',
      cementBags: '8,800 Bags (42.5N Grade)',
      sandcreteBlocks: '34,000 Units (9-Inch Vibrated)',
      graniteTonnes: '1,480 Tonnes',
      sharpSandTonnes: '1,650 Tonnes',
    },
    floorBreakdown: [
      { level: 'Ground Floor (680 sqm)', spaces: 'Ambulance Bay, Emergency Triage, CT/MRI/X-Ray Radiology Bunker, Outpatient Consulting Rooms, Pharmacy & Diagnostic Laboratory.' },
      { level: 'First Floor (650 sqm)', spaces: '2 Modular Operating Theatres, 6-Bed ICU, Scrub & Sterilization (CSSD), Maternity & Neonatal Delivery Suite.' },
      { level: 'Second Floor (620 sqm)', spaces: 'Private & Semi-Private In-Patient Wards (44 Beds), Nurses Stations, Doctors Call Rooms & Admin Wing.' },
    ],
    amenities: [
      '225mm Anti-Vibration Surgical Theatre Slab Design',
      'CT/X-Ray Radiation Shielding Structural Details',
      '1,600kg Hospital Stretcher Elevator Core Specs',
      'Emergency Stretcher Ramp (1:12 Gradient) Engineering',
      'Full Medical Gas & Cleanroom MEP Coordination',
      'Complete Institutional BOQ & Phased Costing',
    ],
    images: [
      'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 6.3176,
    lng: 5.6145,
    featured: false,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
  {
    id: 'struct-9',
    reference: 'EKC-STR-009',
    title: 'Estate Civil Infrastructure Package: 1.5km Road, RC Box Culverts & Retaining Wall',
    category: 'Civil Infrastructure & Bridges',
    subCategory: 'Highway, Drainage & Retaining Structures',
    propertyType: 'Civil Engineering Infrastructure Package (Per Kilometer / Estate)',
    status: 'Heavy Civil Works',
    priceNGN: 310000000,
    carcassPriceNGN: 185000000,
    standardPriceNGN: 310000000,
    luxuryPriceNGN: 395000000,
    planFeeNGN: 4500000,
    pricePeriod: 'Est. Civil EPC Package',
    country: 'Nigeria',
    state: 'Nationwide Execution',
    city: 'Abuja',
    neighbourhood: 'Estates, Communities & Industrial Layouts Nationwide',
    address: 'FMWH Highway & Bridge Design Manual + BS 5400 Box Culvert Specifications',
    bedrooms: 0,
    bathrooms: 0,
    sizeSqm: 15000,
    landSizeSqm: 50000,
    floors: 'Sub-Base + Stone Base + 50mm Asphalt Wearing Course + Dual RC Drains',
    buildDuration: '20 – 28 Weeks (5–7 Months)',
    description:
      'Complete civil engineering infrastructure execution for residential estates, industrial parks, and access roads. Includes topographic survey, earthworks grading, twin cast-in-situ reinforced concrete U-drains, double-cell RC box culverts, cantilevered retaining walls, and 50mm hot-rolled asphalt or 80mm interlocking stone pavement.',
    structuralSpecs: {
      structuralSystem: 'Flexible Asphaltic / Rigid Interlocking Pavement + Cast-in-Situ RC Hydraulic Culverts & Cantilever Retaining Walls',
      designCode: 'Federal Ministry of Works Highway Manual & BS 5400 / Eurocode 1 (HA & HB Axle Wheel Loads)',
      foundationType: '150mm Compacted Lateritic Sub-Base (CBR > 30%) + 150mm Crushed Stone Base Course (CBR > 80%)',
      concreteGrade: 'C35/45 Sulphate-Resistant Concrete (Box Culverts & Retaining Walls) | C25/30 (Line Drains & Kerbs)',
      steelReinforcement: 'High-Yield TMT Bars fy = 500 N/mm² (Y16 & Y20 Culvert Deck & Retaining Wall Stem Bars, Y12 Distribution)',
      floorSlabSystem: '50mm Asphaltic Concrete Wearing Course over MC-1 Prime Coat OR 80mm Vibrated Concrete Paving Stones (40 N/mm²)',
      columnGrid: '3.0m × 2.5m Twin-Cell RC Box Culvert Span | 10.0m Carriageway Width + Walkways',
      beamSpecs: '300mm Thick RC Culvert Top Deck Slab (Engineered for 45-Tonne Articulated Trucks)',
      wallSystem: '200mm Cast-in-Situ RC U-Channel Storm Drains (900×900mm) + 3.5m High Cantilevered RC Retaining Walls with Weep Holes',
      roofStructure: 'Solar-Powered Galvanized Streetlight Poles (9m Conical) at 30m Intervals + Underground Electrical Ducts',
      soilBearingCapacity: '98% West African Proctor Compaction Density Tested via In-Situ Sand Replacement Method',
      seismicWindRating: '50-Year Return Period Storm Hydraulic Capacity',
    },
    costBreakdown: [
      { stage: '01. Topographic Survey, Clearing & Earthworks Cut-to-Fill', percent: 18, amountNGN: 55800000, details: 'Total station survey, topsoil stripping, grader shaping, embankment filling & sheep-foot roller compaction.' },
      { stage: '02. Twin Cast-in-Situ RC Storm Drains & Box Culverts', percent: 30, amountNGN: 93000000, details: '3km total length of reinforced concrete U-drains, culvert wing walls, apron slabs & discharge outfalls.' },
      { stage: '03. Sub-Base, Crushed Stone Base Course & Kerbs', percent: 22, amountNGN: 68200000, details: 'Lateritic sub-base, wet-mix macadam crushed granite stone base & precast hydraulically pressed kerbs.' },
      { stage: '04. 50mm Asphaltic Wearing Course / 80mm Interlocking Paving', percent: 22, amountNGN: 68200000, details: 'MC-1 bitumen priming, asphalt paver laying, tandem pneumatic rolling & thermoplastic road markings.' },
      { stage: '05. Underground Utility Ducts & Solar Streetlighting', percent: 8, amountNGN: 24800000, details: 'UPVC cross-road sleeves, inspection manholes & 50 integrated solar LED streetlighting columns.' },
    ],
    boqSummary: {
      concreteVolumeM3: '1,120 m³ (Drains & Culverts)',
      steelRebarTonnes: '88.0 Tonnes (Y12 – Y20 TMT)',
      cementBags: '8,400 Bags (42.5N Grade)',
      sandcreteBlocks: 'Precast Kerbs: 3,000 Linear Meters',
      graniteTonnes: '4,800 Tonnes (Stone Base & Aggregates)',
      sharpSandTonnes: '2,100 Tonnes',
    },
    floorBreakdown: [
      { level: 'Hydraulic & Retaining Structures', spaces: 'Twin 900mm × 900mm RC Storm Drains, 2 × Double-Cell RC Box Culverts, and Stepped Cantilever Retaining Walls.' },
      { level: 'Pavement & Utility Corridor', spaces: '7.3m–10.0m Carriageway, Precast Concrete Kerbs, Pedestrian Walkways, Underground Fiber/Power Sleeves & Solar Streetlights.' },
    ],
    amenities: [
      'Topographic & Longitudinal Profile Engineering Drawings',
      '45-Tonne Axle Load Box Culvert Calculations',
      'Cantilever Retaining Wall Stability Analysis',
      'Proctor Compaction & CBR Lab Testing Included',
      'Complete Civil Bill of Engineering Measurement & Evaluation (BEME)',
    ],
    images: [
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: '',
    lat: 9.0112,
    lng: 7.5103,
    featured: true,
    agentName: 'Engr. Chibuike Ekeson, FNSE, COREN',
    agentRole: 'Principal Civil & Structural Engineer',
    agentPhone: '+234 800 353 7662',
  },
];

// ============================================================================
// ONGOING & COMPLETED CIVIL / STRUCTURAL CONSTRUCTION SITES
// ============================================================================
export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    reference: 'EKC-SITE-01',
    name: 'Guzape Hills Cantilevered Triplex Villas & Stepped Retaining Wall Works',
    location: 'Guzape Hills District, Abuja FCT',
    city: 'Abuja',
    category: 'Hillside Structural Engineering & Turnkey Build',
    stage: 'Current Project',
    developmentPhase: '2nd Floor Post-Tensioned Cantilever Deck & Roof Parapet (78% Complete)',
    progressPercent: 78,
    completionStatus: 'Q1 2027 Structural & Turnkey Handover',
    availableUnits: 6,
    totalUnits: 6,
    startingPriceNGN: 285000000,
    structuralHighlight: '6.5m High Counterfort RC Retaining Wall + C35/45 Rock-Anchored Pad Foundations',
    description:
      'Execution of six (6) hillside triplex structures on a 22-degree granitic slope in Guzape. Our civil engineering team blasted and terraced the rock formation, constructed a 6.5m counterfort reinforced concrete retaining wall, and cast 3.8m cantilevered upper decks.',
    features: [
      'C35/45 Ready-Mix Concrete Verified at 41.2 N/mm² (28-Day Cube Test)',
      '6.5m Counterfort RC Retaining Wall with Sub-Surface Weep Drains',
      '3.8m Projection Cantilevered Transfer Beams (Y32 High-Yield Rebar)',
      'Full MEP Conduit Integration & Lift Shaft Core Completed',
    ],
    images: [
      'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'proj-2',
    reference: 'EKC-SITE-02',
    name: 'Atlantic Crest 10-Storey RC Frame & Deep Pile Foundation Project',
    location: 'Victoria Island / Lekki Foreshore Corridor, Lagos',
    city: 'Lagos',
    category: 'High-Rise Piling & Structural Frame',
    stage: 'Current Project',
    developmentPhase: '84 Rotary Bored Piles (28m Depth) + 5th Floor Waffle Slab Cast (52%)',
    progressPercent: 52,
    completionStatus: 'Q4 2027 Completion',
    availableUnits: 1,
    totalUnits: 1,
    startingPriceNGN: 780000000,
    structuralHighlight: '84 × 600mm Ø Bored Friction Piles to 28m + 1.5m Thick C40/50 Pile Caps',
    description:
      'Deep foundation and superstructure package on coastal marine subsoil in Lagos. Includes 84 rotary bored concrete piles tested via Sonic Integrity Testing (SIT) and Static Load Testing to 1,200 kN, supporting a 10-storey waffle-slab commercial and residential tower.',
    features: [
      '100% Pile Integrity Test (PIT) & Static Load Test Passed',
      'Sulphate-Resistant Marine Concrete (C40/50) in Substructure',
      'Slip-Formed Twin Elevator & Pressurized Fire-Stair Core',
      '325mm Two-Way Ribbed Waffle Slabs for 9m Column-Free Spans',
    ],
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ],
    renders: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'proj-3',
    reference: 'EKC-SITE-03',
    name: 'Sagamu Interchange 3,000 SQM Structural Steel Logistics Hub',
    location: 'Sagamu-Abeokuta Industrial Axis, Ogun State',
    city: 'Ogun',
    category: 'Structural Steel Portal Frame & Industrial Civil Works',
    stage: 'Current Project',
    developmentPhase: 'Portal Steel Frame Erected — Laser-Screeded Floor Pouring (85%)',
    progressPercent: 85,
    completionStatus: 'Q1 2027 Handover',
    availableUnits: 1,
    totalUnits: 1,
    startingPriceNGN: 540000000,
    structuralHighlight: '32m Clear-Span S355JR Universal Beam Portal Frame + 225mm Fibre-Reinforced Floor',
    description:
      'Design, fabrication, and erection of a 165-tonne structural steel portal frame warehouse with a 2-storey reinforced concrete administrative block, heavy-duty articulated truck turning apron, and perimeter storm drainage.',
    features: [
      '165 Tonnes of Shot-Blasted & Epoxy-Primed S355 Steelwork',
      '225mm Steel-Fibre Reinforced C35/45 Industrial Floor Slab',
      '10-Tonne Overhead Crane Runway Beam Integration',
      '1.2km Perimeter RC Storm Drainage & Weighbridge Foundation',
    ],
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80',
    ],
    renders: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'proj-4',
    reference: 'EKC-SITE-04',
    name: 'The Emerald Court 5-Bedroom Duplex Cluster & Estate Civil Works',
    location: 'Independence Layout, Enugu & New GRA, Port Harcourt',
    city: 'Enugu',
    category: 'Turnkey Residential Construction',
    stage: 'Completed Project',
    developmentPhase: '100% Completed — Structural Sign-Off & Key Handover',
    progressPercent: 100,
    completionStatus: 'Completed Ahead of Schedule',
    availableUnits: 8,
    totalUnits: 8,
    startingPriceNGN: 145000000,
    structuralHighlight: 'C30/37 Monolithic RC Frame + 80mm Interlocked Estate Road & Box Culvert',
    description:
      'Turnkey execution of eight (8) detached 5-bedroom duplexes commissioned by diaspora families, complete with internal asphalt/interlocked roads, underground electrical ducting, and central water treatment plant.',
    features: [
      'Delivered 3 Weeks Ahead of Baseline Gantt Schedule',
      'Zero Structural Defects at 12-Month Defect Liability Inspection',
      'Bi-Weekly 4K Drone & Cube-Test Reports Sent to Diaspora Owners',
      'Full As-Built Structural & MEP Drawings Handed Over',
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    renders: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

// ============================================================================
// 7-STAGE CIVIL ENGINEERING & TURNKEY CONSTRUCTION PROTOCOL
// ============================================================================
export const BUYING_PROCESS_STEPS = [
  {
    step: '01',
    stage: 'Pick or Upload',
    title: 'Pick a House Plan or Submit Your Personal Design',
    description:
      'Choose a ready-made house plan from our catalog OR upload your own personal architectural drawing in your User Dashboard for instant cost valuation.',
    deliverable: 'Instant Cost Estimate & Material List',
  },
  {
    step: '02',
    stage: 'Land & Soil Check',
    title: 'Land Inspection & Soil Test (Dry vs Swampy Land)',
    description:
      'We inspect your plot of land and test the soil so we know whether your land needs a standard Strip foundation, Raft foundation, or Pile foundation.',
    deliverable: 'Official Soil Test & Foundation Report',
  },
  {
    step: '03',
    stage: 'Drawings & List',
    title: 'Stamped Drawings & Honest Material List (BOQ)',
    description:
      'We give you COREN-stamped building drawings and a clear Material List showing the exact bags of cement, blocks, iron rods, and sand needed for each stage.',
    deliverable: 'Stamped Drawings & Full Material List',
  },
  {
    step: '04',
    stage: 'Foundation (DPC)',
    title: 'Digging, Foundation & German Floor (DPC Stage)',
    description:
      'Clearing the land, digging trenches, tying iron rods, pouring foundation concrete, filling with laterite/hardcore, and casting a damp-proof German floor.',
    deliverable: 'Solid Foundation & German Floor (DPC)',
  },
  {
    step: '05',
    stage: 'Blocks & Roof',
    title: 'Blockwork, Lintels, Decking & Roofing (Carcass Stage)',
    description:
      'Setting 9-inch vibrated blocks, casting pillars/beams and upper floor decking (for duplexes/flats), parapet facial, and installing stone-coated or long-span roofing.',
    deliverable: 'Roofed Structure (Carcass Complete)',
  },
  {
    step: '06',
    stage: 'Wiring & Finishing',
    title: 'Plastering, Wiring, Plumbing, POP, Tiles & Painting',
    description:
      'Electrical wiring, piping for water & soakaway/biodigester, wall plastering, POP ceilings, floor/wall tiles, kitchen cabinets, doors, windows, and painting.',
    deliverable: 'Fully Finished & Painted Building',
  },
  {
    step: '07',
    stage: 'Collect Keys',
    title: 'Final Quality Check, 25-Year Warranty & Key Handover',
    description:
      'We test all water pipes, electrical sockets, borehole, and structural strength, issue your 25-Year Structural Warranty, and hand over the keys to your new house!',
    deliverable: 'House Keys + 25-Year Warranty Certificate',
  },
];

export const PROPERTY_MANAGEMENT_SERVICES = [
  {
    title: 'Structural Engineering & Frame Analysis',
    description:
      '3D finite-element structural modeling (Orion / Tekla / Staad.Pro / Etabs) for reinforced concrete and structural steel buildings to BS 8110 and Eurocode 2.',
  },
  {
    title: 'Geotechnical Soil Investigation (CPT / SPT)',
    description:
      'Dutch Cone Penetration Tests, percussion borehole drilling, triaxial shear strength lab tests, and foundation bearing capacity recommendations.',
  },
  {
    title: 'Deep Pile & Raft Foundation Engineering',
    description:
      'Rotary bored piling, CFA piles, driven precast concrete piles, pile caps, and cellular buoyancy raft foundations for waterlogged and coastal terrains.',
  },
  {
    title: 'Quantity Surveying & Bill of Quantities (BOQ)',
    description:
      'Comprehensive material take-offs, bar bending schedules (BBS), cement/rebar/aggregate tonnage schedules, and stage-by-stage construction budgeting.',
  },
  {
    title: 'Turnkey Building Construction (Carcass to Finish)',
    description:
      'Full EPC site execution with resident COREN engineers, concrete cube crushing tests, and milestone-based reporting for local and diaspora clients.',
  },
  {
    title: 'Non-Destructive Structural Integrity Testing (NDT)',
    description:
      'Ultrasonic Pulse Velocity (UPV), Rebound (Schmidt) Hammer tests, rebar ferroscan, and structural stability certification for existing buildings.',
  },
  {
    title: 'Structural Retrofitting & Foundation Underpinning',
    description:
      'Remediation of distressed structures via RC column jacketing, carbon-fibre (CFRP) wrapping, crack epoxy injection, and foundation underpinning.',
  },
  {
    title: 'Structural Steel Fabrication & Portal Warehouses',
    description:
      'Design, CNC fabrication, sandblasting, and erection of long-span industrial warehouses, aircraft hangars, pedestrian bridges, and roof trusses.',
  },
  {
    title: 'Road Construction, Drainage & Box Culverts',
    description:
      'Earthworks, lateritic sub-base compaction, crushed stone base, asphaltic/interlocked roads, RC U-drains, box culverts, and hillside retaining walls.',
  },
  {
    title: 'Mechanical, Electrical & Plumbing (MEP) Engineering',
    description:
      'Industrial and residential electrical load calculation, transformer/solar microgrids, VRF air-conditioning, fire suppression, and water treatment plants.',
  },
  {
    title: 'Building Control Approvals & COREN Stamping',
    description:
      'Preparation and sealing of structural calculations, soil reports, and working drawings for FCDA, LASBCA, and State Planning Authority approvals.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'I picked the 5-Bedroom Aurelia Duplex Plan on Ekesonconstruct while living in Manchester. Engr. Ekeson’s team conducted the soil test on my Enugu land, shared the exact BOQ down to every bag of cement and tonne of Y16 rod, and built the structure to turnkey perfection with bi-weekly drone videos.',
    author: 'Dr. Obinna & Mrs. Chisom Nwachukwu',
    role: 'Diaspora Landowners • Manchester, UK & Enugu',
    tag: 'Picked Plan EKC-STR-002 • Turnkey Build',
  },
  {
    quote:
      'Our Lekki plot had poor swampy soil that scared two previous contractors. Ekesonconstruct ran a 30m CPT geotechnical test, engineered a 1,100mm cellular raft foundation with C35/45 concrete, and delivered our 4-storey apartment block with zero settlement.',
    author: 'Engr. Tunde Bakare',
    role: 'Operations Director, Atlantic Energy Logistics • Lagos',
    tag: 'Deep Foundation & 4-Storey RC Frame',
  },
  {
    quote:
      'For our 2,400 sqm factory warehouse in Ogun State, Ekesonconstruct delivered the Eurocode 3 steel portal calculations, pad foundations, and power-floated industrial floor slab 3 weeks ahead of schedule.',
    author: 'Chief (Mrs.) Folake Adeyemi',
    role: 'Managing Director, AgroAllied Processing Ltd • Ogun',
    tag: 'Industrial Steel Portal Warehouse',
  },
];

// ============================================================================
// LIVE CONSTRUCTION MATERIAL BENCHMARK RATES (QUANTITY SURVEYING INDEX)
// ============================================================================
export const LIVE_MATERIAL_PRICE_INDEX = [
  {
    code: 'MAT-CEM-425',
    category: 'Cement & Binders',
    material: '42.5N / 52.5R Portland Limestone Cement (Dangote / BUA / Lafarge)',
    unit: 'Per 50kg Bag',
    rateNGN: 9500,
    specStandard: 'NIS 444-1 / BS EN 197-1',
    application: 'Structural RC Frames, Slabs, Footings & Blockwork Mortar',
  },
  {
    code: 'MAT-REB-Y12',
    category: 'High-Yield Reinforcement',
    material: 'High-Yield TMT Deformed Steel Rebar (Y12 / Y16 — fy = 500 N/mm²)',
    unit: 'Per Metric Tonne',
    rateNGN: 1380000,
    specStandard: 'BS 4449 Grade B500B',
    application: 'Two-Way Suspended Slabs, Stirrups, Secondary Beams & Lintels',
  },
  {
    code: 'MAT-REB-Y25',
    category: 'High-Yield Reinforcement',
    material: 'Heavy Structural TMT Steel Rebar (Y20 / Y25 / Y32 — fy = 500 N/mm²)',
    unit: 'Per Metric Tonne',
    rateNGN: 1420000,
    specStandard: 'BS 4449 Grade B500B',
    application: 'Raft Foundations, Pile Cages, Columns & Cantilever Transfer Beams',
  },
  {
    code: 'MAT-CON-C35',
    category: 'Ready-Mix Concrete',
    material: 'C30/37 – C35/45 Batch-Plant Ready-Mix Structural Concrete (Pumped)',
    unit: 'Per Cubic Meter (m³)',
    rateNGN: 165000,
    specStandard: 'BS EN 206 / BS 8500',
    application: 'Monolithic Raft Pours, Suspended Waffle Decks & High-Rise Cores',
  },
  {
    code: 'MAT-AGG-19M',
    category: 'Coarse Aggregates',
    material: 'Crushed Igneous Granite Aggregate (12mm / 19mm Graded)',
    unit: 'Per 30-Tonne Trip',
    rateNGN: 690000,
    specStandard: 'BS 882 Graded Aggregate',
    application: 'High-Strength Structural Concrete Mixing & Road Stone Base',
  },
  {
    code: 'MAT-BLK-9IN',
    category: 'Structural Masonry',
    material: '225mm (9-Inch) Hydraulically Vibrated Hollow Sandcrete Block (≥3.5 N/mm²)',
    unit: 'Per Unit Block',
    rateNGN: 1150,
    specStandard: 'NIS 87:2007 / BS 5628',
    application: 'External Load-Relieved Walls, Acoustic Partitions & Foundation Walls',
  },
  {
    code: 'MAT-STL-S355',
    category: 'Structural Steelwork',
    material: 'Hot-Rolled S355JR Universal Beams (UB) & Columns (UC) — Fabricated & Primed',
    unit: 'Per Metric Tonne',
    rateNGN: 2450000,
    specStandard: 'Eurocode 3 (EN 1993-1-1)',
    application: '30m+ Clear-Span Portal Warehouses, Gantry Corbels & Roof Trusses',
  },
  {
    code: 'MAT-ROF-055',
    category: 'Roofing & Cladding',
    material: '0.55mm Stone-Coated Gerard Tiles / 0.70mm Industrial Long-Span Aluzinc',
    unit: 'Per Square Meter (m²)',
    rateNGN: 14500,
    specStandard: 'ASTM A792 / AZ150 Coating',
    application: 'Tropical Storm-Resistant Roof Cladding over RC Parapet Crown',
  },
];

// ============================================================================
// BUILDING TYPE & STRUCTURAL SYSTEM COMPARISON MATRIX
// ============================================================================
export const STRUCTURAL_COMPARISON_MATRIX = [
  {
    buildingClass: 'Contemporary Bungalows',
    typicalLevels: 'Single Storey (+750mm Plinth)',
    structuralSystem: '225mm Masonry + RC Stiffener Columns & Ring Beam',
    typicalFoundation: '675mm RC Strip & Pad Footings (1.2m Depth)',
    concreteGrade: 'C25/30',
    columnSpan: '4.5m – 5.2m',
    carcassRatePerSqmNGN: 108000,
    turnkeyRatePerSqmNGN: 236000,
    typicalDuration: '14 – 18 Weeks',
  },
  {
    buildingClass: 'Detached & Twin Duplexes',
    typicalLevels: 'G + 1 to G + 2 Floors',
    structuralSystem: 'Moment-Resisting RC Frame + Cantilever Beams',
    typicalFoundation: 'Pad & Strip (1.5m–1.8m) or 600mm–1,100mm RC Raft',
    concreteGrade: 'C30/37 – C35/45',
    columnSpan: '5.4m – 7.5m',
    carcassRatePerSqmNGN: 140000,
    turnkeyRatePerSqmNGN: 302000,
    typicalDuration: '28 – 44 Weeks',
  },
  {
    buildingClass: 'Multi-Storey Apartment Blocks',
    typicalLevels: 'G + 3 to G + 5 Floors',
    structuralSystem: 'RC Frame + Central Shear-Wall Lift & Stair Core',
    typicalFoundation: '1,200mm Cellular RC Raft or 450mm Ø Bored Piles',
    concreteGrade: 'C35/45',
    columnSpan: '6.0m × 6.0m',
    carcassRatePerSqmNGN: 116000,
    turnkeyRatePerSqmNGN: 250000,
    typicalDuration: '48 – 60 Weeks',
  },
  {
    buildingClass: 'Commercial & Hospital Complexes',
    typicalLevels: 'G + 3 to G + 8 Floors',
    structuralSystem: 'Dual RC Core + 325mm Two-Way Ribbed Waffle Slabs',
    typicalFoundation: '600mm Ø Rotary Bored Piles (18m–28m) + Pile Caps',
    concreteGrade: 'C35/45 – C40/50',
    columnSpan: '7.2m – 9.0m Clear',
    carcassRatePerSqmNGN: 128000,
    turnkeyRatePerSqmNGN: 273000,
    typicalDuration: '52 – 76 Weeks',
  },
  {
    buildingClass: 'Industrial Steel Warehouses',
    typicalLevels: '9.5m Eaves + 2-Floor Mezzanine',
    structuralSystem: 'S355JR Hot-Rolled Universal Beam Portal Frame',
    typicalFoundation: '2.4m × 2.4m Heavy Pad Bases + 225mm Fibre Slab',
    concreteGrade: 'C35/45 + S355 Steel',
    columnSpan: '30.0m Clear Span',
    carcassRatePerSqmNGN: 141000,
    turnkeyRatePerSqmNGN: 225000,
    typicalDuration: '32 – 40 Weeks',
  },
  {
    buildingClass: 'Estate Roads, Drains & Culverts',
    typicalLevels: 'Heavy Civil Infrastructure',
    structuralSystem: 'Stone Base + 50mm Asphalt + RC Box Culverts',
    typicalFoundation: '98% Proctor Compacted Sub-Base (CBR > 30–80%)',
    concreteGrade: 'C35/45 (Culverts)',
    columnSpan: '3.0m × 2.5m Twin Cell',
    carcassRatePerSqmNGN: 12500,
    turnkeyRatePerSqmNGN: 20600,
    typicalDuration: '20 – 28 Weeks / 1.5km',
  },
];

// ============================================================================
// GEOTECHNICAL FOUNDATION SELECTION MATRIX
// ============================================================================
export const FOUNDATION_SELECTION_GUIDE = [
  {
    code: 'FND-01',
    type: 'Reinforced Concrete Strip & Pad Foundation',
    bearingCapacity: '> 130 – 250 kN/m²',
    typicalDepth: '1.2m – 1.8m below NGL',
    idealSoilZones: 'Abuja Mainland, Enugu, Benin, Owerri, Abeokuta Laterite',
    concreteSpec: 'C30/37 Ready-Mix + Y12/Y16 Base Mesh',
    costImpact: 'Baseline (1.00×)',
  },
  {
    code: 'FND-02',
    type: 'Stepped Hillside Pad + Counterfort RC Retaining Wall',
    bearingCapacity: '180 – 350 kN/m² (Rock/Slope)',
    typicalDepth: 'Stepped Benches + 3.5m–6.5m Wall',
    idealSoilZones: 'Guzape Hills, Katampe Extension, Asokoro Rock, Milliken Hill',
    concreteSpec: 'C35/45 + Rock Dowel Anchors (Y25/Y32) & Weep Drains',
    costImpact: '+10% to +14% Substructure',
  },
  {
    code: 'FND-03',
    type: 'Cellular Ribbed Reinforced Concrete Raft Foundation',
    bearingCapacity: '65 – 120 kN/m²',
    typicalDepth: '600mm – 1,200mm Deep Ribbed Beam Slab',
    idealSoilZones: 'Lekki Phase 1, Chevron, Ajah, Port Harcourt GRA, Warri',
    concreteSpec: 'C35/45 Sulphate-Resistant Concrete + 1200-Gauge DPM Tanking',
    costImpact: '+8% to +12% Total Build',
  },
  {
    code: 'FND-04',
    type: 'Rotary Bored Friction & End-Bearing Concrete Piles',
    bearingCapacity: '< 65 kN/m² or High-Rise (>5 Floors)',
    typicalDepth: '18m – 32m Depth (450mm – 900mm Ø)',
    idealSoilZones: 'Ikoyi, Victoria Island, Eko Atlantic, Banana Island, Riverine Creeks',
    concreteSpec: 'C40/50 Tremie Marine Concrete + 1.5m Thick Pile Caps & PIT Test',
    costImpact: '+18% to +24% Total Build',
  },
];

// ============================================================================
// DYNAMIC BAR BENDING SCHEDULE (BBS), DRAWING REGISTER & QA/QC GENERATOR
// ============================================================================
export function getStructureEngineeringDossier(property) {
  if (!property) return { rebarSchedule: [], drawingRegister: [], qaCheckpoints: [] };

  const rawTonnes = parseFloat(
    String(property.boqSummary?.steelRebarTonnes || '32').replace(/[^0-9.]/g, '')
  ) || 32;

  const rebarSchedule = [
    {
      barMark: 'Y10 TMT',
      diameterMm: '10 mm',
      yieldStrength: '500 N/mm²',
      sharePercent: 14,
      tonnage: (rawTonnes * 0.14).toFixed(1),
      structuralElements: 'Column Links / Stirrups (@ 175–200mm c/c), Lintel Stirrups & Stair Distribution',
    },
    {
      barMark: 'Y12 TMT',
      diameterMm: '12 mm',
      yieldStrength: '500 N/mm²',
      sharePercent: 32,
      tonnage: (rawTonnes * 0.32).toFixed(1),
      structuralElements: 'Two-Way Suspended Floor Slab Top/Bottom Mat (@ 150mm c/c), Staircase Waist & Parapet Walls',
    },
    {
      barMark: 'Y16 TMT',
      diameterMm: '16 mm',
      yieldStrength: '500 N/mm²',
      sharePercent: 28,
      tonnage: (rawTonnes * 0.28).toFixed(1),
      structuralElements: 'Pad/Raft Foundation Mats, Plinth Ground Beams, Secondary Floor Beams & Standard Columns',
    },
    {
      barMark: 'Y20 TMT',
      diameterMm: '20 mm',
      yieldStrength: '500 N/mm²',
      sharePercent: 16,
      tonnage: (rawTonnes * 0.16).toFixed(1),
      structuralElements: 'Primary Continuous Floor Beams, Heavy Lower-Storey Columns & Raft Main Ribs',
    },
    {
      barMark: 'Y25 / Y32 TMT',
      diameterMm: '25 – 32 mm',
      yieldStrength: '500 N/mm²',
      sharePercent: 10,
      tonnage: (rawTonnes * 0.10).toFixed(1),
      structuralElements: 'Cantilever Transfer Beams, Pile Caps, High-Load Columns & Retaining Wall Stems',
    },
  ];

  const drawingRegister = [
    {
      sheetCode: `${property.reference}-STR-01 to 05`,
      discipline: 'Substructure & Geotechnical',
      title: 'Foundation Layout, Pad/Raft/Pile Detailing, Ground Beams & Column Starter Bar Schedule',
      scale: '1:50 / 1:25',
      stamp: 'COREN Sealed',
    },
    {
      sheetCode: `${property.reference}-STR-06 to 12`,
      discipline: 'Superstructure RC / Steel Frame',
      title: 'Suspended Slab General Arrangement (GA), Primary/Cantilever Beam Details & Column Elevations',
      scale: '1:50 / 1:20',
      stamp: 'COREN Sealed',
    },
    {
      sheetCode: `${property.reference}-STR-13 to 16`,
      discipline: 'Staircase, Roof & BBS',
      title: 'Monolithic Staircase Detailing, RC Parapet Gutter, Roof Truss Layout & Full Bar Bending Schedule (BBS)',
      scale: '1:25 / Tabular',
      stamp: 'COREN Sealed',
    },
    {
      sheetCode: `${property.reference}-ARC-01 to 10`,
      discipline: 'Architectural Working Drawings',
      title: 'Dimensioned Floor Plans, Roof Plan, 4 Elevations, 2 Cross-Sections, Door/Window Schedules & 3D Renders',
      scale: '1:100 / 1:50',
      stamp: 'ARCON Sealed',
    },
    {
      sheetCode: `${property.reference}-MEP-01 to 08`,
      discipline: 'Mechanical, Electrical & Plumbing',
      title: 'Power/Lighting Schematics, Single-Line Distribution, Solar/Inverter Grid, PPR Water Supply & Biodigester Drainage',
      scale: '1:100 / Schematic',
      stamp: 'COREN MEP Sealed',
    },
    {
      sheetCode: `${property.reference}-BOQ-01 to 03`,
      discipline: 'Quantity Surveying & Costing',
      title: 'Priced & Unpriced Itemized Bill of Quantities (BOQ), Stage Material Take-Off & Milestone Cashflow Schedule',
      scale: 'BESMM4 Standard',
      stamp: 'NIQS / RQS Sealed',
    },
  ];

  const qaCheckpoints = [
    {
      stage: 'Gate 01 • Pre-Foundation',
      testName: 'Dutch Cone Penetration Test (CPT) & Setting-Out Verification',
      criterion: `Verify allowable soil bearing capacity (${property.structuralSpecs?.soilBearingCapacity || '≥ 130 kN/m²'}) & optical Total Station diagonal check.`,
    },
    {
      stage: 'Gate 02 • Substructure Pour',
      testName: 'Rebar Cover, DPM Continuity & 7/28-Day Foundation Cube Crushing',
      criterion: '50mm concrete cover spacers verified; slump test (75–100mm); 28-day cube strength ≥ target grade.',
    },
    {
      stage: 'Gate 03 • Superstructure Frame',
      testName: 'Suspended Slab Formwork Camber, Stirrup Spacing & Ultrasonic Pulse Audit',
      criterion: 'Zero honeycomb tolerance; bar bending schedule (BBS) lap length ≥ 45d; Schmidt rebound hammer audit.',
    },
    {
      stage: 'Gate 04 • MEP & Finishes',
      testName: '10-Bar Hydrostatic Pipe Pressure Test & 1000V Megger Insulation Test',
      criterion: 'Zero pressure drop over 24 hours prior to wall plastering; earthing resistance < 2.0 Ohms.',
    },
  ];

  return { rebarSchedule, drawingRegister, qaCheckpoints };
}

// ============================================================================
// PLAIN-ENGLISH NIGERIAN BUILDING GUIDE (FOR EVERYDAY NIGERIANS & FIRST-TIME BUILDERS)
// ============================================================================
export const NIGERIAN_LAYMAN_GUIDE = [
  {
    term: 'Carcass (Shell + Roof Stage)',
    simpleMeaning: 'Building the strong skeleton of the house up to the roof.',
    explanation:
      'In Nigeria, "Carcass" means we dig the foundation, pour the German floor (DPC), raise all the block walls, cast the decking (if it is a duplex/storey building), and put the roof on top. What remains is plastering, wiring, plumbing, tiles, doors, and painting—which you can do immediately or later as money comes.',
  },
  {
    term: 'Turnkey (Complete Key-in-Hand House)',
    simpleMeaning: 'We build everything from bare land until you collect keys and move in.',
    explanation:
      'You don’t have to chase bricklayers, plumbers, electricians, or tilers. We handle foundation, blocks, roofing, plastering, POP ceiling, wiring, borehole/plumbing, tiles, kitchen cabinets, doors, painting, and compound interlocks.',
  },
  {
    term: 'BOQ (Bill of Quantities / Honest Material List)',
    simpleMeaning: 'A complete list of every bag of cement, block, iron rod, and Naira needed.',
    explanation:
      'Many Nigerians lose millions because local artisans inflate material quantities. A BOQ tells you the exact number of 50kg cement bags, 9-inch blocks, lengths/tonnes of iron rods, trips of sharp sand and granite, and labour cost for every stage before work starts.',
  },
  {
    term: 'DPC / German Floor',
    simpleMeaning: 'The solid concrete base of your ground floor that stops ground water.',
    explanation:
      'After digging and building the foundation walls, we fill it with red earth (laterite) and stones (hardcore), lay a thick waterproof nylon (Damp-Proof Membrane), and pour a strong concrete floor ("German Floor"). This stops water from rising to spoil your paint or tiles.',
  },
  {
    term: 'Strip vs. Raft vs. Pile Foundation',
    simpleMeaning: 'Choosing the right shoes for your house depending on your land.',
    explanation:
      '• Dry/Firm Land (e.g., Abuja, Enugu, Ibadan, Benin): Uses normal Strip/Pad Foundation.\n• Soft/Waterlogged Land (e.g., Lekki, Ajah, Port Harcourt, Warri): Uses a thick concrete Raft Foundation so the house floats evenly and never cracks.\n• Deep Swampy Land or Tall Storey Buildings: Uses deep concrete Pillars driven deep into the ground (Pile Foundation).',
  },
  {
    term: 'Nigerian Plot Sizes (Half Plot vs Full Plot)',
    simpleMeaning: 'How land is measured across Nigerian states.',
    explanation:
      '• Standard Full Plot: Usually 60ft × 120ft (about 600–648 sqm) in Lagos/South-West, or 50ft × 100ft (about 450–500 sqm) in Enugu/Owerri/Asaba/Benin.\n• Half Plot: About 300 sqm (can comfortably build a 3-bedroom bungalow or 4-bedroom compact duplex).',
  },
];

// ============================================================================
// NIGERIAN STATES & REGIONAL BUILDING ZONES (FOR PERSONAL DESIGN VALUATION)
// ============================================================================
export const NIGERIAN_STATES_AND_ZONES = [
  { label: 'Lagos — Island / Lekki / Ajah / Ibeju-Lekki', state: 'Lagos (Island/Lekki)', regionalFactor: 1.12, defaultSoil: 'waterlogged' },
  { label: 'Lagos — Mainland (Ikeja, Magodo, Surulere, Ikorodu, Alimosho)', state: 'Lagos (Mainland)', regionalFactor: 1.04, defaultSoil: 'dry' },
  { label: 'Abuja (FCT) — Maitama, Guzape, Lugbe, Gwarinpa, Katampe, Kubwa', state: 'FCT Abuja', regionalFactor: 1.06, defaultSoil: 'dry' },
  { label: 'Enugu State — Independence Layout, Centenary City, Trans-Ekulu, Nsukka', state: 'Enugu', regionalFactor: 0.98, defaultSoil: 'dry' },
  { label: 'Rivers State — Port Harcourt GRA, Peter Odili, Eliozu, Oyigbo', state: 'Rivers (Port Harcourt)', regionalFactor: 1.08, defaultSoil: 'waterlogged' },
  { label: 'Imo State — New Owerri, World Bank, Orlu, Okigwe', state: 'Imo (Owerri)', regionalFactor: 0.98, defaultSoil: 'dry' },
  { label: 'Anambra State — Awka, Onitsha, Nnewi, Ekwulobia', state: 'Anambra', regionalFactor: 1.0, defaultSoil: 'dry' },
  { label: 'Delta State — Asaba, Warri, Ughelli, Agbor', state: 'Delta (Asaba/Warri)', regionalFactor: 1.03, defaultSoil: 'waterlogged' },
  { label: 'Edo State — Benin City GRA, Sapele Road, Ugbor, Ekpoma', state: 'Edo (Benin City)', regionalFactor: 0.97, defaultSoil: 'dry' },
  { label: 'Ogun State — Abeokuta, Mowe/Ofada, Sagamu, Ijebu-Ode, Sango Ota', state: 'Ogun', regionalFactor: 0.96, defaultSoil: 'dry' },
  { label: 'Oyo State — Ibadan (Bodija, Akobo, Oluyole, Moniya)', state: 'Oyo (Ibadan)', regionalFactor: 0.95, defaultSoil: 'dry' },
  { label: 'Akwa Ibom & Cross River — Uyo, Eket, Calabar', state: 'Akwa Ibom / Cross River', regionalFactor: 1.02, defaultSoil: 'waterlogged' },
  { label: 'Abia & Ebonyi — Umuahia, Aba, Abakaliki', state: 'Abia / Ebonyi', regionalFactor: 0.97, defaultSoil: 'dry' },
  { label: 'Kano, Kaduna & Northern States — Kano, Kaduna, Jos, Minna, Ilorin', state: 'Northern Nigeria', regionalFactor: 0.95, defaultSoil: 'dry' },
];

// ============================================================================
// PERSONAL DESIGN VALUATION ENGINE (NEW NIGERIAN MARKET FEATURE)
// ============================================================================
export function calculatePersonalDesignValuation(input = {}) {
  const buildingType = input.buildingType || '4-Bedroom Duplex';
  const bedrooms = Number(input.bedrooms) || 4;
  const stateLocation = input.stateLocation || 'Lagos (Mainland)';
  const landPlotType = input.landPlotType || 'Full Plot (600 sqm / 60x120ft)';
  const soilType = input.soilType || 'dry'; // 'dry' | 'waterlogged' | 'rocky'
  const finishLevel = input.finishLevel || 'turnkey'; // 'carcass' | 'turnkey' | 'luxury'
  const includeBQ = Boolean(input.includeBQ);
  const includeFence = Boolean(input.includeFence);
  const includeBorehole = Boolean(input.includeBorehole);
  const includeSolar = Boolean(input.includeSolar);

  // Base floor area & base turnkey cost in NGN by common Nigerian building types
  const typeProfiles = {
    '2-Bedroom Bungalow': { sqm: 125, baseTurnkeyNGN: 28_500_000, floors: '1 Floor (Bungalow)' },
    '3-Bedroom Bungalow': { sqm: 175, baseTurnkeyNGN: 39_500_000, floors: '1 Floor (Bungalow)' },
    '4-Bedroom Bungalow': { sqm: 235, baseTurnkeyNGN: 54_000_000, floors: '1 Floor (Bungalow)' },
    '4-Bedroom Duplex': { sqm: 360, baseTurnkeyNGN: 105_000_000, floors: 'Ground + 1st Floor (Duplex)' },
    '5-Bedroom Duplex': { sqm: 460, baseTurnkeyNGN: 138_000_000, floors: 'Ground + 1st Floor (Duplex)' },
    '6-Bedroom Triplex / Mansion': { sqm: 750, baseTurnkeyNGN: 245_000_000, floors: 'Ground + 2 Floors (Triplex)' },
    'Twin Semi-Detached Duplex (2 Wings)': { sqm: 640, baseTurnkeyNGN: 178_000_000, floors: '2 Wings (Ground + 1st Floor)' },
    'Block of 4 Flats (3-Bedroom Each)': { sqm: 780, baseTurnkeyNGN: 195_000_000, floors: '2 Storey (4 Flats for Rent)' },
    'Block of 6 Flats (2/3-Bedroom Each)': { sqm: 1120, baseTurnkeyNGN: 285_000_000, floors: '3 Storey (6 Flats for Rent)' },
    'Commercial Plaza / Shopping Complex': { sqm: 950, baseTurnkeyNGN: 260_000_000, floors: '2–3 Floors Commercial Plaza' },
  };

  const matchedProfile = typeProfiles[buildingType] || {
    sqm: Number(input.customSqm) || Math.max(bedrooms * 75, 180),
    baseTurnkeyNGN: Math.max(bedrooms * 24_000_000, 42_000_000),
    floors: input.floors || 'Custom Floor Plan',
  };

  const floorAreaSqm = Number(input.customSqm) > 50 ? Number(input.customSqm) : matchedProfile.sqm;
  const areaRatio = floorAreaSqm / matchedProfile.sqm;

  const zoneInfo = NIGERIAN_STATES_AND_ZONES.find((z) => z.state === stateLocation || z.label === stateLocation) || {
    regionalFactor: 1.0,
  };

  const soilMultiplier =
    soilType === 'waterlogged' ? 1.15 : soilType === 'rocky' ? 1.12 : 1.0;

  const foundationRecommendation =
    soilType === 'waterlogged'
      ? 'Reinforced Concrete Raft Foundation (or Pile Foundation if deep swamp) with waterproof nylon & marine-grade concrete so your building never sinks or cracks.'
      : soilType === 'rocky'
      ? 'Stepped Reinforced Concrete Pad & Strip Foundation with retaining wall support for sloping/rocky ground.'
      : 'Standard Reinforced Concrete Strip & Pad Foundation (1.2m–1.5m deep) with solid damp-proof German floor (DPC).';

  // Add-ons in NGN
  const bqCostNGN = includeBQ ? 12_500_000 : 0;
  const fenceCostNGN = includeFence ? 9_800_000 : 0;
  const boreholeCostNGN = includeBorehole ? 3_800_000 : 0;
  const solarCostNGN = includeSolar ? 6_500_000 : 0;
  const extrasTotalNGN = bqCostNGN + fenceCostNGN + boreholeCostNGN + solarCostNGN;

  const standardTurnkeyNGN = Math.round(
    matchedProfile.baseTurnkeyNGN * areaRatio * zoneInfo.regionalFactor * soilMultiplier + extrasTotalNGN
  );
  const carcassCostNGN = Math.round(standardTurnkeyNGN * 0.47);
  const luxuryCostNGN = Math.round(standardTurnkeyNGN * 1.36);

  const selectedTotalNGN =
    finishLevel === 'carcass'
      ? carcassCostNGN
      : finishLevel === 'luxury'
      ? luxuryCostNGN
      : standardTurnkeyNGN;

  // Calculate realistic Nigerian material quantities
  const isMultiStorey = !buildingType.toLowerCase().includes('bungalow');
  const cementBags = Math.round(floorAreaSqm * (isMultiStorey ? 5.1 : 4.4) * soilMultiplier) + (includeFence ? 280 : 0) + (includeBQ ? 220 : 0);
  const blocks9Inch = Math.round(floorAreaSqm * (isMultiStorey ? 33 : 29)) + (includeFence ? 3200 : 0) + (includeBQ ? 1800 : 0);
  const ironRodTonnes = Number((floorAreaSqm * (isMultiStorey ? 0.062 : 0.032) * soilMultiplier).toFixed(1));
  const ironRodLengths = Math.round(ironRodTonnes * 95); // approx 95 lengths per tonne (mix of 12mm & 16mm)
  const sharpSandTrips = Math.max(Math.round(floorAreaSqm / 38), 4) + (includeFence ? 2 : 0);
  const graniteTrips = Math.max(Math.round(floorAreaSqm / 45), 3) + (includeFence ? 1 : 0);

  const stageBreakdown = [
    {
      stage: 'Stage 1: Clearing, Digging & Foundation to German Floor (DPC)',
      percent: 18,
      amountNGN: Math.round(selectedTotalNGN * 0.18),
      plainExplanation: 'Site clearing, pegging, digging trenches, foundation iron rods & concrete, filling with laterite, waterproof nylon & pouring the German floor.',
    },
    {
      stage: 'Stage 2: Ground Floor Blockwork, Pillars & Lintels',
      percent: 15,
      amountNGN: Math.round(selectedTotalNGN * 0.15),
      plainExplanation: 'Setting 9-inch vibrated blocks for all rooms, casting concrete pillars (columns), and pouring lintels above doors and windows.',
    },
    {
      stage: isMultiStorey
        ? 'Stage 3: Decking (Suspended Floor Slab), Staircase & Upper Blockwork'
        : 'Stage 3: Roof Beams, High Parapet Facial & Gable Walls',
      percent: 19,
      amountNGN: Math.round(selectedTotalNGN * 0.19),
      plainExplanation: isMultiStorey
        ? 'Wood/steel boarding (formwork), tying 12mm & 16mm decking iron rods, pouring decking concrete, staircase, and raising upstairs blocks.'
        : 'Casting continuous concrete ring beam round the top of the house, concrete parapet facial, and preparing for roofing.',
    },
    {
      stage: 'Stage 4: Wood/Steel Roof Trusses & Stone-Coated / Long-Span Roofing',
      percent: 13,
      amountNGN: Math.round(selectedTotalNGN * 0.13),
      plainExplanation: 'Roof carpentry or steel trusses, waterproof felt, and installing 0.55mm Gerard stone-coated tiles or long-span aluminum sheets.',
    },
    {
      stage: 'Stage 5: Electrical Wiring, Plumbing Pipes, Borehole & Plastering',
      percent: 15,
      amountNGN: Math.round(selectedTotalNGN * 0.15),
      plainExplanation: 'Chiseling & burying electrical pipes/wires, water & toilet PPR pipes, soakaway/biodigester, and smooth cement plastering inside & outside.',
    },
    {
      stage: 'Stage 6: POP Ceiling, Tiles, Doors, Windows, Kitchen & Painting',
      percent: 20,
      amountNGN: Math.round(selectedTotalNGN * 0.20),
      plainExplanation: 'POP ceiling design, floor & wall tiles, casement windows, security & room doors, kitchen cabinets, toilet fittings, painting & compound finishing.',
    },
  ];

  return {
    floorAreaSqm,
    floorsLabel: matchedProfile.floors,
    carcassCostNGN,
    standardTurnkeyNGN,
    luxuryCostNGN,
    selectedTotalNGN,
    foundationRecommendation,
    materials: {
      cementBags: `${cementBags.toLocaleString()} Bags (50kg Dangote / BUA / Lafarge)`,
      blocks9Inch: `${blocks9Inch.toLocaleString()} Blocks (9-Inch Vibrated)`,
      ironRods: `${ironRodTonnes} Tonnes (~${ironRodLengths.toLocaleString()} Lengths of 12mm/16mm Rods)`,
      sharpSandTrips: `${sharpSandTrips} Tipper Trips (30-Tonne Washed Sharp Sand)`,
      graniteTrips: `${graniteTrips} Tipper Trips (30-Tonne Granite Stone)`,
    },
    stageBreakdown,
    extrasIncluded: [
      includeBQ && 'Detached Boys Quarters (BQ)',
      includeFence && 'Perimeter Fence & Security Gatehouse',
      includeBorehole && 'Water Borehole & Overhead Tank Stand',
      includeSolar && '5kVA–10kVA Solar & Inverter Backup',
    ].filter(Boolean),
  };
}

export const INITIAL_DESIGN_VALUATIONS = [
  {
    id: 'val-seed-1',
    reference: 'EKC-VAL-901',
    designTitle: 'My Family 4-Bedroom Duplex + 2-Room BQ Plan',
    buildingType: '4-Bedroom Duplex',
    bedrooms: 4,
    stateLocation: 'Enugu',
    townArea: 'Independence Layout Phase 2, Enugu',
    landPlotType: 'Full Plot (600 sqm / 60x120ft)',
    soilType: 'dry',
    finishLevel: 'turnkey',
    customSqm: 380,
    includeBQ: true,
    includeFence: true,
    includeBorehole: true,
    includeSolar: false,
    planFileName: 'Okafor_Enugu_4Bed_Duplex_Drawing.pdf',
    planPreviewUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    userNotes: 'My architect drew this for our family land in Enugu. I want to know the honest cost to build it to Carcass first and then complete it.',
    status: 'Verified by Ekesonconstruct Quantity Surveyor',
    createdAt: '2 days ago',
    ...calculatePersonalDesignValuation({
      buildingType: '4-Bedroom Duplex',
      bedrooms: 4,
      stateLocation: 'Enugu',
      landPlotType: 'Full Plot (600 sqm / 60x120ft)',
      soilType: 'dry',
      finishLevel: 'turnkey',
      customSqm: 380,
      includeBQ: true,
      includeFence: true,
      includeBorehole: true,
      includeSolar: false,
    }),
  },
  {
    id: 'val-seed-2',
    reference: 'EKC-VAL-902',
    designTitle: 'Modern 3-Bedroom Bungalow on Half Plot',
    buildingType: '3-Bedroom Bungalow',
    bedrooms: 3,
    stateLocation: 'Lagos (Island/Lekki)',
    townArea: 'Sangotedo / Ibeju-Lekki Axis, Lagos',
    landPlotType: 'Half Plot (300 sqm / 30x120ft)',
    soilType: 'waterlogged',
    finishLevel: 'turnkey',
    customSqm: 185,
    includeBQ: false,
    includeFence: true,
    includeBorehole: true,
    includeSolar: true,
    planFileName: 'Sangotedo_3Bed_Bungalow_Sketch.jpg',
    planPreviewUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80',
    userNotes: 'The land gets slightly waterlogged during heavy August rain. Please include raised Raft/high DPC foundation so water never enters.',
    status: 'Instant AI & QS Valuation Ready',
    createdAt: 'Yesterday',
    ...calculatePersonalDesignValuation({
      buildingType: '3-Bedroom Bungalow',
      bedrooms: 3,
      stateLocation: 'Lagos (Island/Lekki)',
      landPlotType: 'Half Plot (300 sqm / 30x120ft)',
      soilType: 'waterlogged',
      finishLevel: 'turnkey',
      customSqm: 185,
      includeBQ: false,
      includeFence: true,
      includeBorehole: true,
      includeSolar: true,
    }),
  },
];

// ============================================================================
// NIGERIAN LANDOWNER & HOMEBUILDER SAFETY CHECKLIST (FOR USER DASHBOARD)
// ============================================================================
export const NIGERIAN_LAND_CHECKLIST = [
  {
    id: 'chk-1',
    step: '01',
    title: 'Registered Survey Plan & Land Charting (Verify It Is Not Government Acquisition)',
    plainAdvice:
      'Before paying for land or starting foundation, ensure a Registered Surveyor charts the coordinates at the State Surveyor-General’s office so you know the land is free from government road/pipeline acquisition.',
    completedByDefault: true,
  },
  {
    id: 'chk-2',
    step: '02',
    title: 'Valid Land Title (Deed of Assignment, Receipt, C of O, or Governor’s Consent)',
    plainAdvice:
      'Always sign a lawyer-prepared Deed of Assignment with the rightful family/vendor and get a family receipt or Estate Allocation Letter.',
    completedByDefault: true,
  },
  {
    id: 'chk-3',
    step: '03',
    title: 'Soil & Water-Table Check (Dry Land vs Swampy/Waterlogged Land)',
    plainAdvice:
      'Never copy your neighbour’s shallow foundation! A quick soil test tells our engineers whether to use a normal Strip foundation or a Raft/Pile foundation so your building never cracks or sinks.',
    completedByDefault: true,
  },
  {
    id: 'chk-4',
    step: '04',
    title: 'Complete Stamped Building Plan & Honest Material List (BOQ)',
    plainAdvice:
      'Pick an Ekesonconstruct house plan or submit your personal design on your Dashboard to get the exact count of cement bags, blocks, and iron rods before buying materials.',
    completedByDefault: false,
  },
  {
    id: 'chk-5',
    step: '05',
    title: 'Perimeter Fencing & Borehole Water Source First',
    plainAdvice:
      'Securing your boundary with a fence/gatehouse prevents land grabbers ("Omo-Onile") from encroaching, and drilling your borehole early saves millions on buying water tankers during construction.',
    completedByDefault: false,
  },
  {
    id: 'chk-6',
    step: '06',
    title: 'Stage-by-Stage Payment Plan (Never Pay Any Contractor 100% Upfront)',
    plainAdvice:
      'With Ekesonconstruct, you only pay stage-by-stage (Foundation → Blockwork → Decking → Roofing → Finishing) after each stage is inspected and verified.',
    completedByDefault: false,
  },
];

// ============================================================================
// EKEBOT — SMART NIGERIAN BUILDING, PROPERTY & VALUATION CHATBOT ENGINE
// ============================================================================
export const EKEBOT_SUGGESTED_QUESTIONS = [
  'How much to build a 3-bedroom bungalow in Nigeria today?',
  'How much to build a 4 or 5-bedroom duplex?',
  'How do I submit my personal building design for valuation?',
  'How many blocks & bags of cement to fence 1 plot of land?',
  'What is the difference between Carcass and Complete Move-In?',
  'My land is swampy/waterlogged, what foundation do I need?',
  'What are today’s prices for cement, iron rods, blocks & sand?',
];

export function generateEkeBotReply(userText = '', properties = [], formatPriceFn = (v) => `₦${Number(v).toLocaleString()}`) {
  const q = String(userText).toLowerCase();

  if (q.includes('fence') || q.includes('fencing') || (q.includes('plot') && q.includes('block'))) {
    return {
      title: 'Fencing 1 Full Plot of Land in Nigeria (60ft × 120ft / 600 sqm)',
      reply:
        'To fence a standard **1 Full Plot (60ft × 120ft / 600 sqm)** up to 2.4 meters high with a strong gatehouse pillar base in Nigeria today, here is what you need in plain terms:\n\n' +
        '• **9-Inch Vibrated Blocks:** ~3,000 to 3,400 blocks\n' +
        '• **50kg Cement (Dangote/BUA/Lafarge):** ~260 to 300 bags (for foundation, mortar & pillars)\n' +
        '• **12mm & 10mm Iron Rods:** ~1.8 Tonnes (~170 lengths) for columns & coping beam\n' +
        '• **Sharp Sand & Granite:** 2 Trips of Sharp Sand + 1 Trip of Granite\n' +
        `• **Estimated Total Cost (Dry Land):** **${formatPriceFn(8_500_000)} – ${formatPriceFn(11_500_000)}** (including Security Gatehouse & Iron Gate).\n\n` +
        '👉 *Tip: Open the **"Material Calculator"** or **"Submit Design for Valuation"** tab in your User Dashboard to customize this for your state!*',
      actionTab: 'materials',
      actionLabel: 'Open Fence & Material Calculator',
    };
  }

  if (q.includes('bungalow') || q.includes('3 bedroom') || q.includes('3-bedroom') || q.includes('4 bedroom bungalow')) {
    return {
      title: 'Cost & Materials for a 3 or 4-Bedroom Bungalow in Nigeria',
      reply:
        'Here is the realistic breakdown for building a modern **Bungalow** in Nigeria today:\n\n' +
        `**1. 3-Bedroom Bungalow (Fits Half Plot or Full Plot):**\n` +
        `• **Carcass Only (Foundation + Blocks + Roofed):** ${formatPriceFn(18_500_000)} – ${formatPriceFn(22_000_000)}\n` +
        `• **Complete Move-In (Tiled, Plastered, Wired & Painted):** ${formatPriceFn(38_000_000)} – ${formatPriceFn(45_000_000)}\n` +
        `• **Estimated Materials:** ~850 Bags of Cement • ~5,800 Blocks (9-inch) • ~5.5 Tonnes of Iron Rods.\n\n` +
        `**2. 4-Bedroom Contemporary Bungalow (Like our Greenhaven Plan EKC-STR-005):**\n` +
        `• **Carcass Only (Roofed):** ${formatPriceFn(26_500_000)}\n` +
        `• **Complete Move-In Finish:** ${formatPriceFn(58_000_000)}\n` +
        `• **Estimated Materials:** ~1,120 Bags of Cement • ~7,400 Blocks • ~8.4 Tonnes of Iron Rods.\n\n` +
        'Would you like to value your own bungalow plan or inspect our ready-made bungalow plan?',
      actionTab: 'valuation',
      actionLabel: 'Value My Bungalow Design Now',
    };
  }

  if (q.includes('duplex') || q.includes('4-bedroom') || q.includes('5-bedroom') || q.includes('5 bedroom') || q.includes('4 bedroom')) {
    return {
      title: 'Cost & Materials for a 4 or 5-Bedroom Duplex in Nigeria',
      reply:
        'For a standard **Detached Duplex (Ground Floor + Decking + First Floor)** in Nigeria today:\n\n' +
        `**1. 4-Bedroom Detached Duplex:**\n` +
        `• **Carcass (Foundation + Decking + Blockwork + Roof):** ${formatPriceFn(48_000_000)} – ${formatPriceFn(58_000_000)}\n` +
        `• **Complete Move-In Finish:** ${formatPriceFn(98_000_000)} – ${formatPriceFn(120_000_000)}\n` +
        `• **Materials Needed:** ~1,900 Bags of Cement • ~12,500 Blocks • ~22 Tonnes of Iron Rods.\n\n` +
        `**2. 5-Bedroom Duplex + 2-Room BQ (Plan EKC-STR-002):**\n` +
        `• **Carcass (Structure + Roof):** ${formatPriceFn(68_000_000)}\n` +
        `• **Complete Move-In Finish:** ${formatPriceFn(145_000_000)}\n` +
        `• **Materials Needed:** ~2,350 Bags of Cement • ~15,800 Blocks • ~29.8 Tonnes of Iron Rods.\n\n` +
        'Remember: You don’t pay everything at once! You can build Stage 1 (Foundation/DPC) first, then Decking, then Roofing.',
      actionTab: 'valuation',
      actionLabel: 'Calculate My Exact Duplex Cost',
    };
  }

  if (q.includes('personal') || q.includes('valuation') || q.includes('submit') || q.includes('upload') || q.includes('my plan') || q.includes('my design') || q.includes('architect')) {
    return {
      title: 'How to Submit Your Personal Building Design for Instant Valuation',
      reply:
        'This is one of our most powerful features built specially for Nigerians! If you already have a building plan from your architect or a house sketch:\n\n' +
        '1. Click the **"Submit Design for Valuation"** tab right here in your User Dashboard.\n' +
        '2. Select the house type, your State in Nigeria (e.g., Lagos, Abuja, Enugu, Port Harcourt, Owerri), and your land condition (Dry or Swampy).\n' +
        '3. Attach your drawing/photo and click **"Generate Instant Valuation"**.\n' +
        '4. You will immediately get your **Carcass Price**, **Move-In Price**, **Exact Bags of Cement, Blocks & Iron Rods**, and a **6-Stage Payment Breakdown**!',
      actionTab: 'valuation',
      actionLabel: 'Go to Personal Design Valuation',
    };
  }

  if (q.includes('carcass') || q.includes('turnkey') || q.includes('difference') || q.includes('shell')) {
    return {
      title: 'Simple Difference Between "Carcass" and "Complete Move-In (Turnkey)"',
      reply:
        'In simple Nigerian building terms:\n\n' +
        '🧱 **1. Carcass (About 46% – 48% of Total Cost):**\n' +
        'We clear the land, dig the foundation, pour the German floor (DPC), raise all the block walls, cast the upstairs decking and staircase, and roof the house completely. The house is standing strong and covered from rain, so you can take a break and do finishing later.\n\n' +
        '🔑 **2. Complete Move-In / Turnkey (100% Completed House):**\n' +
        'Everything in Carcass PLUS electrical wiring, plumbing pipes, soakaway/biodigester, wall plastering, POP ceilings, floor & wall tiles, windows, security & room doors, kitchen cabinets, painting, and compound interlocks. You simply collect your keys and move in!',
      actionTab: 'saved',
      actionLabel: 'Compare Carcass vs Move-In on Saved Plans',
    };
  }

  if (q.includes('swamp') || q.includes('water') || q.includes('lekki') || q.includes('port harcourt') || q.includes('foundation') || q.includes('raft') || q.includes('pile') || q.includes('soil')) {
    return {
      title: 'Building on Swampy / Waterlogged Land vs Dry Land in Nigeria',
      reply:
        'Very important question! Many buildings crack or sink in Nigeria because people use a dry-land foundation on swampy soil:\n\n' +
        '• **Dry & Firm Land (Abuja, Enugu, Ibadan, Benin, Ikeja):** A standard **Strip & Pad Foundation** (4ft–5ft deep) with a solid German floor is perfect and saves money.\n' +
        '• **Waterlogged / Soft Land (Lekki, Ajah, Sangotedo, Port Harcourt, Warri):** Needs a **Reinforced Concrete Raft Foundation** (a thick continuous concrete beam-and-slab base) raised at least 3 feet above road level so water never enters your compound.\n' +
        '• **Deep Creek / Multi-Storey (Ikoyi, Victoria Island, 4+ Floors):** Needs **Bored Pile Foundation** reaching firm sand deep underground.\n\n' +
        'We always run a quick Soil Test first so you don’t waste money or risk your building!',
      actionTab: 'planner',
      actionLabel: 'View Nigerian Land & Soil Checklist',
    };
  }

  if (q.includes('cement') || q.includes('rod') || q.includes('iron') || q.includes('material') || q.includes('sand') || q.includes('granite') || q.includes('block') || q.includes('price')) {
    return {
      title: 'Current Nigerian Building Material Benchmark Prices',
      reply:
        'Here are today’s verified benchmark prices from our Quantity Surveying Market Tracker:\n\n' +
        `• **50kg Cement (Dangote / BUA / Lafarge):** ${formatPriceFn(9500)} per bag\n` +
        `• **9-Inch Vibrated Hollow Block:** ${formatPriceFn(1150)} per block\n` +
        `• **High-Yield Iron Rods (12mm / 16mm TMT):** ${formatPriceFn(1380000)} per Tonne (~95 lengths)\n` +
        `• **Heavy Iron Rods (20mm / 25mm TMT):** ${formatPriceFn(1420000)} per Tonne\n` +
        `• **Crushed Granite Stone (30-Tonne Tipper):** ${formatPriceFn(690000)} per trip\n` +
        `• **Stone-Coated Gerard Roof Tiles (0.55mm):** ${formatPriceFn(14500)} per sqm\n\n` +
        'You can turn on **Price Drop Alerts** inside the **Material Calculator & Prices** tab of your Dashboard!',
      actionTab: 'materials',
      actionLabel: 'Open Material Prices & Calculator',
    };
  }

  if (
    q.includes('engineer') ||
    q.includes('architect') ||
    q.includes('surveyor') ||
    q.includes('geotechnical') ||
    q.includes('contractor') ||
    q.includes('electrical') ||
    q.includes('electrician') ||
    q.includes('plumber') ||
    q.includes('plumbing') ||
    q.includes('qs') ||
    q.includes('agent') ||
    q.includes('specialist')
  ) {
    return {
      title: 'Connect With Ekesonconstruct’s 8 Certified Nigerian Building Specialists',
      reply:
        'You can connect directly with any of our **8 Verified In-House Building Specialists** right here on Ekesonconstruct:\n\n' +
        '1. **Civil & Structural Engineer (COREN):** Foundation design, columns, decking slabs & iron rod schedules.\n' +
        '2. **Architect (ARCON):** Custom floor plans, 3D building views & Town Planning permit drawings.\n' +
        '3. **Land Surveyor (SURCON):** Beacon pillars, Red-Copy Survey Plan & Govt. charting.\n' +
        '4. **Geotechnical / Soil Investigation Specialist:** CPT/Borehole soil test for dry or swampy land.\n' +
        '5. **Quantity Surveyor (NIQS/QSRBN):** Exact count of 50kg cement bags, blocks, iron rods & stage costs.\n' +
        '6. **Building Contractor (CORBON):** Full site execution from German floor (DPC) to roofing & key handover.\n' +
        '7. **Electrical Engineer / Qualified Installer (NEMSA):** Conduit wiring, load distribution, earthing & solar/inverter setup.\n' +
        '8. **Plumbing Professional:** PPR pressure piping, borehole treatment, overhead tank & biodigester soakaway.\n\n' +
        'Click below to inspect each specialist’s **Main Coverage & Technical Specifications** and connect in one click!',
      actionTab: 'specialists',
      actionLabel: 'Open All 8 Building Specialists',
    };
  }

  return {
    title: 'EkeBot — Your Friendly Nigerian Building & Valuation Advisor',
    reply:
      'Welcome! I am **EkeBot**, trained by Ekesonconstruct’s COREN Engineers and Quantity Surveyors to help every Nigerian build wisely without stories or contractor inflation.\n\n' +
      'Here is what I can help you do right now:\n' +
      '1. **Value Your Personal Design:** Upload your own building plan or tell me how many bedrooms you want to build, and get the exact Naira cost, cement bags, blocks, and iron rods.\n' +
      '2. **Connect to 8 Building Specialists:** Click any specialist (Civil Engineer, Architect, Land Surveyor, Soil Specialist, QS, Contractor, Electrical or Plumbing Pro) to view their main coverage and specifications.\n' +
      '3. **Check Material Prices:** Ask me about cement, iron rods, blocks, fencing a plot, or swampy vs dry land foundations!',
    actionTab: 'valuation',
    actionLabel: 'Submit Personal Design for Valuation',
  };
}

// ============================================================================
// REAL-WORLD STRUCTURAL ENGINEERING PHOTOGRAPHS FOR HERO & SITE SHOWCASE
// (Authentic structural construction site photography — no AI renders)
// ============================================================================
export const HERO_STRUCTURAL_PHOTOGRAPHS = [
  {
    id: 'hero-struct-1',
    shortLabel: '01 • RC Frame & Tower Crane',
    url: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=2000&q=90',
    caption: 'Multi-Storey Reinforced Concrete Frame, Tower Crane & Rebar Superstructure Works',
    code: 'SITE 01 • RC-FRAME & TOWER CRANE EXECUTION',
    specs: 'C35/45 Structural Concrete • High-Yield Y16–Y25 TMT Steel Reinforcement • COREN Supervised',
  },
  {
    id: 'hero-struct-2',
    shortLabel: '02 • Engineers & Blueprints',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=90',
    caption: 'Civil & Structural Engineers Inspecting Site Blueprints & Steel Formwork on Active Site',
    code: 'SITE 02 • COREN ENGINEER FIELD INSPECTION',
    specs: 'BS 8110 / Eurocode 2 Compliance • Bar Bending Schedule Verification • Optical Leveling',
  },
  {
    id: 'hero-struct-3',
    shortLabel: '03 • Rebar & Decking Pour',
    url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=2000&q=90',
    caption: 'Heavy Foundation Reinforcement Cage, Structural Columns & Suspended Decking Formwork',
    code: 'SITE 03 • SUBSTRUCTURE & SUSPENDED SLAB POUR',
    specs: '200mm Solid Two-Way RC Slab • Vibrated Ready-Mix Concrete • 28-Day Cube Crushing Test',
  },
  {
    id: 'hero-struct-4',
    shortLabel: '04 • High-Rise Structural Core',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=90',
    caption: 'High-Rise Reinforced Concrete Shear-Wall Core, Columns & Multi-Storey Scaffolding',
    code: 'SITE 04 • MULTI-STOREY RC SHEAR WALL & COLUMNS',
    specs: 'C40/50 High-Strength Concrete • Slip-Formed Lift Core • Waffle Slab Decking',
  },
  {
    id: 'hero-struct-5',
    shortLabel: '05 • Steel Portal & Crane Works',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=90',
    caption: 'Structural Steel Portal Frame Erection, Surveying & Heavy Civil Engineering Inspection',
    code: 'SITE 05 • S355JR STRUCTURAL STEEL & GEOTECHNICAL RIG',
    specs: 'Eurocode 3 Steel Portal Trusses • Total Station Plumb Alignment • Deep Pile Caps',
  },
  {
    id: 'hero-struct-6',
    shortLabel: '06 • Commercial Tower Structure',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=90',
    caption: 'Completed Commercial Reinforced Concrete & Curtain-Wall Structural Landmark',
    code: 'SITE 06 • COMMERCIAL HIGH-RISE RC FRAME',
    specs: '9.0m Column-Free Spans • 325mm Ribbed Waffle Slabs • Deep Rotary Bored Piles',
  },
  {
    id: 'hero-struct-7',
    shortLabel: '07 • Contemporary Duplex Frame',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
    caption: 'Completed Cantilevered Reinforced Concrete Duplex Structure & Turnkey Civil Finishing',
    code: 'SITE 07 • CANTILEVERED RESIDENTIAL RC STRUCTURE',
    specs: '3.5m RC Cantilever Beam • Damp-Proof German Floor (DPC) • 25-Year Structural Warranty',
  },
  {
    id: 'hero-struct-8',
    shortLabel: '08 • Electrical & MEP Site Works',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=90',
    caption: 'Site Electrical Engineering, Three-Phase Distribution & Structural Conduit Integration',
    code: 'SITE 08 • COREN / NEMSA ELECTRICAL & MEP INFRASTRUCTURE',
    specs: 'BS 7671 Pure Copper Conduit Wiring • Industrial Switchgear • Earthing & Surge Protection',
  },
];

// ============================================================================
// 8 CERTIFIED EKESONCONSTRUCT BUILDING & STRUCTURAL SPECIALIST AGENTS
// Clicking any specialist reveals their Main Covering, Technical Specifications,
// Plain-English Role for Nigerians, Deliverables, and Direct Connection options.
// ============================================================================
export const EKESON_SPECIALIST_AGENTS = [
  {
    id: 'spec-civil-engineer',
    roleTitle: 'Civil & Structural Engineer',
    shortBadge: 'COREN Structural Lead',
    leadName: 'Engr. Chibuike Ekeson, FNSE',
    licenseNo: 'COREN Reg. #R.28491 • FNSE • M.IStructE',
    experienceYears: '18+ Years Across 36 States & FCT',
    availability: 'Available for Site & Blueprint Review',
    stageNeeded: 'Stage 01–04 (Before Digging Foundation up to Roof Beam)',
    consultationFeeNGN: 150000,
    feeNote: 'Free initial blueprint check when building with Ekesonconstruct',
    photo:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'Makes sure your building never cracks, tilts, or collapses. Calculates the exact thickness of your foundation, pillars (columns), beams, and upstairs decking so your house stands strong for 50+ years.',
    mainCovering: [
      'Foundation Engineering (Pad & Strip Footings, Cellular Raft Foundations & Bored Pile Foundations)',
      'Reinforced Concrete Pillar (Column), Transfer Beam & Upstairs Decking (Slab) Design',
      'Complete Iron Rod Bar Bending Schedule (BBS) — specifying exact Y10, Y12, Y16, Y20 & Y25 rod sizes',
      'COREN Official Stamped Structural Calculation Sheets for Town Planning Building Approval',
      'Non-Destructive Structural Integrity Testing (Schmidt Hammer & Ultrasonic Pulse) for uncompleted buildings',
      'Estate Road Pavement, Reinforced Concrete Box Culverts, Retaining Walls & Flood Drainage Channels',
    ],
    technicalSpecifications: [
      {
        label: 'Design Codes & Standards',
        value: 'BS 8110-1:1997, Eurocode 2 (EN 1992-1-1) & Eurocode 3 (Steelwork)',
      },
      {
        label: 'Concrete Grade Specification',
        value: 'C25/30, C30/37 & C35/45 verified by 7-day and 28-day lab cube crushing tests',
      },
      {
        label: 'Reinforcement Steel Spec',
        value: 'High-Yield Thermo-Mechanically Treated (TMT) Deformed Bars (fy = 500 N/mm²)',
      },
      {
        label: 'Software & Analysis Tools',
        value: 'ProtaStructure, Orion, ETABS, SAFE & AutoCAD Structural Detailing',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'Stamped Structural Working Drawings + Calculation Report + Bar Bending Schedule + Cube Test Log',
      },
    ],
    commonQuestions: [
      'What foundation depth and rod size do I need for a 4-bedroom duplex on my land?',
      'Can you test an uncompleted building I want to buy to confirm the decking and pillars are safe?',
      'Please review my architect’s floor plan and design the COREN structural drawings.',
    ],
  },
  {
    id: 'spec-architect',
    roleTitle: 'Architect',
    shortBadge: 'ARCON Principal Architect',
    leadName: 'Arc. Adaeze Nwosu, MNIA',
    licenseNo: 'ARCON Reg. #F/4109 • MNIA',
    experienceYears: '14+ Years Residential & Commercial Design',
    availability: 'Available for Custom Floor Plans & 3D Design',
    stageNeeded: 'Stage 00 (First Step — Turning Your Land & Ideas Into a House Plan)',
    consultationFeeNGN: 120000,
    feeNote: 'Credited 100% toward your complete House Plan Pack',
    photo:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'Designs how your house looks inside and outside. Plans the room sizes, living room flow, cross-ventilation for Nigerian weather, parking space on your plot, and produces 3D realistic photos before a single block is laid.',
    mainCovering: [
      'Custom 2D Floor Space Planning (Bungalows, Duplexes, Terraces, Blocks of Flats & Commercial Plazas)',
      'Photorealistic 3D Exterior Views & Interior Layout Visualization',
      'Plot Master-Planning — fitting the main house, Boys Quarters (BQ), gatehouse, borehole & septic tank neatly on 300sqm–1,200sqm plots',
      'Complete ARCON-Stamped Architectural Working Drawings for State Town Planning Approval (FCDA, LASPPPA, etc.)',
      'Tropical Cross-Ventilation, Natural Daylight & Solar Roof Orientation for Nigerian climates',
      'Window, Door, Finishing Tile & Roof Cladding Schedules',
    ],
    technicalSpecifications: [
      {
        label: 'Regulatory Registration',
        value: 'Architects Registration Council of Nigeria (ARCON) & Nigerian Institute of Architects (NIA)',
      },
      {
        label: 'Drawing Sheet Package',
        value: 'Site Plan, Floor Plans, Roof Plan, 4 Elevations, 2–3 Cross Sections, Door/Window Schedule',
      },
      {
        label: 'Minimum Setback Compliance',
        value: '6.0m Front Setback, 3.0m Rear & Side Airspaces, ≤45% Maximum Plot Coverage Ratio',
      },
      {
        label: 'BIM & CAD Software',
        value: 'Autodesk Revit BIM, ArchiCAD, AutoCAD & Lumion / V-Ray 3D Rendering',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'ARCON Stamped Blueprints (PDF + DWG + Printed A3 Copies) + High-Res 3D Exterior Renders',
      },
    ],
    commonQuestions: [
      'Can you design a 4-bedroom duplex with a 2-room BQ that fits comfortably on a 450 sqm plot?',
      'I have a rough hand sketch of the house I want — can you turn it into a full approved architectural plan?',
      'How do we remodel an old family bungalow into a modern contemporary design?',
    ],
  },
  {
    id: 'spec-land-surveyor',
    roleTitle: 'Land Surveyor',
    shortBadge: 'SURCON Registered Surveyor',
    leadName: 'Surv. Babatunde Ogunleye, FNIS',
    licenseNo: 'SURCON Reg. #S.3392 • FNIS',
    experienceYears: '16+ Years Cadastral & Engineering Surveying',
    availability: 'Available for Land Charting & Site Setting-Out',
    stageNeeded: 'Before Buying Land & Day 1 of Foundation Setting-Out',
    consultationFeeNGN: 180000,
    feeNote: 'Varies by plot size and State Surveyor-General charting tariff',
    photo:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'Verifies that the land you want to buy is free from Government acquisition (road/pipeline setback), plants concrete beacon pillars on your exact boundaries, and sets out the exact building lines so your house is straight and legal.',
    mainCovering: [
      'Land Coordinate Verification & Official Charting at the State Surveyor-General’s Office',
      'Preparation & Lodging of Registered Red-Copy Survey Plan (Required for C of O & Governor’s Consent)',
      'Boundary Re-Establishment & Concrete Property Beacon Pillar Installation',
      'Topographical & Contour Mapping (Measuring land slope, flood level, and drainage direction)',
      'Engineering Building Setting-Out (Transferring the architect’s plan onto the ground with Total Station)',
      'Verticality & Plumb Checks for Multi-Storey Columns and Lift Shafts',
    ],
    technicalSpecifications: [
      {
        label: 'Regulatory License',
        value: 'Surveyors Council of Nigeria (SURCON) & Nigerian Institution of Surveyors (NIS)',
      },
      {
        label: 'Geodetic Coordinate System',
        value: 'UTM Zone 31N / 32N (Minna Datum & WGS84 Dual-Frequency GNSS RTK)',
      },
      {
        label: 'Field Instrumentation',
        value: 'Leica / Trimble Differential GPS (DGPS), Electronic Total Station & Auto-Level',
      },
      {
        label: 'Verification Checks',
        value: 'Government Acquisition Check, Road Right-of-Way Setback, High-Tension & Pipeline Buffer',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'Signed & Sealed Survey Plan (Blue & Red Copies) + Charting Clearance Report + Site Spot-Level Map',
      },
    ],
    commonQuestions: [
      'I want to buy a plot of land — can you pick the coordinates and verify if it is free from Government acquisition?',
      'How much to prepare a registered Red-Copy Survey Plan and install beacon numbers on my 600 sqm plot?',
      'Can your team come to my site for topographical leveling and foundation setting-out?',
    ],
  },
  {
    id: 'spec-geotechnical',
    roleTitle: 'Geotechnical Engineer / Soil Investigation Specialist',
    shortBadge: 'Soil Test & Piling Specialist',
    leadName: 'Engr. Dr. Tamuno Briggs, MNSE',
    licenseNo: 'COREN Reg. #R.31208 • PhD Geotechnical Eng.',
    experienceYears: '15+ Years Niger Delta, Lagos Coastal & Mainland Soils',
    availability: 'Rig Crew Ready for Mobilization',
    stageNeeded: 'Stage 00 (Before Designing Foundation — Mandatory for Duplexes & Swampy Land)',
    consultationFeeNGN: 350000,
    feeNote: 'Complete 2–3 point CPT + Percussion Borehole & Lab Soil Report',
    photo:
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'Tests the soil deep under your land before you build so you know whether normal Strip foundation is safe or if you need a Raft or Pile foundation. Prevents sinking houses, tilted walls, and wasted foundation money.',
    mainCovering: [
      'Dutch Cone Penetration Testing (CPT — 2.5 Tonne & 10 Tonne rigs) to measure soil strength at every meter depth',
      'Percussion Borehole Drilling & Standard Penetration Testing (SPT) up to 20m–35m depth',
      'Groundwater Table Measurement & Chemical Attack Analysis (pH, Sulphate & Chloride levels in coastal water)',
      'Laboratory Soil Mechanics Testing (Moisture content, Atterberg limits, Triaxial shear & Consolidation settlement)',
      'Exact Safe Bearing Capacity Calculation (kN/m²) & Foundation Type Recommendation (Strip, Pad, Raft, or Pile)',
      'Rotary Bored Piling & CFA Pile Foundation Supervision + Pile Load Integrity Testing (PIT)',
    ],
    technicalSpecifications: [
      {
        label: 'Geotechnical Standards',
        value: 'BS 5930 (Site Investigations), BS 1377 (Soil Lab Tests) & Eurocode 7 (EN 1997)',
      },
      {
        label: 'Field Testing Equipment',
        value: '10-Tonne Hydraulic CPT Sounding Rig + Percussion Shell & Auger Borehole Rig',
      },
      {
        label: 'Soil Parameters Determined',
        value: 'Allowable Bearing Pressure (kPa), Undrained Cohesion (Cu), Angle of Internal Friction (ϕ)',
      },
      {
        label: 'High-Risk Zones Covered',
        value: 'Lekki, Ajah, Victoria Island, Ikoyi, Port Harcourt, Warri, Yenagoa, Calabar & Abuja Slopes',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'COREN-Stamped Geotechnical Investigation Report + Borehole Logs + Foundation Depth & Type Spec',
      },
    ],
    commonQuestions: [
      'My land is in Lekki / Port Harcourt and feels soft — how many days does a soil test take?',
      'Will a Raft foundation hold a 4-bedroom duplex on my land or do I need Pile foundation?',
      'What is the cost of a complete soil investigation report required for Lagos/Abuja building approval?',
    ],
  },
  {
    id: 'spec-quantity-surveyor',
    roleTitle: 'Quantity Surveyor (QS)',
    shortBadge: 'NIQS / QSRBN Cost Specialist',
    leadName: 'QS. Oluwaseun Adeyemi, MNIQS',
    licenseNo: 'QSRBN Reg. #Q.2940 • MNIQS',
    experienceYears: '13+ Years Construction Cost & Material Auditing',
    availability: 'Available for BOQ & Personal Design Valuation',
    stageNeeded: 'Before Buying Materials & At Every Stage Payment Milestone',
    consultationFeeNGN: 100000,
    feeNote: 'Instant automated preliminary valuation is 100% FREE on your Dashboard',
    photo:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'The building cost accountant who protects your money from contractor cheating. Counts the exact number of 50kg bags of cement, 9-inch blocks, lengths of iron rods, sand, granite, tiles, and labour cost needed for every stage of your building.',
    mainCovering: [
      'Itemized Bill of Quantities (BOQ) prepared to Nigerian BESMM4 Standard',
      'Exact Material Schedule (How many bags of cement, blocks, tonnes of iron rods, trips of sand & granite per stage)',
      'Personal Building Plan Valuation — pricing drawings you already got from an outside architect',
      'Carcass vs. Standard Move-In vs. Luxury Finish Cost Comparison & Value Engineering',
      'Stage-by-Stage Interim Valuation Certificates (Verifying site work completed before you release the next stage payment)',
      'Uncompleted Building Valuation & Cost-to-Complete Assessment before you buy or resume an abandoned project',
    ],
    technicalSpecifications: [
      {
        label: 'Measurement Standard',
        value: 'Building and Engineering Standard Method of Measurement 4th Edition (BESMM4 Nigeria)',
      },
      {
        label: 'Professional Registration',
        value: 'Quantity Surveyors Registration Board of Nigeria (QSRBN) & NIQS',
      },
      {
        label: 'Material Take-Off Accuracy',
        value: 'Elemental breakdown with 5%–7.5% controlled site wastage allowance',
      },
      {
        label: 'Market Rate Database',
        value: 'Monthly-updated cement, TMT rebar, aggregate, roofing & finishing rates across 36 States',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'Stamped Itemized BOQ (Excel + PDF) + Stage Material Shopping List + Phased Cash-Flow Schedule',
      },
    ],
    commonQuestions: [
      'I already have my building drawings — can you prepare the exact Material List (cement, blocks, rods) and BOQ?',
      'A contractor gave me a quote of ₦95M — can you audit it to see if the prices and quantities are inflated?',
      'How much will it cost me to complete a roofed carcass duplex from plastering to painting?',
    ],
  },
  {
    id: 'spec-building-contractor',
    roleTitle: 'Building Contractor',
    shortBadge: 'CORBON Turnkey Site Builder',
    leadName: 'Bldr. Emeka Okafor, MNIOB',
    licenseNo: 'CORBON Reg. #B.1984 • MNIOB',
    experienceYears: '17+ Years Turnkey Residential & Commercial Delivery',
    availability: 'Site Teams Ready Across All 6 Geopolitical Zones',
    stageNeeded: 'Stage 01–06 (Actual Physical Construction on Your Land)',
    consultationFeeNGN: 0,
    feeNote: 'Free site inspection & mobilization schedule with approved BOQ',
    photo:
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'Manages the actual physical building of your house on site — from clearing the bush, digging the foundation, molding/buying vibrated blocks, casting the German floor and decking, roofing, plastering, tiling, and handing you the keys.',
    mainCovering: [
      'Carcass Construction Package (Foundation, German Floor/DPC, Blockwork, Lintels, Columns, Decking & Roof)',
      'Full Turnkey Move-In Execution (Complete building from bare land to painted, tiled, wired & ready-to-live house)',
      'Strict Site Quality Control — machine-vibratedconcrete, proper 1:2:4 / 1:1.5:3 mix ratios, and 14-day water curing',
      'Vetting & Daily Supervision of Masons (Bricklayers), Iron Benders, Carpenters, Roofers, Tilers & Painters',
      'Weekly Video, Drone & Photo Progress Reporting for Nigerians at Home and in the Diaspora (UK, USA, Canada, Europe)',
      'Renovation, Remodeling, Roof Replacement & Completion of Stalled/Abandoned Buildings',
    ],
    technicalSpecifications: [
      {
        label: 'Professional Registration',
        value: 'Council of Registered Builders of Nigeria (CORBON) & Nigerian Institute of Building (NIOB)',
      },
      {
        label: 'Blockwork & Mortar Spec',
        value: 'Machine-vibrated 9-inch (225mm) & 6-inch (150mm) sandcrete blocks with ≥3.5 N/mm² strength',
      },
      {
        label: 'Concrete Mixing & Curing',
        value: 'Batch-plant ready-mix or calibrated mechanical drum mixer + poker vibrator compaction',
      },
      {
        label: 'Payment Protection',
        value: '6-Stage Milestone Escrow — you only fund the next stage after the current stage passes inspection',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'Build Methodology Program + Weekly Site Telemetry Reports + 25-Year Structural Frame Warranty',
      },
    ],
    commonQuestions: [
      'Can Ekesonconstruct build my house to Carcass (roofed stage) first so I can finish the interior later?',
      'I live in the UK/US — how do you send weekly video updates and verify every stage before I pay?',
      'How many months will it take your team to build a 4-bedroom duplex from foundation to key handover?',
    ],
  },
  {
    id: 'spec-electrical-engineer',
    roleTitle: 'Electrical Engineer / Qualified Electrical Installer',
    shortBadge: 'COREN / NEMSA Electrical Pro',
    leadName: 'Engr. Yusuf Danjuma, MNSE (NEMSA Certified)',
    licenseNo: 'COREN Reg. #R.26714 • NEMSA Lic. #EC-0842',
    experienceYears: '14+ Years Building Electrical, Solar & Automation',
    availability: 'Available for First-Fix Conduit & Full Wiring',
    stageNeeded: 'Stage 03 (During Decking/Blockwork Piping) & Stage 05–06 (Wiring & Fittings)',
    consultationFeeNGN: 85000,
    feeNote: 'Includes Electrical Load Schedule & Solar/Inverter Sizing Guide',
    photo:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'Handles all electrical pipes inside the decking and walls, pure copper wiring, distribution boards, AC points, change-over switches, solar/inverter hybrid integration, and thunder/lightning earthing so your house is 100% safe from fire or shock.',
    mainCovering: [
      'First-Fix Heavy-Gauge PVC Conduit Piping inside concrete decking slabs and block walls before plastering',
      'Complete Wiring with 100% Pure Copper Flame-Retardant Cables (Coleman / Cutix / Nigerchin — zero fake copper)',
      'Three-Phase & Single-Phase Distribution Board (DB) Balancing, MCB/RCCB Breakers & Surge Arrestors',
      'Solar Hybrid Inverter & Lithium Battery Bank Design (5kVA, 10kVA, 15kVA–30kVA) + Generator Change-Over Automation',
      'Pure Copper Earth Rod Matting (<2 Ohms resistance) & Roof Thunder/Lightning Arrestor Protection',
      'Smart Home CCTV Cameras, Electric Fence Security, POP LED Lighting, AC Split-Unit Piping & Gate Automation',
    ],
    technicalSpecifications: [
      {
        label: 'Regulatory Certification',
        value: 'COREN Electrical Engineer & Nigerian Electricity Management Services Agency (NEMSA) Certified',
      },
      {
        label: 'Cable Gauge Standards',
        value: '1.5mm² Lighting, 2.5mm² Ring Sockets, 4.0mm²–6.0mm² AC/Water Heater/Cooker, 16mm²–25mm² Armoured incomer',
      },
      {
        label: 'Protection & Safety Spec',
        value: 'BS 7671 (IET Wiring Regulations 18th Ed.), 30mA Residual Current Circuit Breakers (RCCB)',
      },
      {
        label: 'Testing & Commissioning',
        value: 'Megger Insulation Resistance Test, Polarity Check, Earth Loop Impedance & Load Balance Test',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'Electrical M&E Working Drawings + Cable & Fitting Material List + As-Built Circuit Directory',
      },
    ],
    commonQuestions: [
      'How many coils of 1.5mm, 2.5mm, and 4.0mm Cutix/Coleman wire are needed for a 4-bedroom duplex?',
      'Can you design my house wiring so AC units and fridges run smoothly on my Solar Inverter system?',
      'What stage of building does the electrician come in to lay conduit pipes in the decking?',
    ],
  },
  {
    id: 'spec-plumbing-professional',
    roleTitle: 'Plumbing Professional & Mechanical Specialist',
    shortBadge: 'PPR Piping & Water Systems Pro',
    leadName: 'Engr. Kingsley Udoh & Master Plumbing Team',
    licenseNo: 'COREN Mech. #R.29105 • NISafetyE',
    experienceYears: '15+ Years Sanitary, Borehole & Biodigester Systems',
    availability: 'Available for Under-Slab Piping, Borehole & Sanitary Finish',
    stageNeeded: 'Stage 01 (Under-DPC Waste Pipes), Stage 04 (Wall Piping) & Stage 06 (WC/Bath Installation)',
    consultationFeeNGN: 80000,
    feeNote: 'Includes Plumbing Pipe Schedule & Biodigester vs Soakaway Advice',
    photo:
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=85',
    plainSummary:
      'Installs leak-proof hot and cold water pipes, bathroom drainage, borehole drilling and iron-water treatment plants, overhead tank scaffolding, and modern odorless biodigester sewage systems so your walls never get damp or smelly.',
    mainCovering: [
      'Concealed Green PPR Hot & Cold Water Supply Piping (Heat-welded joints that never leak inside walls)',
      'Heavy-Duty Pressure UPVC Soil, Waste & Vent Drainage Piping under the German Floor (DPC) and suspended slabs',
      'Geophysical Borehole Drilling, Submersible Pump Installation, Overhead Stanchion Tank & Water Treatment Plant',
      'Modern Anaerobic Biodigester Sewage System (Small footprint, zero smell, no dislodging trucks) or RC Septic/Soakaway',
      'High-Pressure Pneumatic Hydro-Testing of all concealed pipes BEFORE wall plastering and tiling',
      'Installation of Wall-Hung or Floor WCs, Jacuzzis, Walk-In Shower Mixers, Water Heaters & Kitchen Sinks',
    ],
    technicalSpecifications: [
      {
        label: 'Water Supply Pipe Spec',
        value: 'PN20 Din 8077/8078 Polypropylene Random Copolymer (PPR) fusion-welded pipes (20mm–32mm)',
      },
      {
        label: 'Drainage & Waste Spec',
        value: '110mm (4-inch) & 160mm (6-inch) Heavy-Gauge Class D Pressure UPVC pipes at 1:60 self-cleansing gradient',
      },
      {
        label: 'Leak Prevention Test',
        value: 'Mandatory 6-Bar – 10-Bar Pressure Test held for 24 hours prior to wall plastering and floor screeding',
      },
      {
        label: 'Water & Sewage Systems',
        value: 'FRP Multi-Media Water Filtration Plant + Precast Concrete Anaerobic Biodigester + Grease Trap',
      },
      {
        label: 'Key Deliverables to Client',
        value: 'Mechanical Plumbing Layout Drawings + Pipe & Sanitary Fitting BOQ + Pressure Test Certificate',
      },
    ],
    commonQuestions: [
      'Is a modern Biodigester better than a traditional soakaway pit for a 600 sqm plot in Lagos or Abuja?',
      'How do you prevent concealed bathroom pipes from leaking and spoiling wall paint after 2 years?',
      'How much does it cost to drill a borehole, install a water treatment plant, and pipe a 4-bedroom house?',
    ],
  },
];



