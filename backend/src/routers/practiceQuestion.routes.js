import  { Router } from "express";
import {  postPracticeQuestionRequest, summitPracticeAnswer } from "../controllers/practiceQuestion.controllers.js";
const router = Router();

// generate interview practice question
router.route("/generate-practice-question").post(postPracticeQuestionRequest);
router.route("/answer").post(summitPracticeAnswer);

export default router;
