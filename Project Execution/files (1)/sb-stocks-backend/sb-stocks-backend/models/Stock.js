import mongoose from "mongoose";

/**
 * Cached snapshot of a US stock listing, refreshed periodically
 * from the external market-data provider (see config/db.js + STOCK_API_KEY).
 */
const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    exchange: {
      type: String, // e.g. NASDAQ, NYSE
      trim: true,
    },
    sector: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    previousClose: {
      type: Number,
      min: 0,
    },
    dayHigh: Number,
    dayLow: Number,
    dayOpen: Number,
    volume: Number,
    marketCap: Number,
    // Rolling history for basic trend charts (optional, capped)
    priceHistory: [
      {
        price: { type: Number, required: true },
        recordedAt: { type: Date, default: Date.now },
      },
    ],
    lastFetchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

stockSchema.index({ companyName: "text", symbol: "text" });

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
