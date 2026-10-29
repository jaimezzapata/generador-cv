"use client";

import { ChangeEvent, useCallback, useId, useState } from "react";
import { resizeImageFileToDataUrl } from "../utils/photoImage.utils";

export function usePhotoUploader(
  onSetPhotoUrl: (url: string) => void,
  onEnablePhoto: (enabled: boolean) => void
) {
  const inputId = useId();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        setErrorMsg(null);
        const optimizedDataUrl = await resizeImageFileToDataUrl(file);
        onSetPhotoUrl(optimizedDataUrl);
        onEnablePhoto(true);
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : "Error al cargar la fotografía."
        );
      } finally {
        event.target.value = "";
      }
    },
    [onEnablePhoto, onSetPhotoUrl]
  );

  const applySampleAvatar = useCallback(
    (avatarUrl: string) => {
      setErrorMsg(null);
      onSetPhotoUrl(avatarUrl);
      onEnablePhoto(true);
    },
    [onEnablePhoto, onSetPhotoUrl]
  );

  const removePhoto = useCallback(() => {
    setErrorMsg(null);
    onSetPhotoUrl("");
    onEnablePhoto(false);
  }, [onEnablePhoto, onSetPhotoUrl]);

  return {
    inputId,
    errorMsg,
    handleFileChange,
    applySampleAvatar,
    removePhoto,
  };
}
