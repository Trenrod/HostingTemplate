package ansible

import (
	"fmt"
	"io"
	"os"
	"os/exec"
	"path"
	"strings"
	"time"
	"trenrod/HostingTemplate/internal/config"
)

// spawnAnsible, spawns ansible and stores std our and std err logs
// Parameters:
// - command: command to execute
// - parameter: list of parameter arguments to add to the command
// - fqdn: the fqdn of the service for naming the logs
func spawAnsible(command string, parameter []string, fqdn string) {

	cwd := "./ansible"
	fmt.Println("Spawn ansible:")
	fmt.Printf("cd %s\n", cwd)
	fmt.Printf("%s %s\n", command, strings.Join(parameter, " "))

	// Create command
	ansibleProcess := exec.Command(command, parameter...)
	ansibleProcess.Dir = cwd

	// Get the current time
	currentTime := time.Now()
	currentTimeString := currentTime.Format("20060102_150405")

	// Create log directory if not exists
	if err := os.MkdirAll("./logs/", 0744); err != nil {
		fmt.Fprintln(os.Stderr, "Could not create log directory", err)
		os.Exit(1)
	}

	// Write stdout to a file
	fileNameStdOut := path.Join("./logs/", fmt.Sprintf("ansible-%s-%s.log", fqdn, currentTimeString))
	fmt.Println("Stdout will be written to file:", fileNameStdOut)
	stdoutFile, err := os.Create(fileNameStdOut)
	if err != nil {
		fmt.Fprintln(os.Stderr, "Failed to create stdout file", err)
		os.Exit(1)
	}
	defer stdoutFile.Close()

	// Write stderr to a file
	fileNameStdErr := path.Join("./logs/", fmt.Sprintf("ansible-%s-%s.log.err", fqdn, currentTimeString))
	fmt.Println("Stderr will be written to file:", fileNameStdErr)

	stderrFile, err := os.Create(fileNameStdErr)
	if err != nil {
		fmt.Fprintln(os.Stderr, "Failed to create stderr file", err)
		os.Exit(1)
	}
	defer stderrFile.Close()

	// Create Multiwriters to write to file and console
	stdoutMulti := io.MultiWriter(os.Stdout, stdoutFile)
	stderrMulti := io.MultiWriter(os.Stderr, stderrFile)

	// Set the ansible command output pipes to the multiwriters
	ansibleProcess.Stdout = stdoutMulti
	ansibleProcess.Stderr = stderrMulti

	// Start command
	if err := ansibleProcess.Start(); err != nil {
		fmt.Fprintln(os.Stderr, "Failed to start process", err)
		os.Exit(1)
	}

	// Wait for the process to finish
	errAnsibleProcess := ansibleProcess.Wait()

	if errAnsibleProcess != nil {
		fmt.Fprintln(os.Stderr, "Process finished with error", errAnsibleProcess)
		os.Exit(1)
	}
}

/**
 * Starts deployment over ansible
 *
 * @returns ansible output
 */
// SpawnAnsibleProvision, spawns a new ansible provisioning process
// Parameters:
// - config: the configuration of this deployment
func SpawnAnsibleProvision(configuration config.Configuration) {
	command := ".venv/bin/ansible-playbook"
	parameter := []string{"-i", "inventory.yaml"}
	// Variables
	parameter = append(parameter,
		"--extra-vars",
		fmt.Sprintf("fqdn=%s", configuration.FQDN),
		"--extra-vars",
		fmt.Sprintf("dockerComposeFilePath=%s", configuration.DockerComposeFilePath),
	)
	parameter = append(parameter, "provision.yaml")

	spawAnsible(command, parameter, configuration.FQDN)
}

// /**
//  * Updates service on a provisioned host
//  *
//  * @returns ansible output
//  */
// export const spawnAnsibleUpdate = async function(config: TConfig): Promise<number | null> {
// 	const command = ".venv/bin/ansible-playbook";
// 	const parameter = ["-i", "inventory.yaml"]
// 	// Variables
// 	parameter.push("--extra-vars");
// 	parameter.push(`fqdn=${config.fqdn}`);
// 	parameter.push("--extra-vars");
// 	parameter.push(`dockerComposeFilePath=${config.dockerComposeFilePath}`);

// 	parameter.push("update.yaml");
// 	return await spawnAnsible(command, parameter, config.fqdn);
// }

// /**
//  * Starts ansible to collect information from the host system
//  *
//  * @returns ansible output
//  */
// export const spawnAnsibleAudit = async function(config: TConfig): Promise<number | null> {
// 	const command = ".venv/bin/ansible-playbook";
// 	const parameter = ["-i", "inventory.yaml"]
// 	// Variables
// 	parameter.push("--extra-vars");
// 	parameter.push(`fqdn=${config.fqdn}`);

// 	parameter.push("audit.yaml");
// 	return await spawnAnsible(command, parameter, config.fqdn);
// }
