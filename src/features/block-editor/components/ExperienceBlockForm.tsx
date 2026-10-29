"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { ExperienceItem } from "@/features/cv-document/types/cvDocument.types";
import { RepeatableItemCard } from "./RepeatableItemCard";
import { ExperienceItemFields } from "./ExperienceItemFields";

export interface ExperienceBlockFormProps {
  items: ExperienceItem[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<ExperienceItem>) => void;
  onRemove: (id: string) => void;
}

export function ExperienceBlockForm({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: ExperienceBlockFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Experiencia Laboral y Prácticas</CardTitle>
        <Button variant="primary" size="sm" onClick={onAdd}>
          + Añadir Experiencia
        </Button>
      </CardHeader>

      <div className="flex flex-col gap-4">
        {items.map((exp, index) => (
          <RepeatableItemCard
            key={exp.id}
            index={index}
            title={exp.role || exp.company || "Nueva Experiencia Laboral"}
            onRemove={() => onRemove(exp.id)}
          >
            <ExperienceItemFields
              exp={exp}
              onUpdate={(patch) => onUpdate(exp.id, patch)}
            />
          </RepeatableItemCard>
        ))}
      </div>
    </Card>
  );
}
