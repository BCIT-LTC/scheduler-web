#!/usr/bin/env sh
set -e


# If secrets are being injected by Vault (latest/stable environments only), set them as ENV VARS and store them in .env file
# Required secret: JWT_TOKEN_SIGNING_KEY
#
if [ -f "/vault/secrets/auth-signing-key" ]; then grep -v -e '^#' -e '^[[:space:]]*$' /vault/secrets/auth-signing-key >> .env; 
set -o allexport && source .env && set +o allexport;fi


# Verify that the minimally required environment variables are set.
#
if [ -z "$LOCAL_USER" ] || [ -z "$LOCAL_PASSWORD" ] || [ -z "$JWT_TOKEN_SIGNING_KEY" ]; then
    printf 'environment variables are not set\n\tYou need to specify LOCAL_USER, LOCAL_PASSWORD, JWT_TOKEN_SIGNING_KEY\n'
    exit 1
fi


# Inject SAML IdP certificate secret and manipulate to meet passport.js requirements
#
if [ -n "${SAML_IDP_CERTIFICATE}" ]; then
    echo "Review/dev branch SAML IdP certificate injection..."
    echo -e "\nSAML_IDP_CERT_STRING=$(echo "${SAML_IDP_CERTIFICATE}" | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
elif [ -f "/vault/secrets/saml-idp-certificate.crt" ]; then
    echo "Injecting SAML IdP certificate from Vault..."
    echo -e "\nSAML_IDP_CERT_STRING=$(cat /vault/secrets/saml-idp-certificate.crt | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
# elif [ -f "/vault/secrets/bcit-saml-idp-certificate.crt" ]; then
#     echo "Injecting BCIT SAML IdP certificate from Vault..."
#     echo -e "\nSAML_IDP_CERT_STRING=$(cat /vault/secrets/bcit-saml-idp-certificate.crt | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
else
    echo "Vault secret doesn't exist...using default from /simplesaml/idp.crt instead..."
    echo -e "\nSAML_IDP_CERT_STRING=$(cat /simplesaml/idp.crt | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
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
