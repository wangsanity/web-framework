#!/bin/bash

PORT=3000

function free_web_port() {
    echo "Killing process on port $PORT"
    lsof -ti :$PORT | xargs kill -9
}

free_web_port

INDEXHTML=./infra/build/index.html
PACKAGEJSON=./infra/package.json
if test -f "$INDEXHTML"; then
    echo "build folder exists. Remove it before copy"
    rmdir ./infra/build
else
    echo "Creating directory infra/build"
    mkdir -p ./infra/build
fi

echo "Copy build folder start"
cp -r ./dist/ ./infra/build
echo "Copy build folder finished"

echo "Running npm install"
cd ./infra
npm install
echo "npm install finished"

