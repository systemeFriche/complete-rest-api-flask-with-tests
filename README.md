# BOILERPLATE FLASK API

Ce boilerplate contient la structure complète d'une API Flask interrogée par un front React.

L'API Flask gère l'authentification des requêtes avec des Token. Les données sont stockées dans une base de données PostgreSQL.
La documentation de l'API est générée à l'aide de l'outil APIDOC.
Les tests côté Flask sont gérés à l'aide du module pytest.
Le front est codé en React v18. Le store de ce front est géré avec Redux.
Les test côté React sont gérés par React Testing Library. 

## Pile Docker

Il faut se placer dans le dossier scripts_bash

### Démarrage pile

```bash
./dcTool dev up
```

### Arrêt pile en conservant les données de la bdd

```bash
./dcTool dev down
```

### Arrêt pile en supprimant les données de la bdd

```bash
./dcTool dev down -v
```

### Pour se connecter au conteneur http de la pile dev (flask)

```bash
./connect_flask_container.sh dev http
```

### Pour se connecter au conteneur db de la pile dev (postgresql)

```bash
./connect_postgres_container.sh dev db
```

### Pour se connecter au conteneur yarn de la pile dev (front REACT)

```bash
./connect_yarn_container.sh dev yarn
```

### Pour générer la documentation de l'API

```bash
./create_apidoc.sh
```

## Accès serveur en mode dév

Le serveur flask est lancé à l'adresse : http://127.0.0.0.1:5000/api

La documentation est disponible à l'adresse : http://127.0.0.0.1:5000/api/docs

Le front est automatiquement lancé à l'adresse : http://127.0.0.1:3000

## Pré-requis ordinateur local

- docker
- docker-compose
- python3 # TODO : a priori pas besoin, à vérifier
- disposer de l'Heroku API key de l'application qu'on souhaite configurer
- module python heroku.env : pour configurer les variables d'environnement d'une application heroku à partir d'un fichier .env
- node

## Mise en production

Il faut d'abord lancer l'environnement de prod sur sa machine locale, puis ensuite exécuter le script de mise en production sur Heroku. La mise en production locale va exécuter au préalable le build du front React. Le code ainsi généré sera copié dans l'image du back-end afin d'être publié.

```bash
./dcTool prod up --build
./heroku_deploy_prod_container.sh
```

# BASE DE DONNÉES

Pour peupler la base de données de la pile de dev, il faut exécuter le script suivant : 

```bash
$ ./db_import_data.sh dev
```

Ce script gère l'import du fichier ./docker/databasesInit/mariadb/dev/data/data_users.sql s'il existe. 
Et il exécute le script python ./api/datafixtures/db_fixture.py s'il existe. 

# ENVIRONNEMENT VSCODE DE DEV/DEBUG DE L'APPLICATION WEB

## Procédure pour debugguer le Back

Il faut d'abord suivre cette procédure, car l'application flask ne se lance que lorsque vs code a lancé son debug sur le port 5678

1. Lancez la pile docker dev
2. Ouvrir la palette vs code
3. Dev containers : Attach to running containers...
4. Choisir cpltrestapi-dev_http-1
5. Exécutez le Debug vs code "Python Remote Attach"
6. Le serveur Flask se lance en mode debug

## Procédure pour debugguer le Front

1. La pile docker dev doit être lancée
2. Dans une console bash, se placer dans le dossier ./script_bash, exécutez la commande :

```bash
$ ./launch_chromium.sh
```

3. Dans la fenête Chromium qui vient de s'ouvrir, se rendre dans l'application web : http://127.0.0.1:3000
4. Exécutez le Debug vs code "Attach to Chromium"
5. Mettre des points d'arrêt à l'endroit où vous souhaitez debugguer votre code, testez via le client web chromium, l'application devrait s'arrêter au niveau des points d'arrêt

Vous êtes prêt·e·s à développer et à debugguer.

# TODO

TODO: faire le ménage dans les fichiers à la racine docker-compose.debug.yml et docker-compose.yml
