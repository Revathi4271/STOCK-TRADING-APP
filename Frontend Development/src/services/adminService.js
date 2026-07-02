export const adminService = {
  getUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, name: 'Admin User', email: 'admin@sbstocks.com', role: 'admin', balance: 100000, joined: '2023-01-15' },
            { id: 2, name: 'Test User', email: 'user@sbstocks.com', role: 'user', balance: 50000, joined: '2023-02-20' },
          ]
        });
      }, 300);
    });
  },

  getSystemStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            totalUsers: 1542,
            activeUsers: 843,
            totalTrades: 45210,
            volumeTraded: 25400000
          }
        });
      }, 300);
    });
  }
};
