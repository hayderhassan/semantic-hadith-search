import fs from "fs/promises";
import path from "path";
import { fetchBooks } from "../src/lib/hadithApi/fetchBooks.ts";
import { fetchChapters } from "../src/lib/hadithApi/fetchChapters.ts";
import { fetchHadiths } from "../src/lib/hadithApi/fetchHadiths.ts";
import type { HadithsByBook } from "../src/types/Hadith.ts";
import type { Book } from "../src/types/Book.ts";
import type { Chapter } from "../src/types/Chapter.ts";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function saveHadithsToFile() {
	console.log("📜 Fetching hadiths...");
	const books = await fetchBooks();
	const allHadiths: HadithsByBook = {};

	for (const book of books.books) {
		const bookSlug: Book["bookSlug"] = book.bookSlug;
		const hadithsForBook: HadithsByBook[string] = [];

		try {
			const { chapters } = await fetchChapters(bookSlug);
			const limitedChapters: Chapter[] = chapters.slice(0, 10);

			for (const chapter of limitedChapters) {
				try {
					const res = await fetchHadiths({
						book: bookSlug,
						chapter: Number(chapter.chapterNumber),
						paginate: 1,
					});
					const hadiths = res.hadiths?.data?.slice(0, 10) ?? [];
					hadithsForBook.push(...hadiths);
					console.log(
						`✅ Fetched ${hadiths.length} hadiths for ${bookSlug} chapter ${chapter.chapterNumber}`
					);
					await sleep(300);
				} catch (err: any) {
					if (err.message.includes("429")) {
						console.warn(
							`⚠️ Rate limited on ${bookSlug} chapter ${chapter.chapterNumber}. Retrying after delay...`
						);
						await sleep(10000);
						continue;
					}
					if (err.message.includes("404")) {
						console.warn(`⚠️ Skipping ${bookSlug} chapter ${chapter.chapterNumber} due to 404`);
					} else {
						console.warn(
							`⚠️ Error in ${bookSlug} chapter ${chapter.chapterNumber}: ${err.message}`
						);
					}
					continue;
				}
			}
		} catch (err: any) {
			console.warn(`⚠️ Skipping book ${bookSlug} due to error: ${err.message}`);
			continue;
		}

		allHadiths[bookSlug] = hadithsForBook;
		console.log(`📘 Completed ${bookSlug} with ${hadithsForBook.length} hadiths`);
		await sleep(1000);
	}

	try {
		const outputPath = path.resolve("data/hadiths.json");
		await fs.mkdir(path.dirname(outputPath), { recursive: true });
		await fs.writeFile(outputPath, JSON.stringify(allHadiths, null, 2), "utf-8");
		console.log(`✅ Saved all hadiths to ${outputPath}`);
	} catch (err: any) {
		console.error("❌ Failed to write hadiths to file:", err);
	}
}

saveHadithsToFile().catch((err) => {
	console.error("❌ Unexpected error in hadith fetch pipeline:", err);
});
