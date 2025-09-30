import type { HadithStatus } from "@/types/HadithStatus";

export interface SearchPayload {
	query: string;
	filters: {
		book?: string;
		chapter?: string;
		status?: HadithStatus;
	};
}

export interface HadithResult {
	id: string;
	text: string;
	narrator: string;
	source: string;
	authenticity: HadithStatus | "Unspecified";
}
