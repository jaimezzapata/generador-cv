"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { AiFieldAssistantWidget } from "@/features/ai-assistant/components/AiFieldAssistantWidget";
import { ProjectItem } from "@/features/cv-document/types/cvDocument.types";
import { RepeatableItemCard } from "./RepeatableItemCard";

export interface ProjectsBlockFormProps {
  items: ProjectItem[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<ProjectItem>) => void;
  onRemove: (id: string) => void;
}

export function ProjectsBlockForm({
  items,
  onAdd,
  onUpdate,
  onRemove,
}: ProjectsBlockFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Proyectos Destacados y Portafolio</CardTitle>
        <Button variant="primary" size="sm" onClick={onAdd}>
          + Añadir Proyecto
        </Button>
      </CardHeader>

      <div className="flex flex-col gap-4">
        {items.map((proj, index) => (
          <RepeatableItemCard
            key={proj.id}
            index={index}
            title={proj.name || "Nuevo Proyecto"}
            onRemove={() => onRemove(proj.id)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id={`prj-name-${proj.id}`}
                label="Nombre del Proyecto"
                value={proj.name}
                onChange={(e) => onUpdate(proj.id, { name: e.target.value })}
                placeholder="Ej. App de Gestión Logística"
              />
              <Input
                id={`prj-role-${proj.id}`}
                label="Rol o Responsabilidad"
                value={proj.role}
                onChange={(e) => onUpdate(proj.id, { role: e.target.value })}
                placeholder="Ej. Arquitecta Frontend / Líder"
              />
              <Input
                id={`prj-period-${proj.id}`}
                label="Año o Periodo"
                value={proj.period}
                onChange={(e) => onUpdate(proj.id, { period: e.target.value })}
                placeholder="Ej. 2025 - 2026"
              />
              <Input
                id={`prj-url-${proj.id}`}
                label="Enlace Demo / GitHub (Opcional)"
                value={proj.projectUrl}
                onChange={(e) =>
                  onUpdate(proj.id, { projectUrl: e.target.value })
                }
                placeholder="github.com/usuario/proyecto"
              />
            </div>

            <Input
              id={`prj-stack-${proj.id}`}
              label="Tecnologías, Herramientas o Metodologías Usadas"
              value={proj.techStack}
              onChange={(e) => onUpdate(proj.id, { techStack: e.target.value })}
              placeholder="Ej. Next.js, PostgreSQL, Power BI, Scrum..."
            />

            <div className="flex flex-col gap-1.5">
              <AiFieldAssistantWidget
                fieldType="project_description"
                buttonLabel="Redactar Proyecto con IA"
                defaultKeywords={proj.techStack}
                roleTitle={proj.role}
                companyOrEntity={proj.name}
                currentText={proj.description}
                onApplyText={(description) =>
                  onUpdate(proj.id, { description })
                }
              />
              <Textarea
                id={`prj-desc-${proj.id}`}
                label="Descripción e Impacto del Proyecto"
                rows={3}
                value={proj.description}
                onChange={(e) =>
                  onUpdate(proj.id, { description: e.target.value })
                }
                placeholder="Resume el problema resuelto y los resultados obtenidos..."
              />
            </div>
          </RepeatableItemCard>
        ))}
      </div>
    </Card>
  );
}
