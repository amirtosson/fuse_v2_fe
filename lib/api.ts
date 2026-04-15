import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_FE_MAIN;

export const api = axios.create({
  //baseURL: 'http://localhost:3005',
  baseURL: 'https://api.gutt-ag.de',
});

// Interceptor to inject API KEY into every request
api.interceptors.request.use((config) => {
  if (!API_KEY) {
    console.warn("API_KEY_FE_MAIN is missing in frontend environment!");
    return config;
  }

  const method = config.method?.toLowerCase();

  // For GET requests, attach to query params
  if (method === 'get') {
    config.params = {
      ...config.params,
      api_key: API_KEY
    };
  }
  // For other methods, attach to the body (data)
  else {
    if (!config.data) {
      config.data = {};
    }

    // If it's a standard object, inject the key
    if (typeof config.data === 'object' && !(config.data instanceof FormData)) {
      config.data.api_key = API_KEY;
    }
    // If it's FormData (for file uploads), append the key
    else if (config.data instanceof FormData) {
      config.data.append('api_key', API_KEY);
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
