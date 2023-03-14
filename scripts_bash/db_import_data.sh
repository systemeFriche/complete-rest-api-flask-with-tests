#!/bin/bash

print_usage(){
  echo "Usage: $0 <dev | test | prod> [--lemans-proxy] [--help]"
}

print_help_and_exit(){
  echo "db_import_data - Outil pour importer des données dans la base de données."
  echo
  print_usage
  echo "Environnement : "
  echo "  dev :                  utilise la pile de services pour l'environnement de développement."
  echo "  test :                 utilise la pile de services pour l'environnement de tests."
  echo "  prod :                 utilise la pile de services pour l'environnement de recette ou de production."
  echo
  echo "Paramètres optionnels :"
  echo "  -lmp, --lemans-proxy  : configure la pile pour être exploitée derrière le proxy de Le Mans Université"
  echo "  - -h, --help : affiche cette aide."
  exit 0
}

typeEnv=$1

if [[ ! $DOCKER_FILE || ! $PROJECT_NAME ]]; then
  echo "No Env Var."
  source ./export_env_var.sh $1 $2
fi

if [[ ! $MYSQL_PASSWORD ]]; then
    echo "No Env Var."
    export $(cat ../docker/environment/$typeEnv/mariadb.env | grep -v '#' | awk '/=/ {print $1}')
fi

insert_import(){
  # ajout ligne import spécifique dans le fichier api/migrations/env.py
  migration=$(find ../api/migrations/versions -type f -name "*.py")
  awk 'NR==10{print "import main.utils"}1' $migration > migration_file.py
  rm $migration
  mv migration_file.py $migration   
}

import_data(){
  ./dcTool $1 $2 exec http python3 ./datafixtures/drop_all.py
  # docker compose --env-file ../docker/docker-compose.env -f $DOCKER_FILE -p $PROJECT_NAME exec db mysql -umariadb -p$MYSQL_PASSWORD  -e 'USE db_dev; DROP TABLE IF EXISTS alembic_version;'
  docker compose -f $DOCKER_FILE -p $PROJECT_NAME exec db mysql -umariadb -p$MYSQL_PASSWORD -e 'USE '$MYSQL_DATABASE'; DROP TABLE IF EXISTS alembic_version;'

  case $typeEnv in
    dev)
      if [ -d ../api/migrations ]; then
        rm -R ../api/migrations
      fi
      ;;
    test)
      ;;
    prod)
      docker compose -f $DOCKER_FILE -p $PROJECT_NAME exec http rm -R migrations
      ;;
  esac

  ./dcTool $1 $2 exec http flask db init 
  ./dcTool $1 $2 exec http flask db migrate
  # au besoin on peut ajouter à la main des lignes dans le fichier de migration
  # insert_import
  ./dcTool $1 $2 exec http flask db upgrade
  if [ -f ../docker/databasesInit/mariadb/$typeEnv/data/data_users.sql ]; then
    # si Windows, pour empêcher Git Bash de convertir les chemins
    # export MSYS_NO_PATHCONV=1
    # ./dcTool $1 $2 exec db psql -U postgres -d db_dev -f /db/data/data_users.sql
    # docker compose --env-file ../docker/docker-compose.env -f $DOCKER_FILE -p $PROJECT_NAME exec db mysql -umariadb -p$MYSQL_PASSWORD  -e 'USE db_dev; source /db/data/data_users.sql;'
    docker compose -f $DOCKER_FILE -p $PROJECT_NAME exec db mysql -umariadb -p$MYSQL_PASSWORD -e 'USE '$MYSQL_DATABASE'; source /db/data/data_users.sql;'
  fi
  
  if [ -f ../api/datafixtures/db_fixture.py ]; then
    # export MSYS_NO_PATHCONV=1
    ./dcTool $1 $2 exec http python3 ./datafixtures/db_fixture.py
  fi
}

case $1 in
    dev|test|prod)
        shift
        if [ "$1" == "-lmp" -o "$1" == "--lemans-proxy" ]; then
          proxyEnv="-lmp"
          shift
        else
          proxyEnv=""
        fi
        source ./export_env_var.sh $typeEnv $proxyEnv
        import_data $typeEnv $proxyEnv
        exit $? ;;
    -h|--help) print_help_and_exit;;
    *)
      echo "Paramètre incorrect \"$1\"" >&2;
      print_usage
      exit 1;;
  esac