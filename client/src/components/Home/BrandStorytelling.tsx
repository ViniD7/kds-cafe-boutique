import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const BrandStorytelling = () => {
  return (
    <section
      id="brand-storytelling"
      className="w-full bg-[#F5F2EB] text-[#120F0D] py-24 md:py-36 relative overflow-hidden border-b border-[#E5DFD5]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Archival Monospace Metadata Strip */}
        <div className="flex items-center justify-between pb-4 mb-12 border-b border-[#120F0D]/10 font-mono text-xs text-[#6E675F]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#A88F48]" />
            <span className="uppercase tracking-[0.25em] font-bold text-[#120F0D]">
              Arquivo Histórico // Pequiá, Iúna-ES
            </span>
          </div>
          <span className="uppercase tracking-widest hidden sm:inline">
            55 Anos de Tradição Familiar
          </span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Towering Editorial Photography */}
          <div className="lg:col-span-5 relative group">
            <div className="relative overflow-hidden border border-[#120F0D]/10 aspect-[3/4] bg-[#120F0D]">
              <img
                src="/images/fundoCafe.webp"
                alt="Montanhas do Caparaó e cafeeiros em altitude"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120F0D]/80 via-transparent to-transparent opacity-90" />

              {/* Inset Badge at bottom of left image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#120F0D]/90 backdrop-blur-md border border-[#C2A763]/30 flex items-center justify-between text-[#F5F2EB]">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C2A763] font-bold block">
                    Pequiá, Iúna • ES
                  </span>
                  <span className="font-sans text-xs text-[#F5F2EB]/80">
                    Sítio Boa Vista • Família Dutra
                  </span>
                </div>
                <span className="font-mono text-base text-[#C2A763] font-bold">1.400M MASL</span>
              </div>
            </div>

            {/* Overlapping Historical Stamp */}
            <div className="hidden sm:flex absolute -top-5 -left-5 w-24 h-24 bg-[#120F0D] text-[#C2A763] p-2.5 flex-col items-center justify-center text-center border border-[#C2A763]/40 shadow-2xl">
              <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#F5F2EB]/70">
                Desde
              </span>
              <span className="font-serif text-2xl font-normal leading-none my-0.5">1969</span>
              <span className="font-mono text-[7.5px] uppercase tracking-wider text-[#C2A763]">
                Herança
              </span>
            </div>
          </div>

          {/* Right Column: Narrative Headline, Story & Inset Craft Photo */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Expressive Editorial Headline inspired by the user's reference */}
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#120F0D] font-normal leading-[1.1] tracking-tight mb-8">
              Cada xícara de <span className="text-[#A88F48] italic font-normal">café especial</span>{" "}
              guarda uma{" "}
              <span className="border-b-2 border-[#A88F48] pb-1">
                história
              </span>{" "}
              nas montanhas.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Narrative Text */}
              <div className="md:col-span-7 flex flex-col">
                <p className="font-sans text-base sm:text-lg text-[#6E675F] leading-relaxed mb-6 font-light">
                  Por trás de cada lote KDS existe uma jornada de perseverança iniciada há mais de 55
                  anos. Nas encostas íngremes do Caparaó Capixaba, a família Dutra cultiva café
                  arábica raro sob microclima singular, onde as noites frias de montanha concentram
                  açúcares nobres.
                </p>

                <p className="font-sans text-sm sm:text-base text-[#6E675F]/90 leading-relaxed mb-8 font-light">
                  Da colheita seletiva manual fruto a fruto até a secagem lenta em terreiros
                  suspensos, cada lote é trabalhado com a precisão de um ateliê gastronômico.
                </p>

                <div>
                  <Link
                    to="/sobre"
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#120F0D] hover:bg-[#A88F48] text-[#F5F2EB] hover:text-[#120F0D] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300"
                  >
                    <span>Conhecer Nossa História</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Inset Craft Photography (Artisan Roasting & Beans) */}
              <div className="md:col-span-5">
                <div className="relative overflow-hidden border border-[#120F0D]/10 aspect-[4/3] bg-[#120F0D] group">
                  <img
                    src="/images/storyRef.jpg"
                    alt="Processo artesanal de torra e grãos no ateliê"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#120F0D]/20" />
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-[#120F0D]/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-[#F5F2EB] flex items-center justify-between">
                    <span>Torra de Ateliê</span>
                    <span className="text-[#C2A763]">Micro-lotes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStorytelling;
