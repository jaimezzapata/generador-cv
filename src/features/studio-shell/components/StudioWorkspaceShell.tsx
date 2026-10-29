"use client";

import React from "react";
import { usePrimitivesDemoForm } from "../hooks/usePrimitivesDemoForm";
import { StudioHeaderBar } from "./StudioHeaderBar";
import { PrimitivesLivePlayground } from "./PrimitivesLivePlayground";
import { LiveCvSheetPreview } from "./LiveCvSheetPreview";
import { TemplateCatalogSection } from "./TemplateCatalogSection";
import { StudioPhaseStatusCard } from "./StudioPhaseStatusCard";

export function StudioWorkspaceShell() {
  const {
    selectedTemplateId,
    activeCategory,
    filteredTemplates,
    setActiveCategory,
    selectTemplate,
  } = usePrimitivesDemoForm();

  return (
    <div className="min-h-screen flex flex-col">
      <StudioHeaderBar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:py-10 md:px-8 flex flex-col gap-12">
        <PrimitivesLivePlayground />

        <LiveCvSheetPreview />

        <TemplateCatalogSection
          templates={filteredTemplates}
          selectedTemplateId={selectedTemplateId}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          onSelectTemplate={selectTemplate}
        />

        <StudioPhaseStatusCard />
      </main>

      <footer
        className="w-full px-4 py-5 md:px-8 mt-6 text-xs"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderTop: "2px solid var(--border-color)",
          color: "var(--text-muted)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            CVPro Studio
          </span>
          <span>Norma SENA · ATS · Drag &amp; Drop · IA · PDF</span>
        </div>
      </footer>
    </div>
  );
}
