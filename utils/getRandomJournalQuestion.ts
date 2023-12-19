import random_questions from '../data/random_questions.json';

export function getRandomJournalQuestion(category?: string) {
    let questions = random_questions;
    if (category) {
        questions = questions.filter(q => q.category === category);
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex].question;
}
