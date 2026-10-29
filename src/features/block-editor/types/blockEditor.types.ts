import { LucideIcon } from "lucide-react";
import { CvBlockType } from "@/features/cv-document/types/cvDocument.types";

export type EditorSectionTab = "design" | "personal" | CvBlockType;

export type CanvasZoomLevel = 75 | 90 | 100;

export interface EditorNavItem {
  id: EditorSectionTab;
  icon: LucideIcon;
  label: string;
  shortHint: string;
  blockType?: CvBlockType;
}
