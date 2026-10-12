"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Loader2, RotateCcw, Copy, CheckCircle2, MapPin, CalendarPlus } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import { Gift3DCube } from "./Gift3DCube";
import { ThreeCatAlcohol } from "./ThreeCatAlcohol";
import { saveBirthdayRsvp } from "@/lib/firebase";

const getGoogleCalendarUrl = () => {
  const title = encodeURIComponent("🐈 Welcome to my birthday 🥳");
  const details = encodeURIComponent(
    "¡Estás invitado a mi cumpleaños!\n\nRecuerda venir con regalo 😸 (si no vienes con regalo, pagas peaje de 2 shots 🥃).\n\nAviso importante: No llevar Ron.\n\n📍 Ubicación: Calle De La Arqueología Mz.A - Lt.55, Lima Metropolitana 15057\nhttps://maps.app.goo.gl/QBzSvE2uMT4kwuC19"
  );
  const location = encodeURIComponent("Calle De La Arqueología Mz.A - Lt.55, Lima Metropolitana 15057");
  const dates = "20261017T220000/20261018T050000";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
};

interface BirthdayFormData {
  nombre: string;
  alias: string;
  nivelAlcoholismo: number;
  comoTerminar: string;
  bebidas: string[];
  telefono?: string;
  aceptoTerminos: boolean;
}

const TERMINAR_OPCIONES = [
  "Tranquilo",
  "Marinado",
  "Invicto",
  "Desconectado",
  "Anestesiado",
];

const BEBIDAS_OPCIONES = [
  "Vodka",
  "Pisko",
  "Wisky",
  "Vino",
];

const INITIAL_DATA: BirthdayFormData = {
  nombre: "",
  alias: "",
  nivelAlcoholismo: 0,
  comoTerminar: "Tranquilo",
  bebidas: ["Vodka"],
  aceptoTerminos: false,
};

