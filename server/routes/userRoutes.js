import express from "express";
import protect from "../middleware/authMiddleware.js";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;