import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ============================================================================
// AJUSTE MANUAL PADRÃO DA OPACIDADE DO FUNDO DO HERO
// Edite estes valores (de 0.0 a 1.0) para definir a intensidade padrão:
// ============================================================================
export const HERO_BACKGROUND_CONFIG = {
  // Opacidade do vídeo (ex: 0.20 = bem sutil, 0.40 = moderado, 0.75 = bem vivo)
  videoOpacity: 0.40,
  // Escuridão da máscara espresso por cima (ex: 0.50 = mais claro, 0.85 = bem escuro)
  overlayDarkness: 0.65,
};

const Hero = () => {
  const { t } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSources, setVideoSources] = useState<{ webm: string; mp4: string } | null>(null);

  // Estados com controle manual em tempo real
  const [videoOpacity, setVideoOpacity] = useState(HERO_BACKGROUND_CONFIG.videoOpacity);
  const [overlayDarkness, setOverlayDarkness] = useState(HERO_BACKGROUND_CONFIG.overlayDarkness);
  const [showTuner, setShowTuner] = useState(false);

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

    // Delay de carregamento para não bloquear a renderização inicial crítica
    const timer = setTimeout(loadVideo, 80);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative w-full bg-espresso-deep text-paper-cream overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {videoLoaded && videoSources && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 transition-opacity duration-300 ease-out"
            style={{ opacity: videoOpacity }}
          >
            <source src={videoSources.webm} type="video/webm" />
            <source src={videoSources.mp4} type="video/mp4" />
          </video>
        )}
        {/* Overlays em degradê espresso com opacidade ajustável */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-espresso-deep via-espresso-deep/75 to-espresso-deep transition-opacity duration-300"
          style={{ opacity: overlayDarkness }}
        />
        <div className="absolute inset-0 bg-espresso-deep/20" />
      </div>

      {/* Mini painel de ajuste manual interativo da opacidade */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 pointer-events-auto">
        <button
          onClick={() => setShowTuner(!showTuner)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-espresso-surface/85 hover:bg-espresso-surface border border-gold-bright/30 hover:border-gold-bright text-gold-bright text-[11px] font-sans tracking-wide shadow-lg backdrop-blur-sm transition-all"
          title="Ajustar opacidade manualmente"
        >
          <span className="material-symbols-outlined text-[15px]">tune</span>
          <span className="hidden sm:inline">Ajustar Opacidade</span>
          <span className="font-mono text-[10px] text-paper-sand/80">({Math.round(videoOpacity * 100)}%)</span>
        </button>

        {showTuner && (
          <div className="absolute right-0 mt-2 p-4 rounded-xl bg-espresso-surface/95 border border-gold-bright/40 shadow-2xl backdrop-blur-md w-72 text-left text-paper-cream animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3 border-b border-border-hairline/15 pb-2">
              <div className="flex items-center gap-1.5 text-gold-bright">
                <span className="material-symbols-outlined text-[16px]">opacity</span>
                <span className="font-serif text-sm font-semibold">Opacidade do Hero</span>
              </div>
              <button
                onClick={() => setShowTuner(false)}
                className="text-paper-sand/60 hover:text-paper-cream text-xs px-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-paper-sand/90">Vídeo de Fundo</span>
                  <span className="font-mono text-gold-bright font-semibold">
                    {Math.round(videoOpacity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={videoOpacity}
                  onChange={(e) => setVideoOpacity(parseFloat(e.target.value))}
                  className="w-full accent-[#C2A763] cursor-pointer h-1.5 bg-espresso-deep rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-paper-sand/90">Escuridão da Máscara</span>
                  <span className="font-mono text-gold-bright font-semibold">
                    {Math.round(overlayDarkness * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={overlayDarkness}
                  onChange={(e) => setOverlayDarkness(parseFloat(e.target.value))}
                  className="w-full accent-[#C2A763] cursor-pointer h-1.5 bg-espresso-deep rounded-lg"
                />
              </div>

              <div className="pt-2.5 border-t border-border-hairline/10 text-[10px] text-paper-sand/60 flex items-center justify-between">
                <span>Valores para o código:</span>
                <code className="text-gold-burnished font-mono bg-espresso-deep px-1.5 py-0.5 rounded border border-border-hairline/10">
                  {videoOpacity} / {overlayDarkness}
                </code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ambient micro-mesh atmospheric glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-gold-bright/15 via-gold-burnished/5 to-transparent blur-3xl pointer-events-none rounded-full z-0" />
      <div className="absolute -bottom-24 right-0 w-[480px] h-[480px] bg-gradient-to-tl from-gold-bright/10 to-transparent blur-2xl pointer-events-none rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="flex flex-col items-center max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Monogram Sub-badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso-surface border border-gold-bright/30 text-gold-bright mb-6 shadow-sm"
          >
            <span
              className="material-symbols-outlined text-[16px] text-gold-bright"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_cafe
            </span>
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-gold-bright">
              Caparaó Capixaba • Safra 2024/2025
            </span>
          </motion.div>

          {/* Expressive Editorial Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream tracking-tight leading-[1.15] max-w-4xl"
          >
            A Nobreza dos Cafés Especiais do{" "}
            <span className="italic font-normal text-gold-bright">Caparaó Capixaba</span>
          </motion.h1>

          {/* Refined Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-paper-sand/80 max-w-2xl mt-5 mb-10 leading-relaxed font-light"
          >
            Tradição familiar desde 1969 em Pequiá, Iúna-ES. Grãos raros colhidos manualmente acima
            de 1.350m e torrados artesanalmente com rigor sensorial impecável.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/produtos"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gold-burnished hover:bg-gold-bright text-espresso-deep font-sans text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_24px_rgba(194,167,99,0.25)] hover:shadow-[0_0_32px_rgba(194,167,99,0.45)] font-bold flex items-center justify-center gap-2 group"
            >
              <span>Explorar Catálogo de Cafés</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            <a
              href="https://wa.me/5528999921033?text=Ol%C3%A1%2C%20gostaria%20de%20consultoria%20sobre%20os%20caf%C3%A9s%20especiais%20da%20KDS."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-espresso-surface/90 hover:bg-espresso-surface text-paper-cream font-sans text-xs tracking-wider uppercase border border-gold-bright/35 hover:border-gold-bright transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-gold-bright">
                chat
              </span>
              <span>Consultoria no WhatsApp</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Floating Stats Bar */}
        <div className="w-full max-w-5xl mt-14 md:mt-20 pt-8 border-t border-border-hairline/15 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-left">
          <div className="flex flex-col p-4 rounded-xl bg-espresso-surface/50 border border-border-hairline/10 hover:border-gold-bright/30 transition-colors">
            <div className="flex items-center gap-1.5 text-gold-bright mb-1">
              <span className="material-symbols-outlined text-[17px]">verified</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-burnished font-semibold">
                Qualidade SCA
              </span>
            </div>
            <span className="font-serif text-2xl text-paper-cream font-semibold">88+ Pontos</span>
            <span className="font-sans text-xs text-paper-sand/60 mt-0.5">
              Metodologia oficial SCA
            </span>
          </div>

          <div className="flex flex-col p-4 rounded-xl bg-espresso-surface/50 border border-border-hairline/10 hover:border-gold-bright/30 transition-colors">
            <div className="flex items-center gap-1.5 text-gold-bright mb-1">
              <span className="material-symbols-outlined text-[17px]">terrain</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-burnished font-semibold">
                Microclima
              </span>
            </div>
            <span className="font-serif text-2xl text-paper-cream font-semibold">1.350m MASL</span>
            <span className="font-sans text-xs text-paper-sand/60 mt-0.5">
              Maturação lenta na montanha
            </span>
          </div>

          <div className="flex flex-col p-4 rounded-xl bg-espresso-surface/50 border border-border-hairline/10 hover:border-gold-bright/30 transition-colors">
            <div className="flex items-center gap-1.5 text-gold-bright mb-1">
              <span className="material-symbols-outlined text-[17px]">eco</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-burnished font-semibold">
                Botânica
              </span>
            </div>
            <span className="font-serif text-2xl text-paper-cream font-semibold">100% Arábica</span>
            <span className="font-sans text-xs text-paper-sand/60 mt-0.5">
              Catuaí, Arara e Caparaó Raro
            </span>
          </div>

          <div className="flex flex-col p-4 rounded-xl bg-espresso-surface/50 border border-border-hairline/10 hover:border-gold-bright/30 transition-colors">
            <div className="flex items-center gap-1.5 text-gold-bright mb-1">
              <span className="material-symbols-outlined text-[17px]">history_edu</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-burnished font-semibold">
                Legado Vivo
              </span>
            </div>
            <span className="font-serif text-2xl text-paper-cream font-semibold">Desde 1969</span>
            <span className="font-sans text-xs text-paper-sand/60 mt-0.5">
              Mais de 55 anos de tradição
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
