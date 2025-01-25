package generate

import (
	"trenrod/HostingTemplate/internal/config"

	"github.com/spf13/cobra"
)

var ConfigGenerateCmd = &cobra.Command{
	Use:     "generate [pathToConfigFile]",
	Short:   "Generates or updates existing configuration.",
	Example: "config generate config/test.yaml",
	Run: func(cmd *cobra.Command, args []string) {
		configPath := args[0]
		configuration := config.GenerateConfig(nil)
		config.SaveConfig(configPath, configuration)
	},
	Args: cobra.ExactArgs(1),
}
