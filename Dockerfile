## Frontend Builder
FROM node:19.4.0-alpine AS frontend-builder

WORKDIR /app
COPY client ./

RUN npm install
RUN npm run build


# Release

FROM node:19.4.0-alpine AS release

LABEL maintainer courseproduction@bcit.ca
ARG VERSION
ENV VERSION=${VERSION:-0.0.0}

WORKDIR /app
COPY --from=frontend-builder /app/build ./client/build/
RUN apk --update add \
        curl \
    ;

COPY helpers ./helpers
COPY middleware ./middleware
COPY routes ./routes
COPY app.js ./
COPY package.json ./

RUN npm install

# Copy and run init script
COPY docker-entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "run", "prod"]