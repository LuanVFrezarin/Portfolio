"use client";

import { useState, useMemo, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Zap, Rocket, Terminal, Smartphone, MapPin, GraduationCap, Briefcase, Shield, Code2, Database, Cloud, Server, Globe, Bot } from "lucide-react";
import { CategoryFilter } from "@/components/portfolio/CategoryFilter";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { Button } from "@/components/ui/button";
import { Project as ProjectType } from "@/data/projects";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HomeContentProps {
    initialProjects: ProjectType[];
    categories: string[];
}

export function HomeContent({ initialProjects, categories }: HomeContentProps) {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mainRef = useRef<HTMLElement>(null);

    const filteredProjects = useMemo(() => {
        if (activeCategory === "Todos") {
            return initialProjects;
        }
        return initialProjects.filter((project) => project.category === activeCategory);
    }, [activeCategory, initialProjects]);

    const handleProjectClick = (project: ProjectType) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    // GSAP ScrollTrigger — efeito falling só Hero → Featured
    useLayoutEffect(() => {
        if (!mainRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            const heroSection = mainRef.current!.querySelector(".falling-hero");
            const featuredSection = mainRef.current!.querySelector(".falling-featured");
            const featuredContainer = featuredSection?.querySelector(".falling-container");

            if (!heroSection || !featuredSection || !featuredContainer) return;

            // Pin do Hero enquanto o Featured cai
            ScrollTrigger.create({
                trigger: heroSection,
                start: "bottom bottom",
                end: "bottom top",
                pin: true,
                pinSpacing: false,
            });

            // Rotação do FeaturedProject: 30deg → 0deg
            gsap.fromTo(
                featuredContainer,
                { rotation: 30 },
                {
                    rotation: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: featuredSection,
                        start: "top bottom",
                        end: "top 20%",
                        scrub: true,
                    },
                }
            );
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <main ref={mainRef} className="flex-grow">
            {/* ══ HERO (pina enquanto Featured cai) ══ */}
            <section className="falling-hero">
                <div className="falling-container bg-black">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative min-h-screen flex justify-center overflow-hidden pt-60"
                    >
                        {/* Fundo animado com gradientes */}
                        <div className="absolute inset-0">
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-3xl"
                            />
                            <motion.div
                                animate={{ scale: [1.5, 1, 1.5], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-3xl"
                            />
                            {/* Grade de fundo estilo matrix */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
                            </div>

                            {/* Efeitos visuais subindo */}
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-0.5 bg-gradient-to-t from-cyan-400 to-transparent"
                                    style={{
                                        left: `${i * 5}%`,
                                        height: '200px',
                                        bottom: `${20 + (i % 3) * 20}%`,
                                    }}
                                    animate={{
                                        y: [0, -300],
                                        opacity: [0, 0.8, 0],
                                    }}
                                    transition={{
                                        duration: 4 + i * 0.1,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "linear",
                                    }}
                                />
                            ))}

                            {/* Partículas flutuantes */}
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={`particle-${i}`}
                                    className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        bottom: `${Math.random() * 80}%`,
                                    }}
                                    animate={{
                                        y: [0, -200],
                                        x: [0, Math.random() * 80 - 40],
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 3,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}

                            {/* Linhas diagonais */}
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={`line-${i}`}
                                    className="absolute h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
                                    style={{
                                        width: '250px',
                                        bottom: `${10 + (i % 4) * 20}%`,
                                        left: `${i * 8}%`,
                                        transform: 'rotate(-15deg)',
                                    }}
                                    animate={{
                                        y: [0, -350],
                                        opacity: [0, 0.6, 0],
                                    }}
                                    transition={{
                                        duration: 5 + i * 0.2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "easeIn",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Conteúdo do hero */}
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mb-6"
                            >
                                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/50 bg-black/50 backdrop-blur-sm">
                                    <Terminal className="w-5 h-5 text-cyan-400" />
                                    <span className="text-cyan-400 font-bold text-sm tracking-wider">
                                        PORTFÓLIO LUAN FREZARIN v2.0
                                    </span>
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-white"
                            >
                                <span className="glitch-text" data-text="LUAN">LUAN</span>{" "}
                                <span className="text-cyan-400 shadow-cyan-500/50 glitch-text" data-text="FREZARIN">
                                    FREZARIN
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl sm:text-2xl md:text-3xl text-yellow-400 font-bold mb-8 max-w-2xl mx-auto"
                            >
                                DESENVOLVEDOR MOBILE
                                <br />
                                <span className="text-cyan-400">&amp; SISTEMAS WEB</span>
                            </motion.p>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="w-full flex justify-center"
                            >
                                <button
                                    onClick={() => {
                                        const featuredSection = document.getElementById('featured')
                                        if (featuredSection) {
                                            featuredSection.scrollIntoView({ behavior: 'smooth' })
                                        }
                                    }}
                                    className="flex items-center justify-center gap-2 text-cyan-400 hover:text-yellow-400 transition-colors cursor-pointer group"
                                >
                                    <ArrowDown className="w-6 h-6 animate-bounce group-hover:text-yellow-400" />
                                    <span className="text-sm font-bold tracking-widest group-hover:text-yellow-400">INICIAR SISTEMA</span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ FEATURED PROJECT (cai com rotação sobre o Hero) ══ */}
            <section id="featured" className="falling-featured">
                <div className="falling-container bg-black">
                    <FeaturedProject />
                </div>
            </section>

            {/* ════════ SEÇÃO SOBRE MIM ════════ */}
            <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.15, 0.06] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-yellow-500/15 rounded-full blur-[80px]"
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Título */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-cyan-500/30 bg-black/50 backdrop-blur-sm mb-6">
                            <Code2 className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-bold text-xs tracking-[0.3em] uppercase">Quem sou eu</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
                            SOBRE <span className="text-yellow-400">MIM</span>
                        </h2>
                    </motion.div>

                    {/* Grid: Foto + Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

                        {/* Coluna esquerda: Foto + Info rápida */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 flex flex-col items-center"
                        >
                            {/* Foto */}
                            <div className="relative mb-8">
                                <motion.div
                                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 rounded-2xl blur-xl bg-cyan-400/25 scale-105"
                                />
                                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl border-2 border-cyan-500/50 overflow-hidden bg-gradient-to-br from-cyan-950/50 to-black shadow-2xl shadow-cyan-500/10">
                                    <Image
                                        src="/eu/luan.png"
                                        alt="Luan Frezarin"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 224px, 256px"
                                        priority
                                    />
                                    {/* Scanline overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none" />
                                </div>
                            </div>

                            {/* Nome e cargo */}
                            <h3 className="text-2xl font-black text-white mb-1">LUAN FREZARIN</h3>
                            <p className="text-cyan-400 font-bold text-sm tracking-wider mb-4">DESENVOLVEDOR FULL STACK</p>

                            {/* Info cards */}
                            <div className="w-full space-y-3">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-cyan-500/20 bg-black/40">
                                    <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                                    <span className="text-white/80 text-sm">São Paulo, SP</span>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-cyan-500/20 bg-black/40">
                                    <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                                    <span className="text-white/80 text-sm">Tecnologia da Informação — UNINOVE</span>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-cyan-500/20 bg-black/40">
                                    <Shield className="w-4 h-4 text-yellow-400 shrink-0" />
                                    <span className="text-white/80 text-sm">Cabo — Exército Brasileiro</span>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-cyan-500/20 bg-black/40">
                                    <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                                    <span className="text-white/80 text-sm">Dev Full Stack — UPDA Technologies</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Coluna direita: Bio + Skills + Timeline */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3 space-y-8"
                        >
                            {/* Bio */}
                            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-sm">
                                <p className="text-white/75 text-base leading-relaxed mb-4">
                                    Desenvolvedor Full Stack com <span className="text-cyan-400 font-bold">app mobile em produção</span> na Play Store e App Store.
                                    Construí do zero uma rede social mobile completa com sistema de monetização, backend robusto, cache Redis, armazenamento AWS S3 e integração com IA.
                                </p>
                                <p className="text-white/75 text-base leading-relaxed mb-4">
                                    Minha jornada começou no <span className="text-yellow-400 font-bold">Exército Brasileiro</span>, onde desenvolvi liderança, resiliência e disciplina liderando equipes de até 12 pessoas. Hoje aplico essa mentalidade no desenvolvimento de software: <span className="text-cyan-400 font-bold">entregar resultados completos</span>, do banco de dados às lojas de aplicativos.
                                </p>
                                <p className="text-white/75 text-base leading-relaxed">
                                    Atualmente desenvolvendo aplicações web fullstack na <span className="text-yellow-400 font-bold">UPDA Technologies</span> e cursando Tecnologia da Informação na UNINOVE.
                                </p>
                            </div>

                            {/* Skills Grid */}
                            <div>
                                <p className="text-yellow-400 font-black tracking-[0.2em] text-xs mb-4 uppercase">Habilidades Técnicas</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {[
                                        { icon: Smartphone, name: "React Native", color: "cyan" },
                                        { icon: Globe, name: "Next.js / React", color: "cyan" },
                                        { icon: Code2, name: "TypeScript", color: "yellow" },
                                        { icon: Server, name: "Node.js", color: "yellow" },
                                        { icon: Database, name: "PostgreSQL", color: "cyan" },
                                        { icon: Zap, name: "Redis", color: "yellow" },
                                        { icon: Cloud, name: "AWS S3 / Docker", color: "cyan" },
                                        { icon: Bot, name: "LLM / IA", color: "yellow" },
                                        { icon: Shield, name: "JWT / Auth", color: "cyan" },
                                    ].map(({ icon: Icon, name, color }, i) => (
                                        <motion.div
                                            key={name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.03 * i }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all cursor-default ${
                                                color === "cyan"
                                                    ? "border-cyan-500/25 bg-cyan-500/5 hover:border-cyan-400/50"
                                                    : "border-yellow-500/25 bg-yellow-500/5 hover:border-yellow-400/50"
                                            }`}
                                        >
                                            <Icon className={`w-4 h-4 shrink-0 ${color === "cyan" ? "text-cyan-400" : "text-yellow-400"}`} />
                                            <span className={`text-xs font-bold ${color === "cyan" ? "text-cyan-300" : "text-yellow-300"}`}>
                                                {name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Diferenciais */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { title: "App em Produção", desc: "Experiência real de desenvolvimento, deploy e manutenção em ambas as lojas", color: "cyan" },
                                    { title: "Full Stack Completo", desc: "Do banco de dados ao app store — capacidade de levar projetos do zero ao deploy", color: "yellow" },
                                    { title: "IA na Prática", desc: "Integração de LLMs em apps reais para moderação de conteúdo e features inteligentes", color: "cyan" },
                                    { title: "Liderança Militar", desc: "Gestão de equipes, resiliência sob pressão e documentação técnica do Exército Brasileiro", color: "yellow" },
                                ].map(({ title, desc, color }, i) => (
                                    <motion.div
                                        key={title}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.05 * i }}
                                        viewport={{ once: true }}
                                        className={`p-4 rounded-xl border bg-gradient-to-br from-black/60 to-black/40 ${
                                            color === "cyan" ? "border-cyan-500/25" : "border-yellow-500/25"
                                        }`}
                                    >
                                        <p className={`font-black text-sm mb-1 ${color === "cyan" ? "text-cyan-400" : "text-yellow-400"}`}>
                                            {title}
                                        </p>
                                        <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Linha divisória */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mt-20 max-w-4xl mx-auto"
                    />
                </div>
            </section>

            {/* Seção Projetos */}
            <section id="projects" className="py-16 sm:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-4 mb-6">
                            <Smartphone className="w-8 h-8 text-cyan-400" />
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                                BANCO DE <span className="text-cyan-400 ml-2">PROJETOS</span>
                            </h2>
                        </div>
                    </div>

                    {/* Filtros das categorias */}
                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    {/* Grid dos projetos */}
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onOpen={() => handleProjectClick(project)}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Seção Contato */}
            <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-4 mb-6">
                            <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                                <span className="text-cyan-400 font-bold text-lg">@</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                                CONTATO <span className="text-cyan-400 ml-2">&</span> REDES
                            </h2>
                        </div>
                        <p className="text-cyan-300 text-lg sm:text-xl max-w-2xl mx-auto">
                            Vamos conversar sobre seu próximo projeto! Entre em contato pelas redes sociais ou email.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* WhatsApp */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <motion.a
                                    href="https://wa.me/5511913471500"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border-2 border-cyan-500/30 hover:border-cyan-400 transition-all"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <motion.div
                                            className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <span className="text-cyan-400 font-bold text-xl">💬</span>
                                        </motion.div>
                                        <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                                        <p className="text-cyan-300 text-sm">(11) 91347-1500</p>
                                    </div>
                                </motion.a>
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <motion.a
                                    href="mailto:luan.v.frezarin@gmail.com"
                                    className="block p-6 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border-2 border-cyan-500/30 hover:border-cyan-400 transition-all"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <motion.div
                                            className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <span className="text-cyan-400 font-bold text-xl">@</span>
                                        </motion.div>
                                        <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                                        <p className="text-cyan-300 text-sm">luan.v.frezarin@gmail.com</p>
                                    </div>
                                </motion.a>
                            </motion.div>

                            {/* LinkedIn */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <motion.a
                                    href="https://www.linkedin.com/in/luan-frezarin-6a4058359/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border-2 border-cyan-500/30 hover:border-cyan-400 transition-all"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <motion.div
                                            className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <span className="text-cyan-400 font-bold text-xl">in</span>
                                        </motion.div>
                                        <h3 className="text-lg font-bold text-white mb-2">LinkedIn</h3>
                                        <p className="text-cyan-300 text-sm">Conecte-se comigo</p>
                                    </div>
                                </motion.a>
                            </motion.div>

                            {/* GitHub */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <motion.a
                                    href="https://github.com/LuanVFrezarin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 rounded-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border-2 border-cyan-500/30 hover:border-cyan-400 transition-all"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <motion.div
                                            className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-4"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <span className="text-cyan-400 font-bold text-xl">G</span>
                                        </motion.div>
                                        <h3 className="text-lg font-bold text-white mb-2">GitHub</h3>
                                        <p className="text-cyan-300 text-sm">Veja meus projetos</p>
                                    </div>
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* Mensagem final */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <p className="text-yellow-400 text-lg font-bold">
                                Pronto para transformar sua ideia em realidade?
                            </p>
                            <p className="text-cyan-300 mt-2">
                                Vamos criar algo incrível juntos! 🚀
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Modal do projeto selecionado */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}
