import { useState } from "react";
import { Download, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { PWAInstallDialog } from "./PWAInstallDialog";

interface PWAFloatingButtonProps {
  visible: boolean;
  onClose: () => void;
}

export const PWAFloatingButton = ({ visible, onClose }: PWAFloatingButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { install, isInstallable } = usePWAInstall();

  const handleClick = async () => {
    if (isInstallable) {
      const installed = await install();
      if (installed) {
        onClose();
        return;
      }
    }
    setDialogOpen(true);
  };

  if (!visible) return null;

  return (
    <>
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-3",
          "animate-in slide-in-from-bottom-5 fade-in duration-300"
        )}
      >
        {/* Label tooltip */}
        <div className="whitespace-nowrap bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg shadow-lg border border-border">
          Instalar App
        </div>

        {/* Main floating button with close */}
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-colors shadow-md z-10"
            aria-label="Fechar"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Main button */}
          <button
            onClick={handleClick}
            className={cn(
              "flex items-center justify-center w-14 h-14 rounded-full",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "shadow-lg hover:shadow-xl transition-all duration-200",
              "hover:scale-105 active:scale-95"
            )}
            aria-label="Instalar aplicativo"
          >
            <Download className="w-6 h-6" />
          </button>
        </div>
      </div>

      <PWAInstallDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};
