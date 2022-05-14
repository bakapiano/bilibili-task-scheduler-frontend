const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  createProxyMiddleware({
    target: "http://121.4.44.73:8000",
    changeOrigin: true,
  })(req, res)
}