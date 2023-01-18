import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: generatePrompt(req.body.promptInput),
    temperature: 0.2,
    max_tokens: 1024,
    stop: "#",
  });
  res.status(200).json({ result: completion.data.choices[0].text });
  // res.status(200).json({ result: completion.data.choices });
  console.log("TEST", completion.data);
}

function generatePrompt(promptInput) {
//   return `Suggest three names for an animal that is a superhero.
// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${promptInput}
// Names:`;
  return `${promptInput}`;
}