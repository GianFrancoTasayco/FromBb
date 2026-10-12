import React from "react";
import { Lock, FileCheck, HelpCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 mt-auto py-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-center md:text-left">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>
            © {currentYear} Portal de Gestión de Solicitudes. Todos los derechos reservados.
          </span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer">
            <FileCheck className="w-3.5 h-3.5" /> Política de Confidencialidad
          </span>
          <span className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer">
            Términos de Servicio
          </span>
          <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer">
            <HelpCircle className="w-3.5 h-3.5" /> Soporte Técnico
          </span>
        </div>
      </div>
    </footer>
  );
};
