"use client";

import { Github, Linkedin, Mail, Zap, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 bg-black/80 backdrop-blur-sm relative overflow-hidden"
      style={{
        borderColor: 'rgba(0, 255, 255, 0.2)',
      }}
    >
      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'linear-gradient(0deg, transparent 49%, rgba(0,255,255,0.2) 50%, transparent 51%)',
          backgroundSize: '100% 4px',
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

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-gray-400 mb-1">
              © 2025 <span className="text-cyan-400 font-bold">LUAN FREZARIN</span>. TODOS OS DIREITOS RESERVADOS.
            </p>
            <p className="text-xs text-yellow-400 font-bold tracking-wider">
              VERSÃO SISTEMA 2.0 // DESENVOLVEDOR MOBILE
            </p>
            <div className="mt-4">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-7 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500"
                >
                  <Terminal className="w-3 h-3 mr-2" />
                  ACESSO PRIVADO
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/LuanVFrezarin",
                color: "text-white",
                borderColor: "rgba(255,255,255,0.3)",
                glow: "rgba(255,255,255,0.2)"
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/luan-frezarin-6a4058359/",
                color: "text-cyan-400",
                borderColor: "rgba(6,182,212,0.5)",
                glow: "rgba(6,182,212,0.4)"
              },
              {
                icon: Mail,
                href: "mailto:luan.v.frezarin@gmail.com",
                color: "text-yellow-400",
                borderColor: "rgba(234,179,8,0.5)",
                glow: "rgba(234,179,8,0.4)"
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border-2 bg-black/50 transition-all"
                style={{
                  borderColor: social.borderColor,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -3,
                  boxShadow: `0 0 30px ${social.glow}`,
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Link social"
              >
                <social.icon className={`w-5 h-5 ${social.color}`} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <motion.div
            className="h-0.5"
            style={{
              backgroundSize: '200% 200%',
              background: 'linear-gradient(90deg, transparent, cyan, yellow, cyan, transparent)',
            }}
          />
        </div>
      </div>
    </footer>
  );
}
