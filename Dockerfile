# Dockerfile

FROM node:19.4.0-alpine

WORKDIR /app2/client

ENV npm_config_cache /app2/.cacheapi
ENV npm_config_cache /app2/client/.cacheapi

RUN apk --update add \
    curl;

COPY client .

RUN npm install --cache="/app/client/.cacheapi" --unsafe-perm=true --allow-root
RUN npm run build


WORKDIR /app2

ENV npm_config_cache /app2/.cacheapi

# COPY controllers ./controllers
COPY middleware ./middleware
# COPY models ./models
COPY routes ./routes
COPY app.js ./
COPY package.json ./
COPY helpers ./helpers
COPY local_saml_config ./local_saml_config

RUN npm install  --cache="/app2/.cacheapi" --unsafe-perm=true --allow-root
RUN chown -R node:node /app2
RUN chown -R node:node /app2/client/node_modules

COPY docker-entrypoint.sh /usr/local/bin

EXPOSE 9000

# HEALTHCHECK --interval=1m30s --timeout=10s \
#   CMD curl -f http://localhost:8080/ || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "start"]