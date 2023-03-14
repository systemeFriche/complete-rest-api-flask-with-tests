#!/bin/bash

if [[ ! $MYSQL_PASSWORD ]]; then
    echo "No Env Var."
    export $(cat ../docker/environment/dev/mariadb.env | grep -v '#' | awk '/=/ {print $1}')
fi

# code pour exporter juste les données de la table USERS
# ./dcTool dev exec db pg_dump db_dev --username=postgres --data-only --table=users --file=/db/data/data_users.sql
./dcTool dev exec db mysqldump -umariadb -p$MYSQL_PASSWORD db_dev users > /db/data/data_users.sql
#./dcTool dev cp db:/tmp/init_users.sql ../docker/databasesInit/postgres/dev/init_users.sql

#docker compose -f ../docker/docker-compose-dev.yml --env-file ../docker/docker-compose.env -p cpltrestapi-dev cp db:/db/data/data_db_dev.sql ../docker/databasesInit/mariadb/dev/data/