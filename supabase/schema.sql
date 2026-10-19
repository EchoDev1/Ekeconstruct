-- ============================================================================
-- EKESONCONSTRUCT LIMITED (ekesonconstruct.africa)
-- Supabase Database Schema: Auth Profiles, Post/Property Storage, Dynamic
-- Locations, Development Projects, Enquiries, Payments & Real-Time Notifications
-- ============================================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- 1. USER & AGENT PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text unique not null,
  phone text,
  role text not null default 'buyer' check (role in ('buyer', 'agent', 'owner', 'admin')),
  company text default 'Ekesonconstruct Client',
  avatar_url text,
  verified boolean default true,
  preferred_currency text default 'NGN',
  created_at timestamptz default now()
);

-- 2. DYNAMIC LOCATIONS (Expandable without redesigning website)
create table if not exists public.locations (
  id uuid default uuid_generate_v4() primary key,
  country text not null default 'Nigeria',
  state text not null,
  city text not null,
  neighbourhood text not null,
  category text default 'Domestic' check (category in ('Domestic', 'International')),
  description text,
  image_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- 3. PROPERTIES / POST STORAGE
create table if not exists public.properties (
  id uuid default uuid_generate_v4() primary key,
  reference text unique not null,
  title text not null,
  category text not null check (category in ('Buy', 'Rent', 'Lease', 'Land', 'Shortlet', 'New Project')),
  sub_category text not null,
  property_type text not null,
  status text not null default 'Available',
  price_ngn numeric not null,
  price_period text not null default 'Total',
  country text not null default 'Nigeria',
  state text not null,
  city text not null,
  neighbourhood text not null,
  address text,
  bedrooms integer default 0,
  bathrooms integer default 0,
  size_sqm numeric default 0,
  land_size_sqm numeric default 0,
  description text not null,
  amenities jsonb default '[]'::jsonb,
  images jsonb default '[]'::jsonb,
  video_url text,
  lat numeric default 9.0765,
  lng numeric default 7.3986,
  featured boolean default false,
  owner_id uuid references public.profiles(id) on delete set null,
  agent_name text default 'Ekesonconstruct Advisory Desk',
  agent_phone text default '+2348003537662',
  created_at timestamptz default now()
);

-- 4. PROPERTY DEVELOPMENT & INVESTMENT PROJECTS
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  reference text unique not null,
  name text not null,
  location text not null,
  city text not null,
  category text not null,
  stage text not null check (stage in ('Current Project', 'Completed Project')),
  development_phase text not null,
  progress_percent integer default 50,
  description text not null,
  features jsonb default '[]'::jsonb,
  available_units integer default 0,
  total_units integer default 0,
  starting_price_ngn numeric not null,
  completion_status text not null,
  images jsonb default '[]'::jsonb,
  renders jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- 5. ENQUIRIES, VIEWING REQUESTS, BUYER MANDATES & SERVICE REQUESTS
create table if not exists public.enquiries (
  id uuid default uuid_generate_v4() primary key,
  enquiry_type text not null, -- 'Property Enquiry', 'Viewing Request', 'Buyer Mandate', 'Property Management', 'Interior Design', 'Cleaning & Maintenance', 'Joint Venture'
  property_id text,
  property_reference text,
  property_title text,
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_location text,
  property_type text,
  budget text,
  purpose text,
  preferred_date text,
  message text,
  status text default 'New',
  automated_email_sent boolean default true,
  created_at timestamptz default now()
);

-- 6. REAL-TIME NOTIFICATIONS & AUTOMATED EMAIL LOGS
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'system', -- 'enquiry', 'post', 'payment', 'email', 'viewing'
  email_recipient text,
  email_subject text,
  read boolean default false,
  created_at timestamptz default now()
);

-- 7. MULTI-CURRENCY PAYMENTS & ESCROW RESERVATIONS
create table if not exists public.payments (
  id uuid default uuid_generate_v4() primary key,
  reference text unique not null,
  property_reference text,
  property_title text,
  payer_name text not null,
  payer_email text not null,
  payment_type text not null, -- 'Shortlet Booking', 'Inspection & Verification Retainer', 'Escrow Property Deposit', 'Facility Management Subscription'
  amount_ngn numeric not null,
  currency_used text not null default 'NGN',
  amount_converted numeric not null,
  status text default 'Confirmed',
  created_at timestamptz default now()
);

-- Enable Supabase Realtime on core tables
alter publication supabase_realtime add table public.properties;
alter publication supabase_realtime add table public.locations;
alter publication supabase_realtime add table public.enquiries;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.payments;
