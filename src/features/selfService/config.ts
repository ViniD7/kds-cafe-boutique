// Configuração do Autoatendimento
// Edite este arquivo para personalizar o sistema

export const SELFSERVICE_CONFIG = {
  // Porta do servidor de pedidos
  serverPort: 3000,
  
  // IP do servidor (em produção, altere para o IP real)
  // Deixe 'auto' para detectar automaticamente
  serverIP: 'auto',
  
  // Intervalo de auto-refresh do dashboard (em ms)
  dashboardRefreshInterval: 3000,
  
  // Máximo de pedidos armazenados no dashboard
  maxOrdersStored: 50,
  
  // Mensagem de sucesso
  successMessage: 'Pedido enviado com sucesso!',
  
  // Tempo para resetar o carrinho (ms)
  cartResetTimeout: 5000,
  
  // Habilitar/desabilitar formas de pagamento
  paymentMethods: {
    credito: true,
    debito: true,
    pix: true
  },
  
  // Mensagens do sistema
  messages: {
    emptyCart: 'Carrinho vazio',
    addtoCart: 'Adicionar',
    checkout: 'Finalizar Pedido',
    sendOrder: 'Enviar Pedido',
    cancel: 'Cancelar',
    newOrder: 'Fazer Novo Pedido',
    customerName: 'Nome do Cliente',
    paymentMethod: 'Forma de Pagamento'
  }
};
