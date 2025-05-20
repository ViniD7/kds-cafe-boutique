
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Truck, RefreshCcw, FileText } from "lucide-react";

const Policies = () => {
  const [activeTab, setActiveTab] = useState("shipping");

  const tabs = [
    { id: "shipping", name: "Frete e Prazos", icon: Truck },
    { id: "returns", name: "Trocas e Devoluções", icon: RefreshCcw },
    { id: "terms", name: "Termos e Condições", icon: FileText },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">
          Políticas da <span className="text-gold">KDS Cafés Especiais</span>
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md transition-colors",
                  activeTab === tab.id
                    ? "bg-gold text-white"
                    : "bg-white border border-border hover:bg-muted"
                )}
              >
                <Icon size={18} className="mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white border border-border rounded-lg p-6 md:p-8">
          {activeTab === "shipping" && (
            <div>
              <h2 className="text-2xl font-serif mb-6">Política de Frete e Prazos de Entrega</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Cálculo do Frete</h3>
                  <p className="text-muted-foreground mb-2">
                    O valor do frete é calculado com base no CEP de destino, peso e dimensões dos produtos.
                    O cálculo é feito automaticamente no carrinho de compras, antes da finalização do pedido.
                  </p>
                  <p className="text-muted-foreground">
                    Trabalhamos com as seguintes transportadoras: Correios (PAC e SEDEX), Jadlog e Transportadora Própria 
                    (para algumas regiões).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Prazos de Entrega</h3>
                  <p className="text-muted-foreground mb-2">
                    O prazo para envio do pedido é de até 2 dias úteis após a confirmação do pagamento.
                    O prazo de entrega varia de acordo com a modalidade de frete escolhida e a localização do destinatário.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Capitais e regiões metropolitanas: 1 a 3 dias úteis</li>
                    <li>Demais localidades: 3 a 7 dias úteis</li>
                    <li>Regiões remotas: 7 a 15 dias úteis</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Rastreamento</h3>
                  <p className="text-muted-foreground">
                    Após o envio do pedido, o código de rastreamento será enviado para o e-mail cadastrado na compra.
                    O rastreamento também poderá ser acompanhado pela área "Meus Pedidos" no site.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Frete Grátis</h3>
                  <p className="text-muted-foreground">
                    Oferecemos frete grátis para pedidos acima de R$ 199,00 para todo o Brasil, em modalidade econômica.
                    Promoções especiais de frete podem ser oferecidas sazonalmente e serão devidamente comunicadas em nosso site.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "returns" && (
            <div>
              <h2 className="text-2xl font-serif mb-6">Política de Trocas e Devoluções</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Direito de Arrependimento</h3>
                  <p className="text-muted-foreground">
                    De acordo com o Código de Defesa do Consumidor, você tem até 7 dias corridos, a contar da data de recebimento,
                    para solicitar a devolução de qualquer produto adquirido em nossa loja online.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Como Solicitar Troca ou Devolução</h3>
                  <p className="text-muted-foreground mb-2">
                    Para solicitar uma troca ou devolução, entre em contato conosco através do e-mail contato@kdscafes.com.br
                    ou pelo WhatsApp (11) 99999-9999, informando o número do pedido e o motivo da solicitação.
                  </p>
                  <p className="text-muted-foreground">
                    Nossa equipe fornecerá as instruções necessárias para o procedimento adequado.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Condições para Troca ou Devolução</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>O produto deve estar em sua embalagem original, sem sinais de uso</li>
                    <li>Todas as etiquetas e selos de garantia devem estar intactos</li>
                    <li>O produto não pode ter sido aberto ou usado</li>
                    <li>É necessário apresentar a nota fiscal da compra</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Prazo para Reembolso</h3>
                  <p className="text-muted-foreground">
                    Após o recebimento e análise do produto devolvido, o reembolso será realizado em até 10 dias úteis,
                    na mesma forma de pagamento utilizada na compra.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Produtos com Defeito</h3>
                  <p className="text-muted-foreground">
                    Em caso de produtos com defeito de fabricação, a KDS Cafés Especiais se responsabiliza pela troca
                    ou reembolso integral, incluindo os custos de frete. A solicitação deve ser feita em até 30 dias
                    após o recebimento.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div>
              <h2 className="text-2xl font-serif mb-6">Termos e Condições</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Aceite dos Termos</h3>
                  <p className="text-muted-foreground">
                    Ao utilizar o site da KDS Cafés Especiais e realizar compras em nossa loja online, você concorda
                    com os termos e condições aqui descritos. Recomendamos a leitura atenta deste documento.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Cadastro e Privacidade</h3>
                  <p className="text-muted-foreground">
                    Para realizar compras em nosso site, é necessário efetuar um cadastro com informações pessoais.
                    Todos os dados fornecidos são protegidos conforme nossa Política de Privacidade e utilizados
                    apenas para processamento de pedidos e melhorias na experiência de compra.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Preços e Pagamentos</h3>
                  <p className="text-muted-foreground mb-2">
                    Os preços dos produtos são apresentados em Real (R$) e podem sofrer alterações sem aviso prévio.
                    Promoções e descontos têm prazo determinado e podem ser encerrados a qualquer momento.
                  </p>
                  <p className="text-muted-foreground">
                    Aceitamos as seguintes formas de pagamento: cartão de crédito, boleto bancário e PIX.
                    O processamento do pedido só ocorrerá após a confirmação do pagamento.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Entrega e Frete</h3>
                  <p className="text-muted-foreground">
                    Os prazos de entrega são estimados e podem variar de acordo com a localidade e condições logísticas.
                    Não nos responsabilizamos por atrasos causados por fatores externos, como condições climáticas,
                    greves ou problemas com transportadoras.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Propriedade Intelectual</h3>
                  <p className="text-muted-foreground">
                    Todo o conteúdo disponível em nosso site, incluindo textos, imagens, logos, design e código-fonte,
                    é de propriedade exclusiva da KDS Cafés Especiais e protegido por leis de direitos autorais.
                    A reprodução, distribuição ou utilização deste conteúdo sem autorização prévia é expressamente proibida.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Alterações nos Termos</h3>
                  <p className="text-muted-foreground">
                    A KDS Cafés Especiais reserva-se o direito de modificar estes termos e condições a qualquer momento,
                    sem aviso prévio. As alterações entrarão em vigor imediatamente após sua publicação no site.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Policies;
