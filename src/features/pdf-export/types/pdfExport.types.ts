export interface PdfExportOptions {
  elementId?: string;
  fileName?: string;
  qualityScale?: number;
}

export interface PdfExportState {
  isExporting: boolean;
  progressMessage: string;
  error: string | null;
}

