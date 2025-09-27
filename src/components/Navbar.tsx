"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<header className="border-b bg-white shadow-sm">
			<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
				<Link href="/" className="text-xl font-bold text-gray-900">
					HadithSearch
				</Link>

				<div className="md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" aria-label="Open menu">
								☰
							</Button>
						</SheetTrigger>
						<SheetContent side="left">
							<nav className="flex flex-col gap-4 mt-4">
								<Link href="/about">About</Link>
								<Link href="/search">Search</Link>
								<Link href="/contact">Contact</Link>
							</nav>
						</SheetContent>
					</Sheet>
				</div>

				<nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
					<Link href="/about" className="hover:text-blue-600">
						About
					</Link>
					<Link href="/search" className="hover:text-blue-600">
						Search
					</Link>
					<Link href="/contact" className="hover:text-blue-600">
						Contact
					</Link>
				</nav>
			</div>
		</header>
	);
}
