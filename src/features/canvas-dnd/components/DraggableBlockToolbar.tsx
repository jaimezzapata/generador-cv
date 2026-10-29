"use client";

import React from "react";
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  Columns,
  GripVertical,
  LayoutGrid,
  Trash2,
} from "lucide-react";
import {
  BlockColSpan,
  CvBlockConfig,
} from "@/features/cv-document/types/cvDocument.types";
import { getColSpanLabel, NEXT_COL_SPAN } from "../utils/canvasDnd.utils";

export interface DraggableBlockToolbarProps {
  block: CvBlockConfig;
  index: number;
  total: number;
  twoColumnLayout: boolean;
  onMoveOrder: (blockId: string, direction: "up" | "down") => void;
  onToggleZone: (blockId: string) => void;
  onRemoveBlock: (blockId: string) => void;
  onUpdateBlockConfig: (blockId: string, patch: Partial<CvBlockConfig>) => void;
}

export function DraggableBlockToolbar({
  block,
  index,
  total,
  twoColumnLayout,
  onMoveOrder,
  onToggleZone,
  onRemoveBlock,
  onUpdateBlockConfig,
}: DraggableBlockToolbarProps) {
  const currentSpan: BlockColSpan = block.colSpan ?? "full";
  const isCard = block.variant === "card";

  return (
    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900/95 text-white rounded-md px-2 py-1 text-[10px] z-20 shadow-lg border border-slate-700">
      <GripVertical className="w-3.5 h-3.5 cursor-grab text-slate-300 shrink-0" />

      {/* Selector de Ancho / ColSpan Modular */}
      <button
        type="button"
        onClick={() =>
          onUpdateBlockConfig(block.id, { colSpan: NEXT_COL_SPAN[currentSpan] })
        }
        title="Cambiar ancho del bloque (100% / 50% / 33% / 66%)"
        className="px-1.5 py-0.5 rounded font-black bg-slate-800 hover:bg-sky-600 transition-colors flex items-center gap-1 cursor-pointer text-sky-200"
      >
        <Columns className="w-3 h-3" />
        <span>{getColSpanLabel(currentSpan)}</span>
      </button>

      {/* Alternar contenedor tipo Tarjeta / Plano */}
      <button
        type="button"
        onClick={() =>
          onUpdateBlockConfig(block.id, {
            variant: isCard ? "default" : "card",
          })
        }
        title={isCard ? "Quitar marco de tarjeta" : "Convertir en tarjeta destacada"}
        className={`px-1.5 py-0.5 rounded font-bold transition-colors cursor-pointer ${
          isCard ? "bg-amber-500/80 text-white" : "hover:text-amber-300"
        }`}
      >
        <LayoutGrid className="w-3 h-3" />
      </button>

      {twoColumnLayout && (
        <button
          type="button"
          onClick={() => onToggleZone(block.id)}
          title="Mover entre columna principal y lateral"
          className="p-1 hover:text-sky-300 cursor-pointer"
        >
          <ArrowLeftRight className="w-3 h-3" />
        </button>
      )}

      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMoveOrder(block.id, "up")}
        title="Subir bloque"
        className="p-1 hover:text-sky-300 disabled:opacity-30 cursor-pointer"
      >
        <ChevronUp className="w-3 h-3" />
      </button>

      <button
        type="button"
        disabled={index === total - 1}
        onClick={() => onMoveOrder(block.id, "down")}
        title="Bajar bloque"
        className="p-1 hover:text-sky-300 disabled:opacity-30 cursor-pointer"
      >
        <ChevronDown className="w-3 h-3" />
      </button>

      <button
        type="button"
        onClick={() => onRemoveBlock(block.id)}
        title="Quitar bloque de la hoja"
        className="p-1 hover:text-red-400 cursor-pointer"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}

