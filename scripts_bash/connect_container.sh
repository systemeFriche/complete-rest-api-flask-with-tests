#!/bin/bash

#TODO: gérer l'argument optionnel --lemans-proxy
print_usage(){
  echo "Usage: $0 <dev | test | prod> [nameContainer] [--help]"
}

print_help_and_exit(){
  echo "connect_container - Outil pour se connecter à un conteneur d'une pile Docker"
  echo
  print_usage
  echo "Environnement : "
  echo "  dev :                  utilise la pile de services pour l'environnement de développement."
  echo "  test :                 utilise la pile de services pour l'environnement de tests."
  echo "  prod :                 utilise la pile de services pour l'environnement de recette ou de production."
  echo
  echo "Nom du comteneur :"
  echo "  name :                 nom du conteneur sur lequel on veut se connecter"
  exit 0
}

if [ -z "$1" ]; then
  echo "Il manque les paramètres." >&2;
  print_usage
  exit 1
fi

case $1 in
  dev|test|prod) 
    if [ -z "$2" ]; then
      echo "Le nom du conteneur est manquant." >&2;
      print_usage
      exit 1
    else
      if [ "$2" == "db" ]; then
        cmd="psql -U postgres"
      else
        cmd="bash"
      fi
    fi
  ;;
  -h|--help) print_help_and_exit
  ;;
  *)
    echo "Paramètre(s) incorrect(s) \"$1\"" >&2;
    print_usage
    exit 1
  ;;
esac

./dcTool $1 exec $2 ${cmd}