package ansible

import "trenrod/HostingTemplate/internal/config"

// ApplyCommandProvision, exectures command to fully provision a vm with the given configuration
// Parameter:
// - configuration: Information about the vm to provision
func ApplyCommandProvision(configuration config.Configuration) {
	// Generate inventory file
	GenerateAnsibleInventoryFile(configuration)

	SpawnAnsibleProvision(configuration)
}

// export const applyCommandUpdate = async function(config: TConfig): Promise<void> {
// 	// generate inventory.yaml
// 	const inventoryData = await generateAnsibleInventoryFile(config);
// 	console.log("Inventory:", inventoryData);

// 	// Execute ansible script check
// 	const ansibleCheckResult = await spawnAnsibleUpdate(config);

// 	const SuccessCheckResult = 0;
// 	if (ansibleCheckResult !== SuccessCheckResult) {
// 		console.error('Ansible check failed with');
// 	} else {
// 		console.error('Results success');
// 	}
// }

// export const applyCommandAudit = async function(config: TConfig): Promise<void> {
// 	// generate inventory.yaml
// 	const inventoryData = await generateAnsibleInventoryFile(config);
// 	console.log("Inventory:", inventoryData);

// 	// Execute ansible script check
// 	const ansibleCheckResult = await spawnAnsibleAudit(config);

// 	const SuccessCheckResult = 0;
// 	if (ansibleCheckResult !== SuccessCheckResult) {
// 		console.error('Ansible check failed with');
// 	} else {
// 		console.error('Results success');
// 	}
// }
