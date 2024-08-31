#!/bin/bash
# Check if .babelrc file already exists and copy only if it doesn't
if [ ! -f /home/ec2-user/app/.babelrc ]; then
    cp ~/app/.babelrc /home/ec2-user/app/
fi

forever stopall
