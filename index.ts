import { Command } from 'commander';
import { generateConfig } from './lib/generateConfig';
import { loadConfig } from './lib/config';
import { applyCommandCheck, applyCommandDeploy } from './lib/commands';

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
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.action((argPathToConfig: string) => {
		console.log(`Configuration file used: ${argPathToConfig}`);
		loadConfig(argPathToConfig)
			.then(async (loadConfigResult) => {
				if (loadConfigResult.result == null) {
					return;
				}
				console.log("Configuration:", loadConfigResult.result);
				await applyCommandCheck(loadConfigResult.result)
			})
			.catch((error: unknown) => { console.error("Unhandeled exception", error) });
	});
// Deploys a service
program
	.command("deploy")
	.description("Deploying")
	.argument("<pathToConfig>", "Path to the configuration to use.")
	.option('-u, --update-service-only', "Updates the service only. Skips inital setup.")
	.action((argPathToConfig: string, options: { updateServiceOnly?: true }) => {
		console.log(`Configuration file used: ${argPathToConfig}`, options);
		loadConfig(argPathToConfig)
			.then(async (loadConfigResult) => {
				if (loadConfigResult.result == null) {
					return;
				}
				console.log("Configuration:", loadConfigResult.result);
				await applyCommandDeploy(loadConfigResult.result, options.updateServiceOnly)
			})
			.catch((error: unknown) => { console.error("Unhandeled exception", error) });
	});

program.parse();
