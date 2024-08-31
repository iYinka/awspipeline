#!/bin/bash
if [ ! -f /home/ec2-user/app/.babelrc ]; then
    cp ~/.babelrc /home/ec2-user/app/
fi

cd /home/ec2-user/app
sudo npm i