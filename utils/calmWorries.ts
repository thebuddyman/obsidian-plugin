import { App } from "obsidian";
import { getRandomQuote } from "./getRandomQuote"; // Adjust the path as necessary
import { createNewJournalFile } from "./createNewJournalFile"; // Import the utility function
import { getRandomJournalQuestion } from "./getRandomJournalQuestion"; // Import the utility function for random question

export async function calmWorries(app: App) {
	const quote = await getRandomQuote(); // Assuming getRandomQuote is an async function
	const randomQuestion = getRandomJournalQuestion(); // Get a random question

	const journalContent = `
> "${quote.text}" - ${quote.author}

## What specific worries are on my mind right now?
- 

## Can I identify what's within my control regarding these worries?
- 

## What evidence do I have that supports or refutes my worries?
- 

## What positive actions can I take to address the aspects that are within my control?
- 

## What would I say to a friend who had these same worries?
- 

## ${randomQuestion}
- 

`;

	const baseTitle = "Calm Worries";
	try {
		const filePath = await createNewJournalFile(
			app,
			baseTitle,
			journalContent
		);
		console.log("Journal created:", filePath);
		await app.workspace.openLinkText(
			filePath.replace(".md", ""),
			"/",
			true
		);
	} catch (error) {
		console.error("Error in calmWorries:", error);
	}
}
