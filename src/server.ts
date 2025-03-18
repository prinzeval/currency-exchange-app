import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PROXY_TARGET = process.env.PROXY_TARGET || 'https://api.example.com'; // Ensure this is set in .env

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests to avoid CORS issues
app.use(
  '/api',
  createProxyMiddleware({
    target: PROXY_TARGET,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Removes '/api' prefix before forwarding
  })
);

// Handle all other routes by serving the frontend's index.html (for client-side routing)
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
