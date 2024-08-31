#!/bin/bash
sudo apt-get update -y

# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation of Node.js and npm
node -v
npm -v

# Install 'forever' globally
sudo npm install -g forever