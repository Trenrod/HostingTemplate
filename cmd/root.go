package cmd

import (
	"fmt"
	"os"
	"trenrod/HostingTemplate/cmd/config"
	"trenrod/HostingTemplate/cmd/host"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(config.ConfigCmd)
	rootCmd.AddCommand(host.HostCmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

var rootCmd = &cobra.Command{
	Use:     "hosting-template",
	Short:   "CLI to generate and manage hostings",
	Version: "0.0.0-alpha",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Help()
		os.Exit(0)
	},
}
