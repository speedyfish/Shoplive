const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/products',
    createProxyMiddleware({
      target: 'http://172.50.1.33:5004',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/seed',
    createProxyMiddleware({
      target: 'http://172.50.1.31:5002',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/orders',
    createProxyMiddleware({
      target: 'http://172.50.1.32:5003',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: 'http://172.50.1.34:5005',
      changeOrigin: true,
    })
  );
};