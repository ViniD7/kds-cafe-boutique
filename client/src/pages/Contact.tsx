import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "cafes-especiais",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message =
      `*Mensagem enviada pelo site KDS*%0A%0A` +
      `*Nome:* ${formData.name}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Telefone:* ${formData.phone || "Não informado"}%0A` +
      `*Assunto:* ${formData.subject}%0A%0A` +
      `*Mensagem:*%0A${formData.message}`;

    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");

    toast.success("Mensagem direcionada ao Concierge KDS!", {
      description: "Abrimos o atendimento direto via WhatsApp com os detalhes preenchidos.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "cafes-especiais",
      message: "",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] min-h-screen">
      {/* 1. TOP EDITORIAL BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-gold-bright uppercase tracking-widest">
              <span className="w-2 h-2 bg-gold-bright inline-block" />
              <span>Atelier Concierge // Atendimento Privado</span>
              <span className="text-white/30">•</span>
              <span className="text-paper-sand/60">Pequiá, Iúna-ES // 1.400M MASL</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream tracking-tight font-normal">
              Fale com Nosso <span className="italic text-gold-bright">Atelier</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-2xl font-light leading-relaxed">
              Consultoria para amantes de café especial, parcerias corporativas de presentes e
              fornecimento B2B de microlotes em saca para cafeterias.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#161311] px-6 py-4 border border-white/10 self-start lg:self-auto font-mono text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider">
                Atendimento
              </span>
              <span className="font-serif text-lg text-paper-cream font-bold">Segunda a Sábado</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[10px] text-paper-sand/50 uppercase tracking-wider">
                Resposta
              </span>
              <span className="text-gold-bright font-bold">&lt; 2 Horas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN CONTACT STAGE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Atelier Coordinates */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* WhatsApp Concierge Card */}
            <a
              href="https://wa.me/5528999921033?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20Concierge%20KDS."
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-[#161311] border border-gold-bright/40 hover:border-gold-bright transition-all flex items-start gap-4 group"
            >
              <div className="p-3 bg-gold-bright text-[#0D0B0A] font-bold">
                <span className="material-symbols-outlined text-[24px]">chat</span>
              </div>
              <div className="flex-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                  Atendimento Instantâneo
                </span>
                <h4 className="font-serif text-xl text-paper-cream mb-1">WhatsApp Concierge</h4>
                <p className="font-mono text-sm text-paper-sand/80 mb-2">+55 (28) 99992-1033</p>
                <span className="font-mono text-xs text-gold-bright group-hover:translate-x-1 transition-transform inline-block">
                  Iniciar conversa direta →
                </span>
              </div>
            </a>

            {/* Email & Wholesale */}
            <div className="p-6 bg-[#161311] border border-white/10 flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10 text-gold-bright">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                  Correspondência Formal
                </span>
                <h4 className="font-serif text-xl text-paper-cream mb-1">E-mail de Ateliê</h4>
                <p className="font-mono text-sm text-paper-sand/80">contato@kdscafes.com.br</p>
                <p className="font-sans text-xs text-paper-sand/50 mt-1">
                  Para propostas comerciais, imprensa e pedidos B2B em grande escala.
                </p>
              </div>
            </div>

            {/* Farm Coordinates */}
            <div className="p-6 bg-[#161311] border border-white/10 flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10 text-gold-bright">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold-bright block mb-1">
                  Origem do Terroir
                </span>
                <h4 className="font-serif text-xl text-paper-cream mb-1">Fazenda &amp; Torrefação</h4>
                <p className="font-mono text-xs text-paper-sand/80">
                  Sítio Boa Vista, Distrito de Pequiá, Iúna — Espírito Santo
                </p>
                <p className="font-mono text-xs text-gold-bright/80 mt-1">
                  LAT: -20.358 // LON: -41.523 • 1.400M MASL
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Architectural Form */}
          <div className="lg:col-span-7 bg-[#161311] border border-white/10 p-8 sm:p-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-2">
              Envio de Mensagem
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-paper-cream mb-6">
              Como podemos ajudar sua xícara?
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-paper-sand/70 block mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Carlos Albuquerque"
                    className="w-full px-4 py-3 bg-[#0D0B0A] border border-white/10 text-paper-cream text-xs font-mono focus:outline-none focus:border-gold-bright"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-paper-sand/70 block mb-1">
                    E-mail Principal *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="carlos@exemplo.com"
                    className="w-full px-4 py-3 bg-[#0D0B0A] border border-white/10 text-paper-cream text-xs font-mono focus:outline-none focus:border-gold-bright"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-paper-sand/70 block mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(28) 99999-9999"
                    className="w-full px-4 py-3 bg-[#0D0B0A] border border-white/10 text-paper-cream text-xs font-mono focus:outline-none focus:border-gold-bright"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-paper-sand/70 block mb-1">
                    Finalidade do Contato
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0D0B0A] border border-white/10 text-paper-cream text-xs font-mono focus:outline-none focus:border-gold-bright cursor-pointer"
                  >
                    <option value="cafes-especiais">Dúvida sobre Microlotes e Safras</option>
                    <option value="kits-corporativos">Presentes &amp; Kits Corporativos</option>
                    <option value="atacado-b2b">Fornecimento B2B / Cafeterias (Sacas)</option>
                    <option value="outros">Outro Assunto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-paper-sand/70 block mb-1">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Escreva sua dúvida ou solicitação..."
                  className="w-full px-4 py-3 bg-[#0D0B0A] border border-white/10 text-paper-cream text-xs font-mono focus:outline-none focus:border-gold-bright"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold-burnished hover:bg-gold-bright text-[#0D0B0A] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensagem ao Concierge →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
