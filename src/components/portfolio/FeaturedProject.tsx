"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Smartphone,
  Server,
  Cloud,
  Database,
  MapPin,
  Zap,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star,
  Globe,
  Download,
  Shield,
  BookOpen,
  Flame,
  Cpu,
  Layers,
} from "lucide-react";
import Image from "next/image";

const LINKTREE_URL = "https://linktr.ee/ehojebora";

const SCREENSHOTS = [
  { src: "/ehoje/screenshot4.png", label: "Descobrir Bares" },
  { src: "/ehoje/screenshot1.png", label: "Perfil do Bar" },
  { src: "/ehoje/screenshot2.png", label: "Chat Global" },
  { src: "/ehoje/screenshot3.png", label: "Visão Geral" },
];

const TECH_STACK = [
  { name: "React Native", icon: Smartphone, color: "cyan" },
  { name: "Node.js", icon: Server, color: "yellow" },
  { name: "PostgreSQL", icon: Database, color: "cyan" },
  { name: "Redis", icon: Zap, color: "yellow" },
  { name: "AWS S3", icon: Cloud, color: "cyan" },
  { name: "Google Maps", icon: MapPin, color: "yellow" },
  { name: "REST API", icon: Globe, color: "cyan" },
  { name: "JWT Auth", icon: Shield, color: "yellow" },
];

