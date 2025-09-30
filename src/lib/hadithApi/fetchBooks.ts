import type { BooksResponse } from "@/types/Book";
import { getHadithApiKey } from "./getHadithApiKey.ts";

export async function fetchBooks(): Promise<BooksResponse> {
	const apiKey = getHadithApiKey();

	const url = `https://hadithapi.com/api/books?apiKey=${apiKey}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`❌ Books fetch failed: ${res.status} ${res.statusText}`);
	}

	const data = (await res.json()) as BooksResponse;
	return data;
}