export const BirthdayForm: React.FC = () => {
  const [formData, setFormData] = useState<BirthdayFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceId: string;
    submittedAt: string;
    data: BirthdayFormData;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field: keyof BirthdayFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const toggleBebida = (bebida: string) => {
    setFormData((prev) => {
      const exists = prev.bebidas.includes(bebida);
      const newBebidas = exists
        ? prev.bebidas.filter((b) => b !== bebida)
        : [...prev.bebidas, bebida];
      return { ...prev, bebidas: newBebidas };
    });
    if (errors.bebidas) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.bebidas;
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }
    if (!formData.alias.trim()) {
      newErrors.alias = "El alias o apodo es obligatorio";
    }
    if (!formData.comoTerminar) {
      newErrors.comoTerminar = "Selecciona una opción";
    }
    if (formData.bebidas.length === 0) {
      newErrors.bebidas = "Selecciona al menos una bebida para llevar";
    }
    if (!formData.aceptoTerminos) {
      newErrors.aceptoTerminos = "Debes aceptar las condiciones para confirmar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const referenceId = `BDAY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      // Guardar en Firebase Firestore
      await saveBirthdayRsvp({
        ...formData,
        referenceId,
      });

      setSubmittedReceipt({
        referenceId,
        submittedAt: new Date().toISOString(),
        data: formData,
      });
    } catch (error) {
      console.error("Error guardando en Firestore:", error);
      // Brinda el recibo al usuario incluso si hay problemas de red
      setSubmittedReceipt({
        referenceId,
        submittedAt: new Date().toISOString(),
        data: formData,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setErrors({});
    setSubmittedReceipt(null);
  };

  const handleCopyRef = () => {
    if (!submittedReceipt) return;
    navigator.clipboard.writeText(submittedReceipt.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto select-none font-sans p-0 m-0">
      {/* Tarjeta Principal Monocromática */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden">
        
        {/* Encabezado con la foto de los gatos en blanco y negro */}
        <div className="w-full bg-white border-b border-gray-100 p-3 flex items-center justify-center">
          <div className="w-full max-w-[420px] rounded-xl overflow-hidden border border-gray-100">
            <Image
              src="/cat-banner.png"
              alt="Cat header banner illustration"
              width={800}
              height={200}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Contenido del Formulario o Pantalla de Éxito */}
        {submittedReceipt ? (
          <div className="p-7 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 border border-black flex items-center justify-center text-black">
              <CheckCircle2 className="w-9 h-9 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-black tracking-tight">
                ¡Confirmación Recibida! 🥳
              </h2>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Tu asistencia ha sido registrada exitosamente. ¡Nos vemos en la party! 🐈
              </p>
            </div>

            {/* Ubicación del evento en el comprobante */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-left space-y-1.5">
              <span className="font-bold text-black block">📍 Ubicación del evento:</span>
              <p className="text-gray-700 leading-snug">Calle De La Arqueología Mz.A - Lt.55, Lima Metropolitana 15057</p>
              <a
                href="https://maps.app.goo.gl/QBzSvE2uMT4kwuC19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-black underline inline-flex items-center gap-1 hover:text-neutral-600"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Abrir en Google Maps</span>
              </a>
            </div>

            {/* Botón de Google Calendar en Comprobante */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-white border border-black hover:bg-neutral-50 text-black rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group"
            >
              <CalendarPlus className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span>Agendar en Google Calendar</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Enviar otra respuesta</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-5">
              
              {/* Título y Descripción Centrada */}
              <div className="text-center pb-1 space-y-2">
                <h1 className="text-2xl font-bold text-black tracking-tight text-center">
                  🐈 Welcome to my birthday 🐈
                </h1>
                
                <div className="text-xs text-gray-700 leading-relaxed font-normal max-w-sm mx-auto">
                  <p className="font-medium text-black">
                    ¿Sabes por qué eres una persona afortunada?<br />
                    Porque estás invitado a mi cumpleaños... 🥳🥳🥳🥳
                  </p>
                </div>
              </div>

              {/* Cuenta Regresiva (Timer) */}
              <CountdownTimer />

              {/* Dirección del evento y Botón Calendar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-semibold text-black -mt-1 pb-1">
                <a
                  href="https://maps.app.goo.gl/QBzSvE2uMT4kwuC19"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-center hover:underline hover:text-neutral-700 transition-colors"
                  title="Ver en Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Calle De La Arqueología Mz.A - Lt.55, Lima Metropolitana</span>
                </a>
                <span className="hidden sm:inline text-gray-300">•</span>
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-300 hover:border-black hover:bg-neutral-50 text-black text-[11px] font-semibold transition-all shadow-2xs group shrink-0"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
                  <span>Añadir a Google Calendar</span>
                </a>
              </div>

              {/* Cubo de Regalo 3D Giratorio */}
              <Gift3DCube />

              {/* Nombre y Alias Lado a Lado (2 Columnas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ejemplo : Carlos"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className={`w-full h-11 px-4 rounded-xl text-sm bg-white text-black placeholder:text-gray-400 border transition-all ${
                      errors.nombre
                        ? "border-black focus:border-black"
                        : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-xs text-black font-semibold mt-1">
                      {errors.nombre}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Alias
                  </label>
                  <input
                    type="text"
                    placeholder="Ejemplo : Carlitos"
                    value={formData.alias}
                    onChange={(e) => handleInputChange("alias", e.target.value)}
                    className={`w-full h-11 px-4 rounded-xl text-sm bg-white text-black placeholder:text-gray-400 border transition-all ${
                      errors.alias
                        ? "border-black focus:border-black"
                        : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                    }`}
                  />
                  {errors.alias && (
                    <p className="text-xs text-black font-semibold mt-1">
                      {errors.alias}
                    </p>
                  )}
                </div>
              </div>

              {/* Nivel de Alcoholismo del 0 al 5 con Gato 3D Low-Poly que Tira el Vaso */}
              <ThreeCatAlcohol
                value={formData.nivelAlcoholismo}
                onChange={(lvl) => handleInputChange("nivelAlcoholismo", lvl)}
              />

              {/* Cómo quieres terminar (Opciones Radio) */}
              <div className="space-y-2.5">
                <label className="block text-sm font-bold text-black">
                  Cómo quieres terminar
                </label>
                
                <div className="space-y-2">
                  {TERMINAR_OPCIONES.map((opcion) => {
                    const isSelected = formData.comoTerminar === opcion;
                    return (
                      <label
                        key={opcion}
                        onClick={() => handleInputChange("comoTerminar", opcion)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl border cursor-pointer select-none transition-all duration-150 ${
                          isSelected
                            ? "border-black bg-black/5 shadow-xs"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/80"
                        }`}
                      >
                        <span className={`text-sm font-medium ${isSelected ? "text-black font-semibold" : "text-gray-700"}`}>
                          {opcion}
                        </span>
                        
                        {/* Custom Radio Circle */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                            isSelected
                              ? "border-black bg-black"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {errors.comoTerminar && (
                  <p className="text-xs text-black font-semibold mt-1">
                    {errors.comoTerminar}
                  </p>
                )}
              </div>

              {/* ¿Qué vas a llevar? con aviso de no llevar Ron */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <label className="block text-sm font-bold text-black">
                    ¿Qué vas a llevar?
                  </label>
                  <span className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300">
                    ⚠️ Aviso: no llevar Ron
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {BEBIDAS_OPCIONES.map((bebida) => {
                    const isSelected = formData.bebidas.includes(bebida);
                    return (
                      <button
                        type="button"
                        key={bebida}
                        onClick={() => toggleBebida(bebida)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left cursor-pointer select-none transition-all duration-150 ${
                          isSelected
                            ? "border-black bg-black/5 font-semibold text-black shadow-xs"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50/80"
                        }`}
                      >
                        <span className="text-sm">{bebida}</span>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {errors.bebidas && (
                  <p className="text-xs text-black font-semibold mt-1">
                    {errors.bebidas}
                  </p>
                )}
              </div>

              {/* Dress Code & Términos */}
              <div className="pt-2 space-y-2.5">
                
                {/* Dress code arriba de los términos */}
                <div className="flex items-center justify-between p-2.5 px-3.5 bg-neutral-100 rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">👘</span>
                    <span className="text-xs font-bold text-black">
                      Dress code : <span className="font-extrabold text-neutral-900">Pijama decente</span>
                    </span>
                  </div>
                </div>

                {/* Acepto tomar los shots si no traje dress code y el regalo */}
                <div className="space-y-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.aceptoTerminos}
                      onChange={(e) => handleInputChange("aceptoTerminos", e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                        formData.aceptoTerminos
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      {formData.aceptoTerminos && (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-black leading-snug">
                      Acepto tomar los shots si no traje dress code y el regalo 🥃
                    </span>
                  </label>

                  {errors.aceptoTerminos && (
                    <p className="text-xs text-black font-semibold pl-7">
                      {errors.aceptoTerminos}
                    </p>
                  )}
                </div>

              </div>

            </div>

            {/* Botón Inferior Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4.5 px-6 bg-black hover:bg-neutral-800 text-white font-bold text-sm tracking-wide text-center transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Confirmando Asistencia...</span>
                </>
              ) : (
                <span>Confirmar Asistencia 🐈</span>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
