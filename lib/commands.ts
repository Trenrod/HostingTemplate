import { generateAnsibleInventoryFile } from "./ansibleInventory";
import { spawnAnsibleCheck, spawnAnsibleDeploy } from "./ansibleManager";
import type { TConfig } from "./config"

export const applyCommandDeploy = async function(config: TConfig, updateServiceOnly?: true): Promise<void> {
	// generate inventory.yaml
	const inventoryData = await generateAnsibleInventoryFile(config);
	console.log("Inventory:", inventoryData);

	// Execute ansible script check 
	const ansibleCheckResult = await spawnAnsibleDeploy(config, updateServiceOnly);

	const SuccessCheckResult = 0;
	if (ansibleCheckResult !== SuccessCheckResult) {
		console.error('Ansible check failed with');
	} else {
		console.error('Results success');
	}
}

export const applyCommandCheck = async function(config: TConfig): Promise<void> {
	// generate inventory.yaml
	const inventoryData = await generateAnsibleInventoryFile(config);
	console.log("Inventory:", inventoryData);

	// Execute ansible script check 
	const ansibleCheckResult = await spawnAnsibleCheck(config);

	const SuccessCheckResult = 0;
	if (ansibleCheckResult !== SuccessCheckResult) {
		console.error('Ansible check failed with');
	} else {
		console.error('Results success');
	}
}