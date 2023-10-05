#!/usr/bin/env sh

set -e


# Verify that the minimally required environment variables are set.
#
if [ -z "${ADMIN_USERNAME}" ] || [ -z "${ADMIN_PASSWORD}" ] || [ -z "${JWT_AUTH_SIGNING_KEY}" ]; then
    printf "environment variables are not set.\n\t You need to specify ADMIN_USERNAME, ADMIN_PASSWORD, and JWT_AUTH_SIGNING_KEY\n"
    exit 1
fi


# Configure environment variables
#
#   - SAML_IDP_CERTIFICATE (required by passport.js) should be base64 encoded
#
if [ -n "${SAML_IDP_CERTIFICATE}" ]; then
    printf "SAML_IDP_CERTIFICATE environment variable is set. Using it..."

else
    printf "SAML_IDP_CERTIFICATE environment variable is not set.\n\t Using the default certificate from /simplesaml/idp.crt instead..."
    export SAML_IDP_CERTIFICATE=$(base64 -w 0 ./simplesaml/idp.crt)
fi


# If API_URL is set, use it. Otherwise, fall back to the default
#
if [ -n "${API_URL}" ]; then
    echo API_URL is set...setting API_URL to ${API_URL}
else
    echo API_URL is not set. Using the default: https://latest--scheduler-api.ltc.bcit.ca/api/
    export API_URL="https://latest--scheduler-api.ltc.bcit.ca/api/"
fi


# Store vars in `.env` so they can be picked-up by the app
#
printf "SAML_IDP_CERTIFICATE=%s\nAPI_URL=%s\n" "${SAML_IDP_CERTIFICATE}" "${API_URL}" > .env

# Return to parent shell to run app
#
>&2 echo "Starting app..."

exec "$@"
