#!/bin/bash

print_usage(){
  echo "Usage: $0 <dev | test | prod> [--lemans-proxy] [--help]"
}

print_help_and_exit(){
  echo "export_env_var - Outil pour générer des variables d'environnement pour la gestion de vos piles Docker."
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

insert_import(){
    # ajout ligne import spécifique dans le fichier api/migrations/env.py
    migration=$(find ../api/migrations/versions -type f -name "*.py")
    awk 'NR==10{print "import main.utils"}1' $migration > migration_file.py
    rm $migration
    mv migration_file.py $migration   
}

import_data(){
    ./dcTool $1 $2 exec http python3 ./datafixtures/drop_all.py
    docker compose --env-file ../docker/docker-compose.env -f $DOCKER_FILE -p $PROJECT_NAME exec db psql -U postgres -d db_dev -c 'DROP TABLE IF EXISTS alembic_version;'

    if [ -d ../api/migrations ]; then
        rm -R ../api/migrations
    fi

    ./dcTool $1 $2 exec http flask db init 
    ./dcTool $1 $2 exec http flask db migrate
    # au besoin on peut ajouter à la main des lignes dans le fichier de migration
    # insert_import
    ./dcTool $1 $2 exec http flask db upgrade
    #TODO voir si c'est possible de se connecter à distance au conteneur db pour lancer l'import
    if [ -f ../docker/databasesInit/postgres/dev/data/data_users.sql ]; then
      # si Windows, pour empêcher Git Bash de convertir les chemins
      # export MSYS_NO_PATHCONV=1
      ./dcTool $1 $2 exec db psql -U postgres -d db_dev -f /db/data/data_users.sql
    fi
    if [ -f ../api/datafixtures/db_fixture.py ]; then
      # export MSYS_NO_PATHCONV=1
      ./dcTool $1 $2 exec http python3 ./datafixtures/db_fixture.py
    fi
}

case $1 in
    dev|test|prod)
        typeEnv=$1
        shift
        if [ "$1" == "-lmp" -o "$1" == "--lemans-proxy" ]; then
          proxyEnv="-lmp"
          shift
        else
          proxyEnv=""
        fi
        source ./export_env_var.sh ${typeEnv} ${proxyEnv}
        import_data ${typeEnv} ${proxyEnv}
        exit $? ;;
    -h|--help) print_help_and_exit;;
    *)
      echo "Paramètre incorrect \"$1\"" >&2;
      print_usage
      exit 1;;
  esac