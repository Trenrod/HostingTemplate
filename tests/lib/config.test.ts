import { loadConfig, TConfig } from '../../lib/config';
import fs from 'fs';
import {
	describe, it
} from "@jest/globals";

describe("/lib/config.ts", () => {

	afterEach(() => { jest.restoreAllMocks(); });

	it('loadConfig - FileNotAccessible', async () => {
		jest.spyOn(fs.promises, 'access').mockRejectedValue(new Error('File not accessible'));
		const result = await loadConfig();
		expect(result).toEqual({ error: "FileNotAccessible" });
	});

	it('loadConfig - InvalidContent', async () => {
		jest.spyOn(fs.promises, 'access').mockResolvedValue();

		jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce("xxxxx");
		expect(loadConfig()).resolves.toEqual({ error: "InvalidContent" });

		jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify({ dns: "dnsTest", email1: "emailTest1", sshKeyPath: "pathTest1" }));
		expect(loadConfig()).resolves.toEqual({ error: "InvalidContent" });
	});

	it('loadConfig - Success', async () => {
		const config: TConfig = {
			dns: "dnsTest", email: "emailTest1", sshKeyPath: "pathTest1"
		};
		jest.spyOn(fs.promises, 'access').mockResolvedValue();
		jest.spyOn(fs.promises, 'readFile').mockResolvedValue(JSON.stringify(config));
		expect(loadConfig()).resolves.toEqual({ result: config });
	});

	it('loadConfig - UnknownError', async () => {
		jest.spyOn(fs.promises, 'access').mockResolvedValue();
		jest.spyOn(fs.promises, 'readFile').mockRejectedValue(new Error("Unknown error"));
		expect(loadConfig()).resolves.toEqual({ error: "UnknownError" });
	});
})

