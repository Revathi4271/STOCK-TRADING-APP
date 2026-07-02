export const transactionService = {
  getTransactions: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '{}');
        resolve({ data: transactions[userId] || [] });
      }, 300);
    });
  },

  addTransaction: async (userId, transactionData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactions = JSON.parse(localStorage.getItem('transactions') || '{}');
        const userTransactions = transactions[userId] || [];
        
        const newTransaction = {
          id: Date.now(),
          date: new Date().toISOString(),
          ...transactionData
        };
        
        transactions[userId] = [newTransaction, ...userTransactions];
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        resolve({ data: newTransaction });
      }, 300);
    });
  }
};
