import React from "react";
import { FormData, FormErrors, UploadedFile } from "@/types/form";
import { FileUpload } from "@/components/ui/FileUpload";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Link2 } from "lucide-react";

interface Step3Props {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: any) => void;
}

export const Step3Attachments: React.FC<Step3Props> = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Documentación Adjunta y Referencias
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Incorpore documentos técnicos, diagramas de arquitectura o enlaces complementarios.
        </p>
      </div>

      {/* File Upload */}
      <FileUpload
        label="Documentos de Especificación Técnica o RFP"
        helperText="Formatos admitidos: PDF, DOCX, XLSX, PNG, JPG (Máximo 5 archivos, hasta 10MB c/u)"
        files={formData.files}
        onFilesChange={(files: UploadedFile[]) => onChange("files", files)}
        maxFiles={5}
        maxSizeMB={10}
        error={errors.files}
        optional
      />

      {/* External Reference Link */}
      <Input
        label="Enlace a Documentación Externa o Repositorio"
        placeholder="https://drive.google.com/... o https://github.com/..."
        value={formData.referenceLinks}
        error={errors.referenceLinks}
        onChange={(e) => onChange("referenceLinks", e.target.value)}
        leftIcon={<Link2 className="w-4 h-4" />}
        helperText="Asegúrese de que los enlaces cuenten con los permisos de lectura requeridos."
        optional
      />

      {/* Security & Confidentiality Checkbox */}
      <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <Checkbox
          label="Requerimiento de Acuerdo de No Divulgación (NDA)"
          description="Marque si el proyecto contiene información clasificada o de secreto comercial previo a la primera sesión técnica."
          checked={formData.ndaRequired}
          onChange={(checked) => onChange("ndaRequired", checked)}
        />

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <Checkbox
            label="Revisión de Seguridad e Infraestructura Crítica"
            description="La iniciativa involucra acceso a bases de datos en producción o infraestructuras de misión crítica."
            checked={formData.securityClearanceRequired}
            onChange={(checked) => onChange("securityClearanceRequired", checked)}
          />
        </div>
      </div>

      {/* Additional Notes */}
      <Textarea
        label="Notas o Instrucciones Especiales"
        placeholder="Cualquier información adicional relevante para la revisión preliminar..."
        value={formData.additionalNotes}
        error={errors.additionalNotes}
        maxLength={500}
        onChange={(e) => onChange("additionalNotes", e.target.value)}
        optional
      />
    </div>
  );
};
