#!/bin/bash
# code pour exporter juste les données de la table USERS
# TODO exporter toutes les données de la base pas que users
./dcTool dev exec db pg_dump db_dev --username=postgres --data-only --table=users --file=/db/data/data_users.sql
#./dcTool dev cp db:/tmp/init_users.sql ../docker/databasesInit/postgres/dev/init_users.sql
