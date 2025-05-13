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

    // Generate question first
    const prompt = `You are conducting a ${interviewType} interview for a ${jobRole} role. Ask a question related to ${topic}.`;

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
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const question = questionCompletion.data.choices[0].message.content;

    // If the answer is provided, save it with feedback to the database
    if (answer) {
      const feedbackPrompt = `Please evaluate the following answer to the interview question: "${question}". Here's the user's answer: "${answer}". Provide feedback on the quality of the answer.`;

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
      // Attempt to extract the score from the feedback
      const scoreMatch = feedback.match(/(\d{1,3})/); // Match a number (0-100)
      let score = scoreMatch ? parseInt(scoreMatch[0], 10) : 0; // Default to 0 if no score is found

      // Save question, answer, and feedback to the database
      const interviewPromptRequest = new InterviewPromptRequest({
        userId: "123", // Replace with actual user ID
        topic,
        interviewType,
        jobRole,
        question,
        answer,
        feedback,
        score
      });

      

      await interviewPromptRequest.save();
      return res.status(200).json(interviewPromptRequest);
    } else {
      // If no answer is provided, just return the question
      res.status(200).json({ question });
    }
  } catch (error) {
    console.error("Interview start error:", error.message);
    res.status(500).json({ error: "Failed to generate interview question." });
  }
};


export { postInterViewPromptRequest };
