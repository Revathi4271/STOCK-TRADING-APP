import api from './api';

const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@sbstocks.com', password: 'password123', role: 'admin', balance: 100000 },
  { id: 2, name: 'Test User', email: 'user@sbstocks.com', password: 'password123', role: 'user', balance: 50000 },
];

export const authService = {
  login: async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve({ 
            data: { 
              token: 'mock-jwt-token-12345', 
              user: userWithoutPassword 
            } 
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },
  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          role: 'user',
          balance: 10000, // Starting balance
        };
        const { password, ...userWithoutPassword } = newUser;
        resolve({
          data: {
            token: 'mock-jwt-token-67890',
            user: userWithoutPassword
          }
        });
      }, 500);
    });
  }
};
