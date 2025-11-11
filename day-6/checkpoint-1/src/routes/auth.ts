import express from "express";
import { handleRegister, handleLogin } from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { upload } from "../utils/multer";
import limiter from "../middlewares/rate-limiter";

const router = express.Router();

router.post("/register", upload.single("profile"), handleRegister);
router.post("/login", handleLogin);

router.get("/me", limiter, authenticate, (req, res) => {
  res.json({ message: "Protected route" });
});

export default router;
