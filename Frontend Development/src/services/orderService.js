export const orderService = {
  getOrders: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        resolve({ data: orders[userId] || [] });
      }, 300);
    });
  },

  placeOrder: async (userId, orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        const userOrders = orders[userId] || [];
        
        const newOrder = {
          id: Date.now(),
          date: new Date().toISOString(),
          status: 'completed', // For mock purposes, instantly complete
          ...orderData
        };
        
        orders[userId] = [newOrder, ...userOrders];
        localStorage.setItem('orders', JSON.stringify(orders));
        
        resolve({ data: newOrder });
      }, 500);
    });
  }
};
