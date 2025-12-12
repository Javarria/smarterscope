import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5-nano",
    input: "Write a two-sentence bedtime story about a hispanic who drives a boat."
});

console.log(response.output_text);

//console.log(process.env.OPENAI_API_KEY);