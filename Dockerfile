## Frontend Builder
FROM node:19.4.0-alpine AS frontend-builder

WORKDIR /app
COPY client ./

RUN npm install
RUN npm run build


# Release

FROM node:19.4.0-alpine AS release

WORKDIR /app

COPY helpers ./helpers
COPY middleware ./middleware
COPY routes ./routes

COPY app.js ./
COPY package.json ./

RUN apk --update add \
        curl \
    ;

COPY --from=frontend-builder /app/build ./client/build/

RUN npm install

COPY docker-entrypoint.sh /usr/local/bin

EXPOSE 9000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "start"]