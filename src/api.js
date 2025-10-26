import { BASE_URL } from './config';

// Helper to join base and endpoint safely (handles trailing/leading slashes)
const joinUrl = (base, endpoint) => {
  if (!base) return endpoint;
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const e = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${b}${e}`;
};

export const fetchAPI = (endpoint, options = {}) => {
  const url = joinUrl(BASE_URL, endpoint);
  return fetch(url, options)
    .then(async res => {
      // Try to parse JSON; if empty body, return null
      const text = await res.text();
      try {
        return text ? JSON.parse(text) : null;
      } catch (err) {
        // Not JSON, return raw text
        return text;
      }
    })
    .catch(err => {
      console.error('fetchAPI error', err);
      throw err;
    });
};
