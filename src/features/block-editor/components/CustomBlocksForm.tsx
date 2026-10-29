"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { AiFieldAssistantWidget } from "@/features/ai-assistant/components/AiFieldAssistantWidget";
import { CustomSectionBlock } from "@/features/cv-document/types/cvDocument.types";
import { RepeatableItemCard } from "./RepeatableItemCard";

export interface CustomBlocksFormProps {
  items: CustomSectionBlock[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<CustomSectionBlock>) => void;
  onRemove: (id: string) => void;
}

export function CustomBlocksForm({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: CustomBlocksFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Secciones Personalizadas (Voluntariado, Premios, Otros)</CardTitle>
        <Button variant="primary" size="sm" onClick={onAdd}>
          + Nueva Sección Libre
        </Button>
      </CardHeader>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <RepeatableItemCard
            key={item.id}
            index={index}
            title={item.sectionTitle || "Sección Personalizada"}
            onRemove={() => onRemove(item.id)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id={`cst-title-${item.id}`}
                label="Título de la Sección en el CV"
                value={item.sectionTitle}
                onChange={(e) =>
                  onUpdate(item.id, { sectionTitle: e.target.value })
                }
                placeholder="Ej. Voluntariado / Publicaciones / Premios"
              />
              <Input
                id={`cst-sub-${item.id}`}
                label="Subtítulo o Actividad"
                value={item.subtitle}
                onChange={(e) => onUpdate(item.id, { subtitle: e.target.value })}
                placeholder="Ej. Semillero de Investigación SENNOVA"
              />
              <Input
                id={`cst-loc-${item.id}`}
                label="Entidad o Ciudad"
                value={item.locationOrEntity}
                onChange={(e) =>
                  onUpdate(item.id, { locationOrEntity: e.target.value })
                }
                placeholder="Ej. SENA Regional Antioquia"
              />
              <Input
                id={`cst-per-${item.id}`}
                label="Periodo o Fecha"
                value={item.period}
                onChange={(e) => onUpdate(item.id, { period: e.target.value })}
                placeholder="Ej. 2025 - 2026"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <AiFieldAssistantWidget
                fieldType="custom_section"
                buttonLabel="Redactar Detalle con IA"
                roleTitle={item.subtitle}
                companyOrEntity={item.locationOrEntity}
                currentText={item.content}
                onApplyText={(content) => onUpdate(item.id, { content })}
              />
              <Textarea
                id={`cst-cnt-${item.id}`}
                label="Detalle / Logros"
                rows={3}
                value={item.content}
                onChange={(e) => onUpdate(item.id, { content: e.target.value })}
                placeholder="Describe los aportes, ponencias, premios o actividades..."
              />
            </div>
          </RepeatableItemCard>
        ))}
      </div>
    </Card>
  );
}
