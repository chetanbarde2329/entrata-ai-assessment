export const explainCodeAPI = async (code) => {
  const API_KEY = "81HlhJf87kfBKZDgnu1ieZgJ4GFF2vco";
  const prompt = `
Explain the following code in plain English in 2-4 sentences.
Highlight main logic and functions.

Code:
${code}
`;

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify({
      model: "mistral-small",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await res.json();

  return data.choices[0].message.content;
};
