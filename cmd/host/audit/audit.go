package audit

import (
	"fmt"
	"trenrod/HostingTemplate/internal/ansible"
	"trenrod/HostingTemplate/internal/config"

	"github.com/spf13/cobra"
)

var HostAuditCmd = &cobra.Command{
	Use:   "audit [pathToConfigFile]",
	Short: "Applies audit scripts on endpoints",
	Run: func(cmd *cobra.Command, args []string) {
		pathToConfigFile := args[0]
		fmt.Println("Start audit of ", pathToConfigFile)
		configuration := config.LoadConfig(pathToConfigFile)
		// Generate inventory file
		ansible.GenerateAnsibleInventoryFile(configuration)
		// Execture audit script
		ansible.SpawnAnsibleAudit(configuration)
	},
}
