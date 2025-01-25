package config

import (
	"testing"
	"trenrod/HostingTemplate/internal/test"
)

func TestSaveConfig(t *testing.T) {
	var pathToConfigFile = "./configs/test.json"
	var config = Configuration{
		FQDN:                  "fqdn_Test",
		SShKeyPath:            "sshKeyPath_Test",
		EMail:                 "email_test",
		DockerComposeFilePath: "dockerComposeFilePath_test",
	}
	SaveConfig(pathToConfigFile, config)
}

func TestGenerateConfig(t *testing.T) {

	testFQDN := "test.trenrod.net"

	sie := test.NewStdinMock()
	defer sie.Reset()
	sie.SetInput(testFQDN)
	if value := Input("My text", ""); value != testFQDN {
		t.Errorf("Failed %s is not %s but %s", "config.FQDN", testFQDN, value)
	}

	sie2 := test.NewStdinMock()
	defer sie2.Reset()
	sie2.SetInput("")
	if value := Input("My text", testFQDN); value != testFQDN {
		t.Errorf("Failed %s is not %s but %s", "config.FQDN", testFQDN, value)
	}
}
