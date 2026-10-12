import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked,
  onChange,
  error,
  id,
  disabled,
  className,
}) => {
  const checkboxId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={cn("space-y-1", className)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          "flex items-start gap-3 select-none cursor-pointer group",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <div className="relative pt-0.5 shrink-0">
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div
            className={cn(
              "w-4 h-4 rounded border transition-all duration-150 flex items-center justify-center",
              checked
                ? "bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-950"
                : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-slate-500",
              error && "border-red-500"
            )}
          >
            {checked && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>

        <div className="text-xs leading-normal">
          <div className="font-medium text-slate-800 dark:text-slate-200">
            {label}
          </div>
          {description && (
            <div className="text-slate-500 dark:text-slate-400 mt-0.5">
              {description}
            </div>
          )}
        </div>
      </label>

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 font-medium pl-7">
          {error}
        </p>
      )}
    </div>
  );
};
