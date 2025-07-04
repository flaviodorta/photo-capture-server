🖥️ Como rodar o servidor

🔷 Windows:

1. Abra o PowerShell

2. Habilite a execução de scripts temporariamente (se ainda não estiver habilitado):

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

3. Execute o script de inicialização localizado na pasta scripts:

./scripts/start-windows.ps1

🐧 Linux:

1. Dê permissão de execução ao script (apenas na primeira vez):

chmod +x scripts/start-linux.sh

2. Execute o script:

./scripts/start-linux.sh

🍎 macOS:

1. Dê permissão de execução ao script (apenas na primeira vez):

chmod +x scripts/start-macos.sh

2. Execute o script:

./scripts/start-macos.sh

🔧 O que os scripts fazem?

- Detectam automaticamente o IP local da sua máquina.

- Salvam esse IP no arquivo .env como HOST_IP.

- Executam o docker compose up --build para subir os containers do projeto.
