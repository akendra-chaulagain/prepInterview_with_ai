import { InterviewPromptRequest } from "../models/InterviewPromptRequest.model.js";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const postInterViewPromptRequest = async (req, res) => {
  try {
    const { topic, interviewType, jobRole, answer } = req.body;
    if (!topic || !interviewType || !jobRole) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Generate multiple questions
    const prompt = `You are conducting a ${interviewType} interview for a ${jobRole} role. Ask 5-10 questions related to ${topic}.`;

    const questionCompletion = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the questions
    const questions =
      questionCompletion.data.choices[0].message.content.split("\n");

    if (answer) {
      // Handle the answers with feedback for each question
      const feedbackData = [];

      // Iterate through each question and answer
      for (let i = 0; i < questions.length; i++) {
        const feedbackPrompt = `Please evaluate the following answer to the interview question: "${questions[i]}". Here's the user's answer: "${answer}". Provide feedback on the quality of the answer.`;

        const feedbackCompletion = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama3-8b-8192",
            messages: [
              {
                role: "user",
                content: feedbackPrompt,
              },
            ],
            max_tokens: 100,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const feedback = feedbackCompletion.data.choices[0].message.content;
        const scoreMatch = feedback.match(/(\d{1,3})/); 
        const score = scoreMatch ? parseInt(scoreMatch[0], 10) : 0; 

        // Add feedback and score for this question
        feedbackData.push({ question: questions[i], answer, feedback, score });
      }

      // Save all questions, answers, feedback, and scores to the database
      const interviewPromptRequest = new InterviewPromptRequest({
        userId: "123", 
        topic,
        interviewType,
        jobRole,
        feedbackData, 
      });

      await interviewPromptRequest.save();
      return res.status(200).json({ feedbackData });
    } else {
      // If no answer is provided, return the questions
      res.status(200).json({ questions });
    }
  } catch (error) {
    console.error("Interview start error:", error.message);
    res.status(500).json({ error: "Failed to generate interview question." });
  }
};


export { postInterViewPromptRequest };
