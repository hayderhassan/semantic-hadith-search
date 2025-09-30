import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Semantic Hadith Search",
	description: "Explore Hadiths with semantic precision and clarity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased`}>
				<Navbar />
				<main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
			</body>
		</html>
	);
}
