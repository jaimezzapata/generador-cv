"use client";

import React from "react";
import { CvDocument } from "@/features/cv-document/types/cvDocument.types";
import { isDarkHexColor } from "@/features/cv-design/utils/cvDesignPalettes.utils";
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
        className={`w-full max-w-[794px] min-h-[980px] bg-white text-slate-900 shadow-xl border border-slate-300 flex flex-col transition-transform origin-top ${fontClass}`}
        style={{
          transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
          marginBottom:
            zoomScale < 1 ? `${Math.round((zoomScale - 1) * 980)}px` : undefined,
        }}
      >
        <PaperHeaderRenderer document={document} />

        {design.twoColumnLayout ? (
          <div className="flex-1 grid grid-cols-12">
            <aside
              className={`col-span-4 p-6 flex flex-col ${gapClass} ${
                isSidebarDark ? "text-slate-100" : "text-slate-900 border-r border-slate-200"
              }`}
              style={{ backgroundColor: design.sidebarBgColor }}
            >
              {sidebarBlocks.map((blk) => (
                <PaperBlockItemRenderer
                  key={blk.id}
                  block={blk}
                  document={document}
                  onDarkBg={isSidebarDark}
                />
              ))}
            </aside>

            <div className={`col-span-8 p-7 flex flex-col ${gapClass}`}>
              {mainBlocks.map((blk) => (
                <PaperBlockItemRenderer
                  key={blk.id}
                  block={blk}
                  document={document}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={`flex-1 px-8 py-6 flex flex-col ${gapClass}`}>
            {blocks.map((blk) => (
              <PaperBlockItemRenderer
                key={blk.id}
                block={blk}
                document={document}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
