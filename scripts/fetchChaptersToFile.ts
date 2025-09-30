import fs from "fs/promises";
import path from "path";
import { fetchBooks } from "../src/lib/hadithApi/fetchBooks.ts";
import { fetchChapters } from "../src/lib/hadithApi/fetchChapters.ts";
import type { ChaptersByBook } from "../src/types/Chapter.ts";
import type { Book } from "../src/types/Book.ts";

async function saveChaptersToFile() {
	console.log("📖 Fetching chapters...");
	const books = await fetchBooks();
	const allChapters: ChaptersByBook = {};

	for (const book of books.books) {
		const slug: Book["bookSlug"] = book.bookSlug;
		try {
			const { chapters } = await fetchChapters(slug);
			allChapters[slug] = chapters;
			console.log(`✅ Fetched ${chapters.length} chapters for ${slug}`);
		} catch (err: any) {
			console.warn(`⚠️ Failed to fetch chapters for ${slug}: ${err.message}`);
		}
	}

	const outputPath = path.resolve("data/chapters.json");
	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	await fs.writeFile(outputPath, JSON.stringify(allChapters, null, 2), "utf-8");
	console.log(`✅ Saved chapters to ${outputPath}`);
}

saveChaptersToFile().catch((err) => {
	console.error("❌ Error saving chapters:", err);
});
