import { Router } from "express";
import {
  getInterviewSession,
  postInterviewPromptRequest,
  submitInterviewAnswer,
} from "../controllers/mockInterview.controllers.js";
const router = Router();

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
router.route("/:id").get(getInterviewSession);

export default router;
