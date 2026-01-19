"use client";

import { motion } from "framer-motion";
import { Camera, Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText("");
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-6 bg-white/80 ml-1"
      />
    </span>
  );
};

const FloatingElements = () => {
  const [floatingData, setFloatingData] = useState<
    Array<{
      id: number;
      left: number;
      xMovement: number;
      duration: number;
      delay: number;
    }>
  >([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const elements = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      xMovement: Math.random() * 100 - 50,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setFloatingData(elements);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingData.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          animate={{
            y: [-20, -100],
            x: [0, element.xMovement],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
          }}
          style={{
            left: `${element.left}%`,
            top: "100%",
          }}
        />
      ))}
    </div>
  );
};

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 gradient-bg relative overflow-hidden"
    >
      {/* Animated background elements */}
      <FloatingElements />

      {/* Parallax background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />

      <div className="max-w-4xl mx-auto text-center flex-1 flex flex-col items-center justify-center z-10">
        <motion.div
          className="space-y-6 sm:space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Name with typewriter effect */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/95 text-balance leading-tight px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <TypewriterText text="Alex Vicente López" delay={2000} />
          </motion.h1>

          {/* Subtitle with stagger animation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="px-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto text-pretty leading-relaxed font-light text-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
              >
                Estudiante de Desarrollador Web | Fotógrafo Creativo
              </motion.span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto text-pretty leading-relaxed px-4 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
          >
            Transformo ideas en experiencias digitales únicas, combinando
            desarrollo web con creatividad visual para crear soluciones que
            realmente conectan.
          </motion.p>

          {/* Social links with enhanced animations */}
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6 pt-4 px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.8 }}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/AVL05",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/alex-vicente-lopez-083821309/",
                label: "LinkedIn",
              },
              {
                icon: Instagram,
                href: "https://www.instagram.com/aleexx_005/",
                label: "Instagram",
              },
              { icon: Camera, href: "#photography", label: "Fotografía" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 backdrop-blur-sm"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 5 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.5 }}
      >
        <motion.span
          className="text-sm font-medium"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll down
        </motion.span>
        <motion.div
          className="w-6 h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-2"
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 20px rgba(255,255,255,0.3)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2 bg-white/70 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
}
