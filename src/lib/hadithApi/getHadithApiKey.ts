import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export function getHadithApiKey(): string {
	const key = process.env["HADITH_API_KEY"];
	if (typeof key !== "string" || !key.trim()) {
		throw new Error("❌ HADITH_API_KEY is missing or invalid");
	}
	return key.trim();
}
