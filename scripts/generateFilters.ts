import fs from "fs/promises";
import path from "path";
import type { Filters, FilterOption } from "../src/types/Filter.ts";
import type { BooksResponse } from "../src/types/Book.ts";
import type { ChaptersByBook } from "../src/types/Chapter.ts";
import type { HadithsByBook } from "../src/types/Hadith.ts";

async function generateFilters(): Promise<void> {
	const booksPath = path.resolve("data/books.json");
	const chaptersPath = path.resolve("data/chapters.json");
	const hadithsPath = path.resolve("data/hadiths.json");
	const outputPath = path.resolve("public/filters.json");

	const [booksRaw, chaptersRaw, hadithsRaw] = await Promise.all([
		fs.readFile(booksPath, "utf-8"),
		fs.readFile(chaptersPath, "utf-8"),
		fs.readFile(hadithsPath, "utf-8"),
	]);

	const booksData = JSON.parse(booksRaw) as BooksResponse;
	const chaptersData = JSON.parse(chaptersRaw) as ChaptersByBook;
	const hadithsData = JSON.parse(hadithsRaw) as HadithsByBook;

	const bookFilters: FilterOption[] = booksData.books.map((book) => ({
		label: book.bookName,
		uri: book.bookSlug,
	}));

	const chapterSet = new Map<string, string>();
	for (const chapters of Object.values(chaptersData)) {
		for (const chapter of chapters) {
			const key = String(chapter.chapterNumber);
			if (!chapterSet.has(key)) {
				chapterSet.set(key, chapter.chapterEnglish);
			}
		}
	}
	const chapterFilters: FilterOption[] = Array.from(chapterSet.entries()).map(([uri, label]) => ({
		label,
		uri,
	}));

	const statusSet = new Set<string>();
	for (const hadithList of Object.values(hadithsData)) {
		for (const hadith of hadithList) {
			if (hadith.status) statusSet.add(hadith.status);
		}
	}
	const statusFilters: FilterOption[] = Array.from(statusSet).map((status) => ({
		label: status,
		uri: status,
	}));

	const filters: Filters = {
		book: bookFilters,
		chapter: chapterFilters,
		status: statusFilters,
	};

	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	await fs.writeFile(outputPath, JSON.stringify(filters, null, 2), "utf-8");
	console.log(`✅ filters.json generated at ${outputPath}`);
}

generateFilters().catch((err) => {
	console.error("❌ Failed to generate filters.json:", err instanceof Error ? err.message : err);
});
