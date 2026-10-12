"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Fecha objetivo: Sábado 17 de Octubre de 2026 a las 22:00 horas
  const targetDate = new Date("2026-10-17T22:00:00");

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full text-center py-1">
        <div className="h-10 animate-pulse bg-gray-100/60 rounded-md" />
      </div>
    );
  }

  const padZero = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="w-full text-center space-y-2 py-1">
      <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-black tracking-tight">
        <Clock className="w-3.5 h-3.5" />
        <span>Faltan para la fiesta:</span>
        <span className="text-[11px] text-gray-500 font-normal">
          (Sábado 17/10/2026 - 22:00 hrs)
        </span>
      </div>

      {timeLeft.isExpired ? (
        <div className="text-sm font-bold text-black">
          ¡Llegó el gran momento! 🎉
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-xs mx-auto">
          {/* Días */}
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-black font-mono leading-none tracking-tight">
              {padZero(timeLeft.days)}
            </div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1">
              Días
            </div>
          </div>

          <span className="text-xl font-bold text-gray-300 -mt-3.5">:</span>

          {/* Horas */}
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-black font-mono leading-none tracking-tight">
              {padZero(timeLeft.hours)}
            </div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1">
              Horas
            </div>
          </div>

          <span className="text-xl font-bold text-gray-300 -mt-3.5">:</span>

          {/* Minutos */}
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-black font-mono leading-none tracking-tight">
              {padZero(timeLeft.minutes)}
            </div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1">
              Min
            </div>
          </div>

          <span className="text-xl font-bold text-gray-300 -mt-3.5">:</span>

          {/* Segundos */}
          <div className="flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-black font-mono leading-none tracking-tight tabular-nums">
              {padZero(timeLeft.seconds)}
            </div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1">
              Seg
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
