FROM python:3

ARG APP_ENV
ENV APP_ENV=$APP_ENV

RUN apt-get update -y \
    && apt-get upgrade -y \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && npm install apidoc -g

WORKDIR /usr/src/app

COPY docker/http/script.sh /usr/src/
COPY api-requirements/ /usr/src/requirements

RUN chmod +x /usr/src/script.sh && /usr/src/script.sh