const ACHIEVEMENTS = [
  { icon: "🍎", title: "App Store", desc: "Publicado na loja da Apple", color: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/40", glow: "shadow-cyan-500/20" },
  { icon: "🤖", title: "Google Play", desc: "Publicado na loja Android", color: "from-yellow-500/20 to-yellow-900/10 border-yellow-500/40", glow: "shadow-yellow-500/20" },
  { icon: "🗄️", title: "Backend Próprio", desc: "API completa do zero", color: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/40", glow: "shadow-cyan-500/20" },
  { icon: "☁️", title: "AWS S3", desc: "Upload de fotos em nuvem", color: "from-yellow-500/20 to-yellow-900/10 border-yellow-500/40", glow: "shadow-yellow-500/20" },
  { icon: "🗺️", title: "Google Maps", desc: "Integração geolocalização", color: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/40", glow: "shadow-cyan-500/20" },
  { icon: "⚡", title: "Redis Cache", desc: "Performance em tempo real", color: "from-yellow-500/20 to-yellow-900/10 border-yellow-500/40", glow: "shadow-yellow-500/20" },
  { icon: "🚀", title: "Deploy Completo", desc: "Produção na nuvem", color: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/40", glow: "shadow-cyan-500/20" },
  { icon: "🏗️", title: "Full Stack", desc: "Do banco ao app store", color: "from-yellow-500/20 to-yellow-900/10 border-yellow-500/40", glow: "shadow-yellow-500/20" },
];

const STORY_STEPS = [
  {
    icon: BookOpen,
    label: "01 — Ideia & Pesquisa",
    text: "Tudo começou do zero. Pesquisei o mercado, estudei arquiteturas de apps mobile e defini o escopo do produto sozinho.",
    color: "cyan",
  },
  {
    icon: Layers,
    label: "02 — Arquitetura",
    text: "Estruturei banco de dados, endpoints, fluxo de autenticação JWT, cache com Redis e toda a lógica de geolocalização.",
    color: "yellow",
  },
  {
    icon: Cpu,
    label: "03 — Desenvolvimento",
    text: "Desenvolvi o frontend em React Native e o backend em Node.js, integrando AWS S3 para fotos e Google Maps para localização.",
    color: "cyan",
  },
  {
    icon: Flame,
    label: "04 — Deploy & Lojas",
    text: "Subi a infra na nuvem, configurei CI/CD e passei pelo processo completo de publicação na App Store e no Google Play — um puta trabalhão.",
    color: "yellow",
  },
];

type Tab = "destaque" | "historia";

export function FeaturedProject() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("destaque");

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SCREENSHOTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const prev = () => {
    setAutoplay(false);
    setCurrentSlide((p) => (p - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  };
  const next = () => {
    setAutoplay(false);
    setCurrentSlide((p) => (p + 1) % SCREENSHOTS.length);
  };

  return (
    <div className="relative py-20 sm:py-32 overflow-hidden">
      {/* ── Fundo épico ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black" />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-60 -left-40 w-[700px] h-[700px] bg-cyan-500/25 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-yellow-500/15 rounded-full blur-[100px]"
        />
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? "bg-cyan-400/40" : "bg-yellow-400/30"}`}
            style={{ left: `${(i * 4.1) % 100}%`, top: `${(i * 7.3) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Badge coroa ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-md bg-yellow-400/40"
            />
            <div className="relative inline-flex items-center gap-3 px-8 py-3 rounded-full border-2 border-yellow-400/70 bg-black/70 backdrop-blur-sm">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-sm tracking-[0.3em] uppercase">
                Projeto Principal
              </span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        </motion.div>

        {/* ── Título ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">🍺</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
            BARES EM
            <br />
            <span className="text-cyan-400" style={{ textShadow: "0 0 40px rgba(34,211,238,0.6)" }}>
              TODO BRASIL
            </span>
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-yellow-400/90 font-bold max-w-2xl mx-auto">
            App completo — do banco de dados às lojas, cada detalhe construído do zero.
          </p>
        </motion.div>

        {/* ── Linha divisória ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-12 max-w-2xl mx-auto"
        />

        {/* ── Tabs ── */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl border border-cyan-500/30 bg-black/50 backdrop-blur-sm p-1 gap-1">
            {(["destaque", "historia"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg font-black text-sm tracking-widest uppercase transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-black shadow-lg shadow-cyan-500/30"
                    : "text-cyan-400/60 hover:text-cyan-400"
                }`}
              >
                {tab === "destaque" ? "📱 O App" : "📖 A História"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Conteúdo das Tabs ── */}
        <AnimatePresence mode="wait">

          {/* TAB: O APP */}
          {activeTab === "destaque" && (
            <motion.div
              key="destaque"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Layout: screenshots + info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

                {/* Carrossel */}
                <div className="flex flex-col items-center">
                  <div className="relative w-64 sm:w-72">
                    <motion.div
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-[2.5rem] blur-2xl bg-cyan-400/30 scale-110"
                    />
                    <div className="relative bg-gray-900 rounded-[2.5rem] border-2 border-cyan-500/60 p-2 shadow-2xl shadow-cyan-500/20">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-20" />
                      <div className="relative rounded-[2rem] overflow-hidden aspect-[9/19.5] bg-black">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={SCREENSHOTS[currentSlide].src}
                              alt={SCREENSHOTS[currentSlide].label}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 256px, 288px"
                            />
                          </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_3px] z-10" />
                      </div>
                      <div className="flex justify-center mt-2">
                        <div className="w-20 h-1 bg-cyan-500/40 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <button onClick={prev} className="p-2 rounded-full border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-cyan-400">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                      {SCREENSHOTS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setAutoplay(false); setCurrentSlide(i); }}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === currentSlide ? "w-6 bg-cyan-400 shadow-sm shadow-cyan-400" : "w-2 bg-cyan-400/30"
                          }`}
                        />
                      ))}
                    </div>
                    <button onClick={next} className="p-2 rounded-full border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-cyan-400">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-3 text-cyan-400/60 text-sm font-bold tracking-wider">
                    {SCREENSHOTS[currentSlide].label.toUpperCase()}
                  </p>
                </div>

                {/* Info */}
                <div className="space-y-8">
                  <div className="p-6 rounded-2xl border border-cyan-500/20 bg-black/50 backdrop-blur-sm">
                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                      Não é só um frontend. Eu{" "}
                      <span className="text-cyan-400 font-bold">arquitetei</span>,{" "}
                      <span className="text-yellow-400 font-bold">estudei</span> e{" "}
                      <span className="text-cyan-400 font-bold">construí do zero</span>{" "}
                      um ecossistema completo: app mobile, backend robusto, armazenamento em nuvem,
                      geolocalização em tempo real, cache com Redis e{" "}
                      <span className="text-yellow-400 font-bold">publicação nas duas principais lojas</span>{" "}
                      do mundo.
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <p className="text-yellow-400 font-black tracking-[0.2em] text-xs mb-4 uppercase">
                      Stack Tecnológica
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TECH_STACK.map(({ name, icon: Icon, color }, i) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.05 * i }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-default ${
                            color === "cyan"
                              ? "border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-400/60 hover:bg-cyan-500/10"
                              : "border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-400/60 hover:bg-yellow-500/10"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${color === "cyan" ? "text-cyan-400" : "text-yellow-400"}`} />
                          <span className={`text-xs font-bold ${color === "cyan" ? "text-cyan-300" : "text-yellow-300"}`}>
                            {name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a
                      href={LINKTREE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative group flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-black text-black text-sm tracking-widest overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
                        boxShadow: "0 0 30px rgba(34,211,238,0.4)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.4 }}
                      />
                      <Download className="w-5 h-5" />
                      BAIXAR O APP
                    </motion.a>
                    <motion.a
                      href="https://github.com/LuanVFrezarin"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white text-sm tracking-widest border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      VER CÓDIGO
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Conquistas */}
              <div>
                <div className="text-center mb-8">
                  <p className="text-yellow-400 font-black tracking-[0.3em] text-xs uppercase">
                    ⚡ Conquistas Técnicas
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ACHIEVEMENTS.map(({ icon, title, desc, color, glow }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 * i }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className={`relative p-4 rounded-xl border bg-gradient-to-br cursor-default shadow-lg ${color} ${glow} transition-all`}
                    >
                      <div className="text-2xl mb-2">{icon}</div>
                      <p className="text-white font-black text-sm leading-tight">{title}</p>
                      <p className="text-white/50 text-xs mt-1 leading-snug">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: A HISTÓRIA */}
          {activeTab === "historia" && (
            <motion.div
              key="historia"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12 p-8 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-black/60 backdrop-blur-sm text-center"
              >
                <span className="text-5xl block mb-5">🔥</span>
                <p className="text-white text-lg sm:text-xl leading-relaxed font-medium">
                  Esse projeto não nasceu com um tutorial. Nasceu com{" "}
                  <span className="text-yellow-400 font-black">muita pesquisa</span>,{" "}
                  <span className="text-cyan-400 font-black">erros, tentativas</span>{" "}
                  e a determinação de construir algo{" "}
                  <span className="text-yellow-400 font-black">real, completo e publicado</span>.
                  Do zero. Sozinho.
                </p>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                {/* Linha vertical */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-yellow-400/40 to-transparent" />

                <div className="space-y-10">
                  {STORY_STEPS.map(({ icon: Icon, label, text, color }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                      className="relative flex gap-6 pl-20"
                    >
                      {/* Ícone na linha */}
                      <div
                        className={`absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 shadow-lg ${
                          color === "cyan"
                            ? "border-cyan-500/60 bg-cyan-500/10 shadow-cyan-500/20"
                            : "border-yellow-500/60 bg-yellow-500/10 shadow-yellow-500/20"
                        }`}
                      >
                        <Icon
                          className={`w-7 h-7 ${color === "cyan" ? "text-cyan-400" : "text-yellow-400"}`}
                        />
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 pt-2">
                        <p
                          className={`text-xs font-black tracking-[0.2em] uppercase mb-2 ${
                            color === "cyan" ? "text-cyan-400" : "text-yellow-400"
                          }`}
                        >
                          {label}
                        </p>
                        <p className="text-white/80 text-base leading-relaxed">{text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Conclusão */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-14 p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-black/60 backdrop-blur-sm"
              >
                <p className="text-cyan-300 text-base sm:text-lg leading-relaxed text-center font-medium">
                  O resultado? Um app funcional, publicado nas lojas,{" "}
                  <span className="text-white font-black">usado por pessoas reais</span>.
                  Esse projeto prova que não apenas codifico — eu{" "}
                  <span className="text-cyan-400 font-black">entrego produtos completos</span>.
                </p>

                <div className="flex justify-center mt-8">
                  <motion.a
                    href={LINKTREE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center gap-3 px-8 py-4 rounded-xl font-black text-black text-sm tracking-widest overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
                      boxShadow: "0 0 30px rgba(34,211,238,0.4)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                    <Download className="w-5 h-5" />
                    BAIXAR AGORA
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Linha final */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mt-20"
        />
      </div>
    </div>
  );
}
