const express = require('express');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');
// const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const routes = require('./routes');

const handle = routes.getRequestHandler(app);

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev) {
      const proxyMiddleware = require('http-proxy-middleware');
      server.use(proxyMiddleware('/api', {
        target: process.env.API_URL.replace(/\/api\/$/, ''),
        changeOrigin: true,
        secure: false,
      }));
    }

    server.get('/service-worker.js', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    });

    server.get('/sp-push-manifest.json', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      const filePath = join(__dirname, 'static', pathname);
      app.serveStatic(req, res, filePath);
    });

    server.get('/sp-push-worker-fb.js', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      const filePath = join(__dirname, 'static', pathname);
      app.serveStatic(req, res, filePath);
    });

    server.get('/ping', (req, res) => {
      res.writeHead(200);
      res.write('pong');
      res.end();
    });

    server.get('/robots.txt', (req, res) => {
      res.header('Content-Type', 'text/plain');
      res.sendFile(join(__dirname, './static', 'robots.txt'));
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
