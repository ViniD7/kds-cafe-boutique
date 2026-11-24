import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      id: "f-wjJs6FjLg",
      title: "Unboxing de Ateliê KDS Cafés Especiais",
      duration: "03:45",
      tag: "Experiência de Marca",
    },
    {
      id: "A8GIASeOk08",
      title: "O Perfil de Torra e Notas de Chocolate",
      duration: "02:20",
      tag: "Ciência da Torra",
    },
    {
      id: "XwmpcLsDVOs",
      title: "Drip Coffee Bag: Extração Perfeita",
      duration: "01:50",
      tag: "Guia de Preparo",
    },
  ];

  const milestones = [
    {
      year: "1969",
      title: "O Início nas Encostas do Caparaó",
      desc: "A família Dutra planta os primeiros cafeeiros arábica em Pequiá, Iúna-ES, apostando na altitude extrema como diferencial biológico de doçura.",
    },
    {
      year: "1998",
      title: "A Transição para Cafés Especiais",
      desc: "Implementação pioneira de terreiros suspensos ventilados e eliminação completa de colheitas mecânicas, buscando pureza sensorial absoluta.",
    },
    {
      year: "2018",
      title: "Pioneirismo em Fermentações Anaeróbias",
      desc: "Lotes de Catuaí e Arara passam por protocolos de fermentação controlada em tanques lacrados, atingindo pontuações superiores a 88 pontos SCA.",
    },
    {
      year: "Hoje",
      title: "O Atelier Digital e Torras sob Demanda",
      desc: "KDS consolida sua boutique de cafés raros, despachando torras artesanais frescas semanais diretamente da montanha para apreciadores em todo o Brasil.",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] min-h-screen">
      {/* 1. HERO STORYTELLING BANNER */}
      <section className="relative w-full py-28 md:py-36 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fundoCafe.webp"
            alt="Montanhas do Caparaó"
            className="w-full h-full object-cover filter brightness-30 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/80 to-[#0D0B0A]/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold-bright mb-4">
              <span className="w-2.5 h-2.5 bg-gold-bright inline-block" />
              <span>Nossa Herança // Desde 1969</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-paper-cream tracking-tight font-normal leading-[1.05] mb-6">
              A história cultivada nas alturas do{" "}
              <span className="italic text-gold-bright">Caparaó.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-paper-sand/80 max-w-2xl font-light leading-relaxed">
              Mais de meio século de devoção à cafeicultura de montanha. Em Pequiá, município de
              Iúna-ES, transformamos altitude extrema, noites frias e paciência artesanal em cafés
              premiados internacionalmente.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRICAL EDITORIAL DOSSIER (ONYX STYLE) */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Photography Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-white/10 bg-[#161311] overflow-hidden aspect-[4/5]">
              <img
                src="/images/storyRef.jpg"
                alt="Processo artesanal no ateliê KDS"
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#0D0B0A]/90 backdrop-blur-sm border border-white/10 text-xs font-mono">
                <span className="text-gold-bright uppercase tracking-widest block mb-0.5">
                  Sítio Boa Vista // Pequiá-ES
                </span>
                <span className="text-paper-sand/70">Família Dutra • 1.400M MASL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-3">
              O Terroir &amp; A Família
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-paper-cream font-normal leading-tight mb-6">
              Onde o vento das montanhas dita o ritmo da safra.
            </h2>
            <div className="space-y-4 font-sans text-xs sm:text-sm text-paper-sand/75 font-light leading-relaxed mb-8">
              <p>
                Nas encostas íngremes que cercam o Parque Nacional do Caparaó, as máquinas não têm
                espaço. Cada pé de café é cuidado à mão por trabalhadores cujas famílias vivem nesta
                mesma terra há gerações.
              </p>
              <p>
                A altitude entre 1.350m e 1.450m faz com que as noites sejam rigorosamente frias,
                desacelerando o ciclo de maturação dos frutos. Essa lentidão permite que a planta
                acumule glicose, ácidos málicos e precursores aromáticos que resultam em notas de flor
                de laranjeira, pêssego fresco e chocolate 70%.
              </p>
              <p>
                Nosso compromisso não é com a quantidade, mas com a fidelidade à identidade de cada
                lote, com torras sob demanda para garantir a você o ápice do frescor.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6 bg-[#161311] border border-white/10 font-mono text-xs">
              <div>
                <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider block">
                  Altitude
                </span>
                <span className="font-serif text-xl text-paper-cream font-bold">1.400m</span>
              </div>
              <div>
                <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider block">
                  Colheita
                </span>
                <span className="font-serif text-xl text-paper-cream font-bold">100% Manual</span>
              </div>
              <div>
                <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider block">
                  Tradição
                </span>
                <span className="font-serif text-xl text-gold-bright font-bold">55 Anos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HISTORICAL TIMELINE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-2">
              Linha do Tempo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-paper-cream font-normal">
              Cinco Décadas de Devoção ao Café
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-6 bg-[#161311] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="font-serif text-3xl text-gold-bright font-bold block mb-3">
                  {m.year}
                </span>
                <h4 className="font-serif text-lg text-paper-cream mb-2">{m.title}</h4>
                <p className="font-sans text-xs text-paper-sand/70 font-light leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ATELIER CINEMA & PROCESS VIDEOS */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 pb-28">
        <div className="mb-12 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-2">
              Atelier em Movimento // Documentários
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-paper-cream font-normal">
              Registros da Colheita e Torrefação
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-[#161311] border border-white/10 p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Embedded Video */}
                <div className="relative aspect-video bg-[#0D0B0A] overflow-hidden border border-white/5 mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.id}`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-gold-bright uppercase tracking-wider mb-2">
                  <span>{vid.tag}</span>
                  <span>{vid.duration}</span>
                </div>
                <h4 className="font-serif text-base text-paper-cream leading-snug">{vid.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* CTA TO EXPLORE LOTS */}
        <div className="mt-16 text-center">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md"
          >
            <span>Experimentar os Cafés da Safra</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
