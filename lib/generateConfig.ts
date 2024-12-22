import { input } from '@inquirer/prompts';
import { loadConfig, saveConfig, type TConfig } from './config';
import toggle from 'inquirer-toggle';

/**
 * Load config and checks if to progress
 */
const loadAndValidateConfig = async function(pathToConfig: string): Promise<undefined | TConfig> {
	const config = await loadConfig(pathToConfig);
	if (config.error === "InvalidContent") {
		const proceed = await toggle({
			message: 'Your current configuration is invalid. Create a new one?',
		});
		if (!proceed) {
			console.log("Replaceing invalid config aborted");
			process.exit();
		}
	} else if (config.error === "UnknownError") {
		console.log("Current config file cannot it opened. Make sure you have access right.");
		process.exit();
	}
	return config.result;
}

/**
 * Wizard to ask or update configuration
 */
export const generateConfig = async function(pathToConfig: string): Promise<void> {
	const config = await loadAndValidateConfig(pathToConfig);

	const fqdn = await input({ message: 'FQDN of the service. To create certificates for.', default: config?.fqdn });
	const email = await input({ message: 'Your email for Let`s encrypt.', default: config?.email });
	const sshKeyPath = await input({ message: 'Path to the ssh key to connect to your host.', default: config?.sshKeyPath });

	const newConfig: TConfig = { fqdn, email, sshKeyPath };

	await saveConfig(pathToConfig, newConfig);
	console.log(`New config stored to: ${pathToConfig}`);
};

