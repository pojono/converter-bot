# README #

Бот для конвертирования аудиофайлов

Для того, чтобы запустить бота на виртуальной машине:


1. Склонировать репозиторий
git clone https://github.com/pojono/converter-bot.git
cd converter-bot


2. Задать значения переменных
set domain in docker-compose.yml
set domain in app.js
set token in telegram.js
(Как получить токен: https://core.telegram.org/bots)


3. Собрать docker образ и запустить его
docker build -t converter .
docker-compose up -d
