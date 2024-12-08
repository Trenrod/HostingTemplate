import Ajv, { JTDDataType } from "ajv/dist/jtd"
import { access, readFile } from "fs/promises"
const ajv = new Ajv()

const schema = {
	properties: {
		dns: {
			type: "string",
			// format: "hostname"
		},
		sshKeyPath: {
			type: "string",
			// format: "uri"
		},
		email: {
			type: "string",
			// format: "email"
		}
	},
	additionalProperties: false
} as const;

export type TConfig = JTDDataType<typeof schema>;

// type inference is not supported for JTDDataType yet
export const validateTConfig = ajv.compile<TConfig>(schema);

// serialize will only accept data compatible with MyData
const serializeTConfig = ajv.compileSerializer(schema);

// parse will return MyData or undefined
const parseTConfig = ajv.compileParser<TConfig>(schema);


// Loads existing config
export const loadConfig = async function(): Promise<{ error?: "FileNotAccessible" | "InvalidContent" | "UnknownError", result?: TConfig }> {
	const configFilePath = "./htconfig.json";
	try {
		try {
			await access(configFilePath);
		} catch (error) {
			return { error: "FileNotAccessible" };
		}

		const fileContent = await readFile("./", {
			encoding: "utf8"
		});

		const config = parseTConfig(fileContent);
		if (config === undefined) {
			console.error(`${parseTConfig.message} at ${parseTConfig.position}`) // error message from the last parse call
			return { error: "InvalidContent" };
		}
		return { result: config };
	} catch (error) {
		console.error("Failed to load config", error);
		return { error: "UnknownError" };
	}
}

