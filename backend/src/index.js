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
app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    // exposedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies
  })
);
import practiceQuestionRoutes from "../src/routers/practiceQuestion.routes.js";
import interviewRoutes from "../src/routers/interview.routes.js";
import searchMockInterview  from "../src/routers/search.routes.js";

app.use("/api/v1/interview", interviewRoutes);
app.use("/api/v1/practice-question", practiceQuestionRoutes);
app.use("/api/v1/search", searchMockInterview);
