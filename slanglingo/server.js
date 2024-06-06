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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.post("/translate", async (req, res) => {
    const prompt = req.body.prompt;
    let message = [];
    if (!req.body.translate){
        message = [
        {
            role: "system",
            content: "Here are sentences in English that may contain slang terms.\nFind all slang terms if they exist, list each out on its own line followed by a dash and the definition for the slang, with a single header \"contains slangs:\".\nIf no slangs are found, output \"does not contain any slangs\""
        },
        {
            role: "user",
            content: prompt
        }
    ];
    }
    else {
        const systemPrompt = req.body.systemPrompt;
        console.log(systemPrompt);
        message = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: prompt
            }
        ];
    } 
    try {
        const completion = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-0125:personal::9UjRxitZ",
            messages: message,
            max_tokens: 512,
            temperature: 0
        });
        res.json({ response: completion.choices[0].message.content});
        console.log( completion.choices[0].message.content);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating response");
    }
});

const PORT = 8020;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});