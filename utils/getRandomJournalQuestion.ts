import randomQuestions from "../data/random_questions.json";

export function getRandomJournalQuestion(journalType?: string) {
	// Flatten all questions into a single array
	let questions = randomQuestions.flatMap((q) => q);

	// Filter questions based on the provided journalType (category)
	if (journalType) {
		questions = questions.filter((q) => q.category === journalType);
	}

	// If no questions are found for the specified category, use all questions
	if (questions.length === 0) {
		console.warn(
			"No questions available for the category:",
			journalType,
			"Using all questions."
		);
		questions = randomQuestions.flatMap((q) => q);
	}

	// Select a random question from the available questions
	const randomIndex = Math.floor(Math.random() * questions.length);
	return questions[randomIndex].question;
}
