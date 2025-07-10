import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero/Hero.css";
import heroVideoMp4 from "../Assets/video/bgCafe.mp4";
import heroVideoWebm from "../Assets/video/bgCafe.webm";

const Hero = () => {
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
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="hero-container">
      <div className="hero-video-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5
        </video>
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
            Descubra o mundo dos{" "}
            <span className="text-gold">cafés especiais</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Uma experiência sensorial única. Cafés de origem única, cultivados
            com cuidado e torrados com precisão.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <Link to="/produtos" className="hero-button primary">
              Explorar Cafés
            </Link>
            <Link to="/sobre" className="hero-button secondary">
              Conheça Nossa História
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
