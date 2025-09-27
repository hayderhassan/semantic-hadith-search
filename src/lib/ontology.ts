export type OntologyKey =
	| "narrator"
	| "source"
	| "topic"
	| "authenticity"
	| "language"
	| "collection"
	| "date"
	| "keywords";

export type Ontology = Record<OntologyKey, string[]>;

// Example mock data
export const ontology: Ontology = {
	narrator: ["Aisha", "Abu Huraira", "Ibn Abbas"],
	source: ["Bukhari", "Muslim", "Tirmidhi"],
	topic: ["Prayer", "Fasting", "Charity"],
	authenticity: ["Sahih", "Hasan", "Daif"],
	language: ["Arabic", "English"],
	collection: ["Kutub al-Sittah", "Muwatta Malik"],
	date: ["7th century", "8th century"],
	keywords: ["mercy", "truth", "justice"],
};
