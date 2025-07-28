const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post("/ask", async (req, res) => {
  const message = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You're a suspicious NPC interrogating someone in a horror basement. Be creepy and short." },
        { role: "user", content: message }
      ]
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).send("AI failed.");
  }
});

app.get("/", (_, res) => {
  res.send("AI Server is running.");
});

app.listen(3000, () => console.log("Server running on port 3000"));
