import  { Router } from "express";
import {  postPracticeQuestionRequest, summitPracticeQuestionAnswer } from "../controllers/practiceQuestion.controllers.js";
const router = Router();

// generate interview practice question
router.route("/generate-practice-question").post(postPracticeQuestionRequest);
router.route("/answer").post(summitPracticeQuestionAnswer);

export default router;
