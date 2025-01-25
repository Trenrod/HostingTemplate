package update

import (
	"fmt"

	"github.com/spf13/cobra"
)

var HostUpdateCmd = &cobra.Command{
	Use:   "update [pathToConfigFile]",
	Short: "Updates host and its services",
	Run: func(cmd *cobra.Command, args []string) {
		pathToConfigFile := args[0]
		fmt.Println("TODO host update ", pathToConfigFile)
		// .then(async (loadConfigResult) => {
		// 	if (loadConfigResult.result == null) {
		// 		return;
		// 	}
		// 	console.log("Configuration:", loadConfigResult.result);
		// 	await applyCommandProvision(loadConfigResult.result);
		// })
		// .catch((error: unknown) => { console.error("Unhandeled exception", error) });
	},
}
