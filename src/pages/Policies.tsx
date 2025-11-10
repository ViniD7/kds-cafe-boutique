import { useState } from "react";
import { Truck, RefreshCcw, FileText } from "lucide-react";
import "./Policies/Policies.css";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

const Policies = () => {
  const [activeTab, setActiveTab] = useState("shipping");

  const tabs = [
    { id: "shipping", name: "Frete e Prazos", icon: Truck },
    { id: "returns", name: "Trocas e Devoluções", icon: RefreshCcw },
    { id: "terms", name: "Termos e Condições", icon: FileText },
  ];

  return (
    <div className="policies-container">
      <div className="container-custom">
        <SectionHeader
          title="Políticas da"
          highlightedText="KDS Cafés Especiais"
          subtitle=""
        />

        <div className="tabs-container">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              >
                <Icon size={18} className="icon" />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="content-container">
          {activeTab === "shipping" && (
            <div className="space-y-6">
              <h2 className="section-title">
                Política de Frete e Prazos de Entrega
              </h2>

              <div className="subsection">
                <h3 className="subsection-title">Cálculo do Frete</h3>
                <p className="subsection-text">
                  O valor do frete é calculado com base no CEP de destino, peso
                  e dimensões dos produtos. O cálculo é feito automaticamente no
                  carrinho de compras, antes da finalização do pedido.
                </p>
                <p className="subsection-text">
                  Trabalhamos com as seguintes transportadoras: Correios (PAC e
                  SEDEX), Jadlog e Transportadora Própria (para algumas
                  regiões).
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Prazos de Entrega</h3>
                <p className="subsection-text">
                  O prazo para envio do pedido é de até 2 dias úteis após a
                  confirmação do pagamento. O prazo de entrega varia de acordo
                  com a modalidade de frete escolhida e a localização do
                  destinatário.
                </p>
                <ul className="subsection-list">
                  <li>Capitais e regiões metropolitanas: 1 a 3 dias úteis</li>
                  <li>Demais localidades: 3 a 7 dias úteis</li>
                  <li>Regiões remotas: 7 a 15 dias úteis</li>
                </ul>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Rastreamento</h3>
                <p className="subsection-text">
                  Após o envio do pedido, o código de rastreamento será enviado
                  para o e-mail cadastrado na compra. O rastreamento também
                  poderá ser acompanhado pela área "Meus Pedidos" no site.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Frete Grátis</h3>
                <p className="subsection-text">
                  Oferecemos frete grátis para pedidos acima de R$ 199,00 para
                  todo o Brasil, em modalidade econômica. Promoções especiais de
                  frete podem ser oferecidas sazonalmente e serão devidamente
                  comunicadas em nosso site.
                </p>
              </div>
            </div>
          )}

          {activeTab === "returns" && (
            <div className="space-y-6">
              <h2 className="section-title">Política de Trocas e Devoluções</h2>

              <div className="subsection">
                <h3 className="subsection-title">Direito de Arrependimento</h3>
                <p className="subsection-text">
                  De acordo com o Código de Defesa do Consumidor, você tem até 7
                  dias corridos, a contar da data de recebimento, para solicitar
                  a devolução de qualquer produto adquirido em nossa loja
                  online.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">
                  Como Solicitar Troca ou Devolução
                </h3>
                <p className="subsection-text">
                  Para solicitar uma troca ou devolução, entre em contato
                  conosco através do e-mail contato@kdscafes.com.br ou pelo
                  WhatsApp (11) 99999-9999, informando o número do pedido e o
                  motivo da solicitação.
                </p>
                <p className="subsection-text">
                  Nossa equipe fornecerá as instruções necessárias para o
                  procedimento adequado.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">
                  Condições para Troca ou Devolução
                </h3>
                <ul className="subsection-list">
                  <li>
                    O produto deve estar em sua embalagem original, sem sinais
                    de uso
                  </li>
                  <li>
                    Todas as etiquetas e selos de garantia devem estar intactos
                  </li>
                  <li>O produto não pode ter sido aberto ou usado</li>
                  <li>É necessário apresentar a nota fiscal da compra</li>
                </ul>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Prazo para Reembolso</h3>
                <p className="subsection-text">
                  Após o recebimento e análise do produto devolvido, o reembolso
                  será realizado em até 10 dias úteis, na mesma forma de
                  pagamento utilizada na compra.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Produtos com Defeito</h3>
                <p className="subsection-text">
                  Em caso de produtos com defeito de fabricação, a KDS Cafés
                  Especiais se responsabiliza pela troca ou reembolso integral,
                  incluindo os custos de frete. A solicitação deve ser feita em
                  até 30 dias após o recebimento.
                </p>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-6">
              <h2 className="section-title">Termos e Condições</h2>

              <div className="subsection">
                <h3 className="subsection-title">Aceite dos Termos</h3>
                <p className="subsection-text">
                  Ao utilizar o site da KDS Cafés Especiais e realizar compras
                  em nossa loja online, você concorda com os termos e condições
                  aqui descritos. Recomendamos a leitura atenta deste documento.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Cadastro e Privacidade</h3>
                <p className="subsection-text">
                  Para realizar compras em nosso site, é necessário efetuar um
                  cadastro com informações pessoais. Todos os dados fornecidos
                  são protegidos conforme nossa Política de Privacidade e
                  utilizados apenas para processamento de pedidos e melhorias na
                  experiência de compra.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Preços e Pagamentos</h3>
                <p className="subsection-text">
                  Os preços dos produtos são apresentados em Real (R$) e podem
                  sofrer alterações sem aviso prévio. Promoções e descontos têm
                  prazo determinado e podem ser encerrados a qualquer momento.
                </p>
                <p className="subsection-text">
                  Aceitamos as seguintes formas de pagamento: cartão de crédito,
                  boleto bancário e PIX. O processamento do pedido só ocorrerá
                  após a confirmação do pagamento.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Entrega e Frete</h3>
                <p className="subsection-text">
                  Os prazos de entrega são estimados e podem variar de acordo
                  com a localidade e condições logísticas. Não nos
                  responsabilizamos por atrasos causados por fatores externos,
                  como condições climáticas, greves ou problemas com
                  transportadoras.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Propriedade Intelectual</h3>
                <p className="subsection-text">
                  Todo o conteúdo disponível em nosso site, incluindo textos,
                  imagens, logos, design e código-fonte, é de propriedade
                  exclusiva da KDS Cafés Especiais e protegido por leis de
                  direitos autorais. A reprodução, distribuição ou utilização
                  deste conteúdo sem autorização prévia é expressamente
                  proibida.
                </p>
              </div>

              <div className="subsection">
                <h3 className="subsection-title">Alterações nos Termos</h3>
                <p className="subsection-text">
                  A KDS Cafés Especiais reserva-se o direito de modificar estes
                  termos e condições a qualquer momento, sem aviso prévio. As
                  alterações entrarão em vigor imediatamente após sua publicação
                  no site.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Policies;
