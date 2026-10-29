"use client";

import React from "react";
import { ThemeControlBar } from "@/features/theme-engine/components/ThemeControlBar";
import { useThemeEngine } from "@/features/theme-engine/hooks/useThemeEngine";

const HEADER_NAV_LINKS = [
  { href: "/builder", label: "Lienzo Drag & Drop" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#formatos-cv", label: "Plantillas SENA" },
  { href: "#como-funciona", label: "Pasos" },
];

export function StudioHeaderBar() {
  const { activeMetadata } = useThemeEngine();

  return (
    <header
      className="sticky top-0 z-50 w-full isolate"
      style={{
        backgroundColor: "var(--bg-header, var(--bg-surface, #ffffff))",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div
        className="w-full"
        style={{
          backgroundColor: "var(--bg-header, var(--bg-surface, #ffffff))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 md:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center justify-between gap-6">
            <a href="#inicio" className="flex items-center gap-2.5 shrink-0">
              <div
                className="w-9 h-9 flex items-center justify-center font-black text-sm shrink-0"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--accent-primary-fg)",
                  border: "2px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                CV
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold whitespace-nowrap leading-none theme-heading">
                  CVPro Studio
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {activeMetadata.editionLabel}
                </span>
              </div>
            </a>

            <nav
              aria-label="Navegación principal"
              className="hidden md:flex items-center gap-2"
            >
              {HEADER_NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-bold whitespace-nowrap rounded-md transition-opacity hover:opacity-75"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center justify-start lg:justify-end shrink-0">
            <ThemeControlBar />
          </div>
        </div>
      </div>
    </header>
  );
}
