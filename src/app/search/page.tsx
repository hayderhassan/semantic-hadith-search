"use client";

import { useState } from "react";
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
import { ontology, OntologyKey } from "@/lib/ontology";
import { searchHadiths, HadithResult } from "@/lib/search";

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const [filters, setFilters] = useState<Record<OntologyKey, string>>(
		Object.fromEntries(Object.keys(ontology).map((key) => [key, ""])) as Record<OntologyKey, string>
	);
	const [results, setResults] = useState<HadithResult[]>([]);
	const [loading, setLoading] = useState(false);

	const handleFilterChange = (key: OntologyKey, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const handleSearch = async () => {
		setLoading(true);
		const payload = {
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

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{Object.entries(ontology).map(([key, values]) => (
							<div key={key} className="space-y-2">
								<Label htmlFor={key} className="capitalize">
									{key}
								</Label>
								<Select
									value={filters[key as OntologyKey]}
									onValueChange={(value) => handleFilterChange(key as OntologyKey, value)}
								>
									<SelectTrigger>
										<SelectValue placeholder={`Select ${key}`} />
									</SelectTrigger>
									<SelectContent>
										{values.map((option) => (
											<SelectItem key={option} value={option}>
												{option}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						))}
					</div>

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
