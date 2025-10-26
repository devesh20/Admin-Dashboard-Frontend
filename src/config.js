const envUrl = import.meta.env.VITE_BACKEND_URL;
// By default use a relative /api path so Vite dev proxy and Vercel rewrites work.
// If VITE_BACKEND_URL is set (e.g. to an absolute backend URL) it will be used instead.
export const BASE_URL = envUrl && envUrl !== '' ? envUrl : '/api';
