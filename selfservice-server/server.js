import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS para produção
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Middleware para parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz informativa
app.get('/', (req, res) => {
  res.json({
    service: 'KDS Café Boutique - Self-Service Server',
    status: 'running',
    version: '2.0.0',
    endpoints: {
      dashboard: '/dashboard',
      health: '/health',
      api_orders: '/api/orders',
      receive_order: '/pedido?data=...'
    },
    documentation: 'https://github.com/seu-usuario/kds-cafe-boutique'
  });
});

let orders = [];

// API para buscar pedidos (usada pelo polling do dashboard)
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    count: orders.length,
    orders: orders
  });
});

// API para receber pedido (usado pelo frontend do autoatendimento)
// API para receber pedido (usado pelo frontend do autoatendimento)
app.get('/pedido', (req, res) => {
  const { data } = req.query;
  
  if (!data) {
    return res.status(400).send('Nenhum dado de pedido recebido');
  }

  try {
    const decodedMessage = decodeURIComponent(data);
    
    const now = new Date();
    const order = {
      id: Date.now(),
      message: decodedMessage,
      timestamp: now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      timestampISO: now.toISOString(),
      raw: data
    };
    
    orders.unshift(order);
    
    if (orders.length > 50) {
      orders = orders.slice(0, 50);
    }
    
    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    res.status(500).send('Erro ao processar pedido');
  }
});

app.get('/dashboard', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KDS Café - Pedidos</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, rgb(245, 245, 245) 0%, rgb(235, 235, 235) 100%);
      min-height: 100vh;
      padding: 2rem;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      background: linear-gradient(135deg, rgb(189, 169, 105) 0%, rgb(151, 130, 68) 100%);
      color: white;
      padding: 2rem;
      border-radius: 16px;
      margin-bottom: 2rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      text-align: center;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.5rem;
      opacity: 0.9;
    }

    .orders-grid {
      display: grid;
      gap: 1.5rem;
    }

    .order-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-left: 6px solid rgb(189, 169, 105);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .order-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .order-card:first-child {
      border-left-color: rgb(71, 206, 102);
      background: linear-gradient(135deg, white 0%, rgb(240, 255, 240) 100%);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid rgb(245, 245, 245);
    }

    .order-number {
      font-size: 2rem;
      font-weight: bold;
      color: rgb(189, 169, 105);
    }

    .order-card:first-child .order-number {
      color: rgb(71, 206, 102);
    }

    .order-time {
      font-size: 1.25rem;
      color: #666;
      font-weight: 500;
    }

    .order-message {
      font-size: 1.5rem;
      line-height: 1.8;
      white-space: pre-wrap;
      color: rgb(88, 79, 51);
    }

    .order-message strong {
      color: rgb(189, 169, 105);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .empty-state h2 {
      font-size: 2.5rem;
      color: rgb(88, 79, 51);
      margin-bottom: 1rem;
    }

    .empty-state p {
      font-size: 1.5rem;
      color: #666;
    }

    .badge {
      display: inline-block;
      background: rgb(71, 206, 102);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: bold;
      margin-left: 1rem;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .order-card:first-child {
      animation: slideIn 0.5s ease-out;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .stat-number {
      font-size: 3rem;
      font-weight: bold;
      color: rgb(189, 169, 105);
    }

    .stat-label {
      font-size: 1.25rem;
      color: #666;
      margin-top: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <p class="subtitle">Painel de Pedidos - Autoatendimento</p>
    </header>

    <div class="stats">
      <div class="stat-card">
        <div class="stat-number">${orders.length}</div>
        <div class="stat-label">Total de Pedidos</div>
      </div>
      ${orders.length > 0 ? `
      <div class="stat-card">
        <div class="stat-number">${orders[0].timestamp.split(' ')[1] || ''}</div>
        <div class="stat-label">Último Pedido</div>
      </div>
      ` : ''}
    </div>

    ${orders.length === 0 ? `
      <div class="empty-state">
        <h2>Nenhum pedido ainda</h2>
        <p>Os pedidos aparecerão aqui quando forem feitos pelo tablet</p>
      </div>
    ` : `
      <div class="orders-grid">
        ${orders.map((order, index) => `
          <div class="order-card">
            <div class="order-header">
              <div>
                <span class="order-number">Pedido #${order.id.toString().slice(-6)}</span>
                ${index === 0 ? '<span class="badge">NOVO</span>' : ''}
              </div>
              <div class="order-time">🕒 ${order.timestamp}</div>
            </div>
            <div class="order-message">${order.message}</div>
          </div>
        `).join('')}
      </div>
    `}
  </div>

  <script>
    // Polling via API - sem reload da página
    let lastOrderCount = 0;
    
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        
        // Verificar se tem pedido novo
        if (data.success && data.orders.length > lastOrderCount && lastOrderCount > 0) {
          showNotification();
        }
        
        lastOrderCount = data.orders.length;
        updateDashboard(data.orders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    }
    
    function updateDashboard(orders) {
      const ordersGrid = document.querySelector('.orders-grid');
      const emptyState = document.querySelector('.empty-state');
      const statsCards = document.querySelectorAll('.stat-card');
      
      if (orders.length === 0) {
        if (!emptyState) {
          const container = document.querySelector('.container');
          const emptyHTML = `
            <div class="empty-state">
              <h2>Nenhum pedido ainda</h2>
              <p>Os pedidos aparecerão aqui quando forem feitos pelo tablet</p>
            </div>
          `;
          container.insertAdjacentHTML('beforeend', emptyHTML);
        }
        return;
      }
      
      // Remover empty state se existir
      if (emptyState) emptyState.remove();
      
      // Atualizar stats
      if (statsCards[0]) {
        statsCards[0].querySelector('.stat-number').textContent = orders.length;
      }
      if (statsCards[1] && orders[0]) {
        statsCards[1].querySelector('.stat-number').textContent = orders[0].timestamp.split(' ')[1] || '';
      }
      
      // Atualizar grid de pedidos
      if (!ordersGrid) {
        const container = document.querySelector('.container');
        const gridHTML = '<div class="orders-grid"></div>';
        container.insertAdjacentHTML('beforeend', gridHTML);
      }
      
      const grid = document.querySelector('.orders-grid');
      grid.innerHTML = orders.map((order, index) => `
        <div class="order-card" style="${index === 0 ? 'animation: slideIn 0.5s ease-out;' : ''}">
          <div class="order-header">
            <div>
              <span class="order-number">Pedido #${order.id.toString().slice(-6)}</span>
              ${index === 0 ? '<span class="badge">NOVO</span>' : ''}
            </div>
            <div class="order-time">🕒 ${order.timestamp}</div>
          </div>
          <div class="order-message">${order.message}</div>
        </div>
      `).join('');
    }
    
    function showNotification() {
      // Notificação visual
      const header = document.querySelector('header');
      if (header) {
        header.style.boxShadow = '0 0 30px rgba(71, 206, 102, 0.8)';
        setTimeout(() => {
          header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        }, 2000);
      }
    }
    
    // Buscar pedidos a cada 3 segundos
    fetchOrders();
    setInterval(fetchOrders, 3000);
  </script>
</body>
</html>
  `;
  
  res.send(html);
});

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    ordersCount: orders.length 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ☕ KDS Café Boutique - Servidor de Pedidos             ║
║                                                           ║
║   Servidor rodando em: http://0.0.0.0:${PORT}            ║
║   Ambiente: ${process.env.NODE_ENV || 'development'}                ║
║                                                           ║
║   Aguardando pedidos do autoatendimento...               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
