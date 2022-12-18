#!/bin/bash
flask db upgrade
#pg_restore  -U postgres --data-only -d myBdd -t myTable fichier.sql 