import mongoose from "mongoose";

/**
 * Immutable record of every simulated buy/sell trade.
 * Used to build order history, P&L reports, and strategy analysis.
 */
const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    // realized profit/loss, only meaningful for SELL transactions
    realizedPnL: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["COMPLETED", "FAILED"],
      default: "COMPLETED",
    },
    executedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, executedAt: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
