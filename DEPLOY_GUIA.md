# 🚀 Guia Completo de Deploy - KDS Café Boutique

## 📋 Visão Geral da Arquitetura

```
┌─────────────────────┐         ┌─────────────────────┐
│   VERCEL (Frontend) │  ────>  │   RENDER (Backend)  │
│   Autoatendimento   │  POST   │   Dashboard Pedidos │
│   (Cliente)         │         │   (Atendente)       │
└─────────────────────┘         └─────────────────────┘
```

---

## 🎯 Passo a Passo do Deploy

### 1️⃣ **PREPARAÇÃO DO REPOSITÓRIO (GitHub)**

```bash
# Adicionar os arquivos preparados ao git
git add .
git commit -m "Preparar projeto para deploy em produção (Vercel + Render)"
git push origin main
```

---

### 2️⃣ **DEPLOY DO BACKEND NO RENDER**

#### **A. Criar o Web Service**

1. Acesse: https://render.com
2. Faça login com GitHub
3. Clique em **"New +"** → **"Web Service"**
4. Conecte ao repositório do GitHub: `seu-usuario/kds-cafe-boutique`
5. Configure:
   - **Name:** `kds-selfservice-server`
   - **Region:** `Frankfurt` ou `Sao Paulo` (mais próximo do Brasil)
   - **Branch:** `main`
   - **Root Directory:** `selfservice-server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** `Free`

#### **B. Configurar Variáveis de Ambiente**

No painel do Render, adicione:

| Variável | Valor | Exemplo |
|----------|-------|---------|
| `NODE_ENV` | `production` | `production` |
| `FRONTEND_URL` | URL do Vercel (depois de deploy) | `https://kds-autoatendimento.vercel.app` |

> ⚠️ **IMPORTANTE:** A variável `PORT` será definida automaticamente pelo Render. Não configure manualmente.

#### **C. Fazer Deploy**

1. Clique em **"Create Web Service"**
2. Aguarde o build e deploy (pode levar 3-5 minutos)
3. Copie a URL gerada: `https://kds-selfservice-server.onrender.com`

#### **D. Testar o Backend**

Acesse no navegador:
- **Health Check:** `https://kds-selfservice-server.onrender.com/health`
- **Dashboard:** `https://kds-selfservice-server.onrender.com/dashboard`

Se aparecer JSON no health check, está funcionando! ✅

---

### 3️⃣ **DEPLOY DO FRONTEND NO VERCEL**

#### **A. Criar o Projeto**

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New..."** → **"Project"**
4. Importe o repositório: `seu-usuario/kds-cafe-boutique`
5. Configure:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./` (raiz do projeto)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### **B. Configurar Variáveis de Ambiente**

Adicione nas configurações do projeto:

| Variável | Valor | Exemplo |
|----------|-------|---------|
| `VITE_BACKEND_URL` | URL do Render | `https://kds-selfservice-server.onrender.com` |

#### **C. Fazer Deploy**

1. Clique em **"Deploy"**
2. Aguarde o build (1-2 minutos)
3. Copie a URL: `https://kds-autoatendimento.vercel.app`

---

### 4️⃣ **CONFIGURAÇÃO FINAL (CORS)**

#### **Voltar ao Render e atualizar FRONTEND_URL:**

1. Vá para o painel do serviço no Render
2. Clique em **"Environment"**
3. Atualize a variável `FRONTEND_URL` com a URL do Vercel:
   ```
   FRONTEND_URL=https://kds-autoatendimento.vercel.app
   ```
4. Clique em **"Save Changes"**
5. O serviço vai redeployar automaticamente

---

## ✅ Checklist de Testes

### Testar Comunicação Frontend → Backend

1. **Acesse o autoatendimento:**
   ```
   https://kds-autoatendimento.vercel.app/autoatendimento
   ```

2. **Faça um pedido de teste:**
   - Adicione produtos ao carrinho
   - Finalize o pedido
   - Preencha nome e forma de pagamento
   - Clique em "Enviar Pedido"

3. **Verifique no dashboard:**
   ```
   https://kds-selfservice-server.onrender.com/dashboard
   ```
   - O pedido deve aparecer em até 3 segundos

### Testar Health Check

```bash
curl https://kds-selfservice-server.onrender.com/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "ordersCount": 1
}
```

---

## 🔧 Arquivos Criados/Modificados

### Backend (selfservice-server/)
- ✅ `server.js` - Adicionado CORS e porta dinâmica
- ✅ `package.json` - Adicionada dependência `cors`
- ✅ `render.yaml` - Configuração de deploy
- ✅ `.env.example` - Template de variáveis
- ✅ `.gitignore` - Atualizado

### Frontend (raiz/)
- ✅ `src/features/selfService/config.ts` - Usa variáveis de ambiente
- ✅ `src/features/selfService/components/Checkout.tsx` - URL dinâmica
- ✅ `src/features/selfService/config.production.example.ts` - Atualizado
- ✅ `.env.local.example` - Template de variáveis
- ✅ `vercel.json` - Configuração de deploy

---

## 🎁 URLs Finais

| Serviço | URL | Uso |
|---------|-----|-----|
| **Frontend (Cliente)** | `https://kds-autoatendimento.vercel.app` | Autoatendimento |
| **Backend (Dashboard)** | `https://kds-selfservice-server.onrender.com/dashboard` | Painel do atendente |
| **Health Check** | `https://kds-selfservice-server.onrender.com/health` | Monitoramento |

---

## ⚠️ Importante - Free Tier

### Render (Backend)
- ⏰ **Spin Down:** Após 15 min sem acesso, o serviço "dorme"
- 🔄 **Primeira requisição:** Pode levar 30-50 segundos para "acordar"
- 💡 **Solução:** Use um serviço de monitoramento (ex: UptimeRobot) para pingar a cada 10 min

### Vercel (Frontend)
- ✅ Sempre ativo
- ✅ Deploy automático a cada push
- ✅ HTTPS automático

---

## 🚨 Problemas Comuns

### 1. Erro de CORS
**Sintoma:** Pedido não chega no dashboard
**Solução:** Verifique se `FRONTEND_URL` no Render está correto

### 2. Backend "dormindo"
**Sintoma:** Primeira requisição demora muito
**Solução:** Acesse o dashboard periodicamente ou use UptimeRobot

### 3. Variáveis de ambiente não funcionando
**Sintoma:** Frontend ainda usa localhost
**Solução:** 
- Verifique se `VITE_BACKEND_URL` está configurada no Vercel
- Faça redeploy após alterar variáveis

### 4. Build falha no Vercel
**Sintoma:** Erro durante o build
**Solução:** Verifique os logs e se todas as dependências estão no `package.json`

---

## 📞 Suporte

Se algo der errado:
1. Verifique os logs no painel do Render/Vercel
2. Teste o health check do backend
3. Verifique as variáveis de ambiente
4. Consulte o dashboard do Render para ver se o serviço está rodando

---

## 🎉 Pronto!

Após seguir todos os passos, você terá:
- ✅ Autoatendimento online 24/7 (Vercel)
- ✅ Dashboard de pedidos acessível de qualquer lugar (Render)
- ✅ Comunicação segura via HTTPS
- ✅ Deploy automático a cada push no GitHub

**Boa sorte com o deploy! ☕🚀**
