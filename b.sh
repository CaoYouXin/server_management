#!/usr/bin/env bash

ng build --env=prod -base /server/ \
    && rm -rf ./docs/ \
    && cp -r ./dist/ ./docs/
#    && git checkout -- docs/CNAME \
