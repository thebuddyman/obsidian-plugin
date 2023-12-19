import quotes from '../data/quotes.json'; // Adjust the path as necessary

export function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
