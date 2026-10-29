import {
  AiDraftRequestPayload,
  AiDraftResponsePayload,
} from "../types/aiAssistant.types";

export const aiDraftClientService = {
  async requestDrafts(
    payload: AiDraftRequestPayload
  ): Promise<AiDraftResponsePayload> {
    const response = await fetch("/api/ai/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("No se pudo generar la redacción en este momento.");
    }

    return (await response.json()) as AiDraftResponsePayload;
  },
};

