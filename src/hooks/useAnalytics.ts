// src/hooks/useAnalytics.ts
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Replace this with your actual Google Analytics Measurement ID when ready for production
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

type EventOptions = {
  category?: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any;
};

export function usePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + searchParams.toString();
      
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
}

export function trackEvent(action: string, options: EventOptions = {}) {
  if (!window.gtag) return;
  
  window.gtag('event', action, {
    event_category: options.category || 'general',
    event_label: options.label,
    value: options.value,
    non_interaction: options.nonInteraction || false,
    ...options,
  });
}

// Example specific events you might want to track
export const trackButtonClick = (buttonName: string, pageLocation: string) => {
  trackEvent('button_click', {
    category: 'engagement',
    label: buttonName,
    page_location: pageLocation,
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    category: 'engagement',
    label: fileName,
    file_type: fileType,
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    category: 'engagement',
    label: linkText,
    destination: url,
  });
};
