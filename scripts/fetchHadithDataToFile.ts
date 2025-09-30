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

async function runAll(): Promise<void> {
	try {
		await runScript(path.resolve("scripts/fetchBooksToFile.ts"));
		await runScript(path.resolve("scripts/fetchChaptersToFile.ts"));
		await runScript(path.resolve("scripts/fetchHadithsToFile.ts"));
		console.log("✅ All Hadith data fetched and saved");
	} catch (err) {
		console.error("❌ Pipeline failed:", err instanceof Error ? err.message : err);
	}
}

runAll();
