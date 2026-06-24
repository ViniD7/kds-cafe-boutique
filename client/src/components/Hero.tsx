import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Hero/Hero.css";

const Hero = () => {
  const { t } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Carregar vídeo apenas quando o componente estiver visível
    const loadVideo = async () => {
      try {
        const { default: webmSrc } = await import(
          "../Assets/video/bgCafe.webm"
        );
        const { default: mp4Src } = await import("../Assets/video/bgCafe.mp4");
        setVideoSrc(webmSrc);
        setVideoLoaded(true);
      } catch (error) {
        console.log("Failed to load video:", error);
      }
    };

    // Carregar vídeo após um pequeno delay para não bloquear o carregamento inicial
    const timer = setTimeout(loadVideo, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="hero-container">
      <div className="hero-video-container">
        {videoLoaded && videoSrc ? (
          <video autoPlay loop muted playsInline className="hero-video">
            <source src={videoSrc} type="video/webm" />
            <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5
          </video>
        ) : (
          // Placeholder enquanto o vídeo carrega
          <div className="hero-video-placeholder">
            <div className="hero-video-skeleton"></div>
          </div>
        )}
        <div className="video-overlay"></div>
      </div>

      {/* Conteúdo com animação */}
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="hero-text" variants={containerVariants}>
          <motion.h1 className="hero-title" variants={itemVariants}>
            {t("hero.title_part1")}
            <span className="text-gold">{t("hero.title_highlight")}</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            {t("hero.subtitle")}
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="/produtos" className="hero-button primary">
              {t("hero.explore")}
            </Link>
            <Link to="/sobre" className="hero-button secondary">
              {t("hero.history")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
