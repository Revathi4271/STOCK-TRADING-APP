import mongoose from "mongoose";
import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

// @route  POST /api/trade/buy
// body: { symbol, quantity }
export const buyStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "symbol and a positive quantity are required" });
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const totalCost = stock.currentPrice * quantity;
    const user = await User.findById(req.user._id);

    if (user.virtualBalance < totalCost) {
      return res.status(400).json({ message: "Insufficient virtual balance" });
    }

    // Deduct cash
    user.virtualBalance -= totalCost;
    await user.save();

    // Update / create holding
    const portfolio = await Portfolio.findOne({ user: user._id });
    const existing = portfolio.findHolding(stock.symbol);

    if (existing) {
      const newQty = existing.quantity + quantity;
      const newAvg = (existing.avgBuyPrice * existing.quantity + totalCost) / newQty;
      existing.quantity = newQty;
      existing.avgBuyPrice = newAvg;
    } else {
      portfolio.holdings.push({
        symbol: stock.symbol,
        companyName: stock.companyName,
        quantity,
        avgBuyPrice: stock.currentPrice,
      });
    }
    await portfolio.save();

    const transaction = await Transaction.create({
      user: user._id,
      symbol: stock.symbol,
      type: "BUY",
      quantity,
      price: stock.currentPrice,
      totalAmount: totalCost,
    });

    return res.status(201).json({ message: "Buy order executed", transaction, cashBalance: user.virtualBalance });
  } catch (error) {
    return res.status(500).json({ message: "Buy order failed", error: error.message });
  }
};

// @route  POST /api/trade/sell
// body: { symbol, quantity }
export const sellStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "symbol and a positive quantity are required" });
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const portfolio = await Portfolio.findOne({ user: req.user._id });
    const holding = portfolio.findHolding(stock.symbol);

    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    const saleProceeds = stock.currentPrice * quantity;
    const realizedPnL = (stock.currentPrice - holding.avgBuyPrice) * quantity;

    holding.quantity -= quantity;
    if (holding.quantity === 0) {
      portfolio.holdings = portfolio.holdings.filter((h) => h.symbol !== stock.symbol);
    }
    await portfolio.save();

    const user = await User.findById(req.user._id);
    user.virtualBalance += saleProceeds;
    await user.save();

    const transaction = await Transaction.create({
      user: user._id,
      symbol: stock.symbol,
      type: "SELL",
      quantity,
      price: stock.currentPrice,
      totalAmount: saleProceeds,
      realizedPnL,
    });

    return res.status(201).json({ message: "Sell order executed", transaction, cashBalance: user.virtualBalance });
  } catch (error) {
    return res.status(500).json({ message: "Sell order failed", error: error.message });
  }
};

// @route  GET /api/trade/history
export const getTradeHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ executedAt: -1 });
    return res.json({ count: transactions.length, transactions });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch trade history", error: error.message });
  }
};
