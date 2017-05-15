#!/usr/bin/env bash

ng build --env=prod -base /server_management/ \
    && rm -rf ./docs/ \
    && cp -r ./dist/ ./docs/
#    && git checkout -- docs/CNAME \
