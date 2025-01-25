package audit

import (
	"fmt"

	"github.com/spf13/cobra"
)

var HostAuditCmd = &cobra.Command{
	Use:   "audit [pathToConfigFile]",
	Short: "Checks endpoints and their configuration",
	Run: func(cmd *cobra.Command, args []string) {
		pathToConfigFile := args[0]
		fmt.Println("TODO host audit ", pathToConfigFile)
		// 	console.log(`Configuration file used: ${argPathToConfig}`);
		// 	loadConfig(argPathToConfig)
		// 		.then(async (loadConfigResult) => {
		// 			if (loadConfigResult.result == null) {
		// 				return;
		// 			}
		// 			console.log("Configuration:", loadConfigResult.result);
		// 			await applyCommandAudit(loadConfigResult.result)
		// 		})
		// 		.catch((error: unknown) => { console.error("Unhandeled exception", error) });
	},
}
