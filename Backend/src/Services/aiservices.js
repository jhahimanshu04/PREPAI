// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";
// import puppeteer from "puppeteer";

// const ai = new GoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_GENAI_API_KEY,
// });

// const interviewReportSchema = z.object({
//   matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
//   technicalQuestions: z.array(z.object({
//     question: z.string().describe("The technical question can be asked in the interview"),
//     intention: z.string().describe("The intention of interviewer behind asking this question"),
//     answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."),
//   })),
//   behavioralQuestions: z.array(z.object({
//     question: z.string().describe("The behavioral question can be asked in the interview"),
//     intention: z.string().describe("The intention of interviewer behind asking this question"),
//     answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc."),
//   })),
//   skillGaps: z.array(z.object({
//     skill: z.string().describe("The skill which the candidate is lacking"),
//     severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap"),
//   })),
//   preparationPlan: z.array(z.object({
//     day: z.number().describe("The day number in the preparation plan, starting from 1"),
//     focus: z.string().describe("The main focus of this day"),
//     tasks: z.array(z.string()).describe("List of tasks to be done on this day"),
//   })),
//   title: z.string().describe("The title of the job for which the interview report is generated"),
// });

// const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
//   const prompt = `Generate an interview report for a candidate with the following details:
//     Resume: ${resume}
//     Self Description: ${selfDescription}
//     Job Description: ${jobDescription}`;

//   const response = await ai.models.generateContent({
//     model: "gemini-1.5-flash",
//     contents: prompt,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: zodToJsonSchema(interviewReportSchema),
//     },
//   });
//   console.log("Gemini raw response:", response.text);
//   return JSON.parse(response.text);
// };

// const generatePdfFromHtml = async (htmlContent) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(htmlContent, { waitUntil: "networkidle0" });

//   const pdfBuffer = await page.pdf({
//     format: "A4",
//     margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
//   });

//   await browser.close();
//   return pdfBuffer;
// };

// const generateResumePdf = async ({ resume, selfDescription, jobDescription }) => {
//   const resumePdfSchema = z.object({
//     html: z.string().describe("The HTML content of the resume"),
//   });

//   const prompt = `Generate resume for a candidate with the following details:
//     Resume: ${resume}
//     Self Description: ${selfDescription}
//     Job Description: ${jobDescription}

//     The response should be a JSON object with a single field "html" containing the HTML content of the resume.
//     The resume should be tailored for the given job description, ATS friendly, professional, and ideally 1-2 pages long.`;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: prompt,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: zodToJsonSchema(resumePdfSchema),
//     },
//   });

//   const { html } = JSON.parse(response.text);
//   return await generatePdfFromHtml(html);
// };

// export { generateInterviewReport, generateResumePdf };



import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from "puppeteer";

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
  const model = ai.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `Generate an interview report for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
    
    Respond ONLY with a valid JSON object with these exact fields:
    {
      "matchScore": number between 0-100,
      "title": "job title string",
      "technicalQuestions": [{"question": "", "intention": "", "answer": ""}],
      "behavioralQuestions": [{"question": "", "intention": "", "answer": ""}],
      "skillGaps": [{"skill": "", "severity": "low or medium or high"}],
      "preparationPlan": [{"day": 1, "focus": "", "tasks": [""]}]
    }
    No extra text, no markdown, just pure JSON.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log("Gemini raw response:", text);

  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

const generatePdfFromHtml = async (htmlContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
  });

  await browser.close();
  return pdfBuffer;
};

const generateResumePdf = async ({ resume, selfDescription, jobDescription }) => {
  const model = ai.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `Generate a resume for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}

    Respond ONLY with a valid JSON object:
    { "html": "full HTML content of resume" }
    The resume should be ATS friendly, professional, and 1-2 pages long.
    No extra text, no markdown, just pure JSON.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const clean = text.replace(/```json|```/g, "").trim();
  const { html } = JSON.parse(clean);

  return await generatePdfFromHtml(html);
};

export { generateInterviewReport, generateResumePdf };