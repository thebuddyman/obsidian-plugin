// Assuming this is in chatGptApi.ts

async function queryChatGPT(prompt: string, apiKey: string): Promise<string> {
	const model = "text-davinci-003"; // Adjust the model as needed
	console.log("Using API Key:", apiKey);


	try {
		const response = await fetch(
			`https://api.openai.com/v1/engines/${model}/completions`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					prompt: prompt,
					max_tokens: 100,
				}),
			}
		);

		if (!response.ok) {
			throw new Error(`Error from ChatGPT API: ${response.status}`);
		}

		const data = await response.json();
		return data.choices[0].text.trim();
	} catch (error) {
		console.error(`Error in queryChatGPT: ${error}`);
		throw error;
	}
}

export { queryChatGPT };
