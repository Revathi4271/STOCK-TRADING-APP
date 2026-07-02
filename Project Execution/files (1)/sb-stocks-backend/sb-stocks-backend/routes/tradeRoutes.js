import express from "express";
import { buyStock, sellStock, getTradeHistory } from "../controllers/tradeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/buy", protect, buyStock);
router.post("/sell", protect, sellStock);
router.get("/history", protect, getTradeHistory);

export default router;
