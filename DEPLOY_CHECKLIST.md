# ✅ Checklist Rápido de Deploy

## 📝 Antes de Começar
- [ ] Código pushado para o GitHub
- [ ] Conta criada no Render (https://render.com)
- [ ] Conta criada no Vercel (https://vercel.com)

---

## 🖥️ Passo 1: Deploy Backend (Render)

### Configuração do Serviço
- [ ] Criar novo Web Service no Render
- [ ] Conectar ao repositório GitHub
- [ ] **Root Directory:** `selfservice-server`
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `node server.js`
- [ ] **Region:** São Paulo ou Frankfurt
- [ ] **Plan:** Free

### Variáveis de Ambiente (no Render)
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = (deixar vazio por agora, atualizar depois)

### Após Deploy
- [ ] Copiar URL: `https://______________.onrender.com`
- [ ] Testar health check: `https://______________.onrender.com/health`
- [ ] Verificar se retorna JSON com `"status": "ok"`

---

## 🌐 Passo 2: Deploy Frontend (Vercel)

### Configuração do Projeto
- [ ] Criar novo projeto no Vercel
- [ ] Importar repositório GitHub
- [ ] **Framework:** Vite
- [ ] **Build Command:** `npm run build`
- [ ] **Output Directory:** `dist`

### Variáveis de Ambiente (no Vercel)
- [ ] `VITE_BACKEND_URL` = `https://______________.onrender.com` (URL do Render)

### Após Deploy
- [ ] Copiar URL: `https://______________.vercel.app`
- [ ] Testar acesso: `https://______________.vercel.app/autoatendimento`

---

## 🔗 Passo 3: Configurar CORS

### Voltar ao Render
- [ ] Ir em **Environment** no painel do Render
- [ ] Atualizar `FRONTEND_URL` = `https://______________.vercel.app`
- [ ] Salvar (vai fazer redeploy automático)
- [ ] Aguardar deploy completar

---

## ✅ Passo 4: Testar Tudo

### Teste Completo
- [ ] Acessar autoatendimento: `https://______________.vercel.app/autoatendimento`
- [ ] Adicionar produto ao carrinho
- [ ] Finalizar pedido
- [ ] Preencher nome e pagamento
- [ ] Enviar pedido
- [ ] Acessar dashboard: `https://______________.onrender.com/dashboard`
- [ ] **Verificar se o pedido apareceu!** ✅

---

## 📊 URLs Finais

| Serviço | URL |
|---------|-----|
| Autoatendimento | `https://______________.vercel.app/autoatendimento` |
| Dashboard Atendente | `https://______________.onrender.com/dashboard` |
| Health Check | `https://______________.onrender.com/health` |

---

## 🎯 Pós-Deploy (Opcional)

### Man Backend Acordado
- [ ] Criar conta no UptimeRobot (https://uptimerobot.com)
- [ ] Adicionar monitor para: `https://______________.onrender.com/health`
- [ ] Configurar intervalo: 5 minutos

### Custom Domain (Opcional)
- [ ] Configurar domínio customizado no Vercel
- [ ] Configurar DNS
- [ ] Atualizar `FRONTEND_URL` no Render

---

## 🚨 Se Algo Der Errado

- [ ] Verificar logs no Render
- [ ] Verificar logs no Vercel
- [ ] Confirmar variáveis de ambiente
- [ ] Testar health check do backend
- [ ] Verificar console do navegador (F12)

---

**Status:** ⬜ Não Iniciado | 🔄 Em Progresso | ✅ Concluído
