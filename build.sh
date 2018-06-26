#!/bin/bash

back_to_main_dir() {
	CURRENT_DIR=$(pwd | sed 's\.*/\\')
	if [ "$CURRENT_DIR" == "static" ]
	then
		cd ../..
	fi
}

pipenv update
cd WebApp/static
npm install
npm run build
cd ../..
trap back_to_main_dir INT
