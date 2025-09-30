import type { HadithStatus } from "@/types/HadithStatus";

export interface HadithQuery {
	hadithEnglish?: string;
	hadithUrdu?: string;
	hadithArabic?: string;
	hadithNumber?: number;
	book?: string;
	chapter?: number;
	status?: HadithStatus;
	paginate?: number;
}
