import { Router } from "express";

import { searchMockInterview } from "../controllers/searchData.controllers.js";
const router = Router();

router.route("/search-mock-interview").get(searchMockInterview);

export default router;
