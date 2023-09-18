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


# Inject SAML IdP certificate secret from Vault or use default
#
if [ -n "${SAML_IDP_CERTIFICATE}" ]; then
    echo "Review/dev branch SAML IdP certificate injection..."
    # echo -e "\nSAML_IDP_CERT_STRING=$(echo "${SAML_IDP_CERTIFICATE}" | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
    
    echo "MIIClTCCAX0CBgGKZuexVTANBgkqhkiG9w0BAQsFADAOMQwwCgYDVQQDDANsdGMwHhcNMjMwOTA1MTk1MTE0WhcNMzMwOTA1MTk1MjU0WjAOMQwwCgYDVQQDDANsdGMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCiMxbGDJ2/Ys0s2XY5iBlRwEHPwXVGBTYbAvYIMkTiZ/6y0qiy2MuM7kxfpxiVF2ZmbMDe0/gduavNS5bwn3ZvQtGOExu9zx9JchiA71Ycdl7lZ9smDvZ0FrAtMOmkRomoo9WdqHySYSsPRw8EcsPig10rRBbWhFGqZBpDQO0enT/UJyQyKb7rAs3R19h4ugSx1lI25XV8rj4X3U9RLO12DEHsPE83SGT6EBAtXEZihYzhMqg0L0S0urvrntRRKGmReeRHRpY5f4PWsHm0zN0Mh/KRfpL6cmy1436RQt/h81XIWx2KBLim+8O1uo17tq9R5Ymxa1AOOYLa1d+GLijdAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAHrJJXv3uVpGhsoHlpQhzpJRWzo9Sm7y9iS2BVGa7pcoTX52J2ICuEE0TN+4rEKW1bwVurC1BOTbV2OZSbG1vW4GHVvVJfXGlQ9wz+MmFDhOW9VGQaBSavzgPv7mBgJk/pl3mircQFOnYGpX2PmgRnW+oPaEqVDt6IRsvnZAsHTg+pIF8fBvU+gVpTx/22kblfRl9vQrpHy33iAX127BjHxdQaWWpluryk2EQrrxeUmssMVNllTr9pNO2vMHl/m61oEE8EF+bFWLr0EUxb5HqXb7exGuj0lwOYiQfFVi7Or0a1t+Psc+XWCOvoAuCc7oL1yLOT84GyqWqzl2h9oYotg=" > idp.crt

    # echo "${SAML_IDP_CERTIFICATE}" > idp.crt

elif [ -f "/vault/secrets/saml-idp-certificate.crt" ]; then
    echo "Injecting SAML IdP certificate from Vault..."
    # echo -e "\nSAML_IDP_CERT_STRING=$(cat /vault/secrets/saml-idp-certificate.crt | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
    echo -e "$(cat /vault/secrets/saml-idp-certificate.crt)" > idp.crt

# elif [ -f "/vault/secrets/bcit-saml-idp-certificate.crt" ]; then
#     echo "Injecting BCIT SAML IdP certificate from Vault..."
#     echo -e "\nSAML_IDP_CERT_STRING=$(cat /vault/secrets/bcit-saml-idp-certificate.crt | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
else
    echo "Vault secret doesn't exist...using default from /simplesaml/idp.crt instead..."
    # echo -e "\nSAML_IDP_CERT_STRING=$(cat ./simplesaml/idp.crt | sed 1d | sed '$ d' | awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' | sed 's/\\n//g')" >> .env
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
