// Exemplo de configuração para produção
// Copie este arquivo e rename para config.production.ts

export const SELFSERVICE_CONFIG_PRODUCTION = {
  // ⚠️ ALTERE PARA O IP REAL DO SERVIDOR
  serverIP: '192.168.1.100', // Exemplo - substitua pelo IP real
  
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

// 📝 INSTRUÇÕES PARA PRODUÇÃO:
//
// 1. Altere o serverIP para o IP real do notebook
// 2. Configure o firewall do Windows:
//    netsh advfirewall firewall add rule name="KDS Self-Service" dir=in action=allow protocol=TCP localport=3000
//
// 3. No tablet, acesse:
//    http://{IP_DO_NOTEBOOK}:5173/autoatendimento
//
// 4. No notebook, acesse:
//    http://localhost:3000/dashboard
//
// 5. Mantenha o servidor rodando no notebook:
//    cd selfservice-server
//    npm start
//
// ⚠️ IMPORTANTE:
// - Tablet e notebook DEVEM estar na mesma rede Wi-Fi
// - Não exponha a porta 3000 na internet
// - Use apenas em rede local segura
