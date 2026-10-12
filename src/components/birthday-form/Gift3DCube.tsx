"use client";

import React from "react";

export const Gift3DCube: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-4 py-3 my-1">
      {/* Contenedor 3D del Cubo con perspectiva */}
      <div className="gift-cube-viewport">
        <div className="gift-cube">
          {/* Cara Frontal */}
          <div className="cube-face face-front">
            <div className="ribbon-v" />
            <div className="ribbon-h" />
          </div>

          {/* Cara Trasera */}
          <div className="cube-face face-back">
            <div className="ribbon-v" />
            <div className="ribbon-h" />
          </div>

          {/* Cara Derecha */}
          <div className="cube-face face-right">
            <div className="ribbon-v" />
            <div className="ribbon-h" />
          </div>

          {/* Cara Izquierda */}
          <div className="cube-face face-left">
            <div className="ribbon-v" />
            <div className="ribbon-h" />
          </div>

          {/* Cara Superior con Moño 3D Sobresaliente */}
          <div className="cube-face face-top">
            <div className="ribbon-v" />
            <div className="ribbon-h" />

            {/* Gran Moño 3D en relieve sobresaliente */}
            <div className="gift-bow-3d">
              {/* Lazo Izquierdo */}
              <div className="bow-loop-3d loop-left" />
              {/* Lazo Derecho */}
              <div className="bow-loop-3d loop-right" />
              {/* Lazo Superior */}
              <div className="bow-loop-3d loop-top" />
              {/* Nudo Central */}
              <div className="bow-center-3d" />
              {/* Cintas que cuelgan */}
              <div className="ribbon-tail tail-left" />
              <div className="ribbon-tail tail-right" />
            </div>
          </div>

          {/* Cara Inferior */}
          <div className="cube-face face-bottom">
            <div className="ribbon-v" />
            <div className="ribbon-h" />
          </div>
        </div>
      </div>

      {/* Texto al lado del Cubo */}
      <div className="text-left">
        <span className="text-sm font-extrabold text-black tracking-tight block">
          Venir con regalo 😸
        </span>
        <span className="text-[11px] text-gray-500 font-medium block">
          (Si no vienes con regalo, pagas peaje &quot;2 shots&quot;)
        </span>
      </div>

      <style jsx>{`
        .gift-cube-viewport {
          width: 52px;
          height: 52px;
          perspective: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .gift-cube {
          width: 36px;
          height: 36px;
          position: relative;
          transform-style: preserve-3d;
          animation: spinGift 5.5s linear infinite;
        }

        @keyframes spinGift {
          0% {
            transform: rotateX(-22deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(-22deg) rotateY(360deg);
          }
        }

        .cube-face {
          position: absolute;
          width: 36px;
          height: 36px;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.04);
          overflow: visible;
        }

        /* Cinta roja en cruz */
        .ribbon-v {
          position: absolute;
          width: 9px;
          height: 100%;
          background: #dc2626;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          box-shadow: 0 0 2px rgba(220, 38, 38, 0.4);
        }

        .ribbon-h {
          position: absolute;
          width: 100%;
          height: 9px;
          background: #dc2626;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          box-shadow: 0 0 2px rgba(220, 38, 38, 0.4);
        }

        /* Posiciones 3D de las 6 caras (mitad de 36px = 18px) */
        .face-front {
          transform: translateZ(18px);
        }
        .face-back {
          transform: rotateY(180deg) translateZ(18px);
        }
        .face-right {
          transform: rotateY(90deg) translateZ(18px);
        }
        .face-left {
          transform: rotateY(-90deg) translateZ(18px);
        }
        .face-top {
          transform: rotateX(90deg) translateZ(18px);
          background: #fafafa;
          overflow: visible;
        }
        .face-bottom {
          transform: rotateX(-90deg) translateZ(18px);
          background: #f3f4f6;
        }

        /* Moño 3D Sobresaliente hacia arriba */
        .gift-bow-3d {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) translateZ(6px);
          pointer-events: none;
        }

        /* Lazos 3D curvados y elevados */
        .bow-loop-3d {
          position: absolute;
          width: 14px;
          height: 12px;
          border: 3px solid #dc2626;
          border-radius: 50% 50% 10% 50%;
          background: #ef4444;
          box-shadow: 0 2px 5px rgba(220, 38, 38, 0.5);
          transform-style: preserve-3d;
        }

        .loop-left {
          top: 1px;
          left: -4px;
          transform: translateZ(8px) rotate(-40deg) rotateX(35deg);
        }

        .loop-right {
          top: 1px;
          right: -4px;
          transform: translateZ(8px) rotate(40deg) rotateX(35deg) scaleX(-1);
        }

        .loop-top {
          top: -4px;
          left: 5px;
          width: 13px;
          height: 10px;
          border-radius: 50%;
          transform: translateZ(12px) rotate(0deg) rotateX(55deg);
        }

        /* Nudo Central Esférico en 3D */
        .bow-center-3d {
          position: absolute;
          width: 9px;
          height: 9px;
          background: #b91c1c;
          border: 1px solid #991b1b;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(11px);
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
        }

        /* Cintas de lazo colgantes */
        .ribbon-tail {
          position: absolute;
          width: 4px;
          height: 10px;
          background: #dc2626;
          top: 12px;
          border-radius: 1px;
          transform-origin: top center;
        }

        .tail-left {
          left: 4px;
          transform: translateZ(4px) rotate(25deg);
        }

        .tail-right {
          right: 4px;
          transform: translateZ(4px) rotate(-25deg);
        }
      `}</style>
    </div>
  );
};
