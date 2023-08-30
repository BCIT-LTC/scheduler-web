#!/usr/bin/env sh
set -e

# Get secrets from Vault init container (latest/stable environments only) and set as ENV VARS
touch .env
if [ -f "/vault/secrets/config" ]; then grep -v -e '^#' -e '^[[:space:]]*$' /vault/secrets/config >> .env; 
if [ -f "/vault/secrets/keycloak" ]; then grep -v -e '^#' -e '^[[:space:]]*$' /vault/secrets/keycloak >> .env; 
set -o allexport && source .env && set +o allexport;fi

# Verify that the minimally required environment variables are set.
if [ -z "$LOCAL_USER" ] || [ -z "$LOCAL_PASSWORD" ] || [ -z "$JWT_TOKEN_SIGNING_KEY" ]; then
    printf 'environment variables are not set\n\tYou need to specify LOCAL_USER, LOCAL_PASSWORD, JWT_TOKEN_SIGNING_KEY\n'
    exit 1
fi

>&2 echo "initializing app .."

# Verify API_URL is set otherwise fall back to default
if [ -z "$API_URL" ]; then
    echo API_URL is not set...default API_URL is used instead: https://latest--scheduler-api.ltc.bcit.ca/api/
    echo API_URL=https://latest--scheduler-api.ltc.bcit.ca/api/ >> .env
else
    echo API_URL is set to $API_URL
    echo API_URL=$API_URL >> .env
fi

# Return to parent shell to run app
>&2 echo "Starting app..."

exec "$@"

