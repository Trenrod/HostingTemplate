package ansible

import (
	"os"
	"path"
	"testing"
	"trenrod/HostingTemplate/internal/config"
	"trenrod/HostingTemplate/internal/settings"

	"github.com/goccy/go-yaml"
)

func TestGenerateAnsibleInventoryFile(t *testing.T) {
	testConfig := config.Configuration{
		FQDN:                  "FQDN_test",
		SShKeyPath:            "SShKeyPath_test",
		EMail:                 "EMail_test",
		DockerComposeFilePath: "DockerComposeFilePath_test",
	}
	inventoryPath := path.Join(settings.GlobalSettings.AnsiblePath, "inventory.yaml")

	// Make sure there is no inventory
	if _, err := os.Stat(inventoryPath); err == nil {
		os.Remove(inventoryPath)
	}

	// Create inventory
	GenerateAnsibleInventoryFile(testConfig)

	// Check inventory
	invFileData, err := os.ReadFile(inventoryPath)
	if err != nil {
		t.Error("Inventory file not exists", err)
	}

	var ansibleInventory AnsibleInventory
	if err := yaml.Unmarshal(invFileData, &ansibleInventory); err != nil {
		t.Error("Inventory file not exists", err)
	}

	if ansibleInventory.Ungrouped.Hosts.Main.AnsibleHost != testConfig.FQDN {
		t.Errorf("Inventory AnsibleHost expect '%s' but '%s'", testConfig.FQDN, ansibleInventory.Ungrouped.Hosts.Main.AnsibleHost)
	}
	if ansibleInventory.Ungrouped.Hosts.Main.AnsibleSSHPrivateKeyFile != testConfig.SShKeyPath {
		t.Errorf("Inventory AnsibleSSHPrivateKeyFile expect '%s' but '%s'", testConfig.FQDN, ansibleInventory.Ungrouped.Hosts.Main.AnsibleSSHPrivateKeyFile)
	}

	// Make sure there is no inventory
	if _, err := os.Stat(inventoryPath); err == nil {
		os.Remove(inventoryPath)
	}
}
