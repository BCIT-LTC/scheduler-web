#!/usr/bin/env sh

set -e


# Verify that the minimally required environment variables are set.
#
if [ -z "$LOCAL_USER" ] || [ -z "$LOCAL_PASSWORD" ] || [ -z "$JWT_AUTH_SIGNING_KEY" ]; then
    printf 'environment variables are not set\n\tYou need to specify LOCAL_USER, LOCAL_PASSWORD, JWT_AUTH_SIGNING_KEY\n'
    exit 1
fi


# Inject SAML IdP certificate secret from Vault or use default
#
if [ -n "${SAML_IDP_CERTIFICATE}" ]; then
    echo "SAML IdP certificate env var present. Using..."
    echo "${SAML_IDP_CERTIFICATE}" > idp.crt

else
    echo "SAML IdP certificate env var doesn't exist...using default from /simplesaml/idp.crt instead..."
    echo -e "$(cat ./simplesaml/idp.crt)" > idp.crt
fi


# Verify API_URL is set otherwise fall back to default
#
if [ -z "$API_URL" ]; then
    echo API_URL is not set...default API_URL is used instead: https://latest--scheduler-api.ltc.bcit.ca/api/
    echo API_URL=https://latest--scheduler-api.ltc.bcit.ca/api/ >> .env
else
    echo API_URL is set to $API_URL
    echo API_URL=$API_URL >> .env
fi


# Return to parent shell to run app
#
>&2 echo "Starting app..."

exec "$@"
