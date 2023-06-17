#!/usr/bin/env sh
set -e


>&2 echo "initializing app .."
# add your init logic here if needed
# import envs etc...


# Return to parent shell to run app
>&2 echo "Starting app..."

exec "$@"

