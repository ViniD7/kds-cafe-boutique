@echo off
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║   ☕ KDS Café - Descobrir IP da Rede                    ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Seu endereco IP atual:
echo.

ipconfig | findstr /i "IPv4"

echo.
echo ============================================================
echo Copie o endereco IP acima (ex: 192.168.1.100)
echo e cole no arquivo: src/features/selfService/config.ts
echo.
echo Procure por: serverIP: 'auto'
echo Troque por:  serverIP: 'SEU_IP_AQUI'
echo ============================================================
echo.
pause
