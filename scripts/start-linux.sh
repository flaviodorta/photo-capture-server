#!/bin/bash

HOST_IP=$(ip route get 1 | awk '{print $NF; exit}')

echo "HOST_IP=$HOST_IP" > .env

docker compose up --build