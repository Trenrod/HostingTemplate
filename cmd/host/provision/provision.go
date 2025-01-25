package provision

import (
	"fmt"
	"trenrod/HostingTemplate/internal/ansible"
	"trenrod/HostingTemplate/internal/config"

	"github.com/spf13/cobra"
)

var HostProvisionCmd = &cobra.Command{
	Use:   "provision [pathToConfigFile]",
	Short: "Provision host",
	Run: func(cmd *cobra.Command, args []string) {
		pathToConfigFile := args[0]
		fmt.Println("Start provisioning of ", pathToConfigFile)
		configuration := config.LoadConfig(pathToConfigFile)
		// Generate inventory file
		ansible.GenerateAnsibleInventoryFile(configuration)
		// Execture provisioner script
		ansible.SpawnAnsibleProvision(configuration)
	},
}
