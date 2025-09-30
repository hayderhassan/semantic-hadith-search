import { spawn } from "child_process";
import path from "path";
import type { ScriptPath } from "../src/types/Script.ts";

function runScript(scriptPath: ScriptPath): Promise<void> {
	return new Promise((resolve, reject) => {
		const proc = spawn("ts-node", [scriptPath], { stdio: "inherit" });
		proc.on("close", (code: number | null) => {
			if (code === 0) resolve();
			else reject(new Error(`❌ Script ${scriptPath} failed with code ${code}`));
		});
	});
}

async function runPrebuildPipeline(): Promise<void> {
	try {
		await runScript(path.resolve("scripts/fetchHadithDataToFile.ts"));
		await runScript(path.resolve("scripts/generateFilters.ts"));
		console.log("✅ Prebuild pipeline completed");
	} catch (err) {
		console.error("❌ Prebuild pipeline failed:", err instanceof Error ? err.message : err);
	}
}

runPrebuildPipeline();
