import { Command } from 'commander';
import { generateConfig } from './lib/generateConfig';
import { loadConfig } from './lib/config';
import { applyCommandAudit, applyCommandProvision, applyCommandUpdate } from './lib/commands';

const program = new Command();

program
	.name('hosting-template')
	.description('CLI to generate and manage hostings')
	.version('0.0.0-alpha');

const commandConfig = program
	.command('config')
	.description('Manage deployment configuration');
// Shows current config
commandConfig
	.command("show")
	.description("Shows current config.")
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.action(async (argPathToConfig: string) => {
		const config = await loadConfig(argPathToConfig);
		if (config.error === 'FileNotAccessible') {
			console.error("Could not access config file");
		} else if (config.error === 'InvalidContent') {
			console.error("Config file is invalid");
		} else if (config.error === 'UnknownError') {
			console.error("Unknown error loading config file");
		} else {
			console.log("Configuration:");
			const tabSize = 4;
			console.log(JSON.stringify(config.result, null, tabSize));
		}
	});

// Generates or updates existing config
commandConfig
	.command("init")
	.description("Generates or updates existing configuration.")
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.action((argPathToConfig: string) => {
		console.log(`Configuration file used: ${argPathToConfig}`);
		void generateConfig(argPathToConfig).catch((error: unknown) => { console.error("Unhandeled exception", error); });
	});

// Deploys a service
program
	.command("provision")
	.description("Provision host")
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.action((argPathToConfig: string) => {
		console.log(`Configuration file used: ${argPathToConfig}`);
		loadConfig(argPathToConfig)
			.then(async (loadConfigResult) => {
				if (loadConfigResult.result == null) {
					return;
				}
				console.log("Configuration:", loadConfigResult.result);
				await applyCommandProvision(loadConfigResult.result);
			})
			.catch((error: unknown) => { console.error("Unhandeled exception", error) });
	});

// Update a service only
program
	.command("update")
	.description("Update provisioned services")
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.action((argPathToConfig: string) => {
		console.log(`Configuration file used: ${argPathToConfig}`);
		loadConfig(argPathToConfig)
			.then(async (loadConfigResult) => {
				if (loadConfigResult.result == null) {
					return;
				}
				console.log("Configuration:", loadConfigResult.result);
				await applyCommandUpdate(loadConfigResult.result);
			})
			.catch((error: unknown) => { console.error("Unhandeled exception", error) });
	});

// Collect information about endpoints
program
	.command("audit")
	.description("Checks endpoints and their configuration")
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.action((argPathToConfig: string) => {
		console.log(`Configuration file used: ${argPathToConfig}`);
		loadConfig(argPathToConfig)
			.then(async (loadConfigResult) => {
				if (loadConfigResult.result == null) {
					return;
				}
				console.log("Configuration:", loadConfigResult.result);
				await applyCommandAudit(loadConfigResult.result)
			})
			.catch((error: unknown) => { console.error("Unhandeled exception", error) });
	});

program.parse();
