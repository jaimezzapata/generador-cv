import { CvDocument, CvTemplateId } from "../types/cvDocument.types";
import { getPresetById } from "@/features/cv-templates/utils/templatePresetsBank.utils";
import { normalizeCvDocument } from "../utils/cvNormalizer.utils";
import { getDefaultDesignForTemplate } from "../utils/cvDefaults.utils";

const CV_DOCUMENT_STORAGE_KEY = "generador_cv_document_v3";

type Listener = () => void;

let cachedClientDoc: CvDocument | null = null;
let hasHydrated = false;
const serverSnapshots = new Map<CvTemplateId, CvDocument>();
const listeners = new Set<Listener>();

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

function readInitialFromStorage(fallbackTemplate: CvTemplateId): CvDocument {
  if (typeof window === "undefined") {
    return getPresetById(fallbackTemplate).buildPresetDocument();
  }

  try {
    const raw = window.localStorage.getItem(CV_DOCUMENT_STORAGE_KEY);
    if (!raw) {
      return getPresetById(fallbackTemplate).buildPresetDocument();
    }
    const parsed = JSON.parse(raw) as Partial<CvDocument>;
    return normalizeCvDocument(parsed, fallbackTemplate);
  } catch {
    return getPresetById(fallbackTemplate).buildPresetDocument();
  }
}

export const cvStorageService = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getServerSnapshot(templateId: CvTemplateId = "sena"): CvDocument {
    let snap = serverSnapshots.get(templateId);
    if (!snap) {
      snap = getPresetById(templateId).buildPresetDocument();
      serverSnapshots.set(templateId, snap);
    }
    return snap;
  },

  getClientSnapshot(fallbackTemplate: CvTemplateId = "sena"): CvDocument {
    if (!hasHydrated) {
      return this.getServerSnapshot(fallbackTemplate);
    }
    if (!cachedClientDoc) {
      cachedClientDoc = readInitialFromStorage(fallbackTemplate);
    }
    return cachedClientDoc;
  },

  hydrateClientStorage(fallbackTemplate: CvTemplateId = "sena"): void {
    if (typeof window === "undefined" || hasHydrated) return;
    hasHydrated = true;
    cachedClientDoc = readInitialFromStorage(fallbackTemplate);
    emitChange();
  },

  saveDocument(doc: CvDocument): void {
    hasHydrated = true;
    cachedClientDoc = doc;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(CV_DOCUMENT_STORAGE_KEY, JSON.stringify(doc));
      } catch {
        // Ignore quota errors gracefully
      }
    }
    emitChange();
  },

  updateDocument(updater: (prev: CvDocument) => CvDocument): void {
    const current = this.getClientSnapshot("sena");
    const next: CvDocument = {
      ...updater(current),
      updatedAt: new Date().toISOString(),
    };
    this.saveDocument(next);
  },

  applyRouteParams(
    preferredTemplate?: CvTemplateId,
    forceLoadPresetData = false
  ): void {
    if (!preferredTemplate) return;

    if (forceLoadPresetData) {
      const presetDoc = getPresetById(preferredTemplate).buildPresetDocument();
      this.saveDocument(presetDoc);
      return;
    }

    const current = this.getClientSnapshot(preferredTemplate);
    if (current.templateId !== preferredTemplate) {
      this.saveDocument({
        ...current,
        templateId: preferredTemplate,
        design: getDefaultDesignForTemplate(preferredTemplate),
      });
    }
  },

  loadPresetFresh(templateId: CvTemplateId): CvDocument {
    const fresh = getPresetById(templateId).buildPresetDocument();
    this.saveDocument(fresh);
    return fresh;
  },
};
