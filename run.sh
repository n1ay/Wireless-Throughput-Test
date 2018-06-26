#!/bin/bash

cd WebApp/server
pipenv run uwsgi --http 127.0.0.1:5000 --wsgi-file main_app.py --callable app --processes 4 --threads 2 --stats 127.0.0.1:9000
cd ../..
trap ../.. INT
