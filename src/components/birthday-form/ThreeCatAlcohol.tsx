"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeCatAlcoholProps {
  value: number;
  onChange: (level: number) => void;
}

export const ThreeCatAlcohol: React.FC<ThreeCatAlcoholProps> = ({
  value,
  onChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<(() => void) | null>(null);
  const [isSpilling, setIsSpilling] = useState(false);
  const [spillKey, setSpillKey] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Viewport
    const width = 160;
    const height = 145;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 1, 1000);
    camera.position.set(-1, 30, 75);
    camera.lookAt(new THREE.Vector3(1, 14, 0));

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x665555, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(35, 55, 45);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-30, 25, -25);
    scene.add(backLight);

    // ==========================================
    // MATERIALES EXACTOS YAKUDOO CAT
    // ==========================================
    const furBrown = new THREE.MeshLambertMaterial({ color: 0x35231e, flatShading: true });
    const furStripe = new THREE.MeshLambertMaterial({ color: 0x543830, flatShading: true });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true });
    const blackMat = new THREE.MeshLambertMaterial({ color: 0x111111, flatShading: true });
    const pinkMat = new THREE.MeshLambertMaterial({ color: 0xf472b6, flatShading: true });
    const redCollarMat = new THREE.MeshLambertMaterial({ color: 0x881337, flatShading: true });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      transmission: 0.85,
    });
    const waterMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });

    // GRUPO PRINCIPAL DEL GATO
    const cat = new THREE.Group();
    cat.position.set(-7, 0, 0);

    // 1. CUERPO
    const bodyGeom = new THREE.CylinderGeometry(7, 12, 22, 4, 1);
    const body = new THREE.Mesh(bodyGeom, furBrown);
    body.position.y = 11;
    body.rotation.y = Math.PI / 4;
    body.castShadow = true;
    body.receiveShadow = true;
    cat.add(body);

    // Pecho 'V' blanco
    const chestGeom = new THREE.ConeGeometry(5, 10, 3);
    const chest = new THREE.Mesh(chestGeom, whiteMat);
    chest.position.set(0, 14, 7.8);
    chest.rotation.z = Math.PI;
    cat.add(chest);

    // Collar Rojo
    const collarGeom = new THREE.CylinderGeometry(7.2, 7.8, 2.5, 4);
    const collar = new THREE.Mesh(collarGeom, redCollarMat);
    collar.position.y = 21.5;
    collar.rotation.y = Math.PI / 4;
    cat.add(collar);

    // 2. CABEZA ROMBOIDAL
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 25, 0);

    const headGeom = new THREE.BoxGeometry(15, 15, 15);
    const head = new THREE.Mesh(headGeom, furBrown);
    head.rotation.z = Math.PI / 4;
    head.castShadow = true;
    headGroup.add(head);

    // Rayas de la frente
    const foreheadStripeGeom = new THREE.BoxGeometry(1.2, 7, 0.4);
    [-2, 0, 2].forEach((x) => {
      const stripe = new THREE.Mesh(foreheadStripeGeom, furStripe);
      stripe.position.set(x, 2, 8);
      headGroup.add(stripe);
    });

    // Rayas laterales de las mejillas
    const cheekStripeGeom = new THREE.BoxGeometry(3.5, 1, 0.4);
    [-1, 1].forEach((dir) => {
      [0, -2.5].forEach((y) => {
        const stripe = new THREE.Mesh(cheekStripeGeom, furStripe);
        stripe.position.set(dir * 8.5, y, 4);
        stripe.rotation.y = dir * 0.4;
        headGroup.add(stripe);
      });
    });

    // Orejas con interior rosa con ajuste equilibrado
    const earGeom = new THREE.ConeGeometry(3.8, 6.0, 4);
    const earPinkGeom = new THREE.ConeGeometry(2.3, 4.0, 4);

    const earLeft = new THREE.Mesh(earGeom, furBrown);
    earLeft.position.set(-6.3, 7.2, 0);
    earLeft.rotation.z = 0.38;
    const earPinkL = new THREE.Mesh(earPinkGeom, pinkMat);
    earPinkL.position.set(-6.0, 7.0, 1.2);
    earPinkL.rotation.z = 0.38;
    headGroup.add(earLeft);
    headGroup.add(earPinkL);

    const earRight = new THREE.Mesh(earGeom, furBrown);
    earRight.position.set(6.3, 7.2, 0);
    earRight.rotation.z = -0.38;
    const earPinkR = new THREE.Mesh(earPinkGeom, pinkMat);
    earPinkR.position.set(6.0, 7.0, 1.2);
    earPinkR.rotation.z = -0.38;
    headGroup.add(earRight);
    headGroup.add(earPinkR);

    // Ojos Grandes Blancos con Pupilas Negras
    const eyeGeom = new THREE.BoxGeometry(4.5, 6.5, 0.8);
    const pupilGeom = new THREE.BoxGeometry(2.2, 3.2, 1);

    // Ojo Izquierdo
    const eyeLeft = new THREE.Mesh(eyeGeom, whiteMat);
    eyeLeft.position.set(-4.5, 1, 7.8);
    const pupilLeft = new THREE.Mesh(pupilGeom, blackMat);
    pupilLeft.position.set(-4.5, 0.5, 8.2);
    headGroup.add(eyeLeft);
    headGroup.add(pupilLeft);

    // Ojo Derecho
    const eyeRight = new THREE.Mesh(eyeGeom, whiteMat);
    eyeRight.position.set(4.5, 1, 7.8);
    const pupilRight = new THREE.Mesh(pupilGeom, blackMat);
    pupilRight.position.set(4.5, 0.5, 8.2);
    headGroup.add(eyeRight);
    headGroup.add(pupilRight);

    // Nariz Rosa
    const noseGeom = new THREE.ConeGeometry(1.8, 2.5, 3);
    const nose = new THREE.Mesh(noseGeom, pinkMat);
    nose.position.set(0, -2.5, 8.8);
    nose.rotation.z = Math.PI;
    headGroup.add(nose);

    // Bigotes negros finos (3 a cada lado)
    const whiskerMat = new THREE.LineBasicMaterial({ color: 0x111111, linewidth: 2 });
    const addWhisker = (x1: number, y1: number, x2: number, y2: number) => {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y1, 8.5),
        new THREE.Vector3(x2, y2, 8.5),
      ]);
      headGroup.add(new THREE.Line(g, whiskerMat));
    };

    addWhisker(-2, -3.5, -11, -2);
    addWhisker(-2, -4.5, -11, -4.5);
    addWhisker(-2, -5.5, -11, -7);

    addWhisker(2, -3.5, 11, -2);
    addWhisker(2, -4.5, 11, -4.5);
    addWhisker(2, -5.5, 11, -7);

    cat.add(headGroup);

    // 3. 4 PATAS BLANCAS Y MUSLOS CON RAYAS
    const legGeom = new THREE.BoxGeometry(3.2, 13, 3.2);
    const pawGeom = new THREE.BoxGeometry(4.2, 4.5, 5);

    // Pata Delantera Izquierda
    const frontLegL = new THREE.Mesh(legGeom, furBrown);
    frontLegL.position.set(-3.2, 6.5, 6);
    const pawFrontL = new THREE.Mesh(pawGeom, whiteMat);
    pawFrontL.position.set(-3.2, 2.2, 7.5);
    cat.add(frontLegL);
    cat.add(pawFrontL);

    // Pata Delantera Derecha (Pata Activa)
    const frontLegRGroup = new THREE.Group();
    frontLegRGroup.position.set(3.2, 11, 4.5);
    const frontLegR = new THREE.Mesh(legGeom, furBrown);
    frontLegR.position.y = -4.5;
    const pawFrontR = new THREE.Mesh(pawGeom, whiteMat);
    pawFrontR.position.set(0, -9, 2);
    frontLegRGroup.add(frontLegR);
    frontLegRGroup.add(pawFrontR);
    cat.add(frontLegRGroup);

    // Patas traseras exteriores
    const backPawL = new THREE.Mesh(pawGeom, whiteMat);
    backPawL.position.set(-8.5, 2.2, 3);
    cat.add(backPawL);

    const backPawR = new THREE.Mesh(pawGeom, whiteMat);
    backPawR.position.set(8.5, 2.2, 3);
    cat.add(backPawR);

    // Muslos traseros con rayas
    [-1, 1].forEach((dir) => {
      const thigh = new THREE.Mesh(new THREE.BoxGeometry(4.5, 8, 7), furBrown);
      thigh.position.set(dir * 8, 5, 1);
      cat.add(thigh);

      [4, 6.5].forEach((y) => {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 3), furStripe);
        stripe.position.set(dir * 8.2, y, 1.5);
        cat.add(stripe);
      });
    });

    // 4. COLA ARQUEADA CON PUNTA BLANCA
    const tailGroup = new THREE.Group();
    tailGroup.position.set(2, 6, -3);

    const tailPart1Geom = new THREE.BoxGeometry(4.5, 4.5, 12);
    const tailPart1 = new THREE.Mesh(tailPart1Geom, furBrown);
    tailPart1.position.set(5, 5, 2);
    tailPart1.rotation.y = 0.6;
    tailPart1.rotation.x = -0.2;

    const tailTipGeom = new THREE.BoxGeometry(4.8, 4.8, 9);
    const tailTip = new THREE.Mesh(tailTipGeom, whiteMat);
    tailTip.position.set(11, 6, 8);
    tailTip.rotation.y = 0.8;
    tailTip.rotation.x = -0.1;

    tailGroup.add(tailPart1);
    tailGroup.add(tailTip);
    cat.add(tailGroup);

    scene.add(cat);

    // ==========================================
    // VASO 3D PEGADO AL GATO Y A LOS NÚMEROS
    // ==========================================
    const initialGlassX = 8.5;
    const initialGlassZ = 6.5;

    const glassGroup = new THREE.Group();
    glassGroup.position.set(initialGlassX, 0, initialGlassZ);

    const glassGeom = new THREE.CylinderGeometry(3.4, 2.6, 9, 8, 1, true);
    const glassMesh = new THREE.Mesh(glassGeom, glassMat);
    glassMesh.position.y = 4.5;
    glassGroup.add(glassMesh);

    const waterGeom = new THREE.CylinderGeometry(3.0, 2.4, 7, 8);
    const waterMesh = new THREE.Mesh(waterGeom, waterMat);
    waterMesh.position.y = 3.8;
    glassGroup.add(waterMesh);

    // Rodaja de limón
    const lemonGeom = new THREE.CylinderGeometry(1.7, 1.7, 0.4, 6);
    const lemonMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
    const lemon = new THREE.Mesh(lemonGeom, lemonMat);
    lemon.position.set(2.2, 9, 0);
    lemon.rotation.z = Math.PI / 4;
    glassGroup.add(lemon);

    scene.add(glassGroup);

    // ==========================================
    // FÍSICA Y ANIMACIÓN
    // ==========================================
    let isSwatting = false;
    let swatProgress = 0;
    let glassFalling = false;
    let glassAngle = 0;
    let glassX = initialGlassX;
    let time = 0;

    triggerRef.current = () => {
      isSwatting = true;
      swatProgress = 0;
      glassFalling = false;
      glassAngle = 0;
      glassGroup.rotation.set(0, 0, 0);
      glassGroup.position.set(initialGlassX, 0, initialGlassZ);
      glassX = initialGlassX;
    };

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.045;

      // 1. Movimiento orgánico de la cola
      tailGroup.rotation.y = Math.sin(time * 2) * 0.28;
      tailGroup.rotation.z = Math.cos(time * 1.6) * 0.18;
      tailTip.rotation.y = 0.8 + Math.sin(time * 2.5) * 0.3;

      // 2. Respiración y balanceo de cabeza
      if (!isSwatting) {
        headGroup.rotation.y = Math.sin(time * 0.8) * 0.12;
        headGroup.rotation.x = Math.sin(time * 0.5) * 0.06;
      }

      // 3. Zarpazo al vaso pegado
      if (isSwatting) {
        swatProgress += 0.095;

        headGroup.rotation.y = 0.38;
        headGroup.rotation.z = -0.1;

        if (swatProgress < 0.5) {
          frontLegRGroup.rotation.x = -Math.sin(swatProgress * Math.PI) * 1.5;
          frontLegRGroup.rotation.y = Math.sin(swatProgress * Math.PI) * 0.7;
          frontLegRGroup.rotation.z = -Math.sin(swatProgress * Math.PI) * 0.25;
          frontLegRGroup.position.x = 3.2 + Math.sin(swatProgress * Math.PI) * 4.5;
        } else {
          frontLegRGroup.rotation.x *= 0.8;
          frontLegRGroup.rotation.y *= 0.8;
          frontLegRGroup.rotation.z *= 0.8;
          frontLegRGroup.position.x = 3.2;
          if (!glassFalling) {
            glassFalling = true;
          }
        }

        if (swatProgress >= 1.2) {
          isSwatting = false;
        }
      }

      // 4. Caída del vaso
      if (glassFalling) {
        if (glassAngle < Math.PI / 2.1) {
          glassAngle += 0.15;
          glassX += 0.5;
          glassGroup.position.x = glassX;
          glassGroup.position.y = Math.sin(glassAngle) * 1.1;
          glassGroup.rotation.z = -glassAngle;
          glassGroup.rotation.y += 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleClick = (level: number) => {
    onChange(level);
    setIsSpilling(true);
    setSpillKey((prev) => prev + 1);
    if (triggerRef.current) {
      triggerRef.current();
    }
  };

  return (
    <div className="w-full space-y-1.5 select-none relative">
      <div className="relative pt-1 pb-1">
        {/* Contenedor del Gato 3D y los botones */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Canvas WebGL 3D del Gato y el Vaso Pegado */}
          <div
            ref={mountRef}
            onClick={() => handleClick((value + 1) % 6)}
            className="w-[140px] h-[125px] shrink-0 cursor-pointer overflow-visible flex items-center justify-center -ml-4 -my-2 transition-transform hover:scale-105"
            title="¡Haz clic para ver al gato empujar el vaso!"
          />

          {/* Charco de agua animado solo sobre los botones pintados */}
          {isSpilling && (
            <div
              key={`puddle-${spillKey}`}
              className="absolute left-[110px] bottom-1 h-12 pointer-events-none z-10 overflow-hidden"
              style={{ width: `${Math.min(100, Math.max(25, ((value + 1) / 6) * 100))}%` }}
            >
              <div className="water-wave" />
              <div className="water-puddle" />
            </div>
          )}

          {/* Columna con Título Encima y Botones del 0 al 5 */}
          <div className="flex-1 flex flex-col justify-center relative z-20 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-black">
                Nivel de alcoholismo
              </label>
              <span className="text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200">
                {value} / 5 🍸
              </span>
            </div>

            {/* BOTONES DEL 0 AL 5 CON PINTADO ACUMULATIVO */}
            <div className="flex items-center gap-1 sm:gap-1.5 relative">
              {[0, 1, 2, 3, 4, 5].map((lvl) => {
                const isFilled = lvl <= value; // Se pintan todos del 0 hasta el nivel seleccionado
                const isSelected = lvl === value;

                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleClick(lvl)}
                    className={`relative flex-1 h-10 sm:h-11 rounded-xl font-extrabold text-sm transition-all duration-150 flex flex-col items-center justify-center cursor-pointer active:scale-95 ${
                      isFilled
                        ? "bg-black text-white shadow-xs border-2 border-black"
                        : "bg-white text-black border border-gray-200 hover:border-gray-400 hover:bg-gray-50/80"
                    } ${isSelected ? "-translate-y-0.5 scale-105" : ""}`}
                    aria-label={`Nivel de alcoholismo ${lvl}`}
                  >
                    {/* Gotas de agua SOLO en los botones pintados */}
                    {isSpilling && isFilled && (
                      <span
                        className="absolute -top-2.5 text-[10px] animate-pulse"
                        style={{ animationDelay: `${lvl * 75}ms` }}
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
        </div>
      </div>

      <style jsx>{`
        /* Charco líquido derramado */
        @keyframes waterFlow {
          0% {
            width: 0%;
            opacity: 0;
            transform: scaleY(0.4);
          }
          35% {
            width: 70%;
            opacity: 0.6;
            transform: scaleY(1.1);
          }
          70% {
            width: 100%;
            opacity: 0.45;
            transform: scaleY(0.9);
          }
          100% {
            width: 100%;
            opacity: 0.3;
            transform: scaleY(0.8);
          }
        }

        .water-wave {
          position: absolute;
          left: 0;
          bottom: 2px;
          height: 18px;
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.65) 0%, rgba(96, 165, 250, 0.45) 70%, rgba(147, 197, 253, 0.2) 100%);
          border-radius: 12px;
          animation: waterFlow 0.75s ease-out forwards;
        }

        .water-puddle {
          position: absolute;
          left: 5px;
          bottom: 0px;
          width: 95%;
          height: 8px;
          background: rgba(56, 189, 248, 0.4);
          border-radius: 50%;
          filter: blur(2px);
          animation: waterFlow 0.85s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
