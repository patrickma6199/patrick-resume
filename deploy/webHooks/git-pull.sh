#!/bin/bash
cd ./ || exit
git pull origin master
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
if [ "$LOCAL" != "$REMOTE" ]; then
    git pull origin master
    yarn
    docker compose up -d --build
fi