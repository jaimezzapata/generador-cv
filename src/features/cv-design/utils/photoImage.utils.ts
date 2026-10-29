export function resizeImageFileToDataUrl(
  file: File,
  maxDimension = 360
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Selecciona un archivo de imagen válido (JPG, PNG, WebP)."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Formato de imagen no soportado."));
      img.onload = () => {
        const scale = Math.min(
          1,
          maxDimension / Math.max(img.width, img.height)
        );
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.88));
      };
      img.src = String(reader.result);
    };

    reader.readAsDataURL(file);
  });
}

