import React from "react";
import { FormData, FormErrors } from "@/types/form";
import { Checkbox } from "@/components/ui/Checkbox";
import { User, Briefcase, FileText, CheckCircle2, Edit3, ShieldAlert } from "lucide-react";

interface Step4Props {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: any) => void;
  onGoToStep: (stepNumber: number) => void;
}

export const Step4Review: React.FC<Step4Props> = ({
  formData,
  errors,
  onChange,
  onGoToStep,
}) => {
  const scopeLabels: Record<string, string> = {
    consultoria: "Consultoría Estratégica",
    desarrollo_software: "Desarrollo de Software",
    auditoria_seguridad: "Auditoría & Cumplimiento",
    infraestructura_cloud: "Cloud & DevOps",
    transformacion_digital: "Transformación & IA",
    otro: "Requerimiento Especializado",
  };

  const urgencyLabels: Record<string, string> = {
    baja: "Planificación (+60 días)",
    estandar: "Estándar (30-60 días)",
    alta: "Alta Prioridad (<30 días)",
    critica: "Atención Inmediata",
  };

  const budgetLabels: Record<string, string> = {
    menos_5k: "Menos de $5,000 USD",
    "5k_15k": "$5,000 - $15,000 USD",
    "15k_50k": "$15,000 - $50,000 USD",
    "50k_100k": "$50,000 - $100,000 USD",
    mas_100k: "Más de $100,000 USD",
    no_definido: "Presupuesto abierto / A determinar",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Revisión Ejecutiva y Conformidad
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Verifique que los datos consignados sean correctos antes de proceder con el registro definitivo.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        {/* Card 1: Datos del Solicitante */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-200">
              <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>1. Datos del Solicitante y Entidad</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Edit3 className="w-3 h-3" /> Editar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Nombre Completo</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{formData.fullName || "No especificado"}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Correo Institucional</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{formData.email || "No especificado"}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Teléfono</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{formData.phone || "No especificado"}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Cargo</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{formData.jobTitle || "No especificado"}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Organización</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{formData.companyName || "No especificado"}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">País</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{formData.country || "No especificado"}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Requerimientos */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-200">
              <Briefcase className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>2. Alcance Técnico y Requerimientos</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Edit3 className="w-3 h-3" /> Editar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Área de Enfoque</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {formData.projectScope ? scopeLabels[formData.projectScope] : "No seleccionado"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Nivel de Prioridad</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {urgencyLabels[formData.urgency]}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Rango de Presupuesto</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {formData.budgetRange ? budgetLabels[formData.budgetRange] : "No definido"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Fecha Estimada</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {formData.targetStartDate || "A determinar"}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Resumen Ejecutivo</span>
              <p className="text-slate-800 dark:text-slate-200 font-medium whitespace-pre-line mt-0.5">
                {formData.projectSummary || "Sin resumen"}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Adjuntos */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-200">
              <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>3. Documentación y Anexos</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Edit3 className="w-3 h-3" /> Editar
            </button>
          </div>

          <div className="text-xs pt-3 space-y-2">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Archivos Adjuntos</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {formData.files.length > 0
                  ? `${formData.files.length} archivo(s): ${formData.files.map((f) => f.name).join(", ")}`
                  : "Ningún archivo adjuntado"}
              </span>
            </div>
            {formData.referenceLinks && (
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Enlace de Referencia</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 break-all">
                  {formData.referenceLinks}
                </span>
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.ndaRequired && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <ShieldAlert className="w-3 h-3" /> Requiere NDA Previo
                </span>
              )}
              {formData.securityClearanceRequired && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-3 h-3" /> Verificación de Seguridad Crítica
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Acceptance Checkboxes */}
      <div className="pt-2 space-y-3.5 border-t border-slate-200 dark:border-slate-800">
        <Checkbox
          label="Declaración de Veracidad y Consentimiento de Tratamiento de Datos"
          description="Confirmo que los datos suministrados son fidedignos y autorizo su procesamiento conforme a las leyes vigentes de protección de datos."
          checked={formData.acceptedTerms}
          onChange={(checked) => onChange("acceptedTerms", checked)}
          error={errors.acceptedTerms}
        />

        <Checkbox
          label="Recepción de Informes Técnicos e Insights Trimestrales"
          description="Deseo recibir análisis periódicos de tendencias tecnológicas y reportes sectoriales sin fines publicitarios masivos."
          checked={formData.subscribeNewsletter}
          onChange={(checked) => onChange("subscribeNewsletter", checked)}
        />
      </div>
    </div>
  );
};
