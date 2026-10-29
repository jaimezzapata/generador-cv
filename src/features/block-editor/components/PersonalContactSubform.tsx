"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import {
  PersonalInfoData,
  WorkModalityType,
} from "@/features/cv-document/types/cvDocument.types";
import { WORK_MODALITY_OPTIONS } from "../utils/blockEditorOptions.utils";

export interface PersonalContactSubformProps {
  data: PersonalInfoData;
  onUpdateField: <K extends keyof PersonalInfoData>(
    field: K,
    value: PersonalInfoData[K]
  ) => void;
}

export function PersonalContactSubform({
  data,
  onUpdateField,
}: PersonalContactSubformProps) {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Contacto, Ubicación, Redes y Disponibilidad</CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="pi-email"
          type="email"
          label="Correo Electrónico Principal"
          value={data.email}
          onChange={(e) => onUpdateField("email", e.target.value)}
          placeholder="nombre@correo.com"
        />
        <Input
          id="pi-phone"
          label="Celular / WhatsApp"
          value={data.phone}
          onChange={(e) => onUpdateField("phone", e.target.value)}
          placeholder="+57 300 000 0000"
        />
        <Input
          id="pi-altPhone"
          label="Teléfono Fijo / Alterno (Opcional)"
          value={data.altPhone}
          onChange={(e) => onUpdateField("altPhone", e.target.value)}
          placeholder="604 320 0000"
        />
        <Input
          id="pi-country"
          label="País"
          value={data.country}
          onChange={(e) => onUpdateField("country", e.target.value)}
          placeholder="Colombia"
        />
        <Input
          id="pi-department"
          label="Departamento / Estado"
          value={data.department}
          onChange={(e) => onUpdateField("department", e.target.value)}
          placeholder="Antioquia"
        />
        <Input
          id="pi-city"
          label="Ciudad / Municipio"
          value={data.city}
          onChange={(e) => onUpdateField("city", e.target.value)}
          placeholder="Medellín"
        />
        <Input
          id="pi-address"
          label="Dirección de Residencia"
          value={data.address}
          onChange={(e) => onUpdateField("address", e.target.value)}
          placeholder="Carrera 43A # 14-50"
        />
        <Select
          id="pi-modality"
          label="Modalidad Laboral Preferida"
          options={WORK_MODALITY_OPTIONS}
          value={data.workModality}
          onChange={(e) =>
            onUpdateField("workModality", e.target.value as WorkModalityType)
          }
        />
        <Input
          id="pi-availability"
          label="Disponibilidad (Viajar / Traslado)"
          value={data.availability}
          onChange={(e) => onUpdateField("availability", e.target.value)}
          placeholder="Ej. Inmediata · Disp. traslado"
        />
        <Input
          id="pi-linkedin"
          label="LinkedIn"
          value={data.linkedIn}
          onChange={(e) => onUpdateField("linkedIn", e.target.value)}
          placeholder="linkedin.com/in/usuario"
        />
        <Input
          id="pi-github"
          label="GitHub / Behance"
          value={data.githubUrl}
          onChange={(e) => onUpdateField("githubUrl", e.target.value)}
          placeholder="github.com/usuario"
        />
        <Input
          id="pi-portfolio"
          label="Sitio Web / Portafolio"
          value={data.portfolioUrl}
          onChange={(e) => onUpdateField("portfolioUrl", e.target.value)}
          placeholder="miportafolio.com"
        />
      </div>
    </Card>
  );
}

