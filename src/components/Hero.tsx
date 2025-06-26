import { Link } from "react-router-dom";
import "./Hero/Hero.css";
import heroVideo from "../Assets/video/bgCafe.mp4";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-video-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={heroVideo} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Descubra o mundo dos{" "}
            <span className="text-gold">cafés especiais</span>
          </h1>
          <p className="hero-subtitle">
            Uma experiência sensorial única. Cafés de origem única, cultivados
            com cuidado e torrados com precisão.
          </p>
          <div className="hero-buttons">
            <Link to="/produtos" className="hero-button primary">
              Explorar Cafés
            </Link>
            <Link to="/sobre" className="hero-button secondary">
              Conheça Nossa História
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
