import { Suspense } from "react";
import { CvDocumentProvider } from "@/features/cv-document/components/CvDocumentProvider";
import { isValidTemplateId } from "@/features/cv-document/utils/cvValidation.utils";
import { BlockEditorWorkspace } from "@/features/block-editor/components/BlockEditorWorkspace";

interface EditorPageProps {
  searchParams: Promise<{ template?: string; preset?: string }>;
}

async function EditorContent({ searchParams }: EditorPageProps) {
  const params = await searchParams;
  const initialTemplate = isValidTemplateId(params.template)
    ? params.template
    : undefined;
  const forcePresetLoad = params.preset === "1";

  return (
    <CvDocumentProvider
      initialTemplate={initialTemplate}
      forcePresetLoad={forcePresetLoad}
    >
      <BlockEditorWorkspace />
    </CvDocumentProvider>
  );
}

export default function EditorPage({ searchParams }: EditorPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold text-xs uppercase tracking-wider text-slate-400">
          Cargando Editor de Hoja de Vida...
        </div>
      }
    >
      <EditorContent searchParams={searchParams} />
    </Suspense>
  );
}
