"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { AiFieldAssistantWidget } from "@/features/ai-assistant/components/AiFieldAssistantWidget";
import { CvSummaryMetaPatch } from "@/features/cv-document/hooks/useCvDocument";

export interface ProfileSummaryFormProps {
  professionalTitle: string;
  skillKeywords: string;
  isSenaFormat: boolean;
  summary: string;
  careerObjective: string;
  yearsOfExperience: string;
  salaryExpectation: string;
  missingHints: string[];
  onUpdateMeta: (patch: CvSummaryMetaPatch) => void;
}

export function ProfileSummaryForm({
  professionalTitle,
  skillKeywords,
  isSenaFormat,
  summary,
  careerObjective,
  yearsOfExperience,
  salaryExpectation,
  missingHints,
  onUpdateMeta,
}: ProfileSummaryFormProps) {
  const defaultTone = isSenaFormat ? "norma_sena" : "ats_impacto";

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Perfil Profesional, Meta y Experiencia</CardTitle>
        <Badge variant="secondary">{summary.length} caracteres</Badge>
      </CardHeader>

      <div className="flex flex-col gap-2">
        <AiFieldAssistantWidget
          fieldType="profile_summary"
          buttonLabel="Redactar Perfil con IA"
          defaultKeywords={skillKeywords}
          defaultTone={defaultTone}
          roleTitle={professionalTitle}
          yearsOfExperience={yearsOfExperience}
          currentText={summary}
          onApplyText={(profileSummary) => onUpdateMeta({ profileSummary })}
        />
        <Textarea
          id="cv-profile-summary"
          label="Perfil Ocupacional / Resumen Ejecutivo"
          rows={5}
          value={summary}
          onChange={(e) => onUpdateMeta({ profileSummary: e.target.value })}
          placeholder="Describe tu formación principal, tecnologías o áreas de dominio, años de trayectoria y valor diferencial..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <AiFieldAssistantWidget
          fieldType="career_objective"
          buttonLabel="Redactar Objetivo con IA"
          defaultKeywords={skillKeywords}
          defaultTone={defaultTone}
          roleTitle={professionalTitle}
          currentText={careerObjective}
          onApplyText={(nextObj) => onUpdateMeta({ careerObjective: nextObj })}
        />
        <Textarea
          id="cv-career-objective"
          label="Objetivo Laboral / Propuesta de Valor (Opcional)"
          rows={3}
          value={careerObjective}
          onChange={(e) => onUpdateMeta({ careerObjective: e.target.value })}
          placeholder="Ej. Aportar soluciones escalables liderando procesos de mejora continua..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="cv-years-exp"
          label="Años de Experiencia Total"
          value={yearsOfExperience}
          onChange={(e) => onUpdateMeta({ yearsOfExperience: e.target.value })}
          placeholder="Ej. 4 años / Etapa Productiva"
        />
        <Input
          id="cv-salary-exp"
          label="Aspiración Salarial (Opcional)"
          value={salaryExpectation}
          onChange={(e) => onUpdateMeta({ salaryExpectation: e.target.value })}
          placeholder="Ej. A convenir / COP $4.500.000"
        />
      </div>

      {missingHints.length > 0 && (
        <div
          className="p-3 flex flex-col gap-1 text-xs"
          style={{
            backgroundColor: "var(--bg-surface-elevated)",
            border: "2px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <span className="font-bold">Sugerencias para llegar al 100%:</span>
          {missingHints.map((hint) => (
            <span key={hint} style={{ color: "var(--text-secondary)" }}>• {hint}</span>
          ))}
        </div>
      )}
    </Card>
  );
}
