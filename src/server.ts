import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PROXY_TARGET = process.env.PROXY_TARGET || 'https://api.example.com';

// Serve static files from the Vite build output
app.use(express.static(path.resolve(__dirname, '../dist')));

// Proxy API requests to avoid CORS issues
if (PROXY_TARGET) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: PROXY_TARGET,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Removes '/api' prefix before forwarding
      onError: (err, _req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy server error' });
      }
    })
  );
} else {
  console.warn('⚠️ Warning: No PROXY_TARGET set. API requests will not be proxied.');
}

// Handle all other routes by serving the frontend's index.html (for client-side routing)
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
