package ansible

import (
	"fmt"
	"os"
	"path"
	"trenrod/HostingTemplate/internal/config"
	"trenrod/HostingTemplate/internal/settings"

	"github.com/goccy/go-yaml"
)

type AnsibleInventoryUngroupedHostsMain struct {
	AnsibleHost              string `json:"ansible_host" yaml:"ansible_host"`
	AnsibleSSHPrivateKeyFile string `json:"ansible_ssh_private_key_file" yaml:"ansible_ssh_private_key_file"`
}

type AnsibleInventoryUngroupedHosts struct {
	Main AnsibleInventoryUngroupedHostsMain `json:"main" yaml:"main"`
}

type AnsibleInventoryUngrouped struct {
	Hosts AnsibleInventoryUngroupedHosts `json:"hosts" yaml:"hosts"`
}

type AnsibleInventory struct {
	Ungrouped AnsibleInventoryUngrouped `json:"ungrouped" yaml:"ungrouped"`
}

func NewAnsibleInventory(config config.Configuration) AnsibleInventory {
	return AnsibleInventory{
		Ungrouped: AnsibleInventoryUngrouped{
			Hosts: AnsibleInventoryUngroupedHosts{
				Main: AnsibleInventoryUngroupedHostsMain{
					AnsibleHost:              config.FQDN,
					AnsibleSSHPrivateKeyFile: config.SShKeyPath,
				},
			},
		},
	}
}

// GenerateAnsibleInventoryFile, creates a new inventory filew ith the given information
// from the config
// Parameters:
// - config: configuration of the host
func GenerateAnsibleInventoryFile(config config.Configuration) {
	inventory := NewAnsibleInventory(config)

	yamlData, err := yaml.Marshal(&inventory)
	if err != nil {
		fmt.Fprintln(os.Stderr, "Failed to create yaml", err)
		os.Exit(1)
	}

	inventoryPath := path.Join(settings.GlobalSettings.AnsiblePath, "inventory.yaml")
	if err := os.WriteFile(inventoryPath, yamlData, 0744); err != nil {
		fmt.Fprintln(os.Stderr, "Failed to save inventory.yaml", err)
		os.Exit(1)
	}
}
