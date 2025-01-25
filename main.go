package main

import (
	"trenrod/HostingTemplate/cmd"
	"trenrod/HostingTemplate/internal/settings"
)

func main() {
	settings.GlobalSettings = settings.Settings{
		AnsiblePath: "./ansible",
	}

	cmd.Execute()
}
