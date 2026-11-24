import { Link } from "react-router-dom";
import Images from "@/Constants/Images/images";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#080605] text-[#F5F2EB] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Coordinates Strip */}
        <div className="flex flex-wrap items-center justify-between pb-8 mb-12 border-b border-white/10 font-mono text-[11px] text-paper-sand/50 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gold-bright inline-block" />
            <span className="text-gold-bright font-bold">TERROIR DO CAPARAÓ CAPIXABA</span>
          </div>
          <div>LAT: -20.358 // LON: -41.523 • 1.400M MASL</div>
          <div>TRADIÇÃO DESDE 1969 • PEQUIÁ, IÚNA-ES</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={Images.logoKDS}
                alt="KDS Cafés Especiais"
                className="h-10 w-auto object-contain filter brightness-110"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl tracking-[0.15em] text-paper-cream leading-none uppercase">
                  KDS
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.3em] uppercase text-gold-bright mt-0.5">
                  Café Boutique &amp; Torrefação
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs text-paper-sand/70 max-w-sm font-light leading-relaxed">
              Tradição familiar iniciada em 1969 nas encostas do Pico da Bandeira. Grãos raros de
              altitude extrema colhidos à mão e torrados sob demanda com rigor sensorial de ateliê.
            </p>

            <div className="flex items-center gap-2 pt-2 text-gold-bright font-mono text-xs">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Torras Semanais sob Demanda • SCA 86 a 88.5+</span>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-bright font-bold">
              Coleções &amp; Atelier
            </span>
            <ul className="space-y-2 font-mono text-xs text-paper-sand/70">
              <li>
                <Link to="/produtos" className="hover:text-gold-bright transition-colors">
                  Cafés Especiais 86+ SCA
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?category=drip"
                  className="hover:text-gold-bright transition-colors"
                >
                  Drip Bags Portáteis
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos?category=cookiecups"
                  className="hover:text-gold-bright transition-colors"
                >
                  Cookie Cups Artesanais
                </Link>
              </li>
              <li>
                <Link to="/kits" className="hover:text-gold-bright transition-colors">
                  Kits &amp; Presentes
                </Link>
              </li>
              <li>
                <Link to="/#brew-lab" className="hover:text-gold-bright transition-colors">
                  KDS Brew Lab (Guia)
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-gold-bright transition-colors">
                  Nossa História (1969)
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-bright font-bold">
              Concierge &amp; Atendimento
            </span>
            <ul className="space-y-3 font-mono text-xs text-paper-sand/70">
              <li>
                <a
                  href="https://wa.me/5528999921033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px] text-gold-bright">
                    chat
                  </span>
                  <span>WhatsApp: +55 (28) 99992-1033</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@kdscafes.com.br"
                  className="flex items-center gap-2 hover:text-gold-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-[17px] text-gold-bright">
                    mail
                  </span>
                  <span>contato@kdscafes.com.br</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[17px] text-gold-bright shrink-0 mt-0.5">
                  location_on
                </span>
                <span>
                  Sítio Boa Vista • Distrito de Pequiá, Iúna - Espírito Santo • CEP 29390-000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-paper-sand/50">
          <p>© {year} KDS Cafés Especiais. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/politicas" className="hover:text-gold-bright transition-colors">
              Políticas de Envio
            </Link>
            <span>•</span>
            <Link to="/politicas" className="hover:text-gold-bright transition-colors">
              Garantia Sensorial
            </Link>
            <span>•</span>
            <Link to="/politicas" className="hover:text-gold-bright transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
