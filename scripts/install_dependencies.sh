#!/bin/bash
sudo yum update -y

# Install Node.js using NodeSource repository.............
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation of Node.js and npm
node -v
npm -v

# Install 'forever' globally
sudo npm install -g forever
