import type { Chapter } from "@/types/Chapter";
import { getHadithApiKey } from "./getHadithApiKey.ts";

export async function fetchChapters(
	bookSlug: string,
	paginate?: number
): Promise<{ chapters: Chapter[] }> {
	const apiKey = getHadithApiKey();
	const url = `https://hadithapi.com/api/${bookSlug}/chapters?apiKey=${apiKey}${
		paginate ? `&paginate=${paginate}` : ""
	}`;

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`❌ Chapters fetch failed: ${res.status} ${res.statusText}`);
	}

	return (await res.json()) as { chapters: Chapter[] };
}
