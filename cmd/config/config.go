package config

import (
	"os"
	"trenrod/HostingTemplate/cmd/config/generate"
	"trenrod/HostingTemplate/cmd/config/show"

	"github.com/spf13/cobra"
)

func init() {
	ConfigCmd.AddCommand(show.ConfigShowCmd)
	ConfigCmd.AddCommand(generate.ConfigGenerateCmd)
}

var ConfigCmd = &cobra.Command{
	Use:   "config",
	Short: "Manage deployment configuration",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
		os.Exit(0)
	},
}
