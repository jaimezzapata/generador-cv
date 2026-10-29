"use client";

import React from "react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { isDarkHexColor } from "@/features/cv-design/utils/cvDesignPalettes.utils";
import {
  getColSpanClass,
  getVariantClass,
} from "@/features/canvas-dnd/utils/canvasDnd.utils";
import { PaperHeaderRenderer } from "./PaperHeaderRenderer";
import { PaperBlockItemRenderer } from "./PaperBlockItemRenderer";

export interface CvTemplatePreviewDispatcherProps {
  document: CvDocument;
  zoomScale?: number;
}

export function CvTemplatePreviewDispatcher({
  document,
  zoomScale = 1,
}: CvTemplatePreviewDispatcherProps) {
  const { design, blocks } = document;

  const fontClass =
    design.fontFamily === "serif"
      ? "font-serif"
      : design.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  const gapClass =
    design.density === "compact"
      ? "gap-3.5"
      : design.density === "spacious"
      ? "gap-6"
      : "gap-4.5";

  const isSidebarDark = isDarkHexColor(design.sidebarBgColor);
  const sidebarBlocks = blocks.filter((b) => b.zone === "sidebar");
  const mainBlocks = blocks.filter((b) => b.zone === "main");

  return (
    <div className="w-full overflow-x-auto flex justify-center py-2">
      <div
        id="cv-paper-sheet"
        className={`w-full max-w-[794px] min-h-[980px] bg-white text-slate-900 shadow-2xl border border-slate-300 flex flex-col transition-transform origin-top ${fontClass}`}
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: "none",
          color: "#0f172a",
          transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
          marginBottom:
            zoomScale < 1 ? `${Math.round((zoomScale - 1) * 980)}px` : undefined,
        }}
      >
        <PaperHeaderRenderer document={document} />

        {design.twoColumnLayout ? (
          <div className="flex-1 grid grid-cols-12" style={{ backgroundColor: "#ffffff" }}>
            <aside
              className={`col-span-4 p-6 grid grid-cols-12 ${gapClass} ${
                isSidebarDark ? "text-slate-100" : "text-slate-900 border-r border-slate-200"
              }`}
              style={{ backgroundColor: design.sidebarBgColor }}
            >
              {sidebarBlocks.map((blk) => (
                <div
                  key={blk.id}
                  className={`${getColSpanClass(blk.colSpan)} ${getVariantClass(blk.variant)}`}
                >
                  <PaperBlockItemRenderer
                    block={blk}
                    document={document}
                    onDarkBg={isSidebarDark}
                  />
                </div>
              ))}
            </aside>

            <div
              className={`col-span-8 p-7 grid grid-cols-12 ${gapClass}`}
              style={{ backgroundColor: "#ffffff" }}
            >
              {mainBlocks.map((blk) => (
                <div
                  key={blk.id}
                  className={`${getColSpanClass(blk.colSpan)} ${getVariantClass(blk.variant)}`}
                >
                  <PaperBlockItemRenderer
                    block={blk}
                    document={document}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`flex-1 px-8 py-6 grid grid-cols-12 ${gapClass}`}
            style={{ backgroundColor: "#ffffff" }}
          >
            {blocks.map((blk) => (
              <div
                key={blk.id}
                className={`${getColSpanClass(blk.colSpan)} ${getVariantClass(blk.variant)}`}
              >
                <PaperBlockItemRenderer
                  block={blk}
                  document={document}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
