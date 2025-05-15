import  { Router } from "express";
import {  postPracticeQuestionRequest } from "../controllers/practiceQuestion.controllers.js";
const router = Router();

// generate interview practice question
router.route("/generate-practice-question").post(postPracticeQuestionRequest);

export default router;
