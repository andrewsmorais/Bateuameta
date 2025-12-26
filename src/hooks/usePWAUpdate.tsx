import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useToast } from '@/hooks/use-toast';

export const usePWAUpdate = () => {
  const { toast } = useToast();
  const [needRefresh, setNeedRefresh] = useState(false);

  const {
    needRefresh: [swNeedRefresh, setSwNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      console.log('[PWA] Service Worker registrado:', registration);
      
      // Verificar atualizações a cada 1 hora
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
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

  useEffect(() => {
    if (swNeedRefresh) {
      setNeedRefresh(true);
      toast({
        title: "Nova versão disponível!",
        description: "Clique em 'Atualizar' para carregar a versão mais recente.",
        action: (
          <button
            onClick={() => {
              updateServiceWorker(true);
              setSwNeedRefresh(false);
              setNeedRefresh(false);
            }}
            className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium"
          >
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
