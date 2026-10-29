"use client";

import { DragEvent, useCallback, useState } from "react";
import { CvBlockConfig } from "@/features/cv-document/types/cvDocument.types";
import { DragBlockPayload, DropZoneType } from "../types/canvasDnd.types";

export interface UseCanvasDndParams {
  blocks: CvBlockConfig[];
  onPlaceBlock: (
    blockId: string,
    zone: "main" | "sidebar",
    targetIndex?: number
  ) => void;
  onReorderBlocks: (newBlocks: CvBlockConfig[]) => void;
}

export function useCanvasDnd({
  blocks,
  onPlaceBlock,
  onReorderBlocks,
}: UseCanvasDndParams) {
  const [draggedItem, setDraggedItem] = useState<DragBlockPayload | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<DropZoneType | null>(
    null
  );
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(
    null
  );

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLElement>, payload: DragBlockPayload) => {
      setDraggedItem(payload);
      e.dataTransfer.setData("application/json", JSON.stringify(payload));
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleDragOverZone = useCallback(
    (e: DragEvent<HTMLElement>, zone: DropZoneType, index?: number) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";
      setActiveDropZone(zone);
      if (typeof index === "number") {
        setDropIndicatorIndex(index);
      }
    },
    []
  );

  const handleDragLeaveZone = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDropOnZone = useCallback(
    (e: DragEvent<HTMLElement>, targetZone: DropZoneType, targetIndex?: number) => {
      e.preventDefault();
      e.stopPropagation();

      let payload = draggedItem;
      if (!payload) {
        try {
          const raw = e.dataTransfer.getData("application/json");
          if (raw) payload = JSON.parse(raw) as DragBlockPayload;
        } catch {
          // ignore parsing error
        }
      }

      if (!payload) {
        setActiveDropZone(null);
        setDropIndicatorIndex(null);
        return;
      }

      if (payload.source === "palette") {
        onPlaceBlock(payload.blockId, targetZone, targetIndex);
      } else if (payload.source === "canvas") {
        const zoneBlocks = blocks.filter((b) => b.zone === targetZone && b.visible);
        const otherBlocks = blocks.filter(
          (b) => !(b.zone === targetZone && b.visible) && b.id !== payload.blockId
        );
        const movingBlock = blocks.find((b) => b.id === payload.blockId);

        if (movingBlock) {
          const updatedMoving = { ...movingBlock, visible: true, zone: targetZone };
          const filteredZoneBlocks = zoneBlocks.filter(
            (b) => b.id !== payload.blockId
          );

          if (typeof targetIndex === "number" && targetIndex >= 0) {
            filteredZoneBlocks.splice(targetIndex, 0, updatedMoving);
          } else {
            filteredZoneBlocks.push(updatedMoving);
          }

          onReorderBlocks([...otherBlocks, ...filteredZoneBlocks]);
        }
      }

      setDraggedItem(null);
      setActiveDropZone(null);
      setDropIndicatorIndex(null);
    },
    [blocks, draggedItem, onPlaceBlock, onReorderBlocks]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setActiveDropZone(null);
    setDropIndicatorIndex(null);
  }, []);

  return {
    draggedItem,
    activeDropZone,
    dropIndicatorIndex,
    handleDragStart,
    handleDragOverZone,
    handleDragLeaveZone,
    handleDropOnZone,
    handleDragEnd,
  };
}

