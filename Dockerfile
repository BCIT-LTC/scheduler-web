# Dockerfile

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

## Frontend Builder
FROM node:19.4.0 AS frontend-builder

WORKDIR /app

COPY ./client/package.json ./
RUN npm install

COPY ./client .

RUN npm run build

## Release
FROM node:19.4.0-alpine AS release

LABEL maintainer courseproduction@bcit.ca
ARG VERSION
ENV VERSION=${VERSION:-0.0.0}

WORKDIR /app


RUN apk --update add \
    curl \
    ;

COPY package.json ./


COPY ./services ./services/
COPY ./middleware ./middleware/
COPY ./routes ./routes/
COPY ./app.js ./
COPY ./logger.js ./
COPY ./saml ./saml/

RUN npm install

COPY --from=frontend-builder /app/build ./client/build/

# Copy and run init script
COPY docker-entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["npm", "start"]