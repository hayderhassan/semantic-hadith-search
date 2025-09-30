export interface FilterOption {
	label: string;
	uri: string;
}

export interface Filters {
	book: FilterOption[];
	chapter: FilterOption[];
	status: FilterOption[];
}
