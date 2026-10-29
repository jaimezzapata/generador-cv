"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import {
  LanguageCefrLevel,
  LanguageItem,
} from "@/features/cv-document/types/cvDocument.types";
import { LANGUAGE_CEFR_OPTIONS } from "../utils/blockEditorOptions.utils";

export interface LanguagesBlockFormProps {
  languages: LanguageItem[];
  langName: string;
  langLevel: LanguageCefrLevel;
  langCert: string;
  onChangeName: (val: string) => void;
  onChangeLevel: (val: LanguageCefrLevel) => void;
  onChangeCert: (val: string) => void;
  onSubmitLanguage: () => void;
  onRemoveLanguage: (id: string) => void;
}

export function LanguagesBlockForm({
  languages,
  langName,
  langLevel,
  langCert,
  onChangeName,
  onChangeLevel,
  onChangeCert,
  onSubmitLanguage,
  onRemoveLanguage,
}: LanguagesBlockFormProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Idiomas y Certificación Internacional (MCER)</CardTitle>
        <Badge variant="primary">{languages.length} Idiomas</Badge>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <Input
          id="lang-name"
          label="Idioma"
          value={langName}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Ej. Inglés, Portugués, Francés..."
        />
        <Select
          id="lang-level"
          label="Nivel Marco Europeo"
          options={LANGUAGE_CEFR_OPTIONS}
          value={langLevel}
          onChange={(e) => onChangeLevel(e.target.value as LanguageCefrLevel)}
        />
        <Input
          id="lang-cert"
          label="Certificación / Examen (Opcional)"
          value={langCert}
          onChange={(e) => onChangeCert(e.target.value)}
          placeholder="Ej. TOEFL 95, IELTS 7.0, SENA"
        />
      </div>

      <div>
        <Button variant="primary" size="sm" onClick={onSubmitLanguage}>
          + Agregar Idioma
        </Button>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        {languages.map((lng) => (
          <div
            key={lng.id}
            className="p-2.5 flex items-center justify-between gap-2 text-xs"
            style={{
              backgroundColor: "var(--bg-surface-elevated)",
              border: "2px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm">{lng.name}</span>
              <Badge variant="secondary">{lng.level}</Badge>
              {lng.certification && (
                <span style={{ color: "var(--text-muted)" }}>
                  · {lng.certification}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemoveLanguage(lng.id)}
              className="font-black px-2 py-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

