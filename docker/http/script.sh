#!/bin/bash

case ${APP_ENV} in
  "production")
    echo "PRODUCTION"
    pip install --no-cache-dir -r /usr/src/requirements/production.txt;
    ;;
  "testing")
    echo "TESTING"
    pip install --no-cache-dir -r /usr/src/requirements/testing.txt;
    ;;
  "development")
    echo "DEVELOPMENT"
    pip install --no-cache-dir -r /usr/src/requirements/development.txt;
    ;;
  *)
    echo "DEPLOYMENT TYPE ERROR : development | testing | production"
    echo "PRODUCTION MODE BY DEFAULT"
    pip install --no-cache-dir -r /usr/src/requirements/production.txt;
    ;;
esac
