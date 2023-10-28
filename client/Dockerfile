FROM node:19.4.0 AS frontend-builder

WORKDIR /app

COPY ./client/package.json ./

RUN npm install

COPY ./client ./

RUN npm run build
