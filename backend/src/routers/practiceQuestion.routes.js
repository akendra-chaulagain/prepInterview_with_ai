import  { Router } from "express";
import {  getQuestionSession, postPracticeQuestionRequest, summitPracticeQuestionAnswer } from "../controllers/practiceQuestion.controllers.js";
const router = Router();

// generate interview practice question
router.route("/generate-practice-question").post(postPracticeQuestionRequest);
router.route("/answer").post(summitPracticeQuestionAnswer);
router.route("/:userId/:questionId").get(getQuestionSession);

export default router;
