"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
	return (
		<Card className="max-w-xl mx-auto">
			<CardHeader>
				<CardTitle>Contact Us</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input id="name" placeholder="Your full name" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="you@example.com" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="message">Message</Label>
						<Textarea id="message" placeholder="How can we help you?" rows={5} />
					</div>

					<Button type="submit" className="w-full">
						Send Message
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
