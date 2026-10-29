export type CvTemplateId =
  | "sena"
  | "ats"
  | "executive"
  | "creative"
  | "first_job"
  | "administrative";

export type DocumentIdType = "CC" | "CE" | "TI" | "PEP" | "PPT" | "PAS";

export type WorkModalityType = "presencial" | "hibrido" | "remoto" | "cualquiera";

export type ContractType =
  | "indefinido"
  | "fijo"
  | "obra_labor"
  | "prestacion_servicios"
  | "practica_aprendizaje"
  | "freelance";

export type CvBlockType =
  | "profile"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "languages"
  | "certifications"
  | "references"
  | "custom";

export type CvFontFamily = "sans" | "serif" | "mono";
export type CvPhotoShape = "circle" | "rounded" | "square";
export type CvHeaderStyle = "split" | "banner" | "centered" | "boxed_sena";
export type CvSectionTitleStyle = "underline" | "filled_box" | "left_bar" | "pill";
export type CvDensity = "compact" | "standard" | "spacious";

export interface CvDesignSettings {
  accentColor: string;
  sidebarBgColor: string;
  fontFamily: CvFontFamily;
  headerStyle: CvHeaderStyle;
  sectionTitleStyle: CvSectionTitleStyle;
  density: CvDensity;
  twoColumnLayout: boolean;
  showPhoto: boolean;
  photoShape: CvPhotoShape;
  showSkillBars: boolean;
  referencesOnRequest: boolean;
}

export interface PersonalInfoData {
  photoDataUrl: string;
  fullName: string;
  professionalTitle: string;
  documentType: DocumentIdType;
  documentNumber: string;
  documentExpeditionPlace: string;
  birthDate: string;
  nationality: string;
  maritalStatus: string;
  militaryCard: string;
  drivingLicense: string;
  professionalCard: string;
  email: string;
  phone: string;
  altPhone: string;
  country: string;
  department: string;
  city: string;
  address: string;
  linkedIn: string;
  githubUrl: string;
  portfolioUrl: string;
  availability: string;
  workModality: WorkModalityType;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  contractType: ContractType;
  workModality: WorkModalityType;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  immediateBoss: string;
  verificationPhone: string;
  verificationEmail: string;
  description: string;
  achievements: string;
}

export type EducationLevelType =
  | "titulada_sena"
  | "complementaria_sena"
  | "bachiller"
  | "tecnica_tecnologica"
  | "universitaria"
  | "especializacion"
  | "maestria_doctorado";

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  level: EducationLevelType;
  city: string;
  startDate: string;
  endDate: string;
  inProgress: boolean;
  hoursIntensity: string;
  honorsOrSummary: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  period: string;
  techStack: string;
  projectUrl: string;
  description: string;
}

export type LanguageCefrLevel =
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "C1"
  | "C2"
  | "Nativo";

export interface LanguageItem {
  id: string;
  name: string;
  level: LanguageCefrLevel;
  certification: string;
}

export type SkillCategory = "tecnica" | "herramienta" | "blanda";
export type SkillLevel = "basico" | "intermedio" | "avanzado" | "experto";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  hoursIntensity: string;
  credentialCode: string;
  credentialUrl: string;
}

export interface ReferenceItem {
  id: string;
  fullName: string;
  roleOrRelationship: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  referenceType: "laboral" | "personal" | "academica";
}

export interface CustomSectionBlock {
  id: string;
  sectionTitle: string;
  subtitle: string;
  locationOrEntity: string;
  period: string;
  content: string;
}

export interface CvBlockConfig {
  id: string;
  type: CvBlockType;
  title: string;
  visible: boolean;
  zone: "main" | "sidebar";
}

export interface CvDocument {
  id: string;
  updatedAt: string;
  templateId: CvTemplateId;
  design: CvDesignSettings;
  personalInfo: PersonalInfoData;
  profileSummary: string;
  careerObjective: string;
  yearsOfExperience: string;
  salaryExpectation: string;
  blocks: CvBlockConfig[];
  experiences: ExperienceItem[];
  educations: EducationItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  references: ReferenceItem[];
  customBlocks: CustomSectionBlock[];
}
