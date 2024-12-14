# Hosting template

[![License: MIT](https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd9eb5aaca434fac4f1c34_License-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/github/Trenrod/HostingTemplate/graph/badge.svg?token=RPN5KMKI2V)](https://codecov.io/github/Trenrod/HostingTemplate)

Simple, transparent and reliable service deployments.

## [Develop](docs/Develop.md)

## [Roadmap](docs/Roadmap.md)

## Usage

### Genreate config
Create a new config and store it in ./config_hello_world.json
```shell
npx tsx index.ts -- config generate ./config_hello_world.json
```

### Check endpoint
Creates and executes ansible script to check the current state of the endpoint

```shell
npx tsx index.ts -- check ./config_hello_world.json
```

## Requirements

- SSH access
- DNS A record
- Python
- NodeJS

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
