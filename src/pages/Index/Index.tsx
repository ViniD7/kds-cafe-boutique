import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Link } from "react-router-dom";
import { Coffee, Package, Award, Truck } from "lucide-react";
import Images from "@/Constants/Images/images";
import "./Index.css";

const Index = () => {
  return (
    <div className="index-container">
      <Hero />

      {/* Features Section */}
      <section className="features-section">
        <div className="container-custom">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Coffee size={28} className="icon-gold" />
              </div>
              <h3>Cafés Selecionados</h3>
              <p className="feature-description">
                Selecionamos os melhores grãos das regiões produtoras do Brasil.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Package size={28} className="icon-gold" />
              </div>
              <h3>Embalagem Protetora</h3>
              <p className="feature-description">
                Nossos cafés são embalados logo após a torra, preservando o
                aroma e sabor.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Award size={28} className="icon-gold" />
              </div>
              <h3>Qualidade Premiada</h3>
              <p className="feature-description">
                Cafés premiados nacional e internacionalmente por sua
                excelência.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Truck size={28} className="icon-gold" />
              </div>
              <h3>Entrega Rápida</h3>
              <p className="feature-description">
                Enviamos seu pedido em até 24 horas após a confirmação do
                pagamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* About Section */}
      <section className="about-section">
        <div className="container-custom">
          <div className="about-grid">
            <div className="about-content">
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
            </div>
            <div className="about-image">
              <img src={Images.kdsIndex} alt="KDS Cafés Especiais" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
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
      </section>
    </div>
  );
};

export default Index;
