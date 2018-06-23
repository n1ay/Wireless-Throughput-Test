#!/bin/bash

back_to_main_dir() {
	CURRENT_DIR=$(pwd | sed 's\.*/\\')
	if [ "$CURRENT_DIR" == "static" ]
	then
		cd ../..
	fi
}

sudo pip3 install -r python-requirements.txt
cd WebApp/static
npm install
npm run build
cd ../..
trap back_to_main_dir INT
