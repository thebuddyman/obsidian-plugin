import { App } from "obsidian";
import { getRandomQuote } from "./getRandomQuote";
import { newJournal } from "./newJournal";
import { getRandomJournalQuestion } from "./getRandomJournalQuestion";
import { fetchJournalQuestions } from "./fetchJournalQuestions"; // Import the fetch function
import menuData from "../data/journal_menu.json"; // Import the menu data

export async function prepareJournal(app: App, journalType: string) {
	const quote = await getRandomQuote(journalType);

	if (!quote) {
		console.error("Error: No quote found.");
		return; // Exit the function if no quote is found
	}

	// Find the corresponding menu item for the given journalType
	const menuItem = menuData.menu.find(
		(item) => item.category === journalType
	);

	if (!menuItem) {
		console.error("Error: Menu item not found for journalType.");
		return; // Exit the function if no menu item is found
	}

	// Fetch the first five journal questions for the given type
	const fetchedQuestions = await fetchJournalQuestions(journalType);

	let journalContent = `>"${quote.text}" - ${quote.author}\n\n`;

	// Add the first five questions to the journal content
	fetchedQuestions.forEach((question) => {
		journalContent += `## ${question}\n-\n\n`;
	});

	// Get a random journal question and add it to the journal content
	const randomJournalQuestion = getRandomJournalQuestion(journalType);
	journalContent += `## ${randomJournalQuestion}\n-\n\n`;

	// Use the title from the menu item
	const journalTitle = menuItem.title;

	await newJournal(app, `${journalTitle} Journal`, journalContent);
}
