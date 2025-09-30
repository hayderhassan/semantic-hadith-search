"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { searchHadiths, HadithResult, SearchPayload } from "@/lib/search";
import type { Filters, FilterOption } from "@/types/Filter";

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const [ontology, setOntology] = useState<Filters>({ book: [], chapter: [], status: [] });
	const [filters, setFilters] = useState<Record<keyof Filters, string>>({
		book: "",
		chapter: "",
		status: "",
	});
	const [results, setResults] = useState<HadithResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [filtersLoading, setFiltersLoading] = useState(true);

	useEffect(() => {
		const fetchOntology = async () => {
			try {
				const res = await fetch("/filters.json");
				const data: Filters = await res.json();
				setOntology(data);
				setFilters({ book: "", chapter: "", status: "" });
			} catch (err) {
				console.error("Failed to load filters.json", err);
			} finally {
				setFiltersLoading(false);
			}
		};

		fetchOntology();
	}, []);

	const handleFilterChange = (key: keyof Filters, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const handleSearch = async () => {
		setLoading(true);
		const payload: SearchPayload = {
			query,
			filters: Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== "")),
		};
		const data = await searchHadiths(payload);
		setResults(data);
		setLoading(false);
	};

	return (
		<section className="max-w-5xl mx-auto px-4 py-6 space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Semantic Hadith Search</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="query">Search Query</Label>
						<Input
							id="query"
							placeholder="Search Hadiths by text, meaning, or keywords..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>

					<Separator />

					{filtersLoading ? (
						<p className="text-sm text-muted-foreground">Loading filters...</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{(Object.keys(ontology) as (keyof Filters)[]).map((key) => (
								<div key={key} className="space-y-2">
									<Label htmlFor={key} className="capitalize">
										{key}
									</Label>
									<Select
										value={ontology[key].find((v) => v.uri === filters[key])?.label ?? ""}
										onValueChange={(label) => {
											const selected = ontology[key].find((v) => v.label === label);
											handleFilterChange(key, selected?.uri ?? "");
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder={`Select ${key}`} />
										</SelectTrigger>
										<SelectContent>
											{ontology[key].map((option: FilterOption) => (
												<SelectItem key={option.uri} value={option.label}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							))}
						</div>
					)}

					<Button onClick={handleSearch} className="w-full mt-4">
						Search
					</Button>
				</CardContent>
			</Card>

			{loading ? (
				<p className="text-center text-muted-foreground">Searching...</p>
			) : results.length > 0 ? (
				results.map((hadith) => (
					<Card key={hadith.id}>
						<CardContent className="space-y-2">
							<p className="text-gray-900">{hadith.text}</p>
							<p className="text-sm text-muted-foreground">
								<strong>Narrator:</strong> {hadith.narrator} · <strong>Source:</strong>{" "}
								{hadith.source} · <strong>Authenticity:</strong> {hadith.authenticity}
							</p>
						</CardContent>
					</Card>
				))
			) : (
				<p className="text-center text-muted-foreground">No results yet.</p>
			)}
		</section>
	);
}
