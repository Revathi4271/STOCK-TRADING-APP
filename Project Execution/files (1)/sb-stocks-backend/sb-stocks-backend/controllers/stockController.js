import Stock from "../models/Stock.js";

// @route  GET /api/stocks
// Supports ?search=apple to filter by name/symbol
export const getStocks = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { $text: { $search: search } } : {};
    const stocks = await Stock.find(filter).limit(50).sort({ symbol: 1 });
    return res.json({ count: stocks.length, stocks });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch stocks", error: error.message });
  }
};

// @route  GET /api/stocks/:symbol
export const getStockBySymbol = async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    return res.json({ stock });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch stock", error: error.message });
  }
};
