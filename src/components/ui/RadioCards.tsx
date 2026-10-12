import React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  title: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface RadioCardsProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3 | 4;
  optional?: boolean;
}

export const RadioCards: React.FC<RadioCardsProps> = ({
  label,
  error,
  helperText,
  options,
  value,
  onChange,
  columns = 2,
  optional = false,
}) => {
  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-700 dark:text-slate-300 select-none tracking-tight">
            {label}
            {!optional && <span className="text-red-500 ml-1 font-semibold">*</span>}
          </span>
          {optional && (
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-normal">
              Opcional
            </span>
          )}
        </div>
      )}

      <div className={cn("grid gap-3", gridColsClass)}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "relative flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all duration-150 cursor-pointer select-none",
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-950 dark:border-slate-100 shadow-sm"
                  : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-700"
              )}
            >
              <div className="pt-0.5 shrink-0">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                    isSelected
                      ? "border-white dark:border-slate-950 bg-white dark:bg-slate-950"
                      : "border-slate-400 dark:border-slate-600 bg-transparent"
                  )}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-100" />
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium leading-snug">
                    {option.title}
                  </span>
                  {option.badge && (
                    <span
                      className={cn(
                        "text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded",
                        isSelected
                          ? "bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-900"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      )}
                    >
                      {option.badge}
                    </span>
                  )}
                </div>
                {option.description && (
                  <p
                    className={cn(
                      "text-xs mt-1 line-clamp-2 leading-relaxed",
                      isSelected
                        ? "text-slate-300 dark:text-slate-600"
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
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
};
