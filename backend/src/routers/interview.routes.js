import { Router } from "express";
import {
  getInterviewSession,
  getInterviewSessionAccordingToUser,
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
router.route("/sessions/:userId").get(getInterviewSessionAccordingToUser);

export default router;




