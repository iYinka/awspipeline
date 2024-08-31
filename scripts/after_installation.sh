#!/bin/bash
if [ ! -f /home/ec2-user/app/.babelrc ]; then
    cp /app/.babelrc /home/ec2-user/app/
fi

cd /home/ec2-user/app
sudo npm i