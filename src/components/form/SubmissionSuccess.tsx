import React from "react";
import { SubmissionReceipt } from "@/types/form";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Download, Printer, PlusCircle, Copy, Check } from "lucide-react";

interface SubmissionSuccessProps {
  receipt: SubmissionReceipt;
  onReset: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  receipt,
  onReset,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(receipt.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(receipt, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `comprobante-${receipt.referenceId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-center py-6">
      {/* Icon & Title */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-slate-100 mb-4">
          <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
        </div>

        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          Solicitud Registrada con Éxito
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
          El requerimiento ha sido admitido formalmente y canalizado al comité técnico correspondiente.
        </p>
      </div>

      {/* Reference ID Card */}
      <div className="max-w-md mx-auto p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Código Único de Radicación</span>
          <span>{new Date(receipt.submittedAt).toLocaleDateString("es-ES")}</span>
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-slate-950 p-3 rounded-md border border-slate-200 dark:border-slate-800">
          <span className="font-mono font-semibold text-base tracking-wider text-slate-900 dark:text-slate-100">
            {receipt.referenceId}
          </span>
          <button
            type="button"
            onClick={handleCopyReference}
            className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 p-1 rounded transition-colors cursor-pointer"
            title="Copiar código"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-medium text-[11px]">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copiar</span>
              </>
            )}
          </button>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3 space-y-1">
          <div className="flex justify-between">
            <span>Solicitante:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{receipt.data.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span>Organización:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{receipt.data.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span>Correo institucional:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{receipt.data.email}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadJSON}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Descargar Comprobante (.json)
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          leftIcon={<Printer className="w-4 h-4" />}
        >
          Imprimir Registro
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={onReset}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Registrar Nueva Solicitud
        </Button>
      </div>
    </div>
  );
};
