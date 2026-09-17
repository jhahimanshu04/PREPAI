# 🎯 PrepAI — AI-Powered Interview Preparation Platform

A full-stack web app that turns your resume and a target job description into a personalized interview report — AI-generated technical & behavioral questions, a skill-gap analysis, and a day-by-day preparation roadmap. It can also generate a tailored, ATS-friendly resume as a downloadable PDF.

---

## ✨ Features

- 🔐 **Authentication** — Signup/Login with JWT (httpOnly cookie + Bearer token), passwords hashed with bcrypt
- 📄 **Resume parsing** — Upload a PDF resume; text is extracted server-side with `pdf-parse`
- 🤖 **AI interview report** — Google Gemini generates:
  - A match score between your profile and the job description
  - Technical questions (with interviewer intention + model answer)
  - Behavioral questions (with interviewer intention + model answer)
  - Skill gaps with severity ratings
  - A day-by-day preparation roadmap
- 🧾 **AI resume builder** — Generates ATS-friendly resume HTML with Gemini, rendered to a downloadable PDF via Puppeteer
- 📚 **Report history** — All past interview reports are saved per user and can be revisited any time
- 🧭 **Protected routes** — Authenticated-only access to reports and the dashboard

---

## 🛠️ Tech Stack

**Frontend**
- React 19 (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Context API (auth & interview state)

**Backend**
- Node.js + Express 5
- PostgreSQL with Sequelize ORM
- Google Generative AI SDK (Gemini)
- Puppeteer (HTML → PDF rendering)
- Multer (in-memory file uploads)
- pdf-parse (resume text extraction)
- JSON Web Token (JWT) authentication
- bcrypt (password hashing)
- Zod / zod-to-json-schema *(installed for AI response validation)*

---

## 📁 Project Structure

```
AI PROJECT/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # Sequelize + PostgreSQL connection
│   │   ├── controllers/
│   │   │   ├── authController.js        # register / login / logout / me
│   │   │   └── interviewController.js   # generate report, fetch reports, resume PDF
│   │   ├── middleware/
│   │   │   ├── secureRoute.js           # JWT auth guard
│   │   │   └── secureFile.js            # Multer upload config (3MB limit)
│   │   ├── model/
│   │   │   ├── usermodel.js
│   │   │   └── interviewReport.js
│   │   ├── routes/
│   │   │   ├── user.route.js
│   │   │   └── interview.routes.js
│   │   └── Services/
│   │       └── aiservices.js            # Gemini prompts + Puppeteer PDF generation
│   └── index.js                          # app entry point
│
└── Frontend/
    └── src/
        ├── Auth/
        │   ├── pages/                    # Login, Register
        │   ├── components/Protected.jsx  # route guard
        │   ├── services/authApi.js
        │   └── authContext.jsx
        ├── interview/
        │   ├── pages/                    # Home, Interview (report view)
        │   ├── hooks/useInterview.js
        │   ├── services/interviewapi.js
        │   └── InterviewContext.jsx
        └── approutes.jsx                 # route definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A PostgreSQL database
- A [Google AI Studio](https://aistudio.google.com/) API key (for Gemini)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "AI PROJECT"
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:
```env
PORT=3002
DB_USER=your_postgres_user
DB_HOST=your_postgres_host
DB_DATABASE=your_database_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm run dev
```
The API runs at `http://localhost:3002`.

### 3. Frontend setup
```bash
cd Frontend
npm install
```

Create a `.env` file inside `Frontend/`:
```env
VITE_API_URL=http://localhost:3002
```

Start the frontend:
```bash
npm run dev
```
The app runs at `http://localhost:3000` (Vite dev server, proxies `/api` to the backend).

---

## 🔑 Environment Variables

**Backend**

| Variable | Description |
|---|---|
| `PORT` | Port the backend server runs on |
| `DB_USER` | PostgreSQL username |
| `DB_HOST` | PostgreSQL host |
| `DB_DATABASE` | PostgreSQL database name |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_PORT` | PostgreSQL port (usually `5432`) |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `GOOGLE_GENAI_API_KEY` | API key for Google's Gemini (Generative AI) |

**Frontend**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

---

## 📡 API Reference

### Auth Routes — `/api/auth`
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Log in and receive a JWT | ❌ |
| POST | `/logout` | Clear auth cookie | ❌ |
| GET | `/me` | Get the logged-in user's profile | ✅ |

### Interview Routes — `/api/interview`
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/` | Upload resume + JD + self-description, generate an AI interview report | ✅ |
| GET | `/` | List all interview reports for the logged-in user | ✅ |
| GET | `/report/:interviewId` | Get a single interview report by ID | ✅ |
| POST | `/resume/pdf/:interviewReportId` | Generate and download an AI-written resume PDF | ✅ |

---

## 🗺️ Roadmap / Known Limitations

- [ ] Re-enable Zod schema validation on the AI's JSON response (currently commented out)
- [ ] Add retry/timeout handling around the Gemini API call
- [ ] Detect and gracefully handle scanned/image-based (non-text) resume PDFs
- [ ] Move interview report & PDF generation into a background job queue for scale
- [ ] Add refresh tokens so sessions can be revoked before the JWT naturally expires
- [ ] Add automated tests (unit + integration)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
