# [Work in progress]

This project is in alpha state.
- [Tasks to milestone 1.0.0](https://github.com/Trenrod/HostingTemplate/milestone/1)

# Hosting template

[![License: MIT](https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd9eb5aaca434fac4f1c34_License-MIT-blue.svg)](/LICENSE)
[![codecov](https://codecov.io/github/Trenrod/HostingTemplate/graph/badge.svg?token=RPN5KMKI2V)](https://codecov.io/github/Trenrod/HostingTemplate)

Simple, transparent and reliable service deployments for Debian 12/Bookworm servers.

## Usage

### Step: 1 Generate step by step config file
```sh
go run main.go config generate ./config_hello_world.json
```

### Step: 2 Provision host
```sh
go run main.go host provision ./config_hello_world.json
```

### Step: 3 Update new version
```shell
go run main.go host update ./config_hello_world.json
```

### (Optional) Show config
```shell
go run main.go config show ./config_hello_world.json
```

### (Optional) Update config (same as create new one)
```shell
go run main.go config generate ./config_hello_world.json
```

### (Optional) Execute audits
```shell
go run main.go host audit ./config_hello_world.json
```

## Main features

Security
- [x] Apply [DevSec Security OS Hardening](https://github.com/dev-sec/ansible-collection-hardening)
- [x] [Automate security updates using unattended-upgrades](https://galaxy.ansible.com/ui/repo/published/hifis/toolkit/content/role/unattended_upgrades/)
- [ ] Increase audits score
	- [ ] Increase [Lynis audit](https://cisofy.com/lynis/#introduction) score. Currently 77/100 on Debian 12
	- [ ] Increase [Docker bench security](https://github.com/docker/docker-bench-security) score. Currently 29/100 on Debian 12
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
- Go environment
- Ansible environment

## [Develop](docs/Develop.md)

## [Roadmap](docs/Roadmap.md)

## Tech stack

- Ansible
- Let`s Encrypt (Acme.sh -> TODO go https://github.com/go-acme/lego)
- Envoy
- Go

## System diagram

![alt text](<docs/Hosting template systemdiagram.png>)

## Provisioning flow

TODO

Switch to `GO`
- CLI Framework: https://github.com/spf13/cobra
- JSON validator: https://github.com/go-playground/validator/blob/master/_examples/simple/main.go
- Certificates: https://github.com/go-acme/lego
