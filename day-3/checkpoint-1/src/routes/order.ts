import express from "express";
import { getOrdersSummary} from "../controllers/order";

const router = express.Router();
router.get("/orders/summary", getOrdersSummary);

export default router;
