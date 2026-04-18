# 🚀 Guia Rápido - Autoatendimento KDS Café

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Instalar e Iniciar Servidor

```bash
# Opção 1: Usar script automático (Windows)
start-selfservice.bat

# Opção 2: Manual
cd selfservice-server
npm install
npm start
```

✅ Servidor rodando em: `http://localhost:3000`

---

### 2️⃣ Iniciar App Principal

```bash
npm run dev
```

✅ App rodando em: `http://localhost:5173`

---

### 3️⃣ Testar Localmente

**Tablet (Autoatendimento):**
- Acesse: `http://localhost:5173/autoatendimento`
- Faça um pedido de teste

**Notebook (Dashboard):**
- Acesse: `http://localhost:3000/dashboard`
- Veja o pedido aparecer!

---

## 🌐 Configurar para Rede Local

### Descobrir IP do Computador

```bash
ipconfig
```

Procure: **Endereço IPv4** (ex: `192.168.1.100`)

---

### Configurar no Tablet

1. Abra: `src/features/selfService/config.ts`
2. Altere o IP:

```typescript
serverIP: '192.168.1.100' // Seu IP aqui
```

---

### Liberar Firewall (Windows)

Execute como **Administrador**:

```bash
netsh advfirewall firewall add rule name="KDS Self-Service" dir=in action=allow protocol=TCP localport=3000
```

---

### Acessar da Rede

**No Tablet:**
```
http://192.168.1.100:5173/autoatendimento
```

**No Notebook:**
```
http://localhost:3000/dashboard
```

---

## 📱 Fluxo de Uso

### Cliente (Tablet)

1. ✅ Escolhe produtos
2. ✅ Adiciona ao carrinho
3. ✅ Finaliza pedido
4. ✅ Preenche nome
5. ✅ Seleciona pagamento
6. ✅ Envia pedido

### Atendente (Notebook)

1. ✅ Dashboard aberto
2. ✅ Pedido aparece automaticamente
3. ✅ Prepara pedido
4. ✅ Chama cliente

---

## 🎯 Personalizar

### Adicionar Produtos

Edite: `src/data/products.ts`

```typescript
{
  id: "prod_010",
  name: "Novo Produto",
  price: 29.90,
  images: ["/caminho/imagem.webp"],
  // ...
}
```

### Mudar Cores

Edite: `src/Constants/Colors/Colors.tsx`

```typescript
primary: "rgb(189, 169, 105)", // Cor principal
```

### Alterar Porta do Servidor

Edite: `selfservice-server/server.js` (linha 9)

```javascript
const PORT = 3000; // Nova porta
```

E em: `src/features/selfService/config.ts`

```typescript
serverPort: 3000 // Mesma porta
```

---

## 🐛 Problemas Comuns

### ❌ "Pedido não aparece no notebook"

**Solução:**
1. ✅ Verifique se servidor está rodando: `http://localhost:3000/health`
2. ✅ Tablet e notebook na **mesma rede Wi-Fi**
3. ✅ IP correto no `config.ts`
4. ✅ Firewall liberado na porta 3000

---

### ❌ "Erro de conexão"

**Teste:**
```bash
# No tablet, teste o ping:
ping 192.168.1.100
```

Se não responder:
- Verifique a rede
- Verifique o firewall
- Reinicie o servidor

---

### ❌ "Produtos não aparecem"

**Solução:**
1. ✅ Verifique `src/data/products.ts`
2. ✅ Imagens existem no caminho correto
3. ✅ Reinicie o app: `npm run dev`

---

## 📊 Monitorar

### Ver Pedidos em Tempo Real

```
http://localhost:3000/dashboard
```

### Health Check

```
http://localhost:3000/health
```

Retorna:
```json
{
  "status": "ok",
  "timestamp": "2026-04-18T...",
  "ordersCount": 5
}
```

---

## 🎨 Dicas de Performance

✅ **Tablet dedicado**: Mantenha sempre na página de autoatendimento  
✅ **Notebook aberto**: Dashboard sempre visível  
✅ **Rede estável**: Use Wi-Fi 5GHz para melhor performance  
✅ **Reiniciar diariamente**: Limpa memória e pedidos antigos  

---

## 📞 Suporte

**Documentação completa:** `SELF_SERVICE_README.md`

**Estrutura do projeto:**
```
src/features/selfService/  ← Código do tablet
selfservice-server/        ← Servidor de pedidos
```

---

**Pronto! Seu sistema de autoatendimento está funcionando! ☕🎉**
