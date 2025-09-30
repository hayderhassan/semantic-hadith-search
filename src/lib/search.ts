import hadithsDataRaw from "@/data/hadiths.json";
import type { HadithsByBook } from "@/types/Hadith";
import type { SearchPayload, HadithResult } from "@/types/Search";

const hadithsData = hadithsDataRaw as unknown as HadithsByBook;

export async function searchHadiths(payload: SearchPayload): Promise<HadithResult[]> {
	const { query, filters } = payload;
	const results: HadithResult[] = [];

	for (const bookSlug in hadithsData) {
		if (filters.book && filters.book !== bookSlug) continue;

		const hadiths = hadithsData[bookSlug];
		if (!Array.isArray(hadiths)) continue;

		for (const hadith of hadiths) {
			if (filters.chapter && hadith.chapterId !== filters.chapter) continue;
			if (filters.status && hadith.status !== filters.status) continue;

			const textMatch =
				!query ||
				hadith.hadithEnglish?.toLowerCase().includes(query.toLowerCase()) ||
				hadith.hadithArabic?.includes(query) ||
				hadith.hadithUrdu?.includes(query);

			if (textMatch) {
				results.push({
					id: `${bookSlug}-${hadith.hadithNumber}`,
					text:
						hadith.hadithEnglish ??
						hadith.hadithArabic ??
						hadith.hadithUrdu ??
						hadith.headingEnglish ??
						hadith.headingArabic ??
						hadith.headingUrdu ??
						"No text available",
					narrator: hadith.englishNarrator || hadith.urduNarrator || "Unknown",
					source: hadith.book.bookName,
					authenticity: hadith.status ?? "Unspecified",
				});
			}
		}
	}

	return results;
}
