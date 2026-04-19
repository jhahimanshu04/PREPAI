import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/user.route.js";
import interviewRoutes from "./src/routes/interview.routes.js";
import sequelize from "./src/config/db.js";
import User from "./src/model/usermodel.js";
import cookieParser from "cookie-parser"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["https://frontend-prepai.onrender.com", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders:["set-cookie"],
  })
);
app.use("/api/auth", userRoutes);
app.use("/api/interview", interviewRoutes);

const port = process.env.PORT || 3002;

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.json({ success: true, message: "PostgreSQL connected via Sequelize" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

sequelize.sync({ force:false , alter: true })
  .then(() => {
    console.log("Tables synced");
    app.listen(port, () => {
      console.log(`Server running http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));