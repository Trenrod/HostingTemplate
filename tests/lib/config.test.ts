import { loadConfig, saveConfig, type TConfig } from '../../lib/config';
import fs from 'fs';
import {
	describe, it
} from "@jest/globals";

describe("/lib/config.ts", () => {

	afterEach(() => { jest.restoreAllMocks(); });

	it('loadConfig - FileNotAccessible', async () => {
		jest.spyOn(fs.promises, 'access').mockRejectedValue(new Error('File not accessible'));
		const result = await loadConfig("./test.json");
		expect(result).toEqual({ error: "FileNotAccessible" });
	});

	it('loadConfig - InvalidContent', async () => {
		jest.spyOn(fs.promises, 'access').mockResolvedValue();

		jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce("xxxxx");
		await expect(loadConfig("./test.json")).resolves.toEqual({ error: "InvalidContent" });

		jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify({ dns: "dnsTest", email1: "emailTest1", sshKeyPath: "pathTest1" }));
		await expect(loadConfig("./test.json")).resolves.toEqual({ error: "InvalidContent" });
	});

	it('loadConfig - Success', async () => {
		const config: TConfig = {
			dns: "dnsTest", email: "emailTest1", sshKeyPath: "pathTest1"
		};
		jest.spyOn(fs.promises, 'access').mockResolvedValue();
		jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify(config));
		await expect(loadConfig("./test.json")).resolves.toEqual({ result: config });
	});

	it('loadConfig - UnknownError', async () => {
		jest.spyOn(fs.promises, 'access').mockResolvedValue();
		jest.spyOn(fs.promises, 'readFile').mockRejectedValue(new Error("Unknown error"));
		await expect(loadConfig("./test.json")).resolves.toEqual({ error: "UnknownError" });
	});

	it('saveConfig - Success', async () => {
		const config: TConfig = {
			dns: "dnsTest", email: "emailTest1", sshKeyPath: "pathTest1"
		};
		jest.spyOn(fs.promises, 'writeFile').mockResolvedValue();
		await expect(saveConfig("./test.json", config)).resolves.toEqual({ result: true });
	});

	it('saveConfig - UnknownError', async () => {
		const config: TConfig = {
			dns: "dnsTest", email: "emailTest1", sshKeyPath: "pathTest1"
		};
		jest.spyOn(fs.promises, 'writeFile').mockRejectedValue(new Error("Unknown error"));
		await expect(saveConfig("./test.json", config)).resolves.toEqual({ error: "UnknownError" });
	});
})

