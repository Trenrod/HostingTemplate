package show

import (
	"encoding/json"
	"fmt"
	"trenrod/HostingTemplate/internal/config"

	"github.com/spf13/cobra"
)

var ConfigShowCmd = &cobra.Command{
	Use:     "show [pathToConfigFile]",
	Short:   "Shows the config of the given config file.",
	Example: "config show config/test.yaml",
	Run: func(cmd *cobra.Command, args []string) {
		configPath := args[0]
		configuration := config.LoadConfig(configPath)
		jsonData, err := json.MarshalIndent(configuration, "", "  ")
		if err != nil {
			fmt.Println("Error marshaling to JSON:", err)
			return
		}
		fmt.Println(string(jsonData))
	},
	Args: cobra.ExactArgs(1),
}
