#!/bin/bash
cd ./ || exit
git pull origin master
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
if [ "$LOCAL" != "$REMOTE" ]; then
    git pull origin master
    timeout 5s yarn
    timeout 5s docker compose up -d --build
fi