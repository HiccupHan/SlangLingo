require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const Configuration= require("openai");
const OpenAIApi = require("openai");

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    const { prompt } = req.body;
    try {
        const completion = await openai.createCompletion({
            model: "ft:gpt-3.5-turbo-0125:personal::9UjRxitZ",
            max_tokens: 512,
            temperature: 0,
            prompt: prompt,
        });
        res.send(completion.data.choices[0].text);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating response");
    }
});

const PORT = 8020;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});