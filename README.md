# Hosting template

Simple, transparent and reliable service deployments.

## Feature roadmap

To Version 1.0.0: https://github.com/Trenrod/HostingTemplate/milestone/1

### Version 1.0.0
- [ ] Customized configuration generated over a cli
- [ ] Deployment observer
- [ ] Automatic certificates and renewal

### Version X.0
- [ ] Multiple servers support
- [ ] Different roles per server support
- [ ] Configurable support for:
	- [ ] Prometheus (metrics)
	- [ ] Loki (logs)
- [ ] TBD Cloud VM provisioning
- [ ] TBD Loadbalancing
- [ ] TBD Zero downtime deployment

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
