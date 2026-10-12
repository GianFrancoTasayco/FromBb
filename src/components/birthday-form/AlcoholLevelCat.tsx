"use client";

import React, { useState } from "react";

interface AlcoholLevelCatProps {
  value: number;
  onChange: (level: number) => void;
}

export const AlcoholLevelCat: React.FC<AlcoholLevelCatProps> = ({
  value,
  onChange,
}) => {
  const [isSpilling, setIsSpilling] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleClick = (level: number) => {
    onChange(level);
    // Reiniciar y activar la animación del gato travieso tirando el vaso
    setIsSpilling(true);
    setAnimationKey((prev) => prev + 1);

    // Tras la animación, se queda el vaso caído o se reinicia suavemente
    setTimeout(() => {
      // mantiene el estado derramado por un momento
    }, 1200);
  };

  return (
    <div className="w-full space-y-2 select-none relative">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-black">
          Nivel de alcoholismo
        </label>
        {isSpilling && (
          <span className="text-[11px] text-red-600 font-semibold animate-bounce">
            ¡El gato botó el vaso! 😹💦
          </span>
        )}
      </div>

      <div className="relative pt-6 pb-2">
        {/* Contenedor del Gato y el Vaso sobre la mesa */}
        <div className="flex items-end gap-1 mb-1 relative z-20">
          
          {/* GATO TRAVIESO ANIMADO */}
          <div className="relative flex flex-col items-center">
            {/* Ojos y orejas del gato */}
            <div className={`relative transition-transform duration-300 ${isSpilling ? "scale-105" : ""}`}>
              <svg viewBox="0 0 80 70" className="w-12 h-11">
                {/* Oreja Izquierda */}
                <polygon points="12,30 20,4 32,24" fill="#111827" />
                <polygon points="15,26 21,9 29,22" fill="#f43f5e" />
                
                {/* Oreja Derecha */}
                <polygon points="68,30 60,4 48,24" fill="#111827" />
                <polygon points="65,26 59,9 51,22" fill="#f43f5e" />

                {/* Cabeza */}
                <ellipse cx="40" cy="38" rx="28" ry="24" fill="#111827" />

                {/* Ojos traviesos */}
                {isSpilling ? (
                  <>
                    {/* Ojo izquierdo guiñando */}
                    <path d="M 24 38 Q 30 32 36 38" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
                    {/* Ojo derecho abierto pícaro */}
                    <ellipse cx="52" cy="36" rx="6" ry="7" fill="#ffffff" />
                    <ellipse cx="54" cy="36" rx="3.5" ry="4" fill="#111827" />
                    <circle cx="56" cy="34" r="1.5" fill="#ffffff" />
                  </>
                ) : (
                  <>
                    {/* Ojos normales atentos */}
                    <ellipse cx="28" cy="36" rx="6" ry="7" fill="#ffffff" />
                    <ellipse cx="30" cy="36" rx="3.5" ry="4" fill="#111827" />
                    <circle cx="31" cy="34" r="1.5" fill="#ffffff" />

                    <ellipse cx="52" cy="36" rx="6" ry="7" fill="#ffffff" />
                    <ellipse cx="54" cy="36" rx="3.5" ry="4" fill="#111827" />
                    <circle cx="55" cy="34" r="1.5" fill="#ffffff" />
                  </>
                )}

                {/* Nariz rosa */}
                <polygon points="37,44 43,44 40,48" fill="#f43f5e" />

                {/* Boca */}
                <path d="M 35 49 Q 40 54 45 49" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Bigotes */}
                <line x1="10" y1="42" x2="24" y2="44" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="10" y1="48" x2="24" y2="47" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="70" y1="42" x2="56" y2="44" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="70" y1="48" x2="56" y2="47" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Pata del gato con animación de empuje */}
            <div
              key={`paw-${animationKey}`}
              className={`absolute -right-2 bottom-1 w-5 h-5 transition-all ${
                isSpilling ? "animate-cat-push" : ""
              }`}
            >
              <svg viewBox="0 0 30 30" className="w-full h-full">
                <ellipse cx="15" cy="15" rx="11" ry="8" fill="#111827" />
                <circle cx="9" cy="11" r="3" fill="#ffffff" />
                <circle cx="15" cy="9" r="3" fill="#ffffff" />
                <circle cx="21" cy="11" r="3" fill="#ffffff" />
                <ellipse cx="15" cy="17" rx="5" ry="4" fill="#f43f5e" />
              </svg>
            </div>
          </div>

          {/* EL VASO DE AGUA / BEBIDA QUE SE CAE */}
          <div
            key={`glass-${animationKey}`}
            className={`relative ml-1 mb-0.5 cursor-pointer origin-bottom-left transition-all duration-300 ${
              isSpilling ? "animate-glass-fall" : "hover:rotate-6"
            }`}
            onClick={() => handleClick((value + 1) % 6)}
            title="¡Toca para que el gato tire el vaso!"
          >
            <svg viewBox="0 0 36 46" className="w-7 h-9">
              {/* Vaso de cristal */}
              <path
                d="M 6 4 L 10 40 Q 18 44 26 40 L 30 4 Z"
                fill="rgba(255, 255, 255, 0.7)"
                stroke="#0f172a"
                strokeWidth="2.5"
              />
              {/* Líquido dentro del vaso */}
              <path
                d="M 8 16 L 11 38 Q 18 41 25 38 L 28 16 Q 18 20 8 16 Z"
                fill={value > 2 ? "#38bdf8" : "#93c5fd"}
                opacity="0.85"
              />
              {/* Rodaja de limón o hielo en el borde */}
              <circle cx="8" cy="8" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="8" y1="3" x2="8" y2="13" stroke="#ca8a04" strokeWidth="1" />
              <line x1="3" y1="8" x2="13" y2="8" stroke="#ca8a04" strokeWidth="1" />
            </svg>
          </div>

          {/* Gotas de salpicadura saliendo del vaso */}
          {isSpilling && (
            <div key={`splash-${animationKey}`} className="absolute left-16 bottom-2 pointer-events-none">
              <div className="splash-drop drop-1" />
              <div className="splash-drop drop-2" />
              <div className="splash-drop drop-3" />
              <div className="splash-drop drop-4" />
            </div>
          )}

        </div>

        {/* Charco de líquido derramado sobre los botones */}
        {isSpilling && (
          <div
            key={`puddle-${animationKey}`}
            className="absolute left-0 right-0 bottom-0 h-14 pointer-events-none z-10 overflow-hidden"
          >
            {/* Olas de agua derramada */}
            <div className="water-wave" />
            <div className="water-puddle" />
          </div>
        )}

        {/* BOTONES DEL 0 AL 5 */}
        <div className="relative z-20 flex items-center gap-1.5 sm:gap-2.5">
          {[0, 1, 2, 3, 4, 5].map((lvl) => {
            const isSelected = value === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => handleClick(lvl)}
                className={`relative flex-1 h-11 sm:h-12 rounded-xl font-extrabold text-sm transition-all duration-200 flex flex-col items-center justify-center cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-black text-white shadow-md border-2 border-black -translate-y-1 scale-105"
                    : "bg-white text-black border border-gray-200 hover:border-gray-400 hover:bg-gray-50/80"
                }`}
                aria-label={`Seleccionar nivel de alcoholismo ${lvl}`}
              >
                {/* Gotita de agua animada si está derramado */}
                {isSpilling && (
                  <span
                    className="absolute -top-2 text-[10px] animate-pulse"
                    style={{ animationDelay: `${lvl * 90}ms` }}
                  >
                    💧
                  </span>
                )}
                <span>{lvl}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* Animación del empuje de la pata del gato */
        @keyframes catPush {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          30% {
            transform: translate(8px, -4px) rotate(-25deg);
          }
          50% {
            transform: translate(14px, 2px) rotate(15deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }

        .animate-cat-push {
          animation: catPush 0.4s ease-out forwards;
        }

        /* Animación del vaso cayendo y derramándose */
        @keyframes glassFall {
          0% {
            transform: rotate(0deg) translate(0, 0);
          }
          20% {
            transform: rotate(15deg) translate(2px, -2px);
          }
          45% {
            transform: rotate(85deg) translate(14px, 8px);
          }
          75% {
            transform: rotate(80deg) translate(16px, 10px);
          }
          100% {
            transform: rotate(78deg) translate(14px, 9px);
          }
        }

        .animate-glass-fall {
          animation: glassFall 0.55s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* Gotas de agua disparadas */
        .splash-drop {
          position: absolute;
          width: 7px;
          height: 7px;
          background: #38bdf8;
          border-radius: 50%;
          opacity: 0;
        }

        .drop-1 {
          animation: dropFly1 0.7s ease-out forwards;
        }
        .drop-2 {
          animation: dropFly2 0.75s ease-out 0.05s forwards;
        }
        .drop-3 {
          animation: dropFly3 0.8s ease-out 0.1s forwards;
        }
        .drop-4 {
          animation: dropFly4 0.65s ease-out 0.15s forwards;
        }

        @keyframes dropFly1 {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          50% { opacity: 0.9; transform: translate(45px, -25px) scale(1.3); }
          100% { opacity: 0; transform: translate(80px, 15px) scale(0.6); }
        }

        @keyframes dropFly2 {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          50% { opacity: 0.9; transform: translate(95px, -35px) scale(1.4); }
          100% { opacity: 0; transform: translate(160px, 15px) scale(0.5); }
        }

        @keyframes dropFly3 {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          50% { opacity: 0.9; transform: translate(140px, -20px) scale(1.2); }
          100% { opacity: 0; transform: translate(240px, 15px) scale(0.4); }
        }

        @keyframes dropFly4 {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          50% { opacity: 0.9; transform: translate(200px, -30px) scale(1.1); }
          100% { opacity: 0; transform: translate(320px, 15px) scale(0.3); }
        }

        /* Charco líquido derramado sobre los botones */
        @keyframes waterFlow {
          0% {
            width: 0%;
            opacity: 0;
            transform: scaleY(0.4);
          }
          30% {
            width: 60%;
            opacity: 0.6;
            transform: scaleY(1.1);
          }
          60% {
            width: 100%;
            opacity: 0.45;
            transform: scaleY(0.9);
          }
          100% {
            width: 100%;
            opacity: 0.25;
            transform: scaleY(0.8);
          }
        }

        .water-wave {
          position: absolute;
          left: 0;
          bottom: 2px;
          height: 18px;
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.6) 0%, rgba(96, 165, 250, 0.4) 70%, rgba(147, 197, 253, 0.2) 100%);
          border-radius: 12px;
          animation: waterFlow 0.8s ease-out forwards;
        }

        .water-puddle {
          position: absolute;
          left: 10px;
          bottom: 0px;
          width: 95%;
          height: 8px;
          background: rgba(56, 189, 248, 0.35);
          border-radius: 50%;
          filter: blur(2px);
          animation: waterFlow 0.9s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
