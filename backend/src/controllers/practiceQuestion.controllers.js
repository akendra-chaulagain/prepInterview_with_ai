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
    let prompt;
    if (interviewType === "general") {
      prompt = `Generate a single, open-ended general interview question for a ${jobRole} in the ${technology} industry. The question should assess the candidate’s ${difficulty}. Respond with only the question text — no introduction, formatting, or explanation.`;
    } else if (interviewType === "behavioral") {
      prompt = `Generate a single, open-ended ${difficulty} level behavioral interview question for a ${jobRole} with ${technology} of experience. The question should assess how the candidate has handled relevant situations in the past. Respond with only the question text — no introduction, formatting, or explanation.`;
    } else {
      prompt = `Generate a single, open-ended ${difficulty} level ${interviewType} interview question for a ${jobRole} working with ${technology}. Respond with only the question text — no introduction, formatting, or explanation.`;
    }

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
    });

    if (existingUser) {
      existingUser.questions.push({ question: generateQuestions });
      await existingUser.save();
      // lastest created question
      const latestQuestion =
        existingUser.questions[existingUser.questions.length - 1];

      return res.status(200).json({
        message: "Question added to existing practice session.",
        userId: existingUser.userId,
        question: generateQuestions,
        questionId: latestQuestion._id,
      });
    }
    // if the user start practice first time
    const newSession = await practiceQuestion.create({
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
      userId: newSession.userId,
      questionId: newSession.questions[0]._id,
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
    const { userId, answer, interviewType, level, role, questionId } = req.body;

    // Check if all required fields are provided
    if (
      !userId ||
      !answer ||
      !interviewType ||
      !level ||
      !role ||
      !questionId
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the user's interview model
    const interviewModel = await practiceQuestion.findOne({ userId });

    if (!interviewModel) {
      return res.status(404).json({ error: "Interview Model not found." });
    }

    // Check if the question has already been answered
    const alreadyAnswered = interviewModel.answers.some(
      (ans) => ans.questionId === questionId
    );

    if (alreadyAnswered) {
      return res
        .status(400)
        .json({ error: "You already answered this question." });
    }

    // get current question
    const currentQuestion = interviewModel.questions.find(
      (q) => String(q._id) === String(questionId)
    );

    if (!currentQuestion) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Generate feedback
    const { feedback, score } = await generateFeedback(currentQuestion, answer);

    // Save the answer
    interviewModel.answers.push({
      question: currentQuestion.question,
      answer,
      feedback,
      score,
      level,
      role,
      questionId,
    });

    await interviewModel.save();

    return res.status(200).json({
      message: "Answer submitted successfully.",
      feedback,
      score,
    });
  } catch (error) {
    console.error("Error in summitPracticeQuestionAnswer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getQuestionSession = async (req, res) => {
  try {
    const id = req.params.userId;
    const questionId = req.params.questionId;

    if (!id || !questionId) {
      return res
        .status(400)
        .json({ error: "User ID and Question ID are required." });
    }

    const interviewDoc = await practiceQuestion.findOne({ userId: id });

    if (!interviewDoc) {
      return res.status(404).json({ error: "Interview session not found." });
    }

    const questionObj = interviewDoc.questions;
    const findQuestion = questionObj.find(
      (q) => q._id.toString() === questionId
    );

    if (!findQuestion) {
      return res.status(404).json({ error: "Question not found." });
    }

    return res.status(200).json({
      question: findQuestion,
      interviewDoc,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve interview session." });
  }
};

// get user practice  question and answers
// const getUserPracticeQuestionsAndAnswers = async (req, res) => {
//   const userId = req.params.id;
//   const page = parseInt(req.query.page) || 1; 
//   const limit = parseInt(req.query.limit) || 10; 
//   try {
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const findUser = await practiceQuestion.findOne({ userId: userId });
    

//     if (!findUser) {
//       return res
//         .status(404)
//         .json({ error: "No practice questions found for this user" });
//     }
//     // pagination
//     const totalAnswers = findUser.answers.length;
//     const totalPages = Math.ceil(totalAnswers / limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const paginatedAnswers = findUser.answers.slice(startIndex, endIndex);
//     return res.status(200).json({
//       data: paginatedAnswers,
//       currentPage: page,
//       totalPages,
//       totalAnswers,
//       hasNextPage: page < totalPages,
//       hasPrevPage: page > 1,
//     });
//   } catch (error) {
//     console.error("Error retrieving practice questions:", error);
//     res.status(500).json({ error: "Failed to retrieve data." });
//   }
// };
const getUserPracticeQuestionsAndAnswers = async (req, res) => {
  const userId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Aggregation pipeline
    const pipeline = [
      { $match: { userId } },
      { $unwind: "$answers" },
      { $sort: { "answers.createdAt": -1 } }, // newest first
      {
        $facet: {
          paginatedAnswers: [
            { $skip: skip },
            { $limit: limit },
            { $replaceRoot: { newRoot: "$answers" } },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await practiceQuestion.aggregate(pipeline);

    const answers = result[0].paginatedAnswers;
    const totalAnswers = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalAnswers / limit);

    return res.status(200).json({
      data: answers,
      currentPage: page,
      totalPages,
      totalAnswers,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("Error retrieving sorted practice questions:", error);
    return res.status(500).json({ error: "Failed to retrieve data." });
  }
};


export {
  postPracticeQuestionRequest,
  summitPracticeQuestionAnswer,
  getQuestionSession,
  getUserPracticeQuestionsAndAnswers,
};
