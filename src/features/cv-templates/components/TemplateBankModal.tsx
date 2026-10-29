"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { CvTemplateId } from "@/features/cv-document/types/cvDocument.types";
import { useTemplateBank } from "../hooks/useTemplateBank";
import { TemplateBankGridSection } from "./TemplateBankGridSection";

export interface TemplateBankModalProps {
  isOpen: boolean;
  activeTemplateId: CvTemplateId;
  onClose: () => void;
  onLoadFullPreset: (id: CvTemplateId) => void;
  onApplyLayoutOnly: (id: CvTemplateId) => void;
}

export function TemplateBankModal({
  isOpen,
  activeTemplateId,
  onClose,
  onLoadFullPreset,
  onApplyLayoutOnly,
}: TemplateBankModalProps) {
  const bank = useTemplateBank();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Banco de plantillas listas para editar"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: "rgba(9, 9, 11, 0.72)" }}
    >
      <div
        className="max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-5"
        style={{
          backgroundColor: "var(--bg-app)",
          border: "2.5px solid var(--border-color)",
          borderRadius: "var(--radius-card)",
          boxShadow: "var(--shadow-interactive)",
        }}
      >
        <div
          className="flex items-center justify-between gap-3 pb-3"
          style={{ borderBottom: "2px solid var(--border-color)" }}
        >
          <div>
            <h2 className="text-lg font-extrabold theme-heading">
              Banco de Plantillas Predefinidas
            </h2>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Elige una plantilla completa con datos de ejemplo listos para
              editar o cambia únicamente el diseño visual de tu CV actual.
            </p>
          </div>
          <Button
            variant="surface"
            size="sm"
            onClick={onClose}
            className="w-[104px] min-w-[104px]"
          >
            Cerrar ✕
          </Button>
        </div>

        <TemplateBankGridSection
          presets={bank.filteredPresets}
          activeCategory={bank.activeCategory}
          activeTemplateId={activeTemplateId}
          mode="editor"
          onChangeCategory={bank.setActiveCategory}
          onLoadFullPreset={(id) => {
            onLoadFullPreset(id);
            onClose();
          }}
          onApplyLayoutOnly={(id) => {
            onApplyLayoutOnly(id);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
