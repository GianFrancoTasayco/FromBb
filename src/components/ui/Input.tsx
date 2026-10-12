import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  optional?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      optional,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex items-center justify-between text-xs">
            <label
              htmlFor={inputId}
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
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3.5 rounded-lg text-sm bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100",
              "border border-slate-300 dark:border-slate-700 transition-all duration-150",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-slate-400/20 focus:border-slate-800 dark:focus:border-slate-400",
              "disabled:bg-slate-100 dark:disabled:bg-slate-800/50 disabled:text-slate-400 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              (rightIcon || error) && "pr-10",
              error && "border-red-500 focus:border-red-600 focus:ring-red-500/10 dark:border-red-500",
              className
            )}
            {...props}
          />

          {error ? (
            <div className="absolute right-3 flex items-center pointer-events-none text-red-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : (
            rightIcon && (
              <div className="absolute right-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
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

Input.displayName = "Input";
