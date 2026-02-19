"use client";

import { useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Clock, Zap, Smartphone, Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const screenshots = project?.screenshots ?? (project?.image ? [project.image] : []);

  // Reset slide when project changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [project?.id]);

  if (!project) return null;

  const isCyan = project.id % 2 === 0;

  const prevSlide = () => setCurrentSlide((p) => (p - 1 + screenshots.length) % screenshots.length);
  const nextSlide = () => setCurrentSlide((p) => (p + 1) % screenshots.length);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.8), rgba(0,0,0,0.95))',
            }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>
          </motion.div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[61] w-full sm:max-w-2xl max-h-[90vh] overflow-hidden rounded-xl bg-black/90 border-2 shadow-2xl"
            style={{
              borderColor: isCyan ? 'cyan' : 'yellow',
              boxShadow: isCyan
                ? '0 0 50px rgba(0, 255, 255, 0.3), 0 0 100px rgba(0, 255, 255, 0.1)'
                : '0 0 50px rgba(255, 255, 0, 0.3), 0 0 100px rgba(255, 255, 0, 0.1)',
            }}
          >
            {/* Scanning line */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-[10]"
              style={{
                background: `linear-gradient(0deg, transparent 49%, ${isCyan ? 'rgba(0,255,255,0.1)' : 'rgba(255,255,0,0.1)'} 50%, transparent 51%)`,
                backgroundSize: '100% 8px',
              }}
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Header — Screenshot Carousel */}
            <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
              {screenshots.length > 0 ? (
                <>
                  <AnimatePresence>
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={screenshots[currentSlide]}
                        alt={`${project.title} screenshot ${currentSlide + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 672px"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-[1]" />

                  {/* Navigation arrows */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-[3] p-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:border-white/60 transition-all text-white"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-[3] p-2 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm hover:bg-black/70 hover:border-white/60 transition-all text-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-[3]">
                        {screenshots.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === currentSlide
                                ? `w-6 ${isCyan ? 'bg-cyan-400' : 'bg-yellow-400'}`
                                : 'w-2 bg-white/40'
                            }`}
                            style={i === currentSlide ? {
                              boxShadow: isCyan ? '0 0 8px cyan' : '0 0 8px yellow',
                            } : undefined}
                          />
                        ))}
                      </div>

                      {/* Counter */}
                      <div className="absolute top-3 left-3 z-[3] px-3 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/20">
                        <span className="text-white/80 text-xs font-bold">{currentSlide + 1} / {screenshots.length}</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <motion.div
                        className="w-24 h-24 rounded-lg bg-black/50 border-4 flex items-center justify-center backdrop-blur-sm"
                        style={{
                          borderColor: isCyan ? 'cyan' : 'yellow',
                          boxShadow: isCyan ? '0 0 30px rgba(0, 255, 255, 0.5)' : '0 0 30px rgba(255, 255, 0, 0.5)',
                        }}
                      >
                        <span className="text-5xl font-black" style={{ color: isCyan ? 'cyan' : 'yellow' }}>
                          {project.title[0]}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 z-[5] p-3 rounded-lg border-2 bg-black/50 backdrop-blur-sm transition-all"
                style={{
                  borderColor: 'rgba(255, 0, 0, 0.5)',
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  borderColor: 'red',
                  boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5 text-red-400" />
              </motion.button>

              {/* Corner accents */}
              <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 z-[2] ${isCyan ? 'border-cyan-500' : 'border-yellow-500'}`} />
              <div className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 z-[2] ${isCyan ? 'border-cyan-500' : 'border-yellow-500'}`} />
              <div className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 z-[2] ${isCyan ? 'border-cyan-500' : 'border-yellow-500'}`} />
              <div className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 z-[2] ${isCyan ? 'border-cyan-500' : 'border-yellow-500'}`} />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
              {/* Category and Status */}
              <div className="flex items-center gap-4 mb-6">
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-bold border-2"
                  style={{
                    borderColor: isCyan ? 'cyan' : 'yellow',
                    color: isCyan ? 'cyan' : 'yellow',
                    backgroundColor: `${isCyan ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 0, 0.1)'}`,
                    textShadow: isCyan ? '0 0 10px cyan' : '0 0 10px yellow',
                  }}
                >
                  <Terminal className="w-3 h-3 mr-2" />
                  {project.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-bold border-2"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Clock className="w-3 h-3 mr-2" />
                  {project.status}
                </Badge>
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-black mb-4"
                style={{
                  color: isCyan ? 'cyan' : 'yellow',
                  textShadow: isCyan
                    ? '0 0 20px cyan, 0 0 40px rgba(0, 255, 255, 0.5)'
                    : '0 0 20px yellow, 0 0 40px rgba(255, 255, 0, 0.5)',
                }}
              >
                {project.title}
              </motion.h2>

              {/* Short Description */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-cyan-300 mb-6 font-medium"
                style={{
                  textShadow: '0 0 10px cyan',
                }}
              >
                {project.description}
              </motion.p>

              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-xs font-bold text-white/60 mb-2 uppercase tracking-widest">
                  INFORMAÇÕES DO APP
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {project.fullDescription}
                </p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h3 className="text-xs font-bold text-white/60 mb-4 uppercase tracking-widest">
                  STACK TECNOLÓGICA
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${
                        index % 2 === 0
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                          : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'
                      }`}
                      style={{
                        textShadow: index % 2 === 0
                          ? '0 0 10px cyan'
                          : '0 0 10px yellow',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.demoUrl && (
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base font-black flex items-center gap-3"
                    style={{
                      background: `linear-gradient(135deg, ${isCyan ? '#06b6d4' : '#eab308'}, ${isCyan ? '#22d3ee' : '#facc15'})`,
                      color: 'black',
                      boxShadow: isCyan
                        ? '0 0 30px rgba(6, 182, 212, 0.5)'
                        : '0 0 30px rgba(234, 179, 8, 0.5)',
                    }}
                    asChild
                  >
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: isCyan
                          ? '0 0 50px rgba(6, 182, 212, 0.8)'
                          : '0 0 50px rgba(234, 179, 8, 0.8)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3"
                    >
                      <Zap className="w-5 h-5" />
                      <span>ABRIR APP</span>
                    </motion.a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-base font-black flex items-center gap-3 border-2"
                    style={{
                      borderColor: isCyan ? 'cyan' : 'yellow',
                      color: isCyan ? 'cyan' : 'yellow',
                      backgroundColor: `${isCyan ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 0, 0.1)'}`,
                    }}
                    asChild
                  >
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: `${isCyan ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 255, 0, 0.2)'}`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3"
                    >
                      <Github className="w-5 h-5" />
                      <span>CÓDIGO FONTE</span>
                    </motion.a>
                  </Button>
                )}
              </div>
            </div>

            {/* Bottom line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background: `linear-gradient(90deg, transparent, ${isCyan ? 'cyan' : 'yellow'}, transparent)`,
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
