import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { MockInterview } from "../models/mockInterview.model.js";
import { generateFeedback } from "../utils/feedback.js";

const headers = {
  Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  "Content-Type": "application/json",
};

// generate interview questions
const generateInterviewQuestions = async (


  
  technology,
  interviewType,
  jobRole,
  difficulty
) => {
  try {
    if (!technology || !interviewType || !jobRole || !difficulty) {
      throw new Error("All fields are required.");
    }

    const prompt = `You are an expert interviewer conducting a mock interview for a ${jobRole} role.

    Please generate exactly 30 interview questions in the following strict format:
    
    1–10: Behavioral Questions  
    11–20: Technical Questions (related to ${technology})  
    21–30: Problem-Solving or Coding Questions (related to ${technology})
    
    Strict Instructions:
    - Return exactly 30 questions
    - Each question must be numbered from 1 to 30
    - Do not include headings, explanations, or extra text
    - Each line must start with a number followed by a dot and a space (e.g., "1. What is...")
    
    Start listing the questions now:
    `;

    const response = await axios.post(
      process.env.GROQ_API_URL,
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 700,
      },
      { headers }
    );

    const rawText = response.data.choices[0].message.content;

    const questionLines = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^\d+\.\s/.test(line));

    const questions = questionLines.map((line) => {
      return line.replace(/^\d+\.\s*/, "").trim();
    });

    return questions;
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw error;
  }
};

// post interview prompt request
const postInterviewPromptRequest = async (req, res) => {
  try {
    const { technology, interviewType, jobRole, difficulty,userId } = req.body;

    if (!technology || !interviewType || !jobRole || !difficulty) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // default for now
  

    const questions = await generateInterviewQuestions(
      technology,
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

    const interviewDoc = new MockInterview({
      userId,
      technology,
      interviewType,
      jobRole,
      difficulty,
      question: questions,
    });
    await interviewDoc.save();
    return res.status(200).json({
      message: "Interview session started.",
      sessionId: interviewDoc._id,
      question: questions[0],
      index: 0,
    });
  } catch (error) {
    console.error("Error posting interview prompt request:", error);
    res.status(500).json({ error: "Failed to post interview prompt request." });
  }
};

// post interview answer
const submitInterviewAnswer = async (req, res) => {
  try {
    const { sessionId, answer } = req.body;

    if (!sessionId || !answer) {
      return res
        .status(400)
        .json({ error: "Session ID and answer are required." });
    }

    const interviewDoc = await MockInterview.findById(sessionId);
    if (!interviewDoc) {
      return res.status(404).json({ error: "Interview session not found." });
    }

    const currentQuestion = interviewDoc.question[interviewDoc.currentIndex];
    // import feedback function
    // check if the answer is empty
    if (!answer || answer.trim() === "") {
      return res.status(400).json({ error: "Answer cannot be empty." });
    }
    const { feedback, score } = await generateFeedback(currentQuestion, answer);

    interviewDoc.answers.push({
      question: currentQuestion,
      answer,
      feedback,
      score,
    });

    interviewDoc.currentIndex += 1;
    interviewDoc.overallScore += score;
    if (interviewDoc.currentIndex >= interviewDoc.question.length) {
      interviewDoc.completed = true;
    }
    await interviewDoc.save();

    return res.status(200).json({
      message: "Answer submitted successfully.",
      feedback,
      score,
      nextQuestion: interviewDoc.completed
        ? null
        : interviewDoc.question[interviewDoc.currentIndex],
      completed: interviewDoc.completed,
    });
  } catch (error) {
    console.error("Error submitting interview answer:", error);
    res.status(500).json({ error: "Failed to submit interview answer." });
  }
};

// get interview session
const getInterviewSession = async (req, res) => {
  try {
  
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Session ID is required." });
    }

    const interviewDoc = await MockInterview.findById(id);
    if (!interviewDoc) {
      return res.status(404).json({ error: "Interview session not found." });
    }

    return res.status(200).json({
      message: "Interview session retrieved successfully.",
     interviewDoc,
    });
  } catch (error) {
    console.error("Error retrieving interview session:", error);
    res.status(500).json({ error: "Failed to retrieve interview session." });
  }
};

export {
  postInterviewPromptRequest,
  submitInterviewAnswer,
  getInterviewSession,
};
