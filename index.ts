import { Command } from 'commander';
import { generateConfig } from './lib/generateConfig';
import { loadConfig } from './lib/config';

const program = new Command();

program
	.name('hosting-template')
	.description('CLI to generate and manage hostings')
	.version('0.0.0');

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
	.command("generate")
	.description("Generates or updates existing configuration.")
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.action((argPathToConfig: string) => {
		console.log(`Configuration file used: ${argPathToConfig}`);
		void generateConfig(argPathToConfig).catch((error: unknown) => { console.error("Unhandeled exception", error); });
	});
// Collect information about endpoints
program
	.command("check")
	.description("Checks endpoints and their configuration")
	.action(() => {
		console.log("Check enpoints - Not implemented");
	});
program
	.command("deploy")
	.description("Deploying")
	.action(() => {
		console.log("Deploying - Not implemented");
	});

program.parse();
