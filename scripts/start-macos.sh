#!/bin/bash

HOST_IP=$(ipconfig getifaddr en0) # ou en1 se for Wi-Fi
echo "HOST_IP=$HOST_IP" > .env

docker compose up --build