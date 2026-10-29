"use client";

import React from "react";
import { Download, Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/shared/components/ui/Button";

export interface PdfExportButtonProps {
  onExport: () => void;
  isExporting: boolean;
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

export function PdfExportButton({
  onExport,
  isExporting,
  label = "Descargar PDF",
  variant = "primary",
  size = "sm",
  className,
}: PdfExportButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => onExport()}
      disabled={isExporting}
      className={`gap-1.5 shadow-sm transition-all ${className ?? ""}`}
      title="Descargar directamente en formato PDF A4 (Sin ventana de impresión)"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Generando PDF...</span>
        </>
      ) : (
        <>
          <Download className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}

