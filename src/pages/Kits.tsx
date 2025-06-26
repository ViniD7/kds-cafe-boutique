import ProductGrid from "@/components/ProductGrid";
import { kits } from "@/data/products";
import "./Kits/Kits.css";

const Kits = () => {
  return (
    <div className="kits-container">
      <div className="container-custom">
        <div className="kits-header">
          <h1 className="kits-title">
            <span>Kits</span> e Presentes
          </h1>
          <p className="kits-subtitle">
            Nossos kits são combinações cuidadosamente selecionadas para quem
            deseja experimentar diferentes cafés ou presentear alguém especial.
          </p>
        </div>

        <ProductGrid kits={kits} />

        <div className="custom-kits-info">
          <h3 className="custom-kits-title">Kits Personalizados</h3>
          <p className="custom-kits-text">
            Você também pode montar seu próprio kit personalizado de acordo com
            suas preferências. Entre em contato conosco para mais informações.
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </div>
  );
};

export default Kits;
