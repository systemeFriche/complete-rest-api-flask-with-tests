FROM fguntz/python-node-cpltrestapi:1.0

ENV REACT_APP_API_EP_URI=https://preprod.apdmn.fr/api
ARG SECRET_KEY
ENV SECRET_KEY=$SECRET_KEY
ARG SECRET_KEY_AES
ENV SECRET_KEY_AES=$SECRET_KEY_AES
ARG SQLALCHEMY_DATABASE_URI
ENV SQLALCHEMY_DATABASE_URI=$SQLALCHEMY_DATABASE_URI
ARG GHCR_PAT
ENV GHCR_PAT=$GHCR_PAT

COPY api /usr/src/app

# je supprime le fichier .eslintrc.json car même si eslint n'est pas installé j'ai l'erreur lors de yarn install
# [eslint] Failed to load plugin 'cypress' declared in '.eslintrc.json': Cannot find module 'eslint-plugin-cypress' ????
RUN cd /tmp/app && yarn build \
    && rm -rf /usr/src/app/public \
    && mv /tmp/app/build /usr/src/app/public \
    && apt-get remove -y nodejs \
    && apt-get autoremove -y \
    && rm -rf /tmp/app

WORKDIR /usr/src/app

EXPOSE 80

CMD ["gunicorn", "--config", "gunicorn_config.py", "app:app"]
