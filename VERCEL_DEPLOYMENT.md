# BusMate Vercel Deployment Guide

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub account with this repository
- Node.js 18+ locally

## Deployment Steps

### Step 1: Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your Git repository
4. Select the root directory as the project root

### Step 2: Configure Environment Variables

In your Vercel Project Settings → Environment Variables, add:

**For Backend:**

- `NODE_ENV`: `production`
- `CLIENT_ORIGINS`: Your frontend URL (e.g., `https://your-app.vercel.app`)

**For Frontend:**

- `VITE_API_URL`: `/api` (this makes frontend calls go to your backend via the same domain)

### Step 3: Build Settings

- **Framework Preset**: Leave as "Other"
- **Build Command**: Leave empty or use `npm run build` (Vercel will handle monorepo)
- **Output Directory**: Leave empty (Vercel will detect from vercel.json)

### Step 4: Deploy

Click "Deploy" and Vercel will automatically:

1. Install dependencies for both backend and frontend
2. Build the frontend (generates `dist` folder)
3. Set up the Node.js backend
4. Configure routing to serve frontend and API routes

## Testing After Deployment

1. **Frontend**: Visit `https://your-app.vercel.app`
2. **Backend Health**: Visit `https://your-app.vercel.app/api/health`
3. **Check CORS**: Should work from the same domain

## Troubleshooting

### API 404 errors from frontend

- Verify `CLIENT_ORIGINS` in Vercel environment variables
- Check that API calls use paths like `/api/buses`, `/api/routes`, etc.
- Frontend default uses `/api` as base URL

### CORS errors

- Add frontend URL to `CLIENT_ORIGINS` environment variable
- Format: `https://your-app.vercel.app` (no trailing slash)
- Multiple URLs separated by commas

### Build failures

- Check build logs in Vercel dashboard
- Ensure all required dependencies are in package.json
- Verify Node.js version (18+ recommended)

## Local Testing Before Deployment

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run build
npm run preview
```

## Updating the Deployment

Simply push changes to your Git repository. Vercel will automatically rebuild and redeploy.

## Important Files

- `vercel.json` - Root configuration for monorepo routing
- `backend/vercel.json` - Backend Node.js configuration
- `frontend/vercel.json` - Frontend SPA configuration
