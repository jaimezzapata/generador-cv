import { Suspense } from "react";
import { CvDocumentProvider } from "@/features/cv-document/components/CvDocumentProvider";
import { isValidTemplateId } from "@/features/cv-document/utils/cvValidation.utils";
import { CanvasBuilderWorkspace } from "@/features/canvas-dnd/components/CanvasBuilderWorkspace";

interface BuilderPageProps {
  searchParams: Promise<{ template?: string; preset?: string }>;
}

async function BuilderContent({ searchParams }: BuilderPageProps) {
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
      <CanvasBuilderWorkspace />
    </CvDocumentProvider>
  );
}

export default function BuilderPage({ searchParams }: BuilderPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold text-xs uppercase tracking-wider text-slate-400">
          Cargando Lienzo Drag &amp; Drop...
        </div>
      }
    >
      <BuilderContent searchParams={searchParams} />
    </Suspense>
  );
}
