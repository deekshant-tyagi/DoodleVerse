// API Configuration for DoodleVerse Frontend

export const API_CONFIG = {
  // Backend API base URL
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Socket.io server URL
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000',
  
  // Frontend URL for sharing links
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  
  // API endpoints
  ENDPOINTS: {
    // User endpoints
    SIGNUP: '/api/v1/user/signup',
    SIGNIN: '/api/v1/user/signin',
    ME: '/api/v1/me',
    
    // Drawing endpoints
    CREATE_DRAWING: '/api/v1/drawing/create',
    GET_DRAWING: '/api/v1/drawing/',
    UPDATE_DRAWING: '/api/v1/drawing/updateInfo',
    USER_DRAWINGS: '/api/v1/drawing/user-drawings'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.API_URL}${endpoint}`;
};

// Helper function to get socket URL
export const getSocketUrl = () => {
  return API_CONFIG.SOCKET_URL;
};

// Helper function to get frontend URL
export const getFrontendUrl = (path = '') => {
  return `${API_CONFIG.FRONTEND_URL}${path}`;
};
