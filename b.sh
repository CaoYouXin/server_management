#!/usr/bin/env bash

ng build --env=prod -base /servers/ \
    && rm -rf ./docs/ \
    && cp -r ./dist/ ./docs/
#    && git checkout -- docs/CNAME \
