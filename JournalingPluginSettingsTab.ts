import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import JournalingPlugin from "./main";

export class JournalingPluginSettingsTab extends PluginSettingTab {
	plugin: JournalingPlugin;

	constructor(app: App, plugin: JournalingPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// Add static heading and divider
		containerEl.createEl("h3", { text: "Settings" });

		new Setting(containerEl)
			.setName("ChatGPT API Key")
			.setDesc("Enter your OpenAI API key for AI Journaling.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Test API Key")
			.setDesc("Test the ChatGPT API key.")
			.addButton((button) =>
				button.setButtonText("Test").onClick(() => {
					this.testApiKey();
				})
			);
	}

	async testApiKey() {
		try {
			// Use a sample prompt for testing
			const response = await this.plugin.testChatGPT("Hello, world!");
			if (response) {
				new Notice("API key is valid.");
			} else {
				new Notice("Failed to validate API key.");
			}
		} catch (error) {
			console.error("API Key test error:", error);
			new Notice("Error testing API key.");
		}
	}
}
