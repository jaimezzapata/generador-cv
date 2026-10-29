"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/shared/components/ui/Badge";
import { Card } from "@/shared/components/ui/Card";
import { PRODUCT_BENEFITS_LIST } from "../utils/studioRoadmap.utils";

export function LiveCvSheetPreview() {
  return (
    <section id="funcionalidades" className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Badge variant="primary">¿Qué puedes hacer en CVPro Studio?</Badge>
        <Badge variant="secondary">3 Pilares Visuales</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PRODUCT_BENEFITS_LIST.map((item) => (
          <Card key={item.id} className="flex flex-col justify-between gap-4">
            <div
              className="overflow-hidden"
              style={{
                border: "2px solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={360}
                height={180}
                className="w-full h-auto block"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-extrabold theme-heading">
                  {item.title}
                </h3>
                <Badge variant="secondary">{item.badge}</Badge>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
