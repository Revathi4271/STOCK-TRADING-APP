import mongoose from "mongoose";

/**
 * Lets a user save stocks they want to keep an eye on
 * without owning them (used to power the dashboard watchlist widget).
 */
const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    symbols: {
      type: [
        {
          type: String,
          uppercase: true,
          trim: true,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
