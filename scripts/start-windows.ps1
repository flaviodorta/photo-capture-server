$ip = (Get-NetIPAddress -AddressFamily IPv4 -PrefixOrigin Dhcp | Where-Object { $_.IPAddress -notlike '169.*' }).IPAddress
"HOST_IP=$ip" | Set-Content .env
docker compose up --build