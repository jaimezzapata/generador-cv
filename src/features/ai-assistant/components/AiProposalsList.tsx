"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { AiProposalItem } from "../types/aiAssistant.types";

export interface AiProposalsListProps {
  proposals: AiProposalItem[];
  hasExistingText: boolean;
  onReplace: (text: string) => void;
  onAppend: (text: string) => void;
}

export function AiProposalsList({
  proposals,
  hasExistingText,
  onReplace,
  onAppend,
}: AiProposalsListProps) {
  if (proposals.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5 pt-2">
      <span className="text-[11px] font-extrabold uppercase tracking-wider">
        Elige una propuesta para insertarla:
      </span>

      {proposals.map((prop) => (
        <div
          key={prop.id}
          className="p-3 flex flex-col gap-2 text-xs"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary">{prop.label}</Badge>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onReplace(prop.text)}
                className="px-2.5 py-1 text-[11px] font-extrabold cursor-pointer"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--accent-primary-fg)",
                  border: "2px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                ✓ Usar este texto
              </button>

              {hasExistingText && (
                <button
                  type="button"
                  onClick={() => onAppend(prop.text)}
                  className="px-2 py-1 text-[11px] font-bold cursor-pointer"
                  style={{
                    backgroundColor: "var(--bg-surface-elevated)",
                    color: "var(--text-primary)",
                    border: "2px solid var(--border-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  + Anexar
                </button>
              )}
            </div>
          </div>

          <p className="leading-relaxed whitespace-pre-line">{prop.text}</p>
        </div>
      ))}
    </div>
  );
}

