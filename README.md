# Ekesonconstruct Limited — Full-Service Real Estate & Property Solutions Platform (`ekesonconstruct.africa`)

Built with **Next.js (App Router)**, **Tailwind CSS**, **JavaScript**, and **Supabase** (`@supabase/supabase-js`) for user authentication, property post storage, dynamic locations, multi-currency payments, and real-time notifications.

## Core Business Divisions Implemented
1. **Real Estate Brokerage**: Buying & Selling Properties, Property Leasing, and Verified Land Acquisition.
2. **Short-Term Rental**: Luxury Shortlet Apartments & Turnkey Airbnb Property Management.
3. **Property Development & Investment**: Residential Estate Development, Affordable Housing Projects, Build-to-Sell, Build-to-Rent, and Joint Venture Development.
4. **Architecture & Interior Design**: Residential Interior Design, Commercial Interior Design, and Interior Renovation.
5. **Property Cleaning & Maintenance**: Building Maintenance, Residential Cleaning, and Commercial Cleaning.

## Key Platform Capabilities
- **Multi-Currency Support (`NGN ₦`, `USD $`, `GBP £`, `EUR €`)**: Live currency conversion across all property listings, development projects, and owner yield dashboards.
- **Supabase Integration (`src/lib/supabase.js` & `supabase/schema.sql`)**:
  - **Authentication**: Buyer/User accounts, Accredited Agent accounts, and Property-Owner accounts.
  - **Post Storage**: Create and publish new property listings in real time.
  - **Dynamic Backend Locations**: Expandable Country → State → City → Neighbourhood directory across Abuja, Lagos, Port Harcourt, Benin, Enugu, Owerri, Ogun, Ondo, Abia, Other Nigerian Cities, and International Locations without redesigning the website.
  - **Real-Time Notifications & Automated Email Dispatch**: Instant UI toast notifications, notification center drawer, and automated email confirmation tracking.
- **Contextual WhatsApp Integration**: Pre-filled WhatsApp enquiry links on every property and project (`"Hello Ekesonconstruct, I am interested in [Property Name/Property ID] located in [Location]. I would like to make an enquiry."`).

## Getting Started
1. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key (the platform also includes a built-in hybrid real-time local persistence layer so all features work immediately out of the box).
2. Run the development server:
   ```bash
   npm run dev
   ```
