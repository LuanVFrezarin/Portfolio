"use client"; // Pra usar hooks do React

import { useState, useEffect } from "react"; // Hooks pro estado e efeitos
import { motion } from "framer-motion"; // Biblioteca de animações

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Posição do mouse
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([]); // Posições pro efeito de rastro
  const [cursorVariant, setCursorVariant] = useState("default"); // Variante do cursor (padrão ou clicado)

  useEffect(() => {
    // Função que atualiza a posição do mouse
    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePosition(newPos);
      
      // Adiciona efeito de rastro mantendo as últimas 5 posições
      setTrailPositions(prev => {
        const newTrail = [newPos, ...prev.slice(0, 4)]; // Mantém 5 posições
        return newTrail;
      });
    };

    // Muda variante pro cursor quando clica
    const handleMouseDown = () => setCursorVariant("clicked");
    const handleMouseUp = () => setCursorVariant("default");

    // Adiciona event listeners pro mouse
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Remove os listeners quando desmonta
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Variantes de animação pro cursor
  const variants = {
    default: {
      x: mousePosition.x - 16, // Centraliza o cursor
      y: mousePosition.y - 16,
      scale: 1, // Tamanho normal
      opacity: 1,
    },
    clicked: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0.8, // Menor quando clica
      opacity: 1,
    },
  };

  return (
    <>
      {/* Efeito de rastro atrás do cursor */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 w-4 h-4 rounded-full bg-cyan-400/20 pointer-events-none z-[9998] hidden md:block"
          animate={{
            x: pos.x - 8, // Centraliza
            y: pos.y - 8,
            scale: (5 - index) * 0.2, // Diminui conforme envelhece
            opacity: (5 - index) * 0.1, // Some aos poucos
          }}
          transition={{
            type: "spring", // Animação elástica
            stiffness: 300,
            damping: 20,
          }}
        />
      ))}

      {/* Cursor principal - círculo maior */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400/70 pointer-events-none z-[9999] hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      {/* Cursor interno - ponto menor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 4, // Centraliza
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000, // Mais rígido pro ponto
          damping: 50,
        }}
      />
    </>
  );
}
