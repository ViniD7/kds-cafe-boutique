import { useState } from "react";
import Hero from "@/components/Hero";
import BrandStorytelling from "@/components/Home/BrandStorytelling";
import CaparaoTerroir from "@/components/Home/CaparaoTerroir";
import SignatureCollection from "@/components/Home/SignatureCollection";
import BrewLab from "@/components/Home/BrewLab";
import ArtOfCoffee from "@/components/Home/ArtOfCoffee";
import SensoryExperience from "@/components/Home/SensoryExperience";
import BeyondCoffee from "@/components/Home/BeyondCoffee";
import BrandStatement from "@/components/Home/BrandStatement";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Inscrição confirmada no Boletim KDS!", {
      description: "Você receberá primeiro os convites para novos microlotes e torras raras.",
    });
    setEmail("");
  };

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] overflow-hidden">
      {/* SECTION 01 — ONYX CINEMATIC HERO */}
      <Hero />

      {/* SECTION 02 — BENTO SIGNATURE COLLECTION */}
      <SignatureCollection />

      {/* SECTION 03 — INTERACTIVE BREW LAB (EXTRACTION RATIOS) */}
      <BrewLab />

      {/* SECTION 04 — BRAND STORYTELLING & HERITAGE (1969) */}
      <BrandStorytelling />

      {/* SECTION 05 — THE CAPARAÓ TERROIR & TRANSPARENCY METRICS */}
      <CaparaoTerroir />

      {/* SECTION 06 — THE ART OF COFFEE (STEP BY STEP CRAFTSMANSHIP) */}
      <ArtOfCoffee />

      {/* SECTION 07 — SCIENTIFIC SENSORY EXPERIENCE & RADAR */}
      <SensoryExperience />

      {/* SECTION 08 — BEYOND COFFEE (GASTRONOMIC COOKIE CUPS) */}
      <BeyondCoffee />

      {/* SECTION 09 — FINAL BRAND STATEMENT */}
      <BrandStatement />

      {/* ATELIER NEWSLETTER DISPATCH - ONYX MINIMAL ARCHITECTURAL */}
      <section className="w-full py-20 md:py-28 bg-[#090807] text-[#F5F2EB] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-3">
            Atelier KDS // Boletim Exclusivo de Safras
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-paper-cream font-normal mb-4">
            Receba as primeiras xícaras de cada safra
          </h2>
          <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Cadastre-se para ser notificado sobre torras semanais, microlotes de pontuação 88+ e
            harmonizações exclusivas de ateliê.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail principal"
              required
              className="w-full sm:flex-1 px-5 py-3.5 bg-[#161311] border border-white/10 text-paper-cream placeholder:text-paper-sand/40 focus:outline-none focus:border-gold-bright font-mono text-xs"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md whitespace-nowrap"
            >
              Inscrever-se →
            </button>
          </form>
          <span className="font-mono text-[10px] text-paper-sand/40 mt-4 block">
            SEM SPAM. ENVIAMOS APENAS LANÇAMENTOS GENUÍNOS E CONVITES PARA DEGUSTAÇÕES.
          </span>
        </div>
      </section>
    </div>
  );
};

export default Index;
