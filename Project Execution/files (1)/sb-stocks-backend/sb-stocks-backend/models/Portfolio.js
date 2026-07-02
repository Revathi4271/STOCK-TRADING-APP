import mongoose from "mongoose";

/**
 * One Portfolio document per user, holding their current
 * open positions in the paper trading simulation.
 */
const holdingSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    avgBuyPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one portfolio per user
      index: true,
    },
    holdings: {
      type: [holdingSchema],
      default: [],
    },
    // Denormalized totals, recalculated on each trade for fast dashboard reads
    totalInvested: {
      type: Number,
      default: 0,
    },
    totalCurrentValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Helper to find/add a holding by symbol
portfolioSchema.methods.findHolding = function (symbol) {
  return this.holdings.find((h) => h.symbol === symbol.toUpperCase());
};

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
