// import { OntologyKey } from "./ontology";
//
// export type SearchPayload = {
// 	query: string;
// 	filters: Partial<Record<OntologyKey, string>>;
// };
//
// export type HadithResult = {
// 	id: string;
// 	text: string;
// 	source: string;
// 	narrator: string;
// 	authenticity: string;
// };
//
// export async function searchHadiths(payload: SearchPayload): Promise<HadithResult[]> {
// 	console.log("Searching with payload:", payload);
//
// 	// Simulated delay
// 	await new Promise((res) => setTimeout(res, 500));
//
// 	// Mocked results
// 	return [
// 		{
// 			id: "1",
// 			text: "The Prophet said: Actions are judged by intentions.",
// 			source: "Bukhari",
// 			narrator: "Umar ibn al-Khattab",
// 			authenticity: "Sahih",
// 		},
// 		{
// 			id: "2",
// 			text: "Charity does not decrease wealth.",
// 			source: "Muslim",
// 			narrator: "Abu Huraira",
// 			authenticity: "Sahih",
// 		},
// 	];
// }
//

// import { OntologyKey } from "./ontology";
import type { SearchPayload, HadithResult } from "./search";

const mockData: HadithResult[] = [
	{
		id: "1",
		text: "The Prophet said: Actions are judged by intentions.",
		source: "Bukhari",
		narrator: "Umar ibn al-Khattab",
		authenticity: "Sahih",
	},
	{
		id: "2",
		text: "Charity does not decrease wealth.",
		source: "Muslim",
		narrator: "Abu Huraira",
		authenticity: "Sahih",
	},
	{
		id: "3",
		text: "Speak the truth even if it is bitter.",
		source: "Tirmidhi",
		narrator: "Ibn Abbas",
		authenticity: "Hasan",
	},
];

export async function searchHadiths(payload: SearchPayload): Promise<HadithResult[]> {
	const { query, filters } = payload;

	await new Promise((res) => setTimeout(res, 300));

	return mockData.filter((hadith) => {
		const matchesQuery =
			query.trim() === "" || hadith.text.toLowerCase().includes(query.toLowerCase());

		const matchesFilters = Object.entries(filters).every(([key, value]) => {
			const hadithValue = (hadith as any)[key];
			return value === "" || hadithValue?.toLowerCase() === value.toLowerCase();
		});

		return matchesQuery && matchesFilters;
	});
}
