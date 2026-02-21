import { lazy, Suspense, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Coffee, Package, Award, Truck } from "lucide-react";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScrollOptimizer from "@/components/ScrollOptimizer";
import Images from "@/Constants/Images/images";
import "./Index.css";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

const LazyHero = lazy(() => import("@/components/Hero"));
const LazyFeaturedProducts = lazy(
  () => import("@/components/FeaturedProducts")
);

const Index = () => {
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const newsletterRef = useRef(null);
  const featureItemsRef = useRef([]);
  const aboutTextRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !featureItemsRef.current.includes(el)) {
      featureItemsRef.current.push(el);
    }
  };

  const addAboutTextRef = (el) => {
    if (el && !aboutTextRefs.current.includes(el)) {
      aboutTextRefs.current.push(el);
    }
  };

  useEffect(() => {
    let observer;
    let aboutObserver;
    let timeoutId;

    const handleIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * 150;
          setTimeout(() => {
            requestAnimationFrame(() => {
              entry.target.classList.add("animate-in");
            });
          }, delay);
        }
      });
    };

    const handleAboutTextIntersection = (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * 200;
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
          }, 100);
        }
      });
    };

    const initObservers = () => {
      if (window.IntersectionObserver) {
        observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        });

        featureItemsRef.current.forEach((item) => {
          if (item) observer.observe(item);
        });

        if (featuresRef.current) observer.observe(featuresRef.current);

        aboutObserver = new IntersectionObserver(handleAboutTextIntersection, {
          threshold: 0.2,
          rootMargin: "0px 0px -100px 0px",
        });

        aboutTextRefs.current.forEach((item) => {
          if (item) aboutObserver.observe(item);
        });
      }
    };

    timeoutId = setTimeout(initObservers, 300);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
      if (aboutObserver) aboutObserver.disconnect();
    };
  }, []);

  const features = useMemo(
    () => [
      {
        icon: <Coffee size={28} className="icon-gold" aria-hidden="true" />,
        title: "Cafés Selecionados",
        description:
          "Selecionamos os melhores grãos das regiões produtoras do Brasil.",
      },
      {
        icon: <Package size={28} className="icon-gold" aria-hidden="true" />,
        title: "Embalagem Protetora",
        description:
          "Nossos cafés são embalados logo após a torra, preservando o aroma e sabor.",
      },
      {
        icon: <Award size={28} className="icon-gold" aria-hidden="true" />,
        title: "Qualidade Premiada",
        description:
          "Cafés premiados nacional e internacionalmente por sua excelência.",
      },
      {
        icon: <Truck size={28} className="icon-gold" aria-hidden="true" />,
        title: "Entrega Confiável",
        description:
          "Fale conosco e enviaremos seu pedido após a confirmação do pagamento.",
      },
    ],
    []
  );

  return (
    <ScrollOptimizer>
      <div className="index-container">
        <Suspense fallback={<div className="hero-placeholder" />}>
          <LazyHero />
        </Suspense>

        <section ref={featuresRef} className="features-section">
          <div className="container-custom">
            <div className="features-grid">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item"
                  ref={addToRefs}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="products-placeholder" />}>
          <LazyFeaturedProducts />
        </Suspense>

        <div ref={aboutRef} className="about-section">
          <div className="container-custom">
            <div className="about-grid">
              <div className="about-content">
                <h2
                  ref={addAboutTextRef}
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "none",
                  }}
                >
                  Nossa <span className="text-gold">História</span>
                </h2>
                <p
                  ref={addAboutTextRef}
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "none",
                  }}
                >
                  A KDS Cafés Especiais nasceu da paixão por café e da busca
                  pela excelência. Trabalhamos diretamente com produtores
                  selecionados, garantindo a qualidade desde o cultivo até a
                  xícara.
                </p>
                <p
                  ref={addAboutTextRef}
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "none",
                  }}
                >
                  Nossa missão é proporcionar uma experiência sensorial única,
                  apresentando ao consumidor os diferentes perfis de sabor que o
                  café brasileiro pode oferecer.
                </p>
                <Link to="/sobre" className="about-button">
                  Conheça mais
                </Link>
              </div>
              <div className="about-image">
                <img
                  src={Images.kdsIndex}
                  alt="KDS Cafés Especiais"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
            </div>
          </div>
        </div>

        <section ref={newsletterRef} className="newsletter-section">
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
                  aria-label="Email para newsletter"
                />
                <button type="submit" className="newsletter-button">
                  Inscrever-se
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </ScrollOptimizer>
  );
};

export default Index;
