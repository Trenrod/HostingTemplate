import { generateAnsibleInventoryFile } from "./ansibleInventory";
import { spawnAnsibleAudit, spawnAnsibleProvision } from "./ansibleManager";
import type { TConfig } from "./config"

export const applyCommandProvision = async function(config: TConfig): Promise<void> {
	// generate inventory.yaml
	const inventoryData = await generateAnsibleInventoryFile(config);
	console.log("Inventory:", inventoryData);

	// Execute ansible script check 
	const ansibleCheckResult = await spawnAnsibleProvision(config);

	const SuccessCheckResult = 0;
	if (ansibleCheckResult !== SuccessCheckResult) {
		console.error('Ansible check failed with');
	} else {
		console.error('Results success');
	}
}

export const applyCommandUpdate = async function(config: TConfig): Promise<void> {
	// generate inventory.yaml
	const inventoryData = await generateAnsibleInventoryFile(config);
	console.log("Inventory:", inventoryData);

	// Execute ansible script check 
	const ansibleCheckResult = await spawnAnsibleAudit(config);

	const SuccessCheckResult = 0;
	if (ansibleCheckResult !== SuccessCheckResult) {
		console.error('Ansible check failed with');
	} else {
		console.error('Results success');
	}
}

export const applyCommandAudit = async function(config: TConfig): Promise<void> {
	// generate inventory.yaml
	const inventoryData = await generateAnsibleInventoryFile(config);
	console.log("Inventory:", inventoryData);

	// Execute ansible script check 
	const ansibleCheckResult = await spawnAnsibleAudit(config);

	const SuccessCheckResult = 0;
	if (ansibleCheckResult !== SuccessCheckResult) {
		console.error('Ansible check failed with');
	} else {
		console.error('Results success');
	}
}