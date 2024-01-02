import randomQuestions from "../data/random_questions.json";

export function getRandomJournalQuestion(journalType?: string) {
	let questions = [
		...randomQuestions["Morning Journal Questions"],
		...randomQuestions["Evening Journal Questions"],
	];

	if (journalType === "Morning") {
		questions = randomQuestions["Morning Journal Questions"];
	} else if (journalType === "Evening") {
		questions = randomQuestions["Evening Journal Questions"];
	} else if (journalType) {
		// Filter questions from both morning and evening based on the category
		questions = questions.filter((q) => q.category === journalType);
		if (questions.length === 0) {
			console.warn(
				"No questions available for the category:",
				journalType,
				"Using all questions."
			);
			questions = [
				...randomQuestions["Morning Journal Questions"],
				...randomQuestions["Evening Journal Questions"],
			];
		}
	}

	// If no journalType is provided, use all questions
	if (!journalType) {
		questions = [
			...randomQuestions["Morning Journal Questions"],
			...randomQuestions["Evening Journal Questions"],
		];
	}

	// Select a random question from the available questions
	const randomIndex = Math.floor(Math.random() * questions.length);
	return questions[randomIndex].question;
}
