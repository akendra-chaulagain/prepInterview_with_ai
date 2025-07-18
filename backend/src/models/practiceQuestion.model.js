import mongoose from "mongoose";

const AnswerFeedbackSchema = new mongoose.Schema(
  {
    interviewType: {
      type: String,
      enum: ["general", "behavioral", "technical"],
      required: true,
    },
    question: String,
    answer: String,
    feedback: String,
    score: Number,
    role: String,
    level: String,
    // interviewType: String,
    questionId: String,
  },

  { timestamps: true }
);

const practiceQuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    technology: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    difficulty: {
      type: String,
      enum: [
        "easy",
        "medium",
        "hard",
        "junior",
        "mid",
        "senior",
        "culture",
        "motivation",
        "comprehensive",
        "entry",
        "experienced",
        "leadership",
      ],
      default: "medium",
    },
    jobRole: { type: String, required: true },
    // question: [String],
    questions: [
      {
        question: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    answers: [AnswerFeedbackSchema],
    currentIndex: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    overallScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const practiceQuestion = mongoose.model(
  "PracticeQuestion",
  practiceQuestionSchema
);
