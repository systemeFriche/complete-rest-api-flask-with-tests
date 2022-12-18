FROM python:3

ARG APP_ENV
ENV APP_ENV=$APP_ENV

COPY api /usr/src/app
COPY app/build /usr/src/app/public

WORKDIR /usr/src/app

# script pour gérer l'installation des modules python
COPY docker/http/script.sh /usr/src/
COPY api-requirements/ /usr/src/requirements
RUN chmod +x /usr/src/script.sh && /usr/src/script.sh

# Pas besoin de cette ligne avec Heroku
# EXPOSE 5000

# executer l'image en tant que non root
# RUN adduser -d myuser
# USER myuser

CMD ["gunicorn", "--config", "gunicorn_config.py", "app:app"]
