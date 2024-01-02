import { App } from "obsidian";
import { createNewJournalFile } from "./createNewJournalFile"; 

export async function newJournal(app: App, title: string, content: string) {
    try {
        const filePath = await createNewJournalFile(app, title, content);
        console.log("Journal created:", filePath);
        await app.workspace.openLinkText(filePath.replace(".md", ""), "/", true);
    } catch (error) {
        console.error(`Error in ${title}:`, error);
    }
}
