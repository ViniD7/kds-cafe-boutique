import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    service: 'KDS Café Boutique - Self-Service Server',
    status: 'running'
  });
});

let orders = [];

// Buscar pedidos
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    orders
  });
});

// Receber pedido
app.get('/pedido', (req, res) => {
  const { data } = req.query;

  if (!data) {
    return res.status(400).send('Sem pedido');
  }

  try {
    const now = new Date();

    const order = {
      id: Date.now(),
      message: decodeURIComponent(data),
      timestamp: now.toLocaleString('pt-BR'),
    };

    orders.unshift(order);

    if (orders.length > 50) {
      orders = orders.slice(0, 50);
    }

    res.json({ success: true });
  } catch (e) {
    res.status(500).send('Erro');
  }
});

// DASHBOARD
app.get('/dashboard', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const ordersHTML = orders.length === 0
    ? `<div class="empty">Nenhum pedido ainda</div>`
    : orders.map((o, i) => `
      <div class="card">
        <b>#${o.id.toString().slice(-5)}</b>
        ${i === 0 ? '<span class="novo">NOVO</span>' : ''}
        <div>${o.message}</div>
        <small>${o.timestamp}</small>
      </div>
    `).join('');

  const html = String.raw`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>KDS</title>

<style>
body {
  font-family: Arial;
  background: #f5f5f5;
  padding: 20px;
}

h1 {
  text-align: center;
}

.card {
  background: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
}

.novo {
  color: green;
  margin-left: 10px;
}

.empty {
  text-align: center;
  margin-top: 50px;
}
</style>
</head>

<body>

<h1>Painel de Pedidos</h1>

<div id="app">
${ordersHTML}
</div>

<script>
let last = 0;

async function load() {
  const res = await fetch('/api/orders');
  const data = await res.json();

  if (data.orders.length !== last) {
    location.reload();
  }

  last = data.orders.length;
}

setInterval(load, 3000);
</script>

</body>
</html>
`;

  res.send(html);
});

// health
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Servidor rodando na porta ' + PORT);
});