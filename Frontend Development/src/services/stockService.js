import api from './api';

const mockStocks = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 1.25, volume: 55000000, marketCap: '2.8T' },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.', price: 345.10, change: -0.85, volume: 23000000, marketCap: '2.6T' },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.40, change: 2.10, volume: 18000000, marketCap: '1.7T' },
  { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.', price: 143.20, change: 0.45, volume: 42000000, marketCap: '1.5T' },
  { id: 5, symbol: 'TSLA', name: 'Tesla Inc.', price: 215.30, change: -3.20, volume: 110000000, marketCap: '680B' },
  { id: 6, symbol: 'META', name: 'Meta Platforms Inc.', price: 312.80, change: 1.15, volume: 15000000, marketCap: '800B' },
  { id: 7, symbol: 'NVDA', name: 'NVIDIA Corp.', price: 450.20, change: 5.60, volume: 38000000, marketCap: '1.1T' },
];

export const stockService = {
  getStocks: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockStocks });
      }, 300);
    });
  },
  
  getStockById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stock = mockStocks.find(s => s.id === parseInt(id) || s.symbol === id);
        if (stock) {
          // Add some historical mock data for the chart
          const historicalData = Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            price: stock.price * (1 + (Math.random() * 0.1 - 0.05)),
          }));
          resolve({ data: { ...stock, historicalData } });
        } else {
          reject(new Error('Stock not found'));
        }
      }, 300);
    });
  },
};
