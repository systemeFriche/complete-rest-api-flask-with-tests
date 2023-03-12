#!/bin/bash
# SCRIPT À EXECUTER POUR CONSTRUIRE L'IMAGE DE BASE
# À FAIRE DÈS QUE NOUVEAU MODULE PYTHON OU NOUVEAU MODULE NODEJS POUR L'APPLICATION

version=1.0

docker build -f ../docker/http/prod/Dockerfile_base_image -t fguntz/python-node-cpltrestapi:$version ../
docker login
docker push fguntz/python-node-cpltrestapi:$version