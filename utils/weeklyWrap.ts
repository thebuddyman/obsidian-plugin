import { App } from "obsidian";
import { getRandomQuote } from "./getRandomQuote"; // Adjust the path as necessary
import { createNewJournalFile } from "./createNewJournalFile"; // Import the utility function
import { getRandomJournalQuestion } from "./getRandomJournalQuestion"; // Import the utility function for random question

export async function weeklyWrap(app: App) {
	const quote = await getRandomQuote(); // Assuming getRandomQuote is an async function
	const randomQuestion = getRandomJournalQuestion(); // Get a random question

	const journalContent = `
> "${quote.text}" - ${quote.author}

## What are the most significant accomplishments I achieved this week?
-

## What challenges did I face this week, and how did I overcome them?
-

## What lessons did I learn this week?
-

## How well did I balance work, rest, and play this week?
-

## What am I grateful for this week?
-

## ${randomQuestion}
-

`;

	const baseTitle = "Weekly Wrap";
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
		console.error("Error in weeklyWrap:", error);
	}
}
