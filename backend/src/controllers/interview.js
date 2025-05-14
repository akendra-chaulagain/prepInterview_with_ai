import { InterviewPromptRequest } from "../models/InterviewPromptRequest.model.js";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const headers = {
  Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  "Content-Type": "application/json",
};

// generate interview questions
const generateInterviewQuestions = async (
  topic,
  interviewType,
  jobRole,
  difficulty
) => {
  try {
    // Validate input
    if (!topic || !interviewType || !jobRole || !difficulty) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Generate multiple questions
    const prompt = `You are conducting a ${interviewType} interview for a ${jobRole} role. 
Ask 5-10 ${difficulty}  questions related to ${topic}.`;

    const response = await axios.post(
      GROQ_API_URL,
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
        headers,
      }
    );
    // Extract the questions

    const questions = response.data.choices[0].message.content
      .split("\n")
      .filter((q) => q.trim().length > 5);
    return questions;
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw error;
  }
};

// get feedback from Ai
const generateFeedback = async (question, answer) => {
  try {
    const prompt = `Please evaluate the following answer to the interview question: "${question}". 
    User's answer: "${answer}". 
    Provide constructive feedback and a score out of 10.`;

    const response = await axios.post(
      GROQ_API_URL,
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
        headers,
      }
    );

    const feedback = response.data.choices[0].message.content.trim();
    const scoreMatch = feedback.match(/(\d{1,3})/);
    const score = scoreMatch ? parseInt(scoreMatch[0], 10) : 0;
    return { feedback, score };
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw error;
  }
};

// post interview prompt request
const postInterviewPromptRequest = async (req, res) => {
  try {
    const {
      topic,
      interviewType,
      jobRole,
      answers = [],
      difficulty,
    } = req.body;

    if (!topic || !interviewType || !jobRole || !difficulty) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // default for now
    const userId = "123";

    const questions = await generateInterviewQuestions(
      topic,
      interviewType,
      jobRole,
      difficulty
    );

    // check if questions are generated
    if (!questions || questions.length === 0) {
      return res
        .status(500)
        .json({ error: "Failed to generate interview questions." });
    }

    // check if answers are provided
    if (answers.length > 0) {
      // check weather answer are provided for each question
      if (answers.length !== questions.length) {
        return res
          .status(400)
          .json({ error: "Number of answers must match number of questions." });
      }
      // Handle the answers with feedback for each question
      const feedbackData = [];
      for (let i = 0; i < questions.length; i++) {
        const { feedback, score } = await generateFeedback(
          questions[i],
          answers[i]
        );
        feedbackData.push({
          question: questions[i],
          answer: answers[i],
          feedback,
          score,
        });
      }
      // overall score of the questions
      const overallScore = feedbackData
        .reduce((acc, curr) => acc + curr.score, 0)
        .toFixed(1);
      const interviewDoc = new InterviewPromptRequest({
        userId,
        topic,
        interviewType,
        jobRole,
        feedbackData,
        overallScore,
      });
      await interviewDoc.save();
      return res.status(200).json({ feedbackData, overallScore });
    } else {
      return res.status(200).json({
        message: "Interview questions generated successfully.",
        questions,
      });
    }
  } catch (error) {
    console.error("Error posting interview prompt request:", error);
    res.status(500).json({ error: "Failed to post interview prompt request." });
  }
};

export { postInterviewPromptRequest };
