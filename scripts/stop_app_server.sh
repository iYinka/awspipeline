#!/bin/bash
# Check if .babelrc file already exists and copy only if it doesn't
if [ ! -f /home/root/app/.babelrc ]; then
    cp ~/app/.babelrc /home/root/app/
fi

forever stopall
