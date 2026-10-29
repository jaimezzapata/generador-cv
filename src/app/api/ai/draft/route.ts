import { NextResponse } from "next/server";
import { AiDraftRequestPayload } from "@/features/ai-assistant/types/aiAssistant.types";
import { aiProviderServerService } from "@/features/ai-assistant/services/aiProviderServer.service";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AiDraftRequestPayload>;

    if (!body || !body.fieldType) {
      return NextResponse.json(
        { error: "Falta el tipo de campo objetivo (fieldType)." },
        { status: 400 }
      );
    }

    const result = await aiProviderServerService.generateDrafts({
      fieldType: body.fieldType,
      tone: body.tone ?? "ats_impacto",
      keywords: body.keywords ?? "",
      roleTitle: body.roleTitle ?? "",
      companyOrEntity: body.companyOrEntity ?? "",
      yearsOfExperience: body.yearsOfExperience ?? "",
      currentText: body.currentText ?? "",
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Error procesando solicitud de redacción IA." },
      { status: 500 }
    );
  }
}

