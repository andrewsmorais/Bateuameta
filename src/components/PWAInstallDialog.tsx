import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Check, Share, MoreVertical, Plus, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { toast } from "sonner";

interface PWAInstallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PWAInstallDialog = ({ open, onOpenChange }: PWAInstallDialogProps) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, browserName, install } = usePWAInstall();

  const handleInstallClick = async () => {
    if (isInstalled) {
      toast.success("App já está instalado!");
      return;
    }

    if (isInstallable) {
      const success = await install();
      if (success) {
        toast.success("App instalado com sucesso!");
        onOpenChange(false);
      }
    } else {
      toast.info("Siga as instruções na tela para instalar");
    }
  };

  // iOS Instructions - shown immediately
  const renderIOSInstructions = () => (
    <div className="space-y-4">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
        <div className="flex items-center gap-2 text-blue-500 mb-2">
          <Smartphone className="h-4 w-4" />
          <span className="text-sm font-medium">iPhone/iPad detectado</span>
        </div>
        <p className="text-xs text-muted-foreground">
          No iOS, use o Safari para instalar o app
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
            1
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Toque no botão Compartilhar</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-blue-500 p-1.5 rounded">
                <Share className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-muted-foreground">
                Na barra inferior do Safari
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
            2
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Toque em "Adicionar à Tela de Início"</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-muted border p-1.5 rounded">
                <Plus className="h-4 w-4" />
              </div>
              <span className="text-xs text-muted-foreground">
                Role para encontrar a opção
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
            3
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Toque em "Adicionar"</p>
            <span className="text-xs text-muted-foreground">
              No canto superior direito
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Android Instructions
  const renderAndroidInstructions = () => (
    <div className="space-y-4">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
        <div className="flex items-center gap-2 text-green-500 mb-2">
          <Smartphone className="h-4 w-4" />
          <span className="text-sm font-medium">Android detectado ({browserName})</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {isInstallable 
            ? "Clique no botão abaixo para instalar" 
            : "Siga os passos para instalar manualmente"}
        </p>
      </div>

      {isInstallable ? (
        <Button
          onClick={handleInstallClick}
          size="lg"
          className="w-full gap-2 bg-[#15a249] hover:bg-[#128a3d] text-white"
        >
          <Download className="h-5 w-5" />
          Instalar Agora
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Toque no menu do navegador</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-muted border p-1.5 rounded">
                  <MoreVertical className="h-4 w-4" />
                </div>
                <span className="text-xs text-muted-foreground">
                  Os 3 pontos no canto superior
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Toque em "Instalar aplicativo"</p>
              <span className="text-xs text-muted-foreground">
                Ou "Adicionar à tela inicial"
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
              3
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Confirme a instalação</p>
              <span className="text-xs text-muted-foreground">
                Toque em "Instalar" na janela que aparecer
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Desktop Instructions
  const renderDesktopInstructions = () => (
    <div className="space-y-4">
      {isInstallable ? (
        <Button
          onClick={handleInstallClick}
          size="lg"
          className="w-full gap-2 bg-[#15a249] hover:bg-[#128a3d] text-white"
        >
          <Download className="h-5 w-5" />
          Instalar Agora
        </Button>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            {browserName} detectado - siga os passos:
          </p>
          
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Clique no ícone de instalação</p>
              <span className="text-xs text-muted-foreground">
                Na barra de endereços do navegador
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#15a249] text-white text-sm font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Clique em "Instalar"</p>
              <span className="text-xs text-muted-foreground">
                Na janela de confirmação
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render content based on device type
  const renderContent = () => {
    if (isIOS) return renderIOSInstructions();
    if (isAndroid) return renderAndroidInstructions();
    return renderDesktopInstructions();
  };

  // Already installed state
  if (isInstalled) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <img 
                src="/pwa-icon.png" 
                alt="Bateu A Meta" 
                className="w-12 h-12 rounded-xl object-cover"
              />
              <span>Bateu A Meta</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">App já instalado!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                O Bateu A Meta já está na sua tela inicial
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img 
              src="/pwa-icon.png" 
              alt="Bateu A Meta" 
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span>Instalar Bateu A Meta</span>
          </DialogTitle>
          <DialogDescription>
            Instale o app para acesso rápido e experiência completa
          </DialogDescription>
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
