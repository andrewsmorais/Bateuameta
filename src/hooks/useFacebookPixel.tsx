import { useEffect, useCallback } from 'react';

// ============================================
// 🔴 SUBSTITUA PELO SEU PIXEL ID DO FACEBOOK
// ============================================
const FB_PIXEL_ID = 'SEU_PIXEL_ID_AQUI';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

// Inicializa o Facebook Pixel
const initFacebookPixel = () => {
  if (typeof window === 'undefined') return;
  
  // Evita inicialização duplicada
  if (window.fbq) return;

  // Cria a função fbq
  (function(f: Window, b: Document, e: string, v: string) {
    const n = function(...args: unknown[]) {
      (n as any).callMethod
        ? (n as any).callMethod.apply(n, args)
        : (n as any).queue.push(args);
    };
    
    if (!f._fbq) f._fbq = n;
    (n as any).push = n;
    (n as any).loaded = true;
    (n as any).version = '2.0';
    (n as any).queue = [];
    
    f.fbq = n;

    const t = b.createElement('script') as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  // Inicializa o Pixel com o ID
  window.fbq('init', FB_PIXEL_ID);
  
  // PageView automático na inicialização
  window.fbq('track', 'PageView');
  
  console.log('[FB Pixel] Inicializado com ID:', FB_PIXEL_ID);
};

// Hook principal
export const useFacebookPixel = () => {
  
  useEffect(() => {
    initFacebookPixel();
  }, []);

  // Evento: PageView - disparado automaticamente ao carregar a página
  const trackPageView = useCallback(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
      console.log('[FB Pixel] Evento: PageView');
    }
  }, []);

  // Evento: Lead - quando clica em "Ver Planos" ou rola até preços
  const trackLead = useCallback((contentName?: string) => {
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: contentName || 'Ver Planos',
      });
      console.log('[FB Pixel] Evento: Lead -', contentName);
    }
  }, []);

  // Evento: ViewContent - visualização de conteúdo específico
  const trackViewContent = useCallback((contentName: string, contentCategory?: string) => {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: contentName,
        content_category: contentCategory || 'Landing Page',
      });
      console.log('[FB Pixel] Evento: ViewContent -', contentName);
    }
  }, []);

  // Evento: InitiateCheckout - quando clica em "Assinar Agora"
  const trackInitiateCheckout = useCallback((planType: string, value: number) => {
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: `Plano ${planType}`,
        content_category: 'Subscription',
        value: value,
        currency: 'BRL',
        num_items: 1,
      });
      console.log('[FB Pixel] Evento: InitiateCheckout -', planType, value);
    }
  }, []);

  // Evento: AddToCart - interesse em plano específico (clique em card de preço)
  const trackAddToCart = useCallback((planType: string, value: number) => {
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: `Plano ${planType}`,
        content_type: 'product',
        value: value,
        currency: 'BRL',
      });
      console.log('[FB Pixel] Evento: AddToCart -', planType);
    }
  }, []);

  // Evento: Contact - clique no WhatsApp ou suporte
  const trackContact = useCallback((method: string) => {
    if (window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: method,
      });
      console.log('[FB Pixel] Evento: Contact -', method);
    }
  }, []);

  // Evento: CompleteRegistration - após cadastro completo
  const trackCompleteRegistration = useCallback((value?: number) => {
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        value: value || 0,
        currency: 'BRL',
      });
      console.log('[FB Pixel] Evento: CompleteRegistration');
    }
  }, []);

  // Evento customizado genérico
  const trackCustomEvent = useCallback((eventName: string, params?: object) => {
    if (window.fbq) {
      window.fbq('trackCustom', eventName, params);
      console.log('[FB Pixel] Evento Custom:', eventName, params);
    }
  }, []);

  return {
    trackPageView,
    trackLead,
    trackViewContent,
    trackInitiateCheckout,
    trackAddToCart,
    trackContact,
    trackCompleteRegistration,
    trackCustomEvent,
  };
};

export default useFacebookPixel;
