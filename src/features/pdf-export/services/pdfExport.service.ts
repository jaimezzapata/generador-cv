import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { PdfExportOptions } from "../types/pdfExport.types";

const DEFAULT_ELEMENT_ID = "cv-paper-sheet";
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

function sanitizeFileName(rawName?: unknown): string {
  if (typeof rawName !== "string" || !rawName.trim()) {
    return "Hoja_de_Vida.pdf";
  }
  const clean = rawName
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_\-\s]/g, "")
    .replace(/\s+/g, "_");

  return clean.toLowerCase().endsWith(".pdf") ? clean : `${clean}.pdf`;
}

export const pdfExportService = {
  async downloadElementAsPdf(options: PdfExportOptions = {}): Promise<void> {
    const elementId = options.elementId ?? DEFAULT_ELEMENT_ID;
    const targetElement = document.getElementById(elementId);

    if (!targetElement) {
      throw new Error(
        `No se encontró la hoja de vida (ID "${elementId}") para exportar.`
      );
    }

    const scale = options.qualityScale ?? 2;
    const finalFileName = sanitizeFileName(options.fileName);

    const canvas = await html2canvas(targetElement, {
      scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        const clonedTarget = clonedDoc.getElementById(elementId);
        if (clonedTarget) {
          clonedTarget.style.transform = "none";
          clonedTarget.style.margin = "0";
          clonedTarget.style.boxShadow = "none";
          clonedTarget.style.borderRadius = "0";
          clonedTarget.style.width = "794px";
          clonedTarget.style.maxWidth = "794px";
        }
      },
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgHeightMm = (canvas.height * A4_WIDTH_MM) / canvas.width;
    let heightLeftMm = imgHeightMm;
    let positionMm = 0;

    pdf.addImage(imgData, "JPEG", 0, positionMm, A4_WIDTH_MM, imgHeightMm, undefined, "FAST");
    heightLeftMm -= A4_HEIGHT_MM;

    while (heightLeftMm > 2) {
      positionMm -= A4_HEIGHT_MM;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        positionMm,
        A4_WIDTH_MM,
        imgHeightMm,
        undefined,
        "FAST"
      );
      heightLeftMm -= A4_HEIGHT_MM;
    }

    // Generar Blob y descargar el archivo directamente en el navegador
    const blob = pdf.output("blob");
    const downloadUrl = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = downloadUrl;
    downloadAnchor.download = finalFileName;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(downloadUrl);
  },
};

