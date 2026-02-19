"use client";

import { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Clock, Zap, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const isCyan = index % 2 === 0;
  const screenshots = project.screenshots ?? (project.image ? [project.image] : []);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (screenshots.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
    >
      <motion.div
        className="w-full h-full"
        whileHover={{
          rotateX: 5,
          rotateY: -5,
          scale: 1.03,
        }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="group relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-md border-2 cursor-pointer"
          onClick={onOpen}
          style={{
            borderColor: isCyan ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 0, 0.3)',
            transform: "translateZ(20px)",
          }}
          whileHover={{
            borderColor: isCyan ? 'cyan' : 'yellow',
            boxShadow: isCyan
              ? '0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 30px rgba(0, 255, 255, 0.05)'
              : '0 0 30px rgba(255, 255, 0, 0.4), inset 0 0 30px rgba(255, 255, 0, 0.05)',
          }}
        >
          {/* Linha animada na borda superior */}
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5"
            style={{
              background: `linear-gradient(90deg, transparent, ${isCyan ? 'cyan' : 'yellow'}, transparent)`,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Padrão de grade no fundo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>

          {/* Área da imagem — Carrossel de screenshots */}
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            {/* Carrossel de fundo */}
            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={screenshots[currentSlide]}
                  alt={`${project.title} screenshot ${currentSlide + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay escuro para legibilidade */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 z-[2]"
              style={{
                background: `linear-gradient(0deg, transparent 49%, ${isCyan ? 'rgba(0,255,255,0.08)' : 'rgba(255,255,0,0.08)'} 50%, transparent 51%)`,
                backgroundSize: '100% 4px',
              }}
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Letra giratória central */}
            <div className="absolute inset-0 flex items-center justify-center z-[3]">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="w-20 h-20 rounded-lg border-2 flex items-center justify-center backdrop-blur-md overflow-hidden"
                  style={{
                    borderColor: isCyan ? 'cyan' : 'yellow',
                    boxShadow: isCyan
                      ? '0 0 25px rgba(0, 255, 255, 0.5)'
                      : '0 0 25px rgba(255, 255, 0, 0.5)',
                    background: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {/* Mini carrossel dentro da letra */}
                  <AnimatePresence>
                    <motion.div
                      key={`inner-${currentSlide}`}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 0.4, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={screenshots[currentSlide]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-black/50" />
                  <motion.span
                    className="text-4xl font-black relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      color: isCyan ? 'cyan' : 'yellow',
                      textShadow: isCyan
                        ? '0 0 20px cyan, 0 0 40px rgba(0,255,255,0.3)'
                        : '0 0 20px yellow, 0 0 40px rgba(255,255,0,0.3)',
                    }}
                  >
                    {project.title[0]}
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>

            {/* Indicadores do carrossel */}
            {screenshots.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-[4]">
                {screenshots.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === currentSlide
                        ? `w-4 ${isCyan ? 'bg-cyan-400' : 'bg-yellow-400'} shadow-sm`
                        : 'w-1.5 bg-white/30'
                    }`}
                    style={i === currentSlide ? {
                      boxShadow: isCyan ? '0 0 8px cyan' : '0 0 8px yellow',
                    } : undefined}
                  />
                ))}
              </div>
            )}

            {/* Overlay que aparece no hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-[5]"
              initial={false}
            >
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.p
                  className="text-sm text-cyan-300 mb-4 line-clamp-3 font-medium"
                  style={{
                    textShadow: '0 0 5px cyan',
                  }}
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  {project.description}
                </motion.p>
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r rounded-lg text-sm font-bold text-black transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${isCyan ? '#06b6d4' : '#eab308'}, ${isCyan ? '#22d3ee' : '#facc15'})`,
                        boxShadow: isCyan
                          ? '0 0 20px rgba(6, 182, 212, 0.5)'
                          : '0 0 20px rgba(234, 179, 8, 0.5)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        boxShadow: isCyan
                          ? '0 0 40px rgba(6, 182, 212, 0.8)'
                          : '0 0 40px rgba(234, 179, 8, 0.8)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.demoUrl, "_blank");
                      }}
                    >
                      <Zap className="w-4 h-4" />
                      <span>ABRIR APP</span>
                    </motion.button>
                  )}
                  {project.githubUrl && (
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-sm border-2 rounded-lg text-sm font-bold text-white transition-all"
                      style={{
                        borderColor: isCyan ? 'cyan' : 'yellow',
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        backgroundColor: isCyan ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 0, 0.2)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, "_blank");
                      }}
                    >
                      <Github className="w-4 h-4" />
                      <span>CÓDIGO</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 relative z-10 bg-gradient-to-b from-transparent to-black/30 border-t border-white/5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <motion.h3
                className="text-lg font-black text-white truncate flex-1"
                style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.3)',
                }}
              >
                {project.title}
              </motion.h3>
              <Badge
                variant="outline"
                className="shrink-0 px-2 py-1 text-xs font-bold border-2"
                style={{
                  borderColor: isCyan ? 'cyan' : 'yellow',
                  color: isCyan ? 'cyan' : 'yellow',
                  backgroundColor: `${isCyan ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 0, 0.1)'}`,
                  textShadow: isCyan ? '0 0 10px cyan' : '0 0 10px yellow',
                }}
              >
                <Clock className="w-3 h-3 mr-1" />
                {project.status}
              </Badge>
            </div>

            {/* Descrição visível */}
            <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                    (index + techIndex) % 2 === 0
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                      : 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 4 && (
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/5 border border-white/20 text-white/60"
                >
                  +{project.technologies.length - 4}
                </motion.span>
              )}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-2 h-2 border-l-2 border-t-2 border-cyan-500" />
          <div className="absolute top-2 right-2 w-2 h-2 border-r-2 border-t-2 border-yellow-500" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-l-2 border-b-2 border-yellow-500" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-r-2 border-b-2 border-cyan-500" />

          {/* Mobile icon on hover */}
          <motion.div
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Smartphone className={`w-5 h-5 ${isCyan ? 'text-cyan-400' : 'text-yellow-400'}`} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
