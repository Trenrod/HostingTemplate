import { spawn } from 'node:child_process';
import type { TConfig } from './config';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';


/**
 * Starts ansible to collect information from the host system
 * 
 * @returns ansible output
 */
export const spawnAnsible = async function(command: string, parameter: string[], fqdn: string): Promise<number | null> {
	return await new Promise<number | null>((resolve, reject) => {
		let exitCode: number | null = null;
		let output = "";

		const cwd = "./ansible";
		console.log("Spawn process:");
		console.log(`cd ${cwd}`);
		console.log(`${command} ${parameter.join(" ")}`)

		const ansibleProcess = spawn(command, parameter, {
			cwd
		});
		ansibleProcess.stdout.on('data', (data: Buffer) => {
			output += data.toString("utf8");
			console.log(data.toString("utf8"));
		});

		ansibleProcess.stderr.on('data', (data: Buffer) => {
			output += data.toString("utf8");
			console.error(data.toString("utf8"));
		});

		ansibleProcess.on('close', (code) => {
			// Create log directory if not exists
			if (!existsSync("./logs/")) {
				mkdirSync("./logs/");
			}
			const logPath = `./logs/ansible-${fqdn}-${new Date().toISOString()}.log`;
			writeFileSync(logPath, output);
			console.log(`Logs stored at: ${logPath}`)
			exitCode = code;
			resolve(exitCode);
		});
	});
}

/**
 * Starts deployment over ansible
 * 
 * @returns ansible output
 */
export const spawnAnsibleProvision = async function(config: TConfig): Promise<number | null> {
	const command = ".venv/bin/ansible-playbook";
	const parameter = ["-i", "inventory.yaml"]
	// Variables
	parameter.push("--extra-vars");
	parameter.push(`fqdn=${config.fqdn}`);
	parameter.push("provision.yaml");
	return await spawnAnsible(command, parameter, config.fqdn);
}

/**
 * Updates service on a provisioned host
 * 
 * @returns ansible output
 */
export const spawnAnsibleUpdate = async function(config: TConfig): Promise<number | null> {
	const command = ".venv/bin/ansible-playbook";
	const parameter = ["-i", "inventory.yaml"]
	// Variables
	parameter.push("--extra-vars");
	parameter.push(`fqdn=${config.fqdn}`);

	parameter.push("update.yaml");
	return await spawnAnsible(command, parameter, config.fqdn);
}

/**
 * Starts ansible to collect information from the host system
 * 
 * @returns ansible output
 */
export const spawnAnsibleAudit = async function(config: TConfig): Promise<number | null> {
	const command = ".venv/bin/ansible-playbook";
	const parameter = ["-i", "inventory.yaml"]
	// Variables
	parameter.push("--extra-vars");
	parameter.push(`fqdn=${config.fqdn}`);

	parameter.push("audit.yaml");
	return await spawnAnsible(command, parameter, config.fqdn);
}