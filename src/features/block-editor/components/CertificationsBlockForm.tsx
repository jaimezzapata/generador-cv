"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { CertificationItem } from "@/features/cv-document/types/cvDocument.types";
import { RepeatableItemCard } from "./RepeatableItemCard";

export interface CertificationsBlockFormProps {
  items: CertificationItem[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<CertificationItem>) => void;
  onRemove: (id: string) => void;
}

export function CertificationsBlockForm({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: CertificationsBlockFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Cursos, Diplomados y Certificaciones</CardTitle>
        <Button variant="primary" size="sm" onClick={onAdd}>
          + Añadir Certificado
        </Button>
      </CardHeader>

      <div className="flex flex-col gap-4">
        {items.map((cert, index) => (
          <RepeatableItemCard
            key={cert.id}
            index={index}
            title={cert.name || "Nueva Certificación"}
            onRemove={() => onRemove(cert.id)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id={`cert-name-${cert.id}`}
                label="Nombre del Curso o Certificación"
                value={cert.name}
                onChange={(e) => onUpdate(cert.id, { name: e.target.value })}
                placeholder="Ej. AWS Cloud Practitioner / Curso SENA"
              />
              <Input
                id={`cert-issuer-${cert.id}`}
                label="Entidad Certificadora"
                value={cert.issuer}
                onChange={(e) => onUpdate(cert.id, { issuer: e.target.value })}
                placeholder="Ej. SENA, Google, Microsoft, Platzi..."
              />
              <Input
                id={`cert-date-${cert.id}`}
                type="month"
                label="Fecha de Expedición"
                value={cert.issueDate}
                onChange={(e) =>
                  onUpdate(cert.id, { issueDate: e.target.value })
                }
              />
              <Input
                id={`cert-hours-${cert.id}`}
                label="Intensidad Horaria (Horas)"
                value={cert.hoursIntensity}
                onChange={(e) =>
                  onUpdate(cert.id, { hoursIntensity: e.target.value })
                }
                placeholder="Ej. 48"
              />
              <Input
                id={`cert-code-${cert.id}`}
                label="Código o Registro (Opcional)"
                value={cert.credentialCode}
                onChange={(e) =>
                  onUpdate(cert.id, { credentialCode: e.target.value })
                }
                placeholder="Ej. SENA-948201"
              />
              <Input
                id={`cert-url-${cert.id}`}
                label="Enlace de Verificación (Opcional)"
                value={cert.credentialUrl}
                onChange={(e) =>
                  onUpdate(cert.id, { credentialUrl: e.target.value })
                }
                placeholder="credly.com/badges/..."
              />
            </div>
          </RepeatableItemCard>
        ))}
      </div>
    </Card>
  );
}
