const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
// Logging
app.use((req, res, next) => {
    console.log(`[GATEWAY] ${req.method} ${req.originalUrl}`);
    next();
});

// Forward /api/auth/* to User Service
app.use('/api/auth', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    pathRewrite: (path, req) => {
        // Force it to use the original URL
        return req.originalUrl;
    },
    changeOrigin: true,
    onError: (err, req, res) => {
        console.error('[Proxy Error]', err.message);
        res.status(500).json({ error: 'Proxy failed' });
    }
}));

app.use('/api/movies', createProxyMiddleware({
    target: process.env.MOVIE_SERVICE_URL || 'http://localhost:5002', // or whichever port your Movie Service runs on
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return req.originalUrl;
    },
    onError: (err, req, res) => {
        console.error('[Proxy Error - Movie Service]', err.message);
        res.status(500).json({ error: 'Movie Service is unavailable' });
    }
}));

app.listen(PORT, () => {
    console.log(`API Gateway running at http://localhost:${PORT}`);
});
