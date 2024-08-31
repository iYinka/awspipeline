#!/bin/bash
if [ ! -f /home/ec2-user/app/.babelrc ]; then
    cp /path/to/source/.babelrc /home/ec2-user/app/
fi

forever stopall
