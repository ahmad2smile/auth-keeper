import { readdirSync, readFileSync, writeFileSync } from "fs"
import * as ts from 'typescript'
import { ensureDir } from "./dirs"

const CONFIG_IDENTIFIER = "ConfigHandler"

let handlerInstances = []

export const getConfigHandlers = () => {
	if (handlerInstances.length) {
		return handlerInstances;
	}
	
	return handlerInstances = readdirSync("./configs/")
		.filter(f => f.includes(CONFIG_IDENTIFIER))
		.map((f) => {
			const file = f.split(".")[0];

			const cwd = process.cwd();
			const tempDir = `${cwd}/temp`;

			ensureDir(tempDir);

			const compiledFileLocation = `${tempDir}/${file}.js`;

			const compiledResult = ts.transpileModule(readFileSync(`${cwd}/configs/${file}.ts`).toString(), { compilerOptions: { module: ts.ModuleKind.CommonJS } });
			
			writeFileSync(compiledFileLocation, compiledResult.outputText);
			
			const HandlerClass = require(compiledFileLocation).default;

			return {
				class: HandlerClass,
				instance: new HandlerClass()
			};
		});
}