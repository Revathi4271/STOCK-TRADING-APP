import Portfolio from "../models/Portfolio.js";
import Stock from "../models/Stock.js";

// @route  GET /api/portfolio
export const getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) {
      portfolio = await Portfolio.create({ user: req.user._id });
    }

    // Refresh current value against latest cached stock prices
    let totalCurrentValue = 0;
    let totalInvested = 0;

    for (const holding of portfolio.holdings) {
      const stock = await Stock.findOne({ symbol: holding.symbol });
      const price = stock ? stock.currentPrice : holding.avgBuyPrice;
      totalCurrentValue += price * holding.quantity;
      totalInvested += holding.avgBuyPrice * holding.quantity;
    }

    portfolio.totalCurrentValue = totalCurrentValue;
    portfolio.totalInvested = totalInvested;
    await portfolio.save();

    return res.json({
      portfolio,
      cashBalance: req.user.virtualBalance,
      unrealizedPnL: totalCurrentValue - totalInvested,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch portfolio", error: error.message });
  }
};
