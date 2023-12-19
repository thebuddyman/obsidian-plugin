import { App } from "obsidian";
import { getRandomQuote } from "./getRandomQuote"; 
import { createNewJournalFile } from "./createNewJournalFile"; 
import { getRandomJournalQuestion } from "./getRandomJournalQuestion"; 

export async function weeklyWrap(app: App) {
	const quote = await getRandomQuote();
	const randomQuestion = getRandomJournalQuestion(); 

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
