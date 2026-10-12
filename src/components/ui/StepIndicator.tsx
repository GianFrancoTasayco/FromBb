import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Step {
  id: number;
  title: string;
  subtitle: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  allowNavigation?: boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowNavigation = true,
}) => {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span className="uppercase tracking-wider text-[11px]">
          Fase {currentStep} de {steps.length}
        </span>
        <span className="tabular-nums font-semibold text-slate-800 dark:text-slate-200">
          {Math.round(progressPercentage)}% completado
        </span>
      </div>

      {/* Thin line progress bar */}
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step nodes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;
          const isClickable = allowNavigation && isCompleted && onStepClick;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(step.id)}
              className={cn(
                "flex items-start gap-2.5 p-2 rounded-lg text-left transition-all duration-150 select-none",
                isClickable ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60" : "cursor-default",
                isCurrent && "bg-slate-100/80 dark:bg-slate-800/40"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors",
                  isCompleted && "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950",
                  isCurrent && "border-2 border-slate-900 text-slate-900 dark:border-slate-100 dark:text-slate-100 bg-transparent",
                  isPending && "border border-slate-300 text-slate-400 dark:border-slate-700 dark:text-slate-600 bg-transparent"
                )}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.id}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "text-xs font-semibold leading-tight truncate",
                    isCurrent
                      ? "text-slate-900 dark:text-slate-100"
                      : isCompleted
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate hidden sm:block">
                  {step.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
