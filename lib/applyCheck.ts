import { generateAnsibleInventoryFile } from "./ansibleInventory";
import { spawnAnsibleCheck } from "./ansibleManager";
import { loadConfig } from "./config"

export const applyCheck = async function(pathToConfig: string): Promise<void> {
	const loadConfigResult = await loadConfig(pathToConfig);
	if (loadConfigResult.result == null) {
		return;
	}
	console.log("Configuration:", loadConfigResult.result);

	// generate inventory.yaml
	const inventoryData = await generateAnsibleInventoryFile(loadConfigResult.result);
	console.log("Inventory:", inventoryData);

	// Execute ansible script check 
	const ansibleCheckResult = await spawnAnsibleCheck(loadConfigResult.result);

	const SuccessCheckResult = 0;
	if (ansibleCheckResult !== SuccessCheckResult) {
		console.error('Ansible check failed with');
	} else {
		console.error('Results success');
	}
}