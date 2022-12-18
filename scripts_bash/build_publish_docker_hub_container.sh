#!/bin/bash

#build and push flask container
docker build -t fguntz/demo-git-flask-dev -f ../docker/http/Dockerfile --build-arg APP_ENV=development ..
docker image push fguntz/demo-git-flask-dev
#build and push front container
docker build -t fguntz/demo-git-front-dev -f ../docker/front/Dockerfile ..
docker image push fguntz/demo-git-front-dev