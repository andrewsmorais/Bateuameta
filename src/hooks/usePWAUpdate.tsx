import { useEffect, useState, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';

export const usePWAUpdate = () => {
  const { toast } = useToast();
  const [needRefresh, setNeedRefresh] = useState(false);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

  const {
    needRefresh: [swNeedRefresh, setSwNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log('[PWA] Service Worker registrado:', registration);
      registrationRef.current = registration || null;
      
      if (registration) {
        // Verificar atualização imediatamente ao abrir o app
        console.log('[PWA] Verificando atualizações imediatamente...');
        registration.update();
        
        // Verificar atualizações a cada 5 minutos
        setInterval(() => {
          console.log('[PWA] Verificação periódica de atualizações...');
          registration.update();
        }, 5 * 60 * 1000); // 5 minutos
      }
    },
    onRegisterError(error) {
      console.error('[PWA] Erro no registro do SW:', error);
    },
    onNeedRefresh() {
      console.log('[PWA] Nova versão disponível!');
      setNeedRefresh(true);
    },
  });

  // Verificar atualizações quando voltar online
  useEffect(() => {
    const handleOnline = () => {
      console.log('[PWA] Voltou online, verificando atualizações...');
      registrationRef.current?.update();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  // Verificar atualizações quando o app volta ao foco
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('[PWA] App voltou ao foco, verificando atualizações...');
        registrationRef.current?.update();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (swNeedRefresh) {
      setNeedRefresh(true);
      toast({
        title: "🔄 Nova versão disponível!",
        description: "Uma atualização está pronta para ser instalada.",
        action: (
          <button
            onClick={() => {
              updateServiceWorker(true);
              setSwNeedRefresh(false);
              setNeedRefresh(false);
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        ),
        duration: Infinity,
      });
    }
  }, [swNeedRefresh, toast, updateServiceWorker, setSwNeedRefresh]);

  const forceUpdate = () => {
    updateServiceWorker(true);
    window.location.reload();
  };

  return { needRefresh, forceUpdate };
};
