import fs from "fs/promises";
import path from "path";
import { fetchBooks } from "../src/lib/hadithApi/fetchBooks.ts";
import type { BooksResponse } from "../src/types/Book.ts";

async function saveBooksToFile() {
	console.log("📚 Fetching books...");
	const data: BooksResponse = await fetchBooks();

	const outputPath = path.resolve("data/books.json");
	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	await fs.writeFile(outputPath, JSON.stringify(data, null, 2), "utf-8");

	console.log(`✅ Saved ${data.books.length} books to ${outputPath}`);
}

saveBooksToFile().catch((err) => {
	console.error("❌ Error saving books:", err);
});
