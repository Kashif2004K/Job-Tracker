import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

// load env FIRST
dotenv.config();

const app = express();

// Ensure DB is connected before handling API requests (required for Vercel serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    let hint = "Check MongoDB Atlas Network Access allows 0.0.0.0/0.";
    if (!process.env.MONGO_URI) {
      hint = "Add MONGO_URI in your Vercel server project Environment Variables.";
    } else if (error.message.includes("authentication failed")) {
      hint = "MongoDB username or password in MONGO_URI is incorrect.";
    }

    res.status(500).json({ message: "Database connection failed", hint });
  }
});

// middleware
app.use(cors({
  // Allows your local dev environment AND your future deployed frontend to access the API
  origin: [
    "http://localhost:5173",
    "https://job-tracker-npz7.vercel.app",
    /\.vercel\.app$/ // Matches any Vercel deployment preview/production URL
  ],
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// --- REMOVED APP.LISTEN FOR VERCEL ---
// Only run app.listen if running locally, otherwise export for Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// CRITICAL: Vercel needs you to export the app instance
export default app;