import { spawn } from 'node:child_process';
import type { TConfig } from './config';
import { writeFileSync } from 'node:fs';

/**
 * Starts ansible to collect information from the host system
 * 
 * @returns ansible output
 */
export const spawnAnsibleCheck = async function(config: TConfig): Promise<number | null> {
	return await new Promise<number | null>((resolve, reject) => {
		let exitCode: number | null = null;
		let output = "";

		const command = ".venv/bin/ansible-playbook";
		const parameter = ["-i", "inventory.yaml", "check.yaml"]
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
			const logPath = `./logs/${config.dns}-${new Date().toISOString()}.log`;
			writeFileSync(logPath, output);
			console.log(`Logs stored at: ${logPath}`)
			exitCode = code;
			resolve(exitCode);
		});
	});
}