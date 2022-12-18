#!/bin/bash
# il faut avoir un fichier http_secret.env dans le dossier docker/environment/prod/
#       avec comme env var SECRET_KEY et SQLALCHEMY_DATABASE_URI
# il faut être loggué à heroku avant d'exécuter cette commande
# il faut disposer de l'Heroku API key
# heroku login
# heroku container:login
# ATTENTION : il faut que le fichier /docker/environment/prod/http.env et http_secret.env ait leur dernière ligne vide

HEROKU_APP_NAME=complete-rest-api-flask
# build des fichiers source du front
APP_PATH=/Users/fguntz/Documents/GitHub/complete-rest-api-flask-with-tests/
# build des fichiers source du front
docker container run --volume $APP_PATH/app:"/var/www/app" --workdir "/var/www/app" --env-file $APP_PATH/docker/environment/prod/yarn.env --name  $HEROKU_APP_NAME-prod-yarn node:14 bash -c "yarn install && yarn build"
docker container rm $HEROKU_APP_NAME-prod-yarn
# build serveur Python
docker build -t registry.heroku.com/$HEROKU_APP_NAME/web -f ../docker/http/prod/Dockerfile --build-arg APP_ENV=production ..
docker push registry.heroku.com/$HEROKU_APP_NAME/web
heroku container:release web --app=$HEROKU_APP_NAME

cat ../docker/environment/prod/http.env ../docker/environment/prod/http_secret.env ../docker/environment/global.env > heroku_env.env
sed -i '' '1i\
    # Générer automatiquement par la commande heroku_deploy_prod_container.sh
    ' heroku_env.env
heroku.env --app $HEROKU_APP_NAME --env-file heroku_env.env
rm heroku_env.env