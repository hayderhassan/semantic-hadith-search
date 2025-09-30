import { NextResponse } from "next/server";
import { searchHadiths } from "@/lib/search";
import type { SearchPayload } from "@/types/Search";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { query, filters }: SearchPayload = body;

		const results = await searchHadiths({ query, filters });
		return NextResponse.json({ results });
	} catch (err: unknown) {
		console.error("❌ Search API error:", err);
		return NextResponse.json({ error: "Search failed" }, { status: 500 });
	}
}
