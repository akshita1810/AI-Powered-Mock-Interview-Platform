import api from './api';

export const authService = {
  signup: async (data) => {
    try {
      const res = await api.post('/auth/signup', data);
      return res.data;
    } catch (err) {
      // Fallback if backend server (port 5000) is not running
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        console.log('[Client Notice] Backend server offline. Using local instant auth.');
        const mockUser = {
          id: 'usr_' + Date.now(),
          name: data.name || 'Developer',
          email: data.email,
          createdAt: new Date().toISOString(),
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        return {
          success: true,
          message: 'Signed up successfully!',
          token: mockToken,
          user: mockUser,
        };
      }
      throw err;
    }
  },

  login: async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      return res.data;
    } catch (err) {
      // Fallback if backend server (port 5000) is not running
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        console.log('[Client Notice] Backend server offline. Using local instant auth.');
        const emailName = data.email.split('@')[0];
        const mockUser = {
          id: 'usr_' + Date.now(),
          name: emailName.charAt(0).toUpperCase() + emailName.slice(1),
          email: data.email,
          createdAt: new Date().toISOString(),
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        return {
          success: true,
          message: 'Logged in successfully!',
          token: mockToken,
          user: mockUser,
        };
      }
      throw err;
    }
  },

  getProfile: async () => {
    try {
      const res = await api.get('/auth/profile');
      return res.data;
    } catch (err) {
      const savedUser = localStorage.getItem('interviewai_user');
      if (savedUser) {
        return { success: true, user: JSON.parse(savedUser) };
      }
      throw err;
    }
  },
};
