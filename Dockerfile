FROM node:alpine
RUN apk add  --no-cache ffmpeg
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
EXPOSE 8080
CMD node app.js
