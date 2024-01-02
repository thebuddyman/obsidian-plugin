import journalQuestions from "../data/journal_questions.json";

export function fetchJournalQuestions(category: string) {
	try {
		const filteredQuestions = journalQuestions.filter(
			(q) => q.category === category
		);

		if (!filteredQuestions || filteredQuestions.length === 0) {
			throw new Error("No questions found for the specified category");
		}

		return filteredQuestions.map((q) => q.question);
	} catch (error) {
		console.error("Error fetching questions:", error);
		return [];
	}
}
