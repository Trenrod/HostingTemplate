# [Work in progress]

This project is in alpha state.
- [Tasks to milestone 1.0.0](https://github.com/Trenrod/HostingTemplate/milestone/1)
- [Roadmap](docs/Roadmap.md)

# Hosting template

[![License: MIT](https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd9eb5aaca434fac4f1c34_License-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/github/Trenrod/HostingTemplate/graph/badge.svg?token=RPN5KMKI2V)](https://codecov.io/github/Trenrod/HostingTemplate)

Simple, transparent and reliable service deployments.

## Requirements

### Docker images
- All docker images must have an user called `unprivileged`

### Hosting platform
- SSH access to host system over private key
- Debian based host system

### DNS
- DNS A record

### Deployment server
- NodeJS environment
- Ansible environment

## [Develop](docs/Develop.md)

## [Roadmap](docs/Roadmap.md)

## Usage

### Generate config
Create a new config and store it in ./config_hello_world.json
```shell
npx tsx index.ts config generate ./config_hello_world.json
```

### Check endpoint
Creates and executes ansible script to check the current state of the endpoint

```shell
npx tsx index.ts check ./config_hello_world.json
```

### Deploy
Deploys initally all dependencies
```shell
npx tsx index.ts deploy ./config_hello_world.json
```

Deploys only new service image
```shell
npx tsx index.ts deploy --update-service-only ./configs/anonvoting.trenrod.net
# alternative
# npx tsx index.ts deploy -u ./config_hello_world.json
```

## Tech stack

- Ansible
- Let`s Encrypt
- Envoy
- Acme.sh
- NodeJS Typescript

## System diagram

![alt text](<docs/Hosting template systemdiagram.png>)

## Provisioning flow

TODO
