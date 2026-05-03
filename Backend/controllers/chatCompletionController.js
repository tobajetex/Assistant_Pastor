import { handleAPIError } from "../error/errorHandler.js";
import { safeFetch } from "../wrapper/safeFetch.js";
import dotenv from "dotenv";
dotenv.config();

export async function chatCompletion({
  messages,
  temperature = 0.7,
  max_tokens = 512,
}) {
  try {
    const data = await safeFetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // REQUIRED by OpenRouter sometimes
          "X-Title": "Asistant Pastor",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // ✅ free model
          messages,
          temperature,
          max_tokens,
        }),
      },
    );

    return data;
  } catch (error) {
    console.error("ORIGINAL ERROR:", error);
    throw handleAPIError(error);
  }
}
