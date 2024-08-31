#!/bin/bash
# Check if .babelrc file already exists and copy only if it doesn't
if [ ! -f /home/ubuntu/app/.babelrc ]; then
    cp ~/app/.babelrc /home/ubuntu/app/
fi

forever stopall
