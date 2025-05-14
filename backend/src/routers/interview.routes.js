import { Router } from "express";
const router = Router()
import {  postInterviewPromptRequest } from "../controllers/interview.js";

router.route("/start").post(
  // // verify token
  // verifyJwt,
  // // access control
  // authorize("User", "Admin"),
  postInterviewPromptRequest
);
  

export default router;