import {
  AiDraftRequestPayload,
  AiDraftResponsePayload,
  AiProposalItem,
} from "../types/aiAssistant.types";
import { buildAiSystemAndUserPrompt } from "../utils/aiPromptBuilder.utils";
import { composeProfileAndObjectiveDrafts } from "../utils/smartProfileComposer.utils";
import { composeExperienceAndBlockDrafts } from "../utils/smartExperienceComposer.utils";

function generateSmartFallback(payload: AiDraftRequestPayload): AiProposalItem[] {
  if (
    payload.fieldType === "profile_summary" ||
    payload.fieldType === "career_objective"
  ) {
    return composeProfileAndObjectiveDrafts(payload);
  }
  return composeExperienceAndBlockDrafts(payload);
}

async function tryGeminiGeneration(
  payload: AiDraftRequestPayload,
  apiKey: string
): Promise<AiProposalItem[] | null> {
  const { systemInstruction, userPrompt } = buildAiSystemAndUserPrompt(payload);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const parsed = JSON.parse(rawText) as { proposals?: AiProposalItem[] };
  return Array.isArray(parsed.proposals) && parsed.proposals.length > 0
    ? parsed.proposals
    : null;
}

async function tryOpenAiGeneration(
  payload: AiDraftRequestPayload,
  apiKey: string
): Promise<AiProposalItem[] | null> {
  const { systemInstruction, userPrompt } = buildAiSystemAndUserPrompt(payload);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if (!rawText) return null;

  const parsed = JSON.parse(rawText) as { proposals?: AiProposalItem[] };
  return Array.isArray(parsed.proposals) && parsed.proposals.length > 0
    ? parsed.proposals
    : null;
}

export const aiProviderServerService = {
  async generateDrafts(
    payload: AiDraftRequestPayload
  ): Promise<AiDraftResponsePayload> {
    const geminiKey = process.env.GEMINI_API_KEY?.trim();
    if (geminiKey) {
      try {
        const proposals = await tryGeminiGeneration(payload, geminiKey);
        if (proposals) return { source: "gemini", proposals };
      } catch {
        // Fallback to smart engine seamlessly
      }
    }

    const openAiKey = process.env.OPENAI_API_KEY?.trim();
    if (openAiKey) {
      try {
        const proposals = await tryOpenAiGeneration(payload, openAiKey);
        if (proposals) return { source: "openai", proposals };
      } catch {
        // Fallback to smart engine seamlessly
      }
    }

    return {
      source: "smart_engine",
      proposals: generateSmartFallback(payload),
    };
  },
};

