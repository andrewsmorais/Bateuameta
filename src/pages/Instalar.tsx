import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Check } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { toast } from "sonner";
import pwaIcon from "@/assets/pwa-install-icon.png";

const Instalar = () => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  useEffect(() => {
    // Auto-trigger install prompt when available
    if (isInstallable && !isInstalled) {
      handleInstallClick();
    }
  }, [isInstallable, isInstalled]);

  const handleInstallClick = async () => {
    if (isInstalled) {
      toast.success("Aplicativo já está instalado!");
      return;
    }

    if (isInstallable) {
      const success = await install();
      if (success) {
        toast.success("🎉 Aplicativo instalado com sucesso!");
      } else {
        toast.info("Instalação cancelada pelo usuário.");
      }
    } else {
      toast.error("Instalação não disponível. Acesse pelo navegador Chrome ou Edge no site publicado.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md mx-auto space-y-6 text-center">
        {/* Header */}
        <div className="space-y-4">
          <img
            src={pwaIcon}
            alt="Bateu a Meta"
            className="w-24 h-24 mx-auto rounded-2xl shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Instalar Bateu a Meta
          </h1>
        </div>

        {/* Already Installed */}
        {isInstalled ? (
          <Card className="border-green-500 bg-green-500/10">
            <CardContent className="flex items-center justify-center gap-3 p-6">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-medium text-lg">
                Aplicativo já está instalado!
              </span>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={handleInstallClick}
            size="lg"
            className="w-full text-lg py-6 bg-[#15a249] hover:bg-[#128a3d] text-white"
          >
            <Download className="w-5 h-5 mr-2" />
            Instalar Agora
          </Button>
        )}

        {/* Back to App */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.location.href = "/dashboard"}
        >
          Voltar para o Aplicativo
        </Button>
      </div>
    </div>
  );
};

export default Instalar;
