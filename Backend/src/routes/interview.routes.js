import express from "express";
import secureRoute from "../middleware/secureRoute.js";
import secureFile from "../middleware/secureFile.js";
import { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController } from "../controllers/interviewController.js";

const interviewRouter = express.Router();

interviewRouter.post("/", secureRoute, secureFile.single("resume"), generateInterViewReportController);
interviewRouter.get("/report/:interviewId", secureRoute, getInterviewReportByIdController);
interviewRouter.get("/", secureRoute, getAllInterviewReportsController);
interviewRouter.post("/resume/pdf/:interviewReportId", secureRoute, generateResumePdfController);

export default interviewRouter;