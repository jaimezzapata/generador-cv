"use client";

import React from "react";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { HOW_IT_WORKS_STEPS } from "../utils/studioRoadmap.utils";

export function StudioPhaseStatusCard() {
  return (
    <section id="como-funciona" className="flex flex-col gap-6">
      <Card className="p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 w-full">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="p-3.5 flex items-center gap-3"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "2px solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <Badge variant="primary">{step.stepNumber}</Badge>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold theme-heading">
                  {step.title}
                </span>
                <span
                  className="text-[11px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button variant="primary" size="lg" className="w-[220px] min-w-[220px]">
          Empezar Ahora →
        </Button>
      </Card>
    </section>
  );
}
