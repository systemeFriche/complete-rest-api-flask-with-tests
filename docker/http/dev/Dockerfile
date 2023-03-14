FROM python:3

ARG APP_ENV
ENV APP_ENV=$APP_ENV

RUN apt-get update -y \
    && apt-get upgrade -y \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install apidoc -g

WORKDIR /usr/src/app

COPY docker/http/script.sh /usr/src/
COPY api-requirements/ /usr/src/requirements

# script pour installer mariadb connector
# sinon erreur
#      MariaDB Connector/Python requires MariaDB Connector/C >= 3.3.1, found version 3.1.18
#      [end of output]
RUN pip install --upgrade pip \
    && wget https://dlm.mariadb.com/2862620/Connectors/c/connector-c-3.3.4/mariadb-connector-c-3.3.4-debian-bullseye-amd64.tar.gz \
        -O - | tar -zxf - --strip-components=1 -C /usr

RUN chmod +x /usr/src/script.sh && /usr/src/script.sh
