import {
	Plugin,
	Menu,
	// Modal,
	// App,
	// Notice,
	// TextComponent,
} from "obsidian";
import { morningJournal } from "utils/morningJournal"; 
import { eveningJournal } from "utils/eveningJournal";
import { calmWorries } from "utils/calmWorries";
import { weeklyWrap } from "utils/weeklyWrap";

export default class ExamplePlugin extends Plugin {
	onload() {
		this.addRibbonIcon("dice", "Open menu", (mainEvent) => {
			const menu = new Menu();

			const mainMenuX = mainEvent.clientX;
			const mainMenuY = mainEvent.clientY;

			menu.addItem((item) => {
				item.setTitle("Journal Prompts")
					.setIcon("pencil")
					.onClick((evt) => {
						evt.preventDefault();

						const submenu = new Menu();
						submenu.addItem((subItem) => {
							subItem.setTitle("Morning Journal").onClick(() => {
								morningJournal(this.app);
							});
						});
						
						submenu.addItem((subItem) => {
							subItem.setTitle("Evening Journal").onClick(() => {
								eveningJournal(this.app);
							});
						});

						submenu.addItem((subItem) => {
							subItem.setTitle("Calm Worries").onClick(() => {
								calmWorries(this.app);
							});
						});

						submenu.addItem((subItem) => {
							subItem.setTitle("Weekly Wrap").onClick(() => {
								weeklyWrap(this.app);
							});
						});


						submenu.showAtPosition({ x: mainMenuX, y: mainMenuY });
					});
			});

			// menu.addItem((item) => {
			// 	item.setTitle("Prompt Recommendation")
			// 		.setIcon("help")
			// 		.onClick(() => {
			// 			new HelpModal(this.app).open();
			// 		});
			// });

			menu.showAtMouseEvent(mainEvent);
		});
	}
}

// class HelpModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const { contentEl } = this;
// 		contentEl.empty();

// 		contentEl.createEl("h2", { text: "Help" });

// 		contentEl.createEl("p", { text: "What do you need help with?" });

// 		const textField = new TextComponent(contentEl);
// 		textField.setPlaceholder("Enter your question here...");

// 		contentEl
// 			.createEl("button", { text: "Submit" })
// 			.addEventListener("click", () => {
// 				new Notice(`You asked: ${textField.getValue()}`);
// 				this.close();
// 			});
// 	}

// 	onClose() {
// 		const { contentEl } = this;
// 		contentEl.empty();
// 	}
// }
