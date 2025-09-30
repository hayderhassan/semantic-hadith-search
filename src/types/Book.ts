export interface Book {
	id: number;
	bookName: string;
	writerName: string;
	aboutWriter: string | null;
	writerDeath: string;
	bookSlug: string;
	hadiths_count: string;
	chapters_count: string;
}

export interface BooksResponse {
	status: number;
	message: string;
	books: Book[];
}
