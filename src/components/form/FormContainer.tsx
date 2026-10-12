"use client";

import React, { useState, useEffect } from "react";
import { FormData, FormErrors, SubmissionReceipt } from "@/types/form";
import { StepIndicator, Step } from "@/components/ui/StepIndicator";
import { Button } from "@/components/ui/Button";
import { Step1GeneralInfo } from "./Step1GeneralInfo";
import { Step2Requirements } from "./Step2Requirements";
import { Step3Attachments } from "./Step3Attachments";
import { Step4Review } from "./Step4Review";
import { SubmissionSuccess } from "./SubmissionSuccess";
import { ArrowLeft, ArrowRight, Check, Save, RotateCcw } from "lucide-react";

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  phone: "",
  jobTitle: "",
  companyName: "",
  companySize: "",
  country: "",
  projectScope: "",
  urgency: "estandar",
  budgetRange: "",
  targetStartDate: "",
  projectSummary: "",
  keyObjectives: "",
  files: [],
  referenceLinks: "",
  securityClearanceRequired: false,
  additionalNotes: "",
  acceptedTerms: false,
  ndaRequired: false,
  subscribeNewsletter: false,
};

const STEPS: Step[] = [
  { id: 1, title: "Identificación", subtitle: "Datos personales y entidad" },
  { id: 2, title: "Requerimientos", subtitle: "Alcance y presupuesto" },
  { id: 3, title: "Documentación", subtitle: "Adjuntos y seguridad" },
  { id: 4, title: "Revisión", subtitle: "Conformidad y envío" },
];

const LOCAL_STORAGE_KEY = "corp_form_draft_v1";

export const FormContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<SubmissionReceipt | null>(null);
  const [draftSavedTimestamp, setDraftSavedTimestamp] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Cargar borrador persistido
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setFormData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      console.error("Error al leer borrador local:", e);
    }
    setIsLoaded(true);
  }, []);

  // Guardar borrador automáticamente al cambiar datos
  useEffect(() => {
    if (!isLoaded || submissionReceipt) return;

    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
        const now = new Date();
        setDraftSavedTimestamp(
          `${now.getHours().toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}`
        );
      } catch (e) {
        console.error("Error al guardar borrador:", e);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [formData, isLoaded, submissionReceipt]);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "El nombre y apellidos son requeridos.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "El correo institucional es requerido.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Ingrese un formato de correo electrónico válido.";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "El teléfono de contacto es requerido.";
      } else if (formData.phone.trim().length < 7) {
        newErrors.phone = "El número telefónico debe contener al menos 7 dígitos.";
      }
      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = "El cargo o rol profesional es requerido.";
      }
      if (!formData.companyName.trim()) {
        newErrors.companyName = "El nombre de la empresa u organización es requerido.";
      }
      if (!formData.companySize) {
        newErrors.companySize = "Seleccione el tamaño de la organización.";
      }
      if (!formData.country) {
        newErrors.country = "Seleccione el país principal de operación.";
      }
    }

    if (stepNumber === 2) {
      if (!formData.projectScope) {
        newErrors.projectScope = "Seleccione el área principal de enfoque del requerimiento.";
      }
      if (!formData.budgetRange) {
        newErrors.budgetRange = "Seleccione un rango presupuestario estimado.";
      }
      if (!formData.projectSummary.trim()) {
        newErrors.projectSummary = "El resumen ejecutivo del requerimiento es obligatorio.";
      } else if (formData.projectSummary.trim().length < 20) {
        newErrors.projectSummary = "La descripción debe contener al menos 20 caracteres.";
      }
    }

    if (stepNumber === 3) {
      if (formData.referenceLinks && !/^https?:\/\//i.test(formData.referenceLinks.trim())) {
        newErrors.referenceLinks = "El enlace debe comenzar con http:// o https://";
      }
    }

    if (stepNumber === 4) {
      if (!formData.acceptedTerms) {
        newErrors.acceptedTerms = "Debe aceptar la declaración de veracidad y protección de datos.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleGoToStep = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStep(stepNumber);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateStep(4)) return;

    setIsSubmitting(true);

    // Simulación de envío seguro al servidor
    setTimeout(() => {
      const generatedRef = `RAD-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;

      const receipt: SubmissionReceipt = {
        referenceId: generatedRef,
        submittedAt: new Date().toISOString(),
        data: formData,
      };

      setSubmissionReceipt(receipt);
      setIsSubmitting(false);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmissionReceipt(null);
    setCurrentStep(1);
    setErrors({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setDraftSavedTimestamp(null);
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-xs text-slate-400">Cargando formulario...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Contenedor Principal con Estilo Sobrio de Tarjeta */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs transition-colors overflow-hidden">
        {/* Cabecera del formulario con indicador de pasos */}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Formulario Oficial
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Solicitud de Requerimientos y Servicios
              </h1>
            </div>

            {/* Estado del borrador */}
            {!submissionReceipt && draftSavedTimestamp && (
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
                <Save className="w-3.5 h-3.5 text-slate-400" />
                <span>Borrador guardado ({draftSavedTimestamp})</span>
              </div>
            )}
          </div>

          {!submissionReceipt && (
            <StepIndicator
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={handleGoToStep}
            />
          )}
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-6 sm:p-8">
          {submissionReceipt ? (
            <SubmissionSuccess
              receipt={submissionReceipt}
              onReset={handleReset}
            />
          ) : (
            <div>
              {currentStep === 1 && (
                <Step1GeneralInfo
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {currentStep === 2 && (
                <Step2Requirements
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {currentStep === 3 && (
                <Step3Attachments
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              {currentStep === 4 && (
                <Step4Review
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                  onGoToStep={handleGoToStep}
                />
              )}

              {/* Botones de Navegación Inferiores */}
              <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Anterior
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleReset}
                      leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                    >
                      Limpiar
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {currentStep < STEPS.length ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleNext}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Continuar a {STEPS[currentStep].title}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="primary"
                      isLoading={isSubmitting}
                      onClick={handleSubmit}
                      rightIcon={<Check className="w-4 h-4" />}
                    >
                      Confirmar y Radicar Solicitud
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nota legal al pie del contenedor */}
      <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-4">
        Formulario protegido bajo estándares de seguridad corporativa e integridad de datos.
      </div>
    </div>
  );
};
