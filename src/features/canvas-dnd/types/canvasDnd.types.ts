import { LucideIcon } from "lucide-react";
import { CvBlockType } from "@/features/cv-document/types/cvDocument.types";

export type DragSourceType = "palette" | "canvas";
export type DropZoneType = "main" | "sidebar";

export interface DragBlockPayload {
  blockId: string;
  blockType: CvBlockType;
  source: DragSourceType;
  sourceZone?: DropZoneType;
  sourceIndex?: number;
}

export interface PaletteBlockMeta {
  type: CvBlockType;
  title: string;
  description: string;
  icon: LucideIcon;
  defaultZone: DropZoneType;
}

