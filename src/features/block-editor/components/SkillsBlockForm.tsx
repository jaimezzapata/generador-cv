"use client";

import React from "react";
import { X } from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import {
  SkillCategory,
  SkillItem,
  SkillLevel,
} from "@/features/cv-document/types/cvDocument.types";
import {
  SKILL_CATEGORY_OPTIONS,
  SKILL_LEVEL_OPTIONS,
} from "../utils/blockEditorOptions.utils";

export interface SkillsBlockFormProps {
  skills: SkillItem[];
  skillName: string;
  skillCategory: SkillCategory;
  skillLevel: SkillLevel;
  onChangeName: (value: string) => void;
  onChangeCategory: (value: SkillCategory) => void;
  onChangeLevel: (value: SkillLevel) => void;
  onSubmitSkill: () => void;
  onRemoveSkill: (id: string) => void;
}

export function SkillsBlockForm({
  skills,
  skillName,
  skillCategory,
  skillLevel,
  onChangeName,
  onChangeCategory,
  onChangeLevel,
  onSubmitSkill,
  onRemoveSkill,
}: SkillsBlockFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Competencias Técnicas, Blandas e Idiomas</CardTitle>
        <Badge variant="primary">{skills.length} Registradas</Badge>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <Input
          id="skill-draft-name"
          label="Nombre de la Habilidad o Idioma"
          value={skillName}
          onChange={(e) => onChangeName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmitSkill();
            }
          }}
          placeholder="Ej. TypeScript, Liderazgo, Inglés B2..."
        />
        <Select
          id="skill-draft-cat"
          label="Categoría"
          options={SKILL_CATEGORY_OPTIONS}
          value={skillCategory}
          onChange={(e) => onChangeCategory(e.target.value as SkillCategory)}
        />
        <Select
          id="skill-draft-lvl"
          label="Nivel de Dominio"
          options={SKILL_LEVEL_OPTIONS}
          value={skillLevel}
          onChange={(e) => onChangeLevel(e.target.value as SkillLevel)}
        />
      </div>

      <div>
        <Button
          variant="primary"
          size="sm"
          onClick={onSubmitSkill}
          className="w-[168px] min-w-[168px]"
        >
          + Agregar Habilidad
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "2px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span>{skill.name}</span>
            <Badge variant="muted">{skill.level}</Badge>
            <button
              type="button"
              onClick={() => onRemoveSkill(skill.id)}
              aria-label={`Eliminar ${skill.name}`}
              className="cursor-pointer p-0.5 hover:opacity-70"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

