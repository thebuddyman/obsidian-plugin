import { App } from "obsidian";
import { getRandomQuote } from "./getRandomQuote";
import { createNewJournalFile } from "./createNewJournalFile";
import { getRandomJournalQuestion } from "./getRandomJournalQuestion"; // Import the utility function

export async function eveningJournal(app: App) {
    const quote = await getRandomQuote();
    const randomQuestion = getRandomJournalQuestion(); // Get a random question

    const journalContent = `
> "${quote.text}" - ${quote.author}

## What are three key things I learned today?
1. 
2. 
3. 

## What am I most proud of achieving or doing today?
-

## What thoughts or worries am I holding onto that I need to let go of?
-

## What emotions am I feeling right now that I can acknowledge and then release?
- 

## What is one thing I am looking forward to tomorrow?
- 

## ${randomQuestion}
-

`;

    const baseTitle = "Evening Journal";
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
        console.error("Error in eveningJournal:", error);
    }
}