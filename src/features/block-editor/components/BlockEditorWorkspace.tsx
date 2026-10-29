"use client";

import React from "react";
import { useCvDocument } from "@/features/cv-document/hooks/useCvDocument";
import { useTemplateBank } from "@/features/cv-templates/hooks/useTemplateBank";
import { TemplateBankModal } from "@/features/cv-templates/components/TemplateBankModal";
import { useBlockEditorNavigation } from "../hooks/useBlockEditorNavigation";
import { EditorTopBar } from "./EditorTopBar";
import { BlockNavigationSidebar } from "./BlockNavigationSidebar";
import { ActiveBlockFormDispatcher } from "./ActiveBlockFormDispatcher";
import { LiveDocumentSummaryPanel } from "./LiveDocumentSummaryPanel";

export function BlockEditorWorkspace() {
  const cv = useCvDocument();
  const nav = useBlockEditorNavigation(cv.addSkill, cv.addLanguage);
  const bank = useTemplateBank();
  const { document, completion } = cv;

  return (
    <div className="min-h-screen flex flex-col">
      <EditorTopBar
        templateId={document.templateId}
        completionPercentage={completion.percentage}
        onChangeTemplate={cv.setTemplateId}
        onOpenTemplateBank={bank.openModal}
        onOpenDesignTab={() => {
          nav.setFullPreviewMode(false);
          nav.setActiveTab("design");
        }}
      />

      <TemplateBankModal
        isOpen={bank.isModalOpen}
        activeTemplateId={document.templateId}
        onClose={bank.closeModal}
        onLoadFullPreset={cv.loadPredefinedTemplate}
        onApplyLayoutOnly={cv.setTemplateId}
      />

      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 py-6 md:px-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {!nav.fullPreviewMode && (
          <section className="xl:col-span-5 flex flex-col gap-5">
            <BlockNavigationSidebar
              activeTab={nav.activeTab}
              blocks={document.blocks}
              countsBySection={{
                experience: document.experiences.length,
                education: document.educations.length,
                projects: document.projects.length,
                skills: document.skills.length,
                languages: document.languages.length,
                certifications: document.certifications.length,
                references: document.references.length,
                custom: document.customBlocks.length,
              }}
              onSelectTab={nav.setActiveTab}
              onToggleBlockVisibility={cv.toggleBlockVisibility}
            />

            <ActiveBlockFormDispatcher
              activeTab={nav.activeTab}
              cv={cv}
              nav={nav}
            />
          </section>
        )}

        <aside
          className={
            nav.fullPreviewMode
              ? "xl:col-span-12"
              : "xl:col-span-7 xl:sticky xl:top-20"
          }
        >
          <LiveDocumentSummaryPanel
            document={document}
            zoomLevel={nav.zoomLevel}
            fullPreviewMode={nav.fullPreviewMode}
            onChangeZoom={nav.setZoomLevel}
            onToggleFullPreview={() =>
              nav.setFullPreviewMode(!nav.fullPreviewMode)
            }
            onOpenTemplateBank={bank.openModal}
            onOpenDesignTab={() => {
              nav.setFullPreviewMode(false);
              nav.setActiveTab("design");
            }}
          />
        </aside>
      </main>
    </div>
  );
}
