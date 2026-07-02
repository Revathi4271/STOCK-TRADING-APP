import Watchlist from "../models/Watchlist.js";

// @route  GET /api/watchlist
export const getWatchlist = async (req, res) => {
  let watchlist = await Watchlist.findOne({ user: req.user._id });
  if (!watchlist) watchlist = await Watchlist.create({ user: req.user._id });
  return res.json({ watchlist });
};

// @route  POST /api/watchlist  body: { symbol }
export const addToWatchlist = async (req, res) => {
  const { symbol } = req.body;
  if (!symbol) return res.status(400).json({ message: "symbol is required" });

  const watchlist = await Watchlist.findOneAndUpdate(
    { user: req.user._id },
    { $addToSet: { symbols: symbol.toUpperCase() } },
    { new: true, upsert: true }
  );
  return res.json({ watchlist });
};

// @route  DELETE /api/watchlist/:symbol
export const removeFromWatchlist = async (req, res) => {
  const watchlist = await Watchlist.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { symbols: req.params.symbol.toUpperCase() } },
    { new: true }
  );
  return res.json({ watchlist });
};
