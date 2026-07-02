// SB Stocks ships with a simulated US-stock price feed so the app runs
// fully offline out of the box. To use real market data instead, sign up
// for a free key at https://finnhub.io or https://www.alphavantage.co
// and swap getStocks()/getQuote() below for real API calls.

const BASE_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", basePrice: 195 },
  { symbol: "MSFT", name: "Microsoft Corp.", basePrice: 430 },
  { symbol: "GOOGL", name: "Alphabet Inc.", basePrice: 175 },
  { symbol: "AMZN", name: "Amazon.com Inc.", basePrice: 185 },
  { symbol: "TSLA", name: "Tesla Inc.", basePrice: 260 },
  { symbol: "NVDA", name: "NVIDIA Corp.", basePrice: 120 },
  { symbol: "META", name: "Meta Platforms Inc.", basePrice: 480 },
  { symbol: "NFLX", name: "Netflix Inc.", basePrice: 640 },
  { symbol: "AMD", name: "Advanced Micro Devices", basePrice: 155 },
  { symbol: "INTC", name: "Intel Corp.", basePrice: 32 },
  { symbol: "DIS", name: "Walt Disney Co.", basePrice: 100 },
  { symbol: "BA", name: "Boeing Co.", basePrice: 185 },
];

// In-memory "live" price state, seeded from basePrice, drifts slightly
// on every request to simulate real-time market movement.
const priceState = {};
BASE_STOCKS.forEach((s) => {
  priceState[s.symbol] = s.basePrice;
});

function tick(symbol) {
  const current = priceState[symbol];
  const changePercent = (Math.random() - 0.5) * 0.02; // +/-1% per tick
  const next = Math.max(1, current * (1 + changePercent));
  priceState[symbol] = Number(next.toFixed(2));
  return priceState[symbol];
}

function getStocks() {
  return BASE_STOCKS.map((s) => {
    const price = tick(s.symbol);
    const change = Number((price - s.basePrice).toFixed(2));
    const changePercent = Number(((change / s.basePrice) * 100).toFixed(2));
    return {
      symbol: s.symbol,
      name: s.name,
      price,
      change,
      changePercent,
    };
  });
}

function getQuote(symbol) {
  const stock = BASE_STOCKS.find((s) => s.symbol === symbol.toUpperCase());
  if (!stock) return null;
  const price = tick(stock.symbol);
  return { symbol: stock.symbol, name: stock.name, price };
}

module.exports = { getStocks, getQuote };
