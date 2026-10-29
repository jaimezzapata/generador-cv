"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import {
  AiTargetFieldType,
  AiWritingTone,
} from "../types/aiAssistant.types";
import {
  AI_FIELD_LABELS,
  AI_WRITING_TONE_OPTIONS,
} from "../utils/aiToneOptions.utils";
import { useAiFieldAssistant } from "../hooks/useAiFieldAssistant";
import { AiProposalsList } from "./AiProposalsList";

export interface AiFieldAssistantWidgetProps {
  fieldType: AiTargetFieldType;
  buttonLabel?: string;
  defaultKeywords?: string;
  defaultTone?: AiWritingTone;
  roleTitle?: string;
  companyOrEntity?: string;
  yearsOfExperience?: string;
  currentText?: string;
  onApplyText: (newText: string) => void;
}

export function AiFieldAssistantWidget(props: AiFieldAssistantWidgetProps) {
  const ai = useAiFieldAssistant(props);
  const meta = AI_FIELD_LABELS[props.fieldType];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={ai.toggleOpen}
          className="px-3 py-1 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
          style={{
            backgroundColor: ai.isOpen
              ? "var(--accent-primary)"
              : "var(--accent-secondary)",
            color: ai.isOpen
              ? "var(--accent-primary-fg)"
              : "var(--accent-secondary-fg)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          <span>✨</span>
          <span>{ai.isOpen ? "Cerrar Asistente IA" : props.buttonLabel ?? "Redactar con IA"}</span>
        </button>
      </div>

      {ai.isOpen && (
        <div
          className="p-3.5 flex flex-col gap-3"
          style={{
            backgroundColor: "var(--bg-surface-elevated)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <span className="text-xs font-extrabold uppercase tracking-wide theme-heading">
            ✨ {meta.title}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
            <div className="sm:col-span-2">
              <Input
                id={`ai-kw-${props.fieldType}`}
                label="Palabras clave que quieres incluir (separadas por coma)"
                value={ai.keywords}
                onChange={(e) => ai.setKeywords(e.target.value)}
                placeholder={meta.placeholderKeywords}
              />
            </div>

            <Select
              id={`ai-tone-${props.fieldType}`}
              label="Estilo de Redacción"
              options={AI_WRITING_TONE_OPTIONS}
              value={ai.tone}
              onChange={(e) => ai.setTone(e.target.value as AiWritingTone)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              disabled={ai.isLoading}
              onClick={ai.generateDrafts}
            >
              {ai.isLoading ? "Redactando..." : "⚡ Generar 3 Propuestas IA"}
            </Button>
          </div>

          {ai.errorMsg && (
            <span className="text-xs font-bold text-red-600">{ai.errorMsg}</span>
          )}

          <AiProposalsList
            proposals={ai.proposals}
            hasExistingText={Boolean(props.currentText?.trim())}
            onReplace={ai.replaceWithProposal}
            onAppend={ai.appendProposal}
          />
        </div>
      )}
    </div>
  );
}

