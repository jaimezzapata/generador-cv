"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { ReferenceItem } from "@/features/cv-document/types/cvDocument.types";
import { REFERENCE_TYPE_OPTIONS } from "../utils/blockEditorOptions.utils";
import { RepeatableItemCard } from "./RepeatableItemCard";

export interface ReferencesBlockFormProps {
  items: ReferenceItem[];
  referencesOnRequest: boolean;
  onToggleReferencesOnRequest: (enabled: boolean) => void;
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<ReferenceItem>) => void;
  onRemove: (id: string) => void;
}

export function ReferencesBlockForm({
  items,
  referencesOnRequest,
  onToggleReferencesOnRequest,
  onAdd,
  onUpdate,
  onRemove,
}: ReferencesBlockFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Referencias Laborales, Académicas y Personales</CardTitle>
        <Button variant="primary" size="sm" onClick={onAdd}>
          + Añadir Referencia
        </Button>
      </CardHeader>

      <label className="flex items-center gap-2 text-xs font-bold cursor-pointer p-2.5 rounded border border-dashed border-slate-400">
        <input
          type="checkbox"
          checked={referencesOnRequest}
          onChange={(e) => onToggleReferencesOnRequest(e.target.checked)}
          className="w-4 h-4"
        />
        Mostrar leyenda ejecutiva: &ldquo;Referencias disponibles a solicitud&rdquo;
      </label>

      {!referencesOnRequest && (
        <div className="flex flex-col gap-4">
          {items.map((ref, index) => (
            <RepeatableItemCard
              key={ref.id}
              index={index}
              title={ref.fullName || "Nueva Referencia"}
              onRemove={() => onRemove(ref.id)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  id={`ref-name-${ref.id}`}
                  label="Nombre Completo"
                  value={ref.fullName}
                  onChange={(e) => onUpdate(ref.id, { fullName: e.target.value })}
                  placeholder="Ej. Camilo Restrepo Ochoa"
                />
                <Select
                  id={`ref-type-${ref.id}`}
                  label="Tipo de Referencia"
                  options={REFERENCE_TYPE_OPTIONS}
                  value={ref.referenceType}
                  onChange={(e) =>
                    onUpdate(ref.id, {
                      referenceType: e.target.value as ReferenceItem["referenceType"],
                    })
                  }
                />
                <Input
                  id={`ref-role-${ref.id}`}
                  label="Cargo o Parentesco"
                  value={ref.roleOrRelationship}
                  onChange={(e) =>
                    onUpdate(ref.id, { roleOrRelationship: e.target.value })
                  }
                  placeholder="Ej. Líder Técnico / Instructor"
                />
                <Input
                  id={`ref-comp-${ref.id}`}
                  label="Empresa o Institución"
                  value={ref.company}
                  onChange={(e) => onUpdate(ref.id, { company: e.target.value })}
                  placeholder="Ej. Soluciones Digitales S.A.S."
                />
                <Input
                  id={`ref-phone-${ref.id}`}
                  label="Teléfono de Contacto"
                  value={ref.phone}
                  onChange={(e) => onUpdate(ref.id, { phone: e.target.value })}
                  placeholder="+57 310 000 0000"
                />
                <Input
                  id={`ref-email-${ref.id}`}
                  label="Correo / Ciudad (Opcional)"
                  value={ref.email}
                  onChange={(e) => onUpdate(ref.id, { email: e.target.value })}
                  placeholder="contacto@empresa.co"
                />
              </div>
            </RepeatableItemCard>
          ))}
        </div>
      )}
    </Card>
  );
}
