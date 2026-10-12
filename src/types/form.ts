export type UrgencyLevel = "baja" | "estandar" | "alta" | "critica";

export type ProjectScope = 
  | "consultoria"
  | "desarrollo_software"
  | "auditoria_seguridad"
  | "infraestructura_cloud"
  | "transformacion_digital"
  | "otro";

export type BudgetRange = 
  | "menos_5k"
  | "5k_15k"
  | "15k_50k"
  | "50k_100k"
  | "mas_100k"
  | "no_definido";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  uploadedAt: string;
}

export interface FormData {
  // Paso 1: Información Corporativa / Personal
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  companySize: string;
  country: string;

  // Paso 2: Especificación del Requerimiento
  projectScope: ProjectScope | "";
  urgency: UrgencyLevel;
  budgetRange: BudgetRange | "";
  targetStartDate: string;
  projectSummary: string;
  keyObjectives: string;

  // Paso 3: Documentación y Anexos
  files: UploadedFile[];
  referenceLinks: string;
  securityClearanceRequired: boolean;
  additionalNotes: string;

  // Paso 4: Aceptación y Consentimiento
  acceptedTerms: boolean;
  ndaRequired: boolean;
  subscribeNewsletter: boolean;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface SubmissionReceipt {
  referenceId: string;
  submittedAt: string;
  data: FormData;
}
