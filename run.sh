#!/bin/bash

cd WebApp/server
python3 server.py
cd ../..
trap ../.. INT
