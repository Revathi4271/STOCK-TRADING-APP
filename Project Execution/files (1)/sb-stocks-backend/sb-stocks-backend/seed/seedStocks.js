import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Stock from "../models/Stock.js";

dotenv.config();

const sampleStocks = [
  { symbol: "AAPL", companyName: "Apple Inc.", exchange: "NASDAQ", sector: "Technology", currentPrice: 195.4, previousClose: 193.1 },
  { symbol: "MSFT", companyName: "Microsoft Corporation", exchange: "NASDAQ", sector: "Technology", currentPrice: 415.2, previousClose: 412.8 },
  { symbol: "GOOGL", companyName: "Alphabet Inc.", exchange: "NASDAQ", sector: "Technology", currentPrice: 172.9, previousClose: 170.5 },
  { symbol: "AMZN", companyName: "Amazon.com Inc.", exchange: "NASDAQ", sector: "Consumer Discretionary", currentPrice: 186.3, previousClose: 184.9 },
  { symbol: "TSLA", companyName: "Tesla Inc.", exchange: "NASDAQ", sector: "Consumer Discretionary", currentPrice: 248.5, previousClose: 251.2 },
  { symbol: "NVDA", companyName: "NVIDIA Corporation", exchange: "NASDAQ", sector: "Technology", currentPrice: 128.7, previousClose: 126.4 },
  { symbol: "JPM", companyName: "JPMorgan Chase & Co.", exchange: "NYSE", sector: "Financials", currentPrice: 210.6, previousClose: 209.1 },
  { symbol: "DIS", companyName: "The Walt Disney Company", exchange: "NYSE", sector: "Communication Services", currentPrice: 112.4, previousClose: 111.8 },
];

const run = async () => {
  await connectDB();
  await Stock.deleteMany({});
  await Stock.insertMany(sampleStocks);
  console.log(`Seeded ${sampleStocks.length} stocks`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
