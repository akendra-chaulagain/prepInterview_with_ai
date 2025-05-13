import mongoose from "mongoose";

const interviewPromptRequestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  topic: { type: String, required: true },
  interviewType: {
    type: String,
    enum: ["general", "behavioral", "technical"],
    default: "technical",
  },
  jobRole: { type: String, required: true },
  question: { type: String },
  answer: { type: String },
  feedback: { type: String },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
});
export const InterviewPromptRequest = mongoose.model(
  "InterviewPromptRequest",
  interviewPromptRequestSchema
);
