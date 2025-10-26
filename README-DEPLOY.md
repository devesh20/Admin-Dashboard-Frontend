Vercel deployment notes

1) Default behavior
- The app defaults to using a relative `/api` base path. That makes local development and Vercel deployments behave the same:
  - Local dev: Vite proxy in `vite.config.js` forwards `/api/*` to the Railway backend.
  - Vercel: `vercel.json` contains a rewrite that routes `/api/*` to the Railway backend.

2) Optional: force an absolute backend URL
- If you want the frontend to call the backend directly (absolute URL), set an environment variable in Vercel:
  - Key: `VITE_BACKEND_URL`
  - Value: `https://admin-dashboard-backend-production-1f5a.up.railway.app`
- When `VITE_BACKEND_URL` is set, the frontend will use that value instead of `/api`.

3) How to deploy on Vercel
- Commit & push changes.
- Import repo into Vercel (or redeploy).
- (Optional) Add the `VITE_BACKEND_URL` env var in Vercel's project settings if you prefer absolute calls.
- Vercel will run `npm run build` (uses `vite build`) and publish the `dist` folder.

4) Local testing
- Install dependencies and run:

  npm install
  npm run dev

- With the default `.env` the local app will call `/api/*` which Vite proxies to the Railway backend.

5) Troubleshooting
- If API calls 404 or CORS errors appear, check:
  - Vercel: `vercel.json` rewrites are in place and deployed.
  - Backend: CORS allowed origins. Backend currently uses `cors()` with default options (allows all origins).
  - Network: Ensure the Railway URL is reachable from your environment.

If you'd like, I can also:
- Replace all absolute backend calls in the codebase to use the central `fetchAPI` or `BASE_URL`.
- Add a small API test page in the app to verify connectivity after deployment.
