import React from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ShieldCheck, Building2 } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-950 shadow-sm">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>SISTEMA DE SOLICITUDES</span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                v2.4
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Módulo de Admisión y Registro Oficial
            </div>
          </div>
        </div>

        {/* Actions & Security Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
            <span className="font-medium">Canal Cifrado SSL 256-bit</span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
