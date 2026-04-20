// Configuração do Autoatendimento
// Edite este arquivo para personalizar o sistema

// Detectar URL do backend baseado no ambiente
const getBackendURL = () => {
  // Se estiver em produção (Vercel), usar variável de ambiente
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // Em desenvolvimento, usar localhost
  return 'http://localhost:3000';
};

export const SELFSERVICE_CONFIG = {
  // URL completa do servidor (em produção, vem do .env)
  serverURL: getBackendURL(),
  
  // Porta do servidor (apenas para referência em dev)
  serverPort: parseInt(import.meta.env.VITE_BACKEND_URL?.split(':').pop() || '3000'),
  
  // IP do servidor (em produção, usar URL completa)
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
