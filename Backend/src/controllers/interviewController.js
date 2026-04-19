import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule;
import { generateInterviewReport, generateResumePdf } from "../Services/aiservices.js";
import InterviewReport from "../model/interviewReport.js";

const generateInterViewReportController = async (req, res) => {
  try {
     console.log("req.body:", req.body);      
    console.log("req.file:", req.file); 
    const resumeData = await pdfParse(req.file.buffer);
    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
      resume: resumeData.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await InterviewReport.create({
      userId: req.user.id,
      resume: resumeData.text,
      selfDescription,
      jobDescription,
      ...interViewReportByAi,
    });
     console.log("AI Response:", interViewReportByAi);

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInterviewReportByIdController = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interviewReport = await InterviewReport.findOne({
      where: { id: interviewId, userId: req.user.id },
    });

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found." });
    }

    res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReport,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllInterviewReportsController = async (req, res) => {
  try {
    const interviewReports = await InterviewReport.findAll({
      where: { userId: req.user.id },
      attributes: { exclude: ["resume", "selfDescription", "jobDescription", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"] },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Interview reports fetched successfully.",
      interviewReports,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateResumePdfController = async (req, res) => {
  try {
    const { interviewReportId } = req.params;

    const interviewReport = await InterviewReport.findByPk(interviewReportId);

    if (!interviewReport) {
      return res.status(404).json({ message: "Interview report not found." });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;
    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController };