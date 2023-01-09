#!/bin/sh
# wait-for-mysql.sh

set -e
  
host="$1"
# Shift arguments with mapping:
# - $0 => $0
# - $1 => <discarded>
# - $2 => $1
# - $3 => $2
# - ...
# This is done for `exec "$@"` below to work correctly
shift
  
# Login for user (`-U`) and once logged in execute quit ( `-c \q` )
# If we can not login sleep for 1 sec

until ! $(npx sequelize-cli db:migrate --migrations-path ./src/migrations/ 2>$1)
do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "MySQL is up - executing command"
# Print and execute all other arguments starting with `$1`
# So `exec "$1" "$2" "$3" ...`
exec "$@"