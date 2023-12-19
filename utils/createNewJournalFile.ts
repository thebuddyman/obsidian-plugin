import { App, TFile } from "obsidian";

export async function createNewJournalFile(app: App, baseTitle: string, content: string): Promise<string> {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; 

    let journalNumber = 1;
    let journalTitle = `${baseTitle} - ${formattedDate}`;
    let filePath = journalTitle + ".md";
    let existingFile = app.vault.getAbstractFileByPath(filePath);

    while (existingFile instanceof TFile) {
        journalTitle = `${baseTitle} - ${formattedDate} (${journalNumber})`;
        filePath = journalTitle + ".md";
        existingFile = app.vault.getAbstractFileByPath(filePath);
        journalNumber++;
    }

    try {
        await app.vault.create(filePath, content);
        console.log("Journal created:", filePath);
        return filePath;
    } catch (error) {
        console.error("Error creating journal:", error);
        throw error;
    }
}
