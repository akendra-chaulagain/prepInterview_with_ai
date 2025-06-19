import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

import cors from "cors";

// database connection
import connectDb from "./database/DB.js";
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running at port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://interview-copilot-eight.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins,

    credentials: true,
  })
);
import practiceQuestionRoutes from "../src/routers/practiceQuestion.routes.js";
import interviewRoutes from "../src/routers/interview.routes.js";
import searchMockInterview from "../src/routers/search.routes.js";

app.use("/api/v1/interview", interviewRoutes);
app.use("/api/v1/practice-question", practiceQuestionRoutes);
app.use("/api/v1/search", searchMockInterview);
