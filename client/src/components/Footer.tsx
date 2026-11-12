import { Link } from "react-router-dom";
import Images from "@/Constants/Images/images";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-espresso-deep text-paper-cream border-t border-border-hairline/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border-hairline/15">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={Images.logoKDS}
                alt="KDS Cafés Especiais"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl tracking-tight text-paper-cream font-semibold leading-none">
                  KDS
                </span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-bright mt-0.5 font-medium">
                  Cafés Especiais
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs text-paper-sand/80 max-w-sm font-light leading-relaxed">
              Tradição familiar desde 1969 em Pequiá, Iúna-ES. Grãos raros colhidos manualmente acima
              de 1.350m na Serra do Caparaó e torrados com rigor sensorial artesanal.
            </p>

            <div className="flex items-center gap-2 pt-2 text-gold-bright font-sans text-xs">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Torrefação Artesanal &amp; Curadoria SCA 86+</span>
            </div>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-bright font-bold">
              Coleções &amp; Atelier
            </span>
            <ul className="space-y-2 font-sans text-xs text-paper-sand/80">
              <li>
                <Link to="/produtos" className="hover:text-paper-cream transition-colors">
                  Cafés Especiais 86+ SCA
                </Link>
              </li>
              <li>
                <Link to="/produtos?category=drip" className="hover:text-paper-cream transition-colors">
                  Drip Bags &amp; Sachês
                </Link>
              </li>
              <li>
                <Link to="/produtos?category=cookiecups" className="hover:text-paper-cream transition-colors">
                  Cookie Cups Artesanais
                </Link>
              </li>
              <li>
                <Link to="/kits" className="hover:text-paper-cream transition-colors">
                  Kits de Presente
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-paper-cream transition-colors">
                  Nossa História no Caparaó
                </Link>
              </li>
              <li>
                <Link to="/politicas" className="hover:text-paper-cream transition-colors">
                  Políticas de Envio &amp; Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-bright font-bold">
              Concierge &amp; Atendimento
            </span>
            <ul className="space-y-2.5 font-sans text-xs text-paper-sand/80">
              <li>
                <a
                  href="https://wa.me/5528999921033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-paper-cream transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-gold-bright">
                    chat
                  </span>
                  <span>WhatsApp: +55 (28) 99992-1033</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kdscafesespeciais@gmail.com"
                  className="flex items-center gap-2 hover:text-paper-cream transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-gold-bright">
                    mail
                  </span>
                  <span>kdscafesespeciais@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-gold-bright shrink-0 mt-0.5">
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-paper-sand/60">
          <p>© {year} KDS Cafés Especiais. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/politicas" className="hover:text-paper-cream transition-colors">
              Termos &amp; Condições
            </Link>
            <span>•</span>
            <Link to="/politicas" className="hover:text-paper-cream transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
