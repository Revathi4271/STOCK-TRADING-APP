export const portfolioService = {
  getPortfolio: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        const userOrders = orders[userId] || [];
        
        // Calculate holdings based on orders
        const holdingsMap = {};
        
        userOrders.forEach(order => {
          if (!holdingsMap[order.stockSymbol]) {
            holdingsMap[order.stockSymbol] = {
              symbol: order.stockSymbol,
              name: order.stockName,
              quantity: 0,
              totalInvested: 0,
            };
          }
          
          if (order.type === 'buy') {
            holdingsMap[order.stockSymbol].quantity += order.quantity;
            holdingsMap[order.stockSymbol].totalInvested += (order.price * order.quantity);
          } else if (order.type === 'sell') {
            holdingsMap[order.stockSymbol].quantity -= order.quantity;
            holdingsMap[order.stockSymbol].totalInvested -= (order.price * order.quantity);
          }
        });
        
        // Filter out zero quantity
        const portfolio = Object.values(holdingsMap)
          .filter(h => h.quantity > 0)
          .map(h => {
            const avgPrice = h.totalInvested / h.quantity;
            return {
              ...h,
              avgPrice,
              currentPrice: avgPrice * (1 + (Math.random() * 0.1 - 0.05))
            };
          });
          
        resolve({ data: portfolio });
      }, 300);
    });
  },

  getPortfolioSummary: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        const userOrders = orders[userId] || [];
        
        const holdingsMap = {};
        userOrders.forEach(order => {
          if (!holdingsMap[order.stockSymbol]) {
            holdingsMap[order.stockSymbol] = { quantity: 0, totalInvested: 0 };
          }
          if (order.type === 'buy') {
            holdingsMap[order.stockSymbol].quantity += order.quantity;
            holdingsMap[order.stockSymbol].totalInvested += (order.price * order.quantity);
          } else if (order.type === 'sell') {
            holdingsMap[order.stockSymbol].quantity -= order.quantity;
            holdingsMap[order.stockSymbol].totalInvested -= (order.price * order.quantity);
          }
        });
        
        let totalInvested = 0;
        let currentValue = 0;
        
        Object.values(holdingsMap).forEach(h => {
          if (h.quantity > 0) {
            totalInvested += h.totalInvested;
            const avgPrice = h.totalInvested / h.quantity;
            const mockCurrentPrice = avgPrice * (1 + (Math.random() * 0.1 - 0.05));
            currentValue += mockCurrentPrice * h.quantity;
          }
        });

        resolve({ 
          data: {
            totalInvested,
            currentValue,
            profitLoss: currentValue - totalInvested,
            profitLossPercentage: totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0
          }
        });
      }, 300);
    });
  }
};
