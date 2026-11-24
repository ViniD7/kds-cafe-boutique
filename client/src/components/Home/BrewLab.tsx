import { useState } from "react";
import { Link } from "react-router-dom";

interface BrewMethod {
  id: string;
  name: string;
  icon: string;
  ratio: string;
  defaultCoffee: number;
  multiplier: number;
  temp: string;
  grind: string;
  time: string;
  steps: string[];
  recommendedCoffee: string;
}

const BREW_METHODS: BrewMethod[] = [
  {
    id: "v60",
    name: "Hario V60 / Filtrado",
    icon: "coffee_maker",
    ratio: "1:16",
    defaultCoffee: 20,
    multiplier: 16,
    temp: "92°C — 94°C",
    grind: "Média (Açúcar cristal)",
    time: "3m 15s",
    steps: [
      "Escalde o filtro de papel com água quente e descarte a água da base.",
      "Adicione o café moído na hora e nivele a cama de café delicadamente.",
      "Faça a pré-infusão com 50g de água por 45 segundos (liberação de CO2).",
      "Despeje em círculos concêntricos contínuos até atingir a proporção total.",
    ],
    recommendedCoffee: "Caparaó Reserva Especial 88.5 SCA (Notas florais e cítricas)",
  },
  {
    id: "prensa",
    name: "Prensa Francesa",
    icon: "filter_vintage",
    ratio: "1:15",
    defaultCoffee: 30,
    multiplier: 15,
    temp: "94°C",
    grind: "Grossa (Sal marinho)",
    time: "4m 00s",
    steps: [
      "Aqueça o copo de vidro da prensa com água fervente e descarte.",
      "Adicione o pó grosso e despeje toda a água quente de uma vez.",
      "Mexa delicadamente com uma colher de madeira para molhar todo o pó.",
      "Coloque a tampa com o êmbolo no topo e aguarde 4 minutos antes de pressionar lentamente.",
    ],
    recommendedCoffee: "Catuaí Vermelho Torra Média (Corpo licoroso e caramelo toffee)",
  },
  {
    id: "drip",
    name: "Drip Coffee Bag",
    icon: "local_cafe",
    ratio: "1:13",
    defaultCoffee: 10,
    multiplier: 13,
    temp: "90°C — 92°C",
    grind: "Média-Fina dosada",
    time: "1m 45s",
    steps: [
      "Abra o sachê de nitrogênio e rasgue a linha pontilhada do filtro.",
      "Abra as hastes laterais e encaixe firmemente na sua xícara preferida.",
      "Despeje 30ml de água para umedecer o café e aguarde 20 segundos.",
      "Complete despejando lentamente em 2 ou 3 etapas até 130ml.",
    ],
    recommendedCoffee: "Drip Coffee Box 10 Sachês (Praticidade sem perder pureza sensorial)",
  },
  {
    id: "espresso",
    name: "Espresso Moderno",
    icon: "water_drop",
    ratio: "1:2.2",
    defaultCoffee: 18,
    multiplier: 2.2,
    temp: "93°C",
    grind: "Fina homogênea",
    time: "28s — 32s",
    steps: [
      "Distribua o pó uniformemente no porta-filtro e compacte com 15kg de pressão.",
      "Faça um expurgo de 2 segundos no grupo da máquina antes de travar.",
      "Inicie a extração cronometrada buscando crema espessa de tom avelã.",
      "Finalize o corte ao atingir 40g na balança para preservar doçura málica.",
    ],
    recommendedCoffee: "Arara Amarelo de Altitude (Doçura de calda de manga e cacau)",
  },
];

