import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OpenAi, // defaults to process.env["OPENAI_API_KEY"]
// });

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.4,
  topP: 1,
  topK: 32,
  maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  geminiConfig,
});

// async function main(prompt) {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "gpt-3.5-turbo",
//   });
//   console.log(completion.choices);
//   return completion.choices[0].message.content;
// }

//main
// async function main(prompt) {
//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: prompt }],
//       model: "gpt-3.5-turbo",
//     });
//     return completion;
//   } catch (error) {
//     if (error.response?.status === 429) {
//       console.log("Rate limit exceeded. Retrying after delay...");
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
//       return getChatCompletion(prompt); // Retry the request
//     } else {
//       console.error("Error:", error);
//       throw error; // Handle other errors
//     }
//   }
// }

async function main(prompt){
  try {
    // console.log(prompt);
    
    const result = await geminiModel.generateContent(prompt);
    const response = result.response.candidates[0].content.parts[0].text;
    // console.log("generated resp ",response);    

    return response;
  } catch (error) {
    console.log("response error", error);
    throw error;
  }
}

// main();l
export const handlerequest = async (req, res) => {
  // console.log(req.body);
  try {
    // const prompt = `client wants to develop a ${req.body.projectname} with ${req.body.apps} please generate a technical doumentation for developers to understand.The documentation should include following points :- 1. Introduction 2. System Architecture 3. System requirements 4. User Authentication. 5. User Interface 6. Testing 7. Deployment 8. Maintenance and support .Explain each of the points with minimum 10 bullet points .Give your response in html format.`;
    // const prompt = `client want to develop a  ${req.body.projectname} with ${req.body.apps} please generate a technnical documentation to explain the project to developers,Include suggested tech stack and sdk needed. Phase wise target,500 words please.`;

    const prompt = `${req.body.projectname} is my project name, create a project documention for my developer team to explain them our project management CRM, ${req.body.apps} based application, functional requirement documentation with development phases, team allocation and all mandatory information please, only give the generated value, don't add the last para that you add after every response, only keep the genrated data`
    // const prompt = `client want to develop a ${req.body.projectname}`;
    // console.log(prompt);
    const msg = await main(prompt);
    // console.log("prompted message ",msg);
    const filter = `${msg} convert this into html format`;
    const final = await main(filter);
    console.log("final resp",final);
    console.log("sending");
    return res.status(200).json(final);
  } catch (err) {
    console.log(err);
  }
};

// A client wants to develop apps and he chooses apps that he wants to develop and number of developers he wants to develop those apps. Generate a well organized documentation for developers to understand client requirement using the client preference given: client apps=${apps} number of senior developers=${srdev}  number of junior developers=${jrdev}  number of ui ux designers=${UiUx}`;
