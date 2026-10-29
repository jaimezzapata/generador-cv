"use client";

import React from "react";
import { useCvDocument } from "@/features/cv-document/hooks/useCvDocument";
import { CvDesignStudioPanel } from "@/features/cv-design/components/CvDesignStudioPanel";
import { EditorSectionTab } from "../types/blockEditor.types";
import { useBlockEditorNavigation } from "../hooks/useBlockEditorNavigation";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ProfileSummaryForm } from "./ProfileSummaryForm";
import { EducationBlockForm } from "./EducationBlockForm";
import { ExperienceBlockForm } from "./ExperienceBlockForm";
import { ProjectsBlockForm } from "./ProjectsBlockForm";
import { SkillsBlockForm } from "./SkillsBlockForm";
import { LanguagesBlockForm } from "./LanguagesBlockForm";
import { CertificationsBlockForm } from "./CertificationsBlockForm";
import { ReferencesBlockForm } from "./ReferencesBlockForm";
import { CustomBlocksForm } from "./CustomBlocksForm";

export interface ActiveBlockFormDispatcherProps {
  activeTab: EditorSectionTab;
  cv: ReturnType<typeof useCvDocument>;
  nav: ReturnType<typeof useBlockEditorNavigation>;
}

export function ActiveBlockFormDispatcher({
  activeTab,
  cv,
  nav,
}: ActiveBlockFormDispatcherProps) {
  const { document, completion } = cv;

  switch (activeTab) {
    case "design":
      return (
        <CvDesignStudioPanel
          photoDataUrl={document.personalInfo.photoDataUrl}
          design={document.design}
          blocks={document.blocks}
          onSetPhotoUrl={(url) => cv.updatePersonalInfo("photoDataUrl", url)}
          onUpdateDesign={cv.updateDesign}
          onMoveBlock={cv.moveBlockOrder}
          onToggleZone={cv.toggleBlockZone}
          onToggleVisibility={cv.toggleBlockVisibility}
        />
      );
    case "personal":
      return (
        <PersonalInfoForm
          data={document.personalInfo}
          design={document.design}
          isSenaFormat={document.templateId === "sena"}
          onUpdateField={cv.updatePersonalInfo}
          onUpdateDesign={cv.updateDesign}
        />
      );
    case "profile":
      return (
        <ProfileSummaryForm
          professionalTitle={document.personalInfo.professionalTitle}
          skillKeywords={document.skills.map((s) => s.name).join(", ")}
          isSenaFormat={document.templateId === "sena"}
          summary={document.profileSummary}
          careerObjective={document.careerObjective}
          yearsOfExperience={document.yearsOfExperience}
          salaryExpectation={document.salaryExpectation}
          missingHints={completion.missingHints}
          onUpdateMeta={cv.updateSummaryMeta}
        />
      );
    case "education":
      return (
        <EducationBlockForm
          items={document.educations}
          onAdd={cv.addEducation}
          onUpdate={cv.updateEducation}
          onRemove={cv.removeEducation}
        />
      );
    case "experience":
      return (
        <ExperienceBlockForm
          items={document.experiences}
          onAdd={cv.addExperience}
          onUpdate={cv.updateExperience}
          onRemove={cv.removeExperience}
        />
      );
    case "projects":
      return (
        <ProjectsBlockForm
          items={document.projects}
          onAdd={cv.addProject}
          onUpdate={cv.updateProject}
          onRemove={cv.removeProject}
        />
      );
    case "skills":
      return (
        <SkillsBlockForm
          skills={document.skills}
          skillName={nav.skillName}
          skillCategory={nav.skillCategory}
          skillLevel={nav.skillLevel}
          onChangeName={nav.setSkillName}
          onChangeCategory={nav.setSkillCategory}
          onChangeLevel={nav.setSkillLevel}
          onSubmitSkill={nav.submitNewSkill}
          onRemoveSkill={cv.removeSkill}
        />
      );
    case "languages":
      return (
        <LanguagesBlockForm
          languages={document.languages}
          langName={nav.langName}
          langLevel={nav.langLevel}
          langCert={nav.langCert}
          onChangeName={nav.setLangName}
          onChangeLevel={nav.setLangLevel}
          onChangeCert={nav.setLangCert}
          onSubmitLanguage={nav.submitNewLanguage}
          onRemoveLanguage={cv.removeLanguage}
        />
      );
    case "certifications":
      return (
        <CertificationsBlockForm
          items={document.certifications}
          onAdd={cv.addCertification}
          onUpdate={cv.updateCertification}
          onRemove={cv.removeCertification}
        />
      );
    case "references":
      return (
        <ReferencesBlockForm
          items={document.references}
          referencesOnRequest={document.design.referencesOnRequest}
          onToggleReferencesOnRequest={(referencesOnRequest) =>
            cv.updateDesign({ referencesOnRequest })
          }
          onAdd={cv.addReference}
          onUpdate={cv.updateReference}
          onRemove={cv.removeReference}
        />
      );
    case "custom":
      return (
        <CustomBlocksForm
          items={document.customBlocks}
          onAdd={cv.addCustomBlock}
          onUpdate={cv.updateCustomBlock}
          onRemove={cv.removeCustomBlock}
        />
      );
  }
}
