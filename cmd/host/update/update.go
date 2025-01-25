package update

import (
	"fmt"
	"trenrod/HostingTemplate/internal/ansible"
	"trenrod/HostingTemplate/internal/config"

	"github.com/spf13/cobra"
)

var HostUpdateCmd = &cobra.Command{
	Use:   "update [pathToConfigFile]",
	Short: "Updates host and its services",
	Run: func(cmd *cobra.Command, args []string) {
		pathToConfigFile := args[0]
		fmt.Println("Start update of ", pathToConfigFile)
		configuration := config.LoadConfig(pathToConfigFile)
		// Generate inventory file
		ansible.GenerateAnsibleInventoryFile(configuration)
		// Execture update script
		ansible.SpawnAnsibleUpdate(configuration)
	},
}
