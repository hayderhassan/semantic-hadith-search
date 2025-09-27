"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SearchPage() {
	const [query, setQuery] = useState("");
	const [filters, setFilters] = useState({
		narrator: "",
		source: "",
		topic: "",
		authenticity: "",
		language: "",
		collection: "",
		keywords: "",
		date: "",
	});

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
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
						{Object.entries(filters).map(([key, value]) => (
							<div key={key} className="space-y-2">
								<Label htmlFor={key} className="capitalize">
									{key}
								</Label>
								<Input
									id={key}
									placeholder={`Filter by ${key}`}
									value={value}
									onChange={(e) => handleFilterChange(key, e.target.value)}
								/>
							</div>
						))}
					</div>

					<Button type="submit" className="w-full mt-4">
						Search
					</Button>
				</CardContent>
			</Card>

			{/* Placeholder for results */}
			<div className="space-y-4">
				<Card>
					<CardContent>
						<h2 className="text-lg font-semibold">Sample Hadith Result</h2>
						<p className="text-sm text-gray-700">
							This is where your semantic search results will appear.
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

// "use client";
//
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import {
// 	Accordion,
// 	AccordionItem,
// 	AccordionTrigger,
// 	AccordionContent,
// } from "@/components/ui/accordion";
// import {
// 	Select,
// 	SelectTrigger,
// 	SelectValue,
// 	SelectContent,
// 	SelectItem,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
//
// export default function SearchPage() {
// 	const [query, setQuery] = useState("");
// 	const [filters, setFilters] = useState({
// 		narrator: "",
// 		source: "",
// 		topic: "",
// 		authenticity: "",
// 		language: "",
// 		collection: "",
// 		keywords: "",
// 		date: "",
// 	});
//
// 	return (
// 		<section className="max-w-5xl mx-auto px-4 py-6 space-y-6">
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Semantic Hadith Search</CardTitle>
// 				</CardHeader>
// 				<CardContent className="space-y-4">
// 					<Input
// 						placeholder="Search Hadiths by text, keywords, or meaning..."
// 						value={query}
// 						onChange={(e) => setQuery(e.target.value)}
// 					/>
//
// 					<Accordion type="multiple" className="w-full">
// 						{Object.entries(filters).map(([key, value]) => (
// 							<AccordionItem key={key} value={key}>
// 								<AccordionTrigger className="capitalize">{key}</AccordionTrigger>
// 								<AccordionContent>
// 									<Input
// 										placeholder={`Filter by ${key}`}
// 										value={value}
// 										onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
// 									/>
// 								</AccordionContent>
// 							</AccordionItem>
// 						))}
// 					</Accordion>
//
// 					<Button className="w-full">Search</Button>
// 				</CardContent>
// 			</Card>
//
// 			{/* Results placeholder */}
// 			<div className="space-y-4">
// 				{/* Map over results here */}
// 				<Card>
// 					<CardContent>
// 						<h2 className="text-lg font-semibold">Sample Hadith Result</h2>
// 						<p className="text-sm text-gray-700">
// 							This is where your semantic results will appear.
// 						</p>
// 					</CardContent>
// 				</Card>
// 			</div>
// 		</section>
// 	);
// }
