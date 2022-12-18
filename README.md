# BOILERPLATE FLASK API

Ce boilerplate contient la structure complète d'une API Flask interrogée par un front React. 

L'API Flask gère l'authentification des requêtes avec des Token. Les données sont stockées dans une base de données PostgreSQL. 
La documentation de l'API est générée à l'aide de l'outil APIDOC. 
Les tests côté Flask sont gérés à l'aide du module pytest. 

Le front est codé en React v18. Le store de ce front est géré avec Redux. 


## pile Docker

Il faut se placer dans le dossier scripts_bash

### démarrage pile
```bash
./dcTool dev up
```

### arrêt pile en conservant les données de la bdd
```bash
./dcTool dev down
```

### arrêt pile en supprimant les données de la bdd
```bash
./dcTool dev down -v
```

### pour se connecter au conteneur http (flask)
```bash
./connect_flask_container_dev.sh
```

### pour se connecter au conteneur db (postgresql)
```bash
./connect_postgres_container_dev.sh
```

### pour se connecter au conteneur yarn (front REACT)
```bash
./connect_yarn_container_dev.sh
```

### pour générer la documentation de l'API
```bash
./create_apidoc.sh
```


## accès serveur

Le serveur flask est automatiquement lancé à l'adresse : http://127.0.0.0.1:5000/api

La documentation est disponible à l'adresse : http://127.0.0.0.1:5000/api/docs

Le front est automatiquement lancé à l'adresse : http://127.0.0.1:3000

## pré-requis ordinateur local

* docker
* docker-compose
* python3
* disposer de l'Heroku API key de l'application qu'on souhaite configurer
* module python heroku.env : pour configurer les variables d'environnement d'une application heroku à partir d'un fichier .env

## mise en production

Il faut d'abord lancer l'environnement de prod sur sa machine locale, puis ensuite exécuter le script de mise en production sur Heroku. La mise en production locale va exécuter au préalable le build du front React. Le code ainsi généré sera copié dans l'image du back-end afin d'être publié. 

```bash
./dcTool prod up --build
./heroku_deploy_prod_container.sh
```


TODO: faire le ménage dans les fichiers à la racine docker-compose.debug.yml et docker-compose.yml

