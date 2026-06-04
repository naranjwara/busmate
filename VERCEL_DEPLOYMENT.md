# BusMate Vercel Deployment Guide

## Prerequisites

- Vercel account: https://vercel.com
- Vercel CLI installed locally
- Node.js 18+ locally

## Deploy With Vercel CLI

Run these commands from the repository root:

```bash
npm install
npm run build
vercel
```

For production:

```bash
vercel --prod
```

The root `vercel.json` installs the npm workspaces with optional native dependencies, builds the Vite frontend, serves `frontend/dist`, and rewrites `/api/*` requests to the Express app through `api/index.js`.

## Environment Variables

In Vercel Project Settings > Environment Variables, add:

Backend:

- `NODE_ENV`: `production`
- `CLIENT_ORIGINS`: your frontend URL, for example `https://your-app.vercel.app`

Frontend:

- `VITE_API_URL`: `/api`

## Dashboard Build Settings

If deploying from the Vercel dashboard instead of the CLI:

- Framework Preset: Other
- Root Directory: repository root
- Build Command: `npm run build`
- Output Directory: `frontend/dist`

## Testing After Deployment

1. Frontend: `https://your-app.vercel.app`
2. Backend health: `https://your-app.vercel.app/api/health`
3. API examples: `/api/buses/nearby`, `/api/routes/:id/tracking`

## Local Testing Before Deployment

```bash
npm install
npm run build
npm run dev:backend
npm run dev:frontend
```

## Important Files

- `package.json` - root npm workspace and Vercel build scripts
- `vercel.json` - root routing and build configuration
- `api/index.js` - Vercel serverless entrypoint for the Express app

## Native Dependency Install Error

If Vercel reports `Cannot find native binding`, redeploy after this change. The root lockfile generated on Windows was removed because npm can omit Linux optional native packages from it. Vercel will now install fresh on Linux with `npm install --include=optional`.
