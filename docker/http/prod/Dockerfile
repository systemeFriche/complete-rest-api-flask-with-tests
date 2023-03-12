FROM fguntz/python-node-cpltrestapi:1.0

ARG REACT_APP_API_EP_URI
ENV REACT_APP_API_EP_URI=$REACT_APP_API_EP_URI

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

CMD ["gunicorn", "--config", "gunicorn_config.py", "app:app"]
