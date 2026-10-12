import React from "react";
import { FormData, FormErrors, ProjectScope, UrgencyLevel, BudgetRange } from "@/types/form";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { RadioCards, RadioOption } from "@/components/ui/RadioCards";
import { Select } from "@/components/ui/Select";
import { Calendar } from "lucide-react";

interface Step2Props {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: any) => void;
}

export const Step2Requirements: React.FC<Step2Props> = ({
  formData,
  errors,
  onChange,
}) => {
  const scopeOptions: RadioOption[] = [
    {
      value: "consultoria",
      title: "Consultoría Estratégica",
      description: "Diagnóstico de procesos, arquitectura técnica y planeación de hoja de ruta.",
    },
    {
      value: "desarrollo_software",
      title: "Desarrollo de Software",
      description: "Ingeniería de aplicaciones web/móvil, arquitecturas de backend e integraciones.",
    },
    {
      value: "auditoria_seguridad",
      title: "Auditoría & Cumplimiento",
      description: "Pentesting, revisión de código, cumplimiento normativo y análisis de riesgos.",
    },
    {
      value: "infraestructura_cloud",
      title: "Cloud & DevOps",
      description: "Migración a la nube, automatización CI/CD, optimización de infraestructura.",
    },
    {
      value: "transformacion_digital",
      title: "Transformación & IA",
      description: "Adopción de tecnologías analíticas, automatización de flujos y modelos de IA.",
    },
    {
      value: "otro",
      title: "Requerimiento Especializado",
      description: "Solicitud personalizada adaptada a necesidades técnicas puntuales.",
    },
  ];

  const urgencyOptions: RadioOption[] = [
    {
      value: "baja",
      title: "Planificación",
      description: "Inicio previsto en +60 días",
      badge: "Normal",
    },
    {
      value: "estandar",
      title: "Estándar",
      description: "Inicio en 30-60 días",
      badge: "Media",
    },
    {
      value: "alta",
      title: "Alta Prioridad",
      description: "Inicio en menos de 30 días",
      badge: "Urgente",
    },
    {
      value: "critica",
      title: "Atención Inmediata",
      description: "Requerimiento crítico en curso",
      badge: "Crítica",
    },
  ];

  const budgetOptions = [
    { value: "menos_5k", label: "Menos de $5,000 USD" },
    { value: "5k_15k", label: "$5,000 - $15,000 USD" },
    { value: "15k_50k", label: "$15,000 - $50,000 USD" },
    { value: "50k_100k", label: "$50,000 - $100,000 USD" },
    { value: "mas_100k", label: "Más de $100,000 USD" },
    { value: "no_definido", label: "Presupuesto abierto / A determinar" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Especificación del Requerimiento
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Defina el alcance técnico, nivel de prioridad y marco presupuestario de la iniciativa.
        </p>
      </div>

      {/* Tipo de Requerimiento */}
      <RadioCards
        label="Área Principal de Enfoque"
        options={scopeOptions}
        value={formData.projectScope}
        error={errors.projectScope}
        onChange={(val) => onChange("projectScope", val as ProjectScope)}
        columns={2}
      />

      {/* Urgencia / Nivel de Prioridad */}
      <RadioCards
        label="Nivel de Prioridad y Plazo"
        options={urgencyOptions}
        value={formData.urgency}
        error={errors.urgency}
        onChange={(val) => onChange("urgency", val as UrgencyLevel)}
        columns={4}
      />

      {/* Presupuesto y Fecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <Select
          label="Rango de Presupuesto Asignado"
          placeholder="Seleccione el rango estimado"
          options={budgetOptions}
          value={formData.budgetRange}
          error={errors.budgetRange}
          onChange={(e) => onChange("budgetRange", e.target.value as BudgetRange)}
        />

        <Input
          label="Fecha Estimada de Inicio"
          type="date"
          value={formData.targetStartDate}
          error={errors.targetStartDate}
          onChange={(e) => onChange("targetStartDate", e.target.value)}
          leftIcon={<Calendar className="w-4 h-4" />}
          optional
        />
      </div>

      {/* Resumen y Objetivos */}
      <div className="space-y-5 pt-2">
        <Textarea
          label="Resumen Ejecutivo del Requerimiento"
          placeholder="Describa de manera concisa el problema de negocio o la necesidad a resolver..."
          value={formData.projectSummary}
          error={errors.projectSummary}
          maxLength={600}
          onChange={(e) => onChange("projectSummary", e.target.value)}
          helperText="Una descripción clara y concisa facilitará la correcta evaluación por parte del equipo."
        />

        <Textarea
          label="Objetivos Clave y Entregables Esperados"
          placeholder="Detalle los principales entregables técnicos, métricas de éxito o hitos esperados..."
          value={formData.keyObjectives}
          error={errors.keyObjectives}
          maxLength={1000}
          onChange={(e) => onChange("keyObjectives", e.target.value)}
          optional
        />
      </div>
    </div>
  );
};
