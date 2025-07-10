import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Link } from "react-router-dom";
import { Coffee, Package, Award, Truck } from "lucide-react";
import Images from "@/Constants/Images/images";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Index.css";

// Variantes de animação
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Index = () => {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [newsletterRef, newsletterInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Coffee size={28} className="icon-gold" />,
      title: "Cafés Selecionados",
      description:
        "Selecionamos os melhores grãos das regiões produtoras do Brasil.",
    },
    {
      icon: <Package size={28} className="icon-gold" />,
      title: "Embalagem Protetora",
      description:
        "Nossos cafés são embalados logo após a torra, preservando o aroma e sabor.",
    },
    {
      icon: <Award size={28} className="icon-gold" />,
      title: "Qualidade Premiada",
      description:
        "Cafés premiados nacional e internacionalmente por sua excelência.",
    },
    {
      icon: <Truck size={28} className="icon-gold" />,
      title: "Entrega Rápida",
      description:
        "Enviamos seu pedido em até 24 horas após a confirmação do pagamento.",
    },
  ];

  return (
    <div className="index-container">
      <Hero />
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="features-section"
      >
        <div className="container-custom">
          <motion.div className="features-grid" variants={staggerContainer}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="feature-item"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      <FeaturedProducts />
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="about-section"
      >
        <div className="container-custom">
          <div className="about-grid">
            <motion.div className="about-content" variants={fadeInUp}>
              <h2>
                Nossa <span className="text-gold">História</span>
              </h2>
              <p>
                A KDS Cafés Especiais nasceu da paixão por café e da busca pela
                excelência. Trabalhamos diretamente com produtores selecionados,
                garantindo a qualidade desde o cultivo até a xícara.
              </p>
              <p>
                Nossa missão é proporcionar uma experiência sensorial única,
                apresentando ao consumidor os diferentes perfis de sabor que o
                café brasileiro pode oferecer.
              </p>
              <Link to="/sobre" className="about-button">
                Conheça mais
              </Link>
            </motion.div>
            <motion.div className="about-image" variants={fadeInUp}>
              <img src={Images.kdsIndex} alt="KDS Cafés Especiais" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        ref={newsletterRef}
        initial="hidden"
        animate={newsletterInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="newsletter-section"
      >
        <div className="container-custom">
          <div className="newsletter-content">
            <h2>
              Receba Novidades e{" "}
              <span className="text-gold">Ofertas Especiais</span>
            </h2>
            <p className="newsletter-description">
              Inscreva-se em nossa newsletter para receber dicas sobre café,
              informações sobre novos produtos e ofertas exclusivas.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
