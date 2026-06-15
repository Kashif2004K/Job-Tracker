import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

// load env FIRST
dotenv.config();

// connect DB
connectDB();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});