import quotes from "../data/quotes.json";

// Define a type for the quote object
type Quote = {
	text: string;
	author: string;
	category: string;
};

export function getRandomQuote(journalType: string) {
	let filteredQuotes: Quote[] = [];

	if (journalType === "Morning") {
		filteredQuotes = quotes["Morning Quotes"];
	} else if (journalType === "Evening") {
		filteredQuotes = quotes["Evening Quotes"];
	} else {
		// Filter quotes based on the category that matches the journalType
		const allQuotes = [
			...quotes["Morning Quotes"],
			...quotes["Evening Quotes"],
		];
		filteredQuotes = allQuotes.filter(
			(quote) => quote.category === journalType
		);

		if (filteredQuotes.length === 0) {
			console.warn(
				"No quotes available for the category:",
				journalType,
				"Using all quotes."
			);
			filteredQuotes = allQuotes;
		}
	}

	if (!filteredQuotes || filteredQuotes.length === 0) {
		console.error(
			"No quotes available for the specified journal type:",
			journalType
		);
		return null; // Or return a default quote
	}

	// Select a random quote from the filtered list
	const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
	return filteredQuotes[randomIndex];
}
