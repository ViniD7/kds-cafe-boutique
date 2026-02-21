import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Footer/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-custom">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              KDS <span className="text-gold">Cafés Especiais</span>
            </Link>
            <p className="footer-description">
              Café de origem única, cultivado com cuidado e torrado com precisão
              para oferecer uma experiência sensorial única.
            </p>
          </div>

          <div className="footer-links">
            <h3 className="footer-title">Links Rápidos</h3>
            <ul className="links-list">
              <li>
                <Link to="/produtos" className="footer-link">
                  Nossos Cafés
                </Link>
              </li>
              <li>
                <Link to="/kits" className="footer-link">
                  Kits e Presentes
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="footer-link">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/politicas" className="footer-link">
                  Políticas
                </Link>
              </li>
              <li>
                <Link to="/contato" className="footer-link">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3 className="footer-title">Contato</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <Phone size={18} className="contact-icon" />
                <a
                  href="https://wa.me/5528999921033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  +55 (28) 99992-1033
                </a>
              </li>
              <li className="contact-item">
                <Mail size={18} className="contact-icon" />
                <a
                  href="mailto:kdscafesespeciais@gmail.com"
                  className="footer-link"
                >
                  kdscafesespeciais@gmail.com
                </a>
              </li>
              <li className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <p className="contact-text">
                  KdsCafésEspeciais - Pequiá, Iúna - ES
                  <br />
                  CEP: 29390-000
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© {year} KDS Cafés Especiais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
