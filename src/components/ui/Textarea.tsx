import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  optional?: boolean;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      maxLength,
      optional,
      showCharCount = true,
      id,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          {label && (
            <label
              htmlFor={textareaId}
              className="font-medium text-slate-700 dark:text-slate-300 select-none tracking-tight"
            >
              {label}
              {!optional && <span className="text-red-500 ml-1 font-semibold">*</span>}
            </label>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {optional && (
              <span className="text-slate-400 dark:text-slate-500 text-[11px] font-normal">
                Opcional
              </span>
            )}
            {maxLength && showCharCount && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                {currentLength} / {maxLength}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            rows={4}
            className={cn(
              "w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 resize-y min-h-[100px]",
              "border border-slate-300 dark:border-slate-700 transition-all duration-150",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-slate-400/20 focus:border-slate-800 dark:focus:border-slate-400",
              "disabled:bg-slate-100 dark:disabled:bg-slate-800/50 disabled:text-slate-400 disabled:cursor-not-allowed",
              error && "border-red-500 focus:border-red-600 focus:ring-red-500/10 dark:border-red-500",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
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

Textarea.displayName = "Textarea";
