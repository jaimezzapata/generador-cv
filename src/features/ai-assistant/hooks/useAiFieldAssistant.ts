"use client";

import { useCallback, useState } from "react";
import {
  AiProposalItem,
  AiTargetFieldType,
  AiWritingTone,
} from "../types/aiAssistant.types";
import { aiDraftClientService } from "../services/aiDraftClient.service";

export interface UseAiFieldAssistantParams {
  fieldType: AiTargetFieldType;
  defaultKeywords?: string;
  defaultTone?: AiWritingTone;
  roleTitle?: string;
  companyOrEntity?: string;
  yearsOfExperience?: string;
  currentText?: string;
  onApplyText: (newText: string) => void;
}

export function useAiFieldAssistant({
  fieldType,
  defaultKeywords = "",
  defaultTone = "ats_impacto",
  roleTitle,
  companyOrEntity,
  yearsOfExperience,
  currentText = "",
  onApplyText,
}: UseAiFieldAssistantParams) {
  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState(defaultKeywords);
  const [tone, setTone] = useState<AiWritingTone>(defaultTone);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [proposals, setProposals] = useState<AiProposalItem[]>([]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !keywords.trim() && defaultKeywords.trim()) {
        setKeywords(defaultKeywords);
      }
      return next;
    });
  }, [defaultKeywords, keywords]);

  const generateDrafts = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      const response = await aiDraftClientService.requestDrafts({
        fieldType,
        tone,
        keywords,
        roleTitle,
        companyOrEntity,
        yearsOfExperience,
        currentText,
      });
      setProposals(response.proposals);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Error generando propuestas."
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    companyOrEntity,
    currentText,
    fieldType,
    keywords,
    roleTitle,
    tone,
    yearsOfExperience,
  ]);

  const replaceWithProposal = useCallback(
    (text: string) => {
      onApplyText(text);
      setIsOpen(false);
    },
    [onApplyText]
  );

  const appendProposal = useCallback(
    (text: string) => {
      const combined = currentText.trim()
        ? `${currentText.trim()}\n${text}`
        : text;
      onApplyText(combined);
      setIsOpen(false);
    },
    [currentText, onApplyText]
  );

  return {
    isOpen,
    keywords,
    tone,
    isLoading,
    errorMsg,
    proposals,
    setKeywords,
    setTone,
    toggleOpen,
    generateDrafts,
    replaceWithProposal,
    appendProposal,
  };
}

