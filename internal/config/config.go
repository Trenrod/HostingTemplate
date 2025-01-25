package config

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Configuration struct {
	FQDN                  string `json:"fqdn"`
	SShKeyPath            string `json:"sshKeyPath"`
	EMail                 string `json:"email"`
	DockerComposeFilePath string `json:"dockerComposeFilePath"`
}

// LoadConfig loads the config from the given config file
// Parameters:
// - pathToConfig: Path to the configuration to load
// Returns:
// - the parsed configuration
func LoadConfig(pathToConfig string) Configuration {
	file, err := os.Open(pathToConfig)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	conf := Configuration{}
	if err = decoder.Decode(&conf); err != nil {
		panic(err)
	}

	return conf
}

// SavesCofing, saves the config to the given config file
// Parameters:
// - pathToConfig: Path to the configuration to load
// - config: Configuration so save
func SaveConfig(pathToConfig string, config Configuration) {
	jsonData, err := json.Marshal(config)
	if err != nil {
		fmt.Fprintln(os.Stderr, "Failed to parse config", err)
		os.Exit(1)
	}

	// Check if the file exists
	_, err = os.Stat(pathToConfig)
	if os.IsNotExist(err) {
		// Make sure directory exists
		dir := filepath.Dir(pathToConfig)
		if err := os.MkdirAll(dir, 0755); err != nil {
			fmt.Fprintln(os.Stderr, "Failed to create directory", err)
			os.Exit(1)
		}

		// If the file does not exist, create it
		file, err := os.Create(pathToConfig)
		if err != nil {
			fmt.Fprintln(os.Stderr, "Failed to create config file", err)
			os.Exit(1)
		}
		file.Close()
	}

	if err := os.WriteFile(pathToConfig, jsonData, 0644); err != nil {
		panic(err)
	}
}

// GenerateConfig generates or updates a config according to the given prompt inputs
// Parameters:
// - config: Optional existing config to update
// Returns:
// new or updated config
func GenerateConfig(config *Configuration) Configuration {

	var fqdn string
	var email string
	var sshKeyPath string
	var dockerComposeFilePath string

	if config == nil {
		fqdn = Input("FQDN of the service. To create certificates for.", "")
		email = Input("Your email for Let`s encrypt.", "")
		sshKeyPath = Input("Path to the ssh key to connect to your host.", "")
		dockerComposeFilePath = Input("Path to the docker compose file.", "")
	} else {
		fqdn = Input("FQDN of the service. To create certificates for.", config.FQDN)
		email = Input("Your email for Let`s encrypt.", config.EMail)
		sshKeyPath = Input("Path to the ssh key to connect to your host.", config.SShKeyPath)
		dockerComposeFilePath = Input("Path to the docker compose file.", config.DockerComposeFilePath)
	}

	return Configuration{
		FQDN:                  fqdn,
		EMail:                 email,
		SShKeyPath:            sshKeyPath,
		DockerComposeFilePath: dockerComposeFilePath,
	}
}

// Input, create a prompt with the given text and returns the user input or the fallback string if the user
// input was empty
// Parameters:
// - text: text to promopt
// - fallback: fallback string to use if user input was empty
// Returns:
// Userinput or fallback
func Input(text string, fallback string) string {
	scanner := bufio.NewScanner(os.Stdin)

	fmt.Println(text)

	var value string
	if fallback != "" {
		value = fallback
	}

	if scanner.Scan() {
		value = scanner.Text()
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	return value
}
