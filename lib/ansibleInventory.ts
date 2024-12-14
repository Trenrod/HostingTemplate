import { stringify } from 'yaml';
import type { TConfig } from './config';
import { writeFile } from 'fs/promises';
import { settings } from './settings';
import { join } from "path";

interface IAnsibleInventory {
	ungrouped: {
		hosts: {
			main: {
				ansible_host: string;
				ansible_ssh_private_key_file: string;
			}
		}
	}
}

/**
 * Generates Inventory file for the given configuration
 */
export const generateAnsibleInventoryFile = async function(config: TConfig): Promise<string> {
	const ansibleInventory: IAnsibleInventory = {
		ungrouped: {
			hosts: {
				main: {
					ansible_host: config.dns,
					ansible_ssh_private_key_file: config.sshKeyPath
				}
			}
		}
	}
	await writeFile(join(settings.ansiblePath, "inventory.yaml"), stringify(ansibleInventory));
	return stringify(ansibleInventory);
}