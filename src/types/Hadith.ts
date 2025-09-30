import type { Book } from "@/types/Book";
import type { Chapter } from "@/types/Chapter";
import type { HadithStatus } from "@/types/HadithStatus";

export interface Hadith {
	id: number;
	hadithNumber: string;
	englishNarrator: string | null;
	hadithEnglish: string;
	hadithUrdu: string;
	urduNarrator: string | null;
	hadithArabic: string;
	headingArabic: string | null;
	headingUrdu: string | null;
	headingEnglish: string | null;
	chapterId: string;
	bookSlug: string;
	volume: string;
	status: HadithStatus;
	book: Book;
	chapter: Chapter;
}

export type HadithsByBook = Record<string, Hadith[]>;
