# Dockerfile

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

## Release
FROM node:21.7-alpine AS release

LABEL maintainer courseproduction@bcit.ca
ARG VERSION
ENV VERSION=${VERSION:-0.0.0}

WORKDIR /app

RUN apk --update add \
    curl \
    ;

COPY package.json ./
COPY ./saml ./saml/
COPY ./public ./public/
COPY ./src ./src/
COPY ./index.html ./index.html
COPY ./vite.config.js ./vite.config.js

RUN npm install
RUN npm run build

# COPY --from=frontend-builder /app/build ./client/build/

# Copy and run init script
COPY docker-entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["npm", "start"]