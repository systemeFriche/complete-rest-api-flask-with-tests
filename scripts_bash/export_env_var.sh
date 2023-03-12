#!/bin/bash
# ATTENTION IL FAUT EXECUTER CE SCRIPT POUR DEFINIR LES VARIABLES D'ENV UTILE A DCTOOL
# création des variables d'environnement suivantes :
# APP_ENV
# MYSQL_PUBLIC_PORT
# PROJECT_NAME
# DOCKER_FILE

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


# Local .env
if [ -f script.env ]; then
    # Load Environment Variables
    export $(cat script.env | grep -v '#' | awk '/=/ {print $1}')
else
  PRJ_NAME=myapp
fi

if [ $# -eq 0 ]; then
  echo "Il manque un paramètre." >&2
  print_usage
  exit 1
fi

case $1 in
  dev|test|prod) typeEnv=$1;;
  -h|--help) print_help_and_exit;;
  *)
    echo "Paramètre incorrect \"$1\"" >&2;
    print_usage
    exit 1;;
esac
shift

if [ "$1" == "-lmp" -o "$1" == "--lemans-proxy" ]; then
  useProxyEnv=1
  shift
fi

if [ "$1" == "-h" -o "$1" == "--help" ]; then
  print_help_and_exit
fi

case $typeEnv in

  dev)
    export APP_ENV=development
    export MYSQL_PUBLIC_PORT=3306
    export MYSQL_DATABASE=db_dev
    if [ ! -z "${useProxyEnv}" ] ; then
      dcFile="../docker/docker-compose-dev-lemansproxy.yml"
    else
      dcFile="../docker/docker-compose-dev.yml"
    fi
    prjName="${SHORT_NAME_PROJECT}-dev"
    ;;

  test)
    export APP_ENV=test
    export MYSQL_PUBLIC_PORT=3307
    export MYSQL_DATABASE=db_test
    if [ ! -z "${useProxyEnv}" ] ; then
      dcFile="../docker/docker-compose-test-lemansproxy.yml"
    else
      dcFile="../docker/docker-compose-test.yml"
    fi
    prjName="${SHORT_NAME_PROJECT}-test"
    ;;

  prod)
    export APP_ENV=production
    export MYSQL_PUBLIC_PORT=3308
    export MYSQL_DATABASE=db_prod
    export APP_TITLE='My WebApp Front'
    export REACT_APP_API_EP_URI=http://127.0.0.1/api
    if [ ! -z "${useProxyEnv}" ] ; then
      dcFile="../docker/docker-compose-prod-lemansproxy.yml"
    else
      dcFile="../docker/docker-compose-prod.yml"
    fi
    prjName="${SHORT_NAME_PROJECT}-prod"
    ;;
esac

export PROJECT_NAME=${prjName}
export DOCKER_FILE=${dcFile}

