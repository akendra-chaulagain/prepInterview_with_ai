import { Router } from "express";
const router = Router()
import { postInterViewPromptRequest } from "../controllers/interview.js";

router.route("/start").post(
  
  // // verify token
  // verifyJwt,
  // // access control
  // authorize("User", "Admin"),
  postInterViewPromptRequest
);
  

export default router;