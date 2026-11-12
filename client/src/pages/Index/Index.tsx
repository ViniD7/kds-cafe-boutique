import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Images from "@/Constants/Images/images";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Obrigado por se inscrever!", {
      description: "Você receberá primeiro as novidades de novos microlotes e torras raras.",
    });
    setEmail("");
  };

  const atelierFeatures = [
    {
      num: "01 / Excelência",
      icon: "grade",
      title: "Curadoria Rara 86+",
      description:
        "Todos os microlotes passam por triagem óptica e prova sensorial cega por provadores certificados Q-Grader SCA.",
      tag: "Rastreabilidade Total",
    },
    {
      num: "02 / Conservação",
      icon: "shield",
      title: "Válvula Aromática",
      description:
        "Embalagens herméticas trilaminadas com válvula unidirecional suíça e zíper resselável que barram oxigênio e luz.",
      tag: "Barreira UV 100%",
    },
    {
      num: "03 / Proveniência",
      icon: "landscape",
      title: "Terroir Vulcânico",
      description:
        "Solo mineral rico em granito e altitude privilegiada produzem açúcares complexos e notas florais inconfundíveis.",
      tag: "Pequiá, Iúna-ES",
    },
    {
      num: "04 / Concierge",
      icon: "support_agent",
      title: "Torra Semanal",
      description:
        "Torras sob demanda todas as semanas com suporte via WhatsApp para ajuste fino de moagem do seu método.",
      tag: "Frescor Garantido",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-surface overflow-hidden">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. FUNDAMENTOS DE ATELIER SECTION */}
      <section className="w-full bg-paper-sand/60 border-y border-border-hairline py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-burnished font-bold block mb-2">
                Fundamentos de Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso-deep font-semibold">
                Precisão em cada etapa da torrefação
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-slate-warm max-w-md font-light leading-relaxed">
              A fusão entre ciência agronômica de precisão e a paixão ancestral das montanhas do
              Espírito Santo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {atelierFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-7 rounded-xl bg-surface-container-lowest border border-border-hairline hover:border-gold-bright transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-paper-sand flex items-center justify-center text-espresso-deep group-hover:bg-gold-glow group-hover:text-gold-burnished transition-colors mb-6">
                    <span className="material-symbols-outlined text-[24px]">{feat.icon}</span>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-burnished font-semibold block mb-1">
                    {feat.num}
                  </span>
                  <h3 className="font-serif text-xl text-espresso-deep mb-3 font-semibold">
                    {feat.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-warm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-hairline/60 flex items-center text-gold-burnished font-sans text-xs uppercase tracking-wider font-semibold">
                  <span>{feat.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VITRINE DE DESTAQUES */}
      <FeaturedProducts />

      {/* 4. STORYTELLING EDITORIAL: NOSSA ORIGEM & TERROIR */}
      <section className="w-full bg-espresso-surface text-paper-cream py-20 md:py-32 border-y border-border-hairline/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Visual Composite */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border-hairline/20 aspect-[4/5] bg-espresso-deep">
                <img
                  src={Images.fundoCafe || "/images/colheita1.webp"}
                  alt="Colheita de café no Caparaó"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Inset Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-espresso-deep/85 backdrop-blur-md border border-border-hairline/30 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-gold-bright block font-bold">
                      Serra do Caparaó
                    </span>
                    <span className="font-sans text-xs text-paper-sand/90">
                      Pequiá, Iúna • Espírito Santo
                    </span>
                  </div>
                  <span className="font-serif text-xl text-gold-bright">1.400m</span>
                </div>
              </div>

              {/* Overlapping Historical Stamp */}
              <div className="hidden sm:flex absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gold-burnished text-espresso-deep p-3 flex-col items-center justify-center text-center shadow-xl border border-gold-bright">
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest">
                  Origem
                </span>
                <span className="font-serif text-2xl font-bold leading-none my-0.5">1969</span>
                <span className="font-sans text-[9px] uppercase tracking-wider font-semibold">
                  Tradição
                </span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-gold-bright" />
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-gold-bright font-bold">
                  Capítulo Monográfico
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-paper-cream font-semibold leading-tight mb-6">
                O chão sagrado que acolheu nossa família há mais de meio século.
              </h2>

              {/* Editorial Quote */}
              <blockquote className="p-6 rounded-xl bg-espresso-deep/60 border-l-4 border-gold-bright my-4">
                <p className="font-serif text-lg italic text-paper-sand font-normal leading-relaxed">
                  “Não comercializamos apenas café. Entregamos a ancestralidade e a perseverança de
                  quem viveu a colheita nas montanhas íngremes do Caparaó.”
                </p>
                <cite className="block font-sans text-xs uppercase tracking-wider text-gold-bright mt-3 font-semibold not-italic">
                  — Kallebe Dutra, Fundador &amp; Curador KDS
                </cite>
              </blockquote>

              <p className="font-sans text-sm sm:text-base text-paper-sand/80 leading-relaxed mb-6 font-light">
                O distrito de Pequiá, no município de Iúna, abriga uma das geografias mais reverenciadas
                do café especial mundial. Aqui, a amplitude térmica acentuada, as brisas das montanhas
                e a sombra natural desaceleram a maturação dos grãos, concentrando doçura e notas
                sensoriais singulares.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border-hairline/20 mb-6">
                <div>
                  <span className="font-serif text-2xl text-gold-bright font-semibold">100%</span>
                  <p className="font-sans text-xs text-paper-sand/70 mt-1">
                    Colheita seletiva manual grão a grão
                  </p>
                </div>
                <div>
                  <span className="font-serif text-2xl text-gold-bright font-semibold">
                    Secagem Lenta
                  </span>
                  <p className="font-sans text-xs text-paper-sand/70 mt-1">
                    Terreiros suspensos com ventilação natural
                  </p>
                </div>
              </div>

              <div>
                <Link
                  to="/sobre"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold-burnished hover:bg-gold-bright text-espresso-deep font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300"
                >
                  <span>Conhecer Nossa História Completa</span>
                  <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER / ATELIER DISPATCH */}
      <section className="w-full py-16 md:py-24 bg-paper-sand/40 border-b border-border-hairline">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-burnished font-bold block mb-2">
            Clube KDS • Boletim Exclusivo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso-deep font-semibold mb-4">
            Acompanhe as próximas torras e lançamentos
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-warm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Cadastre-se para receber convites antecipados de microlotes limitados, cupons exclusivos e
            dicas de mestres de torra.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu melhor e-mail"
              required
              className="w-full sm:flex-1 px-4 py-3.5 rounded-lg bg-white border border-border-hairline text-espresso-deep placeholder:text-slate-warm/60 focus:outline-none focus:border-gold-burnished font-sans text-sm shadow-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-espresso-deep hover:bg-gold-burnished text-paper-cream hover:text-espresso-deep font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
