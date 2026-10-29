import { CvDocumentProvider } from "@/features/cv-document/components/CvDocumentProvider";
import { isValidTemplateId } from "@/features/cv-document/utils/cvValidation.utils";
import { BlockEditorWorkspace } from "@/features/block-editor/components/BlockEditorWorkspace";

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string; preset?: string }>;
}) {
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
