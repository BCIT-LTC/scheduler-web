#!/bin/sh

# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

set -e


# Verify that the minimally required environment variables are set.
#
if [ -z "${JWT_AUTH_SIGNING_KEY}" ]; then
    printf "environment variables are not set.\n\t You need to specify JWT_AUTH_SIGNING_KEY\n"
    exit 1
fi


# If API_URL is set, use it. Otherwise, fall back to the default
#
if [ -n "${API_URL}" ]; then
    echo API_URL is set...setting API_URL to ${API_URL}
else
    echo API_URL is not set. Using the default: https://latest--scheduler-api.ltc.bcit.ca/api/
    printf "API_URL=https://latest--scheduler-api.ltc.bcit.ca/api/" > .env
fi


# Return to parent shell to run app
#
>&2 echo "Starting app..."

exec "$@"
