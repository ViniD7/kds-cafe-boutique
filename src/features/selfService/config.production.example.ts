// Exemplo de configuração para produção
// Copie este arquivo e rename para config.production.ts

export const SELFSERVICE_CONFIG_PRODUCTION = {
  // ⚠️ ALTERE PARA A URL REAL DO SERVIDOR NO RENDER
  serverURL: 'https://seu-servidor.onrender.com', // Exemplo - substitua pela URL real
  
  serverPort: 3000,
  
  // Intervalo de refresh (5s para produção - menos carga no servidor)
  dashboardRefreshInterval: 5000,
  
  // Máximo de pedidos (100 para produção)
  maxOrdersStored: 100,
  
  // Formas de pagamento ativas
  paymentMethods: {
    credito: true,
    debito: true,
    pix: true
  },
  
  // Mensagens personalizadas
  messages: {
    emptyCart: 'Seu carrinho está vazio',
    addtoCart: 'Adicionar ao Carrinho',
    checkout: 'Finalizar Pedido',
    sendOrder: 'Enviar Pedido para Balcão',
    cancel: 'Voltar ao Carrinho',
    newOrder: 'Fazer Novo Pedido',
    customerName: 'Seu Nome',
    paymentMethod: 'Forma de Pagamento'
  }
};

// 📝 INSTRUÇÕES PARA DEPLOY EM PRODUÇÃO:
//
// 1. DEPLOY NO RENDER (Backend):
//    - Crie um Web Service no Render
//    - Conecte ao repositório do GitHub
//    - Configure a variável de ambiente FRONTEND_URL
//    - Valor: URL do seu frontend no Vercel
//    - Exemplo: https://kds-autoatendimento.vercel.app
//
// 2. DEPLOY NO VERCEL (Frontend):
//    - Conecte ao repositório do GitHub
//    - Configure a variável de ambiente VITE_BACKEND_URL
//    - Valor: URL do seu servidor no Render
//    - Exemplo: https://kds-selfservice-server.onrender.com
//
// 3. TESTE A COMUNICAÇÃO:
//    - Acesse o frontend no Vercel
//    - Faça um pedido de teste
//    - Verifique se aparece no dashboard do Render
//
// ⚠️ IMPORTANTE:
// - Ambos os serviços devem estar em produção
// - O Render pode demorar alguns minutos para iniciar (free tier)
// - Use HTTPS em produção (automático no Vercel e Render)
