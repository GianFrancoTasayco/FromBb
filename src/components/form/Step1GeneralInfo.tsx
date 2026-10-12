import React from "react";
import { FormData, FormErrors } from "@/types/form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { User, Mail, Phone, Briefcase, Building, Globe } from "lucide-react";

interface Step1Props {
  formData: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: any) => void;
}

export const Step1GeneralInfo: React.FC<Step1Props> = ({
  formData,
  errors,
  onChange,
}) => {
  const companySizeOptions = [
    { value: "1-10", label: "1 a 10 colaboradores (Microempresa / Startup)" },
    { value: "11-50", label: "11 a 50 colaboradores (Pequeña empresa)" },
    { value: "51-200", label: "51 a 200 colaboradores (Mediana empresa)" },
    { value: "201-1000", label: "201 a 1,000 colaboradores (Gran empresa)" },
    { value: "1000+", label: "Más de 1,000 colaboradores (Corporación internacional)" },
  ];

  const countryOptions = [
    { value: "ES", label: "España" },
    { value: "MX", label: "México" },
    { value: "CO", label: "Colombia" },
    { value: "AR", label: "Argentina" },
    { value: "CL", label: "Chile" },
    { value: "PE", label: "Perú" },
    { value: "US", label: "Estados Unidos" },
    { value: "OTRO", label: "Otro país" },
  ];

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Información del Solicitante y Organización
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Ingrese los datos del responsable formal de la solicitud y de la entidad representativa.
        </p>
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Nombre y Apellidos"
          placeholder="Ej. Carlos Mendoza Silva"
          value={formData.fullName}
          error={errors.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          leftIcon={<User className="w-4 h-4" />}
          autoComplete="name"
        />

        <Input
          label="Correo Electrónico Institucional"
          type="email"
          placeholder="nombre@organizacion.com"
          value={formData.email}
          error={errors.email}
          onChange={(e) => onChange("email", e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          helperText="Se utilizará para el envío de confirmaciones oficiales."
        />

        <Input
          label="Teléfono de Contacto Directo"
          type="tel"
          placeholder="+34 600 000 000"
          value={formData.phone}
          error={errors.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          leftIcon={<Phone className="w-4 h-4" />}
          autoComplete="tel"
        />

        <Input
          label="Cargo o Función Profesional"
          placeholder="Ej. Director de Tecnología / Gerente de Operaciones"
          value={formData.jobTitle}
          error={errors.jobTitle}
          onChange={(e) => onChange("jobTitle", e.target.value)}
          leftIcon={<Briefcase className="w-4 h-4" />}
        />

        <Input
          label="Nombre Legal de la Empresa / Entidad"
          placeholder="Ej. Inversiones Globales S.A."
          value={formData.companyName}
          error={errors.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          leftIcon={<Building className="w-4 h-4" />}
        />

        <Select
          label="Tamaño de la Organización"
          placeholder="Seleccione el rango de empleados"
          options={companySizeOptions}
          value={formData.companySize}
          error={errors.companySize}
          onChange={(e) => onChange("companySize", e.target.value)}
        />

        <div className="md:col-span-2">
          <Select
            label="País de Operación Principal"
            placeholder="Seleccione el país de residencia fiscal"
            options={countryOptions}
            value={formData.country}
            error={errors.country}
            onChange={(e) => onChange("country", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
