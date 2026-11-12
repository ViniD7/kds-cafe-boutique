import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency, formatWhatsAppMessage } from "@/lib/utils";
import api from "@/services/api";
import { toast } from "sonner";

const Cart = () => {
  const {
    getCartItemDetails,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();
  const cartItems = getCartItemDetails();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("PRIMEIRACOMPRA");
  const [couponApplied, setCouponApplied] = useState(true);
  const [activePaymentTab, setActivePaymentTab] = useState<"pix" | "card" | "boleto">("pix");
  const [giftNote, setGiftNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const discountRate = couponApplied ? 0.1 : 0.0;
  const discountValue = subtotal * discountRate;
  const shippingValue = subtotal >= 199 || subtotal === 0 ? 0.0 : 18.0;
  const finalTotal = Math.max(0, subtotal - discountValue + shippingValue);
  const pixTotal = finalTotal * 0.95;

  const freeShippingGoal = 199.0;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingGoal) * 100));
  const diffFreeShipping = Math.max(0, freeShippingGoal - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "PRIMEIRACOMPRA") {
      setCouponApplied(true);
      toast.success("Cupom aplicado com sucesso!", {
        description: "10% de desconto no seu pedido.",
      });
    } else {
      toast.error("Cupom inválido ou expirado.");
    }
  };

  const handleCheckoutStripe = async () => {
    try {
      setIsProcessing(true);
      const response = await api.post("/orders", {
        total: finalTotal,
        notes: giftNote,
      });
      const order = response.data;
      navigate("/checkout", {
        state: { orderId: order._id, amount: finalTotal },
      });
    } catch {
      // If offline/local fallback, navigate to checkout with generated ID
      navigate("/checkout", {
        state: { orderId: `ord_${Date.now()}`, amount: finalTotal },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWhatsAppCheckout = () => {
    const itemsText = cartItems
      .map(
        (i) =>
          `• ${i.name} (${i.variantName || "Padrão"}) x${i.quantity} = ${formatCurrency(
            i.price * i.quantity
          )}`
      )
      .join("%0A");

    const message = `KDS CAFÉS ESPECIAIS - PEDIDO%0A%0AOlá! Gostaria de fechar meu pedido via WhatsApp:%0A${itemsText}%0A--------------------------------%0ASubtotal: ${formatCurrency(
      subtotal
    )}%0ADesconto: -${formatCurrency(discountValue)}%0AFrete: ${
      shippingValue === 0 ? "GRÁTIS" : formatCurrency(shippingValue)
    }%0A*Total Geral: ${formatCurrency(finalTotal)}*%0A*No Pix (5% off): ${formatCurrency(
      pixTotal
    )}*%0A${giftNote ? `%0AInstruções: ${encodeURIComponent(giftNote)}` : ""}`;

    const whatsappUrl = `https://wa.me/5528999921033?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-8 bg-surface text-center">
        <div className="w-20 h-20 rounded-full bg-paper-sand flex items-center justify-center text-gold-burnished mb-4 border border-border-hairline shadow-sm">
          <span className="material-symbols-outlined text-[36px]">shopping_bag</span>
        </div>
        <h1 className="font-serif text-3xl text-espresso-deep font-semibold mb-2">
          Sua sacola de café está vazia
        </h1>
        <p className="font-sans text-sm text-slate-warm mb-8 max-w-md font-light leading-relaxed">
          Parece que você ainda não selecionou nenhum dos nossos microlotes premiados. Explore a safra
          2024/2025 e sinta a nobreza do Caparaó.
        </p>
        <Link
          to="/produtos"
          className="px-8 py-3.5 rounded-xl bg-espresso-deep hover:bg-gold-burnished hover:text-espresso-deep text-paper-cream font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md"
        >
          Explorar Cafés Especiais
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-surface min-h-screen">
      {/* 1. TOP REASSURANCE BANNER */}
      <section className="w-full bg-paper-sand text-espresso-deep py-2.5 px-4 md:px-8 border-b border-border-hairline">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-slate-warm font-sans text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-gold-burnished">lock</span>
            <span>Ambiente Seguro Stripe 256-bit SSL</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-gold-burnished">
              local_shipping
            </span>
            <span>Despacho Caparaó em até 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-gold-burnished">eco</span>
            <span>Embalagens 100% Recicláveis &amp; Carbono Neutro</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN FOLIO WORKSPACE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header & Flow Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-gold-burnished mb-1">
              <span>Atelier KDS</span>
              <span>/</span>
              <span className="text-espresso-deep font-bold">Folio de Checkout</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso-deep font-semibold">
              Sacola de Reserva &amp; Finalização
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-paper-sand px-4 py-2 rounded-full self-start md:self-auto border border-border-hairline">
            <div className="flex items-center gap-1.5 text-espresso-deep font-sans text-xs font-bold">
              <span className="w-4 h-4 rounded-full bg-espresso-deep text-paper-cream flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Sacola</span>
            </div>
            <span className="w-3 h-0.5 bg-border-hairline" />
            <div className="flex items-center gap-1.5 text-gold-burnished font-sans text-xs font-semibold">
              <span className="w-4 h-4 rounded-full bg-gold-burnished text-espresso-deep flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              <span>Pagamento</span>
            </div>
            <span className="w-3 h-0.5 bg-border-hairline" />
            <div className="flex items-center gap-1.5 text-slate-warm/60 font-sans text-xs">
              <span className="w-4 h-4 rounded-full bg-surface-container text-slate-warm flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Confirmação</span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* LEFT COLUMN: Items & Customization (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Free Shipping Progress Track Card */}
            <div className="p-5 bg-paper-sand rounded-2xl border border-border-hairline shadow-sm">
              <div className="flex items-center justify-between font-sans text-xs mb-2">
                <span className="text-espresso-deep flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-gold-burnished text-[18px]">
                    verified
                  </span>
                  {diffFreeShipping > 0
                    ? `Faltam ${formatCurrency(diffFreeShipping)} para Frete Grátis expresso!`
                    : "Você conquistou Frete Grátis no seu pedido!"}
                </span>
                <span className="text-slate-warm font-sans text-[11px]">Meta R$ 199,00</span>
              </div>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-border-hairline">
                <div
                  className="bg-gradient-to-r from-gold-burnished to-gold-bright h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="font-sans text-xs text-slate-warm mt-2 font-light">
                Adicione mais um pacote de <strong className="font-semibold text-espresso-deep">Drip Bags</strong> ou uma{" "}
                <strong className="font-semibold text-espresso-deep">Lata Microlote</strong> e receba sem custo de entrega.
              </p>
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 bg-surface-container-lowest rounded-xl border border-border-hairline hover:border-gold-burnished/50 transition-all shadow-sm flex flex-col sm:flex-row gap-5"
                >
                  <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden shrink-0 bg-paper-sand p-2 border border-border-hairline flex items-center justify-center relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    <span className="absolute top-2 left-2 bg-espresso-deep text-gold-bright font-sans text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                      88 SCA
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-gold-burnished font-semibold">
                          Caparaó Terroir • 1.350m
                        </span>
                        <h3 className="font-serif text-lg text-espresso-deep font-semibold">
                          {item.name}
                        </h3>
                        <p className="font-sans text-xs text-slate-warm mt-0.5">
                          Formato: {item.variantName || "250g"} • Safra 2024/2025
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-lg text-espresso-deep font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <span className="block font-sans text-[11px] text-slate-warm">
                          {formatCurrency(item.price)} un.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-hairline/60">
                      <div className="flex items-center bg-paper-sand rounded-lg border border-border-hairline">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-slate-warm hover:text-espresso-deep font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-sans text-xs font-bold text-espresso-deep">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-warm hover:text-espresso-deep font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 font-sans text-xs text-slate-warm hover:text-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[17px]">delete</span>
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Note & Special Instructions Accordion */}
            <div className="bg-surface-container-lowest rounded-xl p-5 border border-border-hairline shadow-sm">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none select-none">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gold-burnished">
                      card_giftcard
                    </span>
                    <div>
                      <h4 className="font-sans text-xs uppercase tracking-wider text-espresso-deep font-bold">
                        Mensagem de Presente ou Ajuste de Moagem
                      </h4>
                      <p className="font-sans text-xs text-slate-warm font-light">
                        Personalizamos seu cartão artesanal de presente ou a granulometria do lote
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-warm transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-border-hairline flex flex-col gap-2">
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    rows={3}
                    placeholder="Escreva aqui a mensagem para o presente ou informe seu método de preparo (ex: Prensa Francesa, Espresso 9 bar)..."
                    className="w-full bg-paper-sand rounded-lg p-3 font-sans text-xs text-espresso-deep placeholder:text-slate-warm/60 border border-border-hairline focus:border-gold-burnished focus:outline-none"
                  />
                  <span className="font-sans text-[10px] text-slate-warm text-right">
                    Incluso como cortesia do Mestre de Torra
                  </span>
                </div>
              </details>
            </div>

            {/* Roast Reassurance Banner */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-paper-sand/60 border border-border-hairline">
              <span className="material-symbols-outlined text-gold-burnished text-[28px] shrink-0">
                local_fire_department
              </span>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-bold text-espresso-deep">
                  Garantia de Frescor Absoluto
                </span>
                <p className="font-sans text-xs text-slate-warm font-light">
                  Todos os cafés são torrados semanalmente em pequenos lotes no Caparaó e despachados
                  com a data de roast carimbada à mão.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Payment Engine (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-border-hairline shadow-md flex flex-col gap-4">
              <h2 className="font-serif text-2xl text-espresso-deep font-semibold">
                Resumo do Pedido
              </h2>

              {/* Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
                <label className="font-sans text-[10px] uppercase tracking-wider text-slate-warm font-bold">
                  Cupom de Convidado
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="PRIMEIRACOMPRA"
                    className="flex-1 bg-paper-sand rounded-lg px-3.5 py-2.5 font-mono text-xs uppercase font-bold text-espresso-deep border border-border-hairline focus:outline-none focus:border-gold-burnished"
                  />
                  <button
                    type="submit"
                    className="bg-espresso-deep hover:bg-espresso-surface text-paper-cream px-4 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    Aplicar
                  </button>
                </div>

                {couponApplied && (
                  <div className="flex items-center justify-between bg-gold-burnished/10 text-espresso-deep px-3 py-1.5 rounded-md font-sans text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-gold-burnished">
                        loyalty
                      </span>
                      PRIMEIRACOMPRA (-10% Atelier)
                    </span>
                    <button
                      type="button"
                      onClick={() => setCouponApplied(false)}
                      className="text-slate-warm hover:text-espresso-deep"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                )}
              </form>

              {/* Financial Items */}
              <div className="flex flex-col gap-2.5 py-4 border-y border-border-hairline font-sans text-xs text-slate-warm">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} itens)</span>
                  <span className="font-mono text-espresso-deep font-medium">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-gold-burnished font-semibold">
                    <span>Desconto Aplicado (10%)</span>
                    <span className="font-mono">- {formatCurrency(discountValue)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Envio Caparaó Sedex</span>
                  <span className="font-mono text-espresso-deep font-medium">
                    {shippingValue === 0 ? "GRÁTIS" : formatCurrency(shippingValue)}
                  </span>
                </div>

                <div className="pt-2 flex justify-between items-baseline border-t border-border-hairline/60">
                  <div>
                    <span className="font-serif text-xl text-espresso-deep font-bold">
                      Total Geral
                    </span>
                    <span className="block font-sans text-[10px] text-slate-warm">
                      com tributos inclusos
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-espresso-deep font-bold">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>

                {/* Instant Pix Highlight */}
                <div className="mt-1 p-2.5 rounded-lg bg-paper-sand flex items-center justify-between text-espresso-deep border border-border-hairline">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-gold-burnished text-[18px]">
                      payments
                    </span>
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wide">
                      Preço no Pix (5% off)
                    </span>
                  </div>
                  <span className="font-serif text-base text-gold-burnished font-bold font-mono">
                    {formatCurrency(pixTotal)}
                  </span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-slate-warm font-bold">
                    Forma de Liquidação
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Stripe Gateway
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1 bg-paper-sand p-1 rounded-lg border border-border-hairline">
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab("pix")}
                    className={`py-2 rounded-md font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1 ${
                      activePaymentTab === "pix"
                        ? "bg-espresso-deep text-paper-cream shadow-sm"
                        : "text-slate-warm hover:text-espresso-deep"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px] text-gold-bright">
                      qr_code_2
                    </span>
                    <span>PIX</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab("card")}
                    className={`py-2 rounded-md font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1 ${
                      activePaymentTab === "card"
                        ? "bg-espresso-deep text-paper-cream shadow-sm"
                        : "text-slate-warm hover:text-espresso-deep"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">credit_card</span>
                    <span>Cartão</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab("boleto")}
                    className={`py-2 rounded-md font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1 ${
                      activePaymentTab === "boleto"
                        ? "bg-espresso-deep text-paper-cream shadow-sm"
                        : "text-slate-warm hover:text-espresso-deep"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">receipt_long</span>
                    <span>Boleto</span>
                  </button>
                </div>

                {/* PIX TAB CONTENT */}
                {activePaymentTab === "pix" && (
                  <div className="flex flex-col items-center bg-paper-sand p-4 rounded-xl text-center border border-border-hairline">
                    <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
                      <svg className="w-32 h-32" fill="none" viewBox="0 0 140 140">
                        <rect fill="white" height="140" rx="4" width="140" />
                        <rect fill="#120F0D" height="36" width="36" x="12" y="12" />
                        <rect fill="white" height="28" width="28" x="16" y="16" />
                        <rect fill="#120F0D" height="16" width="16" x="22" y="22" />
                        <rect fill="#120F0D" height="36" width="36" x="92" y="12" />
                        <rect fill="white" height="28" width="28" x="96" y="16" />
                        <rect fill="#120F0D" height="16" width="16" x="102" y="22" />
                        <rect fill="#120F0D" height="36" width="36" x="12" y="92" />
                        <rect fill="white" height="28" width="28" x="16" y="96" />
                        <rect fill="#120F0D" height="16" width="16" x="22" y="102" />
                        <rect fill="#120F0D" height="18" width="6" x="54" y="12" />
                        <rect fill="#A88F48" height="6" width="18" x="66" y="18" />
                        <rect fill="#120F0D" height="12" width="12" x="54" y="36" />
                        <rect fill="#120F0D" height="6" width="12" x="72" y="36" />
                        <rect fill="#120F0D" height="6" width="18" x="12" y="54" />
                        <rect fill="#A88F48" height="18" width="12" x="36" y="54" />
                        <rect fill="#120F0D" height="30" width="30" x="54" y="54" />
                        <rect fill="#F4EFEB" height="18" width="18" x="60" y="60" />
                        <circle cx="69" cy="69" fill="#A88F48" r="4" />
                        <rect fill="#120F0D" height="12" width="18" x="92" y="54" />
                        <rect fill="#120F0D" height="6" width="12" x="116" y="54" />
                        <rect fill="#120F0D" height="6" width="18" x="12" y="78" />
                        <rect fill="#A88F48" height="18" width="12" x="92" y="72" />
                        <rect fill="#120F0D" height="12" width="18" x="110" y="78" />
                        <rect fill="#120F0D" height="12" width="18" x="54" y="92" />
                        <rect fill="#120F0D" height="36" width="12" x="78" y="92" />
                        <rect fill="#A88F48" height="6" width="32" x="96" y="96" />
                        <rect fill="#120F0D" height="18" width="18" x="54" y="110" />
                        <rect fill="#120F0D" height="18" width="18" x="96" y="110" />
                        <rect fill="#120F0D" height="12" width="8" x="120" y="116" />
                      </svg>
                    </div>
                    <span className="font-sans text-xs font-bold text-espresso-deep mb-1">
                      Aprovação Imediata no Pix
                    </span>
                    <p className="font-sans text-[11px] text-slate-warm max-w-xs mb-3">
                      Escaneie o QR Code no seu banco ou use a chave de pagamento com 5% de
                      desconto.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(
                          "00020126580014br.gov.bcb.pix0136kds-boutique-caparao-93821034"
                        );
                        toast.success("Chave Pix copiada!");
                      }}
                      className="px-4 py-2 rounded-lg bg-espresso-deep hover:bg-espresso-surface text-paper-cream font-sans text-xs uppercase tracking-wider font-bold transition-colors"
                    >
                      Copiar Código Pix
                    </button>
                  </div>
                )}

                {/* CARD TAB CONTENT */}
                {activePaymentTab === "card" && (
                  <div className="flex flex-col gap-2.5 bg-paper-sand p-4 rounded-xl border border-border-hairline font-sans text-xs">
                    <span className="font-semibold text-espresso-deep">
                      Pagamento Seguro com Cartão de Crédito
                    </span>
                    <p className="text-slate-warm text-[11px]">
                      Você será direcionado para a tela com certificação Stripe Elements para digitar
                      seus dados com criptografia de ponta a ponta.
                    </p>
                    <span className="font-bold text-gold-burnished mt-1">
                      Parcelamento em até 3x sem juros de {formatCurrency(finalTotal / 3)}
                    </span>
                  </div>
                )}

                {/* BOLETO TAB CONTENT */}
                {activePaymentTab === "boleto" && (
                  <div className="flex flex-col items-center bg-paper-sand p-4 rounded-xl text-center border border-border-hairline font-sans">
                    <span className="material-symbols-outlined text-[32px] text-espresso-deep mb-1">
                      barcode_scanner
                    </span>
                    <span className="text-xs font-bold text-espresso-deep">Boleto Bancário</span>
                    <p className="text-slate-warm text-[11px] mt-1">
                      Vencimento em 3 dias úteis. Aprovado após compensação bancária.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleCheckoutStripe}
                disabled={isProcessing}
                className="w-full mt-2 bg-espresso-deep hover:bg-espresso-surface text-paper-cream py-4 px-6 rounded-xl font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-md group active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-gold-bright text-[18px]">lock</span>
                <span>{isProcessing ? "Iniciando..." : "Concluir Pedido com Segurança"}</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full bg-paper-sand hover:bg-surface-container-high text-espresso-deep border border-gold-bright/60 py-3 px-4 rounded-xl font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-emerald-700 text-[18px]">chat</span>
                <span>Finalizar Pedido pelo WhatsApp Concierge</span>
              </button>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-border-hairline grid grid-cols-3 gap-2 text-center text-slate-warm font-sans text-[10px]">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-gold-burnished text-[18px]">
                    verified_user
                  </span>
                  <span>Stripe Verified</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-gold-burnished text-[18px]">
                    workspace_premium
                  </span>
                  <span>100% Puro Caparaó</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-gold-burnished text-[18px]">
                    autorenew
                  </span>
                  <span>7 Dias p/ Trocas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
