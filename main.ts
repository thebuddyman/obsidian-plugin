import {
	Plugin,
	Menu,
	Modal,
	App,
	Notice,
	TextAreaComponent
} from "obsidian";
import { prepareJournal } from "utils/prepareJournal";
import { queryChatGPT } from "utils/chatGptApi"; // Import for ChatGPT API calls
import { newJournal } from "utils/newJournal";
import {
	PluginSettings,
	loadPluginSettings,
	savePluginSettings,
	DEFAULT_SETTINGS,
} from "utils/settingsUtil";

import journalMenu from "data/journal_menu.json"; // Import the JSON data
import { MenuData, MenuItem } from "types/menuData"; // Import the MenuData interface
import { JournalingPluginSettingsTab } from "./JournalingPluginSettingsTab"; // Updated import

export default class JournalingPlugin extends Plugin {
	apiKey: string; // Add apiKey property
	menuData: MenuData; // Variable to store menu data
	settings: PluginSettings;

	async onload() {
		// Load the API key
		//this.apiKey = await this.loadApiKey(); // Call to load the API key
		this.settings = await loadPluginSettings(this);

		this.menuData = journalMenu; // Assign the imported JSON data to menuData
		this.addSettingTab(new JournalingPluginSettingsTab(this.app, this));

		this.addRibbonIcon("feather", "Open menu", (mainEvent) => {
			const menu = new Menu();

			const mainMenuX = mainEvent.clientX;
			const mainMenuY = mainEvent.clientY;

			menu.addItem((item) => {
				item.setTitle("✏️ Journaling Prompts").onClick((evt) => {
					evt.preventDefault();

					const submenu = new Menu();

					// Iterate through menuData to create submenu items
					this.menuData.menu.forEach((menuItem: MenuItem) => {
						submenu.addItem((subItem) => {
							subItem.setTitle(menuItem.title).onClick(() => {
								prepareJournal(this.app, menuItem.category);
							});
						});
					});

					submenu.showAtPosition({ x: mainMenuX, y: mainMenuY });
				});
			});

			if (this.settings.apiKey && this.settings.apiKey.trim() !== "") {
				menu.addItem((item) => {
					item.setTitle("🤖 AI Journaling").onClick(() => {
						if (this.settings.apiKey) {
							new HelpModal(
								this.app,
								this.settings.apiKey
							).open();
						} else {
							new Notice(
								"API key not set. Please check your settings."
							);
						}
					});
				});
			}

			menu.showAtMouseEvent(mainEvent);
		});

		if (!this.settings.apiKey) {
			this.settings.apiKey = DEFAULT_SETTINGS.apiKey;
			await savePluginSettings(this, this.settings);
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async testChatGPT(prompt: string): Promise<boolean> {
		try {
			const response = await queryChatGPT(prompt, this.settings.apiKey);
			return response ? true : false;
		} catch (error) {
			console.error("Error testing ChatGPT API:", error);
			return false;
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// async loadApiKey(): Promise<string> {
	// 	try {
	// 		// Define the path to the API key file
	// 		const apiKeyFilePath = "apikey.txt"; // Replace with the actual path

	// 		// Read the file content
	// 		const apiKeyFileContents = await this.app.vault.adapter.read(
	// 			apiKeyFilePath
	// 		);

	// 		// Return the trimmed content (the API key)
	// 		return apiKeyFileContents.trim();
	// 	} catch (error) {
	// 		console.error("Error reading API key file:", error);
	// 		new Notice(
	// 			"Failed to load API key. Please check your API key file."
	// 		);
	// 		return ""; // Return an empty string if there's an error
	// 	}
	// }

	async loadApiKey(): Promise<string> {
		try {
			const apiKeyFilePath = "apikey.txt"; // Ensure this is the correct path
			const apiKeyFileContents = await this.app.vault.adapter.read(
				apiKeyFilePath
			);
			console.log("API Key File Contents:", apiKeyFileContents); // Check what's read
			return apiKeyFileContents.trim();
		} catch (error) {
			console.error("Error reading API key file:", error);
			new Notice(
				"Failed to load API key. Please check your API key file."
			);
			return "";
		}
	}
}

class HelpModal extends Modal {
	plugin: JournalingPlugin; // Store the entire plugin instance

	apiKey: string; // To store the API key
	prePrompt: string;
	prePromptQuote: string;
	prePromptWisdom: string;
	prePromptQuestions: string;
	prePromptTitle: string;

	constructor(app: App, apiKey: string) {
		super(app);
		this.apiKey = apiKey; // Initialize the API key
		this.prePrompt = ""; // Initialize prePrompt
		this.prePromptQuote = ""; // Initialize prePrompt
		this.prePromptWisdom = ""; // Initialize prePrompt
		this.prePromptQuestions = ""; // Initialize prePrompt
	}

	getAbsolutePath(fileName: string): string {

		// Relative path
		const relativePath = `${this.app.vault.configDir}/plugins/obsidian-reflective-journaling/prompts/${fileName}`;

		// Absolute path
		return `${relativePath}`;
	}

	async loadPrePrompt(): Promise<void> {

		
		try {
			// Define the path to the pre-prompt file
			//const prePromptFilePath = "preprompt.txt"; // Adjust path as needed
			const prePromptFilePathQuote = this.getAbsolutePath(
				"preprompt-quote.txt"
			);

			const prePromptFilePathWisdom = this.getAbsolutePath(
				"preprompt-wisdom.txt"
			);
			const prePromptFilePathQuestions = this.getAbsolutePath(
				"preprompt-questions.txt"
			);
			const prePromptFilePathTitle = this.getAbsolutePath(
				"preprompt-title.txt"
			);

			// Read the file content
			// this.prePrompt = await this.app.vault.adapter.read(
			// 	prePromptFilePath
			// );
			this.prePromptQuote = await this.app.vault.adapter.read(
				prePromptFilePathQuote
			);
			this.prePromptWisdom = await this.app.vault.adapter.read(
				prePromptFilePathWisdom
			);
			this.prePromptQuestions = await this.app.vault.adapter.read(
				prePromptFilePathQuestions
			);
			this.prePromptTitle = await this.app.vault.adapter.read(
				prePromptFilePathTitle
			);
		} catch (error) {
			console.error("Error reading pre-prompt file:", error);
			new Notice(
				"Failed to load pre-prompt. Please check your preprompt.txt file."
			);
			this.prePrompt = ""; // Default to an empty string in case of error
		}
	}

	async onOpen() {
		const { contentEl } = this;
		await this.loadPrePrompt();

		contentEl.empty();

		contentEl.createEl("h2", { text: "How are you feeling now?" });
		contentEl.createEl("p", {
			text: "Reflect on your current emotions. Write about what you are feeling at this moment and explore the reasons behind these feelings.",
		});

		// Use TextAreaComponent for multiline input
		const textArea = new TextAreaComponent(contentEl);
		textArea.setPlaceholder("Share your thoughts...");
		textArea.inputEl.style.minHeight = "100px"; // Set a minimum height
		textArea.inputEl.style.width = "100%"; // Set width to 100%
		const buttonContainer = contentEl.createDiv();
		buttonContainer.style.marginTop = "10px"; // Add some space above the button

		contentEl
			.createEl("button", { text: "Continue" })
			.addEventListener("click", async () => {
				const userInput = textArea.getValue();
				if (!userInput.trim()) {
					new Notice("Please enter some text.");
					return;
				}

				const quotePrompt = `${this.prePromptQuote}\n\n${userInput}`;
				const wisdomPrompt = `${this.prePromptWisdom}\n\n${userInput}`;
				const questionsPrompt = `${this.prePromptQuestions}\n\n${userInput}`;
				const TitlePrompt = `${this.prePromptTitle}\n\n${userInput}`;
				// const combinedPrompt = `${this.prePrompt}\n\n${userInput}`;

				try {
					// Call ChatGPT with the formatted prompt
					// const chatGPTResponse = await queryChatGPT(combinedPrompt, this.apiKey);
					const chatGPTResponseQuote = await queryChatGPT(
						quotePrompt,
						this.apiKey
					);
					const chatGPTResponseWisdom = await queryChatGPT(
						wisdomPrompt,
						this.apiKey
					);
					const chatGPTResponseQuestions = await queryChatGPT(
						questionsPrompt,
						this.apiKey
					);
					const chatGPTResponseTitle = await queryChatGPT(
						TitlePrompt,
						this.apiKey
					);

					// Remove leading period or other invalid characters before JSON object starts
					const validJSONString = chatGPTResponseQuestions
						.trim()
						.replace(/^.*\{/, "{");

					// Parse the corrected string to get the questions array
					const questions = JSON.parse(validJSONString).Questions;

					// console.log("ChatGPT Response (Questions):", questions);

					// Combine user input and ChatGPT response
					let journalContent = `${userInput} \n\n---\n\n >${chatGPTResponseQuote} \n\n`;
					journalContent += `${chatGPTResponseWisdom} \n\n---\n\n`;

					// Format each question
					questions.forEach((question: string, index: number) => {
						journalContent += `### ${
							index + 1
						}. ${question}\n-\n\n`;
					});

					// Create a new journal entry
					await newJournal(
						this.app,
						chatGPTResponseTitle,
						journalContent
					);
					new Notice(
						"Journal entry created with your thoughts and reflective questions."
					);
				} catch (error) {
					console.error("Error with ChatGPT:", error);
					new Notice("Failed to get a response from ChatGPT.");
				}

				this.close();
			});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
