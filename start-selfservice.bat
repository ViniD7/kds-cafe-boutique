@echo off
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║   ☕ KDS Café Boutique - Inicializador                  ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo [1/2] Instalando dependencias do servidor...
cd selfservice-server
call npm install

echo.
echo [2/2] Iniciando servidor de pedidos...
echo.
echo Servidor rodara em: http://0.0.0.0:3000
echo Dashboard: http://localhost:3000/dashboard
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

start npm run dev

cd ..

echo.
echo ============================================================
echo Agora inicie o app principal com: npm run dev
echo.
echo Tablet: http://SEU_IP:5173/autoatendimento
echo Notebook: http://localhost:3000/dashboard
echo ============================================================
echo.
pause
