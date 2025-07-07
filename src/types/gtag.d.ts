// src/types/gtag.d.ts
interface Window {
  gtag: (
    command: 'config' | 'event' | 'js', 
    targetId: string, 
    config?: Record<string, any>
  ) => void;
  dataLayer: any[];
}
