import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSources, setVideoSources] = useState<{ webm: string; mp4: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadVideo = async () => {
      try {
        const [webmModule, mp4Module] = await Promise.all([
          import("../Assets/video/bgCafe.webm"),
          import("../Assets/video/bgCafe.mp4"),
        ]);
        if (isMounted) {
          setVideoSources({
            webm: webmModule.default,
            mp4: mp4Module.default,
          });
          setVideoLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load hero background video:", error);
      }
    };

    const timer = setTimeout(loadVideo, 60);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0D0B0A] text-[#F5F2EB] flex flex-col justify-between overflow-hidden">
      {/* BACKGROUND VIDEO LAYER - RAW CINEMATIC GRADING */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {videoLoaded && videoSources && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 opacity-60 filter brightness-90 contrast-110 transition-opacity duration-1000 ease-out"
          >
            <source src={videoSources.webm} type="video/webm" />
            <source src={videoSources.mp4} type="video/mp4" />
          </video>
        )}
        {/* Subtle Matte Black Film Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/60 to-[#0D0B0A]/80" />
        <div className="absolute inset-0 bg-[#0D0B0A]/40" />
      </div>

      {/* TOP PROVENANCE STRIP (ARCHIVAL ATELIER) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pt-16 sm:pt-18 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 py-1.5 sm:py-2 border-b border-white/10 font-mono text-[9.5px] sm:text-[11px] text-paper-sand/70 uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gold-bright inline-block"></span>
            <span>ORIGEM: PEQUIÁ, IÚNA — ES</span>
          </div>
          <div className="hidden sm:block">TERROIR PICO DA BANDEIRA // 1.400M MASL</div>
          <div className="text-gold-bright font-bold">SAFRA 2024/2025 • LOTES LIMITADOS</div>
        </motion.div>
      </div>

      {/* MAIN HERO CONTENT - ONYX ASYMMETRICAL EDITORIAL ARCHITECTURE */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 py-5 sm:py-8 md:py-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            <span className="font-mono text-[10.5px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-bright bg-white/5 border border-white/10 px-3 py-1">
              Atelier &amp; Torrefação Artesanal
            </span>
            <span className="hidden sm:inline font-mono text-xs text-paper-sand/50 tracking-widest">
              // DESDE 1969
            </span>
          </motion.div>

          {/* Monumental Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] text-paper-cream tracking-tight leading-[1.08] mb-4 sm:mb-6"
          >
            A Nobreza dos Cafés de Altitude{" "}
            <span className="italic font-normal text-gold-bright block sm:inline">
              do Caparaó.
            </span>
          </motion.h1>

          {/* Editorial Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-xs sm:text-base md:text-lg text-paper-sand/80 max-w-2xl font-light leading-relaxed mb-6 sm:mb-8"
          >
            Cultivados nas encostas do Pico da Bandeira pela Família Dutra. Grãos raros colhidos
            manualmente acima de 1.350m com pontuação SCA de 86 a 88.5+ pontos, torrados sob
            demanda com precisão científica.
          </motion.p>

          {/* Action Row - Onyx Style Razor Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Link
              to="/produtos"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-3 group shadow-lg"
            >
              <span>Explorar Cafés da Safra</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <button
              onClick={() => scrollToSection("signature-collection")}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/60 text-paper-cream font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 sm:gap-3"
            >
              <span>Conhecer o Terroir</span>
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM SCIENTIFIC DATA STRIP (ONYX TRANSPARENCY BAR) */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#0A0807]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 sm:py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col border-l border-gold-bright/30 pl-2.5 sm:pl-3">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-bright/80">
                01. Terroir &amp; Altitude
              </span>
              <span className="font-serif text-base sm:text-lg md:text-xl text-paper-cream font-medium">
                1.350m — 1.450m
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] text-paper-sand/50">
                Pequiá, Iúna • Caparaó
              </span>
            </div>

            <div className="flex flex-col border-l border-gold-bright/30 pl-2.5 sm:pl-3">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-bright/80">
                02. Pontuação SCA
              </span>
              <span className="font-serif text-base sm:text-lg md:text-xl text-paper-cream font-medium">
                86 a 88.5+ Pontos
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] text-paper-sand/50">
                Curadoria Q-Grader
              </span>
            </div>

            <div className="flex flex-col border-l border-gold-bright/30 pl-2.5 sm:pl-3">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-bright/80">
                03. Processo &amp; Safra
              </span>
              <span className="font-serif text-base sm:text-lg md:text-xl text-paper-cream font-medium">
                Colheita Seletiva
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] text-paper-sand/50">
                Terreiro Suspenso
              </span>
            </div>

            <div className="flex flex-col border-l border-gold-bright/30 pl-2.5 sm:pl-3">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-bright/80">
                04. Perfil de Torra
              </span>
              <span className="font-serif text-base sm:text-lg md:text-xl text-paper-cream font-medium">
                Média-Clara
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] text-paper-sand/50">
                Torras Semanais
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
