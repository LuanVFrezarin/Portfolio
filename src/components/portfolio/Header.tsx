"use client";

import { Github, Linkedin, Mail, Terminal, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b-2"
      style={{
        borderColor: "rgba(0, 255, 255, 0.3)",
        boxShadow: "0 0 30px rgba(0, 255, 255, 0.1)",
      }}
    >
      {/* Animated line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: "linear-gradient(90deg, transparent, cyan, yellow, cyan, transparent)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, transparent 49%, rgba(0,255,255,0.1) 50%, transparent 51%)",
          backgroundSize: "100% 4px",
        }}
        animate={{
          y: ["-100%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-12 h-12 rounded-lg bg-black/50 border-2 flex items-center justify-center"
              style={{
                borderColor: "cyan",
                boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Terminal className="w-6 h-6 text-cyan-400" />
              </motion.div>
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1
                className="font-black text-xl tracking-tight"
                whileHover={{
                  textShadow: "0 0 20px cyan",
                }}
              >
                <span className="text-white">LUAN</span>
                <span className="text-cyan-400">.DEV</span>
              </motion.h1>
              <p className="text-xs text-yellow-400 font-bold tracking-wider">
                SISTEMA ONLINE
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "#projects", text: "APPS" },
              { href: "#about", text: "SOBRE" },
              { href: "#contact", text: "CONTATO" },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-white/70 hover:text-cyan-400 transition-all relative px-2 py-1"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.text}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Social Links */}
            {[
              {
                icon: Github,
                href: "https://github.com/LuanVFrezarin",
                color: "text-white",
                borderColor: "rgba(255,255,255,0.3)",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/luan-frezarin-6a4058359/",
                color: "text-cyan-400",
                borderColor: "rgba(6,182,212,0.5)",
              },
              {
                icon: Mail,
                href: "mailto:luan.v.frezarin@gmail.com",
                color: "text-yellow-400",
                borderColor: "rgba(234,179,8,0.5)",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border-2 bg-black/50 transition-all"
                style={{
                  borderColor: social.borderColor,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  boxShadow: social.color.includes("cyan")
                    ? "0 0 20px rgba(6, 182, 212, 0.5)"
                    : social.color.includes("yellow")
                      ? "0 0 20px rgba(234, 179, 8, 0.5)"
                      : "0 0 20px rgba(255,255,255,0.3)",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Link social"
              >
                <social.icon className={`w-5 h-5 ${social.color}`} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
