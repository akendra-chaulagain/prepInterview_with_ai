import { Router } from "express";
import { postInterviewPromptRequest, submitInterviewAnswer } from "../controllers/mockInterview.controllers.js";
const router = Router()

router.route("/start").post(
  // // verify token
  // verifyJwt,
  // // access control
  // authorize("User", "Admin"),
  postInterviewPromptRequest
);
  
router.route("/answer").post(
  // // verify token
  // verifyJwt,
  // // access control
  // authorize("User", "Admin"),
  submitInterviewAnswer
);

export default router;