import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, Monitor, Apple, ChevronRight, Check, AlertCircle } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { toast } from "sonner";
import pwaIcon from "@/assets/pwa-install-icon.png";

const Instalar = () => {
  const [deviceType, setDeviceType] = useState<"android" | "ios" | "desktop">("desktop");
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType("ios");
    } else if (/android/.test(userAgent)) {
      setDeviceType("android");
    } else {
      setDeviceType("desktop");
    }
  }, []);

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
        toast.info("Instalação cancelada. Siga as instruções abaixo para instalar manualmente.");
      }
    } else {
      toast.info("Siga as instruções abaixo para seu dispositivo");
      // Scroll to device-specific instructions
      const element = document.getElementById(`instructions-${deviceType}`);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <img
            src={pwaIcon}
            alt="Bateu a Meta"
            className="w-24 h-24 mx-auto rounded-2xl shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Instalar Bateu a Meta
          </h1>
          <p className="text-muted-foreground">
            Instale o aplicativo no seu dispositivo para acesso rápido e funcionalidade offline
          </p>
        </div>

        {/* Already Installed */}
        {isInstalled && (
          <Card className="border-green-500 bg-green-500/10">
            <CardContent className="flex items-center gap-3 p-4">
              <Check className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-medium">
                Aplicativo já está instalado!
              </span>
            </CardContent>
          </Card>
        )}

        {/* Install Button */}
        {!isInstalled && (
          <div className="space-y-3">
            <Button
              onClick={handleInstallClick}
              size="lg"
              className="w-full text-lg py-6 bg-[#15a249] hover:bg-[#128a3d] text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              {isInstallable ? "Instalar Aplicativo Agora" : "Ver Instruções de Instalação"}
            </Button>
            
            {!isInstallable && (
              <Card className="border-amber-500/50 bg-amber-500/10">
                <CardContent className="flex items-start gap-3 p-4">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-600 dark:text-amber-400">
                    <p className="font-medium">Instalação Manual Necessária</p>
                    <p className="mt-1 text-muted-foreground">
                      {deviceType === "ios" 
                        ? "No iPhone/iPad, use o Safari e siga as instruções abaixo."
                        : "Siga as instruções abaixo para seu dispositivo."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Device-specific instructions */}
        <div className="space-y-4">
          {/* Android Instructions */}
          <Card 
            id="instructions-android"
            className={deviceType === "android" ? "ring-2 ring-primary" : ""}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Smartphone className="w-5 h-5 text-green-500" />
                Android (Chrome)
                {deviceType === "android" && (
                  <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Seu dispositivo
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <p className="text-muted-foreground">
                  Toque no menu <strong>⋮</strong> (três pontos) no canto superior direito
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <p className="text-muted-foreground">
                  Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <p className="text-muted-foreground">
                  Confirme tocando em <strong>"Instalar"</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* iOS Instructions */}
          <Card 
            id="instructions-ios"
            className={deviceType === "ios" ? "ring-2 ring-primary" : ""}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Apple className="w-5 h-5" />
                iPhone / iPad (Safari)
                {deviceType === "ios" && (
                  <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Seu dispositivo
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <p className="text-muted-foreground">
                  Abra este site no <strong>Safari</strong> (navegador padrão)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <p className="text-muted-foreground">
                  Toque no botão <strong>Compartilhar</strong> (ícone de quadrado com seta para cima)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <p className="text-muted-foreground">
                  Role e toque em <strong>"Adicionar à Tela de Início"</strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <p className="text-muted-foreground">
                  Toque em <strong>"Adicionar"</strong> no canto superior direito
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Instructions */}
          <Card 
            id="instructions-desktop"
            className={deviceType === "desktop" ? "ring-2 ring-primary" : ""}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Monitor className="w-5 h-5 text-blue-500" />
                Desktop (Chrome/Edge)
                {deviceType === "desktop" && (
                  <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Seu dispositivo
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <p className="text-muted-foreground">
                  Procure o ícone de <strong>instalação</strong> na barra de endereços (lado direito)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <p className="text-muted-foreground">
                  Clique no ícone e selecione <strong>"Instalar"</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Benefícios do App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Acesso rápido direto da tela inicial",
              "Funciona mesmo sem internet",
              "Notificações de metas e lembretes",
              "Experiência de app nativo",
              "Atualizações automáticas",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </CardContent>
        </Card>

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
