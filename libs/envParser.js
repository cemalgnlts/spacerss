import { readFileSync } from "fs";

const extEnv = readFileSync(".env", "UTF-8")
	.trim()
	.split("\n")
	.forEach(line => {
		const [ key, value ] = line.split("=");
		process.env[key] = value;
	});
