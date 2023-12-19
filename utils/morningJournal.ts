import { App } from "obsidian";
import { getRandomQuote } from "./getRandomQuote"; 
import { createNewJournalFile } from "./createNewJournalFile"; 
import { getRandomJournalQuestion } from "./getRandomJournalQuestion"; 

export async function morningJournal(app: App) {
	const quote = await getRandomQuote(); 
	const randomQuestion = getRandomJournalQuestion(); 

	const journalContent = `
> "${quote.text}" - ${quote.author}

## What three things am I grateful for today?
1. 
2. 
3. 

## What are the top three priorities I need to focus on today?
1. 
2. 
3. 

## What is one thing I can do today to take a step towards a personal goal or dream?
-

## What is one thing I am looking forward to today?
-

## How can I show kindness or appreciation to others today?
-

## ${randomQuestion}
-

`;

	const baseTitle = "Morning Journal";
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
		console.error("Error in morningJournal:", error);
	}
}
