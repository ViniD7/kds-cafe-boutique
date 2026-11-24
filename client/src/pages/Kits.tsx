import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import { productAPI } from "@/services/api";
import { Kit } from "@/types/api";

const defaultKits: any[] = [
  {
    id: "kit-degustacao-caparao-nobre",
    name: "Kit Degustação Caparaó Nobre",
    category: "kits",
    price: 139.0,
    images: ["/images/canTriple.webp"],
    description:
      "Caixa presente rígida contendo 1 Lata Colecionável 250g, 1 Pacote de Arara Amarelo e 2 Cookie Cups artesanais. Acompanha guia de prova e lacre de ateliê.",
    scaScore: 88.5,
    badge: "Coleção Premium",
    subtitle: "Caixa Rígida com Lacre",
    sensoryNotes: ["Edição Presente", "Guia Barista", "Lacre Dourado"],
  },
  {
    id: "kit-triplo-variedades-raras",
    name: "Trio de Variedades Raras do Caparaó",
    category: "kits",
    price: 178.0,
    images: ["/images/canDiagonal.webp"],
    description:
      "Seleção dos três microlotes mais premiados da safra: Catuaí Vermelho 144, Arara Amarelo e Lote Anaeróbio em lata colecionável.",
    scaScore: 88.0,
    badge: "Edição Limitada",
    subtitle: "3x 250g Seleção Especial",
    sensoryNotes: ["3 Perfis Sensoriais", "Embalagens Herméticas", "Lote Numerado"],
  },
  {
    id: "kit-drip-coffee-cookie-cups",
    name: "Kit Experiência Espresso & Cookie Cup",
    category: "kits",
    price: 98.0,
    images: ["/images/cupCookie.webp"],
    description:
      "A combinação perfeita para presentear: 1 Box com 10 Drip Coffee Bags e 1 Trio de Cookie Cups revestidos com chocolate belga.",
    scaScore: 87.0,
    badge: "Harmonização",
    subtitle: "Drip Bags + 3 Cookie Cups",
    sensoryNotes: ["Praticidade", "Chocolate Belga", "Harmonização Perfeita"],
  },
];

const Kits = () => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        setLoading(true);
        const products = await productAPI.getAllProducts();
        const kitsList = products
          .filter((product) => product.category?.toLowerCase().includes("kit"))
          .map(
            (product) =>
              ({
                ...product,
                originalPrice: product.price,
                products: [],
              } as Kit)
          );

        if (kitsList.length > 0) {
          setKits(kitsList);
        } else {
          setKits(defaultKits);
        }
      } catch (error) {
        setKits(defaultKits);
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] min-h-screen">
      {/* 1. TOP EDITORIAL BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-gold-bright uppercase tracking-widest">
              <span className="w-2 h-2 bg-gold-bright inline-block" />
              <span>Coleção Presenteável // KDS Atelier</span>
              <span className="text-white/30">•</span>
              <span className="text-paper-sand/60">Edições Especiais com Lacre</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream tracking-tight font-normal">
              Kits &amp; Coleções de <span className="italic text-gold-bright">Degustação</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-2xl font-light leading-relaxed">
              Combinações exclusivas de microlotes, acessórios e harmonizações gastronômicas
              embaladas em caixas rígidas presenteáveis com selo de cera e guia sensorial.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#161311] px-6 py-4 border border-white/10 self-start lg:self-auto font-mono text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider">
                Embalagem
              </span>
              <span className="font-serif text-lg text-paper-cream font-bold">Caixa Rígida</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider">
                Personalização
              </span>
              <span className="text-gold-bright font-bold">Sob Demanda</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KITS GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-16">
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <span className="material-symbols-outlined text-gold-bright text-[32px] animate-spin">
              progress_activity
            </span>
          </div>
        ) : (
          <ProductGrid products={[]} kits={kits} />
        )}
      </section>

      {/* 3. CORPORATE & CONCIERGE CUSTOM KITS */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="bg-[#161311] border border-white/10 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-2">
              Concierge Corporativo // Presentes Sob Medida
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-paper-cream mb-3">
              Deseja montar um kit exclusivo para sua empresa ou evento?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-paper-sand/70 font-light leading-relaxed">
              Personalizamos caixas, cartões artesanais caligrafados e selecionamos microlotes raros
              com torra dedicada para aniversários, celebrações corporativas e presentes de alta
              gastronomia.
            </p>
          </div>

          <a
            href="https://wa.me/5528999921033?text=Ol%C3%A1%2C%20gostaria%20de%20montar%20um%20kit%20personalizado%20com%20o%20Atelier%20KDS."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md whitespace-nowrap"
          >
            Falar com o Concierge →
          </a>
        </div>
      </section>
    </div>
  );
};

export default Kits;
