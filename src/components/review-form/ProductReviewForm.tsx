"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Check, Loader2, RotateCcw, Copy, CheckCircle2 } from "lucide-react";

interface ReviewFormData {
  rating: number;
  reviewTitle: string;
  recommend: "yes" | "no" | "";
  productReview: string;
  nickname: string;
  email: string;
  acceptedTerms: boolean;
}

const INITIAL_DATA: ReviewFormData = {
  rating: 0,
  reviewTitle: "",
  recommend: "",
  productReview: "",
  nickname: "",
  email: "",
  acceptedTerms: false,
};

export const ProductReviewForm: React.FC = () => {
  const [formData, setFormData] = useState<ReviewFormData>(INITIAL_DATA);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    referenceId: string;
    submittedAt: string;
    data: ReviewFormData;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRatingClick = (rate: number) => {
    setFormData((prev) => ({ ...prev, rating: rate }));
    if (errors.rating) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.rating;
        return copy;
      });
    }
  };

  const handleInputChange = (field: keyof ReviewFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.rating === 0) {
      newErrors.rating = "Por favor selecciona una calificación";
    }
    if (!formData.reviewTitle.trim()) {
      newErrors.reviewTitle = "El título de la reseña es obligatorio";
    }
    if (!formData.recommend) {
      newErrors.recommend = "Indica si recomendarías el producto";
    }
    if (!formData.productReview.trim()) {
      newErrors.productReview = "Por favor escribe tu reseña";
    }
    if (!formData.nickname.trim()) {
      newErrors.nickname = "El nombre o apodo es obligatorio";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }
    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedReceipt({
        referenceId: `REV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        submittedAt: new Date().toISOString(),
        data: formData,
      });
    }, 800);
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
    <div className="w-full max-w-[480px] mx-auto select-none font-sans">
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
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 border border-black flex items-center justify-center text-black">
              <CheckCircle2 className="w-9 h-9 stroke-[2]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black tracking-tight">
                Reseña Registrada
              </h2>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                Tu valoración ha sido guardada exitosamente.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-left space-y-2.5">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Código de Referencia:</span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="flex items-center gap-1 font-semibold text-black hover:opacity-75 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span className="text-black font-bold">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-mono font-bold text-lg text-black bg-white p-2.5 rounded-xl border border-gray-200 text-center tracking-wider">
                {submittedReceipt.referenceId}
              </div>

              <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Calificación:</span>
                  <span className="font-bold text-black">
                    {"★".repeat(submittedReceipt.data.rating)}
                    {"☆".repeat(5 - submittedReceipt.data.rating)} ({submittedReceipt.data.rating}/5)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Autor:</span>
                  <span className="font-semibold text-black">{submittedReceipt.data.nickname}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recomienda:</span>
                  <span className="font-semibold text-black">
                    {submittedReceipt.data.recommend === "yes" ? "Sí" : "No"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3.5 px-4 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Enviar otra reseña</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-6 sm:p-8 space-y-5">
              
              {/* Sección 1: Overall Rating */}
              <div>
                <h1 className="text-2xl font-bold text-black tracking-tight">
                  Overall Rating
                </h1>

                {/* 5 Star Rating Boxes */}
                <div className="flex items-center gap-2 sm:gap-2.5 mt-3">
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const isFilled = (hoverRating || formData.rating) >= starNum;

                    return (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => handleRatingClick(starNum)}
                        onMouseEnter={() => setHoverRating(starNum)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${
                          isFilled
                            ? "border-black bg-gray-50 text-black shadow-xs"
                            : "border-gray-200 bg-white text-gray-300 hover:border-gray-400"
                        }`}
                        aria-label={`Calificar ${starNum} estrellas`}
                      >
                        <Star
                          className={`w-6 h-6 transition-transform ${
                            isFilled
                              ? "fill-black stroke-black scale-105"
                              : "fill-gray-200 stroke-gray-200"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs text-gray-400 font-medium mt-1.5">
                  Click to rate
                </div>
                {errors.rating && (
                  <p className="text-xs text-black font-semibold mt-1">
                    {errors.rating}
                  </p>
                )}
              </div>

              {/* Sección 2: Review Title */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  placeholder="Example : easy to use"
                  value={formData.reviewTitle}
                  onChange={(e) => handleInputChange("reviewTitle", e.target.value)}
                  className={`w-full h-11 px-4 rounded-xl text-sm bg-white text-black placeholder:text-gray-400 border transition-all ${
                    errors.reviewTitle
                      ? "border-black focus:border-black"
                      : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                  }`}
                />
                {errors.reviewTitle && (
                  <p className="text-xs text-black font-semibold mt-1">
                    {errors.reviewTitle}
                  </p>
                )}
              </div>

              {/* Sección 3: Recomendar a un amigo (Yes / No) */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Would you recommends this product to a friend?
                </label>
                <div className="flex items-center gap-6 mt-1">
                  {/* Yes */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="recommend"
                      value="yes"
                      checked={formData.recommend === "yes"}
                      onChange={() => handleInputChange("recommend", "yes")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.recommend === "yes"
                          ? "border-black bg-white"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      {formData.recommend === "yes" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-black">Yes</span>
                  </label>

                  {/* No */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="recommend"
                      value="no"
                      checked={formData.recommend === "no"}
                      onChange={() => handleInputChange("recommend", "no")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.recommend === "no"
                          ? "border-black bg-white"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      {formData.recommend === "no" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-black">No</span>
                  </label>
                </div>
                {errors.recommend && (
                  <p className="text-xs text-black font-semibold mt-1">
                    {errors.recommend}
                  </p>
                )}
              </div>

              {/* Sección 4: Product Review */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Product Review
                </label>
                <textarea
                  rows={3}
                  placeholder="Example: Since i bought this a month ago ot be Rating designs, themes, templates and downloadable graphic elements on Dribbble"
                  value={formData.productReview}
                  onChange={(e) => handleInputChange("productReview", e.target.value)}
                  className={`w-full p-4 rounded-xl text-sm bg-white text-black placeholder:text-gray-400 border transition-all resize-none ${
                    errors.productReview
                      ? "border-black focus:border-black"
                      : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                  }`}
                />
                {errors.productReview && (
                  <p className="text-xs text-black font-semibold mt-1">
                    {errors.productReview}
                  </p>
                )}
              </div>

              {/* Sección 5: Nickname & Email address en 2 columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Nickname
                  </label>
                  <input
                    type="text"
                    placeholder="Example : easy to use"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange("nickname", e.target.value)}
                    className={`w-full h-11 px-4 rounded-xl text-sm bg-white text-black placeholder:text-gray-400 border transition-all ${
                      errors.nickname
                        ? "border-black focus:border-black"
                        : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                    }`}
                  />
                  {errors.nickname && (
                    <p className="text-xs text-black font-semibold mt-1">
                      {errors.nickname}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Example : your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full h-11 px-4 rounded-xl text-sm bg-white text-black placeholder:text-gray-400 border transition-all ${
                      errors.email
                        ? "border-black focus:border-black"
                        : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-black font-semibold mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Sección 6: Terms and conditions Checkbox y texto */}
              <div className="pt-1 space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.acceptedTerms}
                    onChange={(e) => handleInputChange("acceptedTerms", e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                      formData.acceptedTerms
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    {formData.acceptedTerms && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-sm font-bold text-black">
                    I Accept the{" "}
                    <span className="underline decoration-black cursor-pointer">
                      Terms and conditions
                    </span>
                  </span>
                </label>

                {errors.acceptedTerms && (
                  <p className="text-xs text-black font-semibold pl-7">
                    {errors.acceptedTerms}
                  </p>
                )}

                <p className="text-[11px] text-gray-400 leading-relaxed pt-1">
                  Example: Since i bought this a month ago ot be Rating designs, themes, templates and downloadable graphic elements on Dribbble
                </p>
              </div>

            </div>

            {/* Botón Inferior Submit Product Review en Negro Puro */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4.5 px-6 bg-black hover:bg-neutral-800 text-white font-bold text-sm tracking-wide text-center transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <span>Submit Product Review</span>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
