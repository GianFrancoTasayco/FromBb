"use client";

import React, { useEffect, useRef, useState } from "react";

export const InteractiveCatHero: React.FC = () => {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!catRef.current) return;
      const rect = catRef.current.getBoundingClientRect();
      const catCenterX = rect.left + rect.width / 2;
      const catCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - catCenterX;
      const deltaY = e.clientY - catCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 14; // Máximo desplazamiento de la pupila

      const angle = Math.atan2(deltaY, deltaX);
      const clampedDist = Math.min(distance / 25, maxDistance);

      setPupilPos({
        x: Math.cos(angle) * clampedDist,
        y: Math.sin(angle) * clampedDist,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 select-none">
      {/* Contenedor del Gato Interactivo */}
      <div ref={catRef} className="cat-container relative">
        <div className="cat">
          {/* Orejas */}
          <div className="ear ear--left" />
          <div className="ear ear--right" />

          {/* Cara */}
          <div className="face">
            {/* Ojo Izquierdo */}
            <div className="eye eye--left">
              <div
                className="eye-pupil"
                style={{
                  transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
                }}
              />
            </div>

            {/* Ojo Derecho */}
            <div className="eye eye--right">
              <div
                className="eye-pupil"
                style={{
                  transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
                }}
              />
            </div>

            {/* Hocico y Bigotes */}
            <div className="muzzle" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .cat-container {
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cat {
          position: relative;
          width: 170px;
          height: 160px;
          animation: breathing 4s ease-in-out infinite;
        }

        @keyframes breathing {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.02) translateY(-4px);
          }
        }

        /* OREJAS */
        .ear {
          position: absolute;
          top: 0;
          width: 0;
          height: 0;
          border-left: 32px solid transparent;
          border-right: 32px solid transparent;
          border-bottom: 60px solid #111827;
          border-radius: 12px;
          z-index: 1;
        }

        .ear::after {
          content: "";
          position: absolute;
          top: 16px;
          left: -18px;
          width: 0;
          height: 0;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
          border-bottom: 38px solid #f43f5e;
          border-radius: 8px;
        }

        .ear--left {
          left: 6px;
          transform: rotate(-22deg);
          animation: earTwitchLeft 5s ease-in-out infinite;
        }

        .ear--right {
          right: 6px;
          transform: rotate(22deg);
          animation: earTwitchRight 6s ease-in-out infinite;
        }

        @keyframes earTwitchLeft {
          0%, 90%, 100% {
            transform: rotate(-22deg);
          }
          93% {
            transform: rotate(-32deg);
          }
          96% {
            transform: rotate(-20deg);
          }
        }

        @keyframes earTwitchRight {
          0%, 88%, 100% {
            transform: rotate(22deg);
          }
          92% {
            transform: rotate(30deg);
          }
          95% {
            transform: rotate(20deg);
          }
        }

        /* CARA */
        .face {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 170px;
          height: 140px;
          background: #111827;
          border-radius: 85px 85px 75px 75px;
          z-index: 2;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        /* OJOS */
        .eye {
          position: absolute;
          top: 38px;
          width: 44px;
          height: 48px;
          background: #ffffff;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
          animation: blink 4.5s infinite;
        }

        .eye--left {
          left: 26px;
        }

        .eye--right {
          right: 26px;
        }

        @keyframes blink {
          0%, 96%, 100% {
            transform: scaleY(1);
          }
          98% {
            transform: scaleY(0.08);
          }
        }

        /* PUPILAS QUE SIGUEN EL CURSOR */
        .eye-pupil {
          width: 22px;
          height: 28px;
          background: #111827;
          border-radius: 50%;
          transition: transform 0.08s ease-out;
          position: relative;
        }

        /* Brillo en los ojos */
        .eye-pupil::after {
          content: "";
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
        }

        /* HOCICO, NARIZ Y BIGOTES */
        .muzzle {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 14px;
          background: #f43f5e;
          border-radius: 50% 50% 40% 40%;
        }

        /* Boca */
        .muzzle::before {
          content: "";
          position: absolute;
          top: 13px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 8px;
          background: #ffffff;
          opacity: 0.8;
        }

        /* Bigotes Izquierdos */
        .face::before {
          content: "";
          position: absolute;
          top: 75px;
          left: -28px;
          width: 45px;
          height: 2px;
          background: #ffffff;
          opacity: 0.75;
          box-shadow: 0 10px 0 #ffffff, 0 -10px 0 #ffffff;
          transform: rotate(-6deg);
        }

        /* Bigotes Derechos */
        .face::after {
          content: "";
          position: absolute;
          top: 75px;
          right: -28px;
          width: 45px;
          height: 2px;
          background: #ffffff;
          opacity: 0.75;
          box-shadow: 0 10px 0 #ffffff, 0 -10px 0 #ffffff;
          transform: rotate(6deg);
        }
      `}</style>
    </div>
  );
};
