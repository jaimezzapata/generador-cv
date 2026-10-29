"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { Textarea } from "@/shared/components/ui/Textarea";
import {
  EducationItem,
  EducationLevelType,
} from "@/features/cv-document/types/cvDocument.types";
import { EDUCATION_LEVEL_OPTIONS } from "../utils/blockEditorOptions.utils";
import { RepeatableItemCard } from "./RepeatableItemCard";

export interface EducationBlockFormProps {
  items: EducationItem[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<EducationItem>) => void;
  onRemove: (id: string) => void;
}

export function EducationBlockForm({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: EducationBlockFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Formación Académica y Titulada SENA</CardTitle>
        <Button variant="primary" size="sm" onClick={onAdd}>
          + Añadir Formación
        </Button>
      </CardHeader>

      <div className="flex flex-col gap-4">
        {items.map((edu, index) => (
          <RepeatableItemCard
            key={edu.id}
            index={index}
            title={edu.degree || edu.institution || "Nuevo Estudio"}
            onRemove={() => onRemove(edu.id)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id={`edu-inst-${edu.id}`}
                label="Institución Educativa / Centro SENA"
                value={edu.institution}
                onChange={(e) => onUpdate(edu.id, { institution: e.target.value })}
                placeholder="Ej. SENA / Universidad Nacional"
              />
              <Input
                id={`edu-deg-${edu.id}`}
                label="Título Obtenido o Programa"
                value={edu.degree}
                onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
                placeholder="Ej. Tecnólogo en Desarrollo de Software"
              />
              <Select
                id={`edu-lvl-${edu.id}`}
                label="Nivel de Formación"
                options={EDUCATION_LEVEL_OPTIONS}
                value={edu.level}
                onChange={(e) =>
                  onUpdate(edu.id, { level: e.target.value as EducationLevelType })
                }
              />
              <Input
                id={`edu-city-${edu.id}`}
                label="Ciudad"
                value={edu.city}
                onChange={(e) => onUpdate(edu.id, { city: e.target.value })}
                placeholder="Ej. Medellín"
              />
              <Input
                id={`edu-start-${edu.id}`}
                type="month"
                label="Fecha Inicio"
                value={edu.startDate}
                onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
              />
              <Input
                id={`edu-end-${edu.id}`}
                type="month"
                label="Fecha Grado / Finalización"
                value={edu.endDate}
                disabled={edu.inProgress}
                onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
              />
              <Input
                id={`edu-hrs-${edu.id}`}
                label="Intensidad Horaria (SENA - Opcional)"
                value={edu.hoursIntensity}
                onChange={(e) =>
                  onUpdate(edu.id, { hoursIntensity: e.target.value })
                }
                placeholder="Ej. 3984 horas"
              />
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={edu.inProgress}
                    onChange={(e) =>
                      onUpdate(edu.id, { inProgress: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  Estudio en curso actualmente
                </label>
              </div>
            </div>

            <Textarea
              id={`edu-honors-${edu.id}`}
              label="Distinciones, Promedio o Proyecto de Grado (Opcional)"
              rows={2}
              value={edu.honorsOrSummary}
              onChange={(e) =>
                onUpdate(edu.id, { honorsOrSummary: e.target.value })
              }
              placeholder="Ej. Tesis laureada • Promedio 4.5/5.0 • Semillero SENNOVA..."
            />
          </RepeatableItemCard>
        ))}
      </div>
    </Card>
  );
}
