import { chatCompletion } from "../controllers/chatCompletionController.js";
import { systemPrompt } from "../schema/systemPromptSchema.js";

export async function giftController(req, res) {
  try {
    const { userPrompt } = req.body;
    console.log(userPrompt);

    const response = await chatCompletion({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const output = response.choices[0].message.content;

    res.json({ message: `${output}` });
  } catch {
    const { userPrompt } = req.body;
    console.log(userPrompt);
    const response = await chatCompletion({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    console.log(response.choices[0].message.content);

    const output = response.choices[0].message.content;
    console.log(output);
    res.json({ message: `${output}` });
  }
}
