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
          "fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2",
          "animate-in slide-in-from-right-5 fade-in duration-300"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors shadow-md"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Main floating button */}
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

        {/* Label tooltip */}
        <div className="absolute right-16 bottom-0 whitespace-nowrap bg-popover text-popover-foreground text-sm px-3 py-1.5 rounded-lg shadow-md border border-border">
          Instalar App
        </div>
      </div>

      <PWAInstallDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};
