
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brown-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="text-2xl font-serif font-bold">
              KDS <span className="text-gold">Cafés Especiais</span>
            </Link>
            <p className="mt-4 text-brown-100">
              Café de origem única, cultivado com cuidado e torrado com precisão 
              para oferecer uma experiência sensorial única.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos" className="text-brown-100 hover:text-gold transition-colors">
                  Nossos Cafés
                </Link>
              </li>
              <li>
                <Link to="/kits" className="text-brown-100 hover:text-gold transition-colors">
                  Kits e Presentes
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-brown-100 hover:text-gold transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/politicas" className="text-brown-100 hover:text-gold transition-colors">
                  Políticas
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-brown-100 hover:text-gold transition-colors">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-serif text-xl mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={18} className="text-gold mr-2" />
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brown-100 hover:text-gold transition-colors"
                >
                  +55 (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gold mr-2" />
                <a 
                  href="mailto:contato@kdscafes.com.br" 
                  className="text-brown-100 hover:text-gold transition-colors"
                >
                  contato@kdscafes.com.br
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-gold mr-2 mt-1" />
                <p className="text-brown-100">
                  Rua dos Cafés Especiais, 123<br />
                  Centro, São Paulo - SP<br />
                  CEP: 01234-567
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-brown-700/50 text-center text-brown-200">
          <p>© {year} KDS Cafés Especiais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
