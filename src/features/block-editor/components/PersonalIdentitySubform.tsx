"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import {
  DocumentIdType,
  PersonalInfoData,
} from "@/features/cv-document/types/cvDocument.types";
import { DOCUMENT_TYPE_OPTIONS } from "../utils/blockEditorOptions.utils";

export interface PersonalIdentitySubformProps {
  data: PersonalInfoData;
  isSenaFormat: boolean;
  onUpdateField: <K extends keyof PersonalInfoData>(
    field: K,
    value: PersonalInfoData[K]
  ) => void;
}

export function PersonalIdentitySubform({
  data,
  isSenaFormat,
  onUpdateField,
}: PersonalIdentitySubformProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Identidad y Datos Reglamentarios</CardTitle>
        <Badge variant="primary">
          {isSenaFormat ? "Norma SENA" : "Identificación"}
        </Badge>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="pi-fullName"
          label="Nombres y Apellidos Completos"
          value={data.fullName}
          onChange={(e) => onUpdateField("fullName", e.target.value)}
          placeholder="Ej. Valentina Ríos Salazar"
        />
        <Input
          id="pi-title"
          label="Título o Cargo Profesional"
          value={data.professionalTitle}
          onChange={(e) => onUpdateField("professionalTitle", e.target.value)}
          placeholder="Ej. Tecnóloga en Desarrollo de Software"
        />
        <Select
          id="pi-docType"
          label="Tipo de Documento"
          options={DOCUMENT_TYPE_OPTIONS}
          value={data.documentType}
          onChange={(e) =>
            onUpdateField("documentType", e.target.value as DocumentIdType)
          }
        />
        <Input
          id="pi-docNumber"
          label="Número de Identificación"
          value={data.documentNumber}
          onChange={(e) => onUpdateField("documentNumber", e.target.value)}
          placeholder="Ej. 1020458912"
        />
        <Input
          id="pi-expedition"
          label="Lugar de Expedición Doc."
          value={data.documentExpeditionPlace}
          onChange={(e) =>
            onUpdateField("documentExpeditionPlace", e.target.value)
          }
          placeholder="Ej. Medellín, Antioquia"
        />
        <Input
          id="pi-birthDate"
          type="date"
          label="Fecha de Nacimiento (Opcional)"
          value={data.birthDate}
          onChange={(e) => onUpdateField("birthDate", e.target.value)}
        />
        <Input
          id="pi-nationality"
          label="Nacionalidad"
          value={data.nationality}
          onChange={(e) => onUpdateField("nationality", e.target.value)}
          placeholder="Ej. Colombiana"
        />
        <Input
          id="pi-marital"
          label="Estado Civil (Opcional)"
          value={data.maritalStatus}
          onChange={(e) => onUpdateField("maritalStatus", e.target.value)}
          placeholder="Ej. Soltero(a)"
        />
        <Input
          id="pi-profCard"
          label="Tarjeta Profesional / Registro"
          value={data.professionalCard}
          onChange={(e) => onUpdateField("professionalCard", e.target.value)}
          placeholder="Ej. COPNIA 25202-419820"
        />
        <Input
          id="pi-license"
          label="Licencia Conducción / Libreta Militar"
          value={data.drivingLicense}
          onChange={(e) => onUpdateField("drivingLicense", e.target.value)}
          placeholder="Ej. Licencia B1/C1 · Libreta Primera Clase"
        />
      </div>
    </Card>
  );
}

