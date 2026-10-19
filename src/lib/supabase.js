import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('http');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

/**
 * Subscribe to Supabase Realtime channels for live post storage, enquiries,
 * locations, and instant user notifications.
 */
export function subscribeToPlatformRealtime({
  onNewProperty,
  onNewLocation,
  onNewNotification,
  onNewEnquiry,
}) {
  if (!supabase) {
    // Fallback cross-tab BroadcastChannel for real-time local sync
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('ekesonconstruct_realtime_channel');
      bc.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'NEW_PROPERTY' && onNewProperty) onNewProperty(payload);
        if (type === 'NEW_LOCATION' && onNewLocation) onNewLocation(payload);
        if (type === 'NEW_NOTIFICATION' && onNewNotification) onNewNotification(payload);
        if (type === 'NEW_ENQUIRY' && onNewEnquiry) onNewEnquiry(payload);
      };
      return () => bc.close();
    }
    return () => {};
  }

  const channel = supabase
    .channel('ekesonconstruct-live-feed')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'properties' },
      (payload) => {
        if (onNewProperty && payload.new) onNewProperty(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'locations' },
      (payload) => {
        if (onNewLocation && payload.new) onNewLocation(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications' },
      (payload) => {
        if (onNewNotification && payload.new) onNewNotification(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'enquiries' },
      (payload) => {
        if (onNewEnquiry && payload.new) onNewEnquiry(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function broadcastLocalRealtimeEvent(type, payload) {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      const bc = new BroadcastChannel('ekesonconstruct_realtime_channel');
      bc.postMessage({ type, payload });
      bc.close();
    } catch {
      // Ignore BroadcastChannel errors
    }
  }
}
