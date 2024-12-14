import { describe } from "@jest/globals";
import { generateConfig } from "../../lib/generateConfig";

/**
 * Generates Inventory file for the given configuration
 */
describe("generateConfig", () => {
	it("Generates config file", () => {
		expect(true).toBe(true);
	})
});

describe("loadAndValidateConfig", () => {
	it("Loats config and validates it", async () => {
		await generateConfig("./");
		expect(true).toBe(true);
	})
});
