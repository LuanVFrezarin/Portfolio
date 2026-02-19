"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryColors: Record<string, { cyan: boolean }> = {
  Todos: { cyan: true },
  Dados: { cyan: true },
  Produtividade: { cyan: false },
  Automação: { cyan: true },
  Empresarial: { cyan: false },
  Pessoal: { cyan: true },
};

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-5xl mx-auto mb-12 relative z-10"
    >
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category, index) => {
          const isCyan = categoryColors[category]?.cyan ?? index % 2 === 0;
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`relative px-5 sm:px-7 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden ${
                isActive
                  ? "text-black"
                  : "text-white/70 hover:text-white"
              }`}
              style={{
                borderColor: isActive 
                  ? (isCyan ? 'cyan' : 'yellow')
                  : 'rgba(255, 255, 255, 0.2)',
                borderWidth: '2px',
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {isActive && (
                <>
                  {/* Animated background */}
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0"
                    style={{
                      background: isCyan 
                        ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' 
                        : 'linear-gradient(135deg, #eab308, #facc15)',
                    }}
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{
                      boxShadow: isCyan
                        ? [
                            '0 0 20px rgba(6, 182, 212, 0.6)',
                            '0 0 40px rgba(6, 182, 212, 0.8)',
                            '0 0 20px rgba(6, 182, 212, 0.6)',
                          ]
                        : [
                            '0 0 20px rgba(234, 179, 8, 0.6)',
                            '0 0 40px rgba(234, 179, 8, 0.8)',
                            '0 0 20px rgba(234, 179, 8, 0.6)',
                          ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Corner accents */}
                  <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isCyan ? 'border-cyan-400' : 'border-yellow-400'}`} />
                  <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isCyan ? 'border-cyan-400' : 'border-yellow-400'}`} />
                  <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isCyan ? 'border-cyan-400' : 'border-yellow-400'}`} />
                  <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isCyan ? 'border-cyan-400' : 'border-yellow-400'}`} />
                  
                  {/* Zap icon */}
                  <motion.div
                    className="absolute top-1 right-1"
                    animate={{
                      rotate: [0, 10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className={`w-3 h-3 ${isCyan ? 'text-cyan-900' : 'text-yellow-900'}`} />
                  </motion.div>
                </>
              )}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background: isCyan 
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.2))'
                      : 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(234, 179, 8, 0.2))',
                  }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
