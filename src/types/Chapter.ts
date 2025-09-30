export interface Chapter {
	id: number;
	chapterNumber: string;
	chapterEnglish: string;
	chapterUrdu: string;
	chapterArabic: string;
	bookSlug: string;
}

export type ChaptersByBook = Record<string, Chapter[]>;
