import express from "express";
import { transferPoints, getUsers} from "../controllers/transfer-point";

const router = express.Router();
router.post("/transfer-points", transferPoints);
router.get("/get-users", getUsers);

export default router;
