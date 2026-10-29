"use client";

import React from "react";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { Textarea } from "@/shared/components/ui/Textarea";
import { AiFieldAssistantWidget } from "@/features/ai-assistant/components/AiFieldAssistantWidget";
import {
  ContractType,
  ExperienceItem,
  WorkModalityType,
} from "@/features/cv-document/types/cvDocument.types";
import {
  CONTRACT_TYPE_OPTIONS,
  WORK_MODALITY_OPTIONS,
} from "../utils/blockEditorOptions.utils";

export interface ExperienceItemFieldsProps {
  exp: ExperienceItem;
  onUpdate: (patch: Partial<ExperienceItem>) => void;
}

export function ExperienceItemFields({
  exp,
  onUpdate,
}: ExperienceItemFieldsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id={`exp-company-${exp.id}`}
          label="Empresa o Entidad"
          value={exp.company}
          onChange={(e) => onUpdate({ company: e.target.value })}
          placeholder="Ej. Soluciones Digitales S.A.S."
        />
        <Input
          id={`exp-role-${exp.id}`}
          label="Cargo Desempeñado"
          value={exp.role}
          onChange={(e) => onUpdate({ role: e.target.value })}
          placeholder="Ej. Desarrolladora Frontend"
        />
        <Select
          id={`exp-contract-${exp.id}`}
          label="Tipo de Contrato"
          options={CONTRACT_TYPE_OPTIONS}
          value={exp.contractType}
          onChange={(e) => onUpdate({ contractType: e.target.value as ContractType })}
        />
        <Select
          id={`exp-modality-${exp.id}`}
          label="Modalidad"
          options={WORK_MODALITY_OPTIONS}
          value={exp.workModality}
          onChange={(e) => onUpdate({ workModality: e.target.value as WorkModalityType })}
        />
        <Input
          id={`exp-city-${exp.id}`}
          label="Ciudad / País"
          value={exp.city}
          onChange={(e) => onUpdate({ city: e.target.value })}
          placeholder="Ej. Medellín, Colombia"
        />
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={exp.isCurrent}
              onChange={(e) => onUpdate({ isCurrent: e.target.checked })}
              className="w-4 h-4"
            />
            Trabajo aquí actualmente
          </label>
        </div>
        <Input
          id={`exp-start-${exp.id}`}
          type="month"
          label="Fecha de Ingreso"
          value={exp.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
        />
        <Input
          id={`exp-end-${exp.id}`}
          type="month"
          label="Fecha de Retiro"
          value={exp.endDate}
          disabled={exp.isCurrent}
          onChange={(e) => onUpdate({ endDate: e.target.value })}
        />
        <Input
          id={`exp-boss-${exp.id}`}
          label="Jefe Inmediato (Soporte SENA)"
          value={exp.immediateBoss}
          onChange={(e) => onUpdate({ immediateBoss: e.target.value })}
          placeholder="Ej. Ing. Camilo Restrepo"
        />
        <Input
          id={`exp-phone-${exp.id}`}
          label="Teléfono / Correo Verificación"
          value={exp.verificationPhone}
          onChange={(e) => onUpdate({ verificationPhone: e.target.value })}
          placeholder="Ej. 604 320 4410 · rrhh@empresa.co"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <AiFieldAssistantWidget
          fieldType="experience_functions"
          buttonLabel="Redactar Funciones con IA"
          roleTitle={exp.role}
          companyOrEntity={exp.company}
          currentText={exp.description}
          onApplyText={(description) => onUpdate({ description })}
        />
        <Textarea
          id={`exp-desc-${exp.id}`}
          label="Funciones y Responsabilidades Principales"
          rows={3}
          value={exp.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe tus funciones principales en el cargo..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <AiFieldAssistantWidget
          fieldType="experience_achievements"
          buttonLabel="Redactar Logros con IA"
          roleTitle={exp.role}
          companyOrEntity={exp.company}
          currentText={exp.achievements}
          onApplyText={(achievements) => onUpdate({ achievements })}
        />
        <Textarea
          id={`exp-ach-${exp.id}`}
          label="Logros Medibles Destacados (Hitos / Métricas)"
          rows={2}
          value={exp.achievements}
          onChange={(e) => onUpdate({ achievements: e.target.value })}
          placeholder="Ej. Reducción del 30% en tiempos de entrega • Liderazgo de 5 proyectos..."
        />
      </div>
    </div>
  );
}
