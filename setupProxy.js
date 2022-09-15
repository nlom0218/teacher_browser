import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://13.124.59.110/",
      changeOrigin: true,
    }),
  );
};
