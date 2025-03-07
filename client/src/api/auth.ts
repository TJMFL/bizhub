import api from './api';

// Description: Login user
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { token: string, user: { id: string, email: string } }
export const login = (data: { email: string; password: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'mock_token', user: { id: '1', email: data.email } });
    }, 500);
  });
};

// Description: Register user
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string }
// Response: { token: string, user: { id: string, email: string } }
export const register = (data: { email: string; password: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'mock_token', user: { id: '1', email: data.email } });
    }, 500);
  });
};