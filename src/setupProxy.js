const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use([
    createProxyMiddleware("/admin/api/**", {
      target: process.env.REACT_APP_PROXY_ADDRESS,
      secure: false,
    }),
    createProxyMiddleware("/api/**", {
      target: process.env.REACT_APP_PROXY_ADDRESS,
      secure: false,
    }),
  ]);
};
