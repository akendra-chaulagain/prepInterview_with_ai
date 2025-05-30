import { Router } from "express";
import {
  getQuestionSession,
  getUserPracticeQuestionsAndAnswers,
  postPracticeQuestionRequest,
  summitPracticeQuestionAnswer,
} from "../controllers/practiceQuestion.controllers.js";
const router = Router();

// generate interview practice question
router.route("/generate-practice-question").post(postPracticeQuestionRequest);
router.route("/answer").post(summitPracticeQuestionAnswer);
router.route("/:userId/:questionId").get(getQuestionSession);
router.route("/:id").get(getUserPracticeQuestionsAndAnswers);

export default router;
