# [Work in progress]

This project is in alpha state.
- [Tasks to milestone 1.0.0](https://github.com/Trenrod/HostingTemplate/milestone/1)
- [Roadmap](docs/Roadmap.md)

# Hosting template

[![License: MIT](https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd9eb5aaca434fac4f1c34_License-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/github/Trenrod/HostingTemplate/graph/badge.svg?token=RPN5KMKI2V)](https://codecov.io/github/Trenrod/HostingTemplate)

Simple, transparent and reliable service deployments.

## Usage

### Step: 1 Generate step by step config file
```sh
npx tsx index.ts config init ./config_hello_world.json
```

### Step: 2 Provision host
```sh
npx tsx index.ts provision ./config_hello_world.json
```

### Step: 3 Update new version
```shell
npx tsx index.ts update ./configs/anonvoting.trenrod.net
```

### (Optional) Show config
```shell
npx tsx index.ts config show ./config_hello_world.json
```

### (Optional) Update config (same as create new one)
```shell
npx tsx index.ts config init ./config_hello_world.json
```

### (Optional) Execute audits
```shell
npx tsx index.ts audit ./config_hello_world.json
```


## Main features

Security
- [x] Apply [DevSec Security OS Hardening](https://github.com/dev-sec/ansible-collection-hardening)
- [x] [Automate security updates using unattended-upgrades](https://galaxy.ansible.com/ui/repo/published/hifis/toolkit/content/role/unattended_upgrades/)
- [x] Applies audits for each iniital setup
	- [x] [Lynis audit](https://cisofy.com/lynis/#introduction) (Score: 77/100) on Debian 12
	- [x] [Docker bench security](https://github.com/docker/docker-bench-security) (Score: 29/100) on Debian 12
- [x] Install/Configure [Linux auditd framework](https://linux.die.net/man/8/auditd)
- [x] Applies patches according to Audit results `./ansible/tasks/security/*.yaml`

Application
- [ ] Deploys custom compose or compose templates
- [ ] Preconfigures Envoy
- [ ] Creates and renews certificiates with [acme.sh](https://github.com/acmesh-official/acme.sh)

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
