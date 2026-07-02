import express from "express";
import { getStocks, getStockBySymbol } from "../controllers/stockController.js";

const router = express.Router();

router.get("/", getStocks);
router.get("/:symbol", getStockBySymbol);

export default router;
