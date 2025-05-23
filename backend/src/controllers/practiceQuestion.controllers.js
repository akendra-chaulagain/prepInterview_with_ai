import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { practiceQuestion } from "../models/practiceQuestion.model.js";
import { generateFeedback } from "../utils/feedback.js";

const headers = {
  Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  "Content-Type": "application/json",
};

// generate practice question
const generatePracticeQuestion = async (
  technology,
  jobRole,
  difficulty,
  interviewType
) => {
  try {
    if (!technology || !jobRole || !difficulty || !interviewType) {
      throw new Error("All fields are required.");
    }

    const prompt = `Generate a single, open-ended ${difficulty} level ${interviewType} interview question for a ${jobRole} working with ${technology}. Respond with only the question text — no introduction, formatting, or explanation.`;

    const response = await axios.post(
      process.env.GROQ_API_URL,
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      },
      { headers }
    );

    const question = response.data.choices?.[0]?.message?.content?.trim();

    if (!question) {
      throw new Error("Failed to generate practice question.");
    }

    return question;
  } catch (error) {
    console.error("Error generating practice question:", error);
    throw new Error("Internal server error");
  }
};

// post practice question request
const postPracticeQuestionRequest = async (req, res) => {
  try {
    const { technology, jobRole, difficulty, interviewType, userId } = req.body;

    // Check if all required fields are provided
    if (!technology || !jobRole || !difficulty || !interviewType || !userId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const generateQuestions = await generatePracticeQuestion(
      technology,
      jobRole,
      difficulty,
      interviewType
    );

    // check if the user already started the interview
    const existingUser = await practiceQuestion.findOne({
      userId: userId,
      interviewType,
    });

    if (existingUser) {
      existingUser.questions.push({ question: generateQuestions });
      await existingUser.save();

      return res.status(200).json({
        message: "Question added to existing practice session.",
        userId: existingUser.userId,
        question:generateQuestions,
      });
    }
    const response = await practiceQuestion.create({
      userId,
      technology,
      jobRole,
      difficulty,
      interviewType,
      questions: [{ question: generateQuestions }],
      answers: [],

      completed: false,
    });

    return res.status(200).json({
      message: "New practice session created.",
      userId: response.userId,
      // questions,

      question: generateQuestions,
    });
  } catch (error) {
    console.error("Error in postPracticeQuestionRequest:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// post practice question answer
const summitPracticeQuestionAnswer = async (req, res) => {
  try {
    const { userId, answer, interviewType, level, role } = req.body;

    // Check if all required fields are provided
    if (!userId || !answer || !interviewType || !level || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the user by userId
    const interviewModel = await practiceQuestion.findOne({
      userId,
      interviewType,
    });
    if (!interviewModel) {
      return res.status(404).json({ error: "Interview Model not found." });
    }

    // Check if the user has already answered the question
    const currentQuestion =
      interviewModel.questions[interviewModel.questions.length - 1];

    const { feedback, score } = await generateFeedback(currentQuestion, answer);
    interviewModel.answers.push({
      question: currentQuestion.question,
      answer,
      feedback,
      score,
      level,
      role,
    });
    interviewModel.completed = true;
    await interviewModel.save();
    return res.status(200).json({
      message: "Answer submitted successfully.",
      answers: interviewModel.answers,
    });
  } catch (error) {
    console.error("Error in submitPracticeAnswer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { postPracticeQuestionRequest, summitPracticeQuestionAnswer };
