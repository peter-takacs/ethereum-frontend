# Ethereum certificates

This repository contains a project aimed at storing OpenBadges assertions on the Ethereum blockchain.

# Development

If not running in a windows environment, replace `script.ps1` with `script.sh`
To set up a local development environment, install and run [Ganache](https://truffleframework.com/ganache). 
Once running, from the root of the project:
1. `npm install`
1. `npm install -g npx`
1. `.\scripts\deploy.ps1`

This will deploy the smart contracts to the local ethereum network being run by Ganache.

To build and serve the frontend, run

`.\scripts\serve.ps1`

To run tests, run

`.\scripts\test.ps1`



2018, Peter Takacs