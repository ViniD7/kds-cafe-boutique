import { useState } from "react";
import { Link } from "react-router-dom";

const Policies = () => {
  const [activeTab, setActiveTab] = useState("shipping");

  const tabs = [
    { id: "shipping", name: "Frete & Prazos de Envio", icon: "local_shipping" },
    { id: "returns", name: "Garantia & Devoluções", icon: "verified" },
    { id: "terms", name: "Termos & Segurança", icon: "lock" },
  ];

  return (
    <div className="w-full flex flex-col bg-[#0D0B0A] text-[#F5F2EB] min-h-screen">
      {/* 1. TOP EDITORIAL BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-gold-bright uppercase tracking-widest">
              <span className="w-2 h-2 bg-gold-bright inline-block" />
              <span>Transparência KDS // Compromisso de Ateliê</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-paper-cream tracking-tight font-normal">
              Políticas de Envio &amp; <span className="italic text-gold-bright">Garantia</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-paper-sand/70 max-w-2xl font-light leading-relaxed">
              Nosso compromisso é entregar café no ápice do seu potencial aromático. Conheça as
              diretrizes de torra semanal, frete e garantia de satisfação.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TABS & CONTENT */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all border ${
                  isActive
                    ? "bg-gold-bright text-[#0D0B0A] font-bold border-gold-bright"
                    : "bg-white/[0.02] text-paper-sand/70 border-white/10 hover:border-white/30 hover:text-paper-cream"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-[#161311] border border-white/10 p-8 sm:p-12">
          {activeTab === "shipping" && (
            <div className="space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-2">
                  Diretrizes de Logística
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-paper-cream mb-4">
                  Envios Frescos em até 48 horas da Torra
                </h3>
                <p className="font-sans text-xs sm:text-sm text-paper-sand/75 font-light leading-relaxed mb-4">
                  Para garantir que o café chegue com todos os seus óleos aromáticos preservados,
                  nossas torras são realizadas semanalmente em pequenos lotes no ateliê em Pequiá,
                  Iúna-ES.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
                <div className="p-5 bg-[#0D0B0A] border border-white/5">
                  <span className="text-gold-bright font-bold block mb-1">FRETE CORTESIA</span>
                  <p className="font-sans text-xs text-paper-sand/70">
                    Gratuito em pedidos acima de R$ 199 para todo o Brasil.
                  </p>
                </div>
                <div className="p-5 bg-[#0D0B0A] border border-white/5">
                  <span className="text-gold-bright font-bold block mb-1">PRAZO DE EXPEDIÇÃO</span>
                  <p className="font-sans text-xs text-paper-sand/70">
                    Até 2 dias úteis após confirmação do pedido e finalização da torra.
                  </p>
                </div>
                <div className="p-5 bg-[#0D0B0A] border border-white/5">
                  <span className="text-gold-bright font-bold block mb-1">RASTREAMENTO</span>
                  <p className="font-sans text-xs text-paper-sand/70">
                    Código de rastreio enviado em tempo real via e-mail e WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "returns" && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-2">
                  Compromisso KDS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-paper-cream mb-4">
                  Garantia Sensorial Incondicional
                </h3>
                <p className="font-sans text-xs sm:text-sm text-paper-sand/75 font-light leading-relaxed">
                  Acreditamos na nobreza dos cafés que produzimos. Se houver qualquer divergência em
                  relação à moagem escolhida, lacre rompido no transporte ou integridade do pacote,
                  efetuamos a reposição imediata sem burocracia.
                </p>
              </div>

              <div className="p-6 bg-[#0D0B0A] border border-white/5 space-y-3 font-sans text-xs sm:text-sm text-paper-sand/80">
                <p>
                  <strong>Prazo para comunicação:</strong> Até 7 dias corridos após o recebimento.
                </p>
                <p>
                  <strong>Como solicitar:</strong> Basta entrar em contato com o WhatsApp do
                  Concierge (+55 28 99992-1033) informando o número do pedido.
                </p>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-bright block mb-2">
                  Segurança &amp; Privacidade
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-paper-cream mb-4">
                  Transações Criptografadas &amp; Proteção de Dados
                </h3>
                <p className="font-sans text-xs sm:text-sm text-paper-sand/75 font-light leading-relaxed">
                  Todas as transações realizadas no atelier KDS utilizam tecnologia SSL de 256 bits e
                  processamento seguro via Stripe e Banco Central (Pix com desconto imediato de 5%).
                  Não armazenamos dados bancários ou cartões em nossos servidores.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Policies;
