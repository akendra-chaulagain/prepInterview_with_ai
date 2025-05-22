import mongoose from "mongoose";

const AnswerFeedbackSchema = new mongoose.Schema({
  question: String,
  answer: String,
  feedback: String,
  score: Number,
});

const mockInterviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  technology: { type: String, required: true },
  // feedbackData: [FeedbackSchema],
  interviewType: {
    type: String,
    enum: ["general", "behavioral", "technical"],
    default: "technical",
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard", "junior", "mid", "senior"],
    default: "medium",
  },
  jobRole: { type: String, required: true },
  question: [String],
  answers: [AnswerFeedbackSchema],
  currentIndex: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  overallScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export const MockInterview = mongoose.model(
  "MockInterview",
  mockInterviewSchema
);