export const BrewLab = () => {
  const [selectedMethodId, setSelectedMethodId] = useState("v60");
  const [coffeeGrams, setCoffeeGrams] = useState(20);

  const currentMethod = BREW_METHODS.find((m) => m.id === selectedMethodId) || BREW_METHODS[0];
  const waterGrams = Math.round(coffeeGrams * currentMethod.multiplier);
  const approxCups = Math.max(1, Math.round(waterGrams / 150));

  const handleSelectMethod = (method: BrewMethod) => {
    setSelectedMethodId(method.id);
    setCoffeeGrams(method.defaultCoffee);
  };

  return (
    <section
      id="brew-lab"
      className="w-full bg-[#0D0B0A] text-[#F5F2EB] py-16 sm:py-24 md:py-32 relative overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <span className="w-2.5 h-2.5 bg-gold-bright" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright font-bold">
                KDS Extraction Laboratory
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream font-normal">
              Onyx-Standard <span className="italic text-gold-bright">Brew Lab</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-md font-light leading-relaxed">
            A extração perfeita é uma ciência exata. Selecione seu método e calibre a proporção áurea
            de grãos para extrair toda a complexidade sensorial do terroir do Caparaó.
          </p>
        </div>

        {/* METHOD SELECTOR TABS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-12">
          {BREW_METHODS.map((method) => {
            const isSelected = method.id === selectedMethodId;
            return (
              <button
                key={method.id}
                onClick={() => handleSelectMethod(method)}
                className={`p-3.5 sm:p-5 text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#161311] border-gold-bright text-paper-cream shadow-xl"
                    : "bg-white/[0.02] border-white/10 text-paper-sand/60 hover:border-white/30 hover:text-paper-cream"
                }`}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-gold-bright">
                    {method.icon}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-gold-bright/70">
                    {method.ratio}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-sm sm:text-base md:text-lg text-paper-cream mb-0.5 sm:mb-1">
                    {method.name}
                  </h4>
                  <span className="font-mono text-[10px] sm:text-xs text-paper-sand/50">
                    Tempo: {method.time}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC CALCULATOR & PARAMETERS STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT: RATIO CALCULATOR */}
          <div className="lg:col-span-5 bg-[#161311] border border-white/10 p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-white/10 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-gold-bright">
                <span>Calculadora Áurea</span>
                <span>Proporção {currentMethod.ratio}</span>
              </div>

              {/* SLIDER FOR COFFEE GRAMS */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="font-sans text-xs uppercase tracking-wider text-paper-sand/80">
                    Quantidade de Café
                  </span>
                  <span className="font-mono text-xl sm:text-2xl text-gold-bright font-bold">
                    {coffeeGrams}g
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={1}
                  value={coffeeGrams}
                  onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                  className="w-full accent-[#C2A763] cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[9.5px] sm:text-[10px] text-paper-sand/40 mt-1">
                  <span>10g (Individual)</span>
                  <span>35g (Casal)</span>
                  <span>60g (Grupo)</span>
                </div>
              </div>

              {/* RESULT METRICS */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5 bg-[#0D0B0A] border border-white/10 mb-6 sm:mb-8">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-paper-sand/50 block mb-1">
                    Água Filtrada
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-paper-cream font-bold">
                    {waterGrams}
                    <span className="text-xs sm:text-sm font-mono text-gold-bright ml-1">ml</span>
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-paper-sand/50 block mb-1">
                    Rendimento
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-paper-cream font-bold">
                    ~{approxCups}
                    <span className="text-xs sm:text-sm font-mono text-gold-bright ml-1">
                      {approxCups === 1 ? "xícara" : "xícaras"}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* RECOMMENDED COFFEE LINK */}
            <div className="pt-4 sm:pt-6 border-t border-white/10">
              <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-widest text-gold-bright block mb-1.5 sm:mb-2">
                Café Recomendado para este método:
              </span>
              <p className="font-sans text-xs text-paper-sand/90 font-medium mb-3 sm:mb-4">
                {currentMethod.recommendedCoffee}
              </p>
              <Link
                to="/produtos"
                className="w-full py-3 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold text-center transition-colors block"
              >
                Garantir Grãos Frescos →
              </Link>
            </div>
          </div>

          {/* RIGHT: SCIENTIFIC EXTRACTION SPECIFICATIONS & PROTOCOL */}
          <div className="lg:col-span-7 bg-[#161311] border border-white/10 p-5 sm:p-8">
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-white/10 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-gold-bright">
              <span>Protocolo de Extração</span>
              <span>Laboratório KDS</span>
            </div>

            {/* SPECS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3.5 sm:p-4 bg-[#0D0B0A] border border-white/5">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-paper-sand/50 block mb-1">
                  Temperatura
                </span>
                <span className="font-mono text-xs sm:text-sm md:text-base text-paper-cream font-bold">
                  {currentMethod.temp}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 bg-[#0D0B0A] border border-white/5">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-paper-sand/50 block mb-1">
                  Moagem Ideal
                </span>
                <span className="font-mono text-xs sm:text-sm text-paper-cream font-bold">
                  {currentMethod.grind}
                </span>
              </div>
              <div className="p-3.5 sm:p-4 bg-[#0D0B0A] border border-white/5">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-paper-sand/50 block mb-1">
                  Tempo Alvo
                </span>
                <span className="font-mono text-xs sm:text-sm md:text-base text-paper-cream font-bold">
                  {currentMethod.time}
                </span>
              </div>
            </div>

            {/* STEP BY STEP GUIDE */}
            <h4 className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-paper-sand/70 mb-3 sm:mb-4">
              Passo a Passo Barista:
            </h4>
            <div className="space-y-2.5 sm:space-y-3">
              {currentMethod.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-3.5 bg-white/[0.02] border border-white/5"
                >
                  <span className="font-mono text-xs text-gold-bright font-bold">0{idx + 1}.</span>
                  <p className="font-sans text-xs sm:text-sm text-paper-sand/90 font-light leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrewLab;
