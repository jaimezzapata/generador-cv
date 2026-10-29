"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";

export function PrimitivesLivePlayground() {
  return (
    <section
      id="inicio"
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
    >
      <div className="lg:col-span-6 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Norma SENA · ATS · Ejecutivo</Badge>
          <Badge variant="secondary">Exportación PDF</Badge>
        </div>

        <Card className="p-6 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight theme-heading">
            Tu Hoja de Vida ideal, diseñada por bloques en minutos
          </h1>

          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Arrastra secciones con <strong>Drag &amp; Drop</strong>, aplica
            formatos oficiales como el del <strong>SENA</strong>, mejora tus
            textos con <strong>IA</strong> y descarga tu PDF al instante.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              size="lg"
              className="w-[210px] min-w-[210px]"
            >
              Crear mi CV Gratis →
            </Button>
            <a href="#formatos-cv">
              <Button
                variant="surface"
                size="lg"
                className="w-[210px] min-w-[210px]"
              >
                Ver Plantillas
              </Button>
            </a>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-6">
        <Card className="p-3 sm:p-4">
          <div
            className="overflow-hidden"
            style={{
              border: "2px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Image
              src="/images/hero-cv-studio.svg"
              alt="Ilustración del generador de hojas de vida con bloques Drag & Drop, formato SENA, asistente IA y descarga PDF"
              width={560}
              height={400}
              priority
              className="w-full h-auto block"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
