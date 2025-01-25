package host

import (
	"os"
	"trenrod/HostingTemplate/cmd/host/audit"
	"trenrod/HostingTemplate/cmd/host/provision"
	"trenrod/HostingTemplate/cmd/host/update"

	"github.com/spf13/cobra"
)

func init() {
	HostCmd.AddCommand(provision.HostProvisionCmd)
	HostCmd.AddCommand(update.HostUpdateCmd)
	HostCmd.AddCommand(audit.HostAuditCmd)
}

var HostCmd = &cobra.Command{
	Use:   "host",
	Short: "Manage deployment hosts",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
		os.Exit(0)
	},
}
