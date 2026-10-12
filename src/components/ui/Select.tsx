import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, AlertCircle } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  optional?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      placeholder = "Seleccione una opción...",
      optional,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between text-xs">
            <label
              htmlFor={selectId}
              className="font-medium text-slate-700 dark:text-slate-300 select-none tracking-tight"
            >
              {label}
              {!optional && <span className="text-red-500 ml-1 font-semibold">*</span>}
            </label>
            {optional && (
              <span className="text-slate-400 dark:text-slate-500 text-[11px] font-normal">
                Opcional
              </span>
            )}
          </div>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              "w-full h-10 pl-3.5 pr-10 rounded-lg text-sm bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 appearance-none cursor-pointer",
              "border border-slate-300 dark:border-slate-700 transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-slate-400/20 focus:border-slate-800 dark:focus:border-slate-400",
              "disabled:bg-slate-100 dark:disabled:bg-slate-800/50 disabled:text-slate-400 disabled:cursor-not-allowed",
              error && "border-red-500 focus:border-red-600 focus:ring-red-500/10 dark:border-red-500",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-slate-400">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            {error ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
