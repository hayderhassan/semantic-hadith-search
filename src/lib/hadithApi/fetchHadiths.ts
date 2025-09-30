import type { HadithQuery } from "@/types/HadithQuery";
import type { Hadith } from "@/types/Hadith";
import { getHadithApiKey } from "./getHadithApiKey.ts";

export async function fetchHadiths(
	query: HadithQuery = {}
): Promise<{ hadiths: { data: Hadith[] } }> {
	const apiKey = getHadithApiKey();
	const params = new URLSearchParams({ apiKey });

	Object.entries(query).forEach(([key, value]) => {
		if (value !== undefined) params.append(key, String(value));
	});

	const url = `https://hadithapi.com/api/hadiths?${params.toString()}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`❌ Hadiths fetch failed: ${res.status} ${res.statusText}`);
	}

	return (await res.json()) as { hadiths: { data: Hadith[] } };
}
