# README #

Бот для конвертирования аудиофайлов


git clone https://github.com/pojono/converter-bot.git
cd converter-bot

set domain in docker-compose.yml
set domain in app.js
set token in telegram.js

docker build -t converter .
docker-compose up -d
