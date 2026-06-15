import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";



// load env FIRST
dotenv.config();

// connect DB
connectDB();

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173",
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

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});