import React, { useRef, useState } from "react";
import { UploadedFile } from "@/types/form";
import { cn } from "@/lib/utils";
import { UploadCloud, FileText, Trash2, AlertCircle } from "lucide-react";

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  error?: string;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  optional?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = "Archivos adjuntos",
  helperText = "Formatos permitidos: PDF, DOCX, XLSX, PNG, JPG (Máx. 10MB por archivo)",
  error,
  files,
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = 10,
  acceptedFormats = [".pdf", ".docx", ".doc", ".xlsx", ".csv", ".png", ".jpg", ".jpeg"],
  optional = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0) return;
    setUploadError(null);

    const validNewFiles: UploadedFile[] = [];
    let currentCount = files.length;

    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];

      if (currentCount >= maxFiles) {
        setUploadError(`Límite de ${maxFiles} archivos alcanzado.`);
        break;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setUploadError(`El archivo "${file.name}" supera el límite de ${maxSizeMB}MB.`);
        continue;
      }

      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      if (!acceptedFormats.includes(fileExtension)) {
        setUploadError(`Formato no admitido para "${file.name}".`);
        continue;
      }

      validNewFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        uploadedAt: new Date().toISOString(),
      });
      currentCount++;
    }

    if (validNewFiles.length > 0) {
      onFilesChange([...files, ...validNewFiles]);
    }
  };

  const handleRemove = (id: string) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700 dark:text-slate-300 select-none tracking-tight">
          {label}
          {!optional && <span className="text-red-500 ml-1 font-semibold">*</span>}
        </span>
        <span className="text-slate-400 dark:text-slate-500 text-[11px] font-normal">
          {files.length} / {maxFiles} adjuntos {optional ? "(Opcional)" : ""}
        </span>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150",
          isDragging
            ? "border-slate-900 bg-slate-100 dark:border-slate-300 dark:bg-slate-800/80"
            : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white/50 dark:bg-slate-900/40"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept={acceptedFormats.join(",")}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-3">
          <UploadCloud className="w-5 h-5" />
        </div>

        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          Haga clic para examinar o arrastre archivos aquí
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          {helperText}
        </p>
      </div>

      {/* Upload/Validation Error */}
      {(uploadError || error) && (
        <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {uploadError || error}
        </p>
      )}

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-2 mt-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-2.5 px-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg text-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-medium text-slate-700 dark:text-slate-200 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                  ({formatFileSize(file.size)})
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(file.id);
                }}
                className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded transition-colors"
                title="Eliminar archivo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
