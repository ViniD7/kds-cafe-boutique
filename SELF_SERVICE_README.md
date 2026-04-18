# ☕ KDS Café Boutique - Sistema de Autoatendimento

Sistema completo de autoatendimento para tablets, integrado com painel de pedidos para notebook.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura](#estrutura)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Configuração de Rede](#configuração-de-rede)
- [Performance](#performance)

---

## 🎯 Visão Geral

Este módulo permite que clientes façam pedidos através de um tablet de autoatendimento. Os pedidos são enviados instantaneamente para um notebook no balcão via rede local.

### Fluxo do Pedido

```
Tablet (Autoatendimento) → Servidor Node.js → Notebook (Dashboard)
```

---

## 📁 Estrutura

```
src/features/selfService/
├── components/
│   ├── ProductList.tsx       # Lista de produtos
│   ├── Cart.tsx              # Carrinho de compras
│   ├── Checkout.tsx          # Checkout (nome + pagamento)
│   ├── Success.tsx           # Tela de sucesso
│   └── *.css                 # Estilos de cada componente
├── context/
│   └── SelfServiceCartContext.tsx  # Estado do carrinho
├── types.ts                  # Tipagens TypeScript
└── SelfService.tsx           # Componente principal

selfservice-server/
├── server.js                 # Servidor Express
└── package.json              # Dependências
```

---

## 🚀 Instalação

### 1. App Principal (Já instalado)

O módulo de autoatendimento já está integrado ao seu app React. Acesse via:

```
http://localhost:5173/autoatendimento
```

### 2. Servidor de Pedidos (Notebook)

```bash
cd selfservice-server
npm install
npm start
```

O servidor rodará em `http://0.0.0.0:3000`

---

## 📖 Como Usar

### No Tablet (Autoatendimento)

1. Acesse: `http://IP_DO_COMPUTADOR:5173/autoatendimento`
2. Selecione os produtos desejados
3. Clique em "Ver Carrinho"
4. Revise os itens e clique em "Finalizar Pedido"
5. Preencha o nome e selecione a forma de pagamento
6. Clique em "Enviar Pedido"

### No Notebook (Balcão)

1. Acesse: `http://localhost:3000/dashboard`
2. Os pedidos aparecerão automaticamente
3. A página atualiza a cada 3 segundos

---

## 🌐 Configuração de Rede

### Obter IP do Computador (Windows)

```bash
ipconfig
```

Procure por "Endereço IPv4" (ex: `192.168.1.100`)

### Configurar no Tablet

No arquivo `src/features/selfService/components/Checkout.tsx`, linha ~54:

```typescript
const serverIP = '192.168.1.100'; // Substitua pelo IP real
```

### Firewall (Windows)

Permitir conexões na porta 3000:

```bash
netsh advfirewall firewall add rule name="KDS Self-Service" dir=in action=allow protocol=TCP localport=3000
```

---

## ⚡ Performance

### Otimizações Implementadas

✅ **Lazy Loading**: Componente carregado sob demanda
✅ **Memoização**: `useMemo` e `useCallback` para evitar re-renders
✅ **Context API**: Estado global otimizado
✅ **CSS Modular**: Estilos isolados por componente
✅ **Imagens Lazy**: `loading="lazy"` nas imagens
✅ **Code Splitting**: Separação por rotas

### Métricas Esperadas

- **Tempo de carregamento**: < 1s
- **Tempo de resposta**: < 100ms
- **Memória**: ~50MB
- **Re-renders**: Minimizados com memoização

---

## 🎨 Personalização

### Cores

Todas as cores vêm do arquivo `src/Constants/Colors/Colors.tsx`

### Produtos

Edite `src/data/products.ts` para adicionar/remover produtos

### Porta do Servidor

Edite `selfservice-server/server.js`, linha 9:

```javascript
const PORT = 3000; // Altere se necessário
```

---

## 🔧 Desenvolvimento

### Rodar App Principal

```bash
npm run dev
```

### Rodar Servidor (modo dev)

```bash
cd selfservice-server
npm run dev
```

---

## 📱 Recursos

### Tablet

- ✅ Lista de produtos com imagens
- ✅ Carrinho com controle de quantidade
- ✅ Checkout com nome e pagamento
- ✅ Confirmação de pedido
- ✅ Design responsivo
- ✅ Animações suaves

### Notebook

- ✅ Dashboard em tempo real
- ✅ Lista de pedidos formatada
- ✅ Horário de cada pedido
- ✅ Badge "NOVO" no último pedido
- ✅ Estatísticas (total, último pedido)
- ✅ Auto-refresh (3s)

---

## 🛡️ Segurança

⚠️ **IMPORTANTE**: Este sistema foi projetado para **rede local**.

Para produção:
- Use HTTPS
- Adicione autenticação
- Use banco de dados real
- Implemente rate limiting
- Valide dados no servidor

---

## 📞 Suporte

Em caso de dúvidas ou problemas, verifique:

1. **Servidor está rodando?** → `http://localhost:3000/health`
2. **Tablet e notebook na mesma rede?** → Teste com `ping`
3. **Firewall bloqueando?** → Verifique regra na porta 3000
4. **IP correto no Checkout?** → Confira em `Checkout.tsx`

---

## 📝 Licença

MIT - KDS Café Boutique

---

**Desenvolvido com ☕ e dedicação**
